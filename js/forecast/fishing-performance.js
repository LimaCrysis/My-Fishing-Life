/* MFL historical fishing performance layer v0.1 - intentionally disconnected from forecast scoring */
(function(){
  'use strict';
  const SOURCE_TYPES=new Set(['official','licensed_external','mfl_actual','manual_reference']);
  const RECORD_TYPES=new Set(['catch_summary','effort_summary']);
  const OUTCOMES=new Set(['caught','not_caught','unknown']);
  const nullableNumber=value=>value===null||value===undefined||value===''?null:Number(value);
  const dateOnly=value=>typeof value==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(value)?value:null;
  const uniq=values=>[...new Set(values)];
  const daysBetween=(a,b)=>Math.max(0,Math.floor((new Date(`${b}T00:00:00Z`)-new Date(`${a}T00:00:00Z`))/86400000));
  function normalize(record){
    const quality=record?.dataQuality||{},sourceType=SOURCE_TYPES.has(record?.sourceType)?record.sourceType:'manual_reference',recordType=RECORD_TYPES.has(record?.recordType)?record.recordType:'catch_summary',count=nullableNumber(record?.count),species=typeof record?.species==='string'&&record.species.trim()?record.species.trim():null;
    return{recordType,spotId:String(record?.spotId||''),date:dateOnly(record?.date),species,count:Number.isFinite(count)&&count>=0?count:null,sizeMin:nullableNumber(record?.sizeMin),sizeMax:nullableNumber(record?.sizeMax),waterTemp:nullableNumber(record?.waterTemp),weather:record?.weather||null,tide:record?.tide||null,visitors:nullableNumber(record?.visitors),timeRange:record?.timeRange&&typeof record.timeRange==='object'?{start:record.timeRange.start||null,end:record.timeRange.end||null}:null,method:record?.method||null,outcome:OUTCOMES.has(record?.outcome)?record.outcome:(count===0?'not_caught':count>0?'caught':'unknown'),effortMinutes:nullableNumber(record?.effortMinutes),conditions:{windSpeed:nullableNumber(record?.conditions?.windSpeed),windDirection:record?.conditions?.windDirection||null,wave:nullableNumber(record?.conditions?.wave),rain:nullableNumber(record?.conditions?.rain),tidePhase:record?.conditions?.tidePhase||null},source:String(record?.source||''),sourceType,sourceDate:dateOnly(record?.sourceDate),dataQuality:{level:['low','medium','high'].includes(quality.level)?quality.level:'low',verified:Boolean(quality.verified),permission:['allowed','pending','manual_only'].includes(quality.permission)?quality.permission:'pending',notes:Array.isArray(quality.notes)?quality.notes.map(String):[]}}
  }
  function validate(record){
    const item=normalize(record),errors=[];
    if(!item.spotId)errors.push('spotId is required');if(!item.date)errors.push('date must be YYYY-MM-DD');if(!item.source)errors.push('source is required');
    if(item.recordType==='catch_summary'&&!item.species)errors.push('catch_summary requires species');
    if(item.sizeMin!==null&&(!Number.isFinite(item.sizeMin)||item.sizeMin<0))errors.push('sizeMin must be null or non-negative');if(item.sizeMax!==null&&(!Number.isFinite(item.sizeMax)||item.sizeMax<0))errors.push('sizeMax must be null or non-negative');if(item.sizeMin!==null&&item.sizeMax!==null&&item.sizeMin>item.sizeMax)errors.push('sizeMin cannot exceed sizeMax');
    if(item.visitors!==null&&(!Number.isFinite(item.visitors)||item.visitors<0))errors.push('visitors must be null or non-negative');
    return{valid:errors.length===0,errors,record:item}
  }
  function groupBy(values,key){return values.reduce((map,item)=>{const value=key(item);(map[value]||(map[value]=[])).push(item);return map},{})}
  function aggregate(input,{asOf=null,recentDays=30}={}){
    const records=input.map(normalize).filter(item=>item.spotId&&item.date),latest=asOf||records.map(item=>item.date).sort().at(-1)||null,bySpot=groupBy(records,item=>item.spotId);
    return Object.fromEntries(Object.entries(bySpot).map(([spotId,spotRecords])=>{
      const observationDays=uniq(spotRecords.map(item=>item.date)),effortDays=uniq(spotRecords.filter(item=>item.recordType==='effort_summary').map(item=>item.date)),hasNegativeEffort=spotRecords.some(item=>item.recordType==='effort_summary'&&item.outcome==='not_caught'),speciesGroups=groupBy(spotRecords.filter(item=>item.species),item=>item.species),species=Object.fromEntries(Object.entries(speciesGroups).map(([name,items])=>{
        const positive=items.filter(item=>item.outcome==='caught'||item.count>0),positiveDays=uniq(positive.map(item=>item.date)),knownCounts=positive.map(item=>item.count).filter(Number.isFinite),densityItems=positive.filter(item=>Number.isFinite(item.count)&&Number.isFinite(item.visitors)&&item.visitors>0),recent=latest?positive.filter(item=>daysBetween(item.date,latest)<=recentDays):[];
        return[name,{records:items.length,positiveDays:positiveDays.length,positiveDayShare:Number((positiveDays.length/Math.max(1,observationDays.length)).toFixed(3)),occurrenceRate:effortDays.length?Number((positiveDays.length/effortDays.length).toFixed(3)):null,occurrenceRateNote:effortDays.length?'努力量または無釣果日を含む観測日が分母':'成功例偏重を避けるため分母不足では算出しない',totalCount:knownCounts.length?knownCounts.reduce((sum,value)=>sum+value,0):null,catchPerVisitor:densityItems.length?Number((densityItems.reduce((sum,item)=>sum+item.count,0)/densityItems.reduce((sum,item)=>sum+item.visitors,0)).toFixed(4)):null,recentPositiveDays:uniq(recent.map(item=>item.date)).length,months:uniq(positive.map(item=>Number(item.date.slice(5,7)))).sort((a,b)=>a-b),waterTempRange:range(positive.map(item=>item.waterTemp)),tides:frequency(positive.map(item=>item.tide)),weather:frequency(positive.map(item=>item.weather)),timeRanges:frequency(positive.map(item=>item.timeRange?.start&&item.timeRange?.end?`${item.timeRange.start}-${item.timeRange.end}`:null)),methods:frequency(positive.map(item=>item.method))}]
      }));
      return[spotId,{spotId,records:spotRecords.length,observationDays:observationDays.length,effortDays:effortDays.length,hasNegativeEffort,dateRange:observationDays.length?{from:observationDays.sort()[0],to:observationDays.sort().at(-1)}:null,species,confidence:evaluateConfidence(spotRecords,{asOf:latest})}]
    }))
  }
  function range(values){const known=values.filter(Number.isFinite);return known.length?{min:Math.min(...known),max:Math.max(...known),samples:known.length}:null}
  function frequency(values){const known=values.filter(Boolean);return Object.entries(groupBy(known,value=>value)).map(([value,items])=>({value,count:items.length})).sort((a,b)=>b.count-a.count||a.value.localeCompare(b.value,'ja'))}
  function evaluateConfidence(input,{asOf=null}={}){
    const records=input.map(normalize).filter(item=>item.date),dates=uniq(records.map(item=>item.date)).sort(),latest=asOf||dates.at(-1)||null,years=uniq(dates.map(date=>date.slice(0,4))).length,sources=uniq(records.map(item=>`${item.sourceType}:${item.source}`)).length,allowed=records.filter(item=>item.dataQuality.permission==='allowed'),mfl=records.filter(item=>item.sourceType==='mfl_actual'),negative=mfl.filter(item=>item.outcome==='not_caught'),withTime=records.filter(item=>item.timeRange?.start&&item.timeRange?.end).length,withWater=records.filter(item=>Number.isFinite(item.waterTemp)).length,age=latest&&dates.length?daysBetween(dates.at(-1),latest):null;
    let points=0;const signals=[];
    if(dates.length>=180){points+=3;signals.push('観測日180日以上')}else if(dates.length>=60){points+=2;signals.push('観測日60日以上')}else if(dates.length>=15){points+=1;signals.push('観測日15日以上')}
    if(years>=3){points+=2;signals.push('3年以上')}else if(years>=2){points+=1;signals.push('複数年')}
    if(sources>=2){points+=1;signals.push('複数ソース')}
    if(records.length&&withTime/records.length>=.25){points+=1;signals.push('時間帯情報あり')}
    if(records.length&&withWater/records.length>=.5){points+=1;signals.push('水温情報が豊富')}
    if(negative.length>=10){points+=2;signals.push('MFLボウズ記録10件以上')}else if(negative.length){points+=1;signals.push('MFLボウズ記録あり')}
    if(mfl.length>=30){points+=2;signals.push('MFL実釣30件以上')}else if(mfl.length){points+=1;signals.push('MFL実釣あり')}
    if(age!==null&&age<=30){points+=1;signals.push('30日以内に更新')}
    if(records.length&&!allowed.length){points=Math.min(points,2);signals.push('利用許諾済みデータなし')}
    const value=points>=9?'high':points>=5?'medium':'low';return{value,points,meaning:'予測を支えるデータの強さ（釣れる確率ではない）',signals,inputs:{records:records.length,observationDays:dates.length,years,sources,allowedRecords:allowed.length,mflActualRecords:mfl.length,negativeMflRecords:negative.length,timeRangeRecords:withTime,waterTempRecords:withWater,lastDate:dates.at(-1)||null,ageDays:age}}
  }
  function connectionPreview(currentConditionScore,history){return{currentConditionScore,historicalEvidence:history||null,mflActualAdjustment:null,appliedHistoricalWeight:0,finalScore:currentConditionScore,note:'試作段階では実績レイヤーを現行予測へ反映しない'}}
  function fromMFLTrip({spotId,trip,catches=[],conditions={}}){
    if(!spotId||!trip?.date)return[];const timeRange={start:trip.start||null,end:trip.end||null},common={spotId,date:trip.date,waterTemp:nullableNumber(conditions.waterTemp),weather:trip.weather||conditions.weather||null,tide:conditions.tide||null,visitors:null,timeRange,effortMinutes:nullableNumber(conditions.effortMinutes),conditions:{windSpeed:nullableNumber(conditions.windSpeed),windDirection:conditions.windDirection||null,wave:nullableNumber(conditions.wave),rain:nullableNumber(conditions.rain),tidePhase:conditions.tidePhase||null},source:`MFL trip ${trip.id||''}`.trim(),sourceType:'mfl_actual',sourceDate:dateOnly(trip.date),dataQuality:{level:conditions.verified?'high':'medium',verified:Boolean(conditions.verified),permission:'allowed',notes:[]}};
    if(!catches.length)return[normalize({...common,recordType:'effort_summary',species:null,count:0,sizeMin:null,sizeMax:null,method:null,outcome:'not_caught'})];
    return catches.map(item=>normalize({...common,recordType:'catch_summary',species:item.fishName||item.species||null,count:nullableNumber(item.count),sizeMin:nullableNumber(item.size),sizeMax:nullableNumber(item.size),method:item.method||null,outcome:'caught',conditions:{...common.conditions,tidePhase:item.tidePhase||common.conditions.tidePhase}}))
  }
  async function load(url='data/fishing-performance-records.json'){const response=await fetch(url);if(!response.ok)throw new Error(`実績データ取得失敗: ${response.status}`);const data=await response.json();return(Array.isArray(data)?data:data.records||[]).map(normalize)}
  window.MFLFishingPerformance={SOURCE_TYPES,RECORD_TYPES,normalize,validate,aggregate,evaluateConfidence,connectionPreview,fromMFLTrip,load};
})();

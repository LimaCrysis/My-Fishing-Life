/* MFL Phase 8 SHADOW bias analysis. Read-only aggregate analysis for Phase 7 reports. */
(function(){
  'use strict';
  const VERSION='1.0.0',BLEND_STRENGTH=.12,MAX_RAW_DELTA=8;
  const round=(value,digits=3)=>Number((Number(value)||0).toFixed(digits));
  const percent=(part,total)=>total?round(part*100/total,2):0;
  const median=values=>{const sorted=values.slice().sort((a,b)=>a-b),mid=Math.floor(sorted.length/2);return sorted.length?(sorted.length%2?sorted[mid]:(sorted[mid-1]+sorted[mid])/2):0};
  const mean=values=>values.length?values.reduce((sum,value)=>sum+value,0)/values.length:0;
  const presenceBand=score=>score<.2?'very_low':score<.4?'low':score<.6?'neutral':score<.8?'high':'very_high';
  const rawBand=raw=>raw<30?'0-29':raw<50?'30-49':raw<72?'50-71':'72-100';
  const daypart=hour=>hour<4?'late_night':hour<8?'dawn':hour<16?'day':hour<20?'dusk':'night';
  const reliabilityBand=value=>value>=.7?'high':value>=.45?'medium':'low';
  const transition=row=>`${row.current.score}->${row.shadow.score}`;
  function theoreticalDelta(row){
    if(!row.presence?.usable)return 0;
    return(row.presence.score*100-row.current.rawScore)*row.presence.reliability*BLEND_STRENGTH;
  }
  function fallbackReason(comparison,row){
    if(row.shadowStatus==='safety_passthrough')return'safety_passthrough';
    if(row.presence?.state==='absent')return'presence_absent';
    if(row.presence?.state==='malformed')return'malformed';
    if(comparison.presence?.hardGateEligible===false){
      const missing=comparison.presence?.missingCriticalInputs||[];
      if(missing.length)return'indeterminate_missing_critical_inputs';
      if(!(comparison.presence?.sourceIds||[]).length)return'indeterminate_no_source';
      const reliability=Number(comparison.presence?.reliability?.value);
      if(Number.isFinite(reliability)&&reliability<.45)return'indeterminate_low_reliability';
      return'indeterminate_hard_gate';
    }
    if(row.presence?.state==='indeterminate')return'indeterminate_other';
    return'other';
  }
  function accumulator(){return{rows:0,available:0,fallback:0,up:0,down:0,unchanged:0,scoreChanges:0,presenceScores:[],reliabilities:[],deltas:[],theoreticalDeltas:[]}}
  function add(acc,row){
    acc.rows++;
    if(row.presence?.usable){acc.available++;acc.presenceScores.push(row.presence.score);acc.reliabilities.push(row.presence.reliability);acc.deltas.push(row.delta.raw);acc.theoreticalDeltas.push(theoreticalDelta(row))}else acc.fallback++;
    acc[row.delta.direction]=(acc[row.delta.direction]||0)+1;
    if(row.delta.score!==0)acc.scoreChanges++;
  }
  function finalize(acc){
    const available=acc.available;
    return{rows:acc.rows,available,fallback:acc.fallback,availabilityRate:percent(available,acc.rows),fallbackRate:percent(acc.fallback,acc.rows),meanPresenceScore:round(mean(acc.presenceScores)),meanReliability:round(mean(acc.reliabilities)),meanDelta:round(mean(acc.deltas)),medianDelta:round(median(acc.deltas)),minDelta:acc.deltas.length?round(Math.min(...acc.deltas)):0,maxDelta:acc.deltas.length?round(Math.max(...acc.deltas)):0,up:acc.up,down:acc.down,unchanged:acc.unchanged,upRate:percent(acc.up,available),downRate:percent(acc.down,available),unchangedRate:percent(acc.unchanged,acc.rows),scoreChanges:acc.scoreChanges,scoreChangeRate:percent(acc.scoreChanges,available)};
  }
  function grouped(rows,keyFn){const map={};for(const item of rows){const key=String(keyFn(item));(map[key]||(map[key]=accumulator()));add(map[key],item.row)}return Object.fromEntries(Object.entries(map).sort(([a],[b])=>a.localeCompare(b,undefined,{numeric:true})).map(([key,value])=>[key,finalize(value)]))}
  function analyze(report,{performanceRecords}={}){
    const flat=[];
    for(const comparison of report.comparisons||[])for(const row of comparison.rows||[])flat.push({comparison,row});
    const usable=flat.filter(item=>item.row.presence?.usable),fallback=flat.filter(item=>!item.row.presence?.usable);
    const scoreChanges=usable.filter(item=>item.row.delta.score!==0);
    const bySourceRows=[];
    for(const item of flat){const sources=item.comparison.presence?.sourceIds||[];if(!sources.length)bySourceRows.push({...item,sourceId:'none'});else for(const sourceId of sources)bySourceRows.push({...item,sourceId})}
    const clamp={positive:0,negative:0,unclamped:0,maxTheoreticalPositive:0,minTheoreticalNegative:0};
    for(const item of usable){const theoretical=theoreticalDelta(item.row);if(theoretical>MAX_RAW_DELTA)clamp.positive++;else if(theoretical<-MAX_RAW_DELTA)clamp.negative++;else clamp.unclamped++;clamp.maxTheoreticalPositive=Math.max(clamp.maxTheoreticalPositive,theoretical);clamp.minTheoreticalNegative=Math.min(clamp.minTheoreticalNegative,theoretical)}
    const fallbackCounts={};for(const item of fallback){const reason=fallbackReason(item.comparison,item.row);fallbackCounts[reason]=(fallbackCounts[reason]||0)+1}
    const transitions={};for(const item of scoreChanges){const key=transition(item.row);transitions[key]=(transitions[key]||0)+1}
    const uniquePresence=new Map();for(const item of flat){const key=`${item.comparison.spotId}|${item.comparison.speciesId}|${item.comparison.date}`;if(!uniquePresence.has(key))uniquePresence.set(key,item)}
    const uniqueGroup=new Map();for(const item of flat){const key=`${item.comparison.spotId}|${item.comparison.date}|${item.row.hour}|${item.comparison.group}`;const value=uniqueGroup.get(key)||{comparison:item.comparison,row:item.row,deltas:[],usable:0};value.deltas.push(item.row.delta.raw);if(item.row.presence?.usable)value.usable++;uniqueGroup.set(key,value)}
    const groupDirection={rows:0,available:0,fallback:0,up:0,down:0,unchanged:0};for(const value of uniqueGroup.values()){const avg=mean(value.deltas);groupDirection.rows++;if(value.usable){groupDirection.available++;if(avg>0)groupDirection.up++;else if(avg<0)groupDirection.down++;else groupDirection.unchanged++}else{groupDirection.fallback++;groupDirection.unchanged++}}
    const empirical=Array.isArray(performanceRecords?.records)?performanceRecords.records:[];
    const matchingEmpirical=empirical.filter(record=>(report.comparisons||[]).some(item=>item.spotId===record.spotId&&item.date===(record.date||record.observationDate)));
    const stageRows=scoreChanges.map(({comparison,row})=>({spotId:comparison.spotId,speciesId:comparison.speciesId,group:comparison.group,date:comparison.date,hour:row.hour,currentScore:row.current.score,currentRaw:row.current.rawScore,presenceScore:row.presence.score,reliability:row.presence.reliability,state:row.presence.state,sourceIds:comparison.presence?.sourceIds||[],shadowScore:row.shadow.score,shadowRaw:row.shadow.rawScore,delta:row.delta.raw,transition:transition(row)}));
    const availableAcc=accumulator();for(const item of usable)add(availableAcc,item.row);
    return{schemaVersion:'1.0.0',phase:'8-shadow-bias-analysis',mode:'analysis_only',generatedAt:new Date().toISOString(),sourceReport:{phase:report.phase,date:report.date,generatedAt:report.generatedAt,hourRows:flat.length,comparisons:report.coverage?.comparisons},analysisScope:{actualDates:[report.date],additionalActualDates:[],fixtureDatesExcluded:['2026-09-01','2026-09-02'],note:'追加の実観測forecast比較日は存在せず、fixtureを実測として扱わない'},fixedParameters:{blendStrength:BLEND_STRENGTH,maxRawDelta:MAX_RAW_DELTA,changed:false},overall:{...finalize(availableAcc),allRows:flat.length,totalUnchanged:flat.filter(item=>item.row.delta.direction==='unchanged').length,availableUpShare:percent(usable.filter(item=>item.row.delta.direction==='up').length,usable.length)},presenceScoreDistribution:{uniqueComparisons:grouped([...uniquePresence.values()],item=>presenceBand(Number(item.comparison.presence?.score)||0)),hourRows:grouped(usable,item=>presenceBand(item.row.presence.score))},byReliability:grouped(flat,item=>item.row.presence?.usable?reliabilityBand(item.row.presence.reliability):'fallback'),byState:grouped(flat,item=>item.row.presence?.state||'unknown'),bySource:{note:'1行に複数sourceIdが付くため各source集計は重複し、source単独の因果効果を示さない',rows:grouped(bySourceRows,item=>item.sourceId)},bySpot:grouped(flat,item=>item.comparison.spotId),bySpecies:grouped(flat,item=>item.comparison.speciesId),byGroup:{speciesRows:grouped(flat,item=>item.comparison.group),uniqueCurrentGroupBasis:{...groupDirection,upRate:percent(groupDirection.up,groupDirection.available),downRate:percent(groupDirection.down,groupDirection.available),note:'同一地点・日付・時刻・groupを1単位とし、魚種別deltaの平均符号で集計'}},byHour:grouped(flat,item=>item.row.hour),byDaypart:grouped(flat,item=>daypart(item.row.hour)),byCurrentRawBand:grouped(flat,item=>rawBand(item.row.current.rawScore)),deltaDistribution:grouped(usable,item=>String(item.row.delta.raw)),clamp:{...clamp,positiveRate:percent(clamp.positive,usable.length),negativeRate:percent(clamp.negative,usable.length),unclampedRate:percent(clamp.unclamped,usable.length),maxTheoreticalPositive:round(clamp.maxTheoreticalPositive),minTheoreticalNegative:round(clamp.minTheoreticalNegative)},scoreTransitions:{total:stageRows.length,counts:transitions,rows:stageRows},fallback:{total:fallback.length,reasons:Object.fromEntries(Object.entries(fallbackCounts).sort((a,b)=>b[1]-a[1]).map(([reason,count])=>[reason,{count,rate:percent(count,fallback.length)}]))},bestHourAnalysis:{changed:report.summary?.bestHoursChanged||0,comparisons:(report.comparisons||[]).length,explanation:'同一魚種のpresence scoreとreliabilityは24時間で一定で、非clamp域のSHADOW rawはCURRENT rawの単調増加変換になる。±8 clampも順位を反転させないため、最大時刻候補は原理上変わりにくい。'},rankedCauses:[{rank:1,type:'fact',cause:'利用可能Presence入力の高得点偏重',evidence:'利用可能行の平均scoreは0.820、very_high帯が1,752/2,520行で、同帯の上昇率は89.55%'},{rank:2,type:'fact',cause:'Presenceの時間一定値とCURRENT rawの値域差',evidence:'deltaの符号はpresenceScore×100とCURRENT rawの大小で決まり、CURRENT 30-49帯は97.59%上昇、72-100帯は69.44%上昇・28.89%下降'},{rank:3,type:'fact',cause:'pelagicと高得点魚種の構成',evidence:'pelagic平均score 0.913、利用可能行の上昇率90.71%。aji/iwashi等も約91%上昇'},{rank:4,type:'fact',cause:'魚種行の重複は件数を増幅するが偏りを作る唯一因ではない',evidence:'species row基準82.46%上昇に対しunique CURRENT group基準も89.21%上昇'},{rank:5,type:'fact',cause:'+8 clampは正方向にのみ作用',evidence:`+8理論到達${clamp.positive}行、-8理論到達${clamp.negative}行。ただし全利用可能行の${percent(clamp.positive,usable.length)}%に限られる`},{rank:6,type:'hypothesis',cause:'source構成がPresence高得点化へ寄与',evidence:'高得点系列を含むsource付与行で上昇率が高いが、複数source重複のため単独因果は未確定'},{rank:7,type:'fact',cause:'reliability区分では偏りを説明できない',evidence:'利用可能行は全て現行区分high（平均0.821）で、区分間比較が成立しない'}],empiricalValidation:{recordsAvailable:empirical.length,matchingRecords:matchingEmpirical.length,status:matchingEmpirical.length?'limited_matching_records':'INSUFFICIENT_DATA',claimImprovedAccuracy:false,note:matchingEmpirical.length?'一致レコードのみ限定比較可能':'正式実釣レコードがなく、CURRENT/SHADOWの精度優劣は判定不能'},productionSafety:{currentChanged:false,uiConnected:false,productionAdoption:false}};
  }
  window.MFLSpeciesPresenceShadowAnalysis={VERSION,BLEND_STRENGTH,MAX_RAW_DELTA,presenceBand,rawBand,daypart,reliabilityBand,theoreticalDelta,fallbackReason,analyze};
})();

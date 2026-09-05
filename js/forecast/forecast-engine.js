/* MFL explainable species-group forecast engine v1.3 */
(function(){
  'use strict';
  const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
  const confidenceRank={low:0,medium:1,high:2};
  const scoreLevel=raw=>raw>=72?3:raw>=50?2:raw>=30?1:0;
  const uniq=values=>[...new Set(values.filter(Boolean))];
  const daysBetween=(from,to)=>{const value=(new Date(to)-new Date(from))/86400000;return Number.isFinite(value)?value:null};
  function confidenceDetails(model,feature){
    const evidence=model.evidence||{},samples=Number(evidence.sampleCount||0),sources=Number(evidence.sourceCount||0),hourly=Boolean(evidence.hourlyEvidence),age=evidence.lastUpdated?daysBetween(evidence.lastUpdated,feature.date):null,span=evidence.dateRange?.from&&evidence.dateRange?.to?daysBetween(evidence.dateRange.from,evidence.dateRange.to):null;
    let points=0,signals=[];
    if(samples>=8){points+=2;signals.push('標本数が十分')}else if(samples>=3){points+=1;signals.push('標本数は限定的')}else signals.push('標本数が少ない');
    if(sources>=2){points+=2;signals.push('複数ソース')}else if(sources===1){points+=1;signals.push('単一ソース')}else signals.push('ソースなし');
    if(hourly){points+=2;signals.push('時間情報あり')}else signals.push('時間情報なし');
    if(span!==null&&span>=7)points+=1;
    if(age!==null&&age<=90){points+=1;signals.push('データが新しい')}else if(age!==null&&age>365){points-=1;signals.push('データが古い')}
    if(feature.tideLevel!==null){points+=1;signals.push('当日潮汐あり')}else signals.push('当日潮汐なし');
    if(feature.windSpeed!==null){points+=1;signals.push('当日天気あり')}else signals.push('当日天気なし');
    if(model.modelSource==='default'){points-=1;signals.push('defaultモデル')}
    let rank=points>=9&&sources>=2&&hourly?2:points>=5?1:0;rank=Math.min(rank,confidenceRank[evidence.confidence]??0);if(sources<1||samples<2)rank=0;
    return{value:['low','medium','high'][clamp(rank,0,2)],points,signals,inputs:{sampleCount:samples,sourceCount:sources,hourlyEvidence:hourly,ageDays:age,dateSpanDays:span,tideAvailable:feature.tideLevel!==null,weatherAvailable:feature.windSpeed!==null,modelSource:model.modelSource}};
  }
  function sharedAdjustments(feature){
    const modifiers={tide:0,wind:0,rain:0,wave:0},reasons=[];
    if(feature.tidePhase==='上げ潮'||feature.tidePhase==='下げ潮'){modifiers.tide+=6;reasons.push(feature.tidePhase)}
    if(feature.hoursToHigh!==null&&feature.hoursToHigh<=1.5){modifiers.tide+=5;reasons.push('満潮前後')}else if(feature.hoursToLow!==null&&feature.hoursToLow<=1.5){modifiers.tide+=2;reasons.push('干潮前後')}
    if(feature.tidePhase==='潮止まり付近'){modifiers.tide-=4;reasons.push('潮の動きが小さい')}
    if(feature.windSpeed!==null){if(feature.windSpeed>=10){modifiers.wind=-40;reasons.push('強風のため非推奨')}else if(feature.windSpeed>=7){modifiers.wind=-24;reasons.push('風が強い')}else if(feature.windSpeed>=5){modifiers.wind=-10;reasons.push('風の影響あり')}}
    if(feature.rain!==null){if(feature.rain>=5){modifiers.rain=-22;reasons.push('強い雨')}else if(feature.rain>=1){modifiers.rain=-8;reasons.push('雨の影響')}}
    if(feature.wave!==null){if(feature.wave>=2){modifiers.wave=-35;reasons.push('波が高い')}else if(feature.wave>=1.5){modifiers.wave=-18;reasons.push('波に注意')}}
    return{adjustment:Object.values(modifiers).reduce((sum,value)=>sum+value,0),modifiers,reasons};
  }
  function userReasons(seasonReason,periodReasons,conditionReasons){return uniq([seasonReason,...periodReasons,...conditionReasons]).slice(0,3)}
  function calculateModel(feature,model){
    if(model.base===null)return{group:model.group,label:model.label,rawScore:null,score:null,confidence:'low',reasons:['予測データなし'],species:model.species,recommendedMethod:model.recommendedMethod,modelSource:model.modelSource||'default'};
    const baseline=model.base+model.seasonOffset,seasonReason=model.evidence?.reasonLabel||`${Number(feature.month)}月の${model.label}傾向`,periodReasons=[],shared=sharedAdjustments(feature),modifiers={baseline,season:model.seasonOffset,tide:shared.modifiers.tide,mazume:0,wind:shared.modifiers.wind,rain:shared.modifiers.rain,wave:shared.modifiers.wave};
    if(feature.period==='dawn'&&model.group==='pelagic'){modifiers.mazume=10;periodReasons.push('朝マヅメ')}
    if(feature.period==='dusk'&&(model.group==='pelagic'||model.group==='other')){modifiers.mazume=9;periodReasons.push('夕マヅメ')}
    const raw=clamp(Math.round(model.base+model.seasonOffset+shared.adjustment+modifiers.mazume),0,100),confidence=confidenceDetails(model,feature),reasons=userReasons(seasonReason,periodReasons,shared.reasons);
    return{group:model.group,label:model.label,rawScore:raw,score:scoreLevel(raw),confidence:confidence.value,reasons,detailedReasons:uniq([seasonReason,...periodReasons,...shared.reasons,...confidence.signals]),species:model.evidence?.observedSpecies?.length?model.evidence.observedSpecies:model.species,recommendedMethod:model.recommendedMethod,evidence:model.evidence,modelSource:model.modelSource||'default',modifiers,confidenceDebug:confidence};
  }
  function calculate(feature){
    const models=Object.fromEntries(Object.entries(feature.models).map(([group,model])=>[group,calculateModel(feature,model)])),ranked=Object.values(models).filter(item=>item.rawScore!==null).sort((a,b)=>b.rawScore-a.rawScore),dominant=ranked[0];
    if(!dominant)return{hour:feature.hour,score:null,rawScore:null,confidence:'low',recommended:false,reasons:['予測データなし'],models,feature,modelSource:null,debug:{hour:feature.hour,totalScore:null,level:null,modelScores:{},modifiers:{}}};
    const unsafe=feature.safety?.hardStop||feature.safety?.className==='stop',secondary=ranked[1],synergy=secondary?.rawScore>=55?4:secondary?.rawScore>=45?2:0,raw=unsafe?0:clamp(dominant.rawScore+synergy,0,100);let confidence=dominant.confidence;
    if(secondary&&confidenceRank[secondary.confidence]<confidenceRank[confidence]-1)confidence=['low','medium','high'][Math.max(0,confidenceRank[confidence]-1)];
    const reasons=unsafe?userReasons(feature.safety?.restriction?.reason||'安全条件を優先して非推奨',[],dominant.reasons):dominant.reasons;
    return{hour:feature.hour,score:scoreLevel(raw),rawScore:raw,confidence,recommended:!unsafe,reasons,dominantGroup:dominant.group,recommendedMethod:dominant.recommendedMethod,targetSpecies:dominant.species,models,feature,modelSource:dominant.modelSource,evidenceLastUpdated:dominant.evidence?.lastUpdated||null,debug:{hour:feature.hour,totalScore:raw,level:scoreLevel(raw),dominantModel:dominant.group,modelScores:Object.fromEntries(Object.entries(models).map(([group,item])=>[group,item.rawScore])),modifiers:{...dominant.modifiers,synergy,safety:unsafe?-dominant.rawScore:0},confidence,confidenceDetails:dominant.confidenceDebug,detailedReasons:dominant.detailedReasons,modelSource:dominant.modelSource}};
  }
  function buildPeakWindows(hours){
    const windows=[];let current=null;
    hours.filter(item=>item.score!==null&&item.recommended&&item.score>=1).forEach(item=>{const joins=current&&item.hour===current.endHour+1&&item.score===current.score&&item.dominantGroup===current.dominantGroup&&item.recommendedMethod===current.recommendedMethod;if(!joins){current={startHour:item.hour,endHour:item.hour,score:item.score,rawScore:item.rawScore,dominantGroup:item.dominantGroup,recommendedMethod:item.recommendedMethod,targetSpecies:item.targetSpecies,hours:[item.hour]};windows.push(current)}else{current.endHour=item.hour;current.hours.push(item.hour);current.rawScore=Math.max(current.rawScore,item.rawScore)}});
    return windows.sort((a,b)=>b.rawScore-a.rawScore||a.startHour-b.startHour).slice(0,3);
  }
  function qualityCheck(hours,features){
    const warnings=[],calculated=hours.filter(item=>item.score!==null),safe=calculated.filter(item=>item.recommended);
    if(calculated.length===24&&calculated.every(item=>item.score===3))warnings.push('24時間すべて期待度3です');
    const groups=uniq(calculated.map(item=>item.dominantGroup));if(calculated.length===24&&groups.length===1)warnings.push(`24時間すべてdominant modelが${groups[0]}です`);
    if(safe.length===24&&safe.every(item=>item.score===0))warnings.push('安全停止がないのに24時間すべて期待度0です');
    for(let i=1;i<calculated.length-1;i++)if(calculated[i-1].score===0&&calculated[i].score===3&&calculated[i+1].score===0){warnings.push(`${calculated[i].hour}時に0→3→0の急変があります`);break}
    const seasonExists=features.some(feature=>Object.values(feature.models).some(model=>model.seasonMatched));if(seasonExists&&calculated.every(item=>item.modelSource==='default'))warnings.push('月別モデルが存在しますがdefaultのみ使用されています');
    if(features.some(feature=>feature.tideLevel!==null)&&features.every(feature=>feature.tideLevel===null||feature.tideDelta===null))warnings.push('潮汐データがありますが潮特徴量が全時間欠損しています');
    warnings.forEach(message=>console.warn(`[MFL forecast quality] ${message}`));return warnings;
  }
  function predict(features,metadata={}){
    const hours=features.map(calculate),best=[...hours].filter(item=>item.score!==null&&item.recommended).sort((a,b)=>b.rawScore-a.rawScore||a.hour-b.hour).slice(0,3),evidenceLastUpdated=hours.map(item=>item.evidenceLastUpdated).filter(Boolean).sort().at(-1)||metadata.evidenceLastUpdated||null,qualityWarnings=qualityCheck(hours,features);
    return{hours,best,peakWindows:buildPeakWindows(hours),confidence:best[0]?.confidence||'low',calculatedAt:new Date().toISOString(),engineVersion:'1.3.0',baselineVersion:metadata.baselineVersion||null,baselineLastUpdated:metadata.baselineLastUpdated||null,evidenceLastUpdated,modelSources:uniq(hours.map(item=>item.modelSource)),qualityWarnings,debug:{hours:hours.map(item=>item.debug),qualityWarnings}};
  }
  window.MFLForecastEngine={scoreLevel,confidenceDetails,calculateModel,calculate,buildPeakWindows,qualityCheck,predict};
})();

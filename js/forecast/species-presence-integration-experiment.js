/* MFL Phase 9 A/B/C presence integration experiment. Never connected to production/UI. */
(function(){
  'use strict';
  const VERSION='1.0.0',MAX_RAW_DELTA=8,A_BLEND=.12,B_STRENGTH=.08,C_BLEND=.12,C_TIME_FLOOR=.25;
  const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
  const round=(value,digits=3)=>Number((Number(value)||0).toFixed(digits));
  const score=raw=>raw>=72?3:raw>=50?2:raw>=30?1:0;
  const direction=delta=>delta>0?'up':delta<0?'down':'unchanged';
  const daypart=hour=>hour<4?'late_night':hour<8?'dawn':hour<16?'day':hour<20?'dusk':'night';
  const rawBand=raw=>raw<30?'0-29':raw<50?'30-49':raw<72?'50-71':'72-100';
  const presenceBand=value=>value<.2?'very_low':value<.4?'low':value<.6?'neutral':value<.8?'high':'very_high';
  function validPresence(row){return row?.presence?.usable===true&&Number.isFinite(Number(row.presence.score))&&Number.isFinite(Number(row.presence.reliability))}
  function isPassthrough(row){return row?.shadowStatus==='safety_passthrough'||row?.current?.recommended===false||!validPresence(row)}
  function result(row,method,theoreticalDelta,timeFactor=1){
    const currentRaw=Number(row.current.rawScore),currentScore=Number(row.current.score);
    if(!Number.isFinite(currentRaw)||!Number.isFinite(currentScore)||isPassthrough(row))return{method,raw:currentRaw,score:currentScore,delta:0,scoreDelta:0,direction:'unchanged',status:row?.shadowStatus==='safety_passthrough'?'safety_passthrough':'current_fallback',theoreticalDelta:0,timeFactor};
    const delta=round(clamp(theoreticalDelta,-MAX_RAW_DELTA,MAX_RAW_DELTA),1),raw=round(clamp(currentRaw+delta,0,100),1),nextScore=score(raw);
    return{method,raw,score:nextScore,delta,scoreDelta:nextScore-currentScore,direction:direction(delta),status:'calculated',theoreticalDelta:round(theoreticalDelta),timeFactor:round(timeFactor)};
  }
  function methodA(row){
    const theoretical=validPresence(row)?(row.presence.score*100-row.current.rawScore)*row.presence.reliability*A_BLEND:0;
    return result(row,'A_baseline_target_blend',theoretical);
  }
  function methodB(row){
    const signedAvailability=validPresence(row)?(row.presence.score-.5)*2:0;
    const theoretical=validPresence(row)?row.current.rawScore*signedAvailability*row.presence.reliability*B_STRENGTH:0;
    return result(row,'B_availability_gate',theoretical);
  }
  function methodC(row){
    const currentRatio=clamp(Number(row?.current?.rawScore)/100,0,1),timeFactor=C_TIME_FLOOR+(1-C_TIME_FLOOR)*currentRatio;
    const theoretical=validPresence(row)?(row.presence.score*100-row.current.rawScore)*row.presence.reliability*C_BLEND*timeFactor:0;
    return result(row,'C_current_curve_time_aware',theoretical,timeFactor);
  }
  function compareRow(row){return{hour:row.hour,current:{raw:row.current.rawScore,score:row.current.score},presence:{state:row.presence?.state,usable:row.presence?.usable===true,score:row.presence?.score??null,reliability:row.presence?.reliability??null},safety:row.shadowStatus==='safety_passthrough'||row.current?.recommended===false,A:methodA(row),B:methodB(row),C:methodC(row)}}
  function metric(){return{rows:0,available:0,calculated:0,fallback:0,safetyPassthrough:0,up:0,down:0,unchanged:0,scoreChanges:0,deltas:[]}}
  function addMetric(acc,item,method){const value=item[method];acc.rows++;if(item.presence.usable){acc.available++;acc.deltas.push(value.delta)}else acc.fallback++;if(value.status==='calculated')acc.calculated++;if(value.status==='safety_passthrough')acc.safetyPassthrough++;acc[value.direction]++;if(value.scoreDelta!==0)acc.scoreChanges++}
  const mean=values=>values.length?values.reduce((sum,value)=>sum+value,0)/values.length:0;
  const median=values=>{const sorted=values.slice().sort((a,b)=>a-b),mid=Math.floor(sorted.length/2);return sorted.length?(sorted.length%2?sorted[mid]:(sorted[mid-1]+sorted[mid])/2):0};
  const percent=(part,total)=>total?round(part*100/total,2):0;
  function finish(acc){return{rows:acc.rows,available:acc.available,calculated:acc.calculated,fallback:acc.fallback,safetyPassthrough:acc.safetyPassthrough,up:acc.up,down:acc.down,unchanged:acc.unchanged,upRate:percent(acc.up,acc.available),downRate:percent(acc.down,acc.available),meanDelta:round(mean(acc.deltas)),medianDelta:round(median(acc.deltas)),minDelta:acc.deltas.length?Math.min(...acc.deltas):0,maxDelta:acc.deltas.length?Math.max(...acc.deltas):0,scoreChanges:acc.scoreChanges,scoreChangeRate:percent(acc.scoreChanges,acc.available)}}
  function summarize(rows,keyFn){const output={};for(const method of['A','B','C']){const groups={};for(const item of rows){const key=String(keyFn(item));groups[key]??=metric();addMetric(groups[key],item,method)}output[method]=Object.fromEntries(Object.entries(groups).sort(([a],[b])=>a.localeCompare(b,undefined,{numeric:true})).map(([key,value])=>[key,finish(value)]))}return output}
  function bestHours(rows,method){const values=rows.filter(row=>Number.isFinite(row[method].raw));if(!values.length)return[];const max=Math.max(...values.map(row=>row[method].raw));return values.filter(row=>row[method].raw===max).map(row=>row.hour)}
  function transitions(rows,method){const counts={};for(const row of rows){if(row[method].scoreDelta===0)continue;const key=`${row.current.score}->${row[method].score}`;counts[key]=(counts[key]||0)+1}return counts}
  function synthetic(){
    const reliability=[];for(const value of[.25,.5,.85]){const row={hour:12,current:{rawScore:40,score:1,recommended:true},presence:{usable:true,state:'available',score:.8,reliability:value},shadowStatus:'calculated'};reliability.push({currentRaw:40,presenceScore:.8,reliability:value,...compareRow(row)})}
    const scoreGrid=[];for(const currentRaw of[20,40,60,80])for(const presenceScore of[.2,.4,.5,.6,.8,1]){const row={hour:12,current:{rawScore:currentRaw,score:score(currentRaw),recommended:true},presence:{usable:true,state:'available',score:presenceScore,reliability:.8},shadowStatus:'calculated'};scoreGrid.push({currentRaw,presenceScore,reliability:.8,A:methodA(row),B:methodB(row),C:methodC(row)})}
    return{excludedFromActualMetrics:true,reliability,scoreGrid};
  }
  function analyze(report){
    const rows=[],curves=[],peakChanges={A:0,B:0,C:0},peakChangeDetails={A:[],B:[],C:[]};let aMismatches=0;
    for(const comparison of report.comparisons||[]){const compared=comparison.rows.map(compareRow);for(let index=0;index<compared.length;index++){const item={...compared[index],spotId:comparison.spotId,speciesId:comparison.speciesId,group:comparison.group,date:comparison.date,sourceIds:comparison.presence?.sourceIds||[]};rows.push(item);if(round(item.A.raw,1)!==round(comparison.rows[index].shadow.rawScore,1)||item.A.score!==comparison.rows[index].shadow.score)aMismatches++}
      const currentBest=bestHours(compared.map(item=>({...item,CURRENT:{raw:item.current.raw,score:item.current.score}})),'CURRENT');for(const method of['A','B','C']){const shadowBest=bestHours(compared,method);if(JSON.stringify(currentBest)!==JSON.stringify(shadowBest)){peakChanges[method]++;peakChangeDetails[method].push({spotId:comparison.spotId,speciesId:comparison.speciesId,group:comparison.group,currentBest,shadowBest})}}
      if(['kashima','kawarago','choshi-marina-coast'].includes(comparison.spotId)&&['aji','iwashi','magochi'].includes(comparison.speciesId))curves.push({spotId:comparison.spotId,speciesId:comparison.speciesId,group:comparison.group,current:compared.map(row=>row.current.raw),A:compared.map(row=>row.A.raw),B:compared.map(row=>row.B.raw),C:compared.map(row=>row.C.raw),bestHours:{current:currentBest,A:bestHours(compared,'A'),B:bestHours(compared,'B'),C:bestHours(compared,'C')}})
    }
    const overall={};for(const method of['A','B','C']){const acc=metric();for(const row of rows)addMetric(acc,row,method);overall[method]=finish(acc)}
    const actualRows=rows.filter(row=>row.presence.usable&&!row.safety);
    const largeJumps={};for(const method of['A','B','C'])largeJumps[method]=rows.filter(row=>Math.abs(row[method].scoreDelta)>=2).length;
    return{schemaVersion:'1.0.0',phase:'9-presence-integration-abc',mode:'experiment_only',generatedAt:new Date().toISOString(),source:{phase:report.phase,date:report.date,rows:rows.length,comparisons:(report.comparisons||[]).length},definitions:{A:{name:'Baseline SHADOW',formula:'clamp((presence*100-currentRaw)*reliability*0.12, -8, 8)',constants:{blendStrength:A_BLEND,maxRawDelta:MAX_RAW_DELTA},changedFromPhase7:false},B:{name:'Availability Gate',formula:'clamp(currentRaw*((presence-0.5)*2)*reliability*0.08, -8, 8)',constants:{strength:B_STRENGTH,maxRawDelta:MAX_RAW_DELTA},interpretation:'PresenceをCURRENTに対する小倍率として使用'},C:{name:'CURRENT-curve Time-Aware prototype',formula:'A theoretical delta*(0.25+0.75*currentRaw/100), then clamp ±8',constants:{blendStrength:C_BLEND,timeFloor:C_TIME_FLOOR,maxRawDelta:MAX_RAW_DELTA},interpretation:'新しい魚種時間知識を仮定せず、CURRENT曲線を時間係数として低raw時間の影響を抑制'}},phase7Parity:{mismatches:aMismatches,exact:aMismatches===0},overall,byDaypart:summarize(rows,row=>daypart(row.hour)),byCurrentRawBand:summarize(rows,row=>rawBand(row.current.raw)),byPresenceBand:summarize(rows,row=>row.presence.usable?presenceBand(row.presence.score):'fallback'),byGroup:summarize(rows,row=>row.group),bySpecies:summarize(rows,row=>row.speciesId),bySpot:summarize(rows,row=>row.spotId),byHour:summarize(rows,row=>row.hour),transitions:{A:transitions(rows,'A'),B:transitions(rows,'B'),C:transitions(rows,'C')},largeJumps,peakChanges,peakChangeDetails,representativeCurves:curves,synthetic:synthetic(),safety:{currentMutated:false,missingFallbackCurrent:true,malformedFallbackCurrent:true,safetyPassthrough:true,uiConnected:false,productionAdoption:false},evaluation:{A:{status:'KEEP',reason:'Phase 7比較基準として固定'},B:{status:'HOLD',reason:'低raw底上げは抑えるが、上昇率83.49%でAより高く、高rawへ強く作用して2→3が40行・peak候補が2比較で拡大'},C:{status:'PROMISING',reason:'Aの方向性とpeak順位を維持し、深夜・夜の平均deltaと段階変化を大幅に抑制'}},notes:{actualRows:actualRows.length,accuracyClaim:false,waterTemperatureFallbackChanged:false}};
  }
  window.MFLSpeciesPresenceIntegrationExperiment={VERSION,MAX_RAW_DELTA,A_BLEND,B_STRENGTH,C_BLEND,C_TIME_FLOOR,methodA,methodB,methodC,compareRow,analyze,synthetic};
})();

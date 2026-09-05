/* MFL Phase 7 shadow runner. Comparison-only; never writes back to CURRENT or UI. */
(function(){
  'use strict';
  const VERSION='1.0.0',MAX_RAW_DELTA=8,BLEND_STRENGTH=.12,GROUPS=['pelagic','bottom','other'];
  const clone=value=>value===undefined?undefined:JSON.parse(JSON.stringify(value));
  const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
  const stars=raw=>raw>=72?3:raw>=50?2:raw>=30?1:0;
  function compactCurrent(hour){
    return{hour:hour.hour,score:hour.score,rawScore:hour.rawScore,confidence:hour.confidence??null,reasons:clone(hour.reasons||[]),dominantGroup:hour.dominantGroup??hour.dominantModel??null,recommended:hour.recommended!==false,recommendedMethod:hour.recommendedMethod??null,targetSpecies:clone(hour.targetSpecies||[]),models:clone(hour.models||{})};
  }
  function normalizePresence(input){
    if(input===null||input===undefined)return{state:'absent',usable:false,reason:'presenceなし'};
    if(typeof input!=='object')return{state:'malformed',usable:false,reason:'presence形式不正'};
    const score=Number(input.score??input.presenceScore),reliability=Number(input.reliability?.value??input.presenceReliability?.value??input.reliability);
    if(!Number.isFinite(score)||score<0||score>1||!Number.isFinite(reliability)||reliability<0||reliability>1)return{state:'malformed',usable:false,reason:'presence値不正'};
    if(input.status==='unknown'||input.state==='unknown'||input.hardGateEligible===false)return{state:'indeterminate',usable:false,score,reliability,reason:'presence判定不能'};
    return{state:'available',usable:true,score,reliability,label:input.label??input.presenceLabel??null,speciesId:input.speciesId??null,sourceIds:clone(input.sourceIds||[]),reason:'presence利用可能'};
  }
  function shadowHour(currentHour,presenceInput){
    const current=compactCurrent(currentHour),presence=normalizePresence(presenceInput),baseRaw=Number(current.rawScore),baseScore=Number(current.score);
    if(!Number.isFinite(baseRaw)||!Number.isFinite(baseScore))return{hour:current.hour,current,presence,shadow:clone(current),delta:{raw:0,score:0,direction:'unchanged'},reason:'CURRENT値不正のためSHADOW計算を停止',shadowStatus:'failed_current_invalid'};
    if(current.recommended===false)return{hour:current.hour,current,presence,shadow:clone(current),delta:{raw:0,score:0,direction:'unchanged'},reason:'CURRENTの安全停止を維持',shadowStatus:'safety_passthrough'};
    if(!presence.usable)return{hour:current.hour,current,presence,shadow:clone(current),delta:{raw:0,score:0,direction:'unchanged'},reason:`${presence.reason}のためCURRENTを維持`,shadowStatus:'current_fallback'};
    const target=presence.score*100,uncapped=(target-baseRaw)*presence.reliability*BLEND_STRENGTH,rawDelta=Number(clamp(uncapped,-MAX_RAW_DELTA,MAX_RAW_DELTA).toFixed(1)),shadowRaw=Number(clamp(baseRaw+rawDelta,0,100).toFixed(1)),shadowScore=stars(shadowRaw),scoreDelta=shadowScore-baseScore,direction=rawDelta>0?'up':rawDelta<0?'down':'unchanged';
    return{hour:current.hour,current,presence,shadow:{...clone(current),rawScore:shadowRaw,score:shadowScore},delta:{raw:rawDelta,score:scoreDelta,direction},reason:`presence ${direction} / score ${presence.score.toFixed(3)} / reliability ${presence.reliability.toFixed(3)}`,shadowStatus:'calculated'};
  }
  function bestHours(hours,key){const valid=hours.filter(row=>Number.isFinite(Number(row[key]?.rawScore)));if(!valid.length)return[];const max=Math.max(...valid.map(row=>Number(row[key].rawScore)));return valid.filter(row=>Number(row[key].rawScore)===max).map(row=>row.hour)}
  async function compare24({spotId,date,currentResult,presenceByGroup={},loadPresence}){
    const currentBefore=JSON.stringify(currentResult),hours=Array.isArray(currentResult?.hours)?currentResult.hours:[],result={version:VERSION,mode:'shadow_only',spotId,date,currentEngineVersion:currentResult?.engineVersion??null,presenceStatus:'not_loaded',shadowStatus:'ready',rows:[],summary:null,error:null};
    if(hours.length!==24){result.shadowStatus='failed';result.error='CURRENTは24時間である必要があります';result.summary={hours:hours.length,up:0,down:0,unchanged:hours.length,currentBestHours:[],shadowBestHours:[]};return result}
    let presence=presenceByGroup;
    if(typeof loadPresence==='function'){try{presence=await loadPresence({spotId,date})||{};result.presenceStatus='loaded'}catch(error){presence={};result.presenceStatus='load_failed';result.error=String(error?.message||error)}}else result.presenceStatus=Object.keys(presence||{}).length?'provided':'absent';
    result.rows=hours.map(hour=>shadowHour(hour,presence?.[hour.dominantGroup??hour.dominantModel]));
    const count=direction=>result.rows.filter(row=>row.delta.direction===direction).length;
    result.summary={hours:result.rows.length,up:count('up'),down:count('down'),unchanged:count('unchanged'),scoreChanges:result.rows.filter(row=>row.delta.score!==0).length,maxAbsRawDelta:Math.max(...result.rows.map(row=>Math.abs(row.delta.raw))),currentBestHours:bestHours(result.rows,'current'),shadowBestHours:bestHours(result.rows,'shadow'),bestHoursChanged:false};
    result.summary.bestHoursChanged=JSON.stringify(result.summary.currentBestHours)!==JSON.stringify(result.summary.shadowBestHours);
    result.currentUnchanged=JSON.stringify(currentResult)===currentBefore;
    return result;
  }
  function humanLog(comparison){return comparison.rows.map(row=>`${String(row.hour).padStart(2,'0')}:00 CURRENT ${row.current.score} (${row.current.rawScore}) → SHADOW ${row.shadow.score} (${row.shadow.rawScore}) / ${row.delta.raw>=0?'+':''}${row.delta.raw} / ${row.reason}`)}
  window.MFLSpeciesPresenceShadowRunner={VERSION,MAX_RAW_DELTA,BLEND_STRENGTH,GROUPS,normalizePresence,shadowHour,compare24,humanLog};
})();

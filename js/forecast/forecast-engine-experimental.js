/* MFL fishing forecast experimental comparison engine v1.4 */
(function(){
  'use strict';
  const VERSION='1.4.0-experimental',GROUPS=['pelagic','bottom','other'];
  const LIMITS={recentCatch:6,freshness:{min:-6,max:0},evidence:{min:-2,max:2},fieldFeedback:2,total:{min:-8,max:8},lowConfidencePositive:3};
  const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
  const daysBetween=(from,to)=>{const value=(new Date(`${to}T00:00:00Z`)-new Date(`${from}T00:00:00Z`))/86400000;return Number.isFinite(value)?value:null};
  const dateOnly=value=>String(value||'').slice(0,10);
  const scoreLevel=raw=>window.MFLForecastEngine?.scoreLevel?window.MFLForecastEngine.scoreLevel(raw):raw>=72?3:raw>=50?2:raw>=30?1:0;
  function decay(ageDays){if(ageDays===null||ageDays<0)return 0;if(ageDays<=7)return 1;if(ageDays<=14)return .75;if(ageDays<=30)return .4;return 0}
  function evidenceStrength(evidence={}){
    const samples=Number(evidence.sampleCount||0),sources=Number(evidence.sourceCount||0),hourly=Boolean(evidence.hourlyEvidence),declared=evidence.confidence||'low';
    let weight=declared==='high'?1:declared==='medium'?.7:.35;
    if(samples<2||sources<1)weight=Math.min(weight,.2);else if(samples<5)weight=Math.min(weight,.5);
    if(!hourly)weight*=.8;
    return clamp(weight,0,1);
  }
  function freshnessAdjustment(evidence,date){
    const age=evidence?.lastUpdated?daysBetween(evidence.lastUpdated,date):null;
    if(age===null||age<0)return{value:0,ageDays:age};
    const value=age<=30?0:age<=90?-1:age<=180?-2:age<=365?-4:-6;
    return{value:clamp(value,LIMITS.freshness.min,LIMITS.freshness.max),ageDays:age};
  }
  function evidenceAdjustment(evidence={}){
    const samples=Number(evidence.sampleCount||0),sources=Number(evidence.sourceCount||0),hourly=Boolean(evidence.hourlyEvidence);
    let value=0;
    if(samples>=8&&sources>=2&&hourly)value=2;else if(samples>=5&&sources>=2)value=1;else if(samples===0||sources===0)value=-2;else if(samples<3&&!hourly)value=-1;
    return clamp(value,LIMITS.evidence.min,LIMITS.evidence.max);
  }
  function affectsHour(signal,hour){const start=Number(signal.startHour),end=Number(signal.endHour);return Number.isFinite(start)&&Number.isFinite(end)&&hour>=start&&hour<=end}
  function recentCatchAdjustment(spotId,group,hour,date,evidence,signals=[]){
    const strength=evidenceStrength(evidence);let total=0,used=[];
    signals.forEach(signal=>{if(signal.spotId!==spotId||signal.speciesGroup!==group||!affectsHour(signal,hour))return;const age=daysBetween(dateOnly(signal.observedAt||signal.date),date),freshness=decay(age);if(!freshness)return;const amount=clamp(Number(signal.weight||1),0,3)*freshness*strength;total+=amount;used.push({id:signal.id||null,ageDays:age,decay:freshness,amount:Number(amount.toFixed(2))})});
    return{value:Number(clamp(total,0,LIMITS.recentCatch).toFixed(2)),signals:used};
  }
  function fieldFeedbackAdjustment(spotId,group,hour,date,feedback=[]){
    let total=0,used=[];
    feedback.forEach(item=>{if(item.spotId!==spotId||!item.modelSignals?.[group]||!affectsHour(item,hour))return;const age=daysBetween(dateOnly(item.observedAt||item.date),date),freshness=decay(age);if(!freshness)return;let weight=clamp(Number(item.modelSignals[group]),-1,1);if(item.type==='nuisanceFish')weight=Math.min(weight,.5);if(item.type==='surfaceActivity')weight=Math.min(weight,.25);const amount=weight*freshness;total+=amount;used.push({id:item.id||null,type:item.type,species:item.species||null,speciesConfirmed:Boolean(item.speciesConfirmed),amount:Number(amount.toFixed(2))})});
    return{value:Number(clamp(total,-LIMITS.fieldFeedback,LIMITS.fieldFeedback).toFixed(2)),signals:used};
  }
  function fallback(currentResult,reason){return{...currentResult,engineVersion:VERSION,experimental:true,fallbackToV13:true,fallbackReason:reason,currentEngineVersion:currentResult?.engineVersion||'1.3.0',debug:{...(currentResult?.debug||{}),experimental:{fallback:true,reason}}}}
  function compare(features,currentResult,experimentalData={}){
    if(!Array.isArray(features)||features.length!==24||!currentResult||!Array.isArray(currentResult.hours)||currentResult.hours.length!==24)return fallback(currentResult,'入力データ不足');
    try{
      const hours=features.map((feature,index)=>{
        const current=currentResult.hours[index];if(!current||current.hour!==feature.hour)return{...current,experimentalDebug:{fallback:true,reason:'時間データ不一致'}};
        const unsafe=feature.safety?.hardStop||feature.safety?.className==='stop'||current.recommended===false;
        const models={};
        GROUPS.forEach(group=>{
          const currentModel=current.models?.[group],featureModel=feature.models?.[group];
          if(!currentModel||currentModel.rawScore===null||!featureModel){models[group]=currentModel;return}
          const catalogEvidence=window.MFLForecastConfidenceExperimental?.evidenceFor(experimentalData.evidenceCatalog,feature.spotId,group),evidence=catalogEvidence||featureModel.evidence||currentModel.evidence||{},relevantFeedback=(experimentalData.fieldFeedback||[]).filter(item=>item.spotId===feature.spotId&&(item.modelSignals?.[group]||item.speciesGroup===group)),confidenceV2=window.MFLForecastConfidenceExperimental?.evaluate(evidence,feature.date,relevantFeedback)||{value:currentModel.confidence||'low'},recent=recentCatchAdjustment(feature.spotId,group,feature.hour,feature.date,evidence,experimentalData.recentCatchSignals),fresh=freshnessAdjustment(evidence,feature.date),evidenceValue=evidenceAdjustment(evidence),field=fieldFeedbackAdjustment(feature.spotId,group,feature.hour,feature.date,experimentalData.fieldFeedback);
          let adjustment=recent.value+fresh.value+evidenceValue+field.value;const positiveLimit=confidenceV2.value==='low'?LIMITS.lowConfidencePositive:LIMITS.total.max;adjustment=clamp(adjustment,LIMITS.total.min,positiveLimit);
          const raw=unsafe?0:clamp(Math.round(currentModel.rawScore+adjustment),0,100);
          models[group]={...currentModel,rawScore:raw,score:scoreLevel(raw),experimentalConfidence:confidenceV2.value,experimentalDebug:{currentScore:currentModel.score,currentRawScore:currentModel.rawScore,experimentalScore:scoreLevel(raw),experimentalRawScore:raw,recentCatchAdjustment:recent.value,freshnessAdjustment:fresh.value,evidenceAdjustment:evidenceValue,fieldFeedbackAdjustment:field.value,totalAdjustment:Number(adjustment.toFixed(2)),evidenceAgeDays:fresh.ageDays,confidenceV2,recentCatchSignals:recent.signals,fieldFeedbackSignals:field.signals}};
        });
        const ranked=Object.values(models).filter(model=>model&&model.rawScore!==null).sort((a,b)=>b.rawScore-a.rawScore),dominant=ranked[0];
        if(!dominant)return{...current,models,experimentalDebug:{fallback:true,reason:'モデルデータ不足'}};
        const currentDominantRaw=current.models?.[current.dominantGroup]?.rawScore??current.rawScore,synergy=clamp((current.rawScore??0)-(currentDominantRaw??0),0,4);let raw=unsafe?0:clamp(dominant.rawScore+synergy,0,100),score=scoreLevel(raw);
        const dominantDebug=dominant.experimentalDebug||{};
        const singleCatchOnly=dominantDebug.recentCatchSignals?.length===1&&(dominantDebug.fieldFeedbackAdjustment||0)<=0&&(dominantDebug.evidenceAdjustment||0)<=0;
        if(current.score<3&&score===3&&singleCatchOnly){raw=Math.min(raw,71);score=scoreLevel(raw)}
        return{...current,score,rawScore:raw,recommended:!unsafe,dominantGroup:dominant.group,recommendedMethod:dominant.recommendedMethod,targetSpecies:dominant.species,models,experimentalConfidence:dominant.experimentalConfidence||current.confidence,experimentalDebug:{currentScore:current.score,currentRawScore:current.rawScore,experimentalScore:score,experimentalRawScore:raw,recentCatchAdjustment:dominantDebug.recentCatchAdjustment||0,freshnessAdjustment:dominantDebug.freshnessAdjustment||0,evidenceAdjustment:dominantDebug.evidenceAdjustment||0,fieldFeedbackAdjustment:dominantDebug.fieldFeedbackAdjustment||0,totalAdjustment:dominantDebug.totalAdjustment||0,confidenceV2:dominantDebug.confidenceV2||null,dominantModel:dominant.group,safetyStopped:unsafe,synergy,modelAdjustments:Object.fromEntries(GROUPS.map(group=>[group,models[group]?.experimentalDebug||null]))}};
      });
      return{...currentResult,hours,engineVersion:VERSION,experimental:true,fallbackToV13:false,currentEngineVersion:currentResult.engineVersion,debug:{...currentResult.debug,experimental:{limits:LIMITS,hours:hours.map(hour=>hour.experimentalDebug)}}};
    }catch(error){return fallback(currentResult,error?.message||'experimental計算失敗')}
  }
  window.MFLForecastExperimental={VERSION,LIMITS,decay,evidenceStrength,freshnessAdjustment,evidenceAdjustment,recentCatchAdjustment,fieldFeedbackAdjustment,compare};
})();

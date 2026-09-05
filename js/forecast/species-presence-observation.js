/* MFL species presence observation-mode batch runner v1 - no production UI integration */
(function(){
  'use strict';
  const VERSION='1.0.0';
  function compact(result){return{spotId:result.spotId,speciesId:result.speciesId,rawPresenceScore:result.structuralCompatibility.rawPresenceScore,finalPresenceScore:result.score,label:result.label,seasonScore:result.scores.seasonScore,regionScore:result.scores.regionScore,waterTempScore:result.scores.waterTempScore,marineConditionScore:result.scores.marineConditionScore,marineConditionUsedForPresenceScore:false,dataConfidence:result.dataConfidence,presenceReliability:result.presenceReliability,hardGateEligible:result.hardGateEligible,hardGateIneligibleReasons:result.hardGateIneligibleReasons,waterTemp:result.waterTemperature.value,waterTempSourceType:result.waterTemperature.quality,missingCriticalInputs:result.missingCriticalInputs,habitatMatch:result.habitatMatch.status,marineRegionMatch:result.marineRegionMatch,capApplied:result.structuralCompatibility.capApplied,environmentalSourceIds:result.sourceIds};}
  function evaluateAll({date,environments={},observations=[],regions,profiles,sources,config}){
    const results=[];for(const spotId of Object.keys(regions.spots||{})){for(const speciesId of Object.keys(profiles.species||{})){const environment=environments[spotId]||{};results.push(window.MFLSpeciesPresenceBaseline.evaluate({spotId,speciesId,date,environment,observations,regions,profiles,sources,config}));}}
    return{mode:'observation',version:VERSION,date,generatedAt:new Date().toISOString(),spotCount:Object.keys(regions.spots||{}).length,speciesCount:Object.keys(profiles.species||{}).length,evaluationCount:results.length,integration:{connected:false,forecastWeight:0,historicalPerformanceWeight:0},results:results.map(compact),details:results};
  }
  function existingSpeciesScore(existing,spotId,speciesId,profiles){
    const value=existing?.[spotId]?.[speciesId];if(Number.isFinite(Number(value)))return Number(value);
    const profile=profiles.species?.[speciesId],aliases=new Set([profile?.species,...(profile?.aliases||[])]),hours=existing?.[spotId]?.hours||[],matching=hours.filter(hour=>(hour.targetSpecies||[]).some(name=>aliases.has(name)));return matching.length?Math.max(...matching.map(hour=>Number(hour.score)||0)):null;
  }
  function compareAll({batch,existingForecasts={},profiles}){return batch.details.map(presence=>{const score=existingSpeciesScore(existingForecasts,presence.spotId,presence.speciesId,profiles),existing=score===null?null:{score};return window.MFLSpeciesPresenceBaseline.compare(existing,presence)});}
  function findMismatches({comparisons,config}){
    const t=config?.mismatchThresholds||{},rank={low:0,medium:1,high:2},items=[];
    comparisons.forEach(comparison=>{const presence=comparison.speciesPresenceBaseline,existing=Number(comparison.existingForecast?.score),hasExisting=Number.isFinite(existing),reasons=[];
      if(hasExisting&&existing>=(t.existingHigh??3)&&presence.score<(t.presenceLow??.46))reasons.push('existing_high_presence_low');
      if(hasExisting&&existing<=(t.existingLow??1)&&presence.score>=(t.presenceHigh??.66))reasons.push('existing_low_presence_high');
      if(presence.scores.waterTempScore!==null&&Math.abs(presence.scores.seasonScore-presence.scores.waterTempScore)>=(t.seasonWaterDifference??.55))reasons.push('season_water_conflict');
      if(presence.score>=(t.highScore??.66)&&rank[presence.dataConfidence.level]<=rank[t.lowConfidence||'low'])reasons.push('high_score_low_confidence');
      if(presence.missingCriticalInputs?.length)reasons.push('missing_critical_environment');
      if(reasons.length)items.push({spotId:presence.spotId,speciesId:presence.speciesId,existingForecastScore:hasExisting?existing:null,presenceScore:presence.score,presenceLabel:presence.label,dataConfidence:presence.dataConfidence.level,reasons});
    });return items;
  }
  function comparisonRecords({batch,snapshot}){return batch.details.map(presence=>{const existing=snapshot?.spots?.[presence.spotId]?.[presence.speciesId],comparable=existing?.comparisonStatus==='comparable';return{spotId:presence.spotId,speciesId:presence.speciesId,existingForecastScore:comparable?existing.existingForecastScore:null,existingForecastLabel:comparable?existing.existingForecastLabel:null,presenceScore:presence.score,presenceLabel:presence.label,presenceDataConfidence:presence.dataConfidence.level,presenceReliability:presence.presenceReliability,hardGateEligible:presence.hardGateEligible,waterTemp:presence.waterTemperature.value,waterTempQuality:presence.waterTemperature.quality,missingCriticalInputs:presence.missingCriticalInputs,habitatMatch:presence.habitatMatch.status,marineRegionMatch:presence.marineRegionMatch,comparisonStatus:comparable?'comparable':'not_comparable',seasonScore:presence.scores.seasonScore,regionScore:presence.scores.regionScore,waterTempScore:presence.scores.waterTempScore,marineConditionScore:presence.scores.marineConditionScore,marineConditionUsedForPresenceScore:false}})}
  window.MFLSpeciesPresenceObservation={VERSION,compact,evaluateAll,existingSpeciesScore,compareAll,findMismatches,comparisonRecords};
})();

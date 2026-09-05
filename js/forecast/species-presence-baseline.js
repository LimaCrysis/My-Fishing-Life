/* MFL public environmental species-presence baseline v1 (independent, zero forecast weight) */
(function(){
  'use strict';
  const VERSION='1.3.0',FORECAST_WEIGHT=0,QUALITY_WEIGHT={observed:1,nearby_observed:.9,regional_observed:.7,regional:.65,climatology:.5,missing:.15},PROFILE_WEIGHT={high:1,medium:.72,low:.45};
  const clamp=(value,min=0,max=1)=>Math.max(min,Math.min(max,Number(value)||0));
  const monthOf=date=>Number(String(date||'').slice(5,7))||new Date(date).getMonth()+1;
  const unique=items=>[...new Set(items)];
  function normalizeEnvironment(input={}){
    const numberOrNull=value=>value===null||value===undefined||value===''?null:(Number.isFinite(Number(value))?Number(value):null);
    return{waterTemperature:numberOrNull(input.waterTemperature),waterTemperatureQuality:['observed','nearby_observed','regional_observed','regional','climatology','missing'].includes(input.waterTemperatureQuality)?input.waterTemperatureQuality:'missing',waterTemperatureSourceId:input.waterTemperatureSourceId||null,observationDate:input.observationDate||null,evaluatedAt:input.evaluatedAt||null,tidePhase:input.tidePhase||null,windSpeed:numberOrNull(input.windSpeed),waveHeight:numberOrNull(input.waveHeight),weatherCode:input.weatherCode??null,marineCondition:input.marineCondition||null,sourceIds:unique((input.sourceIds||[]).filter(Boolean))};
  }
  function resolveWaterTemperature({spotId,regionId,month,environment={},observations=[]}){
    const direct=normalizeEnvironment(environment);
    if(direct.waterTemperature!==null)return{value:direct.waterTemperature,quality:direct.waterTemperatureQuality==='missing'?'observed':direct.waterTemperatureQuality,sourceId:direct.waterTemperatureSourceId,observationDate:direct.observationDate,level:'input'};
    const usable=observations.filter(item=>item.waterTemp!==null&&item.waterTemp!==undefined&&item.waterTemp!==''&&Number.isFinite(Number(item.waterTemp))&&Number(item.month)===month);
    const spotObserved=usable.find(item=>item.spotId===spotId&&item.quality==='observed');
    if(spotObserved)return{value:Number(spotObserved.waterTemp),quality:'observed',sourceId:spotObserved.sourceId||null,observationDate:spotObserved.observationDate||null,level:'nearby_observation'};
    const regional=usable.find(item=>item.regionId===regionId&&['observed','regional'].includes(item.quality));
    if(regional)return{value:Number(regional.waterTemp),quality:'regional',sourceId:regional.sourceId||null,observationDate:regional.observationDate||null,level:'regional'};
    const climatology=usable.find(item=>item.regionId===regionId&&item.quality==='climatology');
    if(climatology)return{value:Number(climatology.waterTemp),quality:'climatology',sourceId:climatology.sourceId||null,observationDate:null,level:'climatology'};
    return{value:null,quality:'missing',sourceId:null,observationDate:null,level:'disabled'};
  }
  function seasonScore(profile,month){
    if((profile.peakMonths||[]).includes(month))return 1;
    if((profile.monthRange||[]).includes(month))return .78;
    const adjacent=(profile.monthRange||[]).some(active=>Math.min(Math.abs(active-month),12-Math.abs(active-month))===1);
    return adjacent?.42:.12;
  }
  function temperatureScore(profile,value){
    if(value===null)return null;
    const range=profile.preferredWaterTemp||{},min=Number(range.min),max=Number(range.max),margin=Math.max(1,Number(range.softMargin)||3);
    if(!Number.isFinite(min)||!Number.isFinite(max))return null;
    if(value>=min&&value<=max)return 1;
    const distance=value<min?min-value:value-max;
    return distance<=margin?clamp(1-(distance/margin)*.7):.1;
  }
  function habitatCompatibility(profile,region,spotMapping){
    const available=unique([...(region?.habitats||[]),...(spotMapping?.habitatOverrides||[])]),preferred=profile.habitat||[],matched=available.filter(item=>preferred.includes(item)),explicit=spotMapping?.habitatOverrides||[],explicitMatches=explicit.filter(item=>preferred.includes(item));
    const status=explicit.length?(explicitMatches.length?'match':'mismatch'):(matched.length?'regional_match':'unknown');
    return{status,score:status==='match'?Math.min(1,.78+explicitMatches.length*.08):status==='regional_match'?Math.min(.86,.66+matched.length*.08):status==='mismatch'?.28:.5,matched,available,preferred};
  }
  function regionScore(profile,regionId,region,spotMapping){
    if(!(profile.regions||[]).includes(regionId))return .12;
    return habitatCompatibility(profile,region,spotMapping).score;
  }
  function marineConditionScore(environment){
    let score=.72,used=[];
    if(environment.waveHeight!==null){used.push('waveHeight');score+=environment.waveHeight<=1?.12:environment.waveHeight<=2?0:-.25}
    if(environment.windSpeed!==null){used.push('windSpeed');score+=environment.windSpeed<=6?.06:environment.windSpeed>=14?-.2:0}
    if(environment.tidePhase){used.push('tidePhase');score+=.03}
    if(environment.marineCondition==='adverse'){used.push('marineCondition');score-=.25}
    if(environment.marineCondition==='normal'){used.push('marineCondition');score+=.05}
    return{score:clamp(score),used};
  }
  function freshnessScore(observationDate,date,quality){
    if(!observationDate)return quality==='climatology'?.55:.35;
    const days=Math.max(0,(Date.parse(date)-Date.parse(observationDate))/86400000);
    return days<=2?1:days<=7?.85:days<=30?.65:.4;
  }
  function confidence({profile,spotMapping,temperature,date,environment,marineUsed}){
    const components={profile:PROFILE_WEIGHT[profile.sourceQuality]||.35,region:spotMapping.matchQuality==='high'?1:spotMapping.matchQuality==='medium'?.72:.45,temperature:QUALITY_WEIGHT[temperature.quality],freshness:freshnessScore(temperature.observationDate,date,temperature.quality),conditions:marineUsed.length>=2?.85:marineUsed.length?.65:.35};
    const level=value=>value>=.78?'high':value>=.52?'medium':'low',speciesProfileConfidence={value:components.profile,level:profile.sourceQuality==='high'?'high':profile.sourceQuality==='medium'?'medium':'low',sourceQuality:profile.sourceQuality||'unknown'},environmentValue=clamp(components.temperature*.7+components.freshness*.3),environmentDataConfidence={value:Number(environmentValue.toFixed(3)),level:level(environmentValue),waterTemperatureQuality:temperature.quality,conditionInputs:[],excludedShortTermInputs:marineUsed,usedForPresenceScore:false},spatialMatchConfidence={value:components.region,level:level(components.region),mappingQuality:spotMapping.matchQuality||'unknown'},temporalFreshnessConfidence={value:components.freshness,level:level(components.freshness),observationDate:temperature.observationDate||null};
    const uncappedValue=clamp((components.profile*.25+components.region*.2+components.temperature*.25+components.freshness*.15)/.85),caps=[{type:'species_profile',value:speciesProfileConfidence.level==='low'?.51:speciesProfileConfidence.level==='medium'?.77:1}];if(temperature.quality==='missing')caps.push({type:'water_temperature_missing',value:.77});const capValue=Math.min(...caps.map(item=>item.value));let value=Math.min(uncappedValue,capValue),missing=[],excludedShortTermMissing=[];
    if(temperature.quality==='missing')missing.push('waterTemperature');if(!environment.waveHeight&&environment.waveHeight!==0)excludedShortTermMissing.push('waveHeight');if(!environment.windSpeed&&environment.windSpeed!==0)excludedShortTermMissing.push('windSpeed');
    const overallDataConfidence={value:Number(value.toFixed(3)),level:level(value),uncappedValue:Number(uncappedValue.toFixed(3)),capValue,caps,meaning:'存在環境評価を支えるデータ品質。魚がいる確率・釣れる確率ではない。'};
    return{value:overallDataConfidence.value,level:overallDataConfidence.level,meaning:overallDataConfidence.meaning,speciesProfileConfidence,environmentDataConfidence,spatialMatchConfidence,temporalFreshnessConfidence,overallDataConfidence,components,missing,excludedShortTermMissing};
  }
  function integrationMetadata(dataConfidence,missingCriticalInputs){
    const level=value=>value>=.78?'high':value>=.52?'medium':'low',profile=dataConfidence.speciesProfileConfidence.value,spatial=dataConfidence.spatialMatchConfidence.value,overall=dataConfidence.overallDataConfidence.value,completeness=missingCriticalInputs.length?.35:1,uncapped=clamp(overall*.45+profile*.25+spatial*.2+completeness*.1),caps=[];
    if(missingCriticalInputs.length)caps.push({type:'missing_critical_inputs',value:.65});if(dataConfidence.speciesProfileConfidence.level==='low')caps.push({type:'species_profile_low',value:.5});if(dataConfidence.spatialMatchConfidence.level==='low')caps.push({type:'spatial_match_low',value:.55});const capValue=caps.length?Math.min(...caps.map(item=>item.value)):1,value=Math.min(uncapped,capValue),reliability={value:Number(value.toFixed(3)),level:level(value),uncappedValue:Number(uncapped.toFixed(3)),capValue,caps,meaning:'将来の統合時にpresenceScoreをどの程度信用できるかを表すメタデータ。存在確率・釣果確率ではなく、現在のスコアには影響しない。'};
    const reasons=[];if(missingCriticalInputs.length)reasons.push('missing_critical_inputs');if(dataConfidence.speciesProfileConfidence.level==='low')reasons.push('species_profile_low');if(dataConfidence.spatialMatchConfidence.level==='low')reasons.push('spatial_match_low');if(dataConfidence.overallDataConfidence.level==='low')reasons.push('overall_confidence_low');if(reliability.value<.7)reasons.push('reliability_below_gate_threshold');
    return{presenceReliability:reliability,hardGateEligible:reasons.length===0,hardGateIneligibleReasons:reasons};
  }
  function labelFor(score){return score>=.82?'かなり期待できる環境':score>=.66?'期待できる環境':score>=.46?'平常':score>=.28?'やや条件外':'季節・環境的に期待薄'}
  function evaluate({spotId,speciesId,date,environment={},observations=[],regions,profiles,sources=null,config=null}){
    const spotMapping=regions?.spots?.[spotId],profile=profiles?.species?.[speciesId];
    if(!spotMapping)throw new Error(`Unknown marine region for spot: ${spotId}`);if(!profile)throw new Error(`Unknown species profile: ${speciesId}`);
    const regionId=spotMapping.marineRegion,region=regions.regions?.[regionId],month=monthOf(date),normalized=normalizeEnvironment(environment),temperature=resolveWaterTemperature({spotId,regionId,month,environment:normalized,observations}),habitatMatch=habitatCompatibility(profile,region,spotMapping),marineRegionMatch=(profile.regions||[]).includes(regionId),scores={seasonScore:seasonScore(profile,month),waterTempScore:temperatureScore(profile,temperature.value),regionScore:marineRegionMatch?habitatMatch.score:.12},marine=marineConditionScore(normalized);scores.marineConditionScore=marine.score;
    const configured=config?.weights||{},weights={season:Number(configured.season)||.34,region:Number(configured.region)||.28,waterTemperature:Number(configured.waterTemperature)||.25,marineCondition:0};
    const weighted=[{value:scores.seasonScore,weight:weights.season},{value:scores.regionScore,weight:weights.region}],tempAvailable=scores.waterTempScore!==null;if(tempAvailable)weighted.push({value:scores.waterTempScore,weight:weights.waterTemperature});
    const totalWeight=weighted.reduce((sum,item)=>sum+item.weight,0),unboundedScore=clamp(weighted.reduce((sum,item)=>sum+item.value*item.weight,0)/totalWeight),applicableCaps=[!marineRegionMatch?{type:'marine_region',value:.45}:null,habitatMatch.status==='mismatch'?{type:'habitat',value:.65}:null].filter(Boolean),compatibilityCap=applicableCaps.length?Math.min(...applicableCaps.map(item=>item.value)):1,score=Math.min(unboundedScore,compatibilityCap),dataConfidence=confidence({profile,spotMapping,temperature,date:normalized.evaluatedAt||date,environment:normalized,marineUsed:marine.used}),sourceIds=unique([...(profile.sourceIds||[]),temperature.sourceId,...normalized.sourceIds].filter(Boolean));
    const missingCriticalInputs=[temperature.quality==='missing'?'waterTemperature':null].filter(Boolean),integration=integrationMetadata(dataConfidence,missingCriticalInputs),scoreFeatures={season:{usedForPresenceScore:true,weight:weights.season},marineRegionHabitat:{usedForPresenceScore:true,weight:weights.region},waterTemperature:{usedForPresenceScore:tempAvailable,weight:weights.waterTemperature},shortTermBiteability:{usedForPresenceScore:false,weight:0,inputs:{tidePhase:normalized.tidePhase,windSpeed:normalized.windSpeed,waveHeight:normalized.waveHeight,weatherCode:normalized.weatherCode,marineCondition:normalized.marineCondition},reason:'潮・風・波・天気等は現行予測の「今食いやすいか」の責務。取得値は保持するがpresenceScoreへ加えない。'}};
    return{layer:'speciesPresenceBaseline',version:VERSION,forecastWeight:FORECAST_WEIGHT,spotId,speciesId,species:profile.species,taxonType:profile.taxonType||'fish',date,month,marineRegion:{id:regionId,name:region?.name||regionId,matchQuality:spotMapping.matchQuality},marineRegionMatch,habitatMatch,structuralCompatibility:{rawPresenceScore:Number(unboundedScore.toFixed(3)),finalPresenceScore:Number(score.toFixed(3)),capApplied:score<unboundedScore,capType:applicableCaps.map(item=>item.type),capValue:compatibilityCap,applicableCaps},score:Number(score.toFixed(3)),label:labelFor(score),scores:Object.fromEntries(Object.entries(scores).map(([key,value])=>[key,value===null?null:Number(value.toFixed(3))])),weights,scoreFeatures,waterTemperature:temperature,missingCriticalInputs,dataConfidence,...integration,sourceIds,sources:sourceIds.map(id=>sources?.sources?.[id]).filter(Boolean),disclaimer:'環境上の存在しやすさの段階評価であり、魚の存在確率・釣果確率ではない。'};
  }
  function compare(existingForecast,presenceResult){const existingScore=existingForecast?.score??existingForecast?.stars??null;return{existingForecast,speciesPresenceBaseline:presenceResult,summary:{existingForecast:existingScore===null?'データなし':`★${'★'.repeat(Math.max(0,Number(existingScore)-1))}`,presenceEnvironment:presenceResult?.label||'データなし',dataConfidence:presenceResult?.dataConfidence?.level||'low'},integration:{connected:false,forecastWeight:0,historicalPerformanceWeight:0}}}
  window.MFLSpeciesPresenceBaseline={VERSION,FORECAST_WEIGHT,normalizeEnvironment,resolveWaterTemperature,seasonScore,temperatureScore,habitatCompatibility,regionScore,marineConditionScore,integrationMetadata,labelFor,evaluate,compare};
})();

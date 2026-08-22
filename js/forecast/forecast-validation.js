/* MFL forecast configuration validation v1.3 */
(function(){
  'use strict';
  const GROUPS=['pelagic','bottom','other'];
  const warn=(path,message)=>console.warn(`[MFL forecast] ${path}: ${message}`);
  const validHourly=value=>Array.isArray(value)&&value.length===24&&value.every(item=>Number.isFinite(item)&&item>=0&&item<=100);
  const validDate=value=>/^\d{4}-\d{2}-\d{2}$/.test(String(value||''));
  function validEvidence(value,group,path){
    if(!value||typeof value!=='object'){warn(path,'evidenceがありません');return false}
    const checks=[
      [value.speciesGroup===group,'speciesGroupがモデルと一致しません'],
      [Number.isInteger(value.sampleCount)&&value.sampleCount>=0,'sampleCountが不正です'],
      [Number.isInteger(value.sourceCount)&&value.sourceCount>=0,'sourceCountが不正です'],
      [validDate(value.lastUpdated),'lastUpdatedはYYYY-MM-DDで指定してください'],
      [['low','medium','high'].includes(value.confidence),'confidenceが不正です'],
      [Array.isArray(value.observedSpecies),'observedSpeciesは配列で指定してください']
    ];
    const failed=checks.find(([ok])=>!ok);if(failed){warn(path,failed[1]);return false}return true;
  }
  function validateModel(model,group,path){
    if(!model||typeof model!=='object'){warn(path,'モデルがありません');return null}
    if(!validHourly(model.default)){warn(`${path}.default`,'24個の0〜100の数値が必要です');return null}
    const clean={...model,default:[...model.default],season:{}};
    Object.entries(model.season||{}).forEach(([month,season])=>{
      const seasonPath=`${path}.season.${month}`;
      if(!/^(0[1-9]|1[0-2])$/.test(month)){warn(seasonPath,'月キーが01〜12ではありません');return}
      if(season.hourly!==undefined&&!validHourly(season.hourly)){warn(`${seasonPath}.hourly`,'24個の0〜100の数値が必要なため、この月モデルを無効化しました');return}
      if(!validEvidence(season.evidence,group,`${seasonPath}.evidence`)||Number(season.evidence.month)!==Number(month)){warn(seasonPath,'根拠情報またはmonthが不正なため、この月モデルを無効化しました');return}
      clean.season[month]={...season,hourly:season.hourly?[...season.hourly]:undefined,evidence:{...season.evidence}};
    });
    return clean;
  }
  function validateBaselines(input){
    const clean={...input,spots:{}};
    Object.entries(input?.spots||{}).forEach(([spotId,spot])=>{
      if(!spotId){warn('baselines.spots','地点IDが空です');return}
      if(!spot?.models||typeof spot.models!=='object'){warn(`baselines.spots.${spotId}`,'modelsがありません');return}
      const models={};GROUPS.forEach(group=>{const model=validateModel(spot.models[group],group,`baselines.spots.${spotId}.models.${group}`);if(model)models[group]=model});
      clean.spots[spotId]={...spot,models};
    });
    return clean;
  }
  function validateSpots(input){
    const clean={...input,spots:{}};
    Object.entries(input?.spots||{}).forEach(([spotId,spot])=>{
      if(!spotId||!spot?.speciesGroups){warn(`spots.${spotId||'(empty)'}`,'地点IDまたはspeciesGroupsが不正です');return}
      const missing=GROUPS.filter(group=>!spot.speciesGroups[group]);
      if(missing.length){warn(`spots.${spotId}`,`魚種グループが不足しています: ${missing.join(', ')}`);return}
      clean.spots[spotId]=spot;
    });
    return clean;
  }
  function validate(baselines,spots){const cleanBaselines=validateBaselines(baselines),cleanSpots=validateSpots(spots);['kashima','kemigawa_beach'].forEach(spotId=>{if(!cleanBaselines.spots[spotId]||!cleanSpots.spots[spotId])warn(spotId,'対象地点のベースラインまたは地点設定がありません')});return{baselines:cleanBaselines,spots:cleanSpots}}
  window.MFLForecastValidation={GROUPS,validHourly,validateModel,validateBaselines,validateSpots,validate};
})();

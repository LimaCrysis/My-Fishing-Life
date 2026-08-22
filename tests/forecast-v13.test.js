'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('assert'),root=__dirname+'/..';
global.window=global;
const warnings=[];console.warn=(...args)=>warnings.push(args.join(' '));
window.MFLTides={getHourlyTideFeatures:()=>Array.from({length:24},(_,hour)=>({level:80+hour,phase:hour<12?'上げ潮':'下げ潮',delta:hour<12?4:-4}))};
['forecast-validation.js','forecast-features.js','forecast-engine.js'].forEach(file=>vm.runInThisContext(fs.readFileSync(`${root}/js/forecast/${file}`,'utf8'),{filename:file}));
const baselines=JSON.parse(fs.readFileSync(`${root}/data/fishing-forecast-baselines.json`)),spots=JSON.parse(fs.readFileSync(`${root}/data/fishing-forecast-spots.json`));
const config=MFLForecastValidation.validate(baselines,spots);
const weather={sunrise:'2026-09-22T05:28',sunset:'2026-09-22T17:38',hourly:Array.from({length:24},(_,hour)=>({hour,windSpeed:2,rain:0,wave:.5})),safety:{hardStop:false}};
const tideDay={hourly:[],highs:[{time:'06:00'}],lows:[{time:'12:00'}]};
function prediction(spotId,date='2026-09-22'){
  const features=MFLForecastFeatures.normalize({spotId,date,baseline:config.baselines.spots[spotId],spotProfile:config.spots.spots[spotId],tideDay,weather});
  return MFLForecastEngine.predict(features,{baselineVersion:baselines.version,baselineLastUpdated:baselines.updated});
}
const kemigawa=prediction('kemigawa_beach');
assert.equal(kemigawa.hours.length,24);assert.equal(kemigawa.hours[5].dominantGroup,'pelagic');assert.equal(kemigawa.hours[6].dominantGroup,'pelagic');assert.equal(kemigawa.hours[12].dominantGroup,'bottom');assert.ok(kemigawa.hours.every(item=>item.reasons.length<=3));assert.ok(kemigawa.hours[5].debug.modelScores.pelagic>=kemigawa.hours[5].debug.modelScores.bottom);assert.equal(kemigawa.engineVersion,'1.3.0');assert.equal(kemigawa.baselineVersion,'1.3.0');assert.ok(Array.isArray(kemigawa.peakWindows));
const kashima=prediction('kashima');const pelagic=h=>kashima.hours[h].models.pelagic.rawScore;assert.ok(pelagic(6)>pelagic(3));assert.ok(pelagic(12)>pelagic(9));assert.ok(pelagic(18)>pelagic(15));assert.ok(pelagic(18)>=pelagic(6));
const broken=JSON.parse(JSON.stringify(baselines));broken.spots.kashima.models.pelagic.default=[1,2];const cleaned=MFLForecastValidation.validateBaselines(broken);assert.equal(cleaned.spots.kashima.models.pelagic,undefined);assert.ok(warnings.some(message=>message.includes('24個の0〜100')));
const fakeFeatures=Array.from({length:24},(_,hour)=>({models:{pelagic:{seasonMatched:true}},tideLevel:1,tideDelta:1}));
const allThree=Array.from({length:24},(_,hour)=>({hour,score:3,recommended:true,dominantGroup:'pelagic'}));assert.ok(MFLForecastEngine.qualityCheck(allThree,fakeFeatures).some(message=>message.includes('すべて期待度3')));
const spike=Array.from({length:24},(_,hour)=>({hour,score:hour===5?3:0,recommended:true,dominantGroup:hour===5?'pelagic':'bottom'}));assert.ok(MFLForecastEngine.qualityCheck(spike,fakeFeatures).some(message=>message.includes('0→3→0')));
const october=prediction('kemigawa_beach','2026-10-22');assert.ok(october.hours.every(item=>item.modelSource==='default'));assert.ok(october.hours.every(item=>Object.values(item.models).every(model=>model.modelSource==='default')));
const unsafeWeather={...weather,safety:{hardStop:true}},unsafeFeatures=MFLForecastFeatures.normalize({spotId:'kashima',date:'2026-09-22',baseline:config.baselines.spots.kashima,spotProfile:config.spots.spots.kashima,tideDay,weather:unsafeWeather}),unsafe=MFLForecastEngine.predict(unsafeFeatures);assert.ok(unsafe.hours.every(item=>item.score===0&&!item.recommended));
assert.equal(spots.spots.kashima.tideStation,'D2');assert.equal(spots.spots.kemigawa_beach.tideStation,'CB');
process.stdout.write(JSON.stringify({ok:true,kemigawa:{h5:kemigawa.hours[5].debug,h12:kemigawa.hours[12].debug,peakWindows:kemigawa.peakWindows},kashimaPelagic:[6,12,18].map(hour=>({hour,score:pelagic(hour)})),warnings},null,2));

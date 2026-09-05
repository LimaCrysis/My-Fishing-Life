/* MFL forecast feature normalization v1.3 */
(function(){
  'use strict';
  const number=value=>Number.isFinite(Number(value))?Number(value):null;
  const hourOf=value=>{const match=String(value||'').match(/T(\d{2}):(\d{2})/);return match?Number(match[1])+Number(match[2])/60:null};
  const circularDistance=(a,b)=>Math.min(Math.abs(a-b),24-Math.abs(a-b));
  const eventDistance=(hour,events)=>{const values=(events||[]).map(event=>{const [h,m]=String(event.time||'').split(':').map(Number);return Number.isFinite(h)?h+(m||0)/60:null}).filter(x=>x!==null);return values.length?Math.min(...values.map(value=>circularDistance(hour,value))):null};
  function periodFor(hour,sunrise,sunset){if(sunrise!==null&&Math.abs(hour-sunrise)<=1.5)return'dawn';if(sunset!==null&&Math.abs(hour-sunset)<=1.5)return'dusk';if(sunrise!==null&&sunset!==null&&hour>sunrise+1.5&&hour<sunset-1.5)return'day';return'night'}
  function modelBase(model,month,hour){const seasonal=model.season?.[month],hourly=seasonal?.hourly||model.default;return{base:number(hourly?.[hour]),seasonOffset:number(seasonal?.offset)||0,evidence:seasonal?.evidence||model.evidence||{},seasonMatched:Boolean(seasonal),modelSource:seasonal?'season':'default'}}
  function normalize({spotId,date,baseline,spotProfile,tideDay,weather,restrictions=null}){
    const month=date.slice(5,7),tideFeatures=window.MFLTides.getHourlyTideFeatures(tideDay.hourly),sunrise=hourOf(weather.sunrise),sunset=hourOf(weather.sunset),weatherByHour=new Map((weather.hourly||[]).map(row=>[row.hour,row]));
    return Array.from({length:24},(_,hour)=>{
      const tide=tideFeatures[hour]||{},previous=tideFeatures[Math.max(0,hour-1)]||{},next=tideFeatures[Math.min(23,hour+1)]||{},conditions=weatherByHour.get(hour)||{},models={};
      Object.entries(baseline.models||{}).forEach(([group,model])=>{const values=modelBase(model,month,hour),profile=spotProfile.speciesGroups?.[group]||{};models[group]={group,label:profile.label||group,species:profile.species||[],recommendedMethod:profile.recommendedMethod||profile.methods?.[0]||'—',...values}});
      const restriction=window.MFLForecastRestrictions?.evaluate(restrictions,spotId,date,hour)||{hardStop:false,active:[],advisories:[]},weatherSafety=weather.safety||{};
      return{spotId,date,hour,month,period:periodFor(hour,sunrise,sunset),sunrise,sunset,tideLevel:tide.level,tidePhase:tide.phase,tideDelta:tide.delta,previousTideDelta:previous.delta,nextTideDelta:next.delta,hoursToHigh:eventDistance(hour,tideDay.highs),hoursToLow:eventDistance(hour,tideDay.lows),windSpeed:number(conditions.windSpeed),rain:number(conditions.rain),weatherCode:number(conditions.weatherCode),wave:number(conditions.wave),safety:{...weatherSafety,hardStop:Boolean(weatherSafety.hardStop||restriction.hardStop),restriction},models};
    })
  }
  window.MFLForecastFeatures={normalize,periodFor,eventDistance};
})();

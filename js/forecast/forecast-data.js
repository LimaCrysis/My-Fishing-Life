/* MFL forecast data validation and TTL cache v1.3 */
(function(){
  'use strict';
  const URLS={baselines:'./data/fishing-forecast-baselines.json',spots:'./data/fishing-forecast-spots.json'};
  const CACHE_KEY='mfl_fishing_forecast_cache_v1';
  const TTL_MS=3*60*60*1000;
  let configPromise;
  const fetchJSON=async url=>{const response=await fetch(url,{cache:'no-cache'});if(!response.ok)throw new Error(`Forecast data HTTP ${response.status}`);return response.json()};
  function loadConfig(){return configPromise||(configPromise=Promise.all([fetchJSON(URLS.baselines),fetchJSON(URLS.spots)]).then(([baselines,spots])=>window.MFLForecastValidation.validate(baselines,spots)).catch(error=>{configPromise=null;throw error}))}
  function readCache(){try{return JSON.parse(localStorage.getItem(CACHE_KEY)||'{}')}catch(_){return{}}}
  function cacheKey(spotId,date,version,evidenceLastUpdated=''){return`${spotId}:${date}:${version}:${evidenceLastUpdated}`}
  function getCached(spotId,date,version,evidenceLastUpdated){const item=readCache()[cacheKey(spotId,date,version,evidenceLastUpdated)];if(!item||Date.now()-item.savedAt>TTL_MS)return null;return item.result}
  function setCached(spotId,date,version,evidenceLastUpdated,result){try{const all=readCache(),now=Date.now();Object.keys(all).forEach(key=>{if(!all[key]?.savedAt||now-all[key].savedAt>24*60*60*1000)delete all[key]});all[cacheKey(spotId,date,version,evidenceLastUpdated)]={savedAt:now,expiresAt:now+TTL_MS,result};localStorage.setItem(CACHE_KEY,JSON.stringify(all))}catch(_){}}
  window.MFLForecastData={URLS,CACHE_KEY,TTL_MS,loadConfig,getCached,setCached};
})();

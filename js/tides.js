/* MFL shared tide data access */
(function(){
  'use strict';

  const DATA_URL='./data/tides-2026.json';
  const stations={
    TK:{name:'東京',jma:'https://www.data.jma.go.jp/kaiyou/db/tide/suisan/suisan.php?stn=TK'},
    CB:{name:'千葉港',jma:'https://www.data.jma.go.jp/kaiyou/db/tide/suisan/suisan.php?stn=CB'},
    TT:{name:'館山',jma:'https://www.data.jma.go.jp/kaiyou/db/tide/suisan/suisan.php?stn=TT'},
    QS:{name:'横浜',jma:'https://www.data.jma.go.jp/kaiyou/db/tide/suisan/suisan.php?stn=QS'},
    D2:{name:'鹿島',jma:'https://www.data.jma.go.jp/kaiyou/db/tide/suisan/suisan.php?stn=D2'},
    D3:{name:'大洗',jma:'https://www.data.jma.go.jp/kaiyou/db/tide/suisan/suisan.php?stn=D3'}
  };
  const stationBySpot={
    kashima:'D2',
    kemigawa_beach:'CB',
    tateyama_sunset:'TT',
    honmoku:'QS',
    isogo:'QS',
    daikoku:'QS',
    higashiogishima:'TK',
    umibetsuri:'QS'
  };
  let tablePromise;

  function getTideStationForSpot(spotId,spot){
    if(stationBySpot[spotId])return stationBySpot[spotId];
    if(spot?.pref==='東京')return'TK';
    if(spot?.pref==='千葉')return /館山/.test(spot.name||'')?'TT':'CB';
    if(spot?.pref==='神奈川')return'QS';
    if(spot?.pref==='茨城')return /鹿島/.test(spot.name||'')?'D2':'D3';
    return null;
  }

  async function loadTable(){
    if(!tablePromise)tablePromise=fetch(DATA_URL,{cache:'force-cache'}).then(response=>{
      if(!response.ok)throw new Error(`Tide data HTTP ${response.status}`);
      return response.json();
    }).catch(error=>{tablePromise=null;throw error});
    return tablePromise;
  }

  async function getTideDay(spotId,date,spot){
    const stationCode=getTideStationForSpot(spotId,spot);
    if(!stationCode)return null;
    const table=await loadTable();
    const day=table.stations?.[stationCode]?.days?.[date];
    if(!day)return{stationCode,station:stations[stationCode],date,available:false,hourly:[],highs:[],lows:[]};
    return{...day,stationCode,station:stations[stationCode],date,available:true};
  }

  function getHourlyTideFeatures(hourly){
    const values=Array.from({length:24},(_,hour)=>{
      const value=Number(hourly?.[hour]);
      return Number.isFinite(value)?value:null;
    });
    return values.map((level,hour)=>{
      if(level===null)return{hour,level:null,delta:null,phase:'不明'};
      const before=values[Math.max(0,hour-1)];
      const after=values[Math.min(23,hour+1)];
      const delta=before===null||after===null?null:after-before;
      const phase=delta===null?'不明':delta>4?'上げ潮':delta<-4?'下げ潮':'潮止まり付近';
      return{hour,level,delta,phase};
    });
  }

  window.MFLTides={DATA_URL,stations,getTideStationForSpot,getTideDay,getHourlyTideFeatures};
})();

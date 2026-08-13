/* MFL Fishing Conditions v14.2.0 — provider adapter + offline/manual fallback */
(function(){
  'use strict';
  const KEY='mfl_conditions_manual_v1';
  const COMPARE_KEY='mfl_conditions_compare_v1';
  const defaults={
    ichihara:{weather:'くもり',rainChance:40,rain24h:58,lightning:'注意',windDir:'南東',windSpeed:5.8,wave:0.8,tide:'中潮・上げ',water:'雨後の濁りあり',updated:'デモデータ'},
    kashima:{weather:'晴れ',rainChance:20,rain24h:4,lightning:'低',windDir:'東',windSpeed:6.6,wave:1.4,tide:'中潮・下げ',water:'やや濁り',updated:'デモデータ'}
  };
  const fallback={weather:'未取得',rainChance:null,rain24h:null,lightning:'不明',windDir:'—',windSpeed:null,wave:null,tide:'未取得',water:'不明',updated:'データ未設定'};
  function loadManual(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch(_){return{}}}
  const adapters={
    manual:{name:'手動 / デモ',async get(spot){return {...fallback,...(defaults[spot.id]||{}),...(loadManual()[spot.id]||{})}}},
    api:{name:'外部API',async get(spot){
      if(typeof window.MFL_CONDITIONS_API!=='function') throw new Error('API未設定');
      return {...fallback,...await window.MFL_CONDITIONS_API(spot)};
    }}
  };
  async function get(spot){
    try{const data=await adapters.api.get(spot);return{...data,source:'api'}}
    catch(_){return{...await adapters.manual.get(spot),source:'manual'}}
  }
  function num(v){return Number.isFinite(Number(v))?Number(v):null}
  function evaluate(d){
    let score=100; const reasons=[]; const rain=num(d.rainChance),past=num(d.rain24h),wind=num(d.windSpeed),wave=num(d.wave);
    if(d.lightning==='高'||d.lightning==='警報'){score-=70;reasons.push('雷リスクが高い')}
    else if(d.lightning==='注意'){score-=25;reasons.push('雷に注意')}
    if(wind!==null){if(wind>=10){score-=55;reasons.push(`風${wind}m/s`)}else if(wind>=7){score-=30;reasons.push(`強めの風${wind}m/s`)}else if(wind>=5){score-=12;reasons.push(`風${wind}m/s`)}}
    if(wave!==null){if(wave>=2){score-=55;reasons.push(`波${wave}m`)}else if(wave>=1.5){score-=28;reasons.push(`波高め${wave}m`)}else if(wave>=1){score-=12;reasons.push(`波${wave}m`)}}
    if(rain!==null){if(rain>=70){score-=25;reasons.push(`降水${rain}%`)}else if(rain>=40){score-=12;reasons.push(`降水${rain}%`)}}
    if(past!==null&&past>=50){score-=28;reasons.push(`直近雨量${past}mm`)}else if(past!==null&&past>=20){score-=14;reasons.push(`直近雨量${past}mm`)}
    const rank=score>=82?{symbol:'◎',label:'行きやすい',className:'great'}:score>=62?{symbol:'○',label:'条件付き',className:'good'}:score>=38?{symbol:'△',label:'慎重に',className:'careful'}:{symbol:'×',label:'見送り',className:'stop'};
    return{score:Math.max(0,score),reasons:reasons.length?reasons:['大きな注意要素なし'],...rank,heavyRain:past!==null&&past>=30};
  }
  function advice(d,result){
    const wind=num(d.windSpeed),past=num(d.rain24h); const strongWind=wind!==null&&wind>=5; const muddy=/濁/.test(d.water||'')||(past!==null&&past>=30);
    if(result.className==='stop')return{weight:'釣行を優先せず見送り',worm:'—',method:'警報・施設発表と安全確保を優先'};
    return{weight:strongWind?'14gを軸に、扱いづらければ中止':'7gから開始',worm:muddy?'アピール強め（チャート・グロー・波動）':'クリア/ナチュラル系から',method:strongWind?'風上への無理なキャストを避け、足元〜風下を探る':'表層→中層→底の順で反応を確認'};
  }
  function metric(icon,label,value){return `<div class="fc-metric"><span>${icon}</span><small>${label}</small><strong>${value??'—'}</strong></div>`}
  function card(spot,d,compact=false){const r=evaluate(d),a=advice(d,r);return `<article class="fc-card ${r.className}${compact?' compact':''}">
    <div class="fc-head"><div><small>MFL FISHING CONDITIONS</small><h4>${spot.short||spot.name}</h4></div><div class="fc-rank"><b>${r.symbol}</b><span>${r.label}</span></div></div>
    <div class="fc-metrics">${metric('🌤️','天気',d.weather)}${metric('☔','降水',d.rainChance==null?'—':d.rainChance+'%')}${metric('⚡','雷',d.lightning)}${metric('💨','風',d.windSpeed==null?'—':`${d.windDir} ${d.windSpeed}m/s`)}${metric('🌊','波',d.wave==null?'—':d.wave+'m')}${metric('🌙','潮',d.tide)}</div>
    ${r.heavyRain?`<div class="fc-rain-alert"><b>⚠️ 直近の大雨 ${d.rain24h}mm</b><span>河川流入・濁り・淡水・漂流物の影響が残る可能性があります。</span></div>`:''}
    <div class="fc-reasons">${r.reasons.map(x=>`<span>${x}</span>`).join('')}</div>
    ${compact?'':`<div class="fc-assist"><small>MFL ASSIST</small><div><b>⚖️ ${a.weight}</b><b>🪱 ${a.worm}</b></div><p>${a.method}</p></div>
    <div class="fc-source"><span>${d.source==='api'?'API取得':'手動 / デモ'}</span><span>${d.updated||'更新時刻なし'}</span></div>`}
  </article>`}
  async function mountSpot(id,spot,spots){const root=document.getElementById(id);if(!root)return;root.innerHTML='<div class="fc-loading">コンディションを判定中…</div>';const d=await get(spot);root.innerHTML=card(spot,d)+`<div class="fc-actions"><button data-fc-manual>手動で更新</button><button data-fc-compare>比較に追加</button></div><p class="fc-disclaimer">参考判定です。警報・施設の営業情報・現地規制を必ず優先してください。</p>`;root.querySelector('[data-fc-manual]').onclick=()=>openManual(spot,d,()=>mountSpot(id,spot,spots));root.querySelector('[data-fc-compare]').onclick=()=>{let ids=compareIds();ids=ids.filter(x=>x!==spot.id);ids.push(spot.id);localStorage.setItem(COMPARE_KEY,JSON.stringify(ids.slice(-2)));alert('比較候補に追加しました');};}
  function compareIds(){try{return JSON.parse(localStorage.getItem(COMPARE_KEY)||'["ichihara","kashima"]')}catch(_){return['ichihara','kashima']}}
  async function renderCompare(root,spots,ids){const selected=ids.map(id=>spots.find(s=>s.id===id)).filter(Boolean);const rows=await Promise.all(selected.map(async s=>({s,d:await get(s)})));root.querySelector('.fc-compare-results').innerHTML=rows.map(x=>card(x.s,x.d,true)).join('')||'<p>比較する釣り場を選んでください。</p>';}
  function mountHub(id,spots){const root=document.getElementById(id);if(!root)return;const usable=spots.filter(s=>s.id&&s.verify!=='EXCLUDED');const ids=compareIds();root.innerHTML=`<section class="fc-hub"><div class="fc-hub-title"><div><small>TRIP DECISION</small><h3>コンディション比較</h3><p>天気ではなく「釣りに向いているか」で2地点を比較。</p></div><span>最大2地点</span></div><div class="fc-selects"><select data-fc-select="0">${usable.map(s=>`<option value="${s.id}" ${s.id===ids[0]?'selected':''}>${s.short||s.name}</option>`).join('')}</select><b>VS</b><select data-fc-select="1">${usable.map(s=>`<option value="${s.id}" ${s.id===ids[1]?'selected':''}>${s.short||s.name}</option>`).join('')}</select></div><div class="fc-compare-results"></div><p class="fc-disclaimer">API未設定時は手動/デモデータで動作します。安全判断は公式警報・施設発表を優先。</p></section>`;const update=()=>{const next=[...root.querySelectorAll('[data-fc-select]')].map(x=>x.value);localStorage.setItem(COMPARE_KEY,JSON.stringify(next));renderCompare(root,spots,next)};root.querySelectorAll('[data-fc-select]').forEach(x=>x.onchange=update);update();}
  function openManual(spot,current,done){const raw=prompt(`${spot.short||spot.name}の手動データ\n天気,降水%,直近24h雨量mm,雷(低/注意/高),風向,風速m/s,波m,潮,水色`,[current.weather,current.rainChance,current.rain24h,current.lightning,current.windDir,current.windSpeed,current.wave,current.tide,current.water].join(','));if(raw==null)return;const v=raw.split(',').map(x=>x.trim());if(v.length<9){alert('9項目をカンマ区切りで入力してください');return}const all=loadManual();all[spot.id]={weather:v[0],rainChance:num(v[1]),rain24h:num(v[2]),lightning:v[3],windDir:v[4],windSpeed:num(v[5]),wave:num(v[6]),tide:v[7],water:v[8],updated:new Date().toLocaleString('ja-JP')};localStorage.setItem(KEY,JSON.stringify(all));done();}
  window.MFLConditions={adapters,get,evaluate,advice,mountSpot,mountHub};
})();

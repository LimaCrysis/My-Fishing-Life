const fishMaster = [
  { name:'シロギス', emoji:'🐟', photo:'./assets/fish/kisu.jpg', edible:'天ぷら・塩焼き', guide:'15cm以上を持ち帰り目安に', danger:'特別な危険は少ない', dangerLevel:0 , where:'砂地の堤防・海岸。内房や湾内の砂底をちょい投げで探る。', methods:['ちょい投げ','投げ釣り'], bait:'イソメ類', season:'春〜秋', touch:'危険魚ではない。針を外す時は背びれに注意。' },
  { name:'カサゴ', emoji:'🐠', photo:'./assets/fish/kasago.jpg', edible:'煮付け・唐揚げ', guide:'15cm以上を目安に', danger:'背びれ・エラ周辺の鋭いトゲに注意', dangerLevel:1, dangerAction:'フィッシュグリップやプライヤーを使い、ヒレを握り込まない。' , where:'岩礁・テトラ・堤防際などの障害物周り。', methods:['胴突き','穴釣り','ジグヘッド'], bait:'イソメ・魚の切り身・ワーム', season:'通年', touch:'背びれのトゲに注意。' },
  { name:'アジ', emoji:'🐟', photo:'./assets/fish/aji.jpg', edible:'刺身・フライ・なめろう', guide:'15cm以上を目安に', danger:'尾の近くのゼイゴが鋭いので注意', dangerLevel:1 , where:'港内・堤防・常夜灯周辺など。群れが入れば足元でも狙える。', methods:['サビキ','アジング','ウキ'], bait:'アミエビ・ワーム', season:'春〜秋を中心に通年', touch:'ゼイゴや背びれが硬いので握り方に注意。' },
  { name:'マハゼ', emoji:'🐡', photo:'./assets/fish/mahaze.jpg', photoCredit:'Wikimedia Commons / ふうけ（Public Domain）', scientific:'Acanthogobius flavimanus', edible:'天ぷら・唐揚げ', guide:'12cm以上を目安に', danger:'特別な危険は少ない', dangerLevel:0 , where:'河口・運河・内湾の砂泥底。MFLでは東京湾奥や江戸川放水路系の場所と相性が良い。', methods:['ちょい投げ','足元','ミャク釣り'], bait:'イソメ類', season:'夏〜秋が特に狙いやすい', touch:'基本的に素手で扱えるが、ヒレや針に注意。' },
  { name:'メゴチ', emoji:'🐟', scientific:'Suggrundus meerdervoortii', photoPending:true, edible:'天ぷら', guide:'12cm以上を目安に', danger:'エラぶた周辺の鋭いトゲに注意', dangerLevel:1, dangerAction:'釣り人がネズミゴチ類も「メゴチ」と呼ぶことがあります。写真だけで決めつけず、頭部・口・体型を確認。' , where:'砂泥底。ちょい投げの外道として掛かることが多い。', methods:['ちょい投げ'], bait:'イソメ類', season:'春〜秋', touch:'エラぶた周辺の鋭いトゲに注意。' },
  { name:'ヒラメ', emoji:'🐟', photo:'./assets/fish/hirame.jpg', photoCredit:'Wikimedia Commons / Daiju Azuma（CC BY-SA 2.5）', scientific:'Paralichthys olivaceus', edible:'刺身・ムニエル', guide:'茨城県では30cm未満は採捕禁止', danger:'鋭い歯に注意', dangerLevel:1, dangerAction:'口の中に指を入れない。' , where:'砂地・砂泥底。ベイトが集まる海岸や港の出口周辺。', methods:['ジグヘッド＋ワーム','ルアー','泳がせ'], bait:'ワーム・小魚', season:'秋〜冬を中心に通年チャンス', touch:'歯が鋭いので口へ指を入れない。' },
  { name:'シーバス', emoji:'🐟', photo:'./assets/fish/seabass.jpg', edible:'洗い・塩焼き', guide:'小型はリリース推奨', danger:'エラぶた・背びれ・歯に注意', dangerLevel:1 , where:'河口・運河・港湾。潮が動く場所や明暗部。', methods:['ルアー','ジグヘッド＋ワーム'], bait:'ルアー・ワーム', season:'春と秋が狙いやすい', touch:'エラぶたやヒレが鋭い。フィッシュグリップ推奨。' },
  { name:'サバ', emoji:'🐟', photo:'./assets/fish/saba.jpg', photoType:'real', scientific:'Scomber japonicus', photoCredit:'Wikimedia Commons / Ruff tuff cream puff（CC0）', edible:'塩焼き・味噌煮', guide:'食べる分だけ持ち帰る', danger:'暴れて針が刺さる事故に注意', dangerLevel:1 , where:'回遊魚。堤防周りを群れで回遊することが多い。', methods:['サビキ','ルアー','ジグ'], bait:'アミエビ・小型ルアー', season:'春〜秋を中心に回遊次第', touch:'危険魚ではないが、暴れるので針外し時に注意。' },
  { name:'アイゴ', emoji:'⚠️', photo:'./assets/fish/aigo.jpg', edible:'適切に処理すれば食用可', guide:'初心者は無理に触らない', danger:'背びれ・腹びれ・尻びれに毒棘', dangerLevel:3, dangerTitle:'毒棘あり・素手で触らない', dangerAction:'魚体を直接握らず、プライヤー等で針を外す。ヒレに触れない。' , where:'堤防・磯周り。海藻の多い場所で出会うことがある。', methods:['ウキ','サビキで掛かることも'], bait:'海藻・オキアミ等', season:'暖かい時期', touch:'毒棘あり。素手で触らない。' },
  { name:'ゴンズイ', emoji:'☠️', photo:'./assets/fish/gonzui.jpg', edible:'食用例はあるが初心者は扱わない', guide:'初心者はリリース推奨', danger:'背びれ・胸びれの毒棘に注意', dangerLevel:3, dangerTitle:'毒棘あり・絶対に素手で握らない', dangerAction:'死んだ個体でも棘に注意。フィッシュグリップだけを過信せず、棘から距離を取る。' , where:'港内・堤防・夜の底付近。群れで釣れることがある。', methods:['胴突き','投げ釣りで掛かることも'], bait:'イソメ類', season:'暖かい時期〜秋', touch:'毒棘あり。絶対に素手で握らない。' },
  { name:'ハオコゼ', emoji:'☠️', photo:'./assets/fish/haokoze.jpg', edible:'食用例はあるが小型', guide:'初心者はリリース推奨', danger:'背びれの毒棘', dangerLevel:3, dangerTitle:'小さくても危険・毒棘あり', dangerAction:'小さいから安全と思わず、素手でつかまない。' , where:'岩場・堤防際・海藻周り。', methods:['小物釣りで掛かることがある'], bait:'イソメ類', season:'春〜秋', touch:'毒棘あり。小さくても素手で触らない。' },
  { name:'その他', emoji:'❓', edible:'魚種を確認', guide:'不明魚は持ち帰らない', danger:'種類が分かるまで素手で触らない', dangerLevel:2, dangerTitle:'魚種不明＝触らない', dangerAction:'写真を撮り、魚種を確認してから扱う。' }
];

const defaultGear = ['ロッド', 'リール', '仕掛け', 'オモリ・ジグヘッド', 'エサ・ワーム', 'ハサミ・プライヤー', 'フィッシュグリップ', 'ライフジャケット', 'クーラーボックス', '氷・保冷剤', 'タオル', '飲み物'];
const state = {
  view: 'home',
  trips: JSON.parse(localStorage.getItem('mfl_trips') || '[]'),
  catches: JSON.parse(localStorage.getItem('mfl_catches') || '[]'),
  gear: JSON.parse(localStorage.getItem('mfl_gear') || 'null') || defaultGear.map(name => ({ name, checked: false })),
  activeTrip: JSON.parse(localStorage.getItem('mfl_activeTrip') || 'null'),
  tackles: JSON.parse(localStorage.getItem('mfl_tackles') || '[]'),
  fishingDays: JSON.parse(localStorage.getItem('mfl_fishingDays') || 'null') || [...new Set(JSON.parse(localStorage.getItem('mfl_schedules') || '[]').map(s => s.date).filter(Boolean))],
  calendarMonth: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  selectedDate: todayString(),
  lastTackleId: localStorage.getItem('mfl_lastTackleId') || '',
  lastMethod: localStorage.getItem('mfl_lastMethod') || 'ちょい投げ'
};

const app = document.getElementById('app');
const pageTitle = document.getElementById('pageTitle');
const catchDialog = document.getElementById('catchDialog');
const tripDialog = document.getElementById('tripDialog');
const catchForm = document.getElementById('catchForm');
const tripForm = document.getElementById('tripForm');
const tackleDialog = document.getElementById('tackleDialog');
const tackleForm = document.getElementById('tackleForm');

function save() {
  localStorage.setItem('mfl_trips', JSON.stringify(state.trips));
  localStorage.setItem('mfl_catches', JSON.stringify(state.catches));
  localStorage.setItem('mfl_gear', JSON.stringify(state.gear));
  localStorage.setItem('mfl_activeTrip', JSON.stringify(state.activeTrip));
  localStorage.setItem('mfl_tackles', JSON.stringify(state.tackles));
  localStorage.setItem('mfl_fishingDays', JSON.stringify(state.fishingDays));
  localStorage.setItem('mfl_lastTackleId', state.lastTackleId || '');
  localStorage.setItem('mfl_lastMethod', state.lastMethod || 'ちょい投げ');
}
function escapeHtml(value='') { return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function formatDate(s) { if (!s) return ''; const d = new Date(`${s}T00:00:00`); return `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}`; }
function todayString() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
function timeString() { const d = new Date(); return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`; }
function getFish(name) { return fishMaster.find(f => f.name === name) || fishMaster.at(-1); }

function render() {
  const views={  home: renderHome, calendar: renderCalendar, trips: renderTrips, encyclopedia: renderEncyclopedia, guide: renderGuide, fishingmap: renderFishingMap, gear: renderGear, tackle: renderTackle, assist: renderAssist, settings: renderSettings  };
  const titles={  home:'ホーム', calendar:'釣行予定', trips:'釣行記録', encyclopedia:'魚図鑑', guide:'釣行手引き', fishingmap:'釣地図', gear:'持ち物', tackle:'My Tackle', assist:'MFL Assist', settings:'設定'  };
  if(!views[state.view]) state.view='home';
  document.querySelectorAll('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.view === state.view));
  if (pageTitle) pageTitle.textContent = titles[state.view] || 'MFL';
  views[state.view]();
}


function confirmDestructiveAction(message, detail = 'この操作は元に戻せません。') {
  return window.confirm(`${message}\n\n${detail}`);
}

function renderHome() {
  const totalFish = state.catches.reduce((n,c) => n + Number(c.count || 0), 0);
  const species = new Set(state.catches.map(c => c.fishName)).size;
  const recent = state.catches.slice(0,3);
  const now = new Date();
  const nextDay = state.fishingDays.filter(d => d >= todayString()).sort()[0];
  app.innerHTML = `
    <section class="hero">
      <p class="eyebrow" style="color:#dff7f8">TODAY'S FISHING</p>
      <h2>${state.activeTrip ? escapeHtml(state.activeTrip.place) : '今日はどこへ釣りに行く？'}</h2>
      <p>${state.activeTrip ? `${formatDate(state.activeTrip.date)} ${escapeHtml(state.activeTrip.weather)}／${escapeHtml(state.activeTrip.start)}開始` : '釣行を始めて、思い出を一匹ずつ残そう。'}</p>
      <button class="primary-button" id="heroAction">${state.activeTrip ? '釣果を記録する' : '釣行を始める'}</button>
    </section>
    <button class="section home-tools" id="openCalendar" type="button" aria-label="釣行予定カレンダーを開く">
      <span class="date-icon-button" aria-hidden="true">
        <span class="date-icon-month">${now.getMonth()+1}月</span>
        <strong>${now.getDate()}</strong>
      </span>
      <span class="home-tool-copy">
        <strong class="home-tool-title">釣行予定</strong>
        <span class="home-tool-description">${nextDay ? `次の予定：${formatDate(nextDay)}（${weekdayLabel(nextDay)}）` : '日付を選ぶだけのシンプルな予定表'}</span>
      </span>
      <span class="home-tool-arrow" aria-hidden="true">›</span>
    </button>
    <button class="section assist-home-card" type="button" data-view-link="assist"><span class="assist-home-icon">🧭</span><span class="home-tool-copy"><strong class="home-tool-title">MFL Assist</strong><span class="home-tool-description">タックルから、できる釣りと重さの目安を診断</span></span><span class="home-tool-arrow">›</span></button>
    <button class="section tackle-home-card" type="button" data-view-link="tackle">
      <span class="tackle-home-icon">${state.tackles.length ? oceanRankFor(tackleFishCount(state.tackles[0].id)).icon : '🐚'}</span>
      <span class="home-tool-copy">
        <strong class="home-tool-title">My Tackle</strong>
        <span class="home-tool-description">${state.tackles.length ? `${escapeHtml(state.tackles[0].name)}・${oceanRankFor(tackleFishCount(state.tackles[0].id)).name}` : '相棒を登録して、釣果と一緒に育てよう'}</span>
      </span>
      <span class="home-tool-arrow" aria-hidden="true">›</span>
    </button>
    <button class="section settings-home-card" type="button" data-view-link="settings">
      <span class="tackle-home-icon">⚙️</span>
      <span class="home-tool-copy">
        <strong class="home-tool-title">設定</strong>
        <span class="home-tool-description">魚種・持ち物などMFLの設定</span>
      </span>
      <span class="home-tool-arrow" aria-hidden="true">›</span>
    </button>
    <div class="mfl-build-badge">MFL FIELD TEST v14.0.0</div>
    <section class="section">
      <div class="stats-grid">
        <div class="stat-card"><strong>${state.trips.length}</strong><span>釣行回数</span></div>
        <div class="stat-card"><strong>${totalFish}</strong><span>釣った魚</span></div>
        <div class="stat-card"><strong>${species}</strong><span>魚種</span></div>
      </div>
    </section>
    <section class="section">
      <div class="section-heading"><h2>最近の釣果</h2><button class="text-button" data-view-link="trips">すべて見る</button></div>
      ${recent.length ? recent.map(catchCard).join('') : `<section class="empty-state"><div class="empty-icon">🐟</div><h2>まだ釣果がありません</h2><p>最初の一匹を記録すると、ここに表示されます。</p></section>`}
    </section>`;
  // Home actions are handled by the delegated click listener below.

}

const mflKeepRules={chiba:{protected:['アワビ','サザエ','イセエビ','ハマグリ','アサリ'],special:{'ガザミ':'木更津地先などでは委員会指示による採捕制限があります。場所・時期・方法を公式情報で確認。'}},dangerous:['アイゴ','ゴンズイ','ハオコゼ']};
function fishingJurisdiction(place){
 const p=place||'';
 if(/市原|浦安|富津|江戸川放水路|木更津|千葉/.test(p))return'chiba';
 if(/若洲|城南島|新左近川|お台場|春海橋|暁ふ頭|有明|水の広場|新木場|夢の島|東京/.test(p))return'tokyo';
 if(/鹿島|河原子|平磯|茨城/.test(p))return'ibaraki';
 if(/本牧|磯子|大黒|東扇島|海辺つり|うみかぜ|横浜|川崎|横須賀|神奈川/.test(p))return'kanagawa';
 return'unknown';
}
function keepDecision(fish,place){
 const name=(fish||'').trim(),j=fishingJurisdiction(place),dangerous=mflKeepRules.dangerous.includes(name);
 if(j==='chiba'){
  if(mflKeepRules.chiba.protected.includes(name))return{status:'ng',label:'持ち帰りNG',detail:'千葉県では漁業権が設定された海で、遊漁者がアワビ・サザエ・イセエビ・ハマグリ・アサリなど漁業権対象種を採捕することはできません。',dangerous};
  if(mflKeepRules.chiba.special[name])return{status:'check',label:'要確認',detail:mflKeepRules.chiba.special[name],dangerous};
  return{status:'check',label:'要確認',detail:'MFLで一律禁止は確認していません。ただし漁業権・サイズ・時期・採捕方法・現地ルールが優先です。',dangerous};
 }
 if(j==='tokyo'||j==='ibaraki'||j==='kanagawa')return{status:'check',label:'要確認',detail:'魚種・サイズ・時期・方法・場所でルールが変わります。MFLは未確認の魚を自動でOKにしません。',dangerous};
 return{status:'unknown',label:'情報不足',detail:'場所を特定できないため判定できません。',dangerous};
}
function keepBadgeHTML(fish,place){
 const d=keepDecision(fish,place),icon=d.status==='ng'?'🔴':d.status==='check'?'🟡':'⚪';
 return `<div class="keep-badge keep-${d.status}"><strong>${icon} ${d.label}</strong><p>${d.detail}</p>${d.dangerous?'<span>⚠️ 危険魚：素手で触らない</span>':''}</div>`;
}


const keepRuleDB={
 chiba:{prohibited:['アワビ','ナマコ','シラスウナギ','サザエ','イセエビ','ハマグリ','アサリ'],special:{'ガザミ':'木更津地先などでは委員会指示による採捕制限があります。期間・場所・時間帯を県公式で確認してください。'}},
 tokyo:{minSize:{'タカベ':10,'ブリ':15,'うなぎ':24,'アサリ':2.5,'ハマグリ':4},seasonal:{'アサヒガニ':'7月1日〜7月31日は採捕禁止'}},
 kanagawa:{minSize:{'アサリ':2,'ハマグリ':4,'タイラギ':18,'ミルガイ':9,'アワビ':11,'サザエ':3,'イセエビ':13,'クルマエビ':8,'うなぎ':24,'ブリ':15}},
 ibaraki:{minSize:{'うなぎ':23,'サケ':15,'マス':15,'ヒラメ':30,'ハマグリ':3,'コタマガイ':3,'ホッキガイ':7,'アワビ':11},prohibited:['アワビ','ナマコ','ハマグリ','カキ','サザエ','ウニ','イセエビ','ワカメ','ヒジキ','フノリ']}
};
const dangerousKeepFish=['アイゴ','ゴンズイ','ハオコゼ'];
function normalizeFishName(name){const n=(name||'').replace(/\s/g,'');const m={'ぶり':'ブリ','鰤':'ブリ','たかべ':'タカベ','鰻':'うなぎ','ウナギ':'うなぎ','あさり':'アサリ','はまぐり':'ハマグリ','鮃':'ヒラメ','ひらめ':'ヒラメ','鮭':'サケ','さけ':'サケ','鱒':'マス','ます':'マス'};return m[n]||n}
function fishingJurisdiction(place){const p=place||'';if(/市原|浦安|富津|江戸川放水路|木更津|千葉/.test(p))return'chiba';if(/若洲|城南島|新左近川|お台場|春海橋|暁ふ頭|有明|水の広場|新木場|夢の島|東京/.test(p))return'tokyo';if(/鹿島|河原子|平磯|茨城/.test(p))return'ibaraki';if(/本牧|磯子|大黒|東扇島|海辺つり|うみかぜ|横浜|川崎|横須賀|神奈川/.test(p))return'kanagawa';return'unknown'}
function keepDecision(fish,place,size,date){
 const name=normalizeFishName(fish),j=fishingJurisdiction(place),cm=Number(size||0),dangerous=dangerousKeepFish.includes(name);
 const r=(status,label,detail)=>({status,label,detail,dangerous});
 if(j==='unknown')return r('unknown','情報不足','場所を特定できないため判定できません。現地掲示や管理者へ確認してください。');
 const rule=keepRuleDB[j]||{};
 if((rule.prohibited||[]).includes(name))return r('ng','採捕・持ち帰りNG','この地域では漁業権や法令の対象となるため、遊漁者の採捕が禁止されています。');
 if(rule.special&&rule.special[name])return r('check','要確認',rule.special[name]);
 const min=rule.minSize&&rule.minSize[name];
 if(min){if(!cm)return r('check','サイズ確認',`この魚は${min}cmのサイズ基準があります。サイズを入力して確認してください。`);if(cm<min)return r('ng','リリース',`${min}cm未満は採捕できません。海へ戻してください。`);return r('ok','サイズ条件クリア',`${min}cm以上のサイズ条件は満たしています。現地・施設独自ルールを優先してください。`)}
 if(rule.seasonal&&rule.seasonal[name])return r('check','時期確認',rule.seasonal[name]);
 return r('ok','県ルール上の個別制限なし','MFLが確認した県レベルの個別サイズ・採捕禁止ルールには該当していません。漁業権・施設独自ルール・現地掲示がある場合はそちらを優先してください。');
}
function keepBadgeHTML(fish,place,size,date){const d=keepDecision(fish,place,size,date),icon=d.status==='ng'?'🔴':d.status==='ok'?'🟢':d.status==='check'?'🟡':'⚪';return `<div class="keep-badge keep-${d.status}"><strong>${icon} ${d.label}</strong><p>${d.detail}</p>${d.dangerous?'<span>⚠️ 危険魚：持ち帰り可否とは別に、素手で触らない</span>':''}</div>`}


function catchFieldTags(c){
  const tags=[];
  if(c.jigHeadWeight)tags.push(`⚖️ ${c.jigHeadWeight}`);
  if(c.wormColor)tags.push(`🪱 ${c.wormColor}`);
  if(c.bait)tags.push(`🦐 ${c.bait}`);
  if(c.hitZone)tags.push(`🎯 ${c.hitZone}`);
  if(c.tidePhase)tags.push(`🌊 ${c.tidePhase}`);
  return tags.length?`<div class="catch-field-tags">${tags.map(x=>`<span>${escapeHtml(x)}</span>`).join('')}</div>`:'';
}

function fieldInsightsHTML(){
  const rows=state.catches.filter(c=>c.jigHeadWeight||c.wormColor||c.bait||c.hitZone||c.tidePhase);
  if(!rows.length)return '';
  const countBy=key=>{
    const m={}; rows.forEach(c=>{const v=c[key];if(v)m[v]=(m[v]||0)+Number(c.count||1)});
    return Object.entries(m).sort((a,b)=>b[1]-a[1]);
  };
  const top=(key,label)=>{const a=countBy(key).slice(0,3);return a.length?`<div><small>${label}</small>${a.map(([v,n])=>`<span><b>${escapeHtml(v)}</b>${n}匹</span>`).join('')}</div>`:''};
  return `<details class="field-insights">
    <summary><span>📊 実釣データ</span><b>${rows.length}記録</b></summary>
    <div class="field-insight-grid">
      ${top('jigHeadWeight','ジグヘッド')}
      ${top('wormColor','ワーム')}
      ${top('hitZone','ヒット層')}
      ${top('tidePhase','潮')}
    </div>
    <p>まだ少ないデータでもOK。釣行を重ねるほど、自分たちの傾向が見えてきます。</p>
  </details>`;
}

function syncFieldDataVisibility(){
  const m=document.getElementById('method')?.value||'';
  const jig=document.getElementById('jigFieldData');
  const bait=document.getElementById('baitFieldData');
  if(jig)jig.hidden=!(m==='ジグヘッド'||m==='ルアー');
  if(bait)bait.hidden=!(m==='ちょい投げ'||m==='サビキ'||m==='エサ釣り');
}

function catchCard(c, deletable = false) {
  const trip=state.trips.find(t=>t.id===c.tripId); const keepPlace=c.place||trip?.place||'';
  const f = getFish(c.fishName);
  return `<article class="card catch-record-card">
    <div class="card-row">
      ${c.photo ? `<img class="catch-photo" src="${c.photo}" alt="${escapeHtml(c.fishName)}">` : `<div class="card-icon">${f.emoji}</div>`}
      <div class="card-main"><h3>${escapeHtml(c.fishName)} ${c.size ? `${escapeHtml(c.size)}cm` : ''}</h3><p>${formatDate(c.date)}・${escapeHtml(c.place || '釣り場未設定')}・${escapeHtml(c.method)}</p></div>
      <span class="badge">${escapeHtml(c.result)}</span>
    </div>
    ${keepBadgeHTML(c.fishName,keepPlace,c.size,c.date)}
    ${catchFieldTags(c)}
    ${deletable ? `<button class="catch-delete-button" data-delete-catch="${c.id}" type="button">この魚記録だけ削除</button>` : ''}
  </article>`;
}

function dateKey(year, monthIndex, day) {
  return `${year}-${String(monthIndex + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
}
function weekdayLabel(dateString) {
  if (!dateString) return '';
  const d = new Date(`${dateString}T00:00:00`);
  return ['日','月','火','水','木','金','土'][d.getDay()];
}
function renderCalendar() {
  const base = state.calendarMonth;
  const year = base.getFullYear(), month = base.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();
  const cells = [];
  for (let i=0; i<42; i++) {
    let d, cellMonth = month, muted = false;
    if (i < firstDay) { d = prevDays - firstDay + i + 1; cellMonth = month - 1; muted = true; }
    else if (i >= firstDay + days) { d = i - firstDay - days + 1; cellMonth = month + 1; muted = true; }
    else d = i - firstDay + 1;
    const dt = new Date(year, cellMonth, d);
    const key = dateKey(dt.getFullYear(), dt.getMonth(), dt.getDate());
    const planned = state.fishingDays.includes(key);
    const today = key === todayString();
    cells.push(`<button class="calendar-day ${muted?'muted':''} ${today?'today':''} ${planned?'planned':''}" data-date="${key}" aria-label="${formatDate(key)} ${planned?'釣りに行く予定':'予定なし'}"><span>${dt.getDate()}</span>${planned?'<i>🎣</i>':''}</button>`);
  }
  const monthPlans = state.fishingDays.filter(key => {
    const d = new Date(`${key}T00:00:00`);
    return d.getFullYear() === year && d.getMonth() === month;
  }).sort();
  app.innerHTML = `
    <button class="calendar-back" id="calendarBack">‹ ホームへ戻る</button>
    <section class="calendar-card">
      <div class="calendar-header">
        <button class="calendar-arrow" id="prevMonth" aria-label="前の月">‹</button>
        <button class="calendar-title" id="todayMonth">${year}年${month+1}月</button>
        <button class="calendar-arrow" id="nextMonth" aria-label="次の月">›</button>
      </div>
      <div class="calendar-week"><span>日</span><span>月</span><span>火</span><span>水</span><span>木</span><span>金</span><span>土</span></div>
      <div class="calendar-grid">${cells.join('')}</div>
    </section>
    <section class="calendar-guide">
      <strong>日付をタップするだけ</strong>
      <p>🎣が付いた日は「釣りに行く予定」。もう一度押すと取り消せます。</p>
    </section>
    <section class="section">
      <div class="section-heading"><h2>今月の予定</h2><strong>${monthPlans.length}日</strong></div>
      ${monthPlans.length ? `<div class="plan-date-list">${monthPlans.map(key => `<button data-date="${key}"><strong>${new Date(`${key}T00:00:00`).getDate()}</strong><span>${weekdayLabel(key)}曜日</span></button>`).join('')}</div>` : `<section class="empty-state compact"><div class="empty-icon">🗓️</div><h2>予定はまだありません</h2><p>行きたい日をカレンダーから選ぼう。</p></section>`}
    </section>`;
  document.getElementById('calendarBack').onclick = () => { state.view = 'home'; render(); };
  document.getElementById('prevMonth').onclick = () => { state.calendarMonth = new Date(year, month-1, 1); renderCalendar(); };
  document.getElementById('nextMonth').onclick = () => { state.calendarMonth = new Date(year, month+1, 1); renderCalendar(); };
  document.getElementById('todayMonth').onclick = () => { const n=new Date(); state.calendarMonth=new Date(n.getFullYear(),n.getMonth(),1); renderCalendar(); };
  document.querySelectorAll('[data-date]').forEach(btn => btn.onclick = () => {
    const key = btn.dataset.date;
    if (state.fishingDays.includes(key)) state.fishingDays = state.fishingDays.filter(d => d !== key);
    else state.fishingDays.push(key);
    save(); renderCalendar();
  });
}
function renderTrips() {
  const grouped = [];
  const byKey = {};

  state.trips.forEach(t => {
    const key = `${t.date || ''}__${t.place || '釣り場未設定'}`;
    if (!byKey[key]) {
      byKey[key] = {
        key,
        date: t.date || '',
        place: t.place || '釣り場未設定',
        weather: t.weather || '',
        tripIds: [],
        catches: []
      };
      grouped.push(byKey[key]);
    }
    byKey[key].tripIds.push(t.id);
  });

  state.catches.forEach(c => {
    const group = grouped.find(g => g.tripIds.includes(c.tripId));
    if (group) group.catches.push(c);
  });

  grouped.sort((a,b) => (b.date || '').localeCompare(a.date || ''));

  app.innerHTML = `
    ${state.activeTrip ? `
      <section class="active-trip-card">
        <div>
          <p class="eyebrow">NOW FISHING</p>
          <h2>${escapeHtml(state.activeTrip.place)}</h2>
          <span>${formatDate(state.activeTrip.date)}・${escapeHtml(state.activeTrip.start)}開始</span>
        </div>
        <button class="primary-button" id="startTripBtn">＋ 魚を追加</button>
        <button class="secondary-button" id="endTripBtn">釣行を終了</button>
      </section>` :
      `<button class="primary-button" id="startTripBtn">新しい釣行を始める</button>`}

    ${fieldInsightsHTML()}
    <div class="keep-system-intro"><strong>🐟 持ち帰り判定</strong><span>場所×魚×サイズで判定。県ルール上の個別制限なし / 要確認 / リリース / 情報不足を表示します。</span></div><section class="section trip-fold-list">
      ${grouped.length ? grouped.map((g, index) => {
        const count = g.catches.reduce((n,c)=>n+Number(c.count||0),0);
        const species = new Set(g.catches.map(c=>c.fishName)).size;
        return `
          <article class="trip-fold-card">
            <button class="trip-fold-button" type="button" data-trip-fold="${index}">
              <span class="trip-fold-icon">🎣</span>
              <span class="trip-fold-main">
                <strong>${escapeHtml(g.place)}</strong>
                <small>${formatDate(g.date)}${g.weather ? `・${escapeHtml(g.weather)}` : ''}</small>
              </span>
              <span class="trip-fold-count">
                <b>${count}匹</b>
                <small>${species}魚種</small>
              </span>
              <span class="trip-fold-arrow">›</span>
            </button>
            <div class="trip-fold-content ${index === 0 ? 'is-open' : ''}" data-trip-content="${index}">
              ${g.catches.length
                ? g.catches.map(c=>catchCard(c,true)).join('')
                : `<p class="note">この釣行にはまだ釣果がありません。</p>`}
            </div>
          </article>`;
      }).join('') :
      `<section class="empty-state">
        <div class="empty-icon">🧭</div>
        <h2>釣行記録はまだありません</h2>
        <p>最初の釣行を始めてみよう。</p>
      </section>`}
    </section>`;

  const startTripBtn = document.getElementById('startTripBtn');
  if (startTripBtn) startTripBtn.onclick = () => state.activeTrip ? openCatch() : openTrip();

  const endTripBtn = document.getElementById('endTripBtn');
  if (endTripBtn) endTripBtn.onclick = endTrip;

  document.querySelectorAll('[data-trip-fold]').forEach(btn => {
    const idx = btn.dataset.tripFold;
    const content = document.querySelector(`[data-trip-content="${idx}"]`);
    if (idx === '0') btn.classList.add('is-open');
    btn.onclick = () => {
      const open = content.classList.toggle('is-open');
      btn.classList.toggle('is-open', open);
    };
  });

  document.querySelectorAll('[data-delete-catch]').forEach(btn => btn.onclick = () => {
    const id = btn.dataset.deleteCatch;
    const item = state.catches.find(c => c.id === id);
    if (!item) return;
    const label = `${item.fishName}${item.size ? ` ${item.size}cm` : ''}・${item.count || 1}匹`;
    if (!confirmDestructiveAction(
      `「${label}」の記録だけ削除しますか？`,
      'この1件だけが削除されます。他の魚・写真・釣行・予定・My Tackleは残ります。'
    )) return;
    state.catches = state.catches.filter(c => c.id !== id);
    save();
    renderTrips();
  });
}


const oceanRanks = [
  { min: 0, name: 'はじまりの石', icon: '🪨' },
  { min: 1, name: '貝殻', icon: '🐚' },
  { min: 50, name: 'サンゴ', icon: '🪸' },
  { min: 100, name: 'ヒトデ', icon: '⭐' },
  { min: 300, name: 'ヤドカリ', icon: '🦀' },
  { min: 500, name: '海の仲間', icon: '🐠' },
  { min: 1000, name: 'イルカ', icon: '🐬' },
  { min: 3000, name: 'ウミガメ', icon: '🐢' },
  { min: 5000, name: 'クジラ', icon: '🐋' },
  { min: 10000, name: '海王', icon: '👑' }
];
function tackleFishCount(id) {
  return state.catches.filter(c => c.tackleId === id).reduce((n,c) => n + Number(c.count || 0), 0);
}
function oceanRankFor(count) {
  return [...oceanRanks].reverse().find(r => count >= r.min) || oceanRanks[0];
}
function nextOceanRank(count) {
  return oceanRanks.find(r => r.min > count) || null;
}

const assistProfiles=[
{match:/スカイハイ.*100\s*MH|SKYHIGH.*100\s*MH/i,name:'DAIWA SKYHIGH 100MH',official:'ルアー 12–60g / ナイロン 12–25lb / PE 1.0–2.5号',lineSpec:{pe:[1.0,2.5],monoLb:[12,25]},tips:[['ジグヘッド＋ワーム','◎','14–35g','荷重を乗せやすく堤防で広く探りやすい。','まずは14〜18g','14〜25g','30〜35g','底を取りたい時だけ少し重く。最初から上限寄りにしない。'],['ルアー','◎','12–50g','ミノー、バイブレーション等を幅広く扱える。','まずは15〜20g','12〜35g','40〜50g','投げやすい15〜20gから。風が強い時は少し重くする。'],['メタルジグ','○','20–50g','遠投向き。上限付近の無理なフルキャストは避ける。','まずは20〜30g','20〜40g','45〜50g','30g前後なら飛距離と扱いやすさのバランスを取りやすい。'],['ちょい投げ','○','5–10号目安','ルアー負荷から余裕を持たせたMFL目安。投げ竿の保証値ではない。','まずは5〜6号','5〜8号','10号','初心者は5〜6号から。10号は上限寄りなのでフルキャストせず様子を見る。'],['サビキ','△','軽～中量級','カゴ・コマセを含む総重量に注意。','軽いカゴから','仕掛け総重量を軽めに','重いカゴ','カゴ単体ではなくコマセを入れた総重量で判断する。']]},
{match:/ルアーマチック.*S?90\s*ML|LUREMATIC.*S?90\s*ML/i,name:'SHIMANO 23 LUREMATIC S90ML',official:'ルアー 6–32g / ジグ MAX38g / ナイロン・フロロ 8–16lb / PE 0.6–1.5号',lineSpec:{pe:[0.6,1.5],monoLb:[8,16]},tips:[['ジグヘッド＋ワーム','◎','7–21g','初心者でもキャスト感をつかみやすい。','まずは7〜10g','7〜14g','18〜21g','最初は7〜10g。底が取りづらい時だけ少しずつ重くする。'],['ルアー','◎','6–28g','公式範囲内で余裕を残したMFL推奨域。','まずは8〜12g','8〜20g','24〜28g','軽快さを活かして8〜12gから始める。'],['メタルジグ','○','10–30g','公式ジグ上限38g。最初は軽めから。','まずは10〜15g','10〜25g','30g前後','初心者は10〜15g。慣れてから20g以上へ。'],['ちょい投げ','○','3–6号目安','仕掛け総重量に注意し軽めから。','まずは3〜4号','3〜5号','6号','初心者は3〜4号から。竿にゆっくり重さを乗せて投げる。'],['サビキ','○','軽量カゴ中心','カゴ＋コマセ＋仕掛けの総重量に注意。','小さめのカゴから','軽量仕掛け','重いカゴ','初心者は軽いカゴで足元〜近距離から始める。']]}];
function findAssistProfile(t){if(!t)return null;let x=`${t.rod||''} ${t.name||''}`;return assistProfiles.find(p=>p.match.test(x))||null}
const reelProfiles = [
  {
    match:/フリームス.*LT3000-?CXH|FREAMS.*LT3000-?CXH/i,
    name:'DAIWA FREAMS LT3000-CXH',
    official:'PE1号-200mクラス / ベイエリアのシーバスなどに対応するユーティリティモデル',
    grade:'◎',
    note:'3000番クラスのハイギアで、S100MHとの組み合わせは堤防のルアー・ワーム・軽めのエサ釣りまで扱いやすい。'
  },
  {
    match:/ネクサーブ.*C3000HG|NEXAVE.*C3000HG/i,
    name:'SHIMANO 26 NEXAVE C3000HG',
    official:'ナイロン3号-150m / PE1.5号-270m / 最大ドラグ9kg / 巻上長91cm',
    grade:'◎',
    note:'C3000のバーサタイルハイギア。メーカーも幅広い釣りに使える万能モデルとして案内。'
  }
];

function findReelProfile(tackle){
  if(!tackle) return null;
  return reelProfiles.find(p=>p.match.test(tackle.reel||'')) || null;
}
function parseLineProfile(line=''){
  const text = String(line);
  const m = text.match(/(\d+(?:\.\d+)?)\s*号/);
  const size = m ? Number(m[1]) : null;
  const isCarbon = /カーボナイロン|カーボンナイロン/i.test(text);
  const isPE = /\bPE\b|ＰＥ/i.test(text);
  const isFluoro = /フロロ/i.test(text);
  const isNylon = /ナイロン/i.test(text) && !isCarbon;
  let grade='○', note='ライン種類・太さを確認して判定します。';
  if(isCarbon && size===3){ grade='○'; note='3号カーボナイロンは扱いやすく根ズレにも強め。飛距離と感度はPEより控えめなので、ルアー中心なら将来PEへの変更余地あり。'; }
  else if(isPE){ grade='○'; note='PEは飛距離と感度に優れる一方、リーダー結束が必要。ロッドの適合PE範囲内か確認します。'; }
  else if(isFluoro){ grade='○'; note='フロロは根ズレに強く沈みやすい。太さとロッド適合ラインを確認します。'; }
  else if(isNylon){ grade='○'; note='ナイロンは扱いやすく初心者向け。太さとロッド適合ラインを確認します。'; }
  return {size,isCarbon,isPE,isFluoro,isNylon,grade,note,label:text||'未登録'};
}
function gradeScore(g){ return g==='◎'?4:g==='○'?3:g==='△'?2:g==='×'?1:0; }
function scoreGrade(n){ return n>=4?'◎':n>=3?'○':n>=2?'△':'×'; }


const lineCatalog=[
{id:'carbon-2',type:'carbon',label:'カーボナイロン2号',size:2,approxLb:8},
{id:'carbon-2.5',type:'carbon',label:'カーボナイロン2.5号',size:2.5,approxLb:10},
{id:'carbon-3',type:'carbon',label:'カーボナイロン3号',size:3,approxLb:12},
{id:'carbon-4',type:'carbon',label:'カーボナイロン4号',size:4,approxLb:16},
{id:'nylon-2',type:'nylon',label:'ナイロン2号',size:2,approxLb:8},
{id:'nylon-2.5',type:'nylon',label:'ナイロン2.5号',size:2.5,approxLb:10},
{id:'nylon-3',type:'nylon',label:'ナイロン3号',size:3,approxLb:12},
{id:'nylon-4',type:'nylon',label:'ナイロン4号',size:4,approxLb:16},
{id:'fluoro-2',type:'fluoro',label:'フロロ2号',size:2,approxLb:8},
{id:'fluoro-2.5',type:'fluoro',label:'フロロ2.5号',size:2.5,approxLb:10},
{id:'fluoro-3',type:'fluoro',label:'フロロ3号',size:3,approxLb:12},
{id:'pe-0.6',type:'pe',label:'PE0.6号',size:0.6},
{id:'pe-0.8',type:'pe',label:'PE0.8号',size:0.8},
{id:'pe-1.0',type:'pe',label:'PE1.0号',size:1.0},
{id:'pe-1.2',type:'pe',label:'PE1.2号',size:1.2},
{id:'pe-1.5',type:'pe',label:'PE1.5号',size:1.5},
{id:'pe-2.0',type:'pe',label:'PE2.0号',size:2.0},
{id:'pe-2.5',type:'pe',label:'PE2.5号',size:2.5}
];

function lineCandidateCompatibility(tackle,c){
 const rod=findAssistProfile(tackle), reel=findReelProfile(tackle);
 if(!rod||!c)return{ok:false,grade:'△',reason:'公式ライン範囲が未登録です。'};
 let rodOk=true,reelOk=true,reasons=[];
 if(c.type==='pe'){
   const r=rod.lineSpec?.pe;if(r){rodOk=c.size>=r[0]&&c.size<=r[1];if(!rodOk)reasons.push(`ロッド適合PE ${r[0]}〜${r[1]}号の範囲外`);}
   const rr=reel?.lineCapacity?.pe;if(rr){reelOk=c.size>=rr[0]&&c.size<=rr[1];if(!reelOk)reasons.push(`リール側のMFL想定PE ${rr[0]}〜${rr[1]}号の範囲外`);}
 }else{
   const r=rod.lineSpec?.monoLb;if(r){rodOk=c.approxLb>=r[0]&&c.approxLb<=r[1];if(!rodOk)reasons.push(`ロッド適合 ${r[0]}〜${r[1]}lb の範囲外`);}
   const rr=reel?.lineCapacity?.mono;if(rr){reelOk=c.size>=rr[0]&&c.size<=rr[1];if(!reelOk)reasons.push(`リール側のMFL想定 ${rr[0]}〜${rr[1]}号の範囲外`);}
 }
 const ok=rodOk&&reelOk;return{ok,grade:ok?'◎':(rodOk||reelOk?'△':'×'),reason:ok?'ロッドとリールの範囲に収まります。':reasons.join(' / ')};
}
function lineEffects(c){
 if(c.type==='pe')return{cast:'◎',sense:'◎',rub:'△',easy:'△',text:'飛距離と感度を伸ばしやすい。リーダー結束が必要で、根ズレ対策はリーダー側で行う。'};
 if(c.type==='carbon')return{cast:'○',sense:'○',rub:'◎',easy:'◎',text:'扱いやすさと根ズレ耐性のバランス型。PEより飛距離・感度は控えめ。'};
 if(c.type==='fluoro')return{cast:'△',sense:'○',rub:'◎',easy:'○',text:'沈みやすく根ズレに強い。道糸では太くなるほど巻きグセと飛距離に注意。'};
 return{cast:'○',sense:'△',rub:'○',easy:'◎',text:'しなやかで扱いやすい。初心者向きだが感度はPEより控えめ。'};
}
function recommendedLineCandidates(tackle){
 return lineCatalog.map(c=>({...c,compat:lineCandidateCompatibility(tackle,c)})).filter(c=>c.compat.ok);
}

function calculateTackleDiagnosis(tackle){
  const rod = findAssistProfile(tackle);
  const reel = findReelProfile(tackle);
  const line = parseLineProfile(tackle?.line||'');
  let scores=[];
  if(rod) scores.push(4);
  if(reel) scores.push(gradeScore(reel.grade));
  if(tackle?.line) scores.push(gradeScore(line.grade));
  const overall = scores.length ? scoreGrade(Math.min(...scores)) : '△';

  let comments=[];
  if(!rod) comments.push('ロッドは未学習のため、重量判定を保留します。');
  if(!reel) comments.push('リールは未学習のため、番手・糸巻量の確認が必要です。');
  if(!tackle?.line) comments.push('ラインが未登録です。');
  if(rod && reel && tackle?.line) comments.push('ロッド・リール・ラインの3要素をまとめて診断しています。');

  let lineAdjustment = '';
  if(line.isCarbon && line.size===3){
    if(rod?.name.includes('LUREMATIC')) lineAdjustment='3号はロッドのナイロン/フロロ適合8–16lbに対して太め寄り。使用は可能でも、軽い仕掛けの飛距離・操作感では不利になりやすい。';
    else if(rod?.name.includes('SKYHIGH')) lineAdjustment='3号はS100MHのナイロン適合12–25lbの下限寄りに収まりやすく、扱いやすい組み合わせ。';
  }
  return {rod,reel,line,overall,comments,lineAdjustment};
}



const targetFishProfiles=[
 {id:'kisu',name:'キス',icon:'🐟',methods:['ちょい投げ'],start:'まずは軽めのオモリから',lineHint:'細めのラインほど飛距離を出しやすい。根や障害物が少ない場所向き。',beginner:'底をゆっくり探り、アタリがあった場所をもう一度通してみよう。'},
 {id:'seabass',name:'シーバス',icon:'🌊',methods:['ルアー','ジグヘッド＋ワーム'],start:'まずは投げやすい中間重量から',lineHint:'PEは飛距離と感度を出しやすい。リーダーを組み合わせる。',beginner:'最初は一定速度で巻くだけでOK。流れや明暗の境目を狙ってみよう。'},
 {id:'aji',name:'アジ',icon:'🐟',methods:['ジグヘッド＋ワーム','サビキ'],start:'軽い仕掛けから',lineHint:'軽量仕掛けでは細いラインが有利。現在のタックルで無理に細くしすぎない。',beginner:'サビキなら足元から。ワームなら表層・中層・底を順番に探ろう。'},
 {id:'saba',name:'サバ',icon:'🐟',methods:['サビキ','メタルジグ'],start:'反応のある層を探す',lineHint:'回遊魚なので飛距離が欲しい場面ではPEが有利。',beginner:'群れが来たら手返し重視。周囲と仕掛けが絡まないよう注意。'},
 {id:'kasago',name:'カサゴ',icon:'🪨',methods:['ジグヘッド＋ワーム'],start:'底を取れる重さから',lineHint:'根ズレが多い場所では耐摩耗性を重視。',beginner:'堤防際や岩の隙間をゆっくり。根掛かりしそうなら少し浮かせよう。'}
];

function targetAdvice(tackle,target){
 const d=calculateTackleDiagnosis(tackle), rod=d.rod;
 if(!rod)return{grade:'△',method:null,tip:'ロッドが未学習なので具体的な重量は出しません。'};
 const available=rod.tips.filter(x=>target.methods.includes(x[0]));
 if(!available.length)return{grade:'△',method:null,tip:'このタックルではMFLの推奨釣法データがまだありません。'};
 const best=available.sort((a,b)=>gradeScore(b[1])-gradeScore(a[1]))[0];
 return{grade:best[1],method:best[0],range:best[2],first:best[4]||best[2],comfort:best[5]||best[2],upper:best[6]||'—',tip:best[7]||best[3]};
}

function renderAssist(){
 let id=localStorage.getItem('mfl_assistTackle')||state.tackles[0]?.id||'',t=state.tackles.find(x=>x.id===id)||state.tackles[0],d=calculateTackleDiagnosis(t),p=d.rod;
 app.innerHTML=`<section class="assist-hero"><p class="eyebrow">MFL ASSIST β</p><h2>My Tackleを、まとめて診断。<div class="assist-safety-strip"><strong>ASSISTの役割</strong><span>「正解」を決めず、ロッド・リール・ラインの無理が出にくい範囲を案内します。</span></div></h2><p>ロッド・リール・ラインを読み取り、釣り方と重量の目安を考えます。</p></section>
 <section class="section assist-select"><label>診断するMy Tackle<select id="assistTackleSelect">${state.tackles.length?state.tackles.map(x=>`<option value="${x.id}" ${x.id===t?.id?'selected':''}>${escapeHtml(x.name)}｜${escapeHtml(x.rod)}</option>`).join(''):'<option>先にMy Tackleを登録してください</option>'}</select></label></section>
 ${!t?'<section class="empty-state compact"><div class="empty-icon">🎣</div><h2>タックルを登録しよう</h2></section>':
 `<section class="assist-overall">
   <div class="assist-overall-grade">${d.overall}</div>
   <div><small>TACKLE BALANCE</small><h3>${escapeHtml(t.name)}</h3><p>${d.comments.join(' ')}</p></div>
 </section>
 <section class="assist-parts">
   <article><span>🎣</span><div><small>ROD</small><strong>${p?escapeHtml(p.name):escapeHtml(t.rod||'未登録')}</strong><em>${p?'公式確認済み':'学習前'}</em></div></article>
   <article><span>🌀</span><div><small>REEL</small><strong>${d.reel?escapeHtml(d.reel.name):escapeHtml(t.reel||'未登録')}</strong><em>${d.reel?d.reel.official:'学習前'}</em></div></article>
   <article><span>🧵</span><div><small>LINE</small><strong>${escapeHtml(d.line.label)}</strong><em>${escapeHtml(d.line.note)}</em></div></article>
 </section>
 ${d.lineAdjustment?`<section class="assist-warning"><strong>ラインとのバランス</strong><p>${d.lineAdjustment}</p></section>`:''}
 ${p?`<section class="section"><h3>このタックルでできる釣り</h3><div class="assist-list">${p.tips.map(a=>`<details class="assist-item"><summary><span class="assist-grade">${a[1]}</span><span><strong>${a[0]}</strong><small>${a[2]}</small></span><b>›</b></summary><div class="assist-detail"><div class="assist-start"><small>最初に付けるなら</small><strong>${a[4]||a[2]}</strong></div><div class="assist-range"><span><small>快適</small><b>${a[5]||a[2]}</b></span><span><small>上限寄り</small><b>${a[6]||'—'}</b></span></div><p>${a[7]||a[3]}</p><p class="assist-reel-note">${d.reel?d.reel.note:''}</p></div></details>`).join('')}</div></section>`:
 '<section class="empty-state compact"><div class="empty-icon">🧭</div><h2>ロッドはまだ学習前です</h2><p>公式スペックを登録するまで重量は推測しません。</p></section>'}
 <section class="section target-assist-card">
<div class="section-heading"><h3>🎯 何を釣りたい？</h3><span class="assist-badge">TARGET ASSIST</span></div>
<p class="line-sim-lead">魚を選ぶと、今のMy Tackleから釣り方を逆算します。</p>
<div class="target-grid">${targetFishProfiles.map(f=>`<button class="target-fish-button" data-target-fish="${f.id}"><span>${f.icon}</span><strong>${f.name}</strong></button>`).join('')}</div>
<div id="targetAssistResult"></div>
</section><section class="section line-sim-card">
<div class="section-heading"><h3>🧵 ラインを変えて試す</h3><span class="assist-badge">SIMULATION</span></div>
<p class="line-sim-lead">竿とリールはそのまま。ラインだけ変えた場合をその場で再診断します。</p>
<label>候補ライン<select id="assistLineSelect"><option value="">候補を選択</option>${recommendedLineCandidates(t).map(c=>`<option value="${c.id}">${c.label}</option>`).join('')}</select></label>
<div id="lineSimResult"></div>
</section><section class="assist-note"><strong>🔰 MFLの考え方</strong><p>製品ジャンルではなく、公式スペックとMy Tackleの組み合わせで判断します。ラインの銘柄・実強度が不明な場合は安全側の目安を出します。</p></section>`}`;
 let s=document.getElementById('assistTackleSelect');if(s)s.onchange=()=>{localStorage.setItem('mfl_assistTackle',s.value);renderAssist()}
 
 document.querySelectorAll('[data-target-fish]').forEach(btn=>btn.onclick=()=>{
   const f=targetFishProfiles.find(x=>x.id===btn.dataset.targetFish),a=targetAdvice(t,f),box=document.getElementById('targetAssistResult');
   document.querySelectorAll('[data-target-fish]').forEach(x=>x.classList.toggle('active',x===btn));
   box.innerHTML=`<div class="target-result">
     <div class="target-result-head"><span class="assist-overall-grade">${a.grade}</span><div><small>${f.name}を狙うなら</small><strong>${a.method||'判定保留'}</strong></div></div>
     ${a.method?`<div class="target-first"><small>🔰 最初はこれ</small><strong>${a.first}</strong></div>
     <div class="assist-range"><span><small>快適</small><b>${a.comfort}</b></span><span><small>上限寄り</small><b>${a.upper}</b></span></div>`:''}
     <p>${a.tip}</p><div class="target-hints"><p><b>🧵 ライン：</b>${f.lineHint}</p><p><b>🎣 初心者：</b>${f.beginner}</p></div>
   </div>`;
 });

 let lineSel=document.getElementById('assistLineSelect');
 if(lineSel)lineSel.onchange=()=>{
   const c=lineCatalog.find(x=>x.id===lineSel.value),box=document.getElementById('lineSimResult');
   if(!c){box.innerHTML='';return;}
   const comp=lineCandidateCompatibility(t,c),fx=lineEffects(c);
   box.innerHTML=`<div class="line-sim-result">
   <div class="line-sim-head"><span class="assist-overall-grade">${comp.grade}</span><div><small>仮想セッティング</small><strong>${c.label}</strong><p>${comp.reason}</p></div></div>
   <div class="line-effect-grid"><span><small>飛距離</small><b>${fx.cast}</b></span><span><small>感度</small><b>${fx.sense}</b></span><span><small>根ズレ</small><b>${fx.rub}</b></span><span><small>扱いやすさ</small><b>${fx.easy}</b></span></div>
   <p class="line-effect-text">${fx.text}</p>
   <div class="line-compare"><small>現在</small><strong>${escapeHtml(t.line||'未登録')}</strong><span>→</span><small>候補</small><strong>${c.label}</strong></div>
   <button class="primary-button" id="applyLineBtn">このラインをMy Tackleに設定</button></div>`;
   document.getElementById('applyLineBtn').onclick=()=>{
     if(!confirm(`My Tackleのラインを「${c.label}」に変更しますか？`))return;
     state.tackles=state.tackles.map(x=>x.id===t.id?{...x,line:c.label}:x);save();renderAssist();
   };
 };

}

function renderTackle() {
  app.innerHTML = `
    <section class="tackle-intro">
      <p class="eyebrow">MY TACKLE</p>
      <h2>相棒と、海へ。</h2>
      <p>このタックルで釣った魚の数だけ、Ocean Rankが育ちます。</p>
      <button class="primary-button" id="addTackleBtn">＋ タックルを登録</button>
    </section>
    <section class="section">
      ${state.tackles.length ? state.tackles.map(t => {
        const count = tackleFishCount(t.id);
        const rank = oceanRankFor(count);
        const next = nextOceanRank(count);
        const progress = next ? Math.max(0, Math.min(100, ((count-rank.min)/(next.min-rank.min))*100)) : 100;
        return `<article class="tackle-card">
          <div class="tackle-rank-icon">${rank.icon}</div>
          <div class="tackle-card-main">
            <div class="tackle-card-top"><div><small>OCEAN RANK</small><h3>${escapeHtml(t.name)}</h3></div><strong>${rank.name}</strong></div>
            <p>🎣 ${escapeHtml(t.rod)}${t.reel ? `　🌀 ${escapeHtml(t.reel)}` : ''}</p>
            ${t.line ? `<p>🧵 ${escapeHtml(t.line)}</p>` : ''}
            <div class="tackle-count"><strong>${count}</strong><span>匹の思い出</span></div>
            <div class="ocean-progress"><span style="width:${progress}%"></span></div>
            <small class="rank-next">${next ? `次の「${next.name}」まで ${next.min-count}匹` : '最高ランク到達！'}</small>
            <button class="secondary-button tackle-assist-button" data-assist-tackle="${t.id}">🧭 このタックルを診断</button>
            <button class="tackle-delete" data-delete-tackle="${t.id}">このタックルを削除</button>
          </div>
        </article>`;
      }).join('') : `<section class="empty-state compact"><div class="empty-icon">🎣</div><h2>まだ相棒がいません</h2><p>最初のタックルを登録しよう。最初は「はじまりの石」からスタートします。</p></section>`}
    </section>
    <section class="ocean-rank-guide">
      <h3>Ocean Rank</h3>
      <div class="rank-strip">${oceanRanks.map(r => `<span title="${r.min}匹〜"><b>${r.icon}</b><small>${r.min}</small></span>`).join('')}</div>
    </section>`;
  document.getElementById('addTackleBtn').onclick = openTackle;
  document.querySelectorAll('[data-assist-tackle]').forEach(btn => btn.onclick = () => {
    localStorage.setItem('mfl_assistTackle', btn.dataset.assistTackle);
    state.view = 'assist';
    render();
  });
  document.querySelectorAll('[data-delete-tackle]').forEach(btn => btn.onclick = () => {
    const id = btn.dataset.deleteTackle;
    if (!confirmDestructiveAction('このタックルを削除しますか？', '削除されるのはこのタックル登録だけです。釣行・釣果・写真・予定・設定は残ります。')) return;
    state.tackles = state.tackles.filter(t => t.id !== id);
    save(); renderTackle();
  });
}

function dangerLabel(f){
  if(f.dangerLevel >= 3) return '☠️ 危険';
  if(f.dangerLevel === 2) return '⚠️ 要注意';
  if(f.dangerLevel === 1) return '⚠️ 注意';
  return '';
}

function fishPhotoSummary(){
  const fishes=fishMaster.filter(f=>f.name!=='その他');
  const withPhoto=fishes.filter(f=>f.photo).length;
  return {total:fishes.length,withPhoto,pct:Math.round(withPhoto/fishes.length*100)};
}
function fishSourceLine(f){
  if(f.photoCredit)return `<div class="fish-photo-source"><span>📷</span>${escapeHtml(f.photoCredit)}</div>`;
  if(f.photoPending)return `<div class="fish-photo-source pending"><span>🔎</span>魚種同定と再利用条件を確認中。誤った写真は載せません。</div>`;
  return '';
}

function renderEncyclopedia() {
  const caught = new Set(state.catches.map(c => c.fishName));
  app.innerHTML = `
    <section class="fish-safety-banner">
      <strong>⚠️ 分からない魚は素手で触らない</strong>
      <p>危険魚は赤いカードで表示します。小さい魚でも毒棘を持つ種類があります。</p>
    </section>
    ${(()=>{const p=fishPhotoSummary();return `<section class="fish-photo-progress"><div><small>PHOTO ENCYCLOPEDIA</small><strong>実写写真 ${p.withPhoto}/${p.total}魚種</strong></div><span>${p.pct}%</span><i><em style="width:${p.pct}%"></em></i><p>魚種の取り違えを避けるため、確認できた写真だけを掲載します。</p></section>`})()}
    <section class="section fish-photo-grid">
      ${fishMaster.filter(f=>f.name!=='その他').map(f => `
        <button class="fish-photo-card danger-${f.dangerLevel||0}" data-fish="${escapeHtml(f.name)}">
          <div class="fish-photo-wrap">
            ${f.photo ? `<img src="${f.photo}" alt="${escapeHtml(f.name)}の写真" loading="lazy">` : `<div class="fish-photo-fallback"><span>${f.emoji}</span><small>${f.photoPending?'魚種確認中':'実写写真 準備中'}</small></div>`}
            ${f.dangerLevel ? `<span class="fish-danger-badge">${dangerLabel(f)}</span>` : ''}
            ${caught.has(f.name) ? `<span class="fish-caught-badge">釣った ✓</span>` : ''}
          </div>
          <div class="fish-photo-copy">
            <h3>${escapeHtml(f.name)}</h3>
            <p>${f.dangerLevel >= 3 ? escapeHtml(f.dangerTitle||f.danger) : escapeHtml(f.edible)}</p>
          </div>
        </button>`).join('')}
    </section>
    <div id="fishDetailOverlay"></div>`;
  document.querySelectorAll('[data-fish]').forEach(btn => btn.onclick = () => showFishDetail(getFish(btn.dataset.fish)));
}

function fishKnowledgeBlocks(f){
  const methods=f.methods||[];
  const dangerClass=(f.dangerLevel||0)>=2?'danger':((f.dangerLevel||0)===1?'caution':'safe');
  const touch=f.touch||((f.dangerLevel||0)>=2?'素手で触らない。':'針やヒレに注意して扱う。');
  return `<section class="fish-knowledge">
    <div class="fish-knowledge-card"><span>📍</span><div><small>どこにいる？</small><strong>${escapeHtml(f.where||'釣り場・季節によって変わります。')}</strong></div></div>
    <div class="fish-knowledge-card"><span>🎣</span><div><small>狙い方</small><div class="fish-method-chips">${methods.map(x=>`<b>${escapeHtml(x)}</b>`).join('')||'<b>仕掛けを確認</b>'}</div><em>エサ：${escapeHtml(f.bait||'状況に合わせる')}</em></div></div>
    <div class="fish-knowledge-card"><span>🗓️</span><div><small>時期の目安</small><strong>${escapeHtml(f.season||'地域・年によって変動')}</strong></div></div>
    <div class="fish-touch ${dangerClass}"><div><span>${dangerClass==='danger'?'☠️':dangerClass==='caution'?'⚠️':'✋'}</span><strong>触り方</strong></div><p>${escapeHtml(touch)}</p></div>
  </section>`;
}

function showFishDetail(f){
  const root=document.getElementById('fishDetailOverlay');
  if(!root) return;
  root.innerHTML=`<div class="fish-detail-backdrop" id="fishDetailClose">
    <article class="fish-detail-sheet danger-${f.dangerLevel||0}" onclick="event.stopPropagation()">
      <button class="fish-detail-x" id="fishDetailX">×</button>
      <div class="fish-detail-photo">
        ${f.photo?`<img src="${f.photo}" alt="${escapeHtml(f.name)}">`:`<div>${f.emoji}</div>`}
        ${f.dangerLevel>=2?`<div class="fish-detail-danger">${f.dangerLevel>=3?'☠️':'⚠️'} ${escapeHtml(f.dangerTitle||f.danger)}</div>`:''}
      </div>
      <div class="fish-detail-body">
        <h2>${escapeHtml(f.name)}</h2>
        ${f.scientific?`<div class="fish-scientific">${escapeHtml(f.scientific)}</div>`:''}
        ${fishSourceLine(f)}
        ${f.dangerLevel>=3?`<section class="danger-stop"><strong>素手で触らない</strong><p>${escapeHtml(f.danger)}</p>${f.dangerAction?`<p>${escapeHtml(f.dangerAction)}</p>`:''}</section>`:''}
        ${f.photoPending?`<section class="fish-id-caution"><strong>🔎 同定注意</strong><p>${escapeHtml(f.dangerAction||'似た魚がいるため、写真だけで決めつけない。')}</p></section>`:''}
        ${fishKnowledgeBlocks(f)}
        <dl>
          <div><dt>食べ方</dt><dd>${escapeHtml(f.edible)}</dd></div>
          <div><dt>持ち帰り目安</dt><dd>${escapeHtml(f.guide)}</dd></div>
          <div><dt>注意</dt><dd>${escapeHtml(f.danger)}</dd></div>
        </dl>
      </div>
    </article>
  </div>`;
  document.getElementById('fishDetailClose').onclick=()=>root.innerHTML='';
  document.getElementById('fishDetailX').onclick=()=>root.innerHTML='';
}




function fishingMapPrioritySpots(){
  const ids=[
    'ichihara','wakasu','kisarazu_inner','tateyama_sunset',
    'higashiogishima_west','umibetsuri','choshi-marina-coast',
    'asahi-ioka-coast','onjuku-coast','kamogawa-coast'
  ];
  return ids.map(id=>kantoFishingSpots.find(s=>s.id===id)).filter(Boolean);
}
function prioritySpotStripHTML(){
  const spots=fishingMapPrioritySpots();
  return `<section class="map-priority-strip">
    <div class="map-priority-head">
      <div><small>MFL PICK</small><strong>まず見るならここ</strong></div>
      <span>${spots.length}候補</span>
    </div>
    <div class="map-priority-scroll">
      ${spots.map(s=>`<button data-fishing-spot="${s.id}" class="map-priority-card">
        <span class="map-priority-pin">📍</span>
        <div><strong>${s.short||s.name}</strong><small>${s.pref}・初心者 ${stars(s.beginner)}</small></div>
      </button>`).join('')}
    </div>
  </section>`;
}


function eastChibaSpots(){
  return kantoFishingSpots.filter(s=>s.pref==='千葉' && ['sotobo','kujukuri','choshi'].includes(chibaZoneOf(s)));
}
function eastChibaQuickHTML(){
  const spots=eastChibaSpots();
  return `<section class="east-quick-panel">
    <div class="east-quick-head"><div><small>CHIBA EAST</small><strong>千葉東岸</strong></div><span>${spots.length}候補</span></div>
    <div class="east-quick-list">
      ${spots.map(s=>`<button data-fishing-spot="${s.id}">
        <span>📍</span><div><strong>${s.name}</strong><small>${s.type||'海岸・周辺候補'}｜初心者 ${stars(s.beginner)}</small></div><b>›</b>
      </button>`).join('')}
    </div>
  </section>`;
}
function setupMapViewModes(){
  const root=document.getElementById('mapViewMode'); if(!root)return;
  const renderMode=(mode)=>{
    document.querySelectorAll('[data-map-view-mode]').forEach(b=>b.classList.toggle('active',b.dataset.mapViewMode===mode));
    if(mode==='recommended'){
      root.innerHTML=`${prioritySpotStripHTML()}${renderKantoMap()}`;
      setupKantoMap();
    }else if(mode==='east'){
      root.innerHTML=`${eastChibaQuickHTML()}${renderKantoMap()}`;
      setupKantoMap();
    }else{
      root.innerHTML=renderKantoMap();
      setupKantoMap();
    }
    root.querySelectorAll('[data-fishing-spot]').forEach(btn=>btn.onclick=()=>showFishingSpot(btn.dataset.fishingSpot));
  };
  document.querySelectorAll('[data-map-view-mode]').forEach(btn=>btn.onclick=()=>renderMode(btn.dataset.mapViewMode));
}


function recentFishingSpots(){
  const ids=JSON.parse(localStorage.getItem('mfl_recentFishingSpots')||'[]');
  return ids.map(id=>kantoFishingSpots.find(s=>s.id===id)).filter(Boolean).slice(0,5);
}
function rememberFishingSpot(id){
  let ids=JSON.parse(localStorage.getItem('mfl_recentFishingSpots')||'[]').filter(x=>x!==id);
  ids.unshift(id);
  localStorage.setItem('mfl_recentFishingSpots',JSON.stringify(ids.slice(0,5)));
}
function recentFishingSpotsHTML(){
  const spots=recentFishingSpots();
  if(!spots.length)return '';
  return `<section class="recent-map-spots">
    <div class="recent-map-head">
      <div><small>RECENT</small><strong>最近見た釣り場</strong></div>
      <button id="clearRecentFishingSpots">消去</button>
    </div>
    <div class="recent-map-list">
      ${spots.map(s=>`<button data-fishing-spot="${s.id}">
        <span>🕘</span><div><strong>${s.short||s.name}</strong><small>${s.pref}・${s.name}</small></div><b>›</b>
      </button>`).join('')}
    </div>
  </section>`;
}
function setupRecentFishingSpots(){
  const clear=document.getElementById('clearRecentFishingSpots');
  if(clear)clear.onclick=()=>{
    localStorage.removeItem('mfl_recentFishingSpots');
    const block=document.querySelector('.recent-map-spots');
    if(block)block.remove();
  };
}


function mapSearchText(s){
  return `${s.name||''} ${s.short||''} ${s.pref||''} ${s.area||''} ${s.address||''} ${s.fish||''}`.toLowerCase();
}
function mapSearchResultsHTML(spots){
  if(!spots.length)return `<div class="map-search-empty">該当する釣り場が見つかりません。</div>`;
  return `<div class="map-search-count">${spots.length}件</div>
    <div class="map-search-list">${spots.slice(0,20).map(s=>`<button data-fishing-spot="${s.id}">
      <span>📍</span><div><strong>${s.name}</strong><small>${s.pref}・初心者 ${stars(s.beginner)}・${s.short||''}</small></div><b>›</b>
    </button>`).join('')}</div>`;
}
function setupMapSpotSearch(){
  const input=document.getElementById('mapSpotSearch');
  const clear=document.getElementById('mapSpotSearchClear');
  const root=document.getElementById('mapSearchResults');
  if(!input||!root)return;

  const run=()=>{
    const q=input.value.trim().toLowerCase();
    if(clear)clear.hidden=!q;
    if(!q){root.hidden=true;root.innerHTML='';return;}
    const spots=kantoFishingSpots.filter(s=>mapSearchText(s).includes(q));
    root.hidden=false;
    root.innerHTML=mapSearchResultsHTML(spots);
    root.querySelectorAll('[data-fishing-spot]').forEach(btn=>btn.onclick=()=>showFishingSpot(btn.dataset.fishingSpot));
  };
  input.oninput=run;
  if(clear)clear.onclick=()=>{input.value='';run();input.focus();};
}


function styleMatchSpot(s,style){
  if(style==='all') return true;
  const styles=(s.styles||[]).join(' ');
  if(style==='ちょい投げ') return /ちょい投げ|投げ釣り/.test(styles);
  if(style==='ジグヘッド') return /ジグヘッド|ワーム/.test(styles);
  if(style==='サビキ') return /サビキ/.test(styles);
  if(style==='ルアー') return /ルアー|ジグ/.test(styles);
  return false;
}
function mapStyleResultsHTML(spots,style){
  if(style==='all') return '';
  if(!spots.length) return `<div class="map-style-empty">この釣り方で掲載中の候補はまだありません。</div>`;
  return `<div class="map-style-result-head"><strong>${style}</strong><span>${spots.length}候補</span></div>
    <div class="map-style-result-list">${spots.slice(0,12).map(s=>`<button data-fishing-spot="${s.id}">
      <span>📍</span><div><strong>${s.name}</strong><small>${s.pref}・初心者 ${stars(s.beginner)}・${styleMiniTags(s)}</small></div><b>›</b>
    </button>`).join('')}</div>`;
}
function setupMapStyleFilter(){
  const root=document.getElementById('mapStyleResults'); if(!root)return;
  document.querySelectorAll('[data-map-style]').forEach(btn=>btn.onclick=()=>{
    const style=btn.dataset.mapStyle;
    document.querySelectorAll('[data-map-style]').forEach(x=>x.classList.toggle('active',x===btn));
    if(style==='all'){root.hidden=true;root.innerHTML='';return;}
    const spots=kantoFishingSpots.filter(s=>styleMatchSpot(s,style));
    root.hidden=false;
    root.innerHTML=mapStyleResultsHTML(spots,style);
    root.querySelectorAll('[data-fishing-spot]').forEach(b=>b.onclick=()=>showFishingSpot(b.dataset.fishingSpot));
  });
}


function beginnerRecommendedSpots(){
  return kantoFishingSpots.filter(s=>Number(s.beginner||0)>=4);
}
function beginnerFilterResultsHTML(){
  const spots=beginnerRecommendedSpots();
  return `<section class="beginner-map-results">
    <div class="beginner-map-results-head">
      <div><small>BEGINNER</small><strong>初心者向け候補</strong></div>
      <span>${spots.length}か所</span>
    </div>
    <div class="beginner-open-hint">カードをタップすると、その釣り場の詳細を開きます。</div>
    <div class="beginner-map-results-list">
      ${spots.map(s=>`<button type="button" class="beginner-spot-card" data-fishing-spot="${s.id}" aria-label="${s.name}の詳細を開く">
        <span class="beginner-pin">📍</span>
        <div class="beginner-spot-copy">
          <strong>${s.name}</strong>
          <small>${s.pref}・初心者 ${stars(s.beginner)}・${styleMiniTags(s)}</small>
        </div>
        <span class="beginner-arrow" aria-hidden="true">›</span>
      </button>`).join('')}
    </div>
  </section>`;
}
function setupBeginnerOnlyFilter(){
  const btn=document.getElementById('beginnerOnlyToggle');
  const root=document.getElementById('mapViewMode');
  if(!btn||!root)return;
  let on=false;
  btn.onclick=()=>{
    on=!on;
    btn.setAttribute('aria-pressed',String(on));
    btn.classList.toggle('active',on);
    const state=btn.querySelector('b'); if(state)state.textContent=on?'ON':'OFF';
    if(on){
      root.innerHTML=beginnerFilterResultsHTML();
      root.querySelectorAll('[data-fishing-spot]').forEach(x=>x.onclick=()=>showFishingSpot(x.dataset.fishingSpot));
    }else{
      root.innerHTML=`${prioritySpotStripHTML()}${renderKantoMap()}`;
      setupKantoMap();
      root.querySelectorAll('[data-fishing-spot]').forEach(x=>x.onclick=()=>showFishingSpot(x.dataset.fishingSpot));
    }
  };
}


function facilityMatchSpot(s,type){
  const f=(s.facilities||[]).join(' ');
  if(type==='parking')return /駐車場/.test(f);
  if(type==='toilet')return /トイレ/.test(f);
  if(type==='managed')return /管理施設|監視員|職員|海釣り施設|魚釣園/.test(f+' '+(s.name||''));
  return false;
}
function facilityResultsHTML(spots,type){
  const labels={parking:'駐車場あり',toilet:'トイレあり',managed:'管理施設'};
  if(!spots.length)return `<div class="facility-empty">${labels[type]}の掲載候補はまだありません。</div>`;
  return `<div class="facility-result-head"><strong>${labels[type]}</strong><span>${spots.length}候補</span></div>
  <div class="facility-result-list">${spots.map(s=>`<button data-fishing-spot="${s.id}">
    <span>📍</span><div><strong>${s.name}</strong><small>${s.pref}・${(s.facilities||[]).slice(0,3).join(' / ')}</small></div><b>›</b>
  </button>`).join('')}</div>`;
}
function setupMapFacilityFilter(){
  const root=document.getElementById('mapFacilityResults');if(!root)return;
  let active='';
  document.querySelectorAll('[data-map-facility]').forEach(btn=>btn.onclick=()=>{
    const type=btn.dataset.mapFacility;
    const same=active===type;
    active=same?'':type;
    document.querySelectorAll('[data-map-facility]').forEach(x=>x.classList.toggle('active',!same&&x===btn));
    if(!active){root.hidden=true;root.innerHTML='';return;}
    const spots=kantoFishingSpots.filter(s=>facilityMatchSpot(s,type));
    root.hidden=false;
    root.innerHTML=facilityResultsHTML(spots,type);
    root.querySelectorAll('[data-fishing-spot]').forEach(b=>b.onclick=()=>showFishingSpot(b.dataset.fishingSpot));
  });
}


function setupMapFilterPanel(){
  const toggle=document.getElementById('mapFilterPanelToggle');
  const panel=document.getElementById('mapFilterPanel');
  if(!toggle||!panel)return;
  toggle.onclick=()=>{
    const open=panel.hidden;
    panel.hidden=!open;
    toggle.setAttribute('aria-expanded',String(open));
    toggle.classList.toggle('active',open);
    const state=toggle.querySelector('b');
    if(state)state.textContent=open?'閉じる':'開く';
  };
}





function setupGlobalFishingSpotClicks(){
  const root=document.getElementById('app');
  if(!root || root.dataset.spotDelegation==='1') return;
  root.dataset.spotDelegation='1';
  root.addEventListener('click',(e)=>{
    const target=e.target.closest('[data-fishing-spot]');
    if(!target) return;
    const id=target.getAttribute('data-fishing-spot');
    if(!id) return;
    e.preventDefault();
    e.stopPropagation();
    showFishingSpot(id);
  });
}

function renderFishingMap(){
  app.innerHTML = `
    <section class="fishing-map-view">
      <section class="fishing-map-hero">
        <div>
          <p class="eyebrow">MFL FISHING MAP</p>
          <h2>関東 釣地図</h2>
          <p>場所を探すことに集中する、MFLの独立した釣り場マップ。</p>
        </div>
        <span class="fishing-map-count">${kantoFishingSpots.length} SPOTS</span>
      </section>
      <section class="map-view-switcher">
        <button class="active" data-map-view-mode="recommended">⭐ おすすめ</button>
        <button data-map-view-mode="all">🗺️ 全エリア</button>
        <button data-map-view-mode="east">🌊 千葉東岸</button>
      </section>
      <div class="map-clean-hint">場所名を検索。必要な時だけ条件を開く。</div>
      <section class="map-search-box">
        <span>🔎</span>
        <input id="mapSpotSearch" type="search" placeholder="釣り場名・地域で検索">
        <button id="mapSpotSearchClear" hidden>×</button>
      </section>
      <button id="mapFilterPanelToggle" class="map-filter-panel-toggle" aria-expanded="false"><span>⚙️</span><div><strong>条件を絞る</strong><small>初心者・設備・釣り方</small></div><b>開く</b></button>
      <section id="mapFilterPanel" class="map-filter-panel" hidden>
      <section class="map-beginner-filter">
        <button id="beginnerOnlyToggle" aria-pressed="false"><span>👫</span><div><strong>初心者向けだけ表示</strong><small>初心者評価 ★★★★☆ 以上</small></div><b>OFF</b></button>
      </section>

      <section class="map-facility-filter">
        <div class="map-facility-head"><small>FACILITY</small><strong>設備から探す</strong></div>
        <div class="map-facility-buttons">
          <button data-map-facility="parking">🅿️ 駐車場</button>
          <button data-map-facility="toilet">🚻 トイレ</button>
          <button data-map-facility="managed">🛟 管理施設</button>
        </div>
        <div id="mapFacilityResults" class="map-facility-results" hidden></div>
      </section>

      <section class="map-style-filter">
        <div class="map-style-filter-head"><small>STYLE</small><strong>釣り方から探す</strong></div>
        <div class="map-style-filter-buttons">
          <button data-map-style="all" class="active">全部</button>
          <button data-map-style="ちょい投げ">🎣 ちょい投げ</button>
          <button data-map-style="ジグヘッド">🪱 ジグヘッド</button>
          <button data-map-style="サビキ">🐟 サビキ</button>
          <button data-map-style="ルアー">✨ ルアー</button>
        </div>
        <div id="mapStyleResults" class="map-style-results" hidden></div>
      </section>
      </section>
      <section id="mapSearchResults" class="map-search-results" hidden></section>
      ${recentFishingSpotsHTML()}
      <section id="mapViewMode">
        ${prioritySpotStripHTML()}
        ${renderKantoMap()}
      </section>
    </section>`;
  setupKantoMap();
  document.querySelectorAll('.map-priority-card[data-fishing-spot]').forEach(btn=>{
    btn.onclick=()=>showFishingSpot(btn.dataset.fishingSpot);
  });
  setupMapViewModes();
  setupRecentFishingSpots();
  setupMapSpotSearch();
  setupMapStyleFilter();
  setupBeginnerOnlyFilter();
  setupMapFacilityFilter();
  setupMapFilterPanel();

  setupGlobalFishingSpotClicks();
}

function renderGuide() {
  app.innerHTML = `
    <section class="guide-hero">
      <p class="eyebrow">MFL FIELD GUIDE</p>
      <h2>釣行手引き</h2>
      <p>分からない時に必要な項目だけ開く、MFLの実用手引き。</p>
    </section>

    <div class="guide-section-summary">
      <div><span>🧩</span><strong>仕掛け</strong><small>組み方・金具・重さ</small></div>
      <div><span>📚</span><strong>知識</strong><small>用語・ライン・針</small></div>
      <div><span>🚧</span><strong>現地</strong><small>安全・ルール・困りごと</small></div>
    </div>

    <div class="guide-group-label"><span>🧩</span><div><small>RIG</small><strong>仕掛けを組む</strong></div></div>
    <section class="guide-grid guide-grid-compact">
      <button class="guide-menu-card" data-guide-section="rigflow"><span class="guide-menu-icon">🧩</span><span><strong>仕掛けのつなぎ方</strong><small>順番どおりに組み立てる</small></span><b>›</b></button>
      <button class="guide-menu-card guide-parts-menu" data-guide-section="parts"><span class="guide-menu-icon">🔗</span><span><strong>接続パーツ</strong><small>サルカン・スナップ</small></span><b>›</b></button>
      <button class="guide-menu-card guide-weight-menu" data-guide-section="weights"><span class="guide-menu-icon">⚖️</span><span><strong>オモリ号数</strong><small>号 ↔ g の目安</small></span><b>›</b></button>
      <button class="guide-menu-card guide-knot-menu" data-guide-section="knots"><span class="guide-menu-icon">🧵</span><span><strong>糸の結び方</strong><small>STEP図解</small></span><b>›</b></button>
    </section>

    <div class="guide-group-label"><span>📚</span><div><small>KNOWLEDGE</small><strong>意味を調べる</strong></div></div>
    <section class="guide-grid guide-grid-compact">
      <button class="guide-menu-card guide-glossary-menu" data-guide-section="glossary"><span class="guide-menu-icon">📚</span><span><strong>釣り用語</strong><small>分からない言葉を検索</small></span><b>›</b></button>
      <button class="guide-menu-card guide-hook-menu" data-guide-section="hooks"><span class="guide-menu-icon">🪝</span><span><strong>針の号数</strong><small>種類とサイズの見方</small></span><b>›</b></button>
      <button class="guide-menu-card guide-line-menu" data-guide-section="lines"><span class="guide-menu-icon">🧵</span><span><strong>ラインの種類</strong><small>ナイロン・フロロ・PE</small></span><b>›</b></button>
      <button class="guide-menu-card" data-guide-section="rigs"><span class="guide-menu-icon">🎣</span><span><strong>仕掛けの基本</strong><small>釣り方ごとの特徴</small></span><b>›</b></button>
    </section>

    <div class="guide-group-label"><span>🚧</span><div><small>FIELD</small><strong>現地で確認する</strong></div></div>
    <section class="guide-grid guide-grid-compact">
      <button class="guide-menu-card guide-rules-menu" data-guide-section="rules"><span class="guide-menu-icon">🚧</span><span><strong>現地ルールの見方</strong><small>禁止・制限・施設ルール</small></span><b>›</b></button>
      <button class="guide-menu-card" data-guide-section="pier"><span class="guide-menu-icon">🌊</span><span><strong>堤防の見方</strong><small>足元・流れ・明暗</small></span><b>›</b></button>
      <button class="guide-menu-card" data-guide-section="trouble"><span class="guide-menu-icon">🛟</span><span><strong>困ったとき</strong><small>根掛かり・糸絡み・知らない魚</small></span><b>›</b></button>
    </section>

    <section id="guideContent" class="guide-content">
      <div class="guide-welcome"><span>📖</span><h3>必要なところだけ開けばOK</h3><p>最初から全部覚える必要はありません。現場で迷った項目だけ確認できます。</p></div>
    </section>`;
  document.querySelectorAll('[data-guide-section]').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('[data-guide-section]').forEach(b => b.classList.toggle('active', b===btn));
      renderGuideSection(btn.dataset.guideSection);
    };
  });
}

function knotDiagram(type, step) {
  const commonStart = `<svg class="knot-svg" viewBox="0 0 320 150" role="img" aria-label="結び方 STEP ${step}">
    <defs><marker id="arrow-${type}-${step}" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="currentColor"/></marker></defs>
    <rect x="0" y="0" width="320" height="150" rx="16" class="knot-bg"/>`;
  const end=`</svg>`;
  const eye=`<circle cx="255" cy="75" r="19" class="knot-metal"/><circle cx="255" cy="75" r="10" class="knot-hole"/>`;

  if(type==='uni'){
    const drawings={
      1:`${eye}<path d="M30 75 C90 75 165 75 245 75" class="knot-line"/><path d="M245 75 C205 115 155 118 120 100" class="knot-tag"/><path d="M210 106 C226 102 238 93 245 83" class="knot-arrow"/>`,
      2:`${eye}<path d="M30 65 C95 65 175 65 245 75" class="knot-line"/><path d="M245 75 C205 120 135 120 105 88 C135 67 176 69 205 87" class="knot-tag"/><path d="M124 91 C145 80 173 80 195 89" class="knot-arrow"/>`,
      3:`${eye}<path d="M30 65 C105 65 185 65 245 75" class="knot-line"/><path d="M205 88 C185 76 171 104 190 111 C207 117 218 94 199 87 C181 80 168 101 185 110" class="knot-tag"/><path d="M162 119 C185 128 211 117 218 99" class="knot-arrow"/>`,
      4:`${eye}<path d="M30 75 C115 75 205 75 245 75" class="knot-line"/><path d="M205 69 C215 62 225 65 233 72 M205 81 C216 88 226 85 234 78" class="knot-wrap"/><path d="M72 45 L42 68" class="knot-arrow"/>`
    }; return commonStart+drawings[step]+end;
  }
  if(type==='clinch'){
    const drawings={
      1:`${eye}<path d="M30 75 C100 75 185 75 245 75" class="knot-line"/><path d="M245 75 C220 110 185 112 160 95" class="knot-tag"/>`,
      2:`${eye}<path d="M30 70 C105 70 190 70 245 75" class="knot-line"/><path d="M238 83 C215 108 190 95 210 81 C226 69 207 58 190 70 C174 82 194 95 211 83" class="knot-tag"/><path d="M180 110 C205 118 229 102 236 88" class="knot-arrow"/>`,
      3:`${eye}<path d="M30 75 C115 75 205 75 245 75" class="knot-line"/><path d="M205 69 L235 73 M205 81 L235 77" class="knot-wrap"/><path d="M70 45 L43 68" class="knot-arrow"/>`
    }; return commonStart+drawings[step]+end;
  }
  const drawings={
    1:`<path d="M20 58 C100 58 220 58 300 58" class="knot-line"/><path d="M20 92 C100 92 220 92 300 92" class="knot-tag"/><text x="24" y="45" class="knot-label">糸 A</text><text x="24" y="120" class="knot-label">糸 B</text>`,
    2:`<path d="M20 58 C100 58 220 58 300 58" class="knot-line"/><path d="M20 92 C80 92 110 110 135 91 C155 75 137 53 120 65 C103 77 119 98 139 88" class="knot-tag"/><path d="M155 108 C136 119 111 113 101 99" class="knot-arrow"/>`,
    3:`<path d="M20 58 C80 58 110 40 135 59 C155 75 137 97 120 85 C103 73 119 52 139 62" class="knot-line"/><path d="M20 92 C80 92 110 110 135 91 C155 75 137 53 120 65 C103 77 119 98 139 88 M145 92 C200 92 250 92 300 92" class="knot-tag"/><path d="M165 43 C145 34 120 39 108 52" class="knot-arrow"/>`,
    4:`<path d="M20 75 C100 75 122 75 145 75" class="knot-line"/><path d="M300 75 C220 75 198 75 175 75" class="knot-tag"/><ellipse cx="160" cy="75" rx="20" ry="11" class="knot-finish"/><path d="M72 45 L38 68 M248 105 L282 82" class="knot-arrow"/>`
  }; return commonStart+drawings[step]+end;
}
function knotSteps(type, steps) {
  return `<div class="knot-diagram-list">${steps.map((s,i)=>`
    <div class="knot-diagram-step">
      <div class="knot-step-head"><span>STEP ${i+1}</span><strong>${s}</strong></div>
      ${knotDiagram(type,i+1)}
    </div>`).join('')}</div>`;
}


const kantoFishingSpots=[
{id:'ichihara',area:'bay-east',name:'オリジナルメーカー海づり公園',short:'市原',pref:'千葉',beginner:5,tackle:'◎',x:61,y:61,address:'千葉県市原市五井南海岸1-12',fish:'アジ・サバ・スズキ・クロダイ・イワシなど',styles:['サビキ ◎','軽めのルアー ○','ジグヘッド ○','ちょい投げ ○'],facilities:['フェンス','監視員','トイレ','売店','貸竿','食堂'],note:'足場と安全設備が整った桟橋型。初心者・家族連れ向けを公式に案内。',gear:'S90MLは軽め、100MHは少し重めを試しやすく、2本の性格差を楽しみやすい。',checked:'2026年8月',official:'https://ichihara-umizuri.com/'},
{id:'kashima',area:'ibaraki',name:'鹿島港魚釣園',short:'鹿島',pref:'茨城',beginner:5,tackle:'◎',x:72,y:25,address:'茨城県鹿嶋市新浜11',fish:'アジ・サバ・イワシ・スズキ・根魚など',styles:['サビキ ◎','ルアー ○','ジグヘッド ○','ちょい投げ ○'],facilities:['トイレ','売店','貸竿','無料駐車場','職員','救助設備'],note:'ライフジャケット着用が必要。茨城県公式では鹿島港は魚釣園以外は釣り禁止。港湾施設・防波堤には入らない。',gear:'水深3〜10mで釣り方の幅を出しやすく、S90MLと100MHの使い分け向き。',checked:'2026年8月',official:'https://kashima-fa.com/infomation/'},
{id:'honmoku',area:'bay-south',name:'本牧海づり施設',short:'本牧',pref:'神奈川',beginner:5,tackle:'◎',x:42,y:70,address:'神奈川県横浜市中区本牧ふ頭1',fish:'アジ・サバ・イワシ・スズキ・クロダイなど',styles:['サビキ ◎','ルアー ○','ジグヘッド ○','ちょい投げ ○'],facilities:['管理施設','売店','食堂','貸竿','トイレ'],note:'大型の管理海づり施設。料金・ルール・混雑状況は公式で事前確認。',gear:'S90MLで軽め、100MHで重めを試し分けやすい。',checked:'2026年8月',official:'https://yokohama-fishingpiers.jp/honmoku/'},
{id:'isogo',area:'bay-south',name:'磯子海づり施設',short:'磯子',pref:'神奈川',beginner:5,tackle:'○',x:39,y:77,address:'神奈川県横浜市磯子区新磯子39',fish:'アジ・サバ・メバル・カサゴ・クロダイなど',styles:['サビキ ◎','ジグヘッド ○','軽い仕掛け ○'],facilities:['管理施設','貸竿','売店','駐車場','トイレ'],note:'管理された海づり施設。駐車場は有料。営業時間とルールを公式で確認。',gear:'特にS90MLの軽快さを活かしやすい。100MHは軽い釣りではオーバーパワー気味の場面あり。',checked:'2026年8月',official:'https://yokohama-fishingpiers.jp/isogo/'},
{id:'wakasu',area:'tokyo',name:'若洲海浜公園 海釣り施設',short:'若洲',pref:'東京',beginner:4,tackle:'△',x:52,y:57,address:'東京都江東区若洲三丁目1番2号',fish:'スズキ・カサゴ・メバル・ハゼ・イワシなど',styles:['サビキ ○','足元狙い ○','投げ釣り ×','ルアーキャスト ×'],facilities:['海釣り施設','護岸','駐車場'],note:'振りかぶる投げ釣り・横投げ・ルアーのキャスティングは禁止。売店は2025年8月末で営業終了。',gear:'ロッドの性能を全部試す場所ではない。ルールを守って足元中心の釣りを楽しむ候補。',checked:'2026年8月',official:'https://www.tptc.co.jp/park/03_10/fishing'}

,{id:'daikoku',area:'bay-south',name:'大黒海づり施設',short:'大黒',pref:'神奈川',beginner:5,tackle:'◎',address:'神奈川県横浜市鶴見区大黒ふ頭20番地先',fish:'アジ・サバ・イワシ・スズキ・クロダイなど',styles:['サビキ ◎','ルアー ○','ジグヘッド ○','ちょい投げ ○'],facilities:['管理施設','売店','貸竿','トイレ'],note:'横浜の管理海づり施設。営業時間・入場制限・当日の利用ルールを公式で確認。',gear:'S90MLと100MHの両方を使い分けやすい。',checked:'2026年8月',official:'https://yokohama-fishingpiers.jp/daikoku/'}
,{id:'umibetsuri',area:'yokosuka',name:'海辺つり公園',short:'海辺',pref:'神奈川',beginner:5,tackle:'◎',address:'神奈川県横須賀市平成町3-1',fish:'アジ・サバ・シロギス・メバル・カサゴ・クロダイなど',styles:['サビキ ◎','ちょい投げ ○','ジグヘッド ○','ルアー ○'],facilities:['約500m釣り広場','管理事務所','トイレ','有料駐車場'],note:'四季を通じて海釣り可能。混雑時は竿1人1本の案内あり。',gear:'2本とも相性良好。',checked:'2026年8月',official:'https://www.city.yokosuka.kanagawa.jp/5820/minato/amenity_kouen/umituri/index.html'}
,{id:'higashiogishima',area:'bay-south',name:'東扇島西公園',short:'東扇島',pref:'神奈川',beginner:5,tackle:'◎',address:'神奈川県川崎市川崎区東扇島94-1',fish:'アジ・サバ・メバル・カサゴ・クロダイ・メジナなど',styles:['サビキ ◎','投げ釣り ○','ルアー ○','足元狙い ○'],facilities:['約600m釣り施設','柵','駐車場','芝生広場'],note:'川崎港内で釣り可能なのは東扇島西公園のみ。竿は1人2本まで。',gear:'2本とも使いやすい。',checked:'2026年8月',official:'https://www.city.kawasaki.jp/580/page/0000001336.html'}
,{id:'umikaze',area:'yokosuka',name:'うみかぜ公園',short:'うみかぜ',pref:'神奈川',beginner:4,tackle:'○',address:'神奈川県横須賀市平成町3-23',fish:'東京湾の岸壁魚種',styles:['平日の釣り ○','土日祝 ×','足元狙い ○'],facilities:['芝生広場','駐車場','公園施設'],note:'釣りは平日のみ可。土日祝日は釣り禁止。展望台4か所は終日釣り禁止。',gear:'平日に軽く試す候補。',checked:'2026年8月',official:'https://www.city.yokosuka.kanagawa.jp/5820/minato/amenity_kouen/umikaze/index.html'}

,
{id:'jonanjima',area:'tokyo',name:'城南島海浜公園 みなと広場',short:'城南島',pref:'東京',beginner:4,tackle:'○',address:'東京都大田区城南島4丁目2番2号',fish:'東京湾の岸壁魚種',styles:['足元狙い ○','軽い仕掛け ○','みなと広場のみ釣り可'],facilities:['公園','駐車場','トイレ','管理事務所'],note:'園内の魚釣りは原則禁止だが、第一航路側のみなと広場では魚釣り可能。立入禁止の護岸・防波堤には入らない。',gear:'S90MLが扱いやすい。100MHは軽い釣りではやや強め。釣り可能範囲が限られるため、現地表示を優先。',checked:'2026年8月',official:'https://tokyo-south-seaside-parks.com/jonanjima/'}
,
{id:'urayasu_chidori',area:'chiba',name:'浦安海岸 千鳥地区',short:'浦安千鳥',pref:'千葉',beginner:4,tackle:'◎',address:'千葉県浦安市千鳥地区前面護岸',fish:'スズキ・クロダイ・タコ・カレイなど',styles:['ルアー ○','ジグヘッド ○','足元狙い ○','軽い投げ ○'],facilities:['転落防止柵','開放護岸','公共駐車場'],note:'2025年4月から千鳥地区前面護岸は全区間開放。転落防止柵が整備されています。港湾施設や立入禁止区域には入らず、現地掲示を優先。',gear:'S90MLは軽めのルアーやジグヘッドと好相性。100MHもシーバス系や少し重めの仕掛けで使いやすい。',checked:'2026年8月',official:'https://www.city.urayasu.lg.jp/todokede/machi/1034984/1042285.html'},
{id:'futtsu_area',area:'chiba',name:'富津地区（市公式案内エリア）',short:'富津',pref:'千葉',beginner:4,tackle:'◎',address:'千葉県富津市 富津地区',fish:'キス・カサゴ・スズキ・メバル・イシモチ・タコなど',styles:['ちょい投げ ◎','ルアー ○','ジグヘッド ○','足元狙い ○'],facilities:['周辺観光施設','問い合わせ窓口'],note:'富津市が一年を通じて海釣りを楽しめる地区として案内。キス・カサゴ・スズキ・メバル・イイダコなど幅広い魚種が紹介されています。特定の港や防波堤すべてが自由に入れる意味ではなく、立入禁止・漁港・港湾施設は現地掲示を優先。',gear:'S90MLでキスなど軽めの釣り、100MHで少し重いルアーや遠投寄りの釣りと使い分けやすい。',checked:'2026年8月',official:'https://www.city.futtsu.lg.jp/0000000689.html'},
{id:'edogawa_hosuiro',area:'chiba',name:'江戸川放水路（妙典周辺）',short:'江戸川放水路',pref:'千葉',beginner:5,tackle:'○',address:'千葉県市川市 妙典周辺・江戸川放水路',fish:'マハゼ・スズキ幼魚・ボラ・コノシロなど',styles:['ハゼ釣り ◎','軽いちょい投げ ◎','足元狙い ○'],facilities:['河川敷','周辺駅','周辺店舗'],note:'市川市自然博物館がマハゼを含む多様な魚類を確認し、マハゼは「ハゼ釣りで知られる」と案内。干潟の生き物や河川利用者に配慮し、現地掲示・遊漁ルールを優先。',gear:'S90MLなら軽いハゼ仕掛けを扱いやすい。100MHはかなり強めなので、軽い仕掛けでは無理に使わず別の釣り方を楽しむ候補。',checked:'2026年8月',official:'https://www.city.ichikawa.lg.jp/site/edogawa/1238.html'},
{id:'shinsakon',area:'tokyo',name:'新左近川親水公園',short:'新左近川',pref:'東京',beginner:5,tackle:'△',address:'東京都江戸川区臨海町二・三丁目地先',fish:'水辺の小物釣り中心',styles:['小物釣り ◎','足元狙い ◎','大型ルアー ×'],facilities:['親水公園','トイレ','周辺施設','カヌー場'],note:'江戸川区の地域計画で「釣りが楽しめる」と明記された親水公園。カヌー利用者など他の水面利用者を優先し、投げ釣りや大きな仕掛けは避ける。',gear:'S90MLでも軽い仕掛けなら使えるが、100MHはオーバーパワー。夫婦のロッド性能を試す場所ではなく、初心者が糸・アタリ・魚の扱いに慣れる練習枠。',checked:'2026年8月',official:'https://www.city.edogawa.tokyo.jp/e066/kuseijoho/gaiyo/shisetsuguide/bunya/koendobutsuen/shinsakon.html'},
{id:'kawarago',area:'ibaraki',name:'河原子海岸',short:'河原子',pref:'茨城',beginner:4,tackle:'○',address:'茨城県日立市河原子町',fish:'海岸から狙える沿岸魚種',styles:['投げ釣り ○','軽いルアー ○','サーフ ○'],facilities:['海岸','周辺駐車場','周辺公園'],note:'日立市公式が、河原子海岸を釣り人も利用する海岸として紹介。海水浴期間・遊泳者・サーファー・漁業者を最優先し、混雑時は釣りを控える。',gear:'S90MLは軽いルアーや軽めの投げ、100MHは少し重めの仕掛けやサーフ寄りで使い分けやすい。',checked:'2026年8月',official:'https://www.city.hitachi.lg.jp/citypromotion/hitachi_donnamachi/1007306/1005129.html'},
{id:'hiraiso',area:'ibaraki',name:'平磯周辺の岩場',short:'平磯',pref:'茨城',beginner:3,tackle:'○',address:'茨城県ひたちなか市平磯町周辺',fish:'根魚・沿岸魚など',styles:['磯釣り ○','足元狙い ○','軽いルアー ○'],facilities:['周辺宿泊施設','周辺駐車場'],note:'観光いばらき公式で、平磯周辺の岩場では釣りが楽しめると案内。岩場は滑りやすく波をかぶる危険があるため、初心者は凪の日・明るい時間帯・ライフジャケット前提。',gear:'S90MLで軽い仕掛けを扱いやすい。100MHも根周りや少し重めに使えるが、安全優先で無理な立ち位置を取らない。',checked:'2026年8月',official:'https://www.ibarakiguide.jp/spot.php?code=1085&mode=detail'},
{id:'odaiba',area:'tokyo',name:'お台場海浜公園 釣り可能エリア',short:'お台場',pref:'東京',beginner:5,tackle:'○',address:'東京都港区台場1丁目周辺',fish:'マハゼ・セイゴ・フッコなど',styles:['足元狙い ◎','軽い仕掛け ◎','小物釣り ◎'],facilities:['手洗い場','トイレ','公園','釣り可能エリア表示'],note:'釣りは指定された磯浜の釣り可能エリアのみ。公園マップと現地表示を確認し、釣り禁止エリアには入らない。通年・無料。',gear:'S90MLで軽い仕掛けを扱いやすい。100MHはかなり強めなので、ロッド性能を試す場所というより初心者練習向け。',checked:'2026年8月',official:'https://www.tptc.co.jp/park/01_02/fishing'},
{id:'harumibashi',area:'tokyo',name:'春海橋公園',short:'春海橋',pref:'東京',beginner:5,tackle:'○',address:'東京都江東区豊洲2丁目周辺',fish:'マハゼ・セイゴ・フッコなど',styles:['足元狙い ◎','小物釣り ◎','軽い仕掛け ○'],facilities:['公園','手洗い場','トイレ','釣り可能エリア'],note:'公式に通年・無料で釣り可能。釣り可能エリアと釣り禁止エリアが分かれているため、公園マップと現地掲示を確認。',gear:'S90ML向き。100MHは軽い釣りではオーバーパワー気味。結び方や魚の扱いを覚える練習場所として使いやすい。',checked:'2026年8月',official:'https://www.tptc.co.jp/park/02_02'},
{id:'akatsuki',area:'tokyo',name:'暁ふ頭公園 釣り可能エリア',short:'暁ふ頭',pref:'東京',beginner:4,tackle:'○',address:'東京都江東区青海4丁目',fish:'マハゼ・セイゴ・フッコなど',styles:['足元狙い ◎','軽い仕掛け ○','投げ釣り ×'],facilities:['公園','駐車場','トイレ','釣り可能エリア'],note:'指定エリアで通年・無料で釣り可能。公式案内では投げ釣りは他の利用者の迷惑となるため禁止。ゴミは必ず持ち帰る。',gear:'S90MLで足元や軽い仕掛け向き。100MHは性能を活かしにくい。投げる釣りをしたい場合は別の釣り場を選ぶ。',checked:'2026年8月',official:'https://www.tptc.co.jp/park/01_10'},
{id:'ariake_west',area:'tokyo',name:'有明西ふ頭公園',short:'有明西',pref:'東京',beginner:5,tackle:'○',address:'東京都江東区有明3丁目周辺',fish:'マハゼ・セイゴ・フッコなど',styles:['足元狙い ◎','小物釣り ◎','軽い仕掛け ○'],facilities:['公園','釣り可能エリア','周辺施設'],note:'公園の運河沿いで通年・無料で釣り可能。公式マップで釣り可能エリアを確認し、他の公園利用者と譲り合う。',gear:'S90MLで扱いやすい都市型の練習候補。100MHは軽い釣りには強すぎる場面が多い。',checked:'2026年8月',official:'https://www.tptc.co.jp/park/02_05'},
{id:'mizunohiroba',area:'tokyo',name:'水の広場公園 釣り可能エリア',short:'水の広場',pref:'東京',beginner:5,tackle:'○',address:'東京都江東区青海・有明周辺',fish:'東京湾奥の小物・スズキ類など',styles:['足元狙い ◎','小物釣り ◎','軽い仕掛け ○'],facilities:['公園','釣り可能エリア','周辺施設'],note:'東京都港湾局系の海上公園公式「釣り・磯遊び」対象公園。現地の釣り可能範囲・掲示を必ず優先。',gear:'S90MLで軽い仕掛けや足元狙いに向く。100MHは軽い釣りでは強め。',checked:'2026年8月',official:'https://www.tptc.co.jp/park/search/01_04'},
{id:'shinkiba',area:'tokyo',name:'新木場公園 釣り可能エリア',short:'新木場',pref:'東京',beginner:5,tackle:'○',address:'東京都江東区新木場2丁目周辺',fish:'東京湾奥の小物・スズキ類など',styles:['足元狙い ◎','小物釣り ◎','軽い仕掛け ○'],facilities:['公園','釣り可能エリア'],note:'海上公園公式の釣り対象公園。釣り可能範囲と現地ルールを確認し、他の公園利用者を優先。',gear:'S90ML向き。100MHは軽い釣りではオーバーパワー気味。',checked:'2026年8月',official:'https://www.tptc.co.jp/park/search/01_04'},
{id:'yumenoshima',area:'tokyo',name:'夢の島緑道公園 釣り可能エリア',short:'夢の島',pref:'東京',beginner:5,tackle:'○',address:'東京都江東区夢の島周辺',fish:'東京湾奥の小物・スズキ類など',styles:['足元狙い ◎','小物釣り ◎','軽い仕掛け ○'],facilities:['緑道公園','釣り可能エリア'],note:'海上公園公式の釣り対象公園。指定範囲・現地掲示を優先し、歩行者など他利用者へ配慮。',gear:'S90MLで軽い仕掛け向き。100MHの性能を活かす場所というより練習候補。',checked:'2026年8月',official:'https://www.tptc.co.jp/park/search/01_04'},
{id:'kisarazu_uchiko',area:'chiba',name:'木更津内港公園',short:'木更津内港',pref:'千葉',beginner:4,tackle:'◎',address:'千葉県木更津市内港1 周辺',fish:'ハゼ・スズキ類など東京湾内の魚種',styles:['足元狙い ◎','軽いちょい投げ ○','ルアー ○'],facilities:['公園','港周辺','市公式安全案内'],note:'木更津市は内港公園や堤防で1年を通じて海釣りを楽しめると案内。転落事故もあるためライフジャケット着用を強く推奨。港湾施設・立入禁止表示・工事区画は必ず現地ルールを優先。',gear:'S90MLはハゼや軽め、100MHは少し重めのルアーや仕掛けで使い分けしやすい。',checked:'2026年8月',official:'https://www.city.kisarazu.lg.jp/soshiki/shobo/keibo/1/4060.html'}
,{id:'aicle',area:'yokosuka',name:'アイクル海釣りコーナー',short:'アイクル',pref:'神奈川',beginner:4,tackle:'○',address:'神奈川県横須賀市浦郷町5丁目2931番地',fish:'東京湾の岸壁魚種',styles:['足元狙い ◎','サビキ ○','軽い仕掛け ○'],facilities:['無料','公共施設','海釣りコーナー'],note:'横須賀市公式の無料海釣りコーナー。休館日を除き9:00〜17:00。天候や波で利用中止の場合あり。近隣に釣具店なし。',gear:'S90MLで軽い仕掛けを扱いやすい。100MHは軽い釣りでは強めなので、夫婦で役割を分ける練習候補。',checked:'2026年8月',official:'https://www.city.yokosuka.kanagawa.jp/4160/aicle/umizuri-corner.html'}

,{id:'harumi_ryokudo',area:'tokyo',name:'晴海緑道公園',short:'晴海緑道',pref:'東京',beginner:5,tackle:'○',address:'東京都中央区晴海4丁目・5丁目',fish:'マハゼ・セイゴ・フッコなど東京湾奥の魚種',styles:['足元狙い ◎','小物釣り ◎','軽い仕掛け ○'],facilities:['通年利用','無料','公園','公共交通向き'],note:'公式に釣り可能。通年・無料。公園専用駐車場はないため公共交通向き。使用した釣り具やゴミは必ず持ち帰る。',gear:'S90MLで軽い仕掛けや足元狙いに向く。100MHは軽い釣りでは強め。',checked:'2026年8月',official:'https://www.tptc.co.jp/park/02_08'}
,{id:'ariake_north',area:'tokyo',name:'有明北緑道公園',short:'有明北',pref:'東京',beginner:5,tackle:'○',address:'東京都江東区有明1丁目・2丁目',fish:'マハゼ・セイゴ・フッコなど',styles:['足元狙い ◎','小物釣り ◎','軽い仕掛け ○'],facilities:['通年利用','無料','釣り可能エリア','公共交通向き'],note:'有明西運河沿いの公式釣り可能公園。通年・無料。釣り可能エリアは公園マップと現地掲示を確認。専用駐車場なし。',gear:'S90ML向き。100MHは軽い釣りではオーバーパワー気味。',checked:'2026年8月',official:'https://www.tptc.co.jp/park/02_06'}
,{id:'shiokaze',area:'tokyo',name:'潮風公園 南コーストデッキ',short:'潮風公園',pref:'東京',beginner:4,tackle:'○',address:'東京都品川区東八潮',fish:'マハゼ・セイゴ・フッコなど',styles:['足元狙い ◎','軽い仕掛け ○','小物釣り ○'],facilities:['通年利用','無料','南側釣り可能エリア','公園'],note:'南コーストデッキが釣り可能エリア。北側護岸は工事等で閉鎖される場合があるため、当日の公式案内と現地表示を確認。',gear:'S90MLで軽い仕掛け向き。100MHは軽い釣りでは強め。',checked:'2026年8月',official:'https://www.tptc.co.jp/park/01_03/point'}

,{id:'tateyama_sunset',area:'chiba',name:'館山夕日桟橋',short:'館山夕日桟橋',pref:'千葉',beginner:5,tackle:'◎',address:'千葉県館山市館山1564-1周辺',fish:'アジ・サバ・シロギス・クロダイ・スズキなど',styles:['サビキ ◎','ちょい投げ ◎','ヘチ釣り ○','ルアー ○'],facilities:['約500m桟橋','手すり','周辺トイレ','渚の駅たてやま'],note:'館山市公式が桟橋での釣りを案内。竿は1人2本まで。上投げ・横投げは禁止。コマセは「カゴ」に入れたもののみ使用可能。歩道側・先端部での釣りは禁止。工事・船舶利用等で臨時規制がある場合は当日の公式案内を優先。',gear:'S90MLでサビキ・ちょい投げ・軽いルアー、100MHで少し重めの仕掛けと使い分けしやすい。',checked:'2026年8月',official:'https://www.city.tateyama.chiba.jp/minato/page100352.html'}
,{id:'choshi-marina-coast',area:'chiba-east',zone:'choshi',name:'銚子マリーナ・名洗港海浜公園周辺',short:'名洗',pref:'千葉',beginner:3,tackle:'○',address:'千葉県銚子市潮見町',fish:'回遊魚・シーバス等（周辺海域）',styles:['海岸からの釣り △','ルアー △'],facilities:['無料駐車場','常設トイレ','海浜公園'],note:'銚子市公式で銚子マリーナ海水浴場と隣接する名洗港海浜公園を確認。海水浴場開設期間は遊泳者最優先。マリーナ・港湾作業区域や立入規制は現地表示を必ず確認。MFLでは釣り専用施設ではなく周辺候補として掲載。',gear:'S90ML中心。外洋側は風・波が強い日は無理をしない。',checked:'2026年8月',official:'https://www.city.choshi.chiba.jp/kanko/page110015.html'}
,{id:'choshi-nagasaki-coast',area:'chiba-east',zone:'choshi',name:'長崎海岸・犬吠埼南側',short:'長崎',pref:'千葉',beginner:2,tackle:'○',address:'千葉県銚子市長崎町',fish:'沿岸魚（状況次第）',styles:['海岸・磯 △'],facilities:['無料駐車場','夏季トイレ'],note:'銚子市公式で長崎海水浴場を確認。磯浜で外洋の波を受けやすい。海水浴場開設期間は遊泳区域で釣りをしない。荒天・高波時は候補から外す。',gear:'初心者は穏やかな日限定。滑りやすい岩場へ無理に入らない。',checked:'2026年8月',official:'https://www.city.choshi.chiba.jp/kanko/page110015.html'}
,{id:'asahi-ioka-coast',area:'chiba-east',zone:'choshi',name:'飯岡・旭海岸周辺',short:'飯岡',pref:'千葉',beginner:2,tackle:'○',address:'千葉県旭市飯岡',fish:'ヒラメ・スズキ・回遊魚など（海況次第）',styles:['サーフ △','ルアー △'],facilities:['海岸','周辺駐車場は現地確認'],note:'九十九里・銚子海域をつなぐサーフ候補。千葉県管理海岸は原則自由使用で釣りも例示されているが、港湾・漁港区域は別扱い。遊泳者・サーファーを最優先し、離岸流・高波・工事規制を現地確認。',gear:'100MHを活かしやすい。初心者は波の低い日限定。',checked:'2026年8月',official:'https://www.pref.chiba.lg.jp/kakan/kaigan/kaigannriyou.html'}
,{id:'onjuku-coast',area:'chiba-east',zone:'sotobo',name:'御宿海岸周辺',short:'御宿',pref:'千葉',beginner:2,tackle:'○',address:'千葉県夷隅郡御宿町',fish:'ヒラメ・スズキなど（海況次第）',styles:['サーフ △'],facilities:['砂浜','観光海岸'],note:'外房の砂浜候補。県の外房地域区分にも含まれる海岸。海水浴・サーフィン利用者を最優先し、夏季や混雑時は釣り場所を慎重に選ぶ。',gear:'100MH中心。波と風が弱い日に。',checked:'2026年8月',official:'https://www.pref.chiba.lg.jp/shousupo/press/2026/bososurfing2026.html'}
,{id:'kamogawa-coast',area:'chiba-east',zone:'sotobo',name:'鴨川・前原海岸周辺',short:'鴨川',pref:'千葉',beginner:2,tackle:'○',address:'千葉県鴨川市',fish:'ヒラメ・スズキ・回遊魚など（海況次第）',styles:['サーフ △','ルアー △'],facilities:['海岸','市街地近接'],note:'外房南部の海岸候補。漁港内ではなく県管理海岸の考え方を基準に掲載。遊泳・サーフィン・イベント利用を優先し、港湾・漁港区域へ無断で入らない。',gear:'100MHを活かしやすい。S90MLは穏やかな近距離向け。',checked:'2026年8月',official:'https://www.pref.chiba.lg.jp/kakan/kaigan/kaigannriyou.html'}

];

function spotStatusBadge(s){
  const east=['sotobo','kujukuri','choshi'].includes(chibaZoneOf(s));
  if(east && /周辺|海岸/.test(s.name)) return '<span class="spot-status research">調査候補</span>';
  return '<span class="spot-status verified">掲載中</span>';
}

function stars(n){return '★'.repeat(n)+'☆'.repeat(5-n)}
function renderKantoMap(){return `<article class="guide-article kanto-guide">
<div class="guide-article-title fishing-map-title"><span>🗺️</span><div><small>KANTO FISHING MAP</small><h3>行きたい釣り場を探す</h3></div></div>
<div class="map-verification-banner"><div class="map-coverage"><b>🗺️ 千葉東岸 使える候補を厳選</b><span>場所ごとに描き分け中</span></div><strong>🛟 MFL VERIFIED MAP · TIDE DATA 2026</strong><span>数より正確性。公式に釣り可能と確認できた場所を少しずつ増やし、東京湾奥・千葉・木更津方面の密度を上げていきます。</span></div>
<p class="kanto-intro">エリアを選んで、気になる場所を開く。細かな情報は必要な時だけ確認できます。</p><div class="east-coast-safety"><strong>🌊 東岸サーフの見方</strong><span>千葉県管理海岸は原則自由使用で「釣り」も例示されています。ただし港湾・漁港区域は別。海水浴、サーフィン、工事、現地の立入規制を最優先にしてください。</span></div><div class="map-curation-note"><strong>🎯 MFL掲載基準</strong><span>実際に『ここへ行こう』と選べる場所を優先。範囲が広すぎる候補や目印だけの地点は、地図から外して整理します。</span></div>

<div class="map-mode-label"><span>①</span><strong>エリアから探す</strong></div>
<div class="chiba-density-panel">
  <div class="chiba-density-title"><span>🌊</span><div><small>CHIBA COAST DENSITY</small><strong>千葉を7エリアで見る</strong></div></div>
  <div class="chiba-density-grid">
    <button data-chiba-zone="north"><b>湾奥</b><span>浦安・市川</span></button>
    <button data-chiba-zone="central"><b>中央</b><span>市原</span></button>
    <button data-chiba-zone="kisarazu"><b>内房北</b><span>木更津・富津</span></button>
    <button data-chiba-zone="south"><b>南房総</b><span>館山</span></button>
    <button data-chiba-zone="sotobo"><b>外房</b><span>勝浦</span></button>
    <button data-chiba-zone="kujukuri"><b>九十九里</b><span>一宮</span></button>
    <button data-chiba-zone="choshi"><b>銚子</b><span>犬吠埼・名洗</span></button>
  </div>
  <div id="chibaZoneList" class="chiba-zone-list" hidden></div>
</div>
<div class="focus-badge">⭐ PRIORITY AREA</div>
<div class="mfl-area-grid focus-grid">
  <button class="area-select-card focus-card" data-area-open="chiba"><span>🌉</span><div><small>最優先</small><strong>千葉</strong><em>市原・浦安・富津・市川・木更津</em></div></button>
  <button class="area-select-card focus-card" data-area-open="tokyo"><span>🏙️</span><div><small>重点</small><strong>東京</strong><em>公式確認済み13か所</em></div></button>
</div>
<div class="mfl-area-grid secondary-grid">
  <button class="area-select-card" data-area-open="ibaraki"><span>🌊</span><div><small>茨城</small><strong>茨城沿岸</strong><em>鹿島・河原子・平磯</em></div></button>
  <button class="area-select-card" data-area-open="bay-south"><span>⚓</span><div><small>横浜・川崎</small><strong>東京湾南西</strong><em>管理施設中心</em></div></button>
  <button class="area-select-card wide" data-area-open="yokosuka"><span>🏞️</span><div><small>三浦半島</small><strong>横須賀</strong><em>海辺つり公園・うみかぜ</em></div></button>
</div>

<div class="field-ready-card">
  <div class="field-ready-head"><span>🎣</span><div><small>BEFORE YOU GO</small><strong>出発前30秒チェック</strong></div></div>
  <div class="field-ready-grid">
    <label><input type="checkbox"> ライフジャケット</label>
    <label><input type="checkbox"> 現地の立入禁止表示</label>
    <label><input type="checkbox"> 風・波・雷を確認</label>
    <label><input type="checkbox"> ラインと結び目を確認</label>
  </div>
  <p>チェックは保存しません。出発前に「忘れてないか」を見るだけの簡易確認です。</p>
</div>
<div class="kisarazu-research"><div class="kisarazu-head"><span>🌅</span><div><small>KISARAZU</small><strong>木更津方面・重点調査</strong></div></div><p>鳥居崎海浜公園・内港公園・潮浜公園などを調査中。公園の存在だけで「釣り可」とは判断せず、公式に釣り可能範囲を確認できた場所から正式掲載します。</p><div class="kisarazu-alert"><b>🦀 木更津地先の採捕ルール</b><span>ガザミ類は千葉県の委員会指示による採捕制限があります。現行の期間・場所・方法を公式情報で確認してください。</span></div></div><div class="kisarazu-focus-note"><strong>🌅 木更津方面を正式追加</strong><p>木更津市公式の安全案内を根拠に「木更津内港公園」を千葉エリアへ追加。木更津地先のガザミ類は採捕制限があるため要確認表示にしています。</p></div><div id="spotAreaPanel" class="spot-area-panel smart-area-panel" hidden></div>
<div id="fishingSpotDetail" class="spot-detail smart-spot-detail"></div>

<div class="research-master-summary"><div class="research-master-head"><span>🔬</span><div><small>KANTO MASTER RESEARCH</small><strong>関東釣り場マスター</strong><em class="research-quality">根拠優先モード</em></div><b>40件調査</b></div><div class="research-master-counts"><span class="r-verified"><b>29</b>VERIFIED</span><span class="r-hold"><b>5</b>HOLD</span><span class="r-excluded"><b>6</b>EXCLUDED</span><span class="r-map"><b>29</b>専用地図</span></div><div class="map-coverage-meter" id="mapCoverageMeter"><div><span>VERIFIED 地図カバー率</span><b>100%</b></div><i><em style="width:100%"></em></i><small>29 / 29か所を地図化</small></div><button class="research-master-toggle" id="researchMasterToggle"><span>調査状況を見る</span><b>›</b></button><div id="researchMasterPanel" class="research-master-panel" hidden><div class="research-rule"><strong>VERIFIED</strong><p>公式情報で釣り利用を確認。MFL掲載対象。</p></div><div class="research-rule hold"><strong>HOLD</strong><p>公式根拠が足りないため保留。</p></div><div class="research-rule excluded"><strong>EXCLUDED</strong><p>公式に禁止・立入不可を確認。今後も候補化しない。</p></div><div class="research-excluded-list"><small>再候補化しない代表例</small><span>⛔ 青海南ふ頭公園 隣接護岸</span><span>⛔ 久里浜外防波堤</span><span>⛔ 東扇島東公園</span><span>⛔ 川崎港内（西公園以外）</span><span>⛔ 鹿島港（魚釣園以外）</span></div><div class="research-hold-list"><small>保留</small><span>🟡 鳥居崎海浜公園周辺</span></div><div class="research-hold-list research-new"><small>千葉追加調査 v9.2</small><span>🟡 富津みなと公園</span><span>🟡 上総湊港海浜公園</span><span>🟡 袖ケ浦海浜公園</span><span>🟡 船橋港親水公園</span><span>⛔ 稲毛海浜公園 園内の池</span><p>公園・港湾緑地の存在だけでは「釣り可」と判定しない。公式に釣り可能範囲が確認できるまでHOLD。</p></div></div></div><div class="smart-tool-row">
  <button class="smart-tool-toggle" id="filterToggle" aria-expanded="false">
    <span class="smart-tool-icon">🔎</span><span><strong>条件から探す</strong><small>初心者・釣り方・タックルで絞る</small></span><b>›</b>
  </button>
  <div id="filterPanel" class="smart-collapsible" hidden>
    <div class="spot-filter-bar">
      <button class="spot-filter active" data-spot-filter="all">すべて</button>
      <button class="spot-filter" data-spot-filter="beginner">初心者★★★★★</button>
      <button class="spot-filter" data-spot-filter="tackle">タックル◎</button>
      <button class="spot-filter" data-spot-filter="sabiki">サビキ</button>
      <button class="spot-filter" data-spot-filter="cast">ちょい投げ</button>
      <button class="spot-filter" data-spot-filter="lure">ルアー</button>
      <button class="spot-filter" data-spot-filter="foot">足元</button>
    </div>
    <div id="filteredSpotList" class="filtered-spot-list"></div>
  </div>

  <button class="smart-tool-toggle" id="rulesToggle" aria-expanded="false">
    <span class="smart-tool-icon">🛟</span><span><strong>安全・掲載ルール</strong><small>禁止場所とMFLの掲載基準</small></span><b>›</b>
  </button>
  <div id="rulesPanel" class="smart-collapsible" hidden>
    <div class="ibaraki-ban-note">
      <strong>⚠️ 茨城港の港内は釣り禁止</strong>
      <p>大洗港区・日立港区・常陸那珂港区の岸壁や防波堤など、港湾施設での魚釣りは禁止です。</p>
    </div>
    <div class="accuracy-note"><strong>🔎 MFL掲載ルール</strong><p>「昔は釣れた」「ネットで有名」だけでは追加しません。現在の釣り可否と公式ルールを確認できた場所だけ載せます。</p></div>
  </div>
</div>
</article>`}

function filterSpotMatch(s, filter){
  if(filter==='all') return true;
  if(filter==='beginner') return s.beginner===5;
  if(filter==='tackle') return s.tackle==='◎';
  const text=(s.styles||[]).join(' ');
  if(filter==='sabiki') return /サビキ/.test(text) && !/サビキ ×/.test(text);
  if(filter==='cast') return /ちょい投げ|投げ釣り/.test(text) && !/投げ釣り ×/.test(text);
  if(filter==='lure') return /ルアー/.test(text) && !/ルアー.*×/.test(text);
  if(filter==='foot') return /足元/.test(text);
  return true;
}

function styleMiniTags(s){
  return (s.styles||[]).filter(x=>!/×/.test(x)).slice(0,3).map(x=>`<span>${x.replace(/[◎○△]/g,'').trim()}</span>`).join('');
}

function mapBadgeHTML(s){return seawallMapData[s.id]?'<span class="map-mini">🗺️地図</span>':'';}
function renderFilteredSpots(filter='all'){
  const root=document.getElementById('filteredSpotList'); if(!root)return;
  const spots=kantoFishingSpots.filter(s=>filterSpotMatch(s,filter));
  root.innerHTML=`<div class="filter-count"><strong>${spots.length}か所</strong><span>条件に合う候補</span></div>
  <div class="filter-results">${spots.map(s=>`<button class="filter-spot-card" data-fishing-spot="${s.id}">
    <div class="filter-spot-top"><span class="spot-pref">${s.pref}</span><strong>${s.name}</strong><b>${s.tackle}</b></div>
    <div class="filter-spot-meta"><span>初心者 ${stars(s.beginner)}</span><span>${spotTypeLabel(s.id)}</span><span class="verified-mini">✓公式</span>${mapBadgeHTML(s)}</div>
    <div class="filter-mini-tags">${styleMiniTags(s)}</div>
  </button>`).join('')||'<p class="note">この条件に合う掲載スポットはまだありません。</p>'}</div>`;
  root.querySelectorAll('[data-fishing-spot]').forEach(btn=>btn.onclick=()=>showFishingSpot(btn.dataset.fishingSpot));
}
function renderAreaSpots(area){
 const root=document.getElementById('spotAreaPanel');if(!root)return;
 const labels={chiba:'千葉',tokyo:'東京',ibaraki:'茨城','bay-south':'横浜・川崎',yokosuka:'横須賀'};
 const spots=area==='chiba'
   ? kantoFishingSpots.filter(s=>s.pref==='千葉')
   : kantoFishingSpots.filter(s=>s.area===area);
 root.hidden=false;
 root.innerHTML=`<div class="area-panel-head"><div><small>AREA</small><h4>${labels[area]}</h4></div><button id="closeAreaPanel">閉じる ×</button></div>
 <div class="area-spot-list">${spots.map(s=>`<button class="area-spot-button" data-fishing-spot="${s.id}"><span class="area-spot-pin">📍</span><span class="area-spot-copy"><strong>${s.name}</strong><small>初心者 ${stars(s.beginner)}　タックル ${s.tackle}</small>${spotStatusBadge(s)}<span class="area-style-mini">${styleMiniTags(s)}</span></span><b>›</b></button>`).join('')}</div>`;
 document.getElementById('closeAreaPanel').onclick=()=>root.hidden=true;
 root.querySelectorAll('[data-fishing-spot]').forEach(btn=>btn.onclick=()=>showFishingSpot(btn.dataset.fishingSpot));
 root.scrollIntoView({behavior:'smooth',block:'nearest'});
}

function chibaZoneOf(s){
  if(s.pref!=='千葉') return '';
  if(s.zone) return s.zone;
  if(/浦安|江戸川放水路/.test(s.name)) return 'north';
  if(/市原/.test(s.name)) return 'central';
  if(/木更津|富津/.test(s.name)) return 'kisarazu';
  if(/館山/.test(s.name)) return 'south';
  if(/勝浦|御宿/.test(s.name)) return 'sotobo';
  if(/九十九里|釣ヶ崎|一宮/.test(s.name)) return 'kujukuri';
  if(/銚子|犬吠|長崎|名洗/.test(s.name)) return 'choshi';
  return 'other';
}
function renderChibaZone(zone){
  const root=document.getElementById('chibaZoneList'); if(!root)return;
  const labels={north:'湾奥｜浦安・市川',central:'中央｜市原',kisarazu:'内房北｜木更津・富津',south:'南房総｜館山',sotobo:'外房｜御宿・勝浦・鴨川',kujukuri:'九十九里｜北部〜一宮',choshi:'銚子・旭｜犬吠埼・飯岡'};
  const spots=kantoFishingSpots.filter(s=>chibaZoneOf(s)===zone);
  root.hidden=false;
  root.innerHTML=`<div class="zone-head"><strong>${labels[zone]}</strong><span>${spots.length}か所</span></div>
  <div class="zone-list">${spots.map(s=>`<button class="zone-spot" data-fishing-spot="${s.id}">
    <span>📍</span><div><strong>${s.name}</strong><small>初心者 ${stars(s.beginner)}　タックル ${s.tackle}</small>${spotStatusBadge(s)}</div><b>›</b>
  </button>`).join('')}</div>`;
  root.querySelectorAll('[data-fishing-spot]').forEach(btn=>btn.onclick=()=>showFishingSpot(btn.dataset.fishingSpot));
  root.scrollIntoView({behavior:'smooth',block:'nearest'});
}

function setupKantoMap(){
  const rmt=document.getElementById('researchMasterToggle'),rmp=document.getElementById('researchMasterPanel'); if(rmt&&rmp)rmt.onclick=()=>{const o=rmp.hidden;rmp.hidden=!o;rmt.classList.toggle('open',o);};
  document.querySelectorAll('[data-chiba-zone]').forEach(btn=>btn.onclick=()=>renderChibaZone(btn.dataset.chibaZone));
  const togglePanel=(buttonId,panelId)=>{
    const btn=document.getElementById(buttonId), panel=document.getElementById(panelId);
    if(!btn||!panel)return;
    btn.onclick=()=>{
      const opening=panel.hidden;
      panel.hidden=!opening;
      btn.setAttribute('aria-expanded',String(opening));
      btn.classList.toggle('open',opening);
      if(opening && panelId==='filterPanel' && !panel.dataset.loaded){
        renderFilteredSpots('all'); panel.dataset.loaded='1';
      }
    };
  };
  togglePanel('filterToggle','filterPanel');
  togglePanel('rulesToggle','rulesPanel');

  document.querySelectorAll('[data-area-open]').forEach(btn=>btn.onclick=()=>{
    renderAreaSpots(btn.dataset.areaOpen);
    document.querySelectorAll('[data-area-open]').forEach(b=>b.classList.toggle('selected',b===btn));
    requestAnimationFrame(()=>{
      const panel=document.getElementById('spotAreaPanel');
      if(panel) panel.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });

  document.querySelectorAll('[data-spot-filter]').forEach(btn=>btn.onclick=()=>{
    document.querySelectorAll('[data-spot-filter]').forEach(b=>b.classList.toggle('active',b===btn));
    renderFilteredSpots(btn.dataset.spotFilter);
  });
}


function spotTypeLabel(id){
  const types={
    ichihara:'管理釣り施設',
    urayasu_chidori:'開放護岸',
    futtsu_area:'海岸・地区案内',
    kisarazu_uchiko:'港内公園',
    edogawa_hosuiro:'河口・放水路',
    shinsakon:'親水公園',
    wakasu:'海釣り施設',
    jonanjima:'公園内釣り可区画',
    odaiba:'公園内釣り可区画',
    harumibashi:'公園内釣り可区画',
    akatsuki:'公園内釣り可区画',
    ariake_west:'運河沿い公園',
    mizunohiroba:'公園内釣り可区画',
    shinkiba:'公園内釣り可区画',
    yumenoshima:'緑道公園',
    kashima:'管理釣り施設',
    kawarago:'海岸・サーフ',
    hiraiso:'岩場・磯',
    honmoku:'管理釣り施設',
    isogo:'管理釣り施設',
    daikoku:'管理釣り施設',
    higashiogishima:'公園釣り施設',
    umibetsuri:'海辺公園',
    harumi_ryokudo:'緑道公園',
    ariake_north:'緑道公園',
    shiokaze:'海上公園',
    tateyama_sunset:'観光桟橋',
    umikaze:'平日のみ釣り可'
  };
  return types[id]||'釣り場';
}


function specialSpotRules(s){
  if(s.id==='tateyama_sunset') return `<div class="special-rules">
    <strong>🎣 館山夕日桟橋ルール</strong>
    <div><span>竿</span><b>1人2本まで</b></div>
    <div><span>投げ方</span><b>上投げ・横投げ禁止</b></div>
    <div><span>コマセ</span><b>カゴのみ可</b></div>
    <div><span>釣り方</span><b>ウキ / フカセ / サビキ / ちょい投げ / ヘチ / ルアー</b></div>
  </div>`;
  if(s.id==='kisarazu_uchiko') return `<div class="special-rules"><strong>🛟 木更津安全メモ</strong><div><span>安全</span><b>ライフジャケット推奨</b></div><div><span>現地</span><b>工事・立入表示を優先</b></div></div>`;
  return '';
}

const seawallMapData={
  'urayasu_chidori':{title:'浦安海岸・千鳥地区',confidence:'公式開放情報＋長い護岸形状を反映',facts:['2025年4月から前面護岸全区間開放','千鳥公共駐車場を利用','長い海岸護岸型'],note:'長く連続する護岸と、その背後の陸側・公共駐車場の位置関係を分かりやすくした模式図です。',svg:`<svg viewBox="0 0 820 360"><rect width="820" height="360" rx="28" fill="#d8eef3"/><path d="M0 85H820V0H0Z" fill="#ddd7c4"/><path d="M25 122C180 108 350 114 510 104C650 96 750 104 800 95" fill="none" stroke="#e7dfc9" stroke-width="76"/><path d="M25 144C180 130 350 136 510 126C650 118 750 126 800 117" fill="none" stroke="#0b7285" stroke-width="9"/><path d="M48 104C210 91 360 96 520 87C650 80 740 86 782 79" fill="none" stroke="#f4b942" stroke-width="12"/><rect x="70" y="18" width="150" height="52" rx="12" fill="#fff" stroke="#a9c8ce" stroke-width="3"/><text x="105" y="50">千鳥公共駐車場</text><path d="M145 70L145 97" stroke="#647b80" stroke-width="4"/><circle cx="255" cy="135" r="17" fill="#0b7285"/><text x="247" y="142" fill="#fff">🎣</text><circle cx="470" cy="127" r="17" fill="#0b7285"/><text x="462" y="134" fill="#fff">🎣</text><circle cx="680" cy="121" r="17" fill="#0b7285"/><text x="672" y="128" fill="#fff">🎣</text><text x="46" y="230">東京湾</text><text x="305" y="184">長い開放護岸</text></svg>`,legend:['黄色＝護岸上の歩行・釣りエリアのイメージ','青線＝水際','P＝千鳥公共駐車場'],officialLabel:'浦安市公式'},
  'ichihara':{title:'オリジナルメーカー海づり公園',confidence:'公式寸法を反映した桟橋型',facts:['渡り桟橋 約120m','釣り桟橋 約300m','岸と平行に伸びる桟橋'],note:'岸から沖へ渡り桟橋を約120m進み、その先で岸と平行に約300mの釣り桟橋が伸びる施設形状を反映しています。',svg:`<svg viewBox="0 0 820 360"><rect width="820" height="360" rx="28" fill="#d6edf2"/><rect x="35" y="35" width="180" height="290" rx="18" fill="#ddd7c4"/><rect x="58" y="72" width="128" height="90" rx="14" fill="#fff" stroke="#b9c8ca" stroke-width="3"/><text x="86" y="110">管理棟</text><text x="83" y="138">売店・食堂</text><path d="M210 182H350" stroke="#f8f8f5" stroke-width="42"/><path d="M210 182H350" stroke="#0b7285" stroke-width="6"/><path d="M350 82V284" stroke="#f8f8f5" stroke-width="68"/><path d="M350 82V284" stroke="#0b7285" stroke-width="7"/><path d="M350 82H760" stroke="#f8f8f5" stroke-width="68"/><path d="M350 284H760" stroke="#f8f8f5" stroke-width="68"/><path d="M350 82H760" stroke="#0b7285" stroke-width="7"/><path d="M350 284H760" stroke="#0b7285" stroke-width="7"/><text x="220" y="162">渡り桟橋 約120m</text><text x="465" y="55">釣り桟橋 約300m</text><circle cx="470" cy="82" r="16" fill="#0b7285"/><text x="462" y="89" fill="#fff">🎣</text><circle cx="610" cy="284" r="16" fill="#0b7285"/><text x="602" y="291" fill="#fff">🎣</text><text x="480" y="188">海</text></svg>`,legend:['陸側の管理棟から入場','渡り桟橋を沖へ約120m','岸と平行な釣り桟橋が約300m'],officialLabel:'市原市立施設公式'},
  'kisarazu_uchiko':{title:'木更津内港公園',confidence:'内港型の専用模式図',facts:['内港公園＋堤防で海釣り可','一年を通じて楽しめる','ライフジャケット推奨'],note:'内港を囲む公園側の水際と堤防を、港内型として描き分けました。港湾作業・工事・立入禁止区画は図より現地表示を優先してください。',svg:`<svg viewBox="0 0 820 360"><rect width="820" height="360" rx="28" fill="#d8eef2"/><path d="M0 0H820V92H520V168H690V360H0Z" fill="#ddd7c4"/><path d="M520 92V168H690V338" fill="none" stroke="#0b7285" stroke-width="9"/><path d="M537 108V151H708V318" fill="none" stroke="#f4b942" stroke-width="12"/><rect x="75" y="50" width="220" height="90" rx="16" fill="#fff" stroke="#bdcbcd" stroke-width="3"/><text x="125" y="90">内港公園</text><text x="126" y="120">陸側・休憩エリア</text><text x="560" y="242">港内</text><circle cx="555" cy="137" r="17" fill="#0b7285"/><text x="547" y="144" fill="#fff">🎣</text><circle cx="690" cy="230" r="17" fill="#0b7285"/><text x="682" y="237" fill="#fff">🎣</text><path d="M690 338L760 338" stroke="#c94444" stroke-width="9" stroke-dasharray="14 10"/><text x="700" y="316">現地規制確認</text></svg>`,legend:['黄色＝公園側水際のイメージ','赤点線＝港湾規制を必ず現地確認','ライフジャケット推奨'],officialLabel:'木更津市公式'},
  'tateyama_sunset':{title:'館山夕日桟橋',confidence:'公式ルール＋約500m桟橋を反映',facts:['海岸通りから約500m','歩道側は釣り禁止','先端部は釣り禁止'],note:'長い一本道の桟橋形状と、釣り可能側／歩道側／先端部を分けて表示しています。',svg:`<svg viewBox="0 0 820 360"><rect width="820" height="360" rx="28" fill="#d7edf2"/><rect x="0" y="0" width="180" height="360" fill="#ddd7c4"/><rect x="75" y="92" width="100" height="170" rx="14" fill="#fff" stroke="#bdcbcd" stroke-width="3"/><text x="94" y="150">渚の駅</text><text x="92" y="178">たてやま</text><path d="M180 180H745" stroke="#fafaf7" stroke-width="76"/><path d="M180 180H745" stroke="#0b7285" stroke-width="7"/><path d="M215 135H670" stroke="#f4b942" stroke-width="12"/><path d="M215 225H670" stroke="#df5b5b" stroke-width="12" stroke-dasharray="18 12"/><rect x="670" y="126" width="75" height="108" rx="14" fill="#f5d9d9" stroke="#c94d4d" stroke-width="4"/><text x="336" y="112">釣り可能側</text><text x="330" y="264">歩道側：釣り禁止</text><text x="685" y="173">先端</text><text x="685" y="197">禁止</text><text x="355" y="320">桟橋 約500m</text></svg>`,legend:['黄色＝釣り可能側','赤点線＝歩道側・釣り禁止','先端部＝釣り禁止'],officialLabel:'館山市公式'},
  'wakasu':{title:'若洲海浜公園',confidence:'防波堤570m＋人工磯480mを反映',facts:['海釣り施設 防波堤 約570m','人工磯 約480m','水深 約3〜9m（満潮時）'],note:'若洲公園側から防波堤が伸び、その脇に人工磯が続く構成を別々に描き分けています。',svg:`<svg viewBox="0 0 820 360"><rect width="820" height="360" rx="28" fill="#d7eef2"/><path d="M0 0H340V250H0Z" fill="#ddd7c4"/><rect x="55" y="45" width="190" height="110" rx="18" fill="#fff" stroke="#bdcbcd" stroke-width="3"/><text x="95" y="88">若洲公園</text><text x="92" y="118">駐車場・施設</text><path d="M315 95H760" stroke="#fafaf7" stroke-width="60"/><path d="M315 95H760" stroke="#0b7285" stroke-width="7"/><path d="M245 245Q430 205 645 260" fill="none" stroke="#75888d" stroke-width="38" stroke-dasharray="14 9"/><text x="420" y="66">海釣り施設 約570m</text><text x="360" y="312">人工磯 約480m</text><circle cx="440" cy="95" r="16" fill="#0b7285"/><text x="432" y="102" fill="#fff">🎣</text><circle cx="575" cy="95" r="16" fill="#0b7285"/><text x="567" y="102" fill="#fff">🎣</text><circle cx="415" cy="237" r="16" fill="#0b7285"/><text x="407" y="244" fill="#fff">🎣</text></svg>`,legend:['白い長線＝防波堤型海釣り施設','石模様＝人工磯','防波堤と人工磯は別エリア'],officialLabel:'東京港埠頭公式'},
  'harumibashi':{
    title:'春海橋公園',confidence:'運河沿い公園＋旧晴海鉄道橋を反映',
    facts:['通年利用可能','無料','マハゼ・セイゴ・フッコ'],
    note:'水辺の遊歩道と旧晴海鉄道橋を目印にした専用模式図。公園マップと現地案内板を確認。',
    svg:`<svg viewBox="0 0 820 360"><rect width="820" height="360" rx="28" fill="#d8eef2"/><path d="M0 0H820V95H0Z" fill="#ddd7c4"/><path d="M60 118H760" stroke="#e7dfc9" stroke-width="78"/><path d="M60 145H760" stroke="#0b7285" stroke-width="8"/><path d="M80 120H730" stroke="#f4b942" stroke-width="11"/><path d="M245 20L365 120" stroke="#8a9598" stroke-width="17"/><path d="M255 20L375 120" stroke="#c3c9ca" stroke-width="6"/><text x="180" y="44">旧晴海鉄道橋</text><text x="90" y="215">運河</text><text x="320" y="188">釣り可能な水辺</text><circle cx="330" cy="138" r="17" fill="#0b7285"/><text x="322" y="145" fill="#fff">🎣</text><circle cx="520" cy="138" r="17" fill="#0b7285"/><text x="512" y="145" fill="#fff">🎣</text></svg>`,
    legend:['黄色＝水辺遊歩道のイメージ','旧晴海鉄道橋を目印に','現地表示を優先'],officialLabel:'東京港埠頭公式'
  },
  'ariake_west':{
    title:'有明西ふ頭公園',confidence:'有明西運河沿いの釣り可能区画を反映',
    facts:['指定エリアで釣り可能','通年・無料','投げ釣りは避ける'],
    note:'有明西運河に沿う細長い公園形状を模式化。投げ釣りは他利用者への迷惑になるため控える。',
    svg:`<svg viewBox="0 0 820 360"><rect width="820" height="360" rx="28" fill="#d8eef2"/><path d="M0 0H820V100H0Z" fill="#ddd7c4"/><path d="M100 108H720" stroke="#e7dfc9" stroke-width="82"/><path d="M100 142H720" stroke="#0b7285" stroke-width="8"/><path d="M120 112H690" stroke="#f4b942" stroke-width="12"/><rect x="545" y="18" width="180" height="55" rx="12" fill="#fff" stroke="#b9c8ca" stroke-width="3"/><text x="572" y="51">東京ビッグサイト側</text><text x="90" y="232">有明西運河</text><circle cx="300" cy="136" r="17" fill="#0b7285"/><text x="292" y="143" fill="#fff">🎣</text><circle cx="500" cy="136" r="17" fill="#0b7285"/><text x="492" y="143" fill="#fff">🎣</text><path d="M145 260H675" stroke="#df5b5b" stroke-width="8" stroke-dasharray="18 12"/><text x="245" y="295">投げ釣りは避ける</text></svg>`,
    legend:['黄色＝釣り可能側のイメージ','赤点線＝投げ釣り注意','大型船通過後の波に注意'],officialLabel:'東京港埠頭公式'
  },
  'harumi_ryokudo':{
    title:'晴海緑道公園',confidence:'晴海4・5丁目の長い水辺緑道を反映',
    facts:['通年利用可能','無料','専用駐車場なし'],
    note:'長い緑道型の公園と水際を専用図に。公共交通向きで、釣り具・ゴミは必ず持ち帰る。',
    svg:`<svg viewBox="0 0 820 360"><rect width="820" height="360" rx="28" fill="#d9eef2"/><path d="M0 0H820V95H0Z" fill="#ddd7c4"/><path d="M45 115C180 100 320 110 470 100C610 92 720 100 790 92" fill="none" stroke="#e7dfc9" stroke-width="76"/><path d="M45 142C180 127 320 137 470 127C610 119 720 127 790 119" fill="none" stroke="#0b7285" stroke-width="8"/><path d="M70 117C210 104 340 111 490 102C620 95 720 101 770 95" fill="none" stroke="#f4b942" stroke-width="12"/><text x="92" y="55">晴海4丁目</text><text x="620" y="55">晴海5丁目</text><text x="305" y="210">長い水辺緑道</text><circle cx="250" cy="135" r="17" fill="#0b7285"/><text x="242" y="142" fill="#fff">🎣</text><circle cx="480" cy="128" r="17" fill="#0b7285"/><text x="472" y="135" fill="#fff">🎣</text><circle cx="680" cy="122" r="17" fill="#0b7285"/><text x="672" y="129" fill="#fff">🎣</text></svg>`,
    legend:['黄色＝緑道の水際イメージ','専用駐車場なし','長い水辺を歩いて探れる'],officialLabel:'東京港埠頭公式'
  },
  'akatsuki':{title:'暁ふ頭公園 釣り可能エリア',confidence:'場所別専用レイアウト',facts:['ふ頭公園型','水際エリア','現地掲示を優先'],note:'ふ頭先端側の公園と水際の関係を分かりやすくした専用模式図。',svg:`<svg viewBox="0 0 820 360"><rect width="820" height="360" rx="28" fill="#d8eef2"/><path d="M0 0H500V155H660V0Z" fill="#ddd7c4"/><path d="M500 155H660V315H500Z" fill="#e7dfc9"/><path d="M515 165H645V295" fill="none" stroke="#f4b942" stroke-width="12"/><path d="M500 155H660V315" fill="none" stroke="#0b7285" stroke-width="8"/><text x="110" y="90">公園・陸側</text><text x="535" y="225">水際</text><circle cx="635" cy="195" r="16" fill="#0b7285"/><text x="627" y="202" fill="#fff">🎣</text></svg>`,legend:['黄色＝釣り可能側のイメージ','青線＝水際','現地掲示・最新情報を優先'],officialLabel:'公式確認'},
  'aicle':{title:'アイクル海釣りコーナー',confidence:'場所別専用レイアウト',facts:['管理施設型','釣り可能区画','利用時間を確認'],note:'管理施設と釣り可能な水際を分けた専用模式図。',svg:`<svg viewBox="0 0 820 360"><rect width="820" height="360" rx="28" fill="#d8eef2"/><rect x="40" y="55" width="230" height="220" rx="18" fill="#ddd7c4"/><rect x="80" y="90" width="150" height="80" rx="14" fill="#fff"/><text x="110" y="138">管理施設</text><path d="M270 180H720" stroke="#fafaf7" stroke-width="65"/><path d="M270 180H720" stroke="#0b7285" stroke-width="8"/><path d="M300 150H680" stroke="#f4b942" stroke-width="11"/><text x="420" y="260">釣り可能区画</text><circle cx="470" cy="174" r="16" fill="#0b7285"/><text x="462" y="181" fill="#fff">🎣</text></svg>`,legend:['黄色＝釣り可能側のイメージ','青線＝水際','現地掲示・最新情報を優先'],officialLabel:'公式確認'},
  'ariake_north':{title:'有明北緑道公園',confidence:'場所別専用レイアウト',facts:['有明西運河沿い','長い緑道型','通年利用'],note:'有明西運河沿いの細長い緑道と水際を専用図化。',svg:`<svg viewBox="0 0 820 360"><rect width="820" height="360" rx="28" fill="#d8eef2"/><path d="M0 0H820V90H0Z" fill="#ddd7c4"/><path d="M45 118C230 100 500 108 780 96" fill="none" stroke="#e8dfc9" stroke-width="72"/><path d="M45 143C230 125 500 133 780 121" fill="none" stroke="#0b7285" stroke-width="8"/><path d="M70 116C250 101 500 109 755 99" fill="none" stroke="#f4b942" stroke-width="11"/><text x="285" y="205">運河沿い緑道</text><circle cx="270" cy="137" r="16" fill="#0b7285"/><text x="262" y="144" fill="#fff">🎣</text><circle cx="540" cy="129" r="16" fill="#0b7285"/><text x="532" y="136" fill="#fff">🎣</text></svg>`,legend:['黄色＝釣り可能側のイメージ','青線＝水際','現地掲示・最新情報を優先'],officialLabel:'公式確認'},
  'shiokaze':{title:'潮風公園 南コーストデッキ',confidence:'場所別専用レイアウト',facts:['南側に釣り可能エリア','公園型の水際','現地規制を優先'],note:'南側の釣り可能な水辺を中心に、公園側と海側の位置関係を専用図化。',svg:`<svg viewBox="0 0 820 360"><rect width="820" height="360" rx="28" fill="#d8eef2"/><path d="M0 0H820V115H0Z" fill="#ddd7c4"/><path d="M65 130H755" stroke="#e7dfc9" stroke-width="75"/><path d="M65 157H755" stroke="#0b7285" stroke-width="8"/><path d="M390 132H730" stroke="#f4b942" stroke-width="12"/><path d="M90 132H350" stroke="#df5b5b" stroke-width="9" stroke-dasharray="16 10"/><text x="475" y="210">南側 釣り可能エリア</text><text x="125" y="210">規制確認</text><circle cx="525" cy="151" r="16" fill="#0b7285"/><text x="517" y="158" fill="#fff">🎣</text></svg>`,legend:['黄色＝釣り可能側のイメージ','青線＝水際','現地掲示・最新情報を優先'],officialLabel:'公式確認'},
  'higashiogishima':{title:'東扇島西公園',confidence:'公式600m釣りエリアを反映',facts:['釣りエリア 約600m','川崎港内で釣り可能なのは西公園','有料駐車場2か所・24時間'],note:'長い釣りエリアと公園側、駐車場の位置関係を専用図化。西公園以外の川崎港内へ広げない。',svg:`<svg viewBox="0 0 820 360"><rect width="820" height="360" rx="28" fill="#d8eef2"/><rect x="70" y="25" width="145" height="55" rx="12" fill="#fff"/><text x="96" y="58">駐車場①</text><rect x="240" y="25" width="145" height="55" rx="12" fill="#fff"/><text x="266" y="58">駐車場②</text><path d="M40 130H780" stroke="#e7dfc9" stroke-width="76"/><path d="M40 158H780" stroke="#0b7285" stroke-width="8"/><path d="M70 132H750" stroke="#f4b942" stroke-width="12"/><text x="325" y="210">釣りエリア 約600m</text><circle cx="260" cy="152" r="16" fill="#0b7285"/><text x="252" y="159" fill="#fff">🎣</text><circle cx="500" cy="152" r="16" fill="#0b7285"/><text x="492" y="159" fill="#fff">🎣</text><path d="M35 300H785" stroke="#df5b5b" stroke-width="8" stroke-dasharray="18 12"/><text x="270" y="335">西公園以外の川崎港内は釣り禁止</text></svg>`,legend:['黄色＝西公園の釣りエリア','駐車場2か所','赤点線＝西公園外へ広げない'],officialLabel:'川崎市公式'},
  'honmoku':{
    title:'本牧海づり施設',confidence:'沖桟橋＋新護岸を反映',
    facts:['沖桟橋あり','新護岸あり','混雑時は釣り方制限'],
    note:'本牧の代表的な沖桟橋と新護岸を分けて表示。入場者が定員の7割を超えるとルアー・エギ・テンヤ・投げサビキ等はアンダースロー制限。',
    svg:`<svg viewBox="0 0 820 360"><rect width="820" height="360" rx="28" fill="#d8eef2"/><rect x="35" y="40" width="210" height="260" rx="18" fill="#ddd7c4"/><rect x="70" y="70" width="140" height="85" rx="14" fill="#fff"/><text x="98" y="118">管理棟</text><path d="M245 175H410" stroke="#fafaf7" stroke-width="45"/><path d="M410 80V285" stroke="#fafaf7" stroke-width="64"/><path d="M410 80H760" stroke="#fafaf7" stroke-width="64"/><path d="M410 80H760" stroke="#0b7285" stroke-width="7"/><path d="M410 285H700" stroke="#0b7285" stroke-width="7"/><path d="M245 285H395" stroke="#f4b942" stroke-width="12"/><text x="475" y="55">沖桟橋</text><text x="270" y="320">新護岸</text><circle cx="520" cy="80" r="16" fill="#0b7285"/><text x="512" y="87" fill="#fff">🎣</text><circle cx="330" cy="285" r="16" fill="#0b7285"/><text x="322" y="292" fill="#fff">🎣</text></svg>`,
    legend:['沖桟橋と新護岸を別表示','混雑時は釣り方制限','当日の施設案内を優先'],officialLabel:'横浜フィッシングピアーズ'
  },
  'daikoku':{
    title:'大黒海づり施設',confidence:'内側／外側の釣り場を反映',
    facts:['内側エリア','外側エリア','管理施設型'],
    note:'釣果情報で使われる「内側」「外側」が直感的に分かるよう、一本の桟橋の両面として描き分け。',
    svg:`<svg viewBox="0 0 820 360"><rect width="820" height="360" rx="28" fill="#d8eef2"/><rect x="35" y="55" width="220" height="245" rx="18" fill="#ddd7c4"/><rect x="70" y="90" width="150" height="80" rx="14" fill="#fff"/><text x="105" y="138">管理棟</text><path d="M250 180H750" stroke="#fafaf7" stroke-width="78"/><path d="M250 140H750" stroke="#0b7285" stroke-width="7"/><path d="M250 220H750" stroke="#0b7285" stroke-width="7"/><text x="450" y="110">外側</text><text x="450" y="275">内側</text><circle cx="430" cy="145" r="16" fill="#0b7285"/><text x="422" y="152" fill="#fff">🎣</text><circle cx="600" cy="215" r="16" fill="#0b7285"/><text x="592" y="222" fill="#fff">🎣</text></svg>`,
    legend:['上側＝外側','下側＝内側','混雑・風向きで釣り方ルールを確認'],officialLabel:'横浜フィッシングピアーズ'
  },
  'isogo':{
    title:'磯子海づり施設',confidence:'中央桟橋＋南桟橋を反映',
    facts:['中央桟橋','南桟橋','アジ回遊実績'],
    note:'公式釣果情報で使われる中央桟橋・南桟橋を分けて表示。施設工事等で一部釣り不可になる場合は当日情報を優先。',
    svg:`<svg viewBox="0 0 820 360"><rect width="820" height="360" rx="28" fill="#d8eef2"/><rect x="35" y="50" width="210" height="260" rx="18" fill="#ddd7c4"/><rect x="75" y="85" width="130" height="75" rx="14" fill="#fff"/><text x="102" y="130">管理棟</text><path d="M245 145H700" stroke="#fafaf7" stroke-width="62"/><path d="M245 260H635" stroke="#fafaf7" stroke-width="62"/><path d="M245 145H700" stroke="#0b7285" stroke-width="7"/><path d="M245 260H635" stroke="#0b7285" stroke-width="7"/><text x="400" y="112">中央桟橋</text><text x="390" y="315">南桟橋</text><circle cx="480" cy="145" r="16" fill="#0b7285"/><text x="472" y="152" fill="#fff">🎣</text><circle cx="440" cy="260" r="16" fill="#0b7285"/><text x="432" y="267" fill="#fff">🎣</text></svg>`,
    legend:['中央桟橋・南桟橋を別表示','工事区画は当日確認','管理施設ルールを優先'],officialLabel:'横浜フィッシングピアーズ'
  },
  'umibetsuri':{
    title:'海辺つり公園',confidence:'約500m海釣り広場を反映',
    facts:['海釣り広場 約500m','5:00〜22:00','駐車場95台・24時間'],
    note:'横須賀市公式の約500mある海釣り広場を長い水際として表示。混雑時は竿1本。',
    svg:`<svg viewBox="0 0 820 360"><rect width="820" height="360" rx="28" fill="#d8eef2"/><path d="M0 0H820V95H0Z" fill="#ddd7c4"/><rect x="55" y="20" width="180" height="55" rx="12" fill="#fff"/><text x="82" y="54">駐車場 95台</text><path d="M45 125H785" stroke="#e7dfc9" stroke-width="76"/><path d="M45 155H785" stroke="#0b7285" stroke-width="8"/><path d="M75 128H755" stroke="#f4b942" stroke-width="12"/><text x="325" y="215">海釣り広場 約500m</text><circle cx="250" cy="149" r="16" fill="#0b7285"/><text x="242" y="156" fill="#fff">🎣</text><circle cx="470" cy="149" r="16" fill="#0b7285"/><text x="462" y="156" fill="#fff">🎣</text><circle cx="680" cy="149" r="16" fill="#0b7285"/><text x="672" y="156" fill="#fff">🎣</text></svg>`,
    legend:['黄色＝約500mの釣り広場','混雑時は竿1本','開園5:00〜22:00'],officialLabel:'横須賀市公式'
  },
  'kashima':{
    title:'鹿島港魚釣園',confidence:'安全柵・休憩所のある管理施設を反映',
    facts:['転落防止柵','トイレ・休憩所','レンタル竿・仕掛け・えさ'],
    note:'管理施設から伸びる釣り場と安全柵を模式化。ライフジャケット着用・同意書記入が必要。',
    svg:`<svg viewBox="0 0 820 360"><rect width="820" height="360" rx="28" fill="#d8eef2"/><rect x="35" y="45" width="230" height="270" rx="18" fill="#ddd7c4"/><rect x="70" y="78" width="160" height="105" rx="14" fill="#fff"/><text x="98" y="118">管理棟</text><text x="98" y="145">休憩所・トイレ</text><path d="M260 185H755" stroke="#fafaf7" stroke-width="78"/><path d="M260 145H755" stroke="#0b7285" stroke-width="7"/><path d="M260 225H755" stroke="#0b7285" stroke-width="7"/><path d="M275 145H735" stroke="#f4b942" stroke-width="8" stroke-dasharray="10 7"/><text x="410" y="115">安全柵</text><circle cx="430" cy="180" r="16" fill="#0b7285"/><text x="422" y="187" fill="#fff">🎣</text><circle cx="610" cy="180" r="16" fill="#0b7285"/><text x="602" y="187" fill="#fff">🎣</text></svg>`,
    legend:['管理棟から入園','安全柵あり','ライフジャケット必須'],officialLabel:'鹿嶋市公式'
  },
  'umikaze':{title:'うみかぜ公園',confidence:'公式確認済み・位置関係模式図',facts:['VERIFIED釣り場','神奈川エリア','精密図ではなく現地把握用'],note:'この図は公式確認済みの釣り場を把握しやすくするMFL模式図。正確な釣り可能範囲・立入規制は現地掲示と公式情報を優先。',svg:`<svg viewBox="0 0 820 360"><rect width="820" height="360" rx="28" fill="#d9eef2"/><path d="M0 0H820V100H0Z" fill="#ddd7c4"/><path d="M55 130H765" stroke="#e7dfc9" stroke-width="74"/><path d="M55 158H765" stroke="#0b7285" stroke-width="8"/><path d="M85 132H735" stroke="#f4b942" stroke-width="11"/><text x="325" y="215">水辺エリア</text><circle cx="300" cy="152" r="16" fill="#0b7285"/><text x="292" y="159" fill="#fff">🎣</text><circle cx="540" cy="152" r="16" fill="#0b7285"/><text x="532" y="159" fill="#fff">🎣</text></svg>`,legend:['公園・緑道型','黄色＝水辺利用のイメージ','現地掲示・公式情報を最優先'],officialLabel:'MFL VERIFIED'},
  'jonanjima':{title:'城南島海浜公園 みなと広場',confidence:'公式確認済み・位置関係模式図',facts:['VERIFIED釣り場','東京エリア','精密図ではなく現地把握用'],note:'この図は公式確認済みの釣り場を把握しやすくするMFL模式図。正確な釣り可能範囲・立入規制は現地掲示と公式情報を優先。',svg:`<svg viewBox="0 0 820 360"><rect width="820" height="360" rx="28" fill="#d9eef2"/><path d="M0 0H820V100H0Z" fill="#ddd7c4"/><path d="M55 130H765" stroke="#e7dfc9" stroke-width="74"/><path d="M55 158H765" stroke="#0b7285" stroke-width="8"/><path d="M85 132H735" stroke="#f4b942" stroke-width="11"/><text x="325" y="215">水辺エリア</text><circle cx="300" cy="152" r="16" fill="#0b7285"/><text x="292" y="159" fill="#fff">🎣</text><circle cx="540" cy="152" r="16" fill="#0b7285"/><text x="532" y="159" fill="#fff">🎣</text></svg>`,legend:['公園・緑道型','黄色＝水辺利用のイメージ','現地掲示・公式情報を最優先'],officialLabel:'MFL VERIFIED'},
  'futtsu_area':{title:'富津地区（市公式案内エリア）',confidence:'公式確認済み・位置関係模式図',facts:['VERIFIED釣り場','千葉エリア','精密図ではなく現地把握用'],note:'この図は公式確認済みの釣り場を把握しやすくするMFL模式図。正確な釣り可能範囲・立入規制は現地掲示と公式情報を優先。',svg:`<svg viewBox="0 0 820 360"><rect width="820" height="360" rx="28" fill="#d8eef2"/><path d="M0 0H820V110H0Z" fill="#ddd7c4"/><path d="M60 135H760" stroke="#e7dfc9" stroke-width="78"/><path d="M60 165H760" stroke="#0b7285" stroke-width="8"/><path d="M90 138H730" stroke="#f4b942" stroke-width="11"/><text x="330" y="225">海側</text><circle cx="350" cy="158" r="16" fill="#0b7285"/><text x="342" y="165" fill="#fff">🎣</text><circle cx="570" cy="158" r="16" fill="#0b7285"/><text x="562" y="165" fill="#fff">🎣</text></svg>`,legend:['護岸・水辺型','黄色＝水辺利用のイメージ','現地掲示・公式情報を最優先'],officialLabel:'MFL VERIFIED'},
  'edogawa_hosuiro':{title:'江戸川放水路（妙典周辺）',confidence:'公式確認済み・位置関係模式図',facts:['VERIFIED釣り場','千葉エリア','精密図ではなく現地把握用'],note:'この図は公式確認済みの釣り場を把握しやすくするMFL模式図。正確な釣り可能範囲・立入規制は現地掲示と公式情報を優先。',svg:`<svg viewBox="0 0 820 360"><rect width="820" height="360" rx="28" fill="#d8eef2"/><path d="M0 0H820V110H0Z" fill="#ddd7c4"/><path d="M60 135H760" stroke="#e7dfc9" stroke-width="78"/><path d="M60 165H760" stroke="#0b7285" stroke-width="8"/><path d="M90 138H730" stroke="#f4b942" stroke-width="11"/><text x="330" y="225">海側</text><circle cx="350" cy="158" r="16" fill="#0b7285"/><text x="342" y="165" fill="#fff">🎣</text><circle cx="570" cy="158" r="16" fill="#0b7285"/><text x="562" y="165" fill="#fff">🎣</text></svg>`,legend:['護岸・水辺型','黄色＝水辺利用のイメージ','現地掲示・公式情報を最優先'],officialLabel:'MFL VERIFIED'},
  'shinsakon':{title:'新左近川親水公園',confidence:'公式確認済み・位置関係模式図',facts:['VERIFIED釣り場','東京エリア','精密図ではなく現地把握用'],note:'この図は公式確認済みの釣り場を把握しやすくするMFL模式図。正確な釣り可能範囲・立入規制は現地掲示と公式情報を優先。',svg:`<svg viewBox="0 0 820 360"><rect width="820" height="360" rx="28" fill="#d9eef2"/><path d="M0 0H820V100H0Z" fill="#ddd7c4"/><path d="M55 130H765" stroke="#e7dfc9" stroke-width="74"/><path d="M55 158H765" stroke="#0b7285" stroke-width="8"/><path d="M85 132H735" stroke="#f4b942" stroke-width="11"/><text x="325" y="215">水辺エリア</text><circle cx="300" cy="152" r="16" fill="#0b7285"/><text x="292" y="159" fill="#fff">🎣</text><circle cx="540" cy="152" r="16" fill="#0b7285"/><text x="532" y="159" fill="#fff">🎣</text></svg>`,legend:['公園・緑道型','黄色＝水辺利用のイメージ','現地掲示・公式情報を最優先'],officialLabel:'MFL VERIFIED'},
  'kawarago':{title:'河原子海岸',confidence:'公式確認済み・位置関係模式図',facts:['VERIFIED釣り場','茨城エリア','精密図ではなく現地把握用'],note:'この図は公式確認済みの釣り場を把握しやすくするMFL模式図。正確な釣り可能範囲・立入規制は現地掲示と公式情報を優先。',svg:`<svg viewBox="0 0 820 360"><rect width="820" height="360" rx="28" fill="#d8eef2"/><path d="M0 0H820V110H0Z" fill="#ddd7c4"/><path d="M60 135H760" stroke="#e7dfc9" stroke-width="78"/><path d="M60 165H760" stroke="#0b7285" stroke-width="8"/><path d="M90 138H730" stroke="#f4b942" stroke-width="11"/><text x="330" y="225">海側</text><circle cx="350" cy="158" r="16" fill="#0b7285"/><text x="342" y="165" fill="#fff">🎣</text><circle cx="570" cy="158" r="16" fill="#0b7285"/><text x="562" y="165" fill="#fff">🎣</text></svg>`,legend:['護岸・水辺型','黄色＝水辺利用のイメージ','現地掲示・公式情報を最優先'],officialLabel:'MFL VERIFIED'},
  'hiraiso':{title:'平磯周辺の岩場',confidence:'公式確認済み・位置関係模式図',facts:['VERIFIED釣り場','茨城エリア','細部は現地確認'],note:'現地把握用のMFL模式図です。正確な釣り可能範囲・入口・立入規制は現地掲示と公式情報を優先。',beginner:'まずは入口や管理施設に近い安全な場所から。無理に先端や混雑部へ入らない。',methods:['足元','軽い仕掛け','周囲優先'],svg:`<svg viewBox="0 0 820 360"><rect width="820" height="360" rx="28" fill="#d8eef2"/><path d="M0 0H820V110H0Z" fill="#ddd7c4"/><path d="M60 135H760" stroke="#e7dfc9" stroke-width="78"/><path d="M60 165H760" stroke="#0b7285" stroke-width="8"/><path d="M90 138H730" stroke="#46a56a" stroke-width="11"/><text x="330" y="225">海側</text><circle cx="350" cy="158" r="16" fill="#0b7285"/><text x="342" y="165" fill="#fff">🎣</text><circle cx="570" cy="158" r="16" fill="#0b7285"/><text x="562" y="165" fill="#fff">🎣</text><path d="M690 270H770" stroke="#d94c4c" stroke-width="9" stroke-dasharray="14 10"/><text x="635" y="310">規制確認</text></svg>`,legend:['護岸・水辺型','緑＝釣り可能側の目安','赤＝禁止・要確認','青＝水際'],officialLabel:'MFL VERIFIED'},
  'odaiba':{title:'お台場海浜公園 釣り可能エリア',confidence:'公式確認済み・位置関係模式図',facts:['VERIFIED釣り場','東京エリア','細部は現地確認'],note:'現地把握用のMFL模式図です。正確な釣り可能範囲・入口・立入規制は現地掲示と公式情報を優先。',beginner:'まずは入口や管理施設に近い安全な場所から。無理に先端や混雑部へ入らない。',methods:['足元','軽い仕掛け','周囲優先'],svg:`<svg viewBox="0 0 820 360"><rect width="820" height="360" rx="28" fill="#d9eef2"/><path d="M0 0H820V100H0Z" fill="#ddd7c4"/><path d="M55 130H765" stroke="#e8dfc9" stroke-width="74"/><path d="M55 158H765" stroke="#0b7285" stroke-width="8"/><path d="M85 132H735" stroke="#46a56a" stroke-width="12"/><text x="315" y="220">水辺エリア</text><circle cx="300" cy="152" r="16" fill="#0b7285"/><text x="292" y="159" fill="#fff">🎣</text><circle cx="540" cy="152" r="16" fill="#0b7285"/><text x="532" y="159" fill="#fff">🎣</text><path d="M665 245H760" stroke="#d94c4c" stroke-width="9" stroke-dasharray="14 10"/><text x="610" y="285">現地規制確認</text></svg>`,legend:['公園・水辺型','緑＝釣り可能側の目安','赤＝禁止・要確認','青＝水際'],officialLabel:'MFL VERIFIED'},
  'mizunohiroba':{title:'水の広場公園 釣り可能エリア',confidence:'公式確認済み・位置関係模式図',facts:['VERIFIED釣り場','東京エリア','細部は現地確認'],note:'現地把握用のMFL模式図です。正確な釣り可能範囲・入口・立入規制は現地掲示と公式情報を優先。',beginner:'まずは入口や管理施設に近い安全な場所から。無理に先端や混雑部へ入らない。',methods:['足元','軽い仕掛け','周囲優先'],svg:`<svg viewBox="0 0 820 360"><rect width="820" height="360" rx="28" fill="#d9eef2"/><path d="M0 0H820V100H0Z" fill="#ddd7c4"/><path d="M55 130H765" stroke="#e8dfc9" stroke-width="74"/><path d="M55 158H765" stroke="#0b7285" stroke-width="8"/><path d="M85 132H735" stroke="#46a56a" stroke-width="12"/><text x="315" y="220">水辺エリア</text><circle cx="300" cy="152" r="16" fill="#0b7285"/><text x="292" y="159" fill="#fff">🎣</text><circle cx="540" cy="152" r="16" fill="#0b7285"/><text x="532" y="159" fill="#fff">🎣</text><path d="M665 245H760" stroke="#d94c4c" stroke-width="9" stroke-dasharray="14 10"/><text x="610" y="285">現地規制確認</text></svg>`,legend:['公園・水辺型','緑＝釣り可能側の目安','赤＝禁止・要確認','青＝水際'],officialLabel:'MFL VERIFIED'},
  'shinkiba':{title:'新木場公園 釣り可能エリア',confidence:'公式確認済み・位置関係模式図',facts:['VERIFIED釣り場','東京エリア','細部は現地確認'],note:'現地把握用のMFL模式図です。正確な釣り可能範囲・入口・立入規制は現地掲示と公式情報を優先。',beginner:'まずは入口や管理施設に近い安全な場所から。無理に先端や混雑部へ入らない。',methods:['足元','軽い仕掛け','周囲優先'],svg:`<svg viewBox="0 0 820 360"><rect width="820" height="360" rx="28" fill="#d9eef2"/><path d="M0 0H820V100H0Z" fill="#ddd7c4"/><path d="M55 130H765" stroke="#e8dfc9" stroke-width="74"/><path d="M55 158H765" stroke="#0b7285" stroke-width="8"/><path d="M85 132H735" stroke="#46a56a" stroke-width="12"/><text x="315" y="220">水辺エリア</text><circle cx="300" cy="152" r="16" fill="#0b7285"/><text x="292" y="159" fill="#fff">🎣</text><circle cx="540" cy="152" r="16" fill="#0b7285"/><text x="532" y="159" fill="#fff">🎣</text><path d="M665 245H760" stroke="#d94c4c" stroke-width="9" stroke-dasharray="14 10"/><text x="610" y="285">現地規制確認</text></svg>`,legend:['公園・水辺型','緑＝釣り可能側の目安','赤＝禁止・要確認','青＝水際'],officialLabel:'MFL VERIFIED'},
  'yumenoshima':{title:'夢の島緑道公園 釣り可能エリア',confidence:'公式確認済み・位置関係模式図',facts:['VERIFIED釣り場','東京エリア','細部は現地確認'],note:'現地把握用のMFL模式図です。正確な釣り可能範囲・入口・立入規制は現地掲示と公式情報を優先。',beginner:'まずは入口や管理施設に近い安全な場所から。無理に先端や混雑部へ入らない。',methods:['足元','軽い仕掛け','周囲優先'],svg:`<svg viewBox="0 0 820 360"><rect width="820" height="360" rx="28" fill="#d9eef2"/><path d="M0 0H820V100H0Z" fill="#ddd7c4"/><path d="M55 130H765" stroke="#e8dfc9" stroke-width="74"/><path d="M55 158H765" stroke="#0b7285" stroke-width="8"/><path d="M85 132H735" stroke="#46a56a" stroke-width="12"/><text x="315" y="220">水辺エリア</text><circle cx="300" cy="152" r="16" fill="#0b7285"/><text x="292" y="159" fill="#fff">🎣</text><circle cx="540" cy="152" r="16" fill="#0b7285"/><text x="532" y="159" fill="#fff">🎣</text><path d="M665 245H760" stroke="#d94c4c" stroke-width="9" stroke-dasharray="14 10"/><text x="610" y="285">現地規制確認</text></svg>`,legend:['公園・水辺型','緑＝釣り可能側の目安','赤＝禁止・要確認','青＝水際'],officialLabel:'MFL VERIFIED'}
};

function countSiteMaps(){return Object.keys(seawallMapData).length;}
function seawallMapFor(s){
  const d=seawallMapData[s.id]; if(!d)return '';
  const beginner=d.beginner||'まずは入口や管理施設に近い、足場が分かりやすい場所から。無理に先端や混雑部へ入らない。';
  const methods=d.methods||['足元','サビキ・軽い仕掛け','周囲優先'];
  return `<section class="seawall-card site-specific" data-seawall-card="${s.id}">
    <div class="seawall-head"><div><small>🗺️ MFL SITE MAP</small><h4>${d.title}</h4></div><span>${d.officialLabel}</span></div>
    <div class="map-confidence">${d.confidence}</div><div class="map-simple-note">地図は「場所・釣り可能側・禁止側」の確認を中心に表示します。</div>
    <div class="map-fact-row">${d.facts.map(x=>`<span>${x}</span>`).join('')}</div>
    <button class="seawall-map-open" data-open-map="${s.id}"><div class="seawall-svg">${d.svg}</div><span>🔍 地図を大きく見る</span></button>
    <div class="map-unified-legend"><span><i class="legend-ok"></i>釣りOK目安</span><span><i class="legend-ng"></i>禁止・入らない</span><span><i class="legend-warn"></i>注意・要確認</span><span><i class="legend-water"></i>海・運河</span></div>
    <p>${d.note}</p><div class="seawall-warning">⚠️ 測量図ではありません。現地掲示・立入規制・管理者の最新案内を最優先してください。</div>
  </section>`;
}


const tideStationMap={
  TK:{name:'東京',jma:'https://www.data.jma.go.jp/kaiyou/db/tide/suisan/suisan.php?stn=TK'},
  CB:{name:'千葉港',jma:'https://www.data.jma.go.jp/kaiyou/db/tide/suisan/suisan.php?stn=CB'},
  TT:{name:'館山',jma:'https://www.data.jma.go.jp/kaiyou/db/tide/suisan/suisan.php?stn=TT'},
  QS:{name:'横浜',jma:'https://www.data.jma.go.jp/kaiyou/db/tide/suisan/suisan.php?stn=QS'},
  D2:{name:'鹿島',jma:'https://www.data.jma.go.jp/kaiyou/db/tide/suisan/suisan.php?stn=D2'},
  D3:{name:'大洗',jma:'https://www.data.jma.go.jp/kaiyou/db/tide/suisan/suisan.php?stn=D3'}
};
let mflTideData=null;

function tideStationForSpot(s){
  if(s.pref==='東京') return 'TK';
  if(s.pref==='千葉'){
    if(/館山/.test(s.name)) return 'TT';
    return 'CB';
  }
  if(s.pref==='神奈川') return 'QS';
  if(s.pref==='茨城'){
    if(/鹿島/.test(s.name)) return 'D2';
    return 'D3';
  }
  return null;
}
function todayJst(){
  const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
  const o=Object.fromEntries(parts.map(x=>[x.type,x.value]));
  return `${o.year}-${o.month}-${o.day}`;
}
function nowHourJst(){
  return Number(new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Tokyo',hour:'2-digit',hourCycle:'h23'}).format(new Date()));
}
function tideTrend(day,hour){
  const h=day?.hourly||[];
  if(h.length<24)return {label:'不明',symbol:'→'};
  const a=h[Math.max(0,hour-1)],b=h[Math.min(23,hour+1)];
  if(a==null||b==null)return {label:'不明',symbol:'→'};
  const d=b-a;
  if(d>5)return {label:'上げ潮',symbol:'↗'};
  if(d<-5)return {label:'下げ潮',symbol:'↘'};
  return {label:'潮止まり付近',symbol:'→'};
}
function tideSparkline(hourly){
  const vals=hourly.filter(v=>v!=null); if(vals.length<2)return '';
  const min=Math.min(...vals),max=Math.max(...vals),range=Math.max(1,max-min);
  const pts=hourly.map((v,i)=>v==null?null:[10+i*(300/23),86-(v-min)/range*66]).filter(Boolean);
  return `<svg viewBox="0 0 320 100" class="tide-chart" aria-label="24時間潮位グラフ">
    <line x1="10" y1="86" x2="310" y2="86" stroke="#cfe0e3" stroke-width="1"/>
    <polyline points="${pts.map(p=>p.join(',')).join(' ')}" fill="none" stroke="#0b7285" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>
    <text x="10" y="98">0時</text><text x="284" y="98">23時</text>
  </svg>`;
}
function tideEventsHtml(events,kind){
  if(!events?.length)return `<span class="tide-none">${kind}なし</span>`;
  return events.slice(0,2).map(x=>`<div><b>${x.time}</b><span>${x.level}cm</span></div>`).join('');
}
async function ensureTideData(){
  if(mflTideData)return mflTideData;
  try{
    const r=await fetch('./data/tides-2026.json',{cache:'force-cache'});
    if(!r.ok)throw new Error('tide data');
    mflTideData=await r.json(); return mflTideData;
  }catch(e){return null}
}
function tideCardShell(s){
  const st=tideStationForSpot(s); if(!st)return '';
  return `<section class="tide-card" data-tide-card="${s.id}">
    <div class="tide-head"><div><small>🌊 MFL TIDE ASSIST</small><h4>潮の状況</h4></div><span>基準地点：${tideStationMap[st].name}</span></div>
    <div class="tide-loading">潮位データを読み込み中…</div>
  </section>`;
}
async function hydrateTideCard(s){
  const root=document.querySelector(`[data-tide-card="${s.id}"]`); if(!root)return;
  const code=tideStationForSpot(s), data=await ensureTideData();
  if(!data||!code){root.querySelector('.tide-loading').textContent='潮位データを読み込めませんでした。';return}
  const date=todayJst(),day=data.stations?.[code]?.days?.[date];
  if(!day){root.querySelector('.tide-loading').innerHTML=`2026年以外の日付はまだMFL内蔵データ対象外です。 <a href="${tideStationMap[code].jma}" target="_blank" rel="noopener">気象庁で確認</a>`;return}
  const hour=nowHourJst(),trend=tideTrend(day,hour),nowLevel=day.hourly?.[hour];
  root.innerHTML=`<div class="tide-head"><div><small>🌊 MFL TIDE ASSIST</small><h4>${date.replaceAll('-','/')} の潮</h4></div><span>基準：${tideStationMap[code].name}</span></div>
    <div class="tide-now"><span class="tide-arrow">${trend.symbol}</span><div><small>現在の目安</small><strong>${trend.label}</strong><em>${nowLevel!=null?`${hour}:00予測 ${nowLevel}cm`:''}</em></div></div>
    ${tideSparkline(day.hourly)}
    <div class="tide-events">
      <section><small>🔵 満潮</small>${tideEventsHtml(day.highs,'満潮')}</section>
      <section><small>🔻 干潮</small>${tideEventsHtml(day.lows,'干潮')}</section>
    </div>
    <div class="tide-actions"><a href="${tideStationMap[code].jma}" target="_blank" rel="noopener">気象庁の潮位表を開く ↗</a></div>
    <p class="tide-note">天文潮位の予測値です。実際の潮位は気圧・風などで変わります。「釣れる／釣れない」の断定には使いません。</p>`;
}


function setupSeawallInteractions(s){
  document.querySelectorAll(`[data-open-map="${s.id}"]`).forEach(btn=>btn.onclick=()=>openSeawallFullscreen(s));
}
function openSeawallFullscreen(s){
  const d=seawallMapData[s.id]; if(!d)return;
  const wrap=document.createElement('div'); wrap.className='map-fullscreen';
  wrap.innerHTML=`<div class="map-fullscreen-sheet"><div class="map-fullscreen-head"><div><small>MFL SITE MAP</small><strong>${d.title}</strong></div><button id="closeMapFullscreen">×</button></div><div class="map-fullscreen-svg">${d.svg}</div><div class="map-unified-legend fullscreen"><span><i class="legend-ok"></i>釣りOK目安</span><span><i class="legend-ng"></i>禁止・入らない</span><span><i class="legend-warn"></i>注意・要確認</span><span><i class="legend-water"></i>海・運河</span></div><p>${d.note}</p><div class="map-readability-tip">🔍 地図は拡大表示推奨。文字や禁止範囲は全画面で確認してください。</div><div class="seawall-warning">⚠️ 現地掲示・立入規制・管理者の最新案内を最優先。</div></div>`;
  document.body.appendChild(wrap); document.body.style.overflow='hidden';
  const close=()=>{wrap.remove();document.body.style.overflow='';};
  wrap.querySelector('#closeMapFullscreen').onclick=close; wrap.onclick=e=>{if(e.target===wrap)close();};
}

function showFishingSpot(id){
  rememberFishingSpot(id);const s=kantoFishingSpots.find(x=>x.id===id),root=document.getElementById('fishingSpotDetail');if(!s||!root)return;document.querySelectorAll('[data-fishing-spot]').forEach(b=>b.classList.toggle('active',b.dataset.fishingSpot===id));root.innerHTML=`<section class="spot-card"><div class="spot-card-head"><span class="spot-pref">${s.pref}</span><div><div class="spot-verify-row"><small class="spot-type">${spotTypeLabel(s.id)}</small><span class="verified-badge">✓ 公式確認</span></div><h3>${s.name}</h3><p>${s.address}</p></div></div><div class="spot-score-grid"><div><small>初心者</small><strong>${stars(s.beginner)}</strong></div><div><small>2人のタックル</small><strong>${s.tackle}</strong></div></div><div class="spot-section"><small>狙える魚の例</small><p>${s.fish}</p></div><div class="spot-section"><small>向いている釣り</small><div class="spot-tags">${s.styles.map(x=>`<span>${x}</span>`).join('')}</div></div><div class="spot-section"><small>設備</small><div class="spot-tags muted">${s.facilities.map(x=>`<span>${x}</span>`).join('')}</div></div><div class="spot-gear-note"><strong>🎣 2人のタックル目線</strong><p>${s.gear}</p></div><div class="spot-warning"><strong>⚠️ 現地ルール</strong><p>${s.note}</p></div>${tideCardShell(s)}${seawallMapFor(s)}${specialSpotRules(s)}<div class="spot-footer"><span>情報確認：${s.checked}</span><a href="${s.official}" target="_blank" rel="noopener">公式情報を確認 ↗</a></div></section>`
  requestAnimationFrame(()=>{
    const detail=document.getElementById('fishingSpotDetail');
    if(detail) detail.scrollIntoView({behavior:'smooth',block:'start'});
  });

  hydrateTideCard(s);

  setupSeawallInteractions(s);
}


function setupPartsQuickAnswer(){
  const box=document.getElementById('partsQuickAnswer'); if(!box)return;
  const answers={
    jig:['小型スナップ','道糸またはリーダー → 小型スナップ → ジグヘッド。サルカンは基本なくてOK。'],
    casting:['スナップ付きサルカン','道糸 → スナップ付きサルカン → 天秤・仕掛け。交換しやすく、糸ヨレ対策にも。'],
    sabiki:['サルカン / スナップ付きサルカン','市販仕掛けの接続部を確認。仕掛け袋に指定がある場合はその方法を優先。'],
    lure:['小型スナップ','道糸またはリーダー → スナップ → ルアー。交換のたびに結び直さなくて済む。']
  };
  document.querySelectorAll('[data-part-answer]').forEach(btn=>btn.onclick=()=>{
    document.querySelectorAll('[data-part-answer]').forEach(x=>x.classList.remove('active')); btn.classList.add('active');
    const a=answers[btn.dataset.partAnswer]; box.innerHTML=`<small>おすすめ</small><strong>${a[0]}</strong><p>${a[1]}</p>`;
  });
}


const beginnerGlossary=[
  {term:'道糸',cat:'糸',icon:'🧵',short:'リールに巻いてあるメインの糸。',detail:'竿から仕掛けまで力を伝える中心の糸。ナイロン・PE・カーボナイロンなどがあります。'},
  {term:'ハリス',cat:'糸',icon:'🧵',short:'針の近くに使う細い糸。',detail:'魚に見えにくくしたり、根掛かり時に仕掛け全体を失いにくくしたりする役割があります。'},
  {term:'幹糸',cat:'糸',icon:'🧵',short:'複数の針をまとめる仕掛けの中心の糸。',detail:'サビキや投げ釣り仕掛けで、ハリスを枝のようにつなぐ本体側の糸です。'},
  {term:'リーダー',cat:'糸',icon:'🧵',short:'道糸の先に付ける別の糸。',detail:'PEライン使用時の擦れ対策や、ルアー・仕掛けとの接続に使います。'},
  {term:'サルカン',cat:'金具',icon:'🔄',short:'糸ヨレを減らす回転金具。',detail:'道糸と仕掛けの接続に使います。回転するため、仕掛けが回った時の糸ヨレを軽減します。'},
  {term:'スナップ',cat:'金具',icon:'📎',short:'仕掛けを素早く交換する開閉金具。',detail:'ジグヘッドやルアー交換に便利。軽い仕掛けでは小型を選ぶと扱いやすいです。'},
  {term:'スナップ付きサルカン',cat:'金具',icon:'🔗',short:'サルカンとスナップが一体。',detail:'糸ヨレ対策と仕掛け交換の両方ができます。ちょい投げの天秤接続にも便利。'},
  {term:'天秤',cat:'仕掛け',icon:'⚖️',short:'オモリと仕掛けを絡みにくくするパーツ。',detail:'ちょい投げや投げ釣りで使います。仕掛けが道糸へ絡むのを減らします。'},
  {term:'オモリ',cat:'仕掛け',icon:'⬇️',short:'仕掛けを沈めたり飛ばしたりする重り。',detail:'日本では「号」で表すことも多く、1号は約3.75gが目安です。'},
  {term:'ジグヘッド',cat:'ルアー',icon:'🪝',short:'オモリと針が一体になったルアー用の針。',detail:'ワームを付けて使います。重さで飛距離・沈む速さ・底取りのしやすさが変わります。'},
  {term:'ワーム',cat:'ルアー',icon:'🪱',short:'柔らかい素材でできた疑似餌。',detail:'小魚や虫などを模した形が多く、ジグヘッドと組み合わせて使います。'},
  {term:'サビキ',cat:'仕掛け',icon:'🐟',short:'小さな疑似針を複数付けた仕掛け。',detail:'アジ・イワシ・サバなどの回遊魚狙いでよく使います。アミエビを使うことが多いです。'},
  {term:'ちょい投げ',cat:'釣り方',icon:'🎣',short:'近〜中距離へ軽く投げて底を探る釣り。',detail:'キス・ハゼ・メゴチなどを狙いやすく、初心者にも始めやすい釣り方です。'},
  {term:'底を取る',cat:'釣り方',icon:'🌊',short:'仕掛けが海底に着いた状態を確認すること。',detail:'ジグヘッドやちょい投げでは重要。糸の張りや竿先の変化で着底を判断します。'},
  {term:'表層 / 中層 / 底',cat:'釣り方',icon:'📏',short:'魚を狙う水深の位置。',detail:'表層＝水面近く、中層＝水の中間、底＝海底付近。魚種や時間帯で居場所が変わります。'},
  {term:'号数',cat:'サイズ',icon:'🔢',short:'針・糸・オモリなどのサイズ表記。',detail:'同じ「号」でも針・糸・オモリでは意味が違います。商品ごとの用途表示を確認します。'},
  {term:'ドラグ',cat:'リール',icon:'🌀',short:'強く引かれた時に糸を出すリールの機能。',detail:'魚の引きで糸が切れるのを防ぎます。締めすぎ・緩めすぎに注意。'},
  {term:'アイ',cat:'金具',icon:'⭕',short:'糸やスナップを付ける輪。',detail:'ジグヘッド・ルアー・針などに付いている接続部分のことです。'}
];

function setupGlossaryGuide(){
  const input=document.getElementById('glossarySearch');
  const root=document.getElementById('glossaryList');
  const empty=document.getElementById('glossaryEmpty');
  if(!input||!root)return;

  const renderList=(query='')=>{
    const q=query.trim().toLowerCase();
    const rows=beginnerGlossary.filter(x=>!q||`${x.term} ${x.cat} ${x.short} ${x.detail}`.toLowerCase().includes(q));
    root.innerHTML=rows.map((x,i)=>`<details class="glossary-item">
      <summary><span>${x.icon}</span><div><strong>${x.term}</strong><small>${x.cat}｜${x.short}</small></div><b>›</b></summary>
      <div class="glossary-detail">${x.detail}</div>
    </details>`).join('');
    if(empty)empty.hidden=rows.length>0;
  };

  input.oninput=()=>renderList(input.value);
  document.querySelectorAll('[data-glossary-filter]').forEach(btn=>btn.onclick=()=>{
    const val=btn.dataset.glossaryFilter;
    input.value=val==='all'?'':val;
    renderList(input.value);
    document.querySelectorAll('[data-glossary-filter]').forEach(x=>x.classList.toggle('active',x===btn));
  });
  renderList();
}


function guideBackButtonHTML(){
  return `<button class="guide-back-top" id="guideBackTop">← 手引き一覧へ戻る</button>`;
}
function setupGuideBackTop(){
  const btn=document.getElementById('guideBackTop');
  if(!btn)return;
  btn.onclick=()=>renderGuide();
}

function renderGuideSection(section) {
  const root=document.getElementById('guideContent'); if(!root) return;
  if(section==='kanto'){root.innerHTML=renderKantoMap();setupKantoMap();}
  if(section==='pier') root.innerHTML=`
    <article class="guide-article"><div class="guide-article-title"><span>🗺️</span><div><small>PIER BASICS</small><h3>堤防の見方</h3></div></div>
    <div class="pier-map"><div class="pier-land">陸側</div><div class="pier-wall">堤防</div><div class="pier-water"><span class="pier-point p1">① 足元</span><span class="pier-point p2">② 船道</span><span class="pier-point p3">③ 潮の流れ</span><span class="pier-point p4">④ 明暗・影</span></div></div>
    <div class="guide-tip-list"><div><b>① 足元</b><p>カサゴなど根魚が着きやすい。壁際をゆっくり探る。</p></div><div><b>② 船道</b><p>少し深くなっていることが多い。遠投前に周囲を確認。</p></div><div><b>③ 潮が動く場所</b><p>魚が回ってくることがある。水面の流れやゴミの動きを観察。</p></div><div><b>④ 明暗・影</b><p>橋脚や常夜灯の影など、光の境目に魚が付くことがある。</p></div></div>
    <div class="guide-warning"><strong>⚠️ 安全優先</strong><p>立入禁止・作業区域・船の出入りを最優先で避ける。濡れた足場やテトラへ無理に入らない。</p></div></article>`;
  if(section==='knots') root.innerHTML=`
    <article class="guide-article">
      <div class="guide-article-title"><span>🧵</span><div><small>KNOTS</small><h3>糸の結び方</h3></div></div>
      <div class="wife-art-notice"><span>🎨</span><div><strong>MFLオリジナル図解</strong><p>ユニノット・クリンチノット・電車結びを、手描き挿絵でSTEPごとに追えるようになりました。</p></div></div>

      <details class="guide-step" open>
        <summary><strong>ユニノット</strong><small>ルアー・スナップ・サルカンに</small><b>›</b></summary>
        <div class="knot-art-guide">${['金具の輪に糸を通し、先端を折り返して大きな輪を作る。','先端を輪の中へ通す。','本線と折り返した糸をまとめて4〜6回巻く。','先端側をゆっくり引いて結び目を作る。','糸を湿らせ、本線を引いて結び目を金具側へ寄せる。','余り糸を少し残して切って完成。'].map((text,i)=>`<div class="knot-art-step"><div class="knot-step-head"><span class="knot-step-number">${i+1}</span><em class="knot-step-word">STEP ${i+1}</em><strong>${text}</strong></div><img src="assets/knots/uni-0${i+1}.png" alt="ユニノット STEP ${i+1}" loading="lazy"></div>`).join('')}</div>
      </details>

      <details class="guide-step">
        <summary><strong>クリンチノット</strong><small>小型の金具・針・スナップに</small><b>›</b></summary>
        <div class="knot-art-guide">${[
          '金具の輪に糸を通し、本線へ4〜6回ほど巻き付ける。',
          '先端を金具側にできた小さな輪へ戻す。',
          'さらにできた大きな輪へ先端を通す。',
          '糸を湿らせ、本線と先端側をゆっくり引いて締める。',
          '結び目を金具側まで寄せ、余り糸を少し残して切って完成。'
        ].map((text,i)=>`<div class="knot-art-step"><div class="knot-step-head"><span class="knot-step-number">${i+1}</span><em class="knot-step-word">STEP ${i+1}</em><strong>${text}</strong></div><img src="assets/knots/clinch-0${i+1}.png" alt="クリンチノット STEP ${i+1}" loading="lazy"></div>`).join('')}</div>
      </details>

      <details class="guide-step">
        <summary><strong>電車結び</strong><small>ナイロン・フロロ同士の接続に</small><b>›</b></summary>
        <div class="knot-art-guide">${['2本の糸を互い違いに重ねる。','片方の糸で輪を作り、相手の糸へ4〜5回巻く。','反対側も同じように結び目を作る。','両方の本線をゆっくり引き、2つの結び目を寄せる。','結び目同士を密着させて完成。余り糸は適度に残して切る。'].map((text,i)=>`<div class="knot-art-step"><div class="knot-step-head"><span class="knot-step-number">${i+1}</span><em class="knot-step-word">STEP ${i+1}</em><strong>${text}</strong></div><img src="assets/knots/train-0${i+1}.png" alt="電車結び STEP ${i+1}" loading="lazy"></div>`).join('')}</div>
      </details>

      <div class="guide-warning"><strong>結び終わったら</strong><p>必ず手で引っ張って強度確認。滑る・ほどけるなら使わず結び直す。</p></div>
    </article>`;

  
  if(section==='glossary') root.innerHTML=`
    <article class="guide-article glossary-guide">
      <div class="guide-article-title"><span>📚</span><div><small>BEGINNER GLOSSARY</small><h3>釣り用語ミニ辞典</h3></div></div>
      <div class="glossary-intro"><strong>分からない言葉はその場で調べる</strong><p>最初から全部覚えなくてOK。釣具の説明や仕掛け袋で見かけた言葉を検索できます。</p></div>
      <div class="glossary-search-wrap"><span>🔎</span><input id="glossarySearch" type="search" placeholder="例：ハリス、天秤、ジグヘッド"></div>
      <div class="glossary-filters">
        <button class="active" data-glossary-filter="all">全部</button>
        <button data-glossary-filter="糸">糸</button>
        <button data-glossary-filter="金具">金具</button>
        <button data-glossary-filter="仕掛け">仕掛け</button>
        <button data-glossary-filter="釣り方">釣り方</button>
        <button data-glossary-filter="ルアー">ルアー</button>
      </div>
      <div id="glossaryList" class="glossary-list"></div>
      <div id="glossaryEmpty" class="glossary-empty" hidden>その言葉はまだ登録されていません。</div>
      <div class="guide-warning"><strong>💡 用語は少しずつ追加</strong><p>実際に「これ何？」となった言葉をMFLに追加していく前提です。</p></div>
    </article>`;
  if(section==='glossary') setupGlossaryGuide();


  
  
  
  
  if(section==='rules') root.innerHTML=`
    <article class="guide-article rules-guide">
      <div class="guide-article-title"><span>🚧</span><div><small>LOCAL RULES</small><h3>現地ルールの見方</h3></div></div>

      <div class="rules-intro">
        <strong>「釣れる場所」より先に「入っていい場所」</strong>
        <p>MFLの地図も最終判断は現地掲示と管理者の最新案内を優先します。</p>
      </div>

      <section class="rules-cards">
        <div class="rules-card danger">
          <span>⛔</span><div><strong>立入禁止</strong><p>防波堤・作業区域・柵の先など。釣果情報があっても入らない。</p></div>
        </div>
        <div class="rules-card warning">
          <span>⚠️</span><div><strong>釣り方の制限</strong><p>投げ釣り禁止、ルアー禁止、竿の本数制限など。施設ごとに違います。</p></div>
        </div>
        <div class="rules-card info">
          <span>🕒</span><div><strong>営業時間・入場制限</strong><p>管理釣り施設は開場時間、定員、料金、休園日を確認。</p></div>
        </div>
        <div class="rules-card info">
          <span>🦺</span><div><strong>安全装備</strong><p>ライフジャケット必須の施設もあります。子ども用規定が別の場合も。</p></div>
        </div>
        <div class="rules-card warning">
          <span>🪣</span><div><strong>コマセ・エサの制限</strong><p>カゴ使用のみ、撒き餌禁止などのルールがある場所もあります。</p></div>
        </div>
        <div class="rules-card danger">
          <span>🚢</span><div><strong>船・漁業作業を最優先</strong><p>港は釣り場ではなく作業場所でもあります。船の出入りや漁具を邪魔しない。</p></div>
        </div>
      </section>

      <section class="rules-order">
        <strong>現地で見る順番</strong>
        <div><span>1</span><b>入口の看板</b><small>禁止・営業時間・料金</small></div>
        <div><span>2</span><b>柵・ロープ・カラーコーン</b><small>越えない</small></div>
        <div><span>3</span><b>釣り方の掲示</b><small>投げ方・竿数・コマセ</small></div>
        <div><span>4</span><b>管理者の案内</b><small>その日の規制を最優先</small></div>
      </section>

      <div class="guide-warning">
        <strong>⚠️ ネット情報より現地の最新表示</strong>
        <p>以前は釣れた場所でも、工事・事故・管理変更で立入禁止になることがあります。</p>
      </div>
    </article>`;
if(section==='lines') root.innerHTML=`
    <article class="guide-article line-guide">
      <div class="guide-article-title"><span>🧵</span><div><small>FISHING LINE</small><h3>ラインの種類と違い</h3></div></div>

      <div class="line-intro">
        <strong>最初は「扱いやすさ」で選んでOK</strong>
        <p>飛距離・感度・擦れへの強さなど、それぞれ得意分野があります。</p>
      </div>

      <section class="line-type-card">
        <div class="line-type-head"><span>🟦</span><div><small>NYLON</small><h4>ナイロン</h4></div><b>初心者向け</b></div>
        <p>しなやかで扱いやすく、結びやすい。伸びがあるので魚の引きを吸収しやすい。</p>
        <div class="line-bars"><span><b>扱いやすさ</b><i style="width:95%"></i></span><span><b>感度</b><i style="width:55%"></i></span><span><b>擦れ耐性</b><i style="width:65%"></i></span></div>
      </section>

      <section class="line-type-card">
        <div class="line-type-head"><span>⬜</span><div><small>FLUOROCARBON</small><h4>フロロカーボン</h4></div><b>擦れに強い</b></div>
        <p>根や堤防際など、擦れが気になる場所に強い。硬めで、リーダーやハリスにもよく使われます。</p>
        <div class="line-bars"><span><b>扱いやすさ</b><i style="width:65%"></i></span><span><b>感度</b><i style="width:75%"></i></span><span><b>擦れ耐性</b><i style="width:90%"></i></span></div>
      </section>

      <section class="line-type-card">
        <div class="line-type-head"><span>🟨</span><div><small>PE</small><h4>PEライン</h4></div><b>高感度</b></div>
        <p>細くても強く、伸びが少ないため感度と飛距離に優れる。ただし擦れに弱く、基本的にリーダーを組み合わせます。</p>
        <div class="line-bars"><span><b>扱いやすさ</b><i style="width:45%"></i></span><span><b>感度</b><i style="width:98%"></i></span><span><b>擦れ耐性</b><i style="width:35%"></i></span></div>
      </section>

      <section class="line-type-card">
        <div class="line-type-head"><span>🟩</span><div><small>CARBON NYLON</small><h4>カーボナイロン</h4></div><b>バランス型</b></div>
        <p>ナイロン系の扱いやすさと、やや高い感度・耐摩耗性を狙ったタイプ。製品ごとに性格が違います。</p>
        <div class="line-bars"><span><b>扱いやすさ</b><i style="width:85%"></i></span><span><b>感度</b><i style="width:65%"></i></span><span><b>擦れ耐性</b><i style="width:70%"></i></span></div>
      </section>

      <section class="line-choose">
        <div class="line-choose-head"><span>🤔</span><strong>迷った時の考え方</strong></div>
        <div><span>まず釣りを始める</span><b>ナイロン / カーボナイロン</b></div>
        <div><span>ルアーの感度・飛距離</span><b>PE＋リーダー</b></div>
        <div><span>根・堤防際の擦れ</span><b>フロロ系を意識</b></div>
      </section>

      <div class="guide-warning">
        <strong>⚠️ 同じ号数でも強度は製品ごとに違う</strong>
        <p>ロッド・リールの適合ライン範囲と、ライン製品の強度表記を確認してください。</p>
      </div>
    </article>`;
if(section==='hooks') root.innerHTML=`
    <article class="guide-article hook-guide">
      <div class="guide-article-title"><span>🪝</span><div><small>HOOK SIZE</small><h3>針の号数の見方</h3></div></div>

      <div class="hook-intro">
        <strong>同じ「6号」でも針の種類で大きさは違う</strong>
        <p>針は「号数だけ」では決めません。キス針・袖針・伊勢尼など、針の種類ごとにサイズ感が違います。</p>
      </div>

      <section class="hook-rule">
        <div><span>①</span><strong>まず針の種類を見る</strong><p>キス針6号と別種類の6号は、同じ大きさとは限りません。</p></div>
        <div><span>②</span><strong>次に号数を見る</strong><p>同じ種類なら、基本的に数字が大きいほど針も大きくなります。</p></div>
        <div><span>③</span><strong>対象魚に合わせる</strong><p>小さい魚に大きすぎる針を使うと掛かりにくくなることがあります。</p></div>
      </section>

      <section class="hook-example">
        <div class="hook-example-head"><span>🎣</span><strong>MFLで今使う目安</strong></div>
        <div><b>6〜7号前後</b><span>キス・ハゼなどのちょい投げ仕掛けでよく見るサイズ帯</span></div>
        <div><b>市販仕掛け</b><span>最初は対象魚がパッケージに書かれた完成仕掛けを選ぶと失敗しにくい</span></div>
      </section>

      <section class="hook-parts">
        <strong>針で見るポイント</strong>
        <div class="hook-parts-grid">
          <span><b>針先</b><small>魚に掛かる先端</small></span>
          <span><b>フトコロ</b><small>針のカーブ部分</small></span>
          <span><b>軸</b><small>針のまっすぐな部分</small></span>
          <span><b>アイ / チモト</b><small>糸を結ぶ部分</small></span>
        </div>
      </section>

      <div class="guide-warning">
        <strong>⚠️ 「号」の意味は部品ごとに違う</strong>
        <p>針6号・糸3号・オモリ5号は、同じ基準ではありません。針は針、糸は糸、オモリはオモリとして確認します。</p>
      </div>
    </article>`;
if(section==='weights') root.innerHTML=`
    <article class="guide-article weight-guide">
      <div class="guide-article-title"><span>⚖️</span><div><small>SINKER WEIGHT</small><h3>オモリ号数の目安</h3></div></div>

      <div class="weight-intro">
        <strong>1号 ≒ 3.75g</strong>
        <p>オモリの「号」は重さの目安。ロッドの適合重量を超えないように確認します。</p>
      </div>

      <section class="weight-table">
        ${[
          [1,'約3.8g'],[2,'約7.5g'],[3,'約11.3g'],[4,'約15g'],
          [5,'約18.8g'],[6,'約22.5g'],[8,'約30g'],[10,'約37.5g'],
          [12,'約45g'],[15,'約56.3g'],[20,'約75g']
        ].map(x=>`<div class="${[5,8].includes(x[0])?'weight-row current':''}">
          <strong>${x[0]}号</strong><span>${x[1]}</span>${x[0]===5?'<b>軽めのちょい投げ</b>':x[0]===8?'<b>しっかり底取り</b>':''}
        </div>`).join('')}
      </section>

      <section class="weight-now">
        <div class="weight-now-head"><span>🎣</span><strong>MFLで今使う目安</strong></div>
        <div><span>5号</span><b>約18.8g</b><small>軽め・初心者でも扱いやすい</small></div>
        <div><span>8号</span><b>約30g</b><small>少し重め・底を取りやすい</small></div>
        <div><span>ジグヘッド 7g</span><b>軽め</b><small>近距離・浅め</small></div>
        <div><span>ジグヘッド 14g</span><b>中間</b><small>飛距離・底取り</small></div>
      </section>

      <div class="guide-warning">
        <strong>⚠️ 竿の上限を優先</strong>
        <p>同じMHやMLでも適合重量は竿ごとに違います。ロッド本体やメーカー表記のLURE / SINKER範囲を確認してください。</p>
      </div>
    </article>`;
if(section==='rigflow') root.innerHTML=`
    <article class="guide-article rigflow-guide">
      <div class="guide-article-title"><span>🧩</span><div><small>RIG CONNECTION</small><h3>仕掛けのつなぎ方</h3></div></div>
      <div class="rigflow-intro">
        <strong>上から順番に見ればOK</strong>
        <p>「何と何をつなぐの？」で迷った時用。まずはこの3パターンを覚えれば十分です。</p>
      </div>

      <details class="rigflow-card" open>
        <summary><span>🎣</span><div><strong>ちょい投げ</strong><small>天秤＋エサ仕掛け</small></div><b>›</b></summary>
        <div class="rigflow-body">
          <div class="rigflow-chain">
            <span>リールの道糸</span><b>↓</b>
            <strong>スナップ付きサルカン</strong><b>↓</b>
            <span>天秤・オモリ</span><b>↓</b>
            <span>投げ釣り仕掛け</span><b>↓</b>
            <em>エサ</em>
          </div>
          <p>仕掛けセットに天秤・オモリまで一体になっている場合は、その商品の接続部へ付ければOK。</p>
        </div>
      </details>

      <details class="rigflow-card">
        <summary><span>🪱</span><div><strong>ジグヘッド＋ワーム</strong><small>7g / 14g</small></div><b>›</b></summary>
        <div class="rigflow-body">
          <div class="rigflow-chain">
            <span>道糸 / リーダー</span><b>↓</b>
            <strong>小型スナップ</strong><b>↓</b>
            <span>ジグヘッド</span><b>↓</b>
            <em>ワーム</em>
          </div>
          <p>スナップ付きサルカンは基本不要。金具を増やさずシンプルにします。</p>
        </div>
      </details>

      <details class="rigflow-card">
        <summary><span>🐟</span><div><strong>サビキ</strong><small>市販仕掛け</small></div><b>›</b></summary>
        <div class="rigflow-body">
          <div class="rigflow-chain">
            <span>リールの道糸</span><b>↓</b>
            <strong>サルカン / スナップサルカン</strong><b>↓</b>
            <span>サビキ仕掛け</span><b>↓</b>
            <span>カゴ</span><b>↓</b>
            <em>オモリ</em>
          </div>
          <p>上カゴ・下カゴなど商品によって順番が違うため、仕掛け袋の図を最優先に確認。</p>
        </div>
      </details>

      <section class="rigflow-check">
        <div><span>①</span><strong>結び目を引っ張る</strong><small>滑らないか確認</small></div>
        <div><span>②</span><strong>スナップを閉じる</strong><small>半開きにしない</small></div>
        <div><span>③</span><strong>針の向きを見る</strong><small>絡み・引っ掛かり確認</small></div>
      </section>

      <div class="guide-warning"><strong>⚠️ 投げる前に1回確認</strong><p>仕掛けを軽く引っ張って、外れそうな部分がないか確認してからキャスト。</p></div>
    </article>`;
if(section==='parts') root.innerHTML=`
    <article class="guide-article parts-guide">
      <div class="guide-article-title"><span>🔗</span><div><small>CONNECTION PARTS</small><h3>サルカン・スナップの違い</h3></div></div>

      <div class="parts-intro">
        <strong>見た目が似ていても役割が違う</strong>
        <p>全部「つなぐ金具」だけど、何につなぐか・何を楽にしたいかで使い分けます。</p>
      </div>
      <section class="parts-quick">
        <div class="parts-quick-head"><span>⚡</span><div><small>QUICK ANSWER</small><strong>何を付ける？</strong></div></div>
        <div class="parts-quick-grid">
          <button data-part-answer="jig"><span>🪱</span><strong>ジグヘッド</strong><small>ワームで釣る</small></button>
          <button data-part-answer="casting"><span>🎣</span><strong>ちょい投げ</strong><small>天秤・仕掛け</small></button>
          <button data-part-answer="sabiki"><span>🐟</span><strong>サビキ</strong><small>仕掛けを接続</small></button>
          <button data-part-answer="lure"><span>✨</span><strong>ルアー</strong><small>交換を楽に</small></button>
        </div>
        <div id="partsQuickAnswer" class="parts-quick-answer"><strong>釣り方を選ぶと、使う金具がすぐ分かります。</strong></div>
      </section>

      <section class="parts-card">
        <div class="parts-card-head"><span class="parts-icon">🔄</span><div><small>SWIVEL</small><h4>サルカン</h4></div></div>
        <p>道糸と仕掛けをつなぎ、回転することで<strong>糸ヨレを減らす</strong>金具。</p>
        <div class="parts-use"><b>向いている場面</b><span>ちょい投げ</span><span>サビキ</span><span>胴突き</span><span>ウキ釣り</span></div>
        <div class="parts-flow"><span>道糸</span><b>→</b><strong>サルカン</strong><b>→</b><span>仕掛け</span></div>
      </section>

      <section class="parts-card">
        <div class="parts-card-head"><span class="parts-icon">📎</span><div><small>SNAP</small><h4>スナップ</h4></div></div>
        <p>開閉できる金具で、結び直さず<strong>ルアーやジグヘッドを素早く交換</strong>できます。</p>
        <div class="parts-use"><b>向いている場面</b><span>ジグヘッド</span><span>ルアー</span><span>メタルジグ</span></div>
        <div class="parts-flow"><span>道糸 / リーダー</span><b>→</b><strong>小型スナップ</strong><b>→</b><span>ジグヘッド</span></div>
        <div class="parts-note">💡 軽いジグヘッドほど、小さく軽いスナップの方が使いやすい。</div>
      </section>

      <section class="parts-card">
        <div class="parts-card-head"><span class="parts-icon">🔗</span><div><small>SNAP SWIVEL</small><h4>スナップ付きサルカン</h4></div></div>
        <p><strong>サルカン＋スナップ</strong>が一体になったタイプ。糸ヨレ対策と仕掛け交換の両方ができます。</p>
        <div class="parts-use"><b>向いている場面</b><span>ちょい投げ</span><span>天秤</span><span>仕掛け交換</span></div>
        <div class="parts-flow"><span>道糸</span><b>→</b><strong>スナップサルカン</strong><b>→</b><span>天秤</span></div>
      </section>

      <section class="parts-choose">
        <div class="parts-choose-head"><span>🤔</span><strong>どれを使えばいい？</strong></div>
        <div class="parts-choose-grid">
          <div><small>ちょい投げ</small><strong>スナップ付きサルカン</strong><p>天秤や仕掛け交換が楽。</p></div>
          <div><small>ジグヘッド＋ワーム</small><strong>小型スナップ</strong><p>余計な回転金具を付けずシンプル。</p></div>
          <div><small>サビキ・胴突き</small><strong>サルカン / スナップサルカン</strong><p>仕掛け構成に合わせて選ぶ。</p></div>
          <div><small>迷ったら</small><strong>仕掛け袋の指定を確認</strong><p>メーカー推奨の接続方法が最優先。</p></div>
        </div>
      </section>

      <section class="parts-real-example">
        <strong>🎣 MFLの今の使い分け例</strong>
        <div><span>ちょい投げ</span><b>スナップ付きサルカン</b></div>
        <div><span>7g / 14g ジグヘッド</span><b>小型スナップ</b></div>
        <p>大きすぎる金具は不要。仕掛けの重さと強度に対して十分なサイズを選びます。</p>
      </section>

      <section class="parts-glossary">
        <div class="parts-glossary-head"><span>📖</span><strong>ついでに覚える言葉</strong></div>
        <dl>
          <div><dt>道糸</dt><dd>リールに巻いてあるメインの糸。</dd></div>
          <div><dt>リーダー</dt><dd>道糸の先につなぐ糸。擦れ対策や仕掛けとの接続に使う。</dd></div>
          <div><dt>天秤</dt><dd>ちょい投げなどで、オモリと仕掛けを絡みにくくするパーツ。</dd></div>
          <div><dt>アイ</dt><dd>ルアーやジグヘッドにある、糸やスナップを付ける輪。</dd></div>
        </dl>
      </section>

      <div class="guide-warning">
        <strong>⚠️ 接続後は必ず確認</strong>
        <p>スナップが閉じているか、サルカンの輪に正しく結べているか、引っ張って確認してから投げる。</p>
      </div>
    </article>`;

  if(section==='parts') setupPartsQuickAnswer();

  if(section==='rigs') root.innerHTML=`
    <article class="guide-article"><div class="guide-crosslink"><strong>💡 詳しい接続順は「仕掛けのつなぎ方」</strong><p>ここでは釣り方の特徴だけ確認。金具や接続順は専用ページにまとめています。</p></div><div class="guide-article-title"><span>🎣</span><div><small>RIG BASICS</small><h3>仕掛けの基本</h3></div></div>
    <div class="rig-card"><strong>ちょい投げ</strong><p>道糸 → 天秤・オモリ → 仕掛け → エサ</p><small>底にいるキスやハゼなどを狙いやすい。</small></div>
    <div class="rig-card"><strong>サビキ</strong><p>道糸 → サビキ仕掛け → カゴ</p><small>アジ・サバなどの回遊魚を足元〜近距離で狙う。</small></div>
    <div class="rig-card"><strong>ジグヘッド＋ワーム</strong><p>道糸 → 必要ならリーダー → ジグヘッド → ワーム</p><small>投げて巻く・沈めるなど自由度が高い。</small></div>
    <div class="guide-warning"><strong>⚠️ 重さに注意</strong><p>ロッドの適合負荷を超えない。迷ったらMFL Assistで安全な範囲だけ確認。</p></div></article>`;
  if(section==='trouble') root.innerHTML=`
    <article class="guide-article"><div class="guide-article-title"><span>🛟</span><div><small>TROUBLE</small><h3>困ったとき</h3></div></div>
    <details class="guide-step" open><summary><strong>根掛かりした</strong><small>無理に竿をあおらない</small><b>›</b></summary><p>糸を少し緩め、引く方向を変えてみる。外れなければ竿を曲げ込まずラインを真っ直ぐ引いて切る。</p></details>
    <details class="guide-step"><summary><strong>糸が絡んだ</strong><small>無理に引っ張らない</small><b>›</b></summary><p>テンションを抜いて、絡みの外側から少しずつほどく。</p></details>
    <details class="guide-step"><summary><strong>仕掛けが飛ばない</strong><small>重さだけが原因とは限らない</small><b>›</b></summary><p>ラインが太すぎないか、ガイドに糸が絡んでいないか、仕掛けが重すぎないかを確認。</p></details>
    <details class="guide-step"><summary><strong>知らない魚が釣れた</strong><small>触らない</small><b>›</b></summary><p>まず魚図鑑を確認。分からない魚は素手で触らず、毒棘や鋭い歯がある前提で扱う。</p></details></article>`;

  const article=root?.querySelector('.guide-article');
  if(article && !article.querySelector('.guide-back-top')){
    article.insertAdjacentHTML('afterbegin',guideBackButtonHTML());
    setupGuideBackTop();
  }
}

function renderGear() {
  const done = state.gear.filter(g=>g.checked).length;
  const pct = Math.round(done/state.gear.length*100);
  app.innerHTML = `<section class="card"><div class="section-heading"><h2>準備状況</h2><strong>${done}/${state.gear.length}</strong></div><div class="progress"><span style="width:${pct}%"></span></div></section><section class="card">${state.gear.map((g,i)=>`<label class="check-row"><input type="checkbox" data-gear="${i}" ${g.checked?'checked':''}><span>${escapeHtml(g.name)}</span></label>`).join('')}</section><button class="secondary-button" id="resetGear">チェックをすべて外す</button>`;
  document.querySelectorAll('[data-gear]').forEach(input => input.onchange = () => { state.gear[Number(input.dataset.gear)].checked = input.checked; save(); renderGear(); });
  document.getElementById('resetGear').onclick = () => { state.gear.forEach(g=>g.checked=false); save(); renderGear(); };
}

function renderSettings() {
  app.innerHTML = `<section class="card"><h2>My Fishing Life</h2><p>釣りに行く前、釣りの最中、帰宅後まで使える自分専用の釣り手帳です。</p></section><section class="card"><h3>データ保存</h3><p>記録はこの端末のブラウザ内に保存されます。ブラウザのデータを削除すると記録も消えるため、今後バックアップ機能を追加予定です。</p></section><button class="danger-button" id="deleteAll">すべての記録を削除</button>`;
  document.getElementById('deleteAll').onclick = () => {
    if (confirm('すべての釣行・釣果・持ち物チェックを削除しますか？')) {
      if (!confirmDestructiveAction('本当にすべてのMFLデータを削除しますか？', '釣行記録・釣果・写真・タックル・Ocean Rank・予定・設定がすべて消えます。')) return;
  localStorage.clear(); location.reload();
    }
  };
}

function recentFishNames() {
  const names = [];
  for (const c of state.catches) if (!names.includes(c.fishName)) names.push(c.fishName);
  return [...names.slice(0,4), ...['シロギス','カサゴ','アジ','その他'].filter(n => !names.includes(n))].slice(0,6);
}
function renderQuickFish() {
  const box = document.getElementById('quickFish');
  if (!box) return;
  box.innerHTML = recentFishNames().map(name => `<button type="button" data-quick-fish="${escapeHtml(name)}">${getFish(name).emoji} ${escapeHtml(name)}</button>`).join('');
  box.querySelectorAll('[data-quick-fish]').forEach(btn => btn.onclick = () => {
    document.getElementById('fishName').value = btn.dataset.quickFish;
    box.querySelectorAll('button').forEach(b => b.classList.toggle('selected', b === btn));
  });
}
function showCatchToast(catchItem, oldRank, newRank) {
  const toast = document.getElementById('catchToast');
  if (!toast) return;
  const tackle = state.tackles.find(t => t.id === catchItem.tackleId);
  const rankUp = tackle && oldRank && newRank && oldRank.name !== newRank.name;
  toast.innerHTML = `<strong>🎣 ${escapeHtml(catchItem.fishName)} ${catchItem.count}匹を記録！</strong>${tackle ? `<span>${escapeHtml(tackle.name)}：累計${tackleFishCount(tackle.id)}匹</span>` : ''}${rankUp ? `<b>🎉 ${newRank.icon} ${newRank.name}へ進化！</b>` : ''}`;
  toast.classList.add('show');
  clearTimeout(showCatchToast.timer);
  showCatchToast.timer = setTimeout(() => toast.classList.remove('show'), 4200);
}
function endTrip() {
  if (!state.activeTrip) return;
  const trip = state.trips.find(t => t.id === state.activeTrip.id);
  const catches = state.catches.filter(c => c.tripId === state.activeTrip.id);
  const count = catches.reduce((n,c) => n + Number(c.count || 0), 0);
  if (!confirm(`${state.activeTrip.place}の釣行を終了しますか？\\n今日の釣果：${count}匹`)) return;
  if (trip) { trip.ended = true; trip.end = timeString(); }
  state.activeTrip = null;
  save(); render();
}

function openTrip() {
  document.getElementById('tripDate').value = todayString();
  document.getElementById('tripStart').value = timeString();
  tripDialog.showModal();
}
function openTackle() {
  tackleForm.reset();
  tackleDialog.showModal();
}

function openCatch() {
  if (!state.activeTrip) { openTrip(); return; }
  const catchTackle = document.getElementById('catchTackle');
  if (catchTackle) {
    catchTackle.innerHTML = '<option value="">未選択</option>' + state.tackles.map(t => `<option value="${t.id}">${escapeHtml(t.name)}｜${escapeHtml(t.rod)}</option>`).join('');
    const preferred = state.tackles.some(t => t.id === state.lastTackleId) ? state.lastTackleId : (state.tackles[0]?.id || '');
    catchTackle.value = preferred;
  }
  document.getElementById('method').value = state.lastMethod;
  document.getElementById('fishCount').value = 1;
  document.getElementById('keep').checked = true;
  renderQuickFish();
  
  const methodSelect=document.getElementById('method');
  if(methodSelect){
    methodSelect.onchange=syncFieldDataVisibility;
    syncFieldDataVisibility();
  }

  catchDialog.showModal();
}

document.querySelectorAll('[data-close]').forEach(b => b.onclick = () => b.closest('dialog').close());
const quickAddBtn = document.getElementById('quickAddBtn');
if (quickAddBtn) quickAddBtn.onclick = openCatch;
const countMinus = document.getElementById('countMinus');
const countPlus = document.getElementById('countPlus');
if (countMinus) countMinus.onclick = () => fishCount.value = Math.max(1, Number(fishCount.value || 1) - 1);
if (countPlus) countPlus.onclick = () => fishCount.value = Math.min(999, Number(fishCount.value || 1) + 1);
document.addEventListener('click', e => {
  const hero = e.target.closest('#heroAction');
  if (hero) {
    e.preventDefault();
    state.activeTrip ? openCatch() : openTrip();
    return;
  }
  const calendar = e.target.closest('#openCalendar');
  if (calendar) {
    e.preventDefault();
    state.view = 'calendar';
    render();
  }
});
document.querySelectorAll('.nav-item').forEach(b => b.onclick = () => { state.view = b.dataset.view; render(); });
document.addEventListener('click', e => { const b=e.target.closest('[data-view-link]'); if (b) { state.view=b.dataset.viewLink; render(); } });



tackleForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('tackleName').value.trim();
  const rod = document.getElementById('tackleRod').value.trim();
  if (!name || !rod) return;
  state.tackles.unshift({
    id: crypto.randomUUID ? crypto.randomUUID() : `tackle-${Date.now()}`,
    name,
    rod,
    reel: document.getElementById('tackleReel').value.trim(),
    line: document.getElementById('tackleLine').value.trim(),
    createdAt: new Date().toISOString()
  });
  save();
  tackleDialog.close();
  state.view = 'tackle';
  render();
});

tripForm.addEventListener('submit', e => {
  e.preventDefault();
  const trip = { id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), place: tripPlace.value.trim(), date: tripDate.value, start: tripStart.value, weather: tripWeather.value, note: tripNote.value.trim(), ended: false };
  state.trips.unshift(trip); state.activeTrip = trip; save(); tripDialog.close(); tripForm.reset(); render();
});

catchForm.addEventListener('submit', async e => {
  e.preventDefault();
  const tackleId = document.getElementById('catchTackle')?.value || '';
  const beforeCount = tackleId ? tackleFishCount(tackleId) : 0;
  const beforeRank = tackleId ? oceanRankFor(beforeCount) : null;
  const saveButton = catchForm.querySelector('.catch-save-button');
  saveButton.disabled = true;
  saveButton.textContent = '保存中…';
  try {
    let photo = '';
    const file = fishPhoto.files[0];
    if (file) photo = await compressImage(file);
    const result = new FormData(catchForm).get('result');
    const catchItem = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), tripId: state.activeTrip.id,
      place: state.activeTrip.place, date: state.activeTrip.date, fishName: fishName.value,
      tackleId, size: fishSize.value, count: fishCount.value, method: method.value, rig: rig.value.trim(), result,
      jigHeadWeight: document.getElementById('jigHeadWeight')?.value || '',
      wormColor: document.getElementById('wormColor')?.value || '',
      bait: document.getElementById('fieldBait')?.value.trim() || '',
      hitZone: document.getElementById('hitZone')?.value || '',
      tidePhase: document.getElementById('fieldTide')?.value || '',
      note: catchNote.value.trim(), photo, createdAt: new Date().toISOString()
    };
    state.catches.unshift(catchItem);
    state.lastTackleId = tackleId;
    state.lastMethod = method.value;
    save();
    const afterRank = tackleId ? oceanRankFor(tackleFishCount(tackleId)) : null;
    catchDialog.close(); catchForm.reset(); fishCount.value = 1; keep.checked = true;
    render();
    showCatchToast(catchItem, beforeRank, afterRank);
  } finally {
    saveButton.disabled = false;
    saveButton.textContent = '釣果を記録する';
  }
});

function compressImage(file) {
  return new Promise((resolve,reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image(); img.onerror = reject;
      img.onload = () => {
        const max = 900, ratio = Math.min(1, max/Math.max(img.width,img.height));
        const canvas = document.createElement('canvas'); canvas.width = Math.round(img.width*ratio); canvas.height = Math.round(img.height*ratio);
        canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);
        resolve(canvas.toDataURL('image/jpeg',.78));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

document.getElementById('fishName').innerHTML = fishMaster.map(f=>`<option>${f.name}</option>`).join('');
render();
if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{});

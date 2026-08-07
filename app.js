const fishMaster = [
  { name:'シロギス', emoji:'🐟', photo:'./kisu.jpg', edible:'天ぷら・塩焼き', guide:'15cm以上を持ち帰り目安に', danger:'特別な危険は少ない', dangerLevel:0 },
  { name:'カサゴ', emoji:'🐠', photo:'./kasago.jpg', edible:'煮付け・唐揚げ', guide:'15cm以上を目安に', danger:'背びれ・エラ周辺の鋭いトゲに注意', dangerLevel:1, dangerAction:'フィッシュグリップやプライヤーを使い、ヒレを握り込まない。' },
  { name:'アジ', emoji:'🐟', photo:'./aji.jpg', edible:'刺身・フライ・なめろう', guide:'15cm以上を目安に', danger:'尾の近くのゼイゴが鋭いので注意', dangerLevel:1 },
  { name:'マハゼ', emoji:'🐡', edible:'天ぷら・唐揚げ', guide:'12cm以上を目安に', danger:'特別な危険は少ない', dangerLevel:0 },
  { name:'メゴチ', emoji:'🐟', edible:'天ぷら', guide:'12cm以上を目安に', danger:'エラぶた周辺のトゲに注意', dangerLevel:1 },
  { name:'ヒラメ', emoji:'🐟', edible:'刺身・ムニエル', guide:'茨城県では30cm未満は採捕禁止', danger:'鋭い歯に注意', dangerLevel:1, dangerAction:'口の中に指を入れない。' },
  { name:'シーバス', emoji:'🐟', photo:'./seabass.jpg', edible:'洗い・塩焼き', guide:'小型はリリース推奨', danger:'エラぶた・背びれ・歯に注意', dangerLevel:1 },
  { name:'サバ', emoji:'🐟', photo:'./saba.jpg', edible:'塩焼き・味噌煮', guide:'食べる分だけ持ち帰る', danger:'暴れて針が刺さる事故に注意', dangerLevel:1 },
  { name:'アイゴ', emoji:'⚠️', photo:'./aigo.jpg', edible:'適切に処理すれば食用可', guide:'初心者は無理に触らない', danger:'背びれ・腹びれ・尻びれに毒棘', dangerLevel:3, dangerTitle:'毒棘あり・素手で触らない', dangerAction:'魚体を直接握らず、プライヤー等で針を外す。ヒレに触れない。' },
  { name:'ゴンズイ', emoji:'☠️', photo:'./gonzui.jpg', edible:'食用例はあるが初心者は扱わない', guide:'初心者はリリース推奨', danger:'背びれ・胸びれの毒棘に注意', dangerLevel:3, dangerTitle:'毒棘あり・絶対に素手で握らない', dangerAction:'死んだ個体でも棘に注意。フィッシュグリップだけを過信せず、棘から距離を取る。' },
  { name:'ハオコゼ', emoji:'☠️', photo:'./haokoze.jpg', edible:'食用例はあるが小型', guide:'初心者はリリース推奨', danger:'背びれの毒棘', dangerLevel:3, dangerTitle:'小さくても危険・毒棘あり', dangerAction:'小さいから安全と思わず、素手でつかまない。' },
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
  document.querySelectorAll('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.view === state.view));
  const titles = { home:'ホーム', calendar:'釣行予定', trips:'釣行記録', encyclopedia:'魚図鑑', gear:'持ち物', tackle:'My Tackle', assist:'MFL Assist', settings:'設定' };
  if (pageTitle) pageTitle.textContent = titles[state.view];
  ({ home: renderHome, calendar: renderCalendar, trips: renderTrips, encyclopedia: renderEncyclopedia, gear: renderGear, tackle: renderTackle, assist: renderAssist, settings: renderSettings })[state.view]();
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
function catchCard(c) {
  const f = getFish(c.fishName);
  return `<article class="card">
    <div class="card-row">
      ${c.photo ? `<img class="catch-photo" src="${c.photo}" alt="${escapeHtml(c.fishName)}">` : `<div class="card-icon">${f.emoji}</div>`}
      <div class="card-main"><h3>${escapeHtml(c.fishName)} ${c.size ? `${escapeHtml(c.size)}cm` : ''}</h3><p>${formatDate(c.date)}・${escapeHtml(c.place || '釣り場未設定')}・${escapeHtml(c.method)}</p></div>
      <span class="badge">${escapeHtml(c.result)}</span>
    </div>
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
  const trips = state.trips;
  app.innerHTML = `
    ${state.activeTrip ? `<section class="active-trip-card"><div><p class="eyebrow">NOW FISHING</p><h2>${escapeHtml(state.activeTrip.place)}</h2><span>${formatDate(state.activeTrip.date)}・${escapeHtml(state.activeTrip.start)}開始</span></div><button class="primary-button" id="startTripBtn">＋ 魚を追加</button><button class="secondary-button" id="endTripBtn">釣行を終了</button></section>` : `<button class="primary-button" id="startTripBtn">新しい釣行を始める</button>`}
    <section class="section">
      ${trips.length ? trips.map(t => {
        const catches = state.catches.filter(c => c.tripId === t.id);
        const count = catches.reduce((n,c)=>n+Number(c.count||0),0);
        return `<article class="card"><div class="card-row"><div class="card-icon">🎣</div><div class="card-main"><h3>${escapeHtml(t.place)}</h3><p>${formatDate(t.date)}・${escapeHtml(t.weather)}・${count}匹</p></div></div>${catches.map(catchCard).join('') || '<p class="note" style="margin-top:12px">この釣行にはまだ釣果がありません。</p>'}</article>`;
      }).join('') : `<section class="empty-state"><div class="empty-icon">🧭</div><h2>釣行記録はまだありません</h2><p>最初の釣行を始めてみよう。</p></section>`}
    </section>`;
  document.getElementById('startTripBtn').onclick = () => state.activeTrip ? openCatch() : openTrip();
  const endTripBtn = document.getElementById('endTripBtn');
  if (endTripBtn) endTripBtn.onclick = endTrip;
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
 app.innerHTML=`<section class="assist-hero"><p class="eyebrow">MFL ASSIST β</p><h2>My Tackleを、まとめて診断。</h2><p>ロッド・リール・ラインを読み取り、釣り方と重量の目安を考えます。</p></section>
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
function renderEncyclopedia() {
  const caught = new Set(state.catches.map(c => c.fishName));
  app.innerHTML = `
    <section class="fish-safety-banner">
      <strong>⚠️ 分からない魚は素手で触らない</strong>
      <p>危険魚は赤いカードで表示します。小さい魚でも毒棘を持つ種類があります。</p>
    </section>
    <section class="section fish-photo-grid">
      ${fishMaster.filter(f=>f.name!=='その他').map(f => `
        <button class="fish-photo-card danger-${f.dangerLevel||0}" data-fish="${escapeHtml(f.name)}">
          <div class="fish-photo-wrap">
            ${f.photo ? `<img src="${f.photo}" alt="${escapeHtml(f.name)}の写真" loading="lazy">` : `<div class="fish-photo-fallback">${f.emoji}</div>`}
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
        ${f.dangerLevel>=3?`<section class="danger-stop"><strong>素手で触らない</strong><p>${escapeHtml(f.danger)}</p>${f.dangerAction?`<p>${escapeHtml(f.dangerAction)}</p>`:''}</section>`:''}
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

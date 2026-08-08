const fishMaster = [
  { name:'シロギス', emoji:'🐟', photo:'./kisu.jpg', edible:'天ぷら・塩焼き', guide:'15cm以上を持ち帰り目安に', danger:'特別な危険は少ない', dangerLevel:0 },
  { name:'カサゴ', emoji:'🐠', photo:'./kasago.jpg', edible:'煮付け・唐揚げ', guide:'15cm以上を目安に', danger:'背びれ・エラ周辺の鋭いトゲに注意', dangerLevel:1, dangerAction:'フィッシュグリップやプライヤーを使い、ヒレを握り込まない。' },
  { name:'アジ', emoji:'🐟', photo:'./aji.jpg', edible:'刺身・フライ・なめろう', guide:'15cm以上を目安に', danger:'尾の近くのゼイゴが鋭いので注意', dangerLevel:1 },
  { name:'マハゼ', emoji:'🐡', edible:'天ぷら・唐揚げ', guide:'12cm以上を目安に', danger:'特別な危険は少ない', dangerLevel:0 },
  { name:'メゴチ', emoji:'🐟', edible:'天ぷら', guide:'12cm以上を目安に', danger:'エラぶた周辺のトゲに注意', dangerLevel:1 },
  { name:'ヒラメ', emoji:'🐟', edible:'刺身・ムニエル', guide:'茨城県では30cm未満は採捕禁止', danger:'鋭い歯に注意', dangerLevel:1, dangerAction:'口の中に指を入れない。' },
  { name:'シーバス', emoji:'🐟', photo:'./seabass.jpg', edible:'洗い・塩焼き', guide:'小型はリリース推奨', danger:'エラぶた・背びれ・歯に注意', dangerLevel:1 },
  { name:'サバ', emoji:'🐟', photo:'./saba.jpg', photoType:'real', edible:'塩焼き・味噌煮', guide:'食べる分だけ持ち帰る', danger:'暴れて針が刺さる事故に注意', dangerLevel:1 },
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
  const titles = { home:'ホーム', calendar:'釣行予定', trips:'釣行記録', encyclopedia:'魚図鑑', guide:'釣行手引き', gear:'持ち物', tackle:'My Tackle', assist:'MFL Assist', settings:'設定' };
  if (pageTitle) pageTitle.textContent = titles[state.view];
  ({ home: renderHome, calendar: renderCalendar, trips: renderTrips, encyclopedia: renderEncyclopedia, guide: renderGuide, gear: renderGear, tackle: renderTackle, assist: renderAssist, settings: renderSettings })[state.view]();
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
function catchCard(c, deletable = false) {
  const f = getFish(c.fishName);
  return `<article class="card catch-record-card">
    <div class="card-row">
      ${c.photo ? `<img class="catch-photo" src="${c.photo}" alt="${escapeHtml(c.fishName)}">` : `<div class="card-icon">${f.emoji}</div>`}
      <div class="card-main"><h3>${escapeHtml(c.fishName)} ${c.size ? `${escapeHtml(c.size)}cm` : ''}</h3><p>${formatDate(c.date)}・${escapeHtml(c.place || '釣り場未設定')}・${escapeHtml(c.method)}</p></div>
      <span class="badge">${escapeHtml(c.result)}</span>
    </div>
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

    <section class="section trip-fold-list">
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
            ${f.photo ? `<img src="${f.photo}" alt="${escapeHtml(f.name)}の写真" loading="lazy">` : `<div class="fish-photo-fallback"><span>${f.emoji}</span><small>実写写真 準備中</small></div>`}
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


function renderGuide() {
  app.innerHTML = `
    <section class="guide-hero">
      <p class="eyebrow">MFL FIELD GUIDE</p>
      <h2>釣行手引き</h2>
      <p>「これ、どうするんだっけ？」を釣り場ですぐ確認できる簡単ガイド。</p>
    </section>
    <section class="guide-grid">
      <button class="guide-menu-card" data-guide-section="pier"><span class="guide-menu-icon">🗺️</span><span><strong>堤防の見方</strong><small>どこを狙う？ どこに注意する？</small></span><b>›</b></button>
      <button class="guide-menu-card" data-guide-section="knots"><span class="guide-menu-icon">🧵</span><span><strong>糸の結び方</strong><small>ルアー・仕掛け・ライン同士</small></span><b>›</b></button>
      <button class="guide-menu-card" data-guide-section="rigs"><span class="guide-menu-icon">🎣</span><span><strong>仕掛けの基本</strong><small>ちょい投げ・サビキ・ジグヘッド</small></span><b>›</b></button>
      <button class="guide-menu-card" data-guide-section="trouble"><span class="guide-menu-icon">🛟</span><span><strong>困ったとき</strong><small>根掛かり・糸絡み・飛ばない</small></span><b>›</b></button>
      <button class="guide-menu-card guide-map-menu" data-guide-section="kanto"><span class="guide-menu-icon">🗺️</span><span><strong>関東おすすめマップ</strong><small>初心者向け5か所から選ぶ</small></span><b>›</b></button>
    </section>
    <section id="guideContent" class="guide-content">
      <div class="guide-welcome"><span>📖</span><h3>見たい項目を選んでね</h3><p>釣り方を決めるためではなく、困った時の確認用ガイドです。</p></div>
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
{id:'kashima',area:'ibaraki',name:'鹿島港魚釣園',short:'鹿島',pref:'茨城',beginner:5,tackle:'◎',x:72,y:25,address:'茨城県鹿嶋市新浜11',fish:'アジ・サバ・イワシ・スズキ・根魚など',styles:['サビキ ◎','ルアー ○','ジグヘッド ○','ちょい投げ ○'],facilities:['トイレ','売店','貸竿','無料駐車場','職員','救助設備'],note:'ライフジャケット着用が必要。一部で転落防止柵が低い場所あり。',gear:'水深3〜10mで釣り方の幅を出しやすく、S90MLと100MHの使い分け向き。',checked:'2026年8月',official:'https://kashima-fa.com/infomation/'},
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
{id:'futtsu_area',area:'chiba',name:'富津地区（市公式案内エリア）',short:'富津',pref:'千葉',beginner:4,tackle:'◎',address:'千葉県富津市 富津地区',fish:'キス・カサゴ・スズキ・メバル・イシモチ・タコなど',styles:['ちょい投げ ◎','ルアー ○','ジグヘッド ○','足元狙い ○'],facilities:['周辺観光施設','問い合わせ窓口'],note:'富津市が釣りエリアとして案内している地区。特定の港や防波堤すべてが自由に入れる意味ではありません。立入禁止・漁港・港湾施設は現地掲示を優先し、富津新港など閉鎖区域へは入らない。',gear:'S90MLでキスなど軽めの釣り、100MHで少し重いルアーや遠投寄りの釣りと使い分けやすい。',checked:'2026年8月',official:'https://www.city.futtsu.lg.jp/0000000689.html'},
{id:'edogawa_hosuiro',area:'chiba',name:'江戸川放水路（妙典周辺）',short:'江戸川放水路',pref:'千葉',beginner:5,tackle:'○',address:'千葉県市川市 妙典周辺・江戸川放水路',fish:'マハゼ・スズキ幼魚・ボラ・コノシロなど',styles:['ハゼ釣り ◎','軽いちょい投げ ◎','足元狙い ○'],facilities:['河川敷','周辺駅','周辺店舗'],note:'市川市がハゼ釣りで知られる場所として案内。波が小さく家族連れにも向くと紹介されています。水面利用ルールや漁業・河川利用者に配慮し、現地掲示を優先。',gear:'S90MLなら軽いハゼ仕掛けを扱いやすい。100MHはかなり強めなので、軽い仕掛けでは無理に使わず別の釣り方を楽しむ候補。',checked:'2026年8月',official:'https://www.city.ichikawa.lg.jp/site/edogawa/1238.html'},
{id:'shinsakon',area:'tokyo',name:'新左近川親水公園',short:'新左近川',pref:'東京',beginner:5,tackle:'△',address:'東京都江戸川区臨海町二・三丁目地先',fish:'水辺の小物釣り中心',styles:['小物釣り ◎','足元狙い ◎','大型ルアー ×'],facilities:['親水公園','トイレ','周辺施設','カヌー場'],note:'江戸川区の地域計画で「釣りが楽しめる」と明記された親水公園。カヌー利用者など他の水面利用者を優先し、投げ釣りや大きな仕掛けは避ける。',gear:'S90MLでも軽い仕掛けなら使えるが、100MHはオーバーパワー。夫婦のロッド性能を試す場所ではなく、初心者が糸・アタリ・魚の扱いに慣れる練習枠。',checked:'2026年8月',official:'https://www.city.edogawa.tokyo.jp/e066/kuseijoho/gaiyo/shisetsuguide/bunya/koendobutsuen/shinsakon.html'}];
function stars(n){return '★'.repeat(n)+'☆'.repeat(5-n)}
function renderKantoMap(){return `<article class="guide-article kanto-guide">
<div class="guide-article-title"><span>🗺️</span><div><small>KANTO FISHING MAP</small><h3>千葉・東京重点版</h3></div></div>
<p class="kanto-intro">まず千葉・東京を優先表示。釣り可否を公式情報で確認できた場所だけ掲載。堤防・海づり施設に加え、初心者が練習しやすい水辺も別枠で載せます。</p>

<div class="focus-badge">⭐ PRIORITY AREA</div>
<div class="mfl-area-grid focus-grid">
  <button class="area-select-card focus-card" data-area-open="chiba"><span>🌉</span><div><small>最優先</small><strong>千葉</strong><em>市原を中心に拡張中</em></div></button>
  <button class="area-select-card focus-card" data-area-open="tokyo"><span>🏙️</span><div><small>重点</small><strong>東京</strong><em>若洲・城南島</em></div></button>
</div>

<div class="map-progress"><div class="map-progress-head"><span>🧭</span><div><small>CHIBA / TOKYO DEVELOPMENT</small><strong>重点エリアの精度を上げています</strong></div></div><div class="progress-row"><span>千葉</span><b>市原・浦安千鳥・富津・江戸川放水路</b><em>公式確認済み</em></div><div class="progress-row"><span>東京</span><b>若洲・城南島・新左近川</b><em>公式確認済み</em></div><p>港や防波堤は立入制限が変わることがあります。MFLでは「釣れそう」より「初心者に勧めてよいか」を優先します。</p></div><div class="secondary-area-label">その他の候補</div>
<div class="mfl-area-grid secondary-grid">
  <button class="area-select-card" data-area-open="ibaraki"><span>🌊</span><div><small>茨城</small><strong>鹿島</strong><em>1か所</em></div></button>
  <button class="area-select-card" data-area-open="bay-south"><span>⚓</span><div><small>横浜・川崎</small><strong>東京湾南西</strong><em>本牧・磯子・大黒・東扇島</em></div></button>
  <button class="area-select-card wide" data-area-open="yokosuka"><span>🏞️</span><div><small>三浦半島</small><strong>横須賀</strong><em>海辺つり公園・うみかぜ</em></div></button>
</div>

<div class="accuracy-note"><strong>🔎 MFL掲載ルール</strong><p>「昔は釣れた」「ネットで有名」だけでは追加しません。現在の釣り可否・立入範囲・公式ルールを確認できた場所から増やします。</p></div>

<div id="spotAreaPanel" class="spot-area-panel" hidden></div>
<div id="fishingSpotDetail" class="spot-detail"><div class="guide-welcome compact"><span>📍</span><h3>エリアを選択</h3><p>釣り場の特徴と注意点を表示します。</p></div></div>
</article>`}
function renderAreaSpots(area){
 const root=document.getElementById('spotAreaPanel');if(!root)return;
 const labels={chiba:'千葉',tokyo:'東京',ibaraki:'茨城','bay-south':'横浜・川崎',yokosuka:'横須賀'};
 const spots=area==='chiba'
   ? kantoFishingSpots.filter(s=>s.pref==='千葉')
   : kantoFishingSpots.filter(s=>s.area===area);
 root.hidden=false;
 root.innerHTML=`<div class="area-panel-head"><div><small>AREA</small><h4>${labels[area]}</h4></div><button id="closeAreaPanel">閉じる ×</button></div>
 <div class="area-spot-list">${spots.map(s=>`<button class="area-spot-button" data-fishing-spot="${s.id}"><span class="area-spot-pin">📍</span><span class="area-spot-copy"><strong>${s.name}</strong><small>${s.pref}・初心者 ${stars(s.beginner)}・タックル ${s.tackle}</small></span><b>›</b></button>`).join('')}</div>`;
 document.getElementById('closeAreaPanel').onclick=()=>root.hidden=true;
 root.querySelectorAll('[data-fishing-spot]').forEach(btn=>btn.onclick=()=>showFishingSpot(btn.dataset.fishingSpot));
 root.scrollIntoView({behavior:'smooth',block:'nearest'});
}
function setupKantoMap(){document.querySelectorAll('[data-area-open]').forEach(btn=>btn.onclick=()=>renderAreaSpots(btn.dataset.areaOpen));}

function spotTypeLabel(id){
  const types={
    ichihara:'管理釣り施設',
    urayasu_chidori:'開放護岸',
    futtsu_area:'海岸・地区案内',
    edogawa_hosuiro:'河口・放水路',
    shinsakon:'親水公園',
    wakasu:'海釣り施設',
    jonanjima:'公園内釣り可区画',
    kashima:'管理釣り施設',
    honmoku:'管理釣り施設',
    isogo:'管理釣り施設',
    daikoku:'管理釣り施設',
    higashiogishima:'公園釣り施設',
    umibetsuri:'海辺公園',
    umikaze:'平日のみ釣り可'
  };
  return types[id]||'釣り場';
}

function showFishingSpot(id){const s=kantoFishingSpots.find(x=>x.id===id),root=document.getElementById('fishingSpotDetail');if(!s||!root)return;document.querySelectorAll('[data-fishing-spot]').forEach(b=>b.classList.toggle('active',b.dataset.fishingSpot===id));root.innerHTML=`<section class="spot-card"><div class="spot-card-head"><span class="spot-pref">${s.pref}</span><div><small class="spot-type">${spotTypeLabel(s.id)}</small><h3>${s.name}</h3><p>${s.address}</p></div></div><div class="spot-score-grid"><div><small>初心者</small><strong>${stars(s.beginner)}</strong></div><div><small>2人のタックル</small><strong>${s.tackle}</strong></div></div><div class="spot-section"><small>狙える魚の例</small><p>${s.fish}</p></div><div class="spot-section"><small>向いている釣り</small><div class="spot-tags">${s.styles.map(x=>`<span>${x}</span>`).join('')}</div></div><div class="spot-section"><small>設備</small><div class="spot-tags muted">${s.facilities.map(x=>`<span>${x}</span>`).join('')}</div></div><div class="spot-gear-note"><strong>🎣 2人のタックル目線</strong><p>${s.gear}</p></div><div class="spot-warning"><strong>⚠️ 現地ルール</strong><p>${s.note}</p></div><div class="spot-footer"><span>情報確認：${s.checked}</span><a href="${s.official}" target="_blank" rel="noopener">公式情報を確認 ↗</a></div></section>`}

function renderGuideSection(section) {
  const root=document.getElementById('guideContent'); if(!root) return;
  if(section==='kanto'){root.innerHTML=renderKantoMap();setupKantoMap();}
  if(section==='pier') root.innerHTML=`
    <article class="guide-article"><div class="guide-article-title"><span>🗺️</span><div><small>PIER BASICS</small><h3>堤防の見方</h3></div></div>
    <div class="pier-map"><div class="pier-land">陸側</div><div class="pier-wall">堤防</div><div class="pier-water"><span class="pier-point p1">① 足元</span><span class="pier-point p2">② 船道</span><span class="pier-point p3">③ 潮の流れ</span><span class="pier-point p4">④ 明暗・影</span></div></div>
    <div class="guide-tip-list"><div><b>① 足元</b><p>カサゴなど根魚が着きやすい。壁際をゆっくり探る。</p></div><div><b>② 船道</b><p>少し深くなっていることが多い。遠投前に周囲を確認。</p></div><div><b>③ 潮が動く場所</b><p>魚が回ってくることがある。水面の流れやゴミの動きを観察。</p></div><div><b>④ 明暗・影</b><p>橋脚や常夜灯の影など、光の境目に魚が付くことがある。</p></div></div>
    <div class="guide-warning"><strong>⚠️ 安全優先</strong><p>立入禁止・作業区域・船の出入りを最優先で避ける。濡れた足場やテトラへ無理に入らない。</p></div></article>`;
  if(section==='knots') root.innerHTML=`
    <article class="guide-article"><div class="guide-article-title"><span>🧵</span><div><small>KNOTS</small><h3>糸の結び方</h3></div></div>
    <details class="guide-step" open><summary><strong>ユニノット</strong><small>ルアー・スナップ・サルカンに</small><b>›</b></summary>${knotSteps('uni',['金具の輪に糸を通す','先端を折り返して輪を作る','輪の中へ4〜6回巻く','湿らせてゆっくり締める'])}<ol><li>余った糸を少し残して切る。</li></ol><p class="guide-mini-note">まず覚えるならこれ。結び終わったら必ず強く引いて確認。</p></details>
    <details class="guide-step"><summary><strong>クリンチノット</strong><small>小型の金具・針・スナップに</small><b>›</b></summary>${knotSteps('clinch',['金具の輪へ糸を通す','道糸へ5〜7回巻き、根元の穴へ通す','湿らせてゆっくり締める'])}</details>
    <details class="guide-step"><summary><strong>電車結び</strong><small>ナイロン・フロロ同士の接続に</small><b>›</b></summary>${knotSteps('train',['2本の糸を平行に重ねる','糸Bで糸Aへユニノットを作る','反対側も同じように結ぶ','左右へ引いて結び目を寄せる'])}<p class="guide-mini-note">PEとリーダーの本格接続はFGノットなど別の結びが向く。</p></details>
    <div class="guide-warning"><strong>結び終わったら</strong><p>必ず手で引っ張って強度確認。滑る・ほどけるなら使わず結び直す。</p></div></article>`;
  if(section==='rigs') root.innerHTML=`
    <article class="guide-article"><div class="guide-article-title"><span>🎣</span><div><small>RIG BASICS</small><h3>仕掛けの基本</h3></div></div>
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

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
  const groups = new Map();
  [...state.catches]
    .sort((a,b) => (b.date||'').localeCompare(a.date||''))
    .forEach(c => {
      const key = `${c.date || ''}__${c.place || '釣り場未設定'}`;
      if (!groups.has(key)) groups.set(key, {
        key,
        date:c.date || '',
        place:c.place || '釣り場未設定',
        weather:c.weather || '',
        catches:[]
      });
      groups.get(key).catches.push(c);
    });
  const trips=[...groups.values()];

  app.innerHTML = `
    <button class="primary-button" id="startTripBtn">${state.activeTrip ? '現在の釣行に釣果を追加' : '新しい釣行を始める'}</button>
    <section class="section trip-accordion-list">
      ${trips.length ? trips.map((t, idx) => {
        const count=t.catches.reduce((n,c)=>n+Number(c.count||1),0);
        const speciesCount=new Set(t.catches.map(c=>c.fishName)).size;
        return `<details class="trip-accordion" ${idx===0?'open':''}>
          <summary>
            <span class="trip-summary-icon">🎣</span>
            <span class="trip-summary-main">
              <strong>${escapeHtml(t.place)}</strong>
              <small>${formatDate(t.date)}${t.weather ? `・${escapeHtml(t.weather)}` : ''}</small>
            </span>
            <span class="trip-summary-stats"><b>${count}匹</b><small>${speciesCount}魚種</small></span>
            <span class="trip-summary-arrow">›</span>
          </summary>
          <div class="trip-accordion-body">
            ${t.catches.map(c=>catchCard(c,true)).join('')}
          </div>
        </details>`;
      }).join('') : `<section class="empty-state"><div class="empty-icon">🧭</div><h2>釣行記録はまだありません</h2><p>最初の釣行を始めてみよう。</p></section>`}
    </section>`;

  const startTripBtn=document.getElementById('startTripBtn');
  if(startTripBtn) startTripBtn.onclick=()=>state.activeTrip ? openCatch() : openTrip();

  document.querySelectorAll('[data-delete-catch]').forEach(btn => btn.onclick = () => {
    const id=btn.dataset.deleteCatch;
    const item=state.catches.find(c=>c.id===id);
    if(!item) return;
    const label=`${item.fishName}${item.size ? ` ${item.size}cm` : ''}・${item.count || 1}匹`;
    if(!confirmDestructiveAction(
      `「${label}」の記録だけ削除しますか？`,
      'この1件だけが削除されます。他の魚・写真・釣行・予定・My Tackleは残ります。'
    )) return;
    state.catches=state.catches.filter(c=>c.id!==id);
    save();
    renderTrips();
  });
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

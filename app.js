const fishMaster = [
  { name: 'シロギス', emoji: '🐟', edible: '天ぷら・塩焼き', guide: '15cm以上を持ち帰り目安に', danger: 'なし' },
  { name: 'カサゴ', emoji: '🐠', edible: '煮付け・唐揚げ', guide: '15cm以上を目安に', danger: '背びれのトゲに注意' },
  { name: 'アジ', emoji: '🐟', edible: '刺身・フライ・なめろう', guide: '15cm以上を目安に', danger: 'ぜいごに注意' },
  { name: 'マハゼ', emoji: '🐡', edible: '天ぷら・唐揚げ', guide: '12cm以上を目安に', danger: 'なし' },
  { name: 'メゴチ', emoji: '🐟', edible: '天ぷら', guide: '12cm以上を目安に', danger: 'エラぶたのトゲに注意' },
  { name: 'ヒラメ', emoji: '🐟', edible: '刺身・ムニエル', guide: '茨城県では30cm未満は採捕禁止', danger: '歯に注意' },
  { name: 'シーバス', emoji: '🐟', edible: '洗い・塩焼き', guide: '小型はリリース推奨', danger: 'エラぶたに注意' },
  { name: 'アイゴ', emoji: '⚠️', edible: '処理できれば食用可', guide: '初心者はリリース推奨', danger: '各ひれに毒棘' },
  { name: 'ゴンズイ', emoji: '⚠️', edible: '食用可だが扱い注意', guide: '初心者はリリース推奨', danger: '背びれ・胸びれに毒棘' },
  { name: 'ハオコゼ', emoji: '⚠️', edible: '食用可だが小型', guide: 'リリース推奨', danger: '背びれに毒棘' },
  { name: 'その他', emoji: '🐟', edible: '魚種を確認', guide: '不明魚は持ち帰らない', danger: '素手で触らない' }
];

const defaultGear = ['ロッド', 'リール', '仕掛け', 'オモリ・ジグヘッド', 'エサ・ワーム', 'ハサミ・プライヤー', 'フィッシュグリップ', 'ライフジャケット', 'クーラーボックス', '氷・保冷剤', 'タオル', '飲み物'];
const state = {
  view: 'home',
  trips: JSON.parse(localStorage.getItem('mfl_trips') || '[]'),
  catches: JSON.parse(localStorage.getItem('mfl_catches') || '[]'),
  gear: JSON.parse(localStorage.getItem('mfl_gear') || 'null') || defaultGear.map(name => ({ name, checked: false })),
  activeTrip: JSON.parse(localStorage.getItem('mfl_activeTrip') || 'null')
};

const app = document.getElementById('app');
const pageTitle = document.getElementById('pageTitle');
const catchDialog = document.getElementById('catchDialog');
const tripDialog = document.getElementById('tripDialog');
const catchForm = document.getElementById('catchForm');
const tripForm = document.getElementById('tripForm');

function save() {
  localStorage.setItem('mfl_trips', JSON.stringify(state.trips));
  localStorage.setItem('mfl_catches', JSON.stringify(state.catches));
  localStorage.setItem('mfl_gear', JSON.stringify(state.gear));
  localStorage.setItem('mfl_activeTrip', JSON.stringify(state.activeTrip));
}
function escapeHtml(value='') { return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function formatDate(s) { if (!s) return ''; const d = new Date(`${s}T00:00:00`); return `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}`; }
function todayString() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
function timeString() { const d = new Date(); return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`; }
function getFish(name) { return fishMaster.find(f => f.name === name) || fishMaster.at(-1); }

function render() {
  document.querySelectorAll('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.view === state.view));
  const titles = { home:'ホーム', trips:'釣行記録', encyclopedia:'魚図鑑', gear:'持ち物', settings:'設定' };
  pageTitle.textContent = titles[state.view];
  ({ home: renderHome, trips: renderTrips, encyclopedia: renderEncyclopedia, gear: renderGear, settings: renderSettings })[state.view]();
}

function renderHome() {
  const totalFish = state.catches.reduce((n,c) => n + Number(c.count || 0), 0);
  const species = new Set(state.catches.map(c => c.fishName)).size;
  const recent = state.catches.slice(0,3);
  app.innerHTML = `
    <section class="hero">
      <p class="eyebrow" style="color:#dff7f8">TODAY'S FISHING</p>
      <h2>${state.activeTrip ? escapeHtml(state.activeTrip.place) : '今日はどこへ釣りに行く？'}</h2>
      <p>${state.activeTrip ? `${formatDate(state.activeTrip.date)} ${escapeHtml(state.activeTrip.weather)}／${escapeHtml(state.activeTrip.start)}開始` : '釣行を始めて、思い出を一匹ずつ残そう。'}</p>
      <button class="primary-button" id="heroAction">${state.activeTrip ? '釣果を記録する' : '釣行を始める'}</button>
    </section>
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
  document.getElementById('heroAction').onclick = () => state.activeTrip ? openCatch() : openTrip();
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

function renderTrips() {
  const trips = state.trips;
  app.innerHTML = `
    <button class="primary-button" id="startTripBtn">${state.activeTrip ? '現在の釣行に釣果を追加' : '新しい釣行を始める'}</button>
    <section class="section">
      ${trips.length ? trips.map(t => {
        const catches = state.catches.filter(c => c.tripId === t.id);
        const count = catches.reduce((n,c)=>n+Number(c.count||0),0);
        return `<article class="card"><div class="card-row"><div class="card-icon">🎣</div><div class="card-main"><h3>${escapeHtml(t.place)}</h3><p>${formatDate(t.date)}・${escapeHtml(t.weather)}・${count}匹</p></div></div>${catches.map(catchCard).join('') || '<p class="note" style="margin-top:12px">この釣行にはまだ釣果がありません。</p>'}</article>`;
      }).join('') : `<section class="empty-state"><div class="empty-icon">🧭</div><h2>釣行記録はまだありません</h2><p>最初の釣行を始めてみよう。</p></section>`}
    </section>`;
  document.getElementById('startTripBtn').onclick = () => state.activeTrip ? openCatch() : openTrip();
}

function renderEncyclopedia() {
  const caught = new Set(state.catches.map(c => c.fishName));
  app.innerHTML = `<p class="note">危険魚や見分けに自信がない魚は、素手で触らず現地のルールを確認してください。</p><section class="section fish-grid">${fishMaster.filter(f=>f.name!=='その他').map(f => `<button class="fish-card" data-fish="${escapeHtml(f.name)}"><div class="fish-emoji">${f.emoji}</div><h3>${escapeHtml(f.name)} ${caught.has(f.name)?'✓':''}</h3><p>${escapeHtml(f.edible)}</p></button>`).join('')}</section>`;
  document.querySelectorAll('[data-fish]').forEach(btn => btn.onclick = () => {
    const f = getFish(btn.dataset.fish);
    alert(`${f.name}\n\n料理：${f.edible}\n持ち帰り目安：${f.guide}\n注意：${f.danger}`);
  });
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
      localStorage.clear(); location.reload();
    }
  };
}

function openTrip() {
  document.getElementById('tripDate').value = todayString();
  document.getElementById('tripStart').value = timeString();
  tripDialog.showModal();
}
function openCatch() {
  if (!state.activeTrip) { openTrip(); return; }
  catchDialog.showModal();
}

document.querySelectorAll('[data-close]').forEach(b => b.onclick = () => b.closest('dialog').close());
document.getElementById('quickAddBtn').onclick = openCatch;
document.querySelectorAll('.nav-item').forEach(b => b.onclick = () => { state.view = b.dataset.view; render(); });
document.addEventListener('click', e => { const b=e.target.closest('[data-view-link]'); if (b) { state.view=b.dataset.viewLink; render(); } });

tripForm.addEventListener('submit', e => {
  e.preventDefault();
  const trip = { id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), place: tripPlace.value.trim(), date: tripDate.value, start: tripStart.value, weather: tripWeather.value, note: tripNote.value.trim(), ended: false };
  state.trips.unshift(trip); state.activeTrip = trip; save(); tripDialog.close(); tripForm.reset(); render();
});

catchForm.addEventListener('submit', async e => {
  e.preventDefault();
  let photo = '';
  const file = fishPhoto.files[0];
  if (file) photo = await compressImage(file);
  const result = new FormData(catchForm).get('result');
  state.catches.unshift({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), tripId: state.activeTrip.id,
    place: state.activeTrip.place, date: state.activeTrip.date, fishName: fishName.value,
    size: fishSize.value, count: fishCount.value, method: method.value, rig: rig.value.trim(), result,
    note: catchNote.value.trim(), photo, createdAt: new Date().toISOString()
  });
  save(); catchDialog.close(); catchForm.reset(); fishCount.value = 1; keep.checked = true; render();
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

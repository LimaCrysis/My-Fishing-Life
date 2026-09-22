import { AREA_TROUT_MASTER } from '../data/area-trout-spots.js';
import { AREA_TROUT_LOCATIONS } from '../data/area-trout-locations.js';
/* AREA TROUT cards: view-only; the caller supplies the verified master array. */
(function (root) {
  'use strict';
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const text = value => typeof value === 'string' ? value.trim() : '';
  const values = value => (Array.isArray(value) ? value : [value]).map(text).filter(Boolean);
  const key = value => value.replace(/[\s。！!]+/g, '');
  function unique(items) {
    return items.filter((value, index) => items.findIndex(item => key(item) === key(value)) === index);
  }
  function notices(facility) {
    const items = unique(['statusNotice', 'seasonNotice', 'infoNotice'].flatMap(field => values(facility[field])));
    // Do not guess which condition an abstract warning refers to.
    if (items.some(item => /^(最新情報|詳細|情報)?[をは]?要確認[。！!]*$/.test(key(item)))) {
      throw new Error('確認対象が明示されていない注意文言があります: ' + text(facility.name));
    }
    return items.filter(item => !items.some(other => key(other) !== key(item) && key(other).includes(key(item))));
  }
  function cardModel(facility) {
    const tags = unique([
      ...(facility.competitionStrong === true ? ['競技色強め'] : []),
      ...values(facility.tags).filter(tag => !tag.includes('要確認')),
      ...(facility.camping === true ? ['キャンプ〇'] : []),
      ...(facility.seasonal && !values(facility.tags).some(tag => tag.includes('冬季限定') || tag.includes('季節営業')) ? ['季節営業'] : [])
    ]).slice(0, 3);
    return {
      name: text(facility.name), prefecture: text(facility.prefecture), tags,
      keep: facility.keepAllowed === true ? '可' : facility.keepAllowed === false ? '不可' : '要確認',
      rental: facility.rentalAvailable === true ? 'あり' : facility.rentalAvailable === false ? 'なし' : null,
      notices: notices(facility)
    };
  }
  function renderCard(facility, index) {
    const model = cardModel(facility);
    const titleId = 'trout-facility-title-' + index;
    return `<li><article class="trout-facility-card" aria-labelledby="${titleId}">
      <header><h4 id="${titleId}">${escape(model.name)}</h4>${model.prefecture ? `<p class="trout-facility-prefecture">${escape(model.prefecture)}</p>` : ''}</header>
      ${model.tags.length ? `<ul class="trout-facility-tags" aria-label="施設の特徴">${model.tags.map(tag => `<li>${escape(tag)}</li>`).join('')}</ul>` : ''}
      <dl class="trout-facility-facts"><div><dt>持ち帰り</dt><dd>${model.keep}</dd></div>${model.rental === null ? '' : `<div><dt>レンタル</dt><dd>${model.rental}</dd></div>`}</dl>
      ${model.notices.length ? `<div class="trout-facility-notices"><span aria-hidden="true">⚠</span><ul aria-label="確認しておきたいこと">${model.notices.map(notice => `<li>${escape(notice)}</li>`).join('')}</ul></div>` : ''}
      <button type="button" class="trout-facility-details" data-trout-index="${index}" aria-label="${escape(model.name)}の詳細を見る">詳細を見る<span aria-hidden="true"> ›</span></button>
    </article></li>`;
  }
  const filterDefs = [
    ['keep','持ち帰り可', f => f.keepAllowed === true],
    ['rental','レンタルあり', f => f.rentalAvailable === true],
    ['camp','キャンプ', f => f.camping === true],
    ['cr','C&R系', f => values(f.tags).some(tag => /C\s*&\s*R/i.test(tag))],
    ['quiet','競技色強めを除外', f => f.competitionStrong !== true],
    ['notice','注意事項あり', f => notices(f).length > 0]
  ];
  const pricing = {ticket_rule:'券種ごとの規定',included:'入場料金に含む',none:'持ち帰り対象外',keep_ticket_plus_large_fish_fee:'持ち帰り券＋大型魚追加料金',mixed_area_rule:'エリアごとの規定',catch_or_weight_rule:'尾数・重量による規定',check_required:'料金・キープ条件要確認',fishery_rule:'漁場規定',included_plus_weight_overage:'規定分込み・超過分は重量精算',keep_ticket:'持ち帰り券',weight_purchase:'重量買取',included_plus_weight_purchase:'規定分込み・重量買取あり',seasonal_rule:'シーズンごとの規定'};
  function showDetail(f, opener, container) {
    const dialog = document.createElement('dialog');
    dialog.className = 'trout-detail-sheet';
    dialog.setAttribute('aria-labelledby','troutDetailTitle');
    const bool = value => value === true ? 'あり' : value === false ? 'なし' : null;
    const model = cardModel(f);
    const location = AREA_TROUT_LOCATIONS.entries[f.id] || null;
    const crTag = values(f.tags).find(tag => /C\s*&\s*R/i.test(tag));
    const summary = [
      ['持ち帰り', model.keep, model.keep === '可' ? 'is-good' : model.keep === '不可' ? 'is-ng' : 'is-check'],
      ['レンタル', f.rentalAvailable === true ? 'あり' : f.rentalAvailable === false ? 'なし' : '未確認', f.rentalAvailable === true ? 'is-good' : ''],
      ['キャンプ', f.camping === true ? 'あり' : 'なし', f.camping === true ? 'is-good' : ''],
      ['競技色', f.competitionStrong === true ? '強め' : f.competitionStrong === false ? '通常' : '未確認', f.competitionStrong === true ? 'is-check' : '']
    ];
    const keepRows = [
      ['キープ条件',f.keepLimit],['大型魚ルール',f.largeFishRule],
      ['料金方式',pricing[f.keepPricingType] || f.keepPricingType],['追加料金',f.keepExtraFee]
    ].filter(([,v]) => v !== null && v !== undefined && v !== '');
    const supportRows = [
      ['レンタル',bool(f.rentalAvailable)],['捌き場',bool(f.cleaningAvailable)],['捌きサービス',bool(f.cleaningService)],
      ['持ち帰りサポート',f.takeHomeSupport],['現地調理',bool(f.cookOnSite)],['キャンプ',bool(f.camping)]
    ].filter(([,v]) => v !== null && v !== undefined && v !== '');
    const featureRows = [
      ['C&R',crTag || null],
      ['競技色',f.competitionStrong === true ? '競技色強め' : f.competitionStrong === false ? '競技色強めには該当しない' : null],
      ['季節営業',({winter:'冬季限定',seasonal:'季節営業',limited_season:'期間限定営業'})[f.seasonal] || f.seasonal]
    ].filter(([,v]) => v !== null && v !== undefined && v !== '');
    const locationRows = location ? [
      ['位置タイプ', location.locationType === 'river_section' ? '河川区間' : location.status === 'pending_exact' ? '所在地確認済み・正確なピン確認中' : location.status === 'representative' ? '代表地点' : '位置確認済み'],
      ['所在地', location.address],
      ['地図情報', location.notice]
    ].filter(([,v]) => v !== null && v !== undefined && v !== '') : [];
    const tags = unique(values(f.tags).filter(t => !t.includes('要確認')));
    const renderRows = rows => rows.length ? `<dl>${rows.map(([k,v])=>`<div><dt>${escape(k)}</dt><dd>${escape(v)}</dd></div>`).join('')}</dl>` : '<p class="trout-detail-empty">登録情報なし</p>';
    dialog.innerHTML = `<header><div><h2 id="troutDetailTitle">${escape(f.name)}</h2><p>${escape(f.prefecture)}</p></div><button type="button" class="trout-detail-close" autofocus aria-label="施設詳細を閉じる">閉じる</button></header><div class="trout-detail-content">
      ${tags.length ? `<ul class="trout-detail-tags">${tags.map(t=>`<li>${escape(t)}</li>`).join('')}</ul>` : ''}
      <section class="trout-detail-summary" aria-label="施設の判断サマリー">${summary.map(([label,value,className])=>`<div class="trout-detail-summary-item ${className}"><span>${escape(label)}</span><strong>${escape(value)}</strong></div>`).join('')}</section>
      ${notices(f).length ? `<aside class="trout-detail-alert" aria-label="確認しておきたいこと"><strong>確認しておきたいこと</strong><ul>${notices(f).map(n=>`<li>${escape(n)}</li>`).join('')}</ul></aside>` : ''}
      <section class="trout-detail-section"><h3>持ち帰り・料金</h3>${renderRows(keepRows)}</section>
      <section class="trout-detail-section"><h3>設備・サポート</h3>${renderRows(supportRows)}</section>
      ${featureRows.length ? `<section class="trout-detail-section"><h3>営業・特徴</h3>${renderRows(featureRows)}</section>` : ''}
      ${locationRows.length ? `<section class="trout-detail-section"><h3>位置情報</h3>${renderRows(locationRows)}</section>` : ''}
      ${text(f.notes) ? `<section class="trout-detail-section trout-detail-notes"><h3>施設メモ</h3><p>${escape(f.notes)}</p></section>` : ''}
    </div>`;
    document.body.appendChild(dialog);
    const scrollY = window.scrollY;
    const saved = {position:document.body.style.position,top:document.body.style.top,width:document.body.style.width,overflow:document.body.style.overflow};
    Object.assign(document.body.style,{position:'fixed',top:`-${scrollY}px`,width:'100%',overflow:'hidden'});
    let cleaned = false;
    const observer = new MutationObserver(()=>{if(!container.isConnected)dialog.close();});
    const cleanup = () => {
      if(cleaned)return;cleaned=true;observer.disconnect();
      Object.assign(document.body.style,saved);window.scrollTo(0,scrollY);dialog.remove();
      if(opener.isConnected)opener.focus({preventScroll:true});
    };
    dialog.addEventListener('close',cleanup,{once:true});
    dialog.querySelector('.trout-detail-close').onclick=()=>dialog.close();
    // Only a gesture that starts and ends on the backdrop dismisses the sheet.
    let backdropDown=false;
    const outside=e=>{const r=dialog.getBoundingClientRect();return e.target===dialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom);};
    dialog.addEventListener('pointerdown',e=>{backdropDown=outside(e);});
    dialog.addEventListener('click',e=>{if(backdropDown&&outside(e))dialog.close();backdropDown=false;});
    observer.observe(document.getElementById('app'),{childList:true});
    try { dialog.showModal(); } catch(error) { cleanup();throw error; }
  }
  let troutMapState = null;

  function mappedLocation(id) {
    const loc = AREA_TROUT_LOCATIONS.entries[id];
    return loc && Number.isFinite(loc.lat) && Number.isFinite(loc.lon) ? loc : null;
  }

  function pinIcon(location) {
    const representative = location.status === 'representative';
    return root.L.divIcon({
      className: 'mfl-trout-map-pin-wrap',
      html: `<span class="mfl-trout-map-pin${representative ? ' is-representative' : ''}" aria-hidden="true"></span>`,
      iconSize: [34, 42],
      iconAnchor: [17, 39],
      popupAnchor: [0, -35]
    });
  }

  function markerPopup(facility, index, location) {
    const markerNote = location.status === 'representative'
      ? '<span class="trout-map-popup-note">代表地点</span>'
      : '<span class="trout-map-popup-note is-verified">位置確認済み</span>';
    return `<div class="trout-map-popup"><strong>${escape(facility.name)}</strong><small>${escape(facility.prefecture)}</small>${markerNote}<button type="button" data-trout-map-detail-index="${index}">詳細を見る</button></div>`;
  }

  const troutPrefectureOrder = ['福島','群馬','栃木','茨城','埼玉','千葉'];

  function provinceIcon(prefecture, count) {
    const empty = count === 0;
    return root.L.divIcon({
      className: 'mfl-trout-province-pin-wrap',
      html: `<span class="mfl-trout-province-pin${empty ? ' is-empty' : ''}" aria-hidden="true"><strong>${escape(prefecture)}</strong><small>${count}施設</small></span>`,
      iconSize: [72, 72],
      iconAnchor: [36, 64],
      popupAnchor: [0, -58]
    });
  }

  function locationSummary(items) {
    let pins = 0, sections = 0, pending = 0;
    items.forEach(({facility}) => {
      if (mappedLocation(facility.id)) { pins += 1; return; }
      const loc = AREA_TROUT_LOCATIONS.entries[facility.id];
      if (loc?.locationType === 'river_section') sections += 1;
      else pending += 1;
    });
    return {pins, sections, pending};
  }

  function updateMapStatus(matches, selectedPrefecture = null) {
    const statusHost = document.getElementById('areaTroutMapPinStatus');
    if (!statusHost) return;
    const items = selectedPrefecture ? matches.filter(({facility}) => facility.prefecture === selectedPrefecture) : matches;
    const {pins, sections, pending} = locationSummary(items);
    const extras = [sections ? `${sections}区間` : '', pending ? `${pending}位置確認中` : ''].filter(Boolean).join('・');
    if (selectedPrefecture) {
      statusHost.innerHTML = `<strong>${pins}</strong><span>ピン${extras ? ` + ${extras}` : ''} / ${items.length}施設</span>`;
      return;
    }
    statusHost.innerHTML = `<strong>6</strong><span>県表示 / ${pins}ピン${extras ? `・${extras}` : ''}</span>`;
  }

  function renderMapExceptions(matches, selectedPrefecture, detailContainer) {
    const host = document.getElementById('areaTroutMapExceptions');
    if (!host) return;
    if (!selectedPrefecture) {
      host.hidden = true;
      host.innerHTML = '';
      return;
    }
    const items = matches.filter(({facility}) => {
      if (facility.prefecture !== selectedPrefecture || mappedLocation(facility.id)) return false;
      return Boolean(AREA_TROUT_LOCATIONS.entries[facility.id]);
    });
    if (!items.length) {
      host.hidden = true;
      host.innerHTML = '';
      return;
    }
    host.hidden = false;
    host.innerHTML = `<div class="trout-map-exceptions-head"><strong>ピン以外の位置情報</strong><span>${items.length}件</span></div><div class="trout-map-exceptions-list">${items.map(({facility,index}) => {
      const loc = AREA_TROUT_LOCATIONS.entries[facility.id];
      const river = loc.locationType === 'river_section';
      const badge = river ? '区間型' : '位置確認中';
      const note = river ? (loc.notice || '河川区間のため単一点ピンにはしていません。') : (loc.address || loc.notice || '正確なピン座標を確認中です。');
      return `<button type="button" class="trout-map-exception-item${river ? ' is-river' : ' is-pending'}" data-trout-map-exception-index="${index}"><span class="trout-map-exception-badge">${escape(badge)}</span><span class="trout-map-exception-copy"><strong>${escape(facility.name)}</strong><small>${escape(note)}</small></span><span class="trout-map-exception-arrow" aria-hidden="true">›</span></button>`;
    }).join('')}</div>`;
    host.onclick = event => {
      const button = event.target.closest('[data-trout-map-exception-index]');
      if (!button) return;
      const index = Number(button.dataset.troutMapExceptionIndex);
      const item = matches.find(entry => entry.index === index);
      if (item) showDetail(item.facility, button, detailContainer);
    };
  }

  function fitMapToItems(items, options = {}) {
    if (!troutMapState?.map) return;
    const points = items
      .map(({facility}) => mappedLocation(facility.id))
      .filter(Boolean)
      .map(loc => [loc.lat, loc.lon]);
    if (!points.length) return;
    const bounds = root.L.latLngBounds(points);
    troutMapState.pendingBounds = bounds;
    if (troutMapState.host.offsetParent !== null) {
      troutMapState.map.invalidateSize(false);
      troutMapState.map.fitBounds(bounds, { padding:[28,28], maxZoom: options.maxZoom || 11, animate: !window.matchMedia('(prefers-reduced-motion: reduce)').matches });
      troutMapState.pendingBounds = null;
    }
  }

  function updateRealMap(matches, selectedPrefecture = null) {
    if (!troutMapState?.map) {
      updateMapStatus(matches, selectedPrefecture);
      renderMapExceptions(matches, selectedPrefecture, document.getElementById('areaTroutFacilities'));
      return;
    }
    troutMapState.layer.clearLayers();
    if (selectedPrefecture) {
      const visibleIds = new Set(matches
        .filter(({facility}) => facility.prefecture === selectedPrefecture)
        .map(({facility}) => facility.id));
      troutMapState.markers.forEach((marker, id) => {
        if (visibleIds.has(id)) troutMapState.layer.addLayer(marker);
      });
      if (troutMapState.backButton) { troutMapState.backButton.hidden = false; troutMapState.backButton.parentElement.hidden = false; }
    } else {
      const visibleCounts = matches.reduce((acc, {facility}) => {
        const pref = text(facility.prefecture) || 'その他';
        acc[pref] = (acc[pref] || 0) + 1;
        return acc;
      }, {});
      troutMapState.provinceMarkers.forEach((marker, pref) => {
        marker.setIcon(provinceIcon(pref, visibleCounts[pref] || 0));
        troutMapState.layer.addLayer(marker);
      });
      if (troutMapState.backButton) { troutMapState.backButton.hidden = true; troutMapState.backButton.parentElement.hidden = true; }
    }
    updateMapStatus(matches, selectedPrefecture);
    renderMapExceptions(matches, selectedPrefecture, document.getElementById('areaTroutFacilities'));
  }

  function refreshRealMap() {
    if (!troutMapState?.map || !troutMapState.host.isConnected) return;
    troutMapState.map.invalidateSize(false);
    if (troutMapState.pendingBounds) {
      troutMapState.map.fitBounds(troutMapState.pendingBounds, { padding:[28,28], maxZoom: 9, animate:false });
      troutMapState.pendingBounds = null;
    }
  }

  function mountRealMap(facilities, getMatches, getSelectedPrefecture, onProvinceSelect, onProvinceReset, detailContainer) {
    const host = document.getElementById('areaTroutRealMap');
    if (!host) return;
    if (troutMapState?.map) {
      try { troutMapState.map.remove(); } catch (_) {}
      troutMapState = null;
    }
    if (typeof root.L === 'undefined') {
      host.innerHTML = '<p class="trout-real-map-unavailable">地図を読み込めませんでした。通信状態を確認してください。</p>';
      updateMapStatus(getMatches(), getSelectedPrefecture());
      return;
    }
    const map = root.L.map(host, { zoomControl:true, scrollWheelZoom:false, preferCanvas:true });
    root.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    const layer = root.L.layerGroup().addTo(map);
    const markers = new Map();
    const provinceMarkers = new Map();
    const byId = new Map(facilities.map((facility,index)=>[facility.id,{facility,index}]));
    Object.entries(AREA_TROUT_LOCATIONS.entries).forEach(([id,location]) => {
      const item = byId.get(id);
      if (!item || !mappedLocation(id)) return;
      const marker = root.L.marker([location.lat, location.lon], { icon:pinIcon(location), title:item.facility.name, keyboard:true });
      marker.bindPopup(markerPopup(item.facility,item.index,location), { closeButton:true, maxWidth:260, className:'mfl-trout-leaflet-popup' });
      markers.set(id, marker);
    });
    troutPrefectureOrder.forEach(pref => {
      const locations = facilities
        .filter(facility => facility.prefecture === pref)
        .map(facility => mappedLocation(facility.id))
        .filter(Boolean);
      if (!locations.length) return;
      const lat = locations.reduce((sum, loc) => sum + loc.lat, 0) / locations.length;
      const lon = locations.reduce((sum, loc) => sum + loc.lon, 0) / locations.length;
      const count = getMatches().filter(({facility}) => facility.prefecture === pref).length;
      const marker = root.L.marker([lat, lon], { icon:provinceIcon(pref, count), title:`${pref}の施設を表示`, keyboard:true, zIndexOffset:800 });
      marker.on('click', () => onProvinceSelect(pref, null));
      provinceMarkers.set(pref, marker);
    });
    const BackControl = root.L.Control.extend({
      options:{position:'topright'},
      onAdd(){
        const wrap = root.L.DomUtil.create('div','leaflet-bar trout-map-back-control-wrap');
        const button = root.L.DomUtil.create('button','trout-map-back-control',wrap);
        button.type='button';
        button.textContent='← 戻る';
        button.title='6県表示へ戻る';
        button.hidden=true;
        wrap.hidden=true;
        root.L.DomEvent.disableClickPropagation(wrap);
        root.L.DomEvent.on(button,'click',event=>{root.L.DomEvent.stop(event);onProvinceReset(button);});
        return wrap;
      }
    });
    const backControl = new BackControl().addTo(map);
    const backButton = backControl.getContainer()?.querySelector('.trout-map-back-control') || null;
    troutMapState = { map, host, layer, markers, provinceMarkers, backButton, pendingBounds:null };
    host.addEventListener('click', event => {
      const button = event.target.closest('[data-trout-map-detail-index]');
      if (!button) return;
      const index = Number(button.dataset.troutMapDetailIndex);
      const facility = facilities[index];
      if (facility) showDetail(facility, button, detailContainer);
    });
    const initial = getMatches();
    updateRealMap(initial, getSelectedPrefecture());
    fitMapToItems(facilities.map((facility,index)=>({facility,index})), {maxZoom:9});
    requestAnimationFrame(refreshRealMap);
  }

  function renderPrefectureMap(facilities, onSelect) {
    const host = document.getElementById('areaTroutPrefectureMap');
    const countHost = document.getElementById('areaTroutMapCount');
    if (!host) return;
    const counts = facilities.reduce((acc, f) => {
      const pref = text(f.prefecture) || 'その他';
      acc[pref] = (acc[pref] || 0) + 1;
      return acc;
    }, {});
    if (countHost) countHost.textContent = `${facilities.length} SPOTS`;
    const order = ['福島','群馬','栃木','茨城','埼玉','千葉'];
    host.innerHTML = order.filter(pref => counts[pref]).map(pref =>
      `<button type="button" class="trout-prefecture-map-cell" data-trout-map-prefecture="${escape(pref)}" aria-label="${escape(pref)} ${counts[pref]}施設を表示"><strong>${escape(pref)}</strong><span>${counts[pref]}施設</span></button>`
    ).join('');
    host.onclick = event => {
      const button = event.target.closest('[data-trout-map-prefecture]');
      if (!button) return;
      host.querySelectorAll('[data-trout-map-prefecture]').forEach(item => item.classList.toggle('is-active', item === button));
      onSelect(button.dataset.troutMapPrefecture, button);
    };
  }

  function mount(container, facilities) {
    const filterHost = document.getElementById('areaTroutFilters');
    const active = new Set(), expanded = new Set();
    let selectedPrefecture = null;
    const indexed = facilities.map((facility,index)=>({facility,index}));
    const prefectures = [...new Set(facilities.map(f=>f.prefecture))];
    function syncFilterUi(){
      if(!filterHost)return;
      const count=active.size;
      const setup=filterHost.querySelector('[data-trout-filter-settings]');
      const clear=filterHost.querySelector('[data-trout-clear]');
      if(setup){
        setup.textContent = count ? `フィルター設定（${count}）` : 'フィルター設定';
        setup.setAttribute('aria-label', count ? `フィルター設定。${count}件の条件を適用中` : 'フィルター設定');
      }
      if(clear){
        clear.disabled = count === 0;
        clear.setAttribute('aria-disabled', String(count === 0));
      }
    }
    function openFilterSheet(opener){
      const dialog=document.createElement('dialog');
      dialog.className='trout-filter-sheet';
      dialog.setAttribute('aria-labelledby','troutFilterTitle');
      dialog.innerHTML=`<header><div><h2 id="troutFilterTitle">フィルター設定</h2><p>施設の条件を選んで絞り込みます。</p></div><button type="button" class="trout-filter-close" autofocus aria-label="フィルター設定を閉じる">閉じる</button></header><div class="trout-filter-sheet-content"><div class="trout-filter-options" role="group" aria-label="施設の条件">${filterDefs.map(([id,label])=>`<button type="button" data-trout-filter="${id}" aria-pressed="${active.has(id)}">${escape(label)}</button>`).join('')}</div><p class="trout-filter-sheet-hint">条件は複数選択できます。</p></div>`;
      document.body.appendChild(dialog);
      const scrollY=window.scrollY;
      const saved={position:document.body.style.position,top:document.body.style.top,width:document.body.style.width,overflow:document.body.style.overflow};
      Object.assign(document.body.style,{position:'fixed',top:`-${scrollY}px`,width:'100%',overflow:'hidden'});
      let cleaned=false;
      const cleanup=()=>{if(cleaned)return;cleaned=true;Object.assign(document.body.style,saved);window.scrollTo(0,scrollY);dialog.remove();if(opener.isConnected)opener.focus({preventScroll:true});};
      dialog.addEventListener('close',cleanup,{once:true});
      dialog.querySelector('.trout-filter-close').onclick=()=>dialog.close();
      dialog.addEventListener('click',e=>{
        const button=e.target.closest('[data-trout-filter]');
        if(button){
          const id=button.dataset.troutFilter;
          active.has(id)?active.delete(id):active.add(id);
          button.setAttribute('aria-pressed',String(active.has(id)));
          syncFilterUi();
          renderGroups();
          return;
        }
        const r=dialog.getBoundingClientRect();
        if(e.target===dialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))dialog.close();
      });
      try{dialog.showModal();}catch(error){cleanup();throw error;}
    }
    if(filterHost){
      filterHost.innerHTML=`<div class="trout-filter-actions" role="group" aria-label="施設の絞り込み"><button type="button" class="trout-filter-settings" data-trout-filter-settings>フィルター設定</button><button type="button" class="trout-filter-clear" data-trout-clear>解除</button></div>`;
      filterHost.onclick=e=>{
        const settings=e.target.closest('[data-trout-filter-settings]');
        if(settings){openFilterSheet(settings);return;}
        const clear=e.target.closest('[data-trout-clear]');
        if(clear&&!clear.disabled){active.clear();syncFilterUi();renderGroups();}
      };
      syncFilterUi();
    }
    function currentMatches(){
      return indexed.filter(({facility})=>filterDefs.every(([id,,test])=>!active.has(id)||test(facility)));
    }
    function renderMapResults(){
      const host = document.getElementById('areaTroutMapResults');
      if (!host) return;
      if (!selectedPrefecture){
        host.hidden = true;
        host.innerHTML = '';
        return;
      }
      const items = currentMatches().filter(({facility})=>facility.prefecture===selectedPrefecture);
      host.hidden = false;
      host.innerHTML = `<div class="trout-map-results-head"><div><p class="eyebrow">SELECTED AREA</p><h3>${escape(selectedPrefecture)}</h3><p class="trout-map-results-count" role="status" aria-live="polite"><strong>${items.length}</strong><span>施設</span></p></div><button type="button" class="trout-map-results-close" data-trout-map-close aria-label="県から探す結果を閉じる">閉じる</button></div>${items.length ? `<ul class="trout-facility-list trout-map-results-list">${items.map(({facility,index})=>renderCard(facility,index)).join('')}</ul>` : '<p class="trout-map-results-empty">条件に一致する施設はありません。</p>'}`;
    }
    function renderGroups(){
      const matches=currentMatches();
      updateRealMap(matches, selectedPrefecture);
      const visibleCounts=matches.reduce((acc,{facility})=>{
        const pref=text(facility.prefecture)||'その他';
        acc[pref]=(acc[pref]||0)+1;
        return acc;
      },{});
      document.querySelectorAll('#areaTroutPrefectureMap [data-trout-map-prefecture]').forEach(button=>{
        const pref=button.dataset.troutMapPrefecture;
        const count=visibleCounts[pref]||0;
        const countLabel=button.querySelector('span');
        if(countLabel)countLabel.textContent=`${count}施設`;
        button.setAttribute('aria-label',`${pref} ${count}施設を表示`);
      });
      renderMapResults();
      container.innerHTML=`<div class="trout-facility-list-heading"><h3 id="areaTroutFacilitiesTitle">管理釣り場</h3><span role="status" aria-live="polite">${matches.length} / ${facilities.length}施設</span></div><div class="trout-prefectures"></div>${matches.length?'':'<p class="trout-no-results" role="status">該当施設なし。条件を減らしてお試しください。</p>'}`;
      const groups=container.querySelector('.trout-prefectures');
      prefectures.forEach((pref,prefIndex)=>{
        const items=matches.filter(({facility})=>facility.prefecture===pref);if(!items.length)return;
        const group=document.createElement('details');group.className='trout-prefecture';group.dataset.prefecture=pref;
        group.innerHTML=`<summary><span>${escape(pref)}</span><span class="trout-prefecture-count">${items.length}施設</span></summary><ul class="trout-facility-list"></ul>`;
        let rendered=false;const populate=()=>{if(rendered)return;group.querySelector('ul').innerHTML=items.map(({facility,index})=>renderCard(facility,index)).join('');rendered=true;};
        group.open=expanded.has(pref);if(group.open)populate();
        group.addEventListener('toggle',()=>{if(!group.isConnected)return;if(group.open){expanded.add(pref);populate();}else expanded.delete(pref);});groups.appendChild(group);
      });
    }
    function selectPrefecture(prefecture, sourceButton){
      selectedPrefecture = prefecture;
      document.querySelectorAll('#areaTroutPrefectureMap [data-trout-map-prefecture]').forEach(item=>{
        item.classList.toggle('is-active', item.dataset.troutMapPrefecture === prefecture);
      });
      const provinceItems = currentMatches().filter(({facility})=>facility.prefecture===prefecture);
      updateRealMap(currentMatches(), selectedPrefecture);
      fitMapToItems(provinceItems, {maxZoom:11});
      renderMapResults();
      const results = document.getElementById('areaTroutMapResults');
      if (sourceButton) requestAnimationFrame(() => results?.scrollIntoView({behavior:'smooth', block:'start'}));
      return true;
    }
    function resetPrefectureSelection(sourceButton){
      selectedPrefecture = null;
      document.querySelectorAll('#areaTroutPrefectureMap [data-trout-map-prefecture]').forEach(item=>item.classList.remove('is-active'));
      renderMapResults();
      updateRealMap(currentMatches(), null);
      fitMapToItems(indexed, {maxZoom:9});
      return true;
    }
    renderPrefectureMap(facilities, selectPrefecture);
    mountRealMap(facilities, currentMatches, ()=>selectedPrefecture, selectPrefecture, resetPrefectureSelection, container);
    document.getElementById('areaTroutMapResults')?.addEventListener('click', e=>{
      const close=e.target.closest('[data-trout-map-close]');
      if(close){
        resetPrefectureSelection(close);
        document.getElementById('areaTroutPrefectureMap')?.scrollIntoView({behavior:'smooth',block:'center'});
        return;
      }
      const button=e.target.closest('[data-trout-index]');
      if(button)showDetail(facilities[Number(button.dataset.troutIndex)],button,container);
    });
    container.onclick=e=>{const button=e.target.closest('[data-trout-index]');if(button)showDetail(facilities[Number(button.dataset.troutIndex)],button,container);};
    renderGroups();
  }

  function mountMaster(container) {
    if (AREA_TROUT_MASTER.version !== '2026-09-21-draft9' || AREA_TROUT_MASTER.count !== 48 || AREA_TROUT_MASTER.spots.length !== 48 || new Set(AREA_TROUT_MASTER.spots.map(spot => spot.id)).size !== 48) {
      container.textContent = '施設一覧を読み込めませんでした。ページを再読み込みしてください。';
      return;
    }
    mount(container, AREA_TROUT_MASTER.spots);
  }
  root.MFLTroutCards = {mount, mountMaster, refreshMap: refreshRealMap};
  const container = document.getElementById('areaTroutFacilities');
  if (container) mountMaster(container);
})(typeof window === 'undefined' ? globalThis : window);

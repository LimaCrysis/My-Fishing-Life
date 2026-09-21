import { AREA_TROUT_MASTER } from '../data/area-trout-spots.js';
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
    const rows = [
      ['持ち帰り',cardModel(f).keep],['キープ条件',f.keepLimit],['大型魚ルール',f.largeFishRule],
      ['料金方式',pricing[f.keepPricingType] || f.keepPricingType],['追加料金',f.keepExtraFee],
      ['レンタル',bool(f.rentalAvailable)],['捌き場',bool(f.cleaningAvailable)],['捌きサービス',bool(f.cleaningService)],
      ['持ち帰りサポート',f.takeHomeSupport],['現地調理',bool(f.cookOnSite)],['キャンプ',bool(f.camping)],
      ['競技色',f.competitionStrong === true ? '競技色強め' : f.competitionStrong === false ? '競技色強めには該当しない' : null],
      ['季節営業',({winter:'冬季限定',seasonal:'季節営業',limited_season:'期間限定営業'})[f.seasonal] || f.seasonal]
    ].filter(([,v]) => v !== null && v !== undefined && v !== '');
    const tags = unique(values(f.tags).filter(t => !t.includes('要確認')));
    dialog.innerHTML = `<header><div><h2 id="troutDetailTitle">${escape(f.name)}</h2><p>${escape(f.prefecture)}</p></div><button type="button" class="trout-detail-close" autofocus aria-label="施設詳細を閉じる">閉じる</button></header><div class="trout-detail-content">${tags.length ? `<ul class="trout-detail-tags">${tags.map(t=>`<li>${escape(t)}</li>`).join('')}</ul>` : ''}<dl>${rows.map(([k,v])=>`<div><dt>${escape(k)}</dt><dd>${escape(v)}</dd></div>`).join('')}</dl>${notices(f).length ? `<aside aria-label="確認しておきたいこと"><ul>${notices(f).map(n=>`<li>${escape(n)}</li>`).join('')}</ul></aside>` : ''}${text(f.notes) ? `<section><h3>施設メモ</h3><p>${escape(f.notes)}</p></section>` : ''}</div>`;
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
  function mount(container, facilities) {
    const filterHost = document.getElementById('areaTroutFilters');
    const active = new Set(), expanded = new Set();
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
    function renderGroups(){
      const matches=indexed.filter(({facility})=>filterDefs.every(([id,,test])=>!active.has(id)||test(facility)));
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
  root.MFLTroutCards = {mount, mountMaster};
  const container = document.getElementById('areaTroutFacilities');
  if (container) mountMaster(container);
})(typeof window === 'undefined' ? globalThis : window);

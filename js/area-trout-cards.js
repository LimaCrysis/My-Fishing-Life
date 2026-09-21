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
      ...(facility.seasonal === true ? ['季節営業'] : [])
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
      <p class="trout-facility-feedback" role="status" hidden></p>
    </article></li>`;
  }
  function mount(container, facilities) {
    if (!Array.isArray(facilities)) throw new TypeError('施設マスターは配列で指定してください');
    if (facilities.some(f => !f || !text(f.name))) throw new TypeError('施設名のないデータがあります');
    const cards = facilities.map(renderCard).join('');
    container.innerHTML = `<div class="trout-facility-list-heading"><h3 id="areaTroutFacilitiesTitle">管理釣り場</h3><span>${facilities.length}施設</span></div><ul class="trout-facility-list">${cards}</ul>`;
    container.querySelectorAll('[data-trout-index]').forEach(button => button.addEventListener('click', () => {
      const facility = facilities[Number(button.dataset.troutIndex)];
      const event = new CustomEvent('mfl:trout-detail-request', {bubbles:true, cancelable:true, detail:{facility}});
      if (container.dispatchEvent(event)) {
        const feedback = button.nextElementSibling;
        feedback.textContent = '詳細表示は準備中です。';
        feedback.hidden = false;
      }
    }));
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

/* MFL Conditions Map usability layer v14.9.1 */
(function(){
  'use strict';
  const order={great:0,good:1,careful:2,stop:3},dayKey='mfl_conditions_day_v1';
  function selectedDate(){const offset=Math.max(0,Math.min(6,Number(localStorage.getItem(dayKey)||0))),date=new Date();date.setDate(date.getDate()+offset);const days=['日','月','火','水','木','金','土'];return`${offset===0?'今日 ':''}${date.getMonth()+1}/${date.getDate()}（${days[date.getDay()]}）`}
  function rankOf(button){const badge=button.querySelector('.cm-list-rank');return Object.keys(order).find(name=>badge?.classList.contains(name))||'stop'}
  function enhance(list){
    if(list.dataset.enhanced)return;list.dataset.enhanced='true';
    const buttons=[...list.querySelectorAll(':scope > button[data-condition-spot]')];
    buttons.sort((a,b)=>order[rankOf(a)]-order[rankOf(b)]||a.textContent.localeCompare(b.textContent,'ja')).forEach(button=>list.appendChild(button));
    const candidates=buttons.filter(button=>['great','good'].includes(rankOf(button))).slice(0,3),panel=document.createElement('section');
    panel.className='cm-finder';panel.innerHTML=`<div class="cm-finder-head"><div><small>SELECTED DAY</small><strong>${selectedDate()}</strong></div><span>${buttons.length}地点</span></div><div class="cm-candidates"><small>先に確認する候補</small><div>${candidates.length?candidates.map(button=>`<button data-jump-spot="${button.dataset.conditionSpot}" class="${rankOf(button)}"><b>${button.querySelector('.cm-list-rank').textContent}</b>${button.querySelector('strong').textContent}</button>`).join(''):'<span>現在、◎・○の候補はありません</span>'}</div></div><p>一覧は安全判定順です。釣り場を押すと、その場所のすぐ下に詳細を表示します。</p>`;list.before(panel);
    panel.querySelectorAll('[data-jump-spot]').forEach(shortcut=>shortcut.addEventListener('click',()=>buttons.find(button=>button.dataset.conditionSpot===shortcut.dataset.jumpSpot)?.click()));
    const moveDetail=()=>{const selected=buttons.find(button=>button.classList.contains('selected')),detail=list.parentElement.querySelector('.conditions-map-detail');if(!selected||!detail)return;selected.after(detail);requestAnimationFrame(()=>selected.scrollIntoView({behavior:'smooth',block:'start'}))};
    buttons.forEach(button=>button.addEventListener('click',()=>setTimeout(moveDetail,0)));
    new MutationObserver(moveDetail).observe(list,{attributes:true,subtree:true,attributeFilter:['class']});
  }
  function scan(){document.querySelectorAll('.conditions-spot-list').forEach(enhance)}
  new MutationObserver(scan).observe(document.documentElement,{childList:true,subtree:true});if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',scan);else scan();
})();

/* MFL Conditions Map usability layer v14.9.0 */
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
    panel.className='cm-finder';panel.innerHTML=`<div class="cm-finder-head"><div><small>SELECTED DAY</small><strong>${selectedDate()}</strong></div><span>${buttons.length}地点</span></div><label class="cm-search"><span>🔎</span><input type="search" inputmode="search" placeholder="釣り場名で絞り込み" aria-label="コンディション釣り場検索"></label><div class="cm-candidates"><small>先に確認する候補</small><div>${candidates.length?candidates.map(button=>`<button data-jump-spot="${button.dataset.conditionSpot}" class="${rankOf(button)}"><b>${button.querySelector('.cm-list-rank').textContent}</b>${button.querySelector('strong').textContent}</button>`).join(''):'<span>現在、◎・○の候補はありません</span>'}</div></div><p>一覧は安全判定順です。同じ判定内では名称順に表示します。</p>`;list.before(panel);
    const input=panel.querySelector('input');input.addEventListener('input',()=>{const query=input.value.trim().toLocaleLowerCase('ja');let visible=0;buttons.forEach(button=>{const show=!query||button.textContent.toLocaleLowerCase('ja').includes(query);button.hidden=!show;if(show)visible++});panel.querySelector('.cm-finder-head span').textContent=`${visible}/${buttons.length}地点`});
    panel.querySelectorAll('[data-jump-spot]').forEach(shortcut=>shortcut.addEventListener('click',()=>buttons.find(button=>button.dataset.conditionSpot===shortcut.dataset.jumpSpot)?.click()));
  }
  function scan(){document.querySelectorAll('.conditions-spot-list').forEach(enhance)}
  new MutationObserver(scan).observe(document.documentElement,{childList:true,subtree:true});if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',scan);else scan();
})();

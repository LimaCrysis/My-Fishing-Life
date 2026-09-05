/* MFL fishing spot restrictions v1.0 */
(function(){
  'use strict';
  const TYPES=new Set(['full_day','time_window','seasonal','partial_area']);
  const minutes=value=>{const match=/^(\d{1,2}):(\d{2})$/.exec(String(value||''));return match?Number(match[1])*60+Number(match[2]):null};
  const inWindow=(hour,window)=>{const start=minutes(window.start),end=minutes(window.end),value=hour*60;if(start===null||end===null)return false;return start<end?value>=start&&value<end:value>=start||value<end};
  const dateParts=date=>{const [year,month,day]=String(date||'').split('-').map(Number);return{year,month,day,date:new Date(`${date}T00:00:00+09:00`)}};
  function validate(input){
    const clean={version:input?.version||'0',updated:input?.updated||'',holidayDates:Array.isArray(input?.holidayDates)?input.holidayDates:[],spots:{}};
    Object.entries(input?.spots||{}).forEach(([spotId,items])=>{clean.spots[spotId]=(Array.isArray(items)?items:[]).filter(item=>item&&item.id&&TYPES.has(item.type)&&['whole_spot','partial_area'].includes(item.scope)&&item.source).map(item=>({...item}))});
    return clean;
  }
  function scheduled(item,date,hour,holidays){
    const parts=dateParts(date),monthMatch=!item.months||item.months.includes(parts.month),dayMatch=!item.daysOfWeek||item.daysOfWeek.includes(parts.date.getDay()),holidayMatch=item.publicHolidays&&holidays.has(date);
    if(!monthMatch)return false;
    if(item.type==='full_day')return dayMatch||holidayMatch;
    if(item.daysOfWeek&&!dayMatch&&!holidayMatch)return false;
    if(item.type==='time_window'||item.type==='seasonal')return item.blocked?.length?item.blocked.some(window=>inWindow(hour,window)):true;
    return item.type==='partial_area';
  }
  function evaluate(config,spotId,date,hour){
    const holidays=new Set(config?.holidayDates||[]),items=(config?.spots?.[spotId]||[]).filter(item=>scheduled(item,date,hour,holidays)),blocking=items.filter(item=>item.scope==='whole_spot'),advisories=items.filter(item=>item.scope==='partial_area');
    return{hardStop:blocking.length>0,label:blocking[0]?.label||advisories[0]?.label||'',reason:blocking[0]?.reason||advisories[0]?.reason||'',blocking,advisories,active:items};
  }
  window.MFLForecastRestrictions={TYPES,minutes,inWindow,validate,evaluate};
})();

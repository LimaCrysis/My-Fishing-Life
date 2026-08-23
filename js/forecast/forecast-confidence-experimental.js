/* MFL model-specific confidence v2 experimental */
(function(){
  'use strict';
  const VERSION='2.0.0-experimental',rank={low:0,medium:1,high:2};
  const daysBetween=(from,to)=>{const value=(new Date(`${to}T00:00:00Z`)-new Date(`${from}T00:00:00Z`))/86400000;return Number.isFinite(value)?Math.max(0,value):null};
  function evaluate(evidence={},date,fieldFeedback=[]){
    const samples=Number(evidence.sampleCount||0),sources=Number(evidence.traceableSourceCount??evidence.sourceCount??0),hourly=Boolean(evidence.hourlyEvidence),multiDays=Number(evidence.multiDayCount||0),modelSpecific=evidence.modelSpecific!==false,age=evidence.lastUpdated?daysBetween(evidence.lastUpdated,date):null,span=evidence.dateRange?.from&&evidence.dateRange?.to?daysBetween(evidence.dateRange.from,evidence.dateRange.to):0,sourceQuality=evidence.sourceQuality||'supporting';let points=0,signals=[];
    if(samples>=12){points+=3;signals.push('十分なモデル別標本')}else if(samples>=6){points+=2;signals.push('複数のモデル別標本')}else if(samples>=3){points+=1;signals.push('限定的なモデル別標本')}else signals.push('モデル別標本不足');
    if(sources>=3){points+=3;signals.push('3以上の独立source')}else if(sources>=2){points+=2;signals.push('複数の独立source')}else if(sources===1){points+=1;signals.push('単一source')}else signals.push('追跡可能なsourceなし');
    if(hourly){points+=2;signals.push('時刻付き実績あり')}else signals.push('時刻付き実績なし');
    if(multiDays>=7){points+=2;signals.push('複数日で再現')}else if(multiDays>=3){points+=1;signals.push('複数日実績')}else signals.push('複数日再現が不足');
    if(age!==null&&age<=30){points+=2;signals.push('30日以内')}else if(age!==null&&age<=90){points+=1;signals.push('90日以内')}else if(age!==null&&age>365){points-=2;signals.push('1年以上経過')}else if(age===null)signals.push('更新日不明');
    if(span>=7)points+=1;if(evidence.seasonalEvidence)points+=1;if(sourceQuality==='official')points+=1;
    const catches=fieldFeedback.filter(item=>item.type==='catch'&&item.speciesConfirmed),activity=fieldFeedback.filter(item=>['bite','surfaceActivity','nuisanceFish'].includes(item.type));if(catches.length){points+=1;signals.push('実釣catchあり')}else if(activity.length)signals.push('実釣反応あり（catch以外）');
    let value='low';const medium=points>=7&&samples>=3&&sources>=1&&multiDays>=2&&age!==null&&age<=180&&modelSpecific;const high=points>=13&&samples>=10&&sources>=2&&hourly&&multiDays>=5&&age!==null&&age<=90&&modelSpecific&&sourceQuality==='official';if(high)value='high';else if(medium)value='medium';
    return{value,rank:rank[value],points,signals,inputs:{sampleCount:samples,sourceCount:sources,hourlyEvidence:hourly,multiDayCount:multiDays,lastUpdated:evidence.lastUpdated||null,ageDays:age,dateRange:evidence.dateRange||null,modelSpecific,sourceQuality,fieldCatchCount:catches.length,fieldActivityCount:activity.length}};
  }
  function evidenceFor(catalog,spotId,group){const spot=catalog?.spots?.[spotId],evidence=spot?.models?.[group];if(!evidence)return null;const traceableSourceCount=(spot.sources||[]).filter(source=>source.url).length;return{...evidence,traceableSourceCount:Math.min(Number(evidence.sourceCount||0),traceableSourceCount)}}
  window.MFLForecastConfidenceExperimental={VERSION,evaluate,evidenceFor};
})();

'use strict';
const fs=require('fs'),path=require('path'),vm=require('vm'),root=path.resolve(__dirname,'..');global.window=global;
vm.runInThisContext(fs.readFileSync(path.join(root,'js/forecast/species-presence-shadow-analysis.js'),'utf8'),{filename:'species-presence-shadow-analysis.js'});
const read=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
const input=read('data/species-presence-shadow-phase7-report.json'),performanceRecords=read('data/fishing-performance-records.json');
const report=MFLSpeciesPresenceShadowAnalysis.analyze(input,{performanceRecords});
const output=path.join(root,'data/species-presence-shadow-phase8-summary.json');
fs.writeFileSync(output,JSON.stringify(report,null,2)+'\n');
process.stdout.write(JSON.stringify({output,overall:report.overall,clamp:report.clamp,scoreTransitions:report.scoreTransitions.counts,fallback:report.fallback,empiricalValidation:report.empiricalValidation},null,2));

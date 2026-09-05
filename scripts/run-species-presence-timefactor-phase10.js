'use strict';
const fs=require('fs'),path=require('path'),vm=require('vm'),root=path.resolve(__dirname,'..');global.window=global;
for(const file of['species-presence-integration-experiment.js','species-presence-timefactor-experiment.js'])vm.runInThisContext(fs.readFileSync(path.join(root,'js/forecast',file),'utf8'),{filename:file});
const read=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8')),phase7=read('data/species-presence-shadow-phase7-report.json'),phase9=read('data/species-presence-integration-phase9-report.json');
const report=MFLSpeciesPresenceTimeFactorExperiment.analyze(phase7,phase9),output=path.join(root,'data/species-presence-timefactor-phase10-report.json');fs.writeFileSync(output,JSON.stringify(report,null,2)+'\n');
process.stdout.write(JSON.stringify({output,parity:report.parity,overall:report.overall,transitions:report.transitions,largeJumps:report.largeJumps,peakChanges:report.peakChanges,evaluation:report.evaluation},null,2));

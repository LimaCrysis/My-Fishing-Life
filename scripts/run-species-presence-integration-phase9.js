'use strict';
const fs=require('fs'),path=require('path'),vm=require('vm'),root=path.resolve(__dirname,'..');global.window=global;
vm.runInThisContext(fs.readFileSync(path.join(root,'js/forecast/species-presence-integration-experiment.js'),'utf8'),{filename:'species-presence-integration-experiment.js'});
const input=JSON.parse(fs.readFileSync(path.join(root,'data/species-presence-shadow-phase7-report.json'),'utf8'));
const report=MFLSpeciesPresenceIntegrationExperiment.analyze(input),output=path.join(root,'data/species-presence-integration-phase9-report.json');
fs.writeFileSync(output,JSON.stringify(report,null,2)+'\n');
process.stdout.write(JSON.stringify({output,phase7Parity:report.phase7Parity,overall:report.overall,transitions:report.transitions,largeJumps:report.largeJumps,peakChanges:report.peakChanges,evaluation:report.evaluation},null,2));

const CACHE='my-fishing-life-v14.0.5';
const ASSETS=['./','./index.html','./css/styles.css','./js/app.js','./manifest.webmanifest',
'./assets/fish/kisu.jpg','./assets/fish/seabass.jpg','./assets/fish/aji.jpg','./assets/fish/saba.jpg','./assets/fish/kasago.jpg','./assets/fish/aigo.jpg','./assets/fish/haokoze.jpg','./assets/fish/gonzui.jpg','./assets/fish/mahaze.jpg','./assets/fish/hirame.jpg',
'./assets/knots/uni-01.png','./assets/knots/uni-02.png','./assets/knots/uni-03.png','./assets/knots/uni-04.png','./assets/knots/uni-05.png','./assets/knots/uni-06.png',
'./assets/knots/clinch-01.png','./assets/knots/clinch-02.png','./assets/knots/clinch-03.png','./assets/knots/clinch-04.png','./assets/knots/clinch-05.png',
'./assets/knots/train-01.png','./assets/knots/train-02.png','./assets/knots/train-03.png','./assets/knots/train-04.png','./assets/knots/train-05.png','./data/official-sources.json','./data/tides-2026.json','./data/kanto-research-master.json','./data/map-research-archive.json','./data/fish-photo-sources.json'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request)))});

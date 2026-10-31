import assert from'node:assert/strict';
import{serveSlideList}from'../src/slide-source.js';
const calls=[],env={QURAN_ASSETS:{list:async({prefix,cursor})=>{calls.push(prefix);return cursor?{objects:[{key:prefix+'001-al-fatihah-02.webp'}],truncated:false}:{objects:[{key:prefix+'001-al-fatihah-10.webp'},{key:prefix+'001-al-fatihah-01.webp'},{key:prefix+'manifest.json'},{key:prefix+'junk.webp'}],truncated:true,cursor:'next'}}}};
const r=await serveSlideList(new Request('https://example.com/api/surah-slides/001/al-fatihah/ta'),env),d=await r.json();assert.equal(r.status,200);assert.deepEqual(d.files.map(f=>f.number),[1,2,10]);assert.equal(d.slides,3);assert.ok(calls.every(c=>c==='surahs/001-al-fatihah/ta/'));assert.equal(r.headers.get('Cache-Control'),'no-store');
assert.equal((await serveSlideList(new Request('https://example.com/api/surah-slides/001/wrong/ta'),env)).status,400);
const empty=await serveSlideList(new Request('https://example.com/api/surah-slides/002/al-baqarah/ta'),{QURAN_ASSETS:{list:async()=>({objects:[],truncated:false})}});assert.equal((await empty.json()).slides,0);
const down=await serveSlideList(new Request('https://example.com/api/surah-slides/001/al-fatihah/en'),{QURAN_ASSETS:{list:async()=>{throw Error()}}});assert.equal(down.status,502);
console.log('Slide discovery: language folder isolation, numeric order, pagination, manifest-free uploads, empty/error states passed.');

// Insert an out-of-sequence filename without changing any existing slide identity.
const prefix='surahs/002-al-baqarah/en/';
const manifest={language:'en',slides:234,files:[{slide:124,file:'002-al-baqarah-124.webp'},{slide:124.2,file:'002-al-baqarah-1244.webp'},{slide:125,file:'002-al-baqarah-125.webp'},{slide:126,file:'002-al-baqarah-126.webp'}]};
const bucket={list:async()=>({objects:[124,125,1244,127].map(n=>({key:prefix+`002-al-baqarah-${n}.webp`})),truncated:false}),get:async key=>key===prefix+'manifest.json'?{json:async()=>manifest}:null};
const list=async b=>(await serveSlideList(new Request('https://example.com/api/surah-slides/002/al-baqarah/en'),{QURAN_ASSETS:b})).json();
assert.deepEqual((await list(bucket)).files.map(f=>f.number),[124,1244,125,127]);
assert.equal((await list(bucket)).slides,4); // Stale count ignored; missing files excluded, unlisted uploads retained.
assert.deepEqual((await list({...bucket,get:async()=>({json:async()=>{throw Error('bad JSON')}})})).files.map(f=>f.number),[124,125,127,1244]);
assert.deepEqual((await list({...bucket,get:async()=>({json:async()=>({...manifest,language:'ta'})})})).files.map(f=>f.number),[124,125,127,1244]);
assert.deepEqual((await list({...bucket,get:async key=>key==='surahs/002-al-baqarah/manifest.json'?{json:async()=>manifest}:null})).files.map(f=>f.number),[124,1244,125,127]);
console.log('Manifest insertion ordering, stable IDs, stale counts, missing/unlisted files, malformed fallback and language isolation passed.');

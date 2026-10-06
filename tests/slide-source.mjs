import assert from'node:assert/strict';
import{serveSlideList}from'../src/slide-source.js';
const calls=[],env={QURAN_ASSETS:{list:async({prefix,cursor})=>{calls.push(prefix);return cursor?{objects:[{key:prefix+'001-al-fatihah-02.webp'}],truncated:false}:{objects:[{key:prefix+'001-al-fatihah-10.webp'},{key:prefix+'001-al-fatihah-01.webp'},{key:prefix+'manifest.json'},{key:prefix+'junk.webp'}],truncated:true,cursor:'next'}}}};
const r=await serveSlideList(new Request('https://example.com/api/surah-slides/001/al-fatihah/ta'),env),d=await r.json();assert.equal(r.status,200);assert.deepEqual(d.files.map(f=>f.number),[1,2,10]);assert.equal(d.slides,3);assert.ok(calls.every(c=>c==='surahs/001-al-fatihah/ta/'));assert.equal(r.headers.get('Cache-Control'),'no-store');
assert.equal((await serveSlideList(new Request('https://example.com/api/surah-slides/001/wrong/ta'),env)).status,400);
const empty=await serveSlideList(new Request('https://example.com/api/surah-slides/002/al-baqarah/ta'),{QURAN_ASSETS:{list:async()=>({objects:[],truncated:false})}});assert.equal((await empty.json()).slides,0);
const down=await serveSlideList(new Request('https://example.com/api/surah-slides/001/al-fatihah/en'),{QURAN_ASSETS:{list:async()=>{throw Error()}}});assert.equal(down.status,502);
console.log('Slide discovery: language folder isolation, numeric order, pagination, manifest-free uploads, empty/error states passed.');

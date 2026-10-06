import assert from'node:assert/strict';
import{readFileSync,existsSync}from'node:fs';
import{gunzipSync}from'node:zlib';
import{indexVerses,searchQuran,normalize}from'../src/quran-search-engine.js';
assert.equal(normalize('Ramadān'),'ramadan');assert.equal(normalize('رَمَضَان'),'رمضان');assert.equal(normalize('நோன்பு'),'நோன்பு');
for(const lang of ['en','ta']){
 const path=`public/search/quran-${lang}.json.gz`;assert.ok(existsSync(path),'Corpus must be generated');
 const d=JSON.parse(gunzipSync(readFileSync(path))),index=indexVerses(d.verses);assert.equal(index.length,6236);assert.equal(new Set(index.map(v=>`${v.surah}:${v.verse}`)).size,6236);
 const ramadan=searchQuran(index,'Ramadan');assert.ok(ramadan.results.some(v=>v.surah===2&&v.verse===185));for(let v=183;v<=187;v++)assert.ok(ramadan.results.some(r=>r.surah===2&&r.verse===v));
 const ref=searchQuran(index,'2:185');assert.equal(ref.results.length,1);assert.equal(ref.results[0].verse,185);
 assert.ok(searchQuran(index,'رَمَضَان',{related:false}).results.some(v=>v.surah===2&&v.verse===185));
 assert.equal(searchQuran(index,'zzzzunmatchedkeyword').results.length,0);assert.equal(searchQuran(index,'').results.length,0);
 assert.ok(searchQuran(index,'Ramadan',{surah:2}).results.every(v=>v.surah===2));
 if(lang==='en'){const literal=searchQuran(index,'Ramadan',{related:false});assert.ok(literal.results.length>0);assert.ok(literal.results.every(v=>v.match==='Exact match'));console.log('Ramadan:',literal.results.map(v=>`${v.surah}:${v.verse}`).join(', '),'exact;',ramadan.results.length,'including related');}
 if(lang==='ta')assert.ok(searchQuran(index,'நோன்பு').results.length>0);
}
console.log('Complete English/Tamil corpus, references, Arabic normalization, Ramadan expansion, filters and empty states passed.');

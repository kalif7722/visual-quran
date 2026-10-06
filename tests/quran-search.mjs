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

const en=JSON.parse(gunzipSync(readFileSync('public/search/quran-en.json.gz'))).verses,ta=JSON.parse(gunzipSync(readFileSync('public/search/quran-ta.json.gz'))).verses;
const ei=indexVerses(en,ta),ti=indexVerses(ta,en);
for(const query of ['firaun','firawn','pharaoh','pharoah','Musa','mercy','parents','Ramadan','நோன்பு','பெற்றோர்','ஃபிர்அவ்ன்','பொறுமை','அல்லாஹ்']){
 const a=searchQuran(ei,query).results,b=searchQuran(ti,query).results;
 assert.ok(a.length>0,query+' must find results');assert.deepEqual(a.map(v=>`${v.surah}:${v.verse}`).sort(),b.map(v=>`${v.surah}:${v.verse}`).sort(),query+' language parity');
 console.log(query,a.length,'verses in both display languages');
}
assert.ok(searchQuran(ti,'mercy',{related:false}).results.some(v=>v.match==='Cross-language match'));

import assert from'node:assert/strict';
import{serveVerseChapter}from'../src/verse-source.js';
import{surahs}from'../src/data.js';
import{themes,stories}from'../src/learning-data.js';
const chapterNumbers=new Set([...themes.flatMap(t=>t.passages.map(p=>p.surah)),...stories.map(s=>s.surah)]);
for(const language of ['en','ta'])for(const number of chapterNumbers){
 const s=surahs.find(s=>s.number===number),calls=[];
 const fetchSource=async url=>{calls.push(url);return Response.json(url.includes('/list/')?{translations:[{key:language==='ta'?'tamil_baqavi':'english_rwwad',title:'Rowwad Translation Center',version:'1.0.19'}]}:{result:Array.from({length:s.ayahs},(_,i)=>({sura:number,aya:i+1,arabic_text:'نص عربي',translation:`Verse ${i+1}`,footnotes:i===0?'Source note':''}))})};
 const response=await serveVerseChapter(new Request(`https://example.com/api/theme-verses/${number}?lang=${language}`),{fetchSource,cache:null});assert.equal(response.status,200);const data=await response.json();assert.equal(data.verses.length,s.ayahs);assert.equal(data.source.version,'1.0.19');assert.equal(data.verses[0].footnotes,'Source note');assert.equal(calls.length,2);
 for(const p of themes.flatMap(t=>t.passages).filter(p=>p.surah===number)){const[a,b=a]=p.verses.split('-').map(Number);assert.equal(data.verses.filter(v=>v.verse>=a&&v.verse<=b).length,b-a+1)}
}
assert.equal((await serveVerseChapter(new Request('https://example.com/api/theme-verses/999'),{cache:null})).status,400);
assert.equal((await serveVerseChapter(new Request('https://example.com/api/theme-verses/1'),{cache:null,fetchSource:async()=>{throw Error('offline')}})).status,502);
assert.equal((await serveVerseChapter(new Request('https://example.com/api/theme-verses/1'),{cache:null,fetchSource:async()=>Response.json({result:[]})})).status,502);
console.log(`All ${chapterNumbers.size} referenced chapters and 48 theme ranges passed; invalid, unavailable and incomplete sources handled.`);

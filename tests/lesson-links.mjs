import assert from 'node:assert/strict';
import {lessonLinks,verseTarget,visualTarget} from '../src/lesson-links.js';
assert.equal(lessonLinks('5:8').wordByWord,'/word-by-word?surah=5&lang=en&verse=8');
assert.match(lessonLinks('12:89-92').visual,/verse=89&endVerse=92/);
assert.equal(lessonLinks('115:1'),null);
assert.equal(lessonLinks('1:8'),null);
for(const search of ['','verse=0','verse=-1','verse=1.5','verse=999','verse=no'])assert.equal(verseTarget(search,7),null);
assert.deepEqual(verseTarget('verse=3&endVerse=7',7),{start:3,end:7});
assert.deepEqual(verseTarget('verse=3&endVerse=2',7),{start:3,end:3});
assert.equal(visualTarget(5,8),null);
assert.equal(visualTarget(2,201).precision,'section');
assert.equal(visualTarget(2,201).number,164);
assert.equal(visualTarget(2,201,'ta'),null);
console.log('Lesson deep links: verse/range bounds, reader URLs and visual mapping precision passed.');

const {default:mappings}=await import('../src/lesson-slide-map.json',{with:{type:'json'}});
assert.equal(Object.keys(mappings).length,21);
for(const [id,item] of Object.entries(mappings)){
 const links=lessonLinks(item.reference,'en',id);
 assert.deepEqual(links.slides,item.slides);
 assert.equal(new URL(links.visual,'https://example.test').searchParams.get('slide'),String(item.slides[0]));
 assert.equal(links.visualMapping.precision,'lesson');
 assert.deepEqual(lessonLinks(item.reference,'ta',id).slides,[]);
}
assert.deepEqual(lessonLinks('83:1-6','en','QL-008').slides,[2,3]);
console.log('All 21 user mappings, multi-slide lesson and Tamil mapping isolation passed.');

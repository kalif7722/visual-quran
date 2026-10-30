import lessonSlideMap from './lesson-slide-map.json' with {type:'json'};
import {surahs} from './data.js';
import {baqarahSections} from './baqarah-map.js';

export function verseTarget(search,maxVerse){
 const params=new URLSearchParams(search);
 const start=Number(params.get('verse')),rawEnd=params.get('endVerse');
 if(!Number.isInteger(start)||start<1||start>maxVerse)return null;
 const end=Number(rawEnd||start);
 return {start,end:Number.isInteger(end)&&end>=start&&end<=maxVerse?end:start};
}

// Add entries only after checking the actual artwork. Keys are language:surah:verse;
// values are uploaded slide numbers, not their positions in a listing.
export const verifiedVerseSlides={};
export function visualTarget(surah,verse,language='en'){
 const exact=verifiedVerseSlides[`${language}:${Number(surah)}:${verse}`];
 if(exact)return {number:exact,precision:'verse'};
 if(Number(surah)===2&&language==='en'){
  let offset=0;
  for(const section of baqarahSections){
   const [start,end]=section.verses.split('–').map(Number);
   if(verse>=start&&verse<=end)return {number:offset+1,precision:'section',verses:section.verses};
   offset+=section.slides;
  }
 }
 return null;
}
export function lessonLinks(reference,language='en',lessonId){
 const match=/^(\d+):(\d+)(?:-(\d+))?$/.exec(reference);
 if(!match)return null;
 const s=surahs.find(item=>item.number===Number(match[1]));
 if(!s)return null;
 const target=verseTarget(`verse=${match[2]}&endVerse=${match[3]||match[2]}`,s.ayahs);
 if(!target)return null;
 const query=new URLSearchParams({lang:language,verse:String(target.start)});
 if(target.end>target.start)query.set('endVerse',String(target.end));
 const supplied=(lessonId?lessonSlideMap[lessonId]:Object.values(lessonSlideMap).find(item=>item.reference===reference&&item.language===language));
 const confirmed=supplied?.language===language&&supplied.reference===reference?supplied:null;
 const visualQuery=new URLSearchParams(query);
 if(confirmed)visualQuery.set('slide',String(confirmed.slides[0]));
 return {slides:confirmed?.slides||[],wordByWord:`/word-by-word?surah=${s.number}&${query}`,visual:`/surah/${s.id}/${s.slug}?${visualQuery}`,visualMapping:confirmed?{number:confirmed.slides[0],numbers:confirmed.slides,precision:'lesson',source:confirmed.source}:visualTarget(s.number,target.start,language)};
}

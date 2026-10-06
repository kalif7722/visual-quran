import{themes}from'./learning-data.js';
export const topics=[
 {name:'Ramadan & fasting',aliases:['ramadan','ramadhan','ramzan','ரம்ஜான்','fasting','fast','sawm','ரமலான்','ரமழான்','நோன்பு','رمضان','صيام','صوم'],terms:['ramadan','fasting','fast'],passages:[[2,'183-187']]},
 {name:'Iblis / Satan',aliases:['iblis','iblees','satan','devil','shaytan','shaitan','ஷைத்தான்','சைத்தான்','இப்லீஸ்','ابليس','شيطان'],terms:['iblis','satan','devil'],passages:[]},
 {name:'Allah',aliases:['allah','god','அல்லாஹ்','இறைவன்','الله'],terms:['allah','god'],passages:[]},
 {name:'Paradise',aliases:['paradise','jannah','heaven','சொர்க்கம்','சுவர்க்கம்','جنة'],terms:['paradise','gardens'],passages:[]},
 {name:'Judgement & resurrection',aliases:['judgement','judgment','qiyamah','resurrection','மறுமை','உயிர்த்தெழுதல்','قيامة'],terms:['judgment','judgement','resurrection'],passages:[]},
 {name:'Repentance',aliases:['repentance','repent','tawbah','taubah','பாவமன்னிப்பு','தவ்பா','توبة'],terms:['repent','repentance'],passages:[]},
 ...themes.map(t=>({name:t.title,aliases:[...({family:['parents','parent','mother','father','பெற்றோர்','والدين'],hope:['mercy','hope','கருணை','رحمة'],patience:['patient','patience','பொறுமை','صبر'],knowledge:['learn','learning','knowledge','அறிவு','علم'],forgiveness:['forgive','forgiveness','மன்னிப்பு'],justice:['justice','fairness','நீதி'],giving:['give','charity','giving'],gratitude:['thankful','gratitude','thanks','நன்றி']}[t.id]||[]),t.id,...t.title.toLowerCase().split(/\s*&\s*|\s+/).filter(w=>w.length>3)],terms:[],passages:t.passages.map(p=>[p.surah,p.verses])})),
 {name:'Prayer',aliases:['prayer','pray','salah','salat','namaz','நமாஸ்','தொழுகை','صلاة'],terms:['prayer','prayers'],passages:[[2,'238-239'],[20,'14']]},
 {name:'Charity',aliases:['charity','zakat','zakah','sadaqah','தர்மம்','زكاة'],terms:['charity','alms'],passages:[[2,'261-264'],[9,'60']]},
 {name:'Pilgrimage',aliases:['hajj','pilgrimage','umrah','ஹஜ்','حج'],terms:['pilgrimage'],passages:[[2,'196-203'],[22,'27-29']]},
 {name:'Fir‘awn / Pharaoh',aliases:['firaun','firawn','firoun','firaoun','fir aun','fir awn','pharaoh','pharoah','pharaon','ஃபிர்அவ்ன்','பிர்அவ்ன்','பிர்அவ்ன','ஃபிர்அவுன்','பிரவுன்','பார்வோன்','فرعون'],terms:['pharaoh','fir awn','fir aun','فرعون'],passages:[]},
 ...[['Musa','moses','மூஸா','موسى'],['Ibrahim','abraham','இப்ராஹீம்','ابراهيم'],['Isa','jesus','ஈஸா','عيسى'],['Yusuf','joseph','யூஸுஃப்','يوسف'],['Nuh','noah','நூஹ்','نوح'],['Maryam','mary','மர்யம்','مريم'],['Harun','aaron','ஹாரூன்','هارون'],['Dawud','david','தாவூத்','داود'],['Sulayman','solomon','ஸுலைமான்','سليمان'],['Yunus','jonah','யூனுஸ்','يونس'],['Ayyub','job','அய்யூப்','ايوب'],['Adam','adam','ஆதம்','ادم'],['Lut','lot','லூத்','لوط'],['Shuayb','shu aib','ஷுஐப்','شعيب'],['Salih','salih','ஸாலிஹ்','صالح']].map(([name,...aliases])=>({name,aliases:[name.toLowerCase(),...aliases],terms:[name.toLowerCase(),aliases[0]],passages:[]}))
];
export function normalize(text){return String(text).normalize('NFKD').toLowerCase().replace(/([a-z])[\u0300-\u036f]+/g,'$1').replace(/[\u064b-\u065f\u0670\u06d6-\u06ed\u0640]/g,'').replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي').replace(/[^\p{L}\p{N}\p{M}\s:]/gu,' ').replace(/\s+/g,' ').trim().normalize('NFC')}
function contains(text,term){if((` ${text} `).includes(` ${term} `))return true;return /[\u0b80-\u0bff]/.test(term)&&term.length>2&&text.split(' ').some(word=>word.startsWith(term))}
function inPassage(v,[surah,range]){const[a,b=a]=range.split('-').map(Number);return v.surah===surah&&v.verse>=a&&v.verse<=b}
export function indexVerses(verses,other=[]){const paired=new Map(other.map(v=>[`${v.surah}:${v.verse}`,v]));return verses.map(v=>({...v,searchText:normalize(v.translation),otherSearch:normalize(paired.get(`${v.surah}:${v.verse}`)?.translation||''),arabicSearch:normalize(v.arabic)}))}
export function searchQuran(index,query,{related=true,surah=0}={}){
 const q=normalize(query);if(!q)return{results:[],topics:[]};
 const ref=q.match(/^(\d{1,3}):(\d{1,3})$/),words=q.split(' ');
 const matchedTopics=topics.filter(t=>t.aliases.some(a=>normalize(a)===q||(normalize(a).length>3&&contains(q,normalize(a)))));
 const terms=[...new Set(matchedTopics.flatMap(t=>t.terms).map(normalize))];
 const results=[];
 for(const v of index){
  if(surah&&v.surah!==Number(surah))continue;
  const exact=ref?v.surah===Number(ref[1])&&v.verse===Number(ref[2]):contains(v.searchText,q)||contains(v.arabicSearch,q);
  const cross=!ref&&!exact&&contains(v.otherSearch||'',q);
  const keyword=!ref&&!exact&&!cross&&words.every(w=>[v.searchText,v.otherSearch||'',v.arabicSearch].some(t=>contains(t,w)));
  const topic=related&&!ref&&!exact&&!cross&&!keyword&&(matchedTopics.some(t=>t.passages.some(p=>inPassage(v,p)))||terms.some(t=>[v.searchText,v.otherSearch||'',v.arabicSearch].some(text=>contains(text,t))));
  if(exact||cross||keyword||topic)results.push({...v,match:exact?'Exact match':cross?'Cross-language match':keyword?'Keyword match':'Related topic',score:exact?3:keyword?2:1});
 }
 results.sort((a,b)=>b.score-a.score||a.surah-b.surah||a.verse-b.verse);
 return{results,topics:matchedTopics.map(t=>t.name)};
}

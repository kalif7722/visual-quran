import{themes}from'./learning-data.js';
export const topics=[
 {name:'Ramadan & fasting',aliases:['ramadan','ramadhan','fasting','fast','sawm','ரமலான்','ரமழான்','நோன்பு','رمضان','صيام','صوم'],terms:['ramadan','fasting','fast'],passages:[[2,'183-187']]},
 ...themes.map(t=>({name:t.title,aliases:[...({family:['parents','parent','mother','father','பெற்றோர்','والدين'],hope:['mercy','hope','கருணை','رحمة'],patience:['patient','patience','பொறுமை','صبر'],knowledge:['learn','learning','knowledge','அறிவு','علم'],forgiveness:['forgive','forgiveness','மன்னிப்பு'],justice:['justice','fairness','நீதி'],giving:['give','charity','giving'],gratitude:['thankful','gratitude','thanks','நன்றி']}[t.id]||[]),t.id,...t.title.toLowerCase().split(/\s*&\s*|\s+/).filter(w=>w.length>3)],terms:[],passages:t.passages.map(p=>[p.surah,p.verses])})),
 {name:'Prayer',aliases:['prayer','pray','salah','salat','தொழுகை','صلاة'],terms:['prayer','prayers'],passages:[[2,'238-239'],[20,'14']]},
 {name:'Charity',aliases:['charity','zakat','zakah','sadaqah','தர்மம்','زكاة'],terms:['charity','alms'],passages:[[2,'261-264'],[9,'60']]},
 {name:'Pilgrimage',aliases:['hajj','pilgrimage','umrah','ஹஜ்','حج'],terms:['pilgrimage'],passages:[[2,'196-203'],[22,'27-29']]},
 ...[['Musa','moses','மூஸா','موسى'],['Ibrahim','abraham','இப்ராஹீம்','ابراهيم'],['Isa','jesus','ஈஸா','عيسى'],['Yusuf','joseph','யூஸுஃப்','يوسف'],['Nuh','noah','நூஹ்','نوح'],['Maryam','mary','மர்யம்','مريم']].map(([name,...aliases])=>({name,aliases:[name.toLowerCase(),...aliases],terms:[name.toLowerCase(),aliases[0]],passages:[]}))
];
export function normalize(text){return String(text).normalize('NFKD').toLowerCase().replace(/([a-z])[\u0300-\u036f]+/g,'$1').replace(/[\u064b-\u065f\u0670\u06d6-\u06ed\u0640]/g,'').replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي').replace(/[^\p{L}\p{N}\p{M}\s:]/gu,' ').replace(/\s+/g,' ').trim().normalize('NFC')}
function contains(text,term){return (` ${text} `).includes(` ${term} `)}
function inPassage(v,[surah,range]){const[a,b=a]=range.split('-').map(Number);return v.surah===surah&&v.verse>=a&&v.verse<=b}
export function indexVerses(verses){return verses.map(v=>({...v,searchText:normalize(v.translation),arabicSearch:normalize(v.arabic)}))}
export function searchQuran(index,query,{related=true,surah=0}={}){
 const q=normalize(query);if(!q)return{results:[],topics:[]};
 const ref=q.match(/^(\d{1,3}):(\d{1,3})$/),words=q.split(' ');
 const matchedTopics=topics.filter(t=>t.aliases.some(a=>normalize(a)===q));
 const terms=[...new Set(matchedTopics.flatMap(t=>t.terms).map(normalize))];
 const results=[];
 for(const v of index){
  if(surah&&v.surah!==Number(surah))continue;
  const exact=ref?v.surah===Number(ref[1])&&v.verse===Number(ref[2]):contains(v.searchText,q)||contains(v.arabicSearch,q);
  const keyword=!ref&&!exact&&words.every(w=>contains(v.searchText,w)||contains(v.arabicSearch,w));
  const topic=related&&!ref&&!exact&&!keyword&&(matchedTopics.some(t=>t.passages.some(p=>inPassage(v,p)))||terms.some(t=>contains(v.searchText,t)));
  if(exact||keyword||topic)results.push({...v,match:exact?'Exact match':keyword?'Keyword match':'Related topic',score:exact?3:keyword?2:1});
 }
 results.sort((a,b)=>b.score-a.score||a.surah-b.surah||a.verse-b.verse);
 return{results,topics:matchedTopics.map(t=>t.name)};
}

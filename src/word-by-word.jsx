import React,{useEffect,useMemo,useState}from'react';
import{Link}from'react-router-dom';
import{surahs}from'./data';
import'./word-by-word.css';

const PAGE_SIZE=12;
const palette=['mint','sky','gold','violet','teal','blue'];
const stripHtml=value=>String(value||'').replace(/<[^>]*>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();

async function fetchChapter(chapter,language,signal){
  const verses=[];
  let page=1,totalPages=1;
  do{
    const query=new URLSearchParams({words:'true',per_page:'50',page:String(page),language,word_fields:'text_uthmani,translation,transliteration'});
    let response;
    try{
      response=await fetch(`https://quran.com/api/proxy/content/api/qdc/verses/by_chapter/${chapter}?${query}`,{signal});
      if(!response.ok)throw Error('proxy');
    }catch(error){
      if(signal.aborted)throw error;
      response=await fetch(`https://api.quran.com/api/v4/verses/by_chapter/${chapter}?${query}`,{signal});
      if(!response.ok)throw Error('Quran word data could not be loaded.');
    }
    const payload=await response.json();
    if(!Array.isArray(payload.verses))throw Error('The word data response was not recognized.');
    verses.push(...payload.verses);
    totalPages=Number(payload.pagination?.total_pages||1);
    page+=1;
  }while(page<=totalPages);
  if(!verses.length)throw Error('No word data was returned for this Surah.');
  return verses;
}

export function WordByWord(){
  const[chapter,setChapter]=useState('001');
  const[language,setLanguage]=useState('en');
  const[verses,setVerses]=useState([]);
  const[loading,setLoading]=useState(true);
  const[error,setError]=useState('');
  const[retry,setRetry]=useState(0);
  const[page,setPage]=useState(0);
  const[selected,setSelected]=useState(null);
  const[surahQuery,setSurahQuery]=useState('');
  const current=surahs.find(item=>item.id===chapter)||surahs[0];
  const isTamil=language==='ta';
  const filteredSurahs=useMemo(()=>surahs.filter(s=>`${s.number} ${s.name} ${s.meaning}`.toLowerCase().includes(surahQuery.toLowerCase())),[surahQuery]);
  useEffect(()=>{
    const controller=new AbortController();
    setLoading(true);setError('');setVerses([]);setPage(0);setSelected(null);
    fetchChapter(Number(chapter),language,controller.signal).then(data=>{setVerses(data);setLoading(false)}).catch(err=>{if(!controller.signal.aborted){setError(err.message||'Unable to load word-by-word data.');setLoading(false)}});
    return()=>controller.abort();
  },[chapter,language,retry]);
  const totalPages=Math.max(1,Math.ceil(verses.length/PAGE_SIZE));
  const visibleVerses=verses.slice(page*PAGE_SIZE,(page+1)*PAGE_SIZE);
  const selectedWord=selected?selected.verse.words?.[selected.index]:null;
  const goChapter=next=>{const n=Math.max(1,Math.min(114,Number(chapter)+next));setChapter(String(n).padStart(3,'0'));setSurahQuery('')};
  const text=isTamil?{
    eyebrow:'சொல்-சொல்லாக குர்ஆன்',title:'ஒவ்வொரு சொல்லையும்',titleAccent:'புரிந்துகொள்ளுங்கள்',intro:'அரபுச் சொல்லைத் தேர்ந்தெடுத்து அதன் பொருள், உச்சரிப்பு மற்றும் வசனச் சூழலைக் கற்றுக்கொள்ளுங்கள்.',
    choose:'சூராவைத் தேர்ந்தெடுக்கவும்',search:'சூராவைத் தேடுங்கள்…',words:'சொற்கள்',verse:'வசனம்',meaning:'பொருள்',pronunciation:'உச்சரிப்பு',context:'வசனத்தின் முழு உரை',prev:'முந்தைய',next:'அடுத்து',loading:'சொற்களின் தரவு ஏற்றப்படுகிறது…',retry:'மீண்டும் முயற்சி',empty:'சொல் தரவை ஏற்ற முடியவில்லை. இணைய இணைப்பைச் சரிபார்த்து மீண்டும் முயற்சிக்கவும்.',tip:'ஒரு சொல்லைத் தேர்ந்தெடுக்கவும்',hint:'ஒவ்வொரு சொல்லும் தனித்த நிறத்தில் காட்டப்பட்டுள்ளது. சொல்லைத் தொடவும் அல்லது கிளிக் செய்யவும்.',source:'சொல்-சொல் மொழிபெயர்ப்பு Quran.com தரவிலிருந்து பெறப்படுகிறது.',language:'விளக்க மொழி',english:'English',tamil:'தமிழ்'
  }:{
    eyebrow:'WORD-BY-WORD QURAN',title:'Understand every',titleAccent:'word by word',intro:'Select an Arabic word to explore its meaning, transliteration and place within the verse.',
    choose:'Choose a Surah',search:'Search Surahs…',words:'WORDS',verse:'VERSE',meaning:'Meaning',pronunciation:'Pronunciation',context:'Verse context',prev:'Previous',next:'Next',loading:'Loading word-by-word data…',retry:'Try again',empty:'Word data could not be loaded. Check your connection and try again.',tip:'Select a word',hint:'Each word has a matching color. Tap or click a word to study it.',source:'Word-level glosses are provided by Quran.com data.',language:'Gloss language',english:'English',tamil:'தமிழ்'
  };
  return <section className={`word-study ${isTamil?'word-study-ta':''}`}>
    <div className="word-study-hero">
      <div className="word-study-hero-copy"><span className="word-study-eyebrow"><span>✦</span>{text.eyebrow}</span><h1>{text.title}<br/><em>{text.titleAccent}</em></h1><p>{text.intro}</p>
      <div className="word-study-stats"><span><b>114</b>{isTamil?' சூராக்கள்':'Surahs'}</span><i/><span><b>6,000+</b>{isTamil?' வசனங்கள்':'Verses'}</span><i/><span><b>Tap</b>{isTamil?' செய்து கற்கவும்':'to explore'}</span></div></div>
      <div className="word-study-orbit" aria-hidden="true"><div className="orbit-ring orbit-ring-one"/><div className="orbit-ring orbit-ring-two"/><div className="orbit-center"><span>بِسْمِ</span><span>اللَّهِ</span><small>Learn one word at a time</small></div><i className="orbit-dot orbit-dot-one"/><i className="orbit-dot orbit-dot-two"/><i className="orbit-dot orbit-dot-three"/></div>
    </div>
    <div className="word-study-workspace">
      <aside className="word-study-sidebar"><div className="word-sidebar-heading"><span>{text.choose}</span><b>114</b></div><input className="word-surah-search" value={surahQuery} onChange={e=>setSurahQuery(e.target.value)} placeholder={text.search} aria-label={text.search}/><div className="word-surah-list">{filteredSurahs.map(s=><button key={s.id} className={s.id===chapter?'selected':''} onClick={()=>{setChapter(s.id);setSurahQuery('')}}><span className="word-surah-number">{s.number}</span><span className="word-surah-name"><strong>{s.name}</strong><small>{s.meaning}</small></span><span className="word-surah-ayahs">{s.ayahs}</span></button>)}</div></aside>
      <div className="word-study-main">
        <div className="word-chapter-head"><div><span className="word-chapter-kicker">SURAH {current.number} · {current.ayahs} VERSES</span><h2>{current.name}</h2><p>{current.meaning}</p></div><label className="word-language-picker"><span>{text.language}</span><select value={language} onChange={e=>setLanguage(e.target.value)}><option value="en">{text.english}</option><option value="ta">{text.tamil}</option></select></label></div>
        <div className="word-study-tip"><span>✧</span><p>{text.hint}</p></div>
        {loading&&<div className="word-state"><span className="word-spinner"/><strong>{text.loading}</strong></div>}
        {!loading&&error&&<div className="word-state word-state-error"><span>⌁</span><strong>{text.empty}</strong><button onClick={()=>setRetry(v=>v+1)}>{text.retry}</button></div>}
        {!loading&&!error&&<><div className="word-verse-list">{visibleVerses.map(verse=><article className="word-verse-card" key={verse.verse_key}><div className="word-verse-heading"><span>{text.verse} {verse.verse_number}</span><small>{verse.verse_key}</small></div><div className="word-arabic-line" dir="rtl">{(verse.words||[]).filter(word=>word.char_type_name==='word').map((word,index)=><button key={word.id||`${verse.verse_key}-${index}`} className={`word-token tone-${palette[index%palette.length]} ${selected?.verse.verse_key===verse.verse_key&&selected?.index===index?'active':''}`} onClick={()=>setSelected({verse,index})} aria-pressed={selected?.verse.verse_key===verse.verse_key&&selected?.index===index}><span className="word-token-arabic">{word.text_uthmani||word.text_imlaei||''}</span><span className="word-token-gloss" dir="auto">{stripHtml(word.translation?.text)||'—'}</span></button>)}</div><div className="word-verse-footer"><span>۞</span>{verse.verse_key}</div></article>)}</div><div className="word-pagination"><button disabled={page===0} onClick={()=>{setPage(p=>p-1);setSelected(null)}}>← {text.prev}</button><span>{page+1} / {totalPages}</span><button disabled={page>=totalPages-1} onClick={()=>{setPage(p=>p+1);setSelected(null)}}>{text.next} →</button></div></>}
        <aside className="word-detail-panel">{selectedWord?<><div className="word-detail-label"><span>✦</span>{text.meaning} · {selected.verse.verse_key}</div><div className="word-detail-grid"><div className={`word-detail-arabic tone-${palette[selected.index%palette.length]}`} dir="rtl">{selectedWord.text_uthmani||selectedWord.text_imlaei}</div><div className="word-detail-copy"><span>{text.meaning}</span><h3>{stripHtml(selectedWord.translation?.text)||'—'}</h3><span>{text.pronunciation}</span><p>{stripHtml(selectedWord.transliteration?.text)||'—'}</p></div></div><div className="word-detail-context"><span>{text.context}</span><p dir="rtl">{selected.verse.text_uthmani||selected.verse.words?.map(w=>w.text_uthmani).filter(Boolean).join(' ')}</p></div></>:<div className="word-detail-empty"><span>✧</span><div><strong>{text.tip}</strong><p>{text.hint}</p></div></div>}</aside>
        <p className="word-source-note">{text.source} <a href="https://quran.com" target="_blank" rel="noreferrer">Quran.com ↗</a></p>
      </div>
    </div>
  </section>;
}

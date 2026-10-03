import React, {useEffect,useMemo,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter,useNavigate,useParams} from 'react-router-dom';
import {Routes,Route,Link} from 'react-router-dom';
import {surahs,featured} from './data';
import './styles.css';

const assetBase=(import.meta.env.VITE_ASSET_BASE_URL||'').replace(/\/$/,'');
const assetUrl=(s,n,lang='en')=>`${assetBase}/surahs/${s.id}-${s.slug}/${lang}/${s.id}-${s.slug}-${String(n).padStart(2,'0')}.webp`;
const manifestUrl=s=>`${assetBase}/surahs/${s.id}-${s.slug}/manifest.json`;

function Shell({children}){
  const [open,setOpen]=useState(false);
  return <div className="app-shell">
    <header className="topbar">
      <button className="icon-btn menu" onClick={()=>setOpen(v=>!v)} aria-label="Menu">☰</button>
      <Link className="brand" to="/"><span className="brand-mark">۞</span><span><strong>Visual Quran</strong><small>See • Understand • Remember</small></span></Link>
      <nav className="topnav"><Link to="/surahs">Surahs</Link><a href="#themes">Themes</a><a href="#about">About</a></nav>
      <select className="lang" defaultValue="en"><option value="en">English</option><option value="ta">தமிழ் — coming later</option></select>
    </header>
    <aside className={`drawer ${open?'open':''}`}>
      <div className="drawer-head"><span>Explore</span><button onClick={()=>setOpen(false)}>×</button></div>
      <Link to="/" onClick={()=>setOpen(false)}>Home</Link>
      <Link to="/surahs" onClick={()=>setOpen(false)}>All 114 Surahs</Link>
      <a href="#themes" onClick={()=>setOpen(false)}>Themes</a>
      <a href="#about" onClick={()=>setOpen(false)}>About</a>
    </aside>
    {open&&<div className="scrim" onClick={()=>setOpen(false)}/>} 
    <main>{children}</main>
    <footer><div><strong>Visual Quran</strong><span>A visual learning journey through all 114 Surahs.</span></div><span>English first • Tamil-ready architecture</span></footer>
  </div>
}

function Home(){
  const nav=useNavigate();
  const featuredSurahs=surahs.filter(s=>featured.includes(s.id));
  return <Shell>
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow">A VISUAL JOURNEY THROUGH THE QURAN</span>
        <h1>Explore every Surah<br/><em>through meaningful visuals.</em></h1>
        <p>Move from reading to seeing: each Surah becomes an approachable visual story designed to help you understand, reflect and remember.</p>
        <div className="hero-actions"><button className="primary" onClick={()=>nav('/surah/001/al-fatihah')}>Start with Al-Fatihah</button><button className="secondary" onClick={()=>nav('/surahs')}>Browse all 114 Surahs</button></div>
        <div className="stats"><div><strong>114</strong><span>Surahs</span></div><div><strong>2</strong><span>Languages planned</span></div><div><strong>Visual</strong><span>Learning first</span></div></div>
      </div>
      <div className="hero-art">
        <div className="orb orb1"></div><div className="orb orb2"></div>
        <div className="quran-card"><div className="moon">☾</div><div className="arabic">القرآن الكريم</div><div className="gold-line"></div><p>Open. Reflect. Remember.</p></div>
      </div>
    </section>

    <section className="section"><div className="section-head"><div><span className="eyebrow">START EXPLORING</span><h2>Featured Surahs</h2></div><Link to="/surahs">View all 114 →</Link></div>
      <div className="cards">{featuredSurahs.map(s=><SurahCard key={s.id} s={s}/>)}</div>
    </section>

    <section id="themes" className="section soft"><div className="section-head"><div><span className="eyebrow">EXPLORE BY IDEA</span><h2>Quranic themes</h2></div></div>
      <div className="theme-grid">{[['Mercy','Compassion, forgiveness and hope','♡'],['Guidance','The straight path and sound choices','↗'],['Gratitude','Recognising blessings and giving thanks','✦'],['Patience','Strength through hardship and waiting','⌛'],['Creation','Signs in nature and the universe','☼'],['Faith','Trust, worship and connection with Allah','◌']].map(([a,b,c])=><div className="theme" key={a}><span>{c}</span><h3>{a}</h3><p>{b}</p></div>)}</div>
    </section>

    <section id="about" className="section about"><div><span className="eyebrow">BUILT FOR VISUAL LEARNING</span><h2>One visual language. Every Surah.</h2><p>The site is designed so the structure stays fixed while the visual files are uploaded independently. English launches first; Tamil can reuse the same navigation and Surah structure with a parallel asset set.</p></div><div className="pipeline"><span>Surah</span><b>→</b><span>Visuals</span><b>→</b><span>Reflection</span><b>→</b><span>Remember</span></div></section>
  </Shell>
}

function SurahCard({s}){return <Link className="surah-card" to={`/surah/${s.id}/${s.slug}`}><div className="num">{s.id}</div><div><h3>{s.name}</h3><p>{s.meaning}</p></div><span className="ayahs">{s.ayahs} ayahs</span><span className="arrow">→</span></Link>}

function Surahs(){
  const [q,setQ]=useState('');
  const filtered=useMemo(()=>surahs.filter(s=>`${s.id} ${s.name} ${s.meaning}`.toLowerCase().includes(q.toLowerCase())),[q]);
  return <Shell><section className="page-head"><span className="eyebrow">COMPLETE QURAN</span><h1>All 114 Surahs</h1><p>Search by number, Surah name or English meaning.</p><div className="search"><span>⌕</span><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search Surahs…"/></div></section><section className="section compact"><div className="all-grid">{filtered.map(s=><SurahCard key={s.id} s={s}/>)}</div></section></Shell>
}

function SurahViewer(){
  const {id}=useParams(); const s=surahs.find(x=>x.id===id)||surahs[0];
  const [slideCount,setSlideCount]=useState(s.id==='001'?12:1);
  const [index,setIndex]=useState(1); const [failed,setFailed]=useState(false); const [fullscreen,setFullscreen]=useState(false);
  useEffect(()=>{
    setIndex(1); setFailed(false); setSlideCount(s.id==='001'?12:1);
    if(!assetBase) return;
    fetch(manifestUrl(s),{cache:'no-store'}).then(r=>r.ok?r.json():null).then(m=>{
      const count=Number(m?.slides||m?.slideCount||m?.count||0);
      if(count>0) setSlideCount(count);
    }).catch(()=>{});
  },[s.id]);
  const img=assetUrl(s,index,'en');
  const prev=()=>{setIndex(i=>Math.max(1,i-1));setFailed(false)}; const next=()=>{setIndex(i=>Math.min(slideCount,i+1));setFailed(false)};
  return <Shell><section className="viewer-head"><Link to="/surahs">← All Surahs</Link><div><span className="eyebrow">SURAH {s.number}</span><h1>{s.name}</h1><p>{s.meaning} • {s.ayahs} ayahs</p></div><div className="viewer-tools"><button className="secondary small" onClick={()=>setFullscreen(true)}>Full screen</button></div></section>
    <section className="viewer-layout"><aside className="slide-list"><div className="slide-title">Visual journey</div>{Array.from({length:slideCount},(_,i)=>i+1).map(n=><button className={n===index?'active':''} onClick={()=>{setIndex(n);setFailed(false)}} key={n}><span>{String(n).padStart(2,'0')}</span><div><strong>{n===1?'Opening':`Visual ${n}`}</strong><small>{s.id==='001'&&n>=3&&n<=9?`Verse ${n-2}`:'Learning visual'}</small></div></button>)}</aside>
      <div className="stage-wrap"><div className="stage">{assetBase&&!failed?<img src={img} onError={()=>setFailed(true)} alt={`${s.name} visual ${index}`}/>:<UploadPlaceholder s={s} index={index}/>}</div><div className="stage-controls"><button onClick={prev} disabled={index===1}>← Previous</button><span>{index} / {slideCount}</span><button onClick={next} disabled={index===slideCount}>Next →</button></div></div>
      <aside className="info-panel"><span className="eyebrow">VISUAL {String(index).padStart(2,'0')}</span><h3>{s.name}</h3><p>This viewer is wired to Cloudflare R2. Correctly named uploads appear automatically; `manifest.json` controls the number of visuals for each Surah.</p><div className="file-box"><small>Expected file</small><code>{s.id}-{s.slug}-{String(index).padStart(2,'0')}.webp</code></div><div className="note">Upload `manifest.json` beside the language folders with a value such as <code>{`{"slides":12}`}</code>. Al-Fatihah already defaults to 12 visuals.</div></aside>
    </section>{fullscreen&&<div className="full"><button onClick={()=>setFullscreen(false)}>×</button>{assetBase&&!failed?<img src={img} alt="Full screen visual"/>:<UploadPlaceholder s={s} index={index}/>}</div>}</Shell>
}

function UploadPlaceholder({s,index}){return <div className="placeholder"><div className="placeholder-icon">✧</div><h3>Visual ready for upload</h3><p>The page and mapping are already prepared.</p><code>{s.id}-{s.slug}-{String(index).padStart(2,'0')}.webp</code></div>}

function App(){return <BrowserRouter><Routes><Route path="/" element={<Home/>}/><Route path="/surahs" element={<Surahs/>}/><Route path="/surah/:id/:slug" element={<SurahViewer/>}/><Route path="*" element={<Home/>}/></Routes></BrowserRouter>}

createRoot(document.getElementById('root')).render(<App/>);

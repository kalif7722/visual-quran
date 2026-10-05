import React,{useEffect,useMemo,useRef,useState}from'react';
import{createRoot}from'react-dom/client';
import{BrowserRouter,useNavigate,useParams,Routes,Route,Link}from'react-router-dom';
import{surahs,featured}from'./data';
import{baqarahSlideCount,baqarahSlideMeta}from'./baqarah-map';
import'./styles.css';
import'./viewer-overrides.css';
import'./glossy-theme.css';
import'./polish.css';

const assetBase=(import.meta.env.VITE_ASSET_BASE_URL||'').replace(/\/$/,'');
const assetUrl=(s,n,lang='en')=>`${assetBase}/surahs/${s.id}-${s.slug}/${lang}/${s.id}-${s.slug}-${String(n).padStart(2,'0')}.webp`;
const manifestUrl=s=>`${assetBase}/surahs/${s.id}-${s.slug}/manifest.json`;

function SurahMenu(){
 const nav=useNavigate();const{id}=useParams();const[currentOpen,setCurrentOpen]=useState(false);const[query,setQuery]=useState('');const ref=useRef(null);
 const current=surahs.find(s=>s.id===id);const currentIndex=current?surahs.findIndex(s=>s.id===current.id):-1;
 const searched=surahs.filter(s=>`${s.id} ${s.name} ${s.meaning}`.toLowerCase().includes(query.toLowerCase()));
 const visible=!query.trim()&&currentIndex>=0?[...surahs.slice(currentIndex),...surahs.slice(0,currentIndex)]:searched;
 useEffect(()=>{const close=e=>{if(ref.current&&!ref.current.contains(e.target))setCurrentOpen(false)};document.addEventListener('mousedown',close);return()=>document.removeEventListener('mousedown',close)},[]);
 const toggle=()=>{setCurrentOpen(v=>{const next=!v;if(next)setQuery('');return next})};
 const choose=s=>{setCurrentOpen(false);setQuery('');nav(`/surah/${s.id}/${s.slug}`)};
 return <div className="surah-menu" ref={ref}>
  <button className={`surah-menu-trigger ${currentOpen?'open':''}`} onClick={toggle} aria-expanded={currentOpen}>
   <span className="surah-menu-number">{current?Number(current.id):'☰'}</span>
   <span className="surah-menu-label">{current?current.name:'Choose Surah'}</span>
   <span className="surah-menu-chevron">⌄</span>
  </button>
  {currentOpen&&<div className="surah-menu-popover">
   <div className="surah-menu-search"><span>⌕</span><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find a Surah…"/></div>
   {!query.trim()&&current&&<div className="surah-menu-context">Current Surah first • next Surahs immediately below</div>}
   <div className="surah-menu-list">{visible.map(s=><button key={s.id} className={current?.id===s.id?'selected':''} onClick={()=>choose(s)}>
    <span className="menu-num">{String(Number(s.id)).padStart(2,'0')}</span><span className="menu-copy"><strong>{s.name}</strong><small>{s.meaning}{current?.id===s.id?' • Current':''}</small></span><span className="menu-arrow">→</span>
   </button>)}</div>
  </div>}
 </div>
}

function Shell({children}){
 const[open,setOpen]=useState(false);
 return <div className="app-shell"><header className="topbar"><button className="icon-btn menu" onClick={()=>setOpen(v=>!v)}>☰</button><SurahMenu/><Link className="brand" to="/"><span className="brand-mark">۞</span><span><strong>Visual Quran</strong><small>See • Understand • Remember</small></span></Link><nav className="topnav"><Link to="/surahs">Surahs</Link><Link to="/#themes">Themes</Link><Link to="/#about">About</Link></nav><select className="lang" defaultValue="en"><option value="en">English</option><option value="ta">தமிழ் — coming later</option></select></header><aside className={`drawer ${open?'open':''}`}><div className="drawer-head"><span>Explore</span><button onClick={()=>setOpen(false)}>×</button></div><Link to="/" onClick={()=>setOpen(false)}>Home</Link><Link to="/surahs" onClick={()=>setOpen(false)}>All 114 Surahs</Link><Link to="/#themes" onClick={()=>setOpen(false)}>Themes</Link><Link to="/#about" onClick={()=>setOpen(false)}>About</Link></aside>{open&&<div className="scrim" onClick={()=>setOpen(false)}/>}<main>{children}</main><footer><div><strong>Visual Quran</strong><span>A visual learning journey through all 114 Surahs.</span></div><span>English first • Tamil-ready architecture</span></footer></div>
}

function Home(){const nav=useNavigate(),items=surahs.filter(s=>featured.includes(s.id));return <Shell><section className="hero"><div className="hero-copy"><span className="eyebrow">A VISUAL JOURNEY THROUGH THE QURAN</span><h1>Explore every Surah<br/><em>through meaningful visuals.</em></h1><p>Move from reading to seeing: each Surah becomes an approachable visual story designed to help you understand, reflect and remember.</p><div className="hero-actions"><button className="primary" onClick={()=>nav('/surah/001/al-fatihah')}>Start with Al-Fatihah</button><button className="secondary" onClick={()=>nav('/surahs')}>Browse all 114 Surahs</button></div><div className="stats"><div><strong>114</strong><span>Surahs</span></div><div><strong>2</strong><span>Languages planned</span></div><div><strong>Visual</strong><span>Learning first</span></div></div></div><div className="hero-art"><div className="orb orb1"/><div className="orb orb2"/><div className="quran-card"><div className="moon">☾</div><div className="arabic">القرآن الكريم</div><div className="gold-line"/><p>Open. Reflect. Remember.</p></div></div></section><section className="section"><div className="section-head"><div><span className="eyebrow">START EXPLORING</span><h2>Featured Surahs</h2></div><Link to="/surahs">View all 114 →</Link></div><div className="cards">{items.map(s=><SurahCard key={s.id}s={s}/>)}</div></section><section id="themes" className="section soft"><div className="section-head"><div><span className="eyebrow">EXPLORE BY IDEA</span><h2>Quranic themes</h2></div></div><div className="theme-grid">{[['Mercy','Compassion, forgiveness and hope','♡'],['Guidance','The straight path and sound choices','↗'],['Gratitude','Recognising blessings and giving thanks','✦'],['Patience','Strength through hardship and waiting','⌛'],['Creation','Signs in nature and the universe','☼'],['Faith','Trust, worship and connection with Allah','◌']].map(([a,b,c])=><div className="theme" key={a}><span>{c}</span><h3>{a}</h3><p>{b}</p></div>)}</div></section><section id="about" className="section about"><div><span className="eyebrow">BUILT FOR VISUAL LEARNING</span><h2>One visual language. Every Surah.</h2><p>English launches first; Tamil can reuse the same navigation and Surah structure with a parallel asset set.</p></div><div className="pipeline"><span>Surah</span><b>→</b><span>Visuals</span><b>→</b><span>Reflection</span><b>→</b><span>Remember</span></div></section></Shell>}
function SurahCard({s}){return <Link className="surah-card" to={`/surah/${s.id}/${s.slug}`}><div className="num">{s.id}</div><div><h3>{s.name}</h3><p>{s.meaning}</p></div><span className="ayahs">{s.ayahs} ayahs</span><span className="arrow">→</span></Link>}
function Surahs(){const[q,setQ]=useState('');const filtered=useMemo(()=>surahs.filter(s=>`${s.id} ${s.name} ${s.meaning}`.toLowerCase().includes(q.toLowerCase())),[q]);return <Shell><section className="page-head"><span className="eyebrow">COMPLETE QURAN</span><h1>All 114 Surahs</h1><p>Search by number, Surah name or English meaning.</p><div className="search"><span>⌕</span><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search Surahs…"/></div></section><section className="section compact"><div className="all-grid">{filtered.map(s=><SurahCard key={s.id}s={s}/>)}</div></section></Shell>}

const navSubtitle=(s,n)=>{
 if(s.id==='001'){if(n===1)return'Opening';if(n===2)return'Introduction';if(n>=3&&n<=9)return`Verse ${n-2}`;if(n===10)return'Summary';if(n===11)return'Lessons';if(n===12)return'Closing'}
 if(s.id==='002')return`Verses ${baqarahSlideMeta(n).verses}`;
 return n===1?'Opening':`Slide ${n}`;
};

function SurahViewer(){
 const{id}=useParams();const s=surahs.find(x=>x.id===id)||surahs[0];const defaultCount=s.id==='001'?12:s.id==='002'?baqarahSlideCount:1;
 const currentPos=surahs.findIndex(x=>x.id===s.id);const nextSurah=currentPos>=0&&currentPos<surahs.length-1?surahs[currentPos+1]:null;
 const[slideCount,setSlideCount]=useState(defaultCount),[index,setIndex]=useState(1),[failed,setFailed]=useState(false),[fullscreen,setFullscreen]=useState(false),[collapsed,setCollapsed]=useState(false);
 useEffect(()=>{const count=s.id==='001'?12:s.id==='002'?baqarahSlideCount:1;setIndex(1);setFailed(false);setSlideCount(count);if(!assetBase)return;fetch(manifestUrl(s),{cache:'no-store'}).then(r=>r.ok?r.json():null).then(m=>{const c=Number(m?.slides||m?.slideCount||m?.count||0);if(c>0)setSlideCount(c)}).catch(()=>{})},[s.id]);
 useEffect(()=>{if(!fullscreen)return;const onKey=e=>{if(e.key==='Escape')setFullscreen(false);if(e.key==='ArrowLeft')goPrev();if(e.key==='ArrowRight')goNext()};window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)},[fullscreen,index,slideCount]);
 const img=assetUrl(s,index,'en');const goPrev=()=>{setIndex(i=>Math.max(1,i-1));setFailed(false)};const goNext=()=>{setIndex(i=>Math.min(slideCount,i+1));setFailed(false)};const pick=n=>{setIndex(n);setFailed(false)};
 const visual=assetBase&&!failed?<img src={img} onError={()=>setFailed(true)} alt={`${s.name} slide ${index}`}/>:<UploadPlaceholder s={s} index={index}/>;const meta=s.id==='002'?baqarahSlideMeta(index):null;
 return <Shell><section className="viewer-head refined-viewer-head"><div className="viewer-breadcrumb"><Link to="/surahs">← All Surahs</Link><span>/</span><strong>{s.name}</strong></div><div className="viewer-identity"><span className="surah-kicker">Surah {Number(s.id)}</span><h1>{s.name}</h1><div className="viewer-meta"><span>{s.meaning}</span><i>•</i><span>{s.ayahs} ayahs</span>{meta&&<><i>•</i><span>Verses {meta.verses}</span></>}</div></div><div className="viewer-tools"><button className="fullscreen-pill" onClick={()=>setFullscreen(true)}><span>⛶</span> Full screen</button>{nextSurah&&<Link className="next-surah-link" to={`/surah/${nextSurah.id}/${nextSurah.slug}`}><span>Next Surah</span><strong>{Number(nextSurah.id)}. {nextSurah.name}</strong><b>→</b></Link>}</div></section>
 <section className={`viewer-layout viewer-wide ${collapsed?'rail-collapsed':''}`}><aside className="slide-list compact-nav"><div className="slide-title"><span>{collapsed?'#':'Journey'}</span><button className="rail-toggle" onClick={()=>setCollapsed(v=>!v)} title={collapsed?'Expand navigation':'Collapse navigation'}>{collapsed?'›':'‹'}</button></div>{Array.from({length:slideCount},(_,i)=>i+1).map(n=><button className={n===index?'active':''} onClick={()=>pick(n)} key={n} title={s.id==='002'?`${baqarahSlideMeta(n).sectionTitle} — verses ${baqarahSlideMeta(n).verses}`:navSubtitle(s,n)}><span>{String(n).padStart(2,'0')}</span>{!collapsed&&<small>{navSubtitle(s,n)}</small>}</button>)}</aside><div className="stage-wrap stage-dominant"><div className="stage stage-clickable" onClick={()=>setFullscreen(true)} title="Click to open full screen">{visual}<div className="stage-fullscreen-hint"><span>⛶</span> Open full screen</div></div><div className="stage-controls"><button onClick={goPrev} disabled={index===1}>← Previous</button><span>{index} / {slideCount}</span><button onClick={goNext} disabled={index===slideCount}>Next →</button></div></div></section>
 {fullscreen&&<div className="full full-viewer"><button className="full-close" onClick={()=>setFullscreen(false)} aria-label="Close fullscreen">×</button><button className="full-nav full-prev" onClick={goPrev} disabled={index===1} aria-label="Previous slide">‹</button><div className="full-stage">{visual}<div className="full-counter">{index} / {slideCount}</div></div><button className="full-nav full-next" onClick={goNext} disabled={index===slideCount} aria-label="Next slide">›</button></div>}</Shell>
}
function UploadPlaceholder({s,index}){return <div className="placeholder"><div className="placeholder-icon">✧</div><h3>Slide ready for upload</h3><p>The page and mapping are already prepared.</p><code>{s.id}-{s.slug}-{String(index).padStart(2,'0')}.webp</code></div>}
function App(){return <BrowserRouter><Routes><Route path="/" element={<Home/>}/><Route path="/surahs" element={<Surahs/>}/><Route path="/surah/:id/:slug" element={<SurahViewer/>}/><Route path="*" element={<Home/>}/></Routes></BrowserRouter>}
createRoot(document.getElementById('root')).render(<App/>);
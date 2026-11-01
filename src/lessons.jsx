import{VoiceSearch}from'./voice-search';
import React,{useState} from 'react';
import {Link,useParams,useLocation} from 'react-router-dom';
import lessons from './lessons-data.json';
import {lessonLinks} from './lesson-links.js';
import {surahs} from './data.js';
import './lessons.css';
import {StoryAdventure,LessonActivities} from './lesson-adventure';
import adventures from './lesson-adventures.json';
function LessonCard({lesson,index}){
 const [failed,setFailed]=useState(0);
 const adventure=adventures[lesson.id];
 const links=lessonLinks(lesson.verse_reference,'en',lesson.id);
 const surah=surahs.find(s=>s.number===Number(lesson.verse_reference.split(':')[0]));
 const referenceImage=links?.slides.length&&surah?`https://visual-quran.kalifs.workers.dev/media/surahs/${surah.id}-${surah.slug}/en/${surah.id}-${surah.slug}-${String(links.slides[0]).padStart(2,'0')}.webp`:null;
 const covers=[adventure?.scenes[0]?.image,referenceImage].filter(Boolean);
 const cover=covers[failed];
 const storyCover=cover===adventure?.scenes[0]?.image;
 return <Link to={`/lessons/${lesson.slug}`} className="ql-card ql-cover-card">
  <div className={`ql-card-cover ${storyCover?'ql-story-cover':'ql-quran-cover'}`}>
   {cover?<img key={cover} src={cover} alt="" loading={index<3?'eager':'lazy'} decoding="async" width="1536" height="1024" onError={()=>setFailed(n=>n+1)}/>:<div className="ql-cover-fallback" aria-hidden="true"><svg viewBox="0 0 80 64" fill="none"><path d="M40 16C29 8 17 8 5 12v40c12-4 24-4 35 4 11-8 23-8 35-4V12c-12-4-24-4-35 4Z" stroke="currentColor" strokeWidth="3"/><path d="M40 16v40M14 22c6-1 12 0 18 3M14 32c6-1 12 0 18 3M48 25c6-3 12-4 18-3M48 35c6-3 12-4 18-3" stroke="currentColor" strokeWidth="2"/></svg></div>}
   <span className="ql-cover-number">{lesson.id}</span>
   <span className="ql-cover-type">{adventure?`${adventure.scenes.length} illustrated scenes`:'Quran reflections'}</span>
  </div>
  <div className="ql-card-copy"><small>{lesson.category}</small><h2>{lesson.title}</h2><p>{lesson.concept}</p><div className="ql-card-footer"><span>Quran {lesson.verse_reference}</span><strong>Read lesson <span aria-hidden="true">↗</span></strong></div></div>
 </Link>;
}
export function Lessons(){
 const {slug}=useParams(),location=useLocation();const ta=new URLSearchParams(location.search).get('lang')==='ta'||(!new URLSearchParams(location.search).has('lang')&&typeof localStorage!=='undefined'&&localStorage.getItem('visual-quran-language')==='ta');const [query,setQuery]=useState('');
 const lesson=lessons.find(item=>item.slug===slug);
 if(slug&&!lesson)return <section className="quran-lessons"><h1>Lesson not found</h1><Link to="/lessons">All lessons</Link></section>;
 if(!lesson)return <section className="quran-lessons"><div className="ql-hero"><span>DISCOVER · UNDERSTAND · LIVE</span><h1>{ta?<>சிறிய கதைகள்.<br/>நிலையான பாடங்கள்.</>:<>Little stories.<br/>Lasting lessons.</>}</h1><p>{ta?"கருணை, நீதி, நம்பிக்கை மற்றும் படைப்பின் அற்புதங்களை குர்ஆன் அடிப்படையிலான கதைகள் மூலம் ஆராயுங்கள்.":"Explore kindness, fairness, faith and the wonders of creation—one Quran-based lesson at a time."}</p></div><label className="ql-search">{ta?"ஒரு பாடத்தைத் தேடுங்கள்":"Find a lesson"}<input value={query} onChange={e=>setQuery(e.target.value)} placeholder={ta?"கருணை, வாக்குறுதி, வசனம்…":"Kindness, promises, a verse…"}/><VoiceSearch onResult={setQuery} language={ta?"ta":"en"} label="Lessons"/></label><div className="ql-grid">{lessons.filter(x=>(x.title+' '+x.category+' '+x.verse_reference).toLowerCase().includes(query.toLowerCase())).map((x,index)=><LessonCard key={x.id} lesson={x} index={index}/>)}</div></section>;
 const links=lessonLinks(lesson.verse_reference,'en',lesson.id),surah=surahs.find(s=>s.number===Number(lesson.verse_reference.split(':')[0]));
 const visualLink=number=>{const url=new URL(links.visual,'https://visual-quran.kalifs.workers.dev');url.searchParams.set('slide',number);return url.pathname+url.search};
 return <article className="quran-lessons ql-lesson"><Link to="/lessons">← {ta?"அனைத்துப் பாடங்கள்":"All lessons"}</Link><div className="ql-hero"><span>{lesson.id} · {lesson.category}</span><h1>{lesson.title}</h1><p>Quran {lesson.verse_reference}</p></div><small>{lesson.story_type}</small><StoryAdventure key={`story-${lesson.id}`} lesson={lesson}/>{links.slides.length?<section className="ql-reference-slides" aria-label="Quran reference slides"><h2>The Quran behind this lesson</h2><p>Read every reference slide here, then explore the passage word by word.</p>{links.slides.map(n=><figure className="ql-figure" key={`${lesson.id}-${n}`}><img src={`https://visual-quran.kalifs.workers.dev/media/surahs/${surah.id}-${surah.slug}/en/${surah.id}-${surah.slug}-${String(n).padStart(2,'0')}.webp`} alt={`Visual explanation for Quran ${lesson.verse_reference}, slide ${n}`} loading="lazy" onError={e=>{e.currentTarget.hidden=true;e.currentTarget.nextElementSibling.hidden=false}}/><p hidden>Image unavailable. Use the visual slide link below to retry.</p><figcaption>Quran {lesson.verse_reference} · <Link to={visualLink(n)}>Open slide {n} ↗</Link></figcaption></figure>)}</section>:<div className="ql-art-pending">A dedicated illustration is planned for this lesson.</div>}<section><h2>What does this mean?</h2><p>{lesson.concept}</p></section><LessonActivities key={`activities-${lesson.id}`} lesson={lesson}/><section className="ql-readers"><h2>Explore the Quran passage</h2><Link to={links.wordByWord}>Read {lesson.verse_reference} word by word →</Link>{links.slides.length?links.slides.map(n=><Link key={n} to={visualLink(n)}>View Quran slide {n} →</Link>):<Link to={links.visual}>Browse the visual Surah →</Link>}</section><details><summary>Quran connection · read together</summary><p>{lesson.explanation}</p></details><p className="ql-note">Original educational lesson draft. Fictional examples are applications of Quranic guidance, not additional events from the Quran.</p></article>;
}

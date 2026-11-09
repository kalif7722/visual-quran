import{VoiceSearch}from'./voice-search';
import React,{useState} from 'react';
import {Link,useParams,useLocation} from 'react-router-dom';
import lessons from './lessons-data.json';
import {lessonLinks} from './lesson-links.js';
import {surahs} from './data.js';
import './lessons.css';
import {StoryAdventure,LessonActivities} from './lesson-adventure';
import adventures from './lesson-adventures.json';
import tamilTitles from './lesson-titles-ta.json';
import tamilContent from './lesson-content-ta.json';
import hadithLessons from './lesson-hadith.json';

const categoryTa={
 'Kind hearts & good character':'அன்பான மனமும் நல்ல பண்பும்',
 'Stories that stay with us':'நினைவில் நிற்கும் கதைகள்',
 'Faith, hope & trust':'ஈமான், நம்பிக்கை மற்றும் அல்லாஹ்வின் மீது சார்ந்திருத்தல்',
 'Family, friends & community':'குடும்பம், நண்பர்கள் மற்றும் சமூகம்',
 'Wonder in creation':'படைப்பின் அதிசயங்கள்',
 'Everyday Quran living':'அன்றாட குர்ஆன் வாழ்வு'
};
const lessonPath=(slug,ta)=>`/lessons/${slug}${ta?'?lang=ta':''}`;
function HadithCard({lessonId,ta}){
 const item=hadithLessons[lessonId];
 if(!item)return null;
 return <section className="ql-hadith" aria-label={ta?'ஹதீஸ் தொடர்பு':'Hadith connection'}>
  <span>{ta?'நேரடி ஹதீஸ் தொடர்பு':'DIRECT HADITH CONNECTION'}</span>
  <h2>{ta?'இந்தப் பாடத்துடன் பொருந்தும் நபிமொழி':'A teaching that directly matches this lesson'}</h2>
  <p lang={ta?'ta':'en'}>{ta?item.teaching_ta:item.teaching_en}</p>
  <a href={item.url} target="_blank" rel="noreferrer">{item.reference} ↗</a>
 </section>;
}
function TamilLessonStory({lesson}){
 const item=tamilContent[lesson.id];
 const adventure=adventures[lesson.id];
 if(!item)return <section lang="ta"><h2>கதையைப் படிப்போம்</h2><p>{lesson.story}</p></section>;
 return <div className="ql-ta-content" lang="ta">
  <section className="ql-ta-story"><h2>கதையைப் படிப்போம்</h2>{item.story.split(/\n\n+/).map((p,i)=><p key={i}>{p}</p>)}</section>
  {adventure?.scenes?.length?<section className="ql-ta-illustrations" aria-label="பாடத்தின் படங்கள்"><h2>கதையின் படங்கள்</h2><div>{adventure.scenes.map((scene,i)=><figure key={scene.image}><img src={scene.image} alt={`பாடம் ${lesson.id} - கதைப் படம் ${i+1}`} loading={i?'lazy':'eager'} width="1536" height="1024"/></figure>)}</div></section>:null}
  <section className="ql-meaning"><h2>இதன் பொருள் என்ன?</h2><p>{item.concept}</p></section>
  <div className="ql-boxes ql-ta-prompts"><section><span>சிந்தித்துப் பாருங்கள்</span><h3>உங்கள் எண்ணம் என்ன?</h3><p>{item.reflection}</p></section><section><span>இன்றைய சிறிய செயல்</span><h3>வாழ்வில் முயற்சி செய்</h3><p>{item.action}</p></section></div>
  {item.remember?<p className="ql-takeaway">{item.remember}</p>:null}
 </div>;
}
function LessonCard({lesson,index,ta}){
 const [failed,setFailed]=useState(0);
 const adventure=adventures[lesson.id];
 const links=lessonLinks(lesson.verse_reference,'en',lesson.id);
 const surah=surahs.find(s=>s.number===Number(lesson.verse_reference.split(':')[0]));
 const referenceImage=links?.slides.length&&surah?`https://visual-quran.kalifs.workers.dev/media/surahs/${surah.id}-${surah.slug}/en/${surah.id}-${surah.slug}-${String(links.slides[0]).padStart(2,'0')}.webp`:null;
 const covers=[adventure?.scenes[0]?.image,referenceImage].filter(Boolean);
 const cover=covers[failed];
 const storyCover=cover===adventure?.scenes[0]?.image;
 const taItem=tamilContent[lesson.id];
 return <Link to={lessonPath(lesson.slug,ta)} className="ql-card ql-cover-card">
  <div className={`ql-card-cover ${storyCover?'ql-story-cover':'ql-quran-cover'}`}>
   {cover?<img key={cover} src={cover} alt="" loading={index<3?'eager':'lazy'} decoding="async" width="1536" height="1024" onError={()=>setFailed(n=>n+1)}/>:<div className="ql-cover-fallback" aria-hidden="true"><svg viewBox="0 0 80 64" fill="none"><path d="M40 16C29 8 17 8 5 12v40c12-4 24-4 35 4 11-8 23-8 35-4V12c-12-4-24-4-35 4Z" stroke="currentColor" strokeWidth="3"/><path d="M40 16v40M14 22c6-1 12 0 18 3M14 32c6-1 12 0 18 3M48 25c6-3 12-4 18-3M48 35c6-3 12-4 18-3" stroke="currentColor" strokeWidth="2"/></svg></div>}
   <span className="ql-cover-number">{lesson.id}</span>
   <span className="ql-cover-type">{adventure?(ta?`${adventure.scenes.length} கதைப் படங்கள்`:`${adventure.scenes.length} illustrated scenes`):(ta?'குர்ஆன் சிந்தனை':'Quran reflections')}</span>
  </div>
  <div className="ql-card-copy"><small>{ta?(categoryTa[lesson.category]||lesson.category):lesson.category}</small><h2>{ta?<><span lang="ta">{tamilTitles[lesson.id]}</span><small className="lesson-title-en" lang="en">{lesson.title}</small></>:lesson.title}</h2><p lang={ta?'ta':'en'}>{ta?(taItem?.concept||lesson.concept):lesson.concept}</p><div className="ql-card-footer"><span>Quran {lesson.verse_reference}</span><strong>{ta?'பாடத்தைப் படிக்க':'Read lesson'} <span aria-hidden="true">↗</span></strong></div></div>
 </Link>;
}
export function Lessons(){
 const {slug}=useParams(),location=useLocation();
 const params=new URLSearchParams(location.search);
 const ta=params.get('lang')==='ta'||(!params.has('lang')&&typeof localStorage!=='undefined'&&localStorage.getItem('visual-quran-language')==='ta');
 const [query,setQuery]=useState('');
 const lesson=lessons.find(item=>item.slug===slug);
 if(slug&&!lesson)return <section className="quran-lessons"><h1>{ta?'பாடம் கிடைக்கவில்லை':'Lesson not found'}</h1><Link to={ta?'/lessons?lang=ta':'/lessons'}>{ta?'அனைத்து பாடங்களும்':'All lessons'}</Link></section>;
 if(!lesson){
  const visible=lessons.filter(x=>{
   const haystack=ta?`${tamilTitles[x.id]||''} ${tamilContent[x.id]?.concept||''} ${x.title} ${x.verse_reference}`:`${x.title} ${x.category} ${x.verse_reference}`;
   return haystack.toLowerCase().includes(query.toLowerCase());
  });
  return <section className="quran-lessons"><div className="ql-hero"><span>{ta?'கண்டறி · புரிந்துகொள் · வாழ்வில் பின்பற்று':'DISCOVER · UNDERSTAND · LIVE'}</span><h1>{ta?<>சிறிய கதைகள்.<br/>நிலையான பாடங்கள்.<small className="title-english">Little stories. Lasting lessons.</small></>:<>Little stories.<br/>Lasting lessons.</>}</h1><p>{ta?"கருணை, நீதி, நம்பிக்கை மற்றும் படைப்பின் அற்புதங்களை குர்ஆன் அடிப்படையிலான கதைகள் மூலம் ஆராயுங்கள்.":"Explore kindness, fairness, faith and the wonders of creation—one Quran-based lesson at a time."}</p></div><label className="ql-search">{ta?"ஒரு பாடத்தைத் தேடுங்கள்":"Find a lesson"}<input value={query} onChange={e=>setQuery(e.target.value)} placeholder={ta?"கருணை, வாக்குறுதி, வசனம்…":"Kindness, promises, a verse…"}/><VoiceSearch onResult={setQuery} language={ta?"ta":"en"} label="Lessons"/></label><div className="ql-grid">{visible.map((x,index)=><LessonCard key={x.id} lesson={x} index={index} ta={ta}/>)}</div></section>;
 }
 const linksEn=lessonLinks(lesson.verse_reference,'en',lesson.id);
 const linksLang=lessonLinks(lesson.verse_reference,ta?'ta':'en',lesson.id);
 const surah=surahs.find(s=>s.number===Number(lesson.verse_reference.split(':')[0]));
 const taItem=tamilContent[lesson.id];
 const visualLink=number=>{const url=new URL(linksEn.visual,'https://visual-quran.kalifs.workers.dev');url.searchParams.set('slide',number);return url.pathname+url.search};
 const storyTypeTa=lesson.story_type==='Quranic account — simplified retelling'?'குர்ஆன் நிகழ்வு — குழந்தைகளுக்கான எளிய மறுபரிசீலனை':'குர்ஆன் வழிகாட்டுதலால் ஊக்கமளிக்கப்பட்ட கல்விக் கதை';
 return <article className="quran-lessons ql-lesson"><Link to={ta?'/lessons?lang=ta':'/lessons'}>← {ta?'அனைத்து பாடங்களும்':'All lessons'}</Link><div className="ql-hero"><span>{lesson.id} · {ta?(categoryTa[lesson.category]||lesson.category):lesson.category}</span><h1>{ta?<><span lang="ta">{tamilTitles[lesson.id]}</span><small className="title-english" lang="en">{lesson.title}</small></>:lesson.title}</h1><p>Quran {lesson.verse_reference}</p></div><small>{ta?storyTypeTa:lesson.story_type}</small>
  {ta?<TamilLessonStory lesson={lesson}/>:<StoryAdventure key={`story-${lesson.id}`} lesson={lesson}/>}
  {linksEn.slides.length?<section className="ql-reference-slides" aria-label={ta?'குர்ஆன் பட விளக்கங்கள்':'Quran reference slides'}><h2>{ta?'இந்தப் பாடத்தின் குர்ஆன் பட விளக்கம்':'The Quran behind this lesson'}</h2><p>{ta?'இந்தக் கதையுடன் தொடர்புடைய குர்ஆன் படங்களைப் பாருங்கள்; பின்னர் வசனத்தை வார்த்தை வார்த்தையாக வாசியுங்கள்.':'Read every reference slide here, then explore the passage word by word.'}</p>{linksEn.slides.map(n=><figure className="ql-figure" key={`${lesson.id}-${n}`}><img src={`https://visual-quran.kalifs.workers.dev/media/surahs/${surah.id}-${surah.slug}/en/${surah.id}-${surah.slug}-${String(n).padStart(2,'0')}.webp`} alt={ta?`குர்ஆன் ${lesson.verse_reference} பட விளக்கம், ஸ்லைடு ${n}`:`Visual explanation for Quran ${lesson.verse_reference}, slide ${n}`} loading="lazy" onError={e=>{e.currentTarget.hidden=true;e.currentTarget.nextElementSibling.hidden=false}}/><p hidden>{ta?'படம் கிடைக்கவில்லை. கீழே உள்ள இணைப்பைத் திறக்கவும்.':'Image unavailable. Use the visual slide link below to retry.'}</p><figcaption>Quran {lesson.verse_reference} · <Link to={visualLink(n)}>{ta?`ஸ்லைடு ${n} திறக்க`:`Open slide ${n}`} ↗</Link></figcaption></figure>)}</section>:<div className="ql-art-pending">{ta?'இந்தப் பாடத்திற்கான தனிப்பட்ட படம் திட்டமிடப்பட்டுள்ளது.':'A dedicated illustration is planned for this lesson.'}</div>}
  {!ta?<section><h2>What does this mean?</h2><p>{lesson.concept}</p></section>:null}
  <HadithCard lessonId={lesson.id} ta={ta}/>
  {!ta?<LessonActivities key={`activities-${lesson.id}`} lesson={lesson}/>:null}
  <section className="ql-readers"><h2>{ta?'குர்ஆன் வசனத்தை மேலும் ஆராயுங்கள்':'Explore the Quran passage'}</h2><Link to={linksLang.wordByWord}>{ta?`${lesson.verse_reference} வசனத்தை வார்த்தை வார்த்தையாக வாசிக்க`:`Read ${lesson.verse_reference} word by word`} →</Link>{linksEn.slides.length?linksEn.slides.map(n=><Link key={n} to={visualLink(n)}>{ta?`குர்ஆன் ஸ்லைடு ${n} பார்க்க`:`View Quran slide ${n}`} →</Link>):<Link to={linksEn.visual}>{ta?'காட்சி ஸூராவைப் பார்க்க':'Browse the visual Surah'} →</Link>}</section>
  <details><summary>{ta?'குர்ஆன் தொடர்பு · ஒன்றாகப் படிப்போம்':'Quran connection · read together'}</summary><p lang={ta?'ta':'en'}>{ta?(taItem?.explanation||lesson.explanation):lesson.explanation}</p></details>
  <p className="ql-note">{ta?'குழந்தைகளுக்கான கல்விப் பாடம். கற்பனை உதாரணங்கள் குர்ஆன் வழிகாட்டுதலின் பயன்பாடுகள் மட்டுமே; அவை குர்ஆனில் கூடுதல் நிகழ்வுகளாக கூறப்படவில்லை.':'Original educational lesson draft. Fictional examples are applications of Quranic guidance, not additional events from the Quran.'}</p>
 </article>;
}

import React,{useEffect,useState} from 'react';
import adventures from './lesson-adventures.json';
const emptyProgress={read:false,reflect:false,mission:false};
export function loadProgress(id){try{return {...emptyProgress,...JSON.parse(localStorage.getItem(`visual-quran-lesson-${id}`)||'{}')}}catch{return {...emptyProgress}}}
export function LessonActivities({lesson}){
 const adventure=adventures[lesson.id];
 const[progress,setProgress]=useState(()=>loadProgress(lesson.id));
 useEffect(()=>{try{localStorage.setItem(`visual-quran-lesson-${lesson.id}`,JSON.stringify(progress))}catch{}},[lesson.id,progress]);
 const done=Object.values(progress).filter(Boolean).length;
 return <section className="ql-activities" aria-label="Lesson activities">
  <div className="ql-activity-heading"><span>BRING THE LESSON INTO YOUR DAY</span><h2>Little steps. Real understanding.</h2><p>Read, explain and practise. Take your time—you can return later.</p></div>
  <div className="ql-boxes"><section><span>YOUR REAL-LIFE MISSION</span><h3>Try one small action</h3><p>{adventure?.mission||lesson.action}</p><p className="ql-small">Ask a trusted adult for help if needed. Do not share personal details or photos here.</p></section><section><span>TALK TOGETHER</span><h3>Teach it back</h3><p>{adventure?.talk||lesson.reflection}</p><p>Explain the lesson in your own words. Give a different example from home, school or play.</p><details><summary>Need a starting sentence?</summary><p>“This lesson means… One way I could practise it is…”</p></details></section></div>
  <section className="ql-progress"><h3>My learning steps</h3><p>{done} of 3 steps completed · saved on this device</p><progress max="3" value={done} aria-label="Lesson learning steps"/>{[['read','I read the story and noticed the important choice.'],['reflect','I explained the lesson in my own words.'],['mission','I tried my real-life mission.']].map(([key,text])=><label key={key}><input type="checkbox" checked={progress[key]} onChange={e=>setProgress(p=>({...p,[key]:e.target.checked}))}/><span>{text}</span></label>)}{done===3&&<div className="ql-completion" role="status"><strong>Lesson explored!</strong><p>You have read, reflected and practised. Keep looking for chances to use what you learned.</p></div>}<button className="ql-secondary" onClick={()=>setProgress({...emptyProgress})}>Reset my learning steps</button></section>
 </section>;
}
export function StoryAdventure({lesson}){
 const adventure=adventures[lesson.id];
 const[choice,setChoice]=useState(null);const[showEnding,setShowEnding]=useState(false);
 if(!adventure)return <section><h2>Let's read the story</h2><p className="ql-story">{lesson.story}</p></section>;
 const split=adventure.decisionAfter||2;
 const scene=(item,index)=><section className="ql-story-scene" key={item.image}><div className="ql-scene-heading"><span>{String(index+1).padStart(2,'0')}</span><h2>{item.title}</h2></div><figure><img src={item.image} alt={item.alt} loading={index?'lazy':'eager'} width="1536" height="1024"/><figcaption>{item.text.split(/\n\n+/).map((paragraph,i)=><p key={i}>{paragraph}</p>)}</figcaption></figure><blockquote><span>{item.speaker}</span><p>“{item.dialogue}”</p></blockquote></section>;
 return <div className="ql-adventure"><p className="ql-adventure-theme">{adventure.theme}</p>{adventure.scenes.slice(0,split).map(scene)}<section className="ql-decision"><span>PAUSE THE STORY</span><h2>{adventure.decision.question}</h2><p>Choose an answer to explore what it would mean.</p><div className="ql-choice-list">{adventure.decision.choices.map((item,index)=><button key={item.text} aria-pressed={choice===index} onClick={()=>setChoice(index)}><b>{String.fromCharCode(65+index)}</b><span>{item.text}</span></button>)}</div>{choice!==null&&<p className="ql-feedback" role="status">{adventure.decision.choices[choice].feedback}</p>}<button className="ql-reveal" onClick={()=>setShowEnding(v=>!v)} aria-expanded={showEnding}>{showEnding?'Hide the ending':'See what happened next →'}</button></section>{showEnding&&adventure.scenes.slice(split).map((item,i)=>scene(item,split+i))}<div className="ql-word"><span>WORD TO REMEMBER</span><h3>{adventure.word.term}</h3><p>{adventure.word.meaning}</p></div><p className="ql-takeaway">{adventure.remember}</p></div>;
}

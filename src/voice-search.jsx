import React,{useEffect,useId,useRef,useState}from'react';
import{speechSupported,startVoiceSearch}from'./speech-recognition.js';
import './voice-search.css';
export function VoiceSearch({onResult,language='en',label='Search'}){
 const[locale,setLocale]=useState(language==='ta'?'ta-IN':'en-IN'),[listening,setListening]=useState(false),[message,setMessage]=useState('');
 const session=useRef(null),callback=useRef(onResult);callback.current=onResult;const id=useId();const supported=speechSupported();
 useEffect(()=>{setLocale(language==='ta'?'ta-IN':'en-IN');session.current?.cancel();setMessage('')},[language]);
 useEffect(()=>()=>session.current?.cancel(false),[]);
 const toggle=()=>{
  if(listening){session.current?.stop();return}
  if(!supported){setMessage('Voice search is unavailable in this browser. Please type your search.');return}
  setMessage('Listening… Speak your search.');setListening(true);
  try{session.current=startVoiceSearch({language:locale,onText:text=>{callback.current(text.replace(/[.!?।]+$/u,'').trim());setMessage(`Heard: ${text}`)},onEnd:()=>{setListening(false);setMessage(m=>m.startsWith('Listening')?'No speech detected. Try again or type your search.':m)},onError:code=>setMessage(({'not-allowed':'Microphone permission was denied. Allow it in browser settings or type your search.','service-not-allowed':'Voice recognition is unavailable. Please type your search.','audio-capture':'No microphone was found. Check your device or type your search.','no-speech':'No speech detected. Try again or type your search.',network:'Voice recognition could not connect. Check your connection or type your search.',aborted:'Voice search stopped.','language-not-supported':'This spoken language is unavailable. Choose another language or type.'})[code]||'Voice search could not start. Please try again or type your search.')})}catch{setListening(false);setMessage('Voice search could not start. Check microphone access or type your search.')}
 };
 return <div className="voice-search" onClick={e=>e.stopPropagation()}><div className="voice-controls"><button type="button" className={`voice-mic ${listening?'is-listening':''}`} onClick={toggle} aria-label={`${listening?'Stop voice search':'Voice search'}: ${label}`} aria-pressed={listening} aria-describedby={id} title={supported?'Speak to search. Your browser may process audio through an online recognition service.':'Voice input is unavailable in this browser; typed search still works.'}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="9" y="2" width="6" height="12" rx="3" stroke="currentColor" strokeWidth="1.8"/><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg><span>{listening?'Stop':'Speak'}</span></button><select aria-label={`Spoken language: ${label}`} value={locale} disabled={listening} onChange={e=>setLocale(e.target.value)}><option value="en-IN">EN</option><option value="ta-IN">தமிழ்</option><option value="ar-SA">العربية</option></select></div><span className="voice-status" id={id} role="status">{message}</span></div>;
}

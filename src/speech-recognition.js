let activeSession=null;
export function speechSupported(host=globalThis){return Boolean(host.SpeechRecognition||host.webkitSpeechRecognition)}
export function startVoiceSearch({host=globalThis,language='en-IN',onText=()=>{},onError=()=>{},onEnd=()=>{}}){
 const Recognition=host.SpeechRecognition||host.webkitSpeechRecognition;
 if(!Recognition)throw Error('unsupported');
 activeSession?.cancel();
 const recognition=new Recognition();let closed=false;
 const finish=()=>{if(closed)return;closed=true;if(activeSession===session)activeSession=null;recognition.onresult=recognition.onerror=recognition.onend=null;onEnd()};
 const session={stop:()=>{if(!closed){try{recognition.stop()}catch{finish()}}},cancel:(notify=true)=>{if(closed)return;recognition.onresult=recognition.onerror=recognition.onend=null;closed=true;if(activeSession===session)activeSession=null;try{recognition.abort()}catch{}if(notify)onEnd()}};
 recognition.lang=language;recognition.continuous=false;recognition.interimResults=false;recognition.maxAlternatives=1;
 recognition.onresult=event=>{if(closed)return;const text=Array.from(event.results).filter(r=>r.isFinal!==false).map(r=>r[0]?.transcript||'').join(' ').trim();if(text)onText(text)};
 recognition.onerror=event=>{if(closed)return;onError(event.error);finish()};recognition.onend=finish;activeSession=session;
 try{recognition.start()}catch(error){session.cancel(false);throw error}
 return session;
}
export function normalizeSurahSearch(value){return value.toLowerCase().normalize('NFKD').replace(/\p{M}/gu,'').replace(/\b(surah|sura|chapter)\b/g,'').replace(/[^\p{L}\p{N}]+/gu,'')}
export function matchesSurah(s,query){return normalizeSurahSearch(`${s.number} ${s.id} ${s.name} ${s.meaning}`).includes(normalizeSurahSearch(query))}

export function recordingSupported(host=globalThis){return Boolean(host.navigator?.mediaDevices?.getUserMedia&&host.MediaRecorder)}
export async function startRecordedVoiceSearch({host=globalThis,language='en-IN',onText=()=>{},onError=()=>{},onEnd=()=>{}}){
 if(!recordingSupported(host))throw Error('unsupported');
 const stream=await host.navigator.mediaDevices.getUserMedia({audio:true});
 let recorder,closed=false,timeout,controller=new AbortController(),chunks=[];
 const finish=()=>{if(closed)return;closed=true;clearTimeout(timeout);stream.getTracks().forEach(t=>t.stop());onEnd()};
 const session={stop:()=>{if(!closed&&recorder.state==='recording')recorder.stop()},cancel:(notify=true)=>{if(closed)return;controller.abort();recorder.onstop=null;recorder.onerror=null;try{if(recorder.state==='recording')recorder.stop()}catch{}if(notify)finish();else{closed=true;clearTimeout(timeout);stream.getTracks().forEach(t=>t.stop())}}};
 try{
  recorder=new host.MediaRecorder(stream,{mimeType:['audio/webm;codecs=opus','audio/ogg;codecs=opus','audio/mp4'].find(t=>host.MediaRecorder.isTypeSupported?.(t))||undefined});
  recorder.ondataavailable=e=>{if(e.data?.size)chunks.push(e.data)};
  recorder.onerror=()=>{onError('audio-capture');finish()};
  recorder.onstop=async()=>{
   stream.getTracks().forEach(t=>t.stop());clearTimeout(timeout);
   if(closed)return;
   const blob=new Blob(chunks,{type:recorder.mimeType||'audio/webm'});
   if(!blob.size){onError('no-speech');finish();return}
   try{
    const response=await host.fetch(`/api/voice-transcribe?lang=${language.split('-')[0]}`,{method:'POST',body:blob,headers:{'Content-Type':blob.type},signal:controller.signal});
    if(!response.ok)throw Error('transcription');
    const data=await response.json();if(data.text)onText(data.text);else onError('no-speech');
   }catch{if(!controller.signal.aborted)onError('network')}finally{finish()}
  };
  recorder.start();timeout=setTimeout(()=>session.stop(),10000);
  return session;
 }catch(error){session.cancel(false);throw error}
}

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

const spokenAliases={1:['fatiha','fatihah','fathiya','பாத்திஹா','பாதிஹா'],2:['baqara','bakara','பகரா','பகறா'],18:['kahaf','கஹ்ஃப்','கஹப்'],36:['yaseen','ya sin','யாசீன்'],55:['rahman','ரஹ்மான்'],67:['mulk','முல்க்'],112:['ikhlas','இக்லாஸ்'],113:['falaq','பலக்'],114:['nas','நாஸ்']};
function distance(a,b){const previous=Array.from({length:b.length+1},(_,i)=>i);for(let i=1;i<=a.length;i++){let diagonal=previous[0];previous[0]=i;for(let j=1;j<=b.length;j++){const old=previous[j];previous[j]=Math.min(previous[j]+1,previous[j-1]+1,diagonal+(a[i-1]===b[j-1]?0:1));diagonal=old}}return previous[b.length]}
export function searchSurahs(surahs,query){
 const q=normalizeSurahSearch(query);
 if(!q)return {results:surahs,suggestions:false};
 const exact=surahs.filter(s=>matchesSurah(s,query)||(spokenAliases[s.number]||[]).some(a=>normalizeSurahSearch(a).includes(q)));
 if(exact.length)return {results:exact,suggestions:false};
 if(q.length<3)return {results:[],suggestions:false};
 const ranked=surahs.map(s=>{
  const names=[s.name,s.meaning,...(spokenAliases[s.number]||[])].map(normalizeSurahSearch);
  return {s,score:Math.min(...names.map(n=>distance(q,n)/Math.max(q.length,n.length)))};
 }).filter(x=>x.score<=0.29).sort((a,b)=>a.score-b.score).slice(0,4);
 const close=ranked.filter(x=>x.score<=ranked[0].score+0.12);
 return {results:close.map(x=>x.s),suggestions:Boolean(close.length)};
}

export function recordingSupported(host=globalThis){return Boolean(host.navigator?.mediaDevices?.getUserMedia&&host.MediaRecorder)}
export async function startRecordedVoiceSearch({host=globalThis,language='en-IN',onText=()=>{},onError=()=>{},onEnd=()=>{},onProcessing=()=>{}}){
 if(!recordingSupported(host))throw Error('unsupported');
 const stream=await host.navigator.mediaDevices.getUserMedia({audio:true});
 let recorder,closed=false,timeout,meter,context,controller=new AbortController(),chunks=[];
 const cleanup=()=>{clearTimeout(timeout);clearInterval(meter);context?.close().catch(()=>{});stream.getTracks().forEach(t=>t.stop())};
 const finish=()=>{if(closed)return;closed=true;cleanup();onEnd()};
 const session={stop:()=>{if(!closed&&recorder.state==='recording'){clearInterval(meter);onProcessing();recorder.stop()}},cancel:(notify=true)=>{if(closed)return;controller.abort();recorder.onstop=null;recorder.onerror=null;try{if(recorder.state==='recording')recorder.stop()}catch{}if(notify)finish();else{closed=true;cleanup()}}};
 try{
  recorder=new host.MediaRecorder(stream,{mimeType:['audio/webm;codecs=opus','audio/ogg;codecs=opus','audio/mp4'].find(t=>host.MediaRecorder.isTypeSupported?.(t))||undefined});
  recorder.ondataavailable=e=>{if(e.data?.size)chunks.push(e.data)};
  recorder.onerror=()=>{onError('audio-capture');finish()};
  recorder.onstop=async()=>{
   cleanup();
   if(closed)return;
   const blob=new Blob(chunks,{type:recorder.mimeType||'audio/webm'});
   if(!blob.size){onError('no-speech');finish();return}
   try{
    const response=await host.fetch(`/api/voice-transcribe?lang=${language.split('-')[0]}`,{method:'POST',body:blob,headers:{'Content-Type':blob.type},signal:controller.signal});
    if(!response.ok)throw Error('transcription');
    const data=await response.json();if(data.text)onText(data.text);else onError('no-speech');
   }catch{if(!controller.signal.aborted)onError('network')}finally{finish()}
  };
  recorder.start();timeout=setTimeout(()=>session.stop(),9000);
  const AudioContext=host.AudioContext||host.webkitAudioContext;
  if(AudioContext){
   try{
    context=new AudioContext();const source=context.createMediaStreamSource(stream),analyser=context.createAnalyser();analyser.fftSize=1024;source.connect(analyser);
    const samples=new Float32Array(analyser.fftSize);let heard=false,quietSince=0,started=Date.now();
    meter=setInterval(()=>{
     if(recorder.state!=='recording')return;
     analyser.getFloatTimeDomainData(samples);
     const level=Math.sqrt(samples.reduce((sum,v)=>sum+v*v,0)/samples.length),now=Date.now();
     if(level>0.018){heard=true;quietSince=0}
     else if(heard&&now-started>650){quietSince||=now;if(now-quietSince>950)session.stop()}
    },120);
   }catch{context?.close().catch(()=>{});context=null}
  }
  return session;
 }catch(error){session.cancel(false);throw error}
}

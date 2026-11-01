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

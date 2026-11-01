import assert from 'node:assert/strict';
import {surahs} from '../src/data.js';
import {searchSurahs,startRecordedVoiceSearch} from '../src/speech-recognition.js';
assert.deepEqual(searchSurahs(surahs,'Al Bakrah').results.map(s=>s.number),[2]);
assert.deepEqual(searchSurahs(surahs,'Raman').results.map(s=>s.number),[55]);
assert.deepEqual(searchSurahs(surahs,'banana').results,[]);
assert.equal(searchSurahs(surahs,'Surah Al-Baqarah').suggestions,false);
let stopped=false,processed=false,recognized='',trackStopped=false;
class Recorder{
 static isTypeSupported=type=>type==='audio/webm;codecs=opus';
 constructor(){this.state='inactive';this.mimeType='audio/webm'}
 start(){this.state='recording'}
 stop(){this.state='inactive';stopped=true;this.ondataavailable({data:new Blob(['speech'],{type:'audio/webm'})});this.onstop()}
}
class AudioContext{
 createMediaStreamSource(){return {connect(){}}}
 createAnalyser(){return {fftSize:1024,getFloatTimeDomainData(data){data.fill(Date.now()-start<400?.08:0)}}}
 close(){return Promise.resolve()}
}
const start=Date.now();
const host={MediaRecorder:Recorder,AudioContext,navigator:{mediaDevices:{getUserMedia:async()=>({getTracks:()=>[{stop(){trackStopped=true}}]})}},fetch:async()=>({ok:true,json:async()=>({text:'Al Bakrah'})})};
await startRecordedVoiceSearch({host,onProcessing:()=>processed=true,onText:t=>recognized=t});
await new Promise((resolve,reject)=>{const timer=setInterval(()=>{if(stopped&&recognized){clearInterval(timer);resolve()}else if(Date.now()-start>4000){clearInterval(timer);reject(Error('Voice did not stop after silence'))}},50)});
assert.equal(processed,true);assert.equal(trackStopped,true);assert.equal(recognized,'Al Bakrah');
console.log('Voice stops after silence, transcribes automatically, and suggests nearby Surahs.');

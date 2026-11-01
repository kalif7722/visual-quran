import assert from'node:assert/strict';
import{speechSupported,startVoiceSearch,matchesSurah}from'../src/speech-recognition.js';
class Recognition{static instances=[];constructor(){Recognition.instances.push(this)}start(){this.started=true}stop(){this.stopped=true;this.onend?.()}abort(){this.aborted=true}}
const host={webkitSpeechRecognition:Recognition};let text='',ends=0,error='';
assert.equal(speechSupported({}),false);assert.throws(()=>startVoiceSearch({host:{}}),/unsupported/);
const first=startVoiceSearch({host,language:'ta-IN',onText:t=>text=t,onEnd:()=>ends++});const a=Recognition.instances.at(-1);assert.equal(a.lang,'ta-IN');assert.equal(a.continuous,false);
a.onresult({results:[{0:{transcript:'Mercy'},isFinal:false}]});assert.equal(text,'');
a.onresult({results:[{0:{transcript:'  prayer  '},isFinal:true}]});assert.equal(text,'prayer');
startVoiceSearch({host,onError:e=>error=e,onEnd:()=>ends++});assert.equal(a.aborted,true);assert.equal(ends,1);assert.equal(a.onresult,null);
const b=Recognition.instances.at(-1);b.onerror({error:'not-allowed'});assert.equal(error,'not-allowed');assert.equal(ends,2);assert.equal(b.onresult,null);
const third=startVoiceSearch({host,onEnd:()=>ends++});third.cancel(false);assert.equal(ends,2);assert.equal(Recognition.instances.at(-1).aborted,true);
const fourth=startVoiceSearch({host,onEnd:()=>ends++});fourth.stop();assert.equal(ends,3);assert.equal(Recognition.instances.at(-1).stopped,true);
class Broken{start(){throw Error('blocked')}abort(){}}
assert.throws(()=>startVoiceSearch({host:{SpeechRecognition:Broken}}),/blocked/);
assert.equal(matchesSurah({number:2,id:'002',name:'Al-Baqarah',meaning:'The Cow'},'Surah Al Baqarah.'),true);
assert.equal(matchesSurah({number:1,id:'001',name:'Al-Fatihah',meaning:'The Opening'},'the opening'),true);
console.log('Voice sessions: feature detection, locale, final transcript, cross-control cancellation, permission errors, cleanup, stop and spoken Surah names passed.');

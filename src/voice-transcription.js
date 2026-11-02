// Short, user-initiated recordings only. Audio is never stored by this Worker.
export async function serveVoiceTranscription(request,env){
 const headers={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
 if(request.method!=='POST')return Response.json({error:'Method not allowed'},{status:405,headers});
 const type=request.headers.get('content-type')||'';
 const language=new URL(request.url).searchParams.get('lang')||'en';
 if(!['en','ta','ar','ur','hi'].includes(language)||!/^audio\/(webm|ogg|mp4|mpeg|wav)/i.test(type))return Response.json({error:'Unsupported audio or language'},{status:415,headers});
 const length=Number(request.headers.get('content-length')||0);
 if(length>2_000_000)return Response.json({error:'Recording too large'},{status:413,headers});
 if(!env.AI)return Response.json({error:'Speech transcription is not configured'},{status:503,headers});
 try{
  const audio=await request.arrayBuffer();
  if(!audio.byteLength||audio.byteLength>2_000_000)return Response.json({error:'Recording must be under 2 MB'},{status:413,headers});
  const bytes=new Uint8Array(audio);let binary='';for(let i=0;i<bytes.length;i+=8192)binary+=String.fromCharCode(...bytes.subarray(i,i+8192));
  const result=await env.AI.run('@cf/openai/whisper-large-v3-turbo',{audio:btoa(binary),task:'transcribe',language});
  return Response.json({text:String(result?.text||'').trim()},{headers});
 }catch{return Response.json({error:'Transcription unavailable; please try again'},{status:502,headers})}
}

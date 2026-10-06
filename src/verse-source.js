import{surahs}from'./data.js';
const editions={en:'english_rwwad',ta:'tamil_baqavi'};
export async function serveVerseChapter(request,{fetchSource=fetch,cache=globalThis.caches?.default}={}){
 const url=new URL(request.url),match=url.pathname.match(/^\/api\/theme-verses\/(\d{1,3})$/),number=Number(match?.[1]);
 const language=url.searchParams.get('lang')||'en',key=editions[language];
 const s=surahs.find(s=>s.number===number);
 if(request.method!=='GET'||!s||!key)return Response.json({error:'Invalid verse request'},{status:400});
 const cacheKey=new Request(`${url.origin}/api/theme-verses/${number}?lang=${language}`);
 const cached=await cache?.match(cacheKey);if(cached)return cached;
 try{
  const [metaResponse,chapterResponse]=await Promise.all([
   fetchSource('https://quranenc.com/api/v1/translations/list/',{signal:AbortSignal.timeout(12000)}),
   fetchSource(`https://quranenc.com/api/v1/translation/sura/${key}/${number}`,{signal:AbortSignal.timeout(12000)})
  ]);
  if(!metaResponse.ok||!chapterResponse.ok)throw Error('Source unavailable');
  const [meta,chapter]=await Promise.all([metaResponse.json(),chapterResponse.json()]);
  const info=(Array.isArray(meta)?meta:meta.translations||meta.result||[]).find(t=>t.key===key);
  const rows=Array.isArray(chapter)?chapter:chapter.result;
  if(!info?.version||!Array.isArray(rows)||rows.length!==s.ayahs)throw Error('Incomplete source');
  const verses=rows.map((v,i)=>{
   if(Number(v.sura)!==number||Number(v.aya)!==i+1||typeof v.arabic_text!=='string'||!v.arabic_text.trim()||typeof v.translation!=='string'||!v.translation.trim())throw Error('Invalid source verse');
   return{verse:Number(v.aya),arabic:v.arabic_text,translation:v.translation,footnotes:v.footnotes||''};
  });
  const response=Response.json({surah:number,source:{key,title:info.title,version:info.version,description:info.description,lastUpdate:info.last_update,url:'https://quranenc.com'},verses},{headers:{'Cache-Control':'public, max-age=3600','X-Content-Type-Options':'nosniff'}});
  await cache?.put(cacheKey,response.clone());return response;
 }catch{return Response.json({error:'Verse source temporarily unavailable'},{status:502,headers:{'Cache-Control':'no-store'}})}
}

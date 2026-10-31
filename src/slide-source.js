import{surahs}from'./data.js';
export async function serveSlideList(request,env){
 const url=new URL(request.url),m=url.pathname.match(/^\/api\/surah-slides\/(\d{3})\/([a-z0-9-]+)\/(en|ta)$/),s=surahs.find(s=>s.id===m?.[1]&&s.slug===m?.[2]);
 if(request.method!=='GET'||!s)return Response.json({error:'Invalid Surah request'},{status:400});
 const language=m[3],base=`surahs/${s.id}-${s.slug}`,folder=`${base}/${language}/`,pattern=new RegExp(`^${s.id}-${s.slug}-(\\d+)\\.webp$`);
 try{
  // Listing reflects actual uploads, including when no manifest was uploaded.
  const files=[];let cursor;
  do{const page=await env.QURAN_ASSETS.list({prefix:folder,cursor,limit:1000});for(const o of page.objects){const filename=o.key.slice(folder.length),match=filename.match(pattern);if(match)files.push({number:Number(match[1]),filename,version:o.etag||o.uploaded?.toISOString?.()||String(o.size||'')})}cursor=page.truncated?page.cursor:undefined}while(cursor);
  // A manifest supplies ordering only: actual uploads remain the source of truth.
  // Keep filename numbers stable for bookmarks, lesson mappings and jump controls.
  const order=new Map();
  if(env.QURAN_ASSETS.get){
   for(const key of [`${folder}manifest.json`,`${base}/manifest.json`]){
    try{
     const object=await env.QURAN_ASSETS.get(key);if(!object)continue;
     const manifest=await object.json();
     if(manifest.language?manifest.language!==language:key===`${base}/manifest.json`&&language!=='en')continue;
     if(!Array.isArray(manifest.files))continue;
     const entries=manifest.files.map((entry,index)=>({filename:entry.file,position:entry.slide??index+1}));
     if(entries.some(e=>typeof e.filename!=='string'||!pattern.test(e.filename)||!Number.isFinite(e.position)||e.position<=0)||new Set(entries.map(e=>e.filename)).size!==entries.length)continue;
     for(const entry of entries)order.set(entry.filename,entry.position);
     break;
    }catch{/* Missing or malformed manifests must not hide uploaded slides. */}
   }
  }
  files.sort((a,b)=>(order.get(a.filename)??a.number)-(order.get(b.filename)??b.number)||a.number-b.number);if(new Set(files.map(f=>f.number)).size!==files.length)throw Error('Duplicate slide numbers');
  return Response.json({language,surah:s.number,slides:files.length,files},{headers:{'Cache-Control':'no-store'}});
 }catch{return Response.json({error:'Slide listing temporarily unavailable'},{status:502,headers:{'Cache-Control':'no-store'}})}
}

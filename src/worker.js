import{serveSlideList}from'./slide-source.js';
import{serveVerseChapter}from'./verse-source.js';

const corsHeaders={
  'Access-Control-Allow-Origin':'*',
  'Access-Control-Allow-Methods':'GET,OPTIONS',
  'Access-Control-Allow-Headers':'Content-Type'
};

function withCors(response){
  const headers=new Headers(response.headers);
  for(const[key,value]of Object.entries(corsHeaders))headers.set(key,value);
  return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if(request.method==='OPTIONS')return new Response(null,{status:204,headers:corsHeaders});

    if (url.pathname.startsWith('/api/surah-slides/')) return withCors(await serveSlideList(request,env));

    if (url.pathname.startsWith('/api/theme-verses/')) return withCors(await serveVerseChapter(request));

    if (url.pathname.startsWith('/media/')) {
      const key = decodeURIComponent(url.pathname.slice('/media/'.length));
      if (!key || key.includes('..')) {
        return new Response('Bad request', { status: 400, headers:corsHeaders });
      }

      // Normal convention: URL /media/foo/bar.png -> R2 key foo/bar.png.
      // Also tolerate assets that were uploaded into an actual R2 `media/` folder,
      // plus both visual-quran-logo.png and visual_quran_logo.png naming styles.
      const candidates = [key, 'media/'+key];

      if (key.includes('visual-quran-logo.png')) {
        const alt = key.replace('visual-quran-logo.png', 'visual_quran_logo.png');
        candidates.push(alt, 'media/'+alt);
      } else if (key.includes('visual_quran_logo.png')) {
        const alt = key.replace('visual_quran_logo.png', 'visual-quran-logo.png');
        candidates.push(alt, 'media/'+alt);
      }

      let object = null;
      let resolvedKey = key;

      for (const candidate of [...new Set(candidates)]) {
        object = await env.QURAN_ASSETS.get(candidate);
        if (object) {
          resolvedKey = candidate;
          break;
        }
      }

      if (!object) {
        return new Response('Not found', { status: 404, headers:corsHeaders });
      }

      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set('etag', object.httpEtag);
      headers.set('cache-control', resolvedKey.endsWith('manifest.json') ? 'no-cache' : 'public, max-age=31536000, immutable');
      headers.set('x-content-type-options', 'nosniff');
      for(const[key,value]of Object.entries(corsHeaders))headers.set(key,value);

      return new Response(object.body, { headers });
    }

    return env.ASSETS.fetch(request);
  }
}
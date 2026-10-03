export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/media/')) {
      const key = decodeURIComponent(url.pathname.slice('/media/'.length));
      if (!key || key.includes('..')) {
        return new Response('Bad request', { status: 400 });
      }

      const object = await env.QURAN_ASSETS.get(key);
      if (!object) {
        return new Response('Not found', { status: 404 });
      }

      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set('etag', object.httpEtag);
      headers.set('cache-control', key.endsWith('manifest.json') ? 'no-cache' : 'public, max-age=31536000, immutable');
      headers.set('x-content-type-options', 'nosniff');

      return new Response(object.body, { headers });
    }

    return env.ASSETS.fetch(request);
  }
};

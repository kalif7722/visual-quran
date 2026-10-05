export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/media/')) {
      const key = decodeURIComponent(url.pathname.slice('/media/'.length));
      if (!key || key.includes('..')) {
        return new Response('Bad request', { status: 400 });
      }

      // Normal convention: URL /media/foo/bar.png -> R2 key foo/bar.png.
      // Also tolerate assets that were uploaded into an actual R2 `media/` folder,
      // plus both visual-quran-logo.png and visual_quran_logo.png naming styles.
      const candidates = [key, `media/${key}`];

      if (key.includes('visual-quran-logo.png')) {
        const alt = key.replace('visual-quran-logo.png', 'visual_quran_logo.png');
        candidates.push(alt, `media/${alt}`);
      } else if (key.includes('visual_quran_logo.png')) {
        const alt = key.replace('visual_quran_logo.png', 'visual-quran-logo.png');
        candidates.push(alt, `media/${alt}`);
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
        return new Response('Not found', { status: 404 });
      }

      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set('etag', object.httpEtag);
      headers.set('cache-control', resolvedKey.endsWith('manifest.json') ? 'no-cache' : 'public, max-age=31536000, immutable');
      headers.set('x-content-type-options', 'nosniff');

      return new Response(object.body, { headers });
    }

    return env.ASSETS.fetch(request);
  }
};
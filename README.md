# Visual Quran

Visual learning website covering all 114 Surahs of the Quran.

## Current status
- Responsive website shell complete
- All 114 Surahs are already mapped in navigation
- Al-Fatihah viewer is prepared for 12 visual slides
- English-first structure with Tamil-ready parallel asset paths
- Cloudflare Workers/Pages deployment configuration included
- Cloudflare R2 asset loading is supported through `VITE_ASSET_BASE_URL`

## Cloudflare build settings
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Preview command: `npx wrangler preview`

## R2 asset convention
Set the Cloudflare environment variable `VITE_ASSET_BASE_URL` to the public base URL of the R2 bucket/custom asset domain.

Upload visuals using this structure:

```text
surahs/
  001-al-fatihah/
    en/
      001-al-fatihah-01.webp
      001-al-fatihah-02.webp
      ...
      001-al-fatihah-12.webp
    ta/
      001-al-fatihah-01.webp
      ...
```

The application builds the image URL from the Surah number, slug, language and slide number, so no code change is required when correctly named files are uploaded.

## Languages
English launches first. Tamil uses the same Surah structure with a parallel `ta/` directory so visuals can be swapped without redesigning the site.

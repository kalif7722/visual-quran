# Links from lessons to Quran readers

Word study accepts `surah`, `verse`, optional `endVerse`, and `lang=en|ta`. It selects the page containing the starting verse, scrolls to it after data loads, and highlights the requested verses as their pages are viewed. Switching Surah clears old verse parameters. Example: `/word-by-word?surah=49&verse=11&lang=en`.

The visual viewer accepts `slide=<uploaded slide number>` and resolves the number against the actual uploaded file listing. A slide link alone does not certify which verse the slide explains.

Verse-aware links use `/surah/049/al-hujurat?verse=11&lang=en`. The resolver in `src/lesson-links.js` supports individually verified verse-to-slide mappings, currently empty. Existing English Al-Baqarah section mappings provide an explicitly labelled section-level fallback. Other verse requests explain that the exact visual slide is not yet mapped and provide the exact word-study link. Do not calculate slide numbers from ayah counts.

After inspecting an actual slide, add a `language:surah:verse` key with its uploaded number to `verifiedVerseSlides`. English and Tamil mappings are separate. `lessonLinks(reference, language)` creates both URLs and reports visual precision for the upcoming lesson template.


## User-supplied lesson mappings and jump controls

`src/lesson-slide-map.json` contains QL-001 to QL-021 with original Quran references restored by lesson ID (spreadsheet decimal values are not treated as Quran references). QL-008 has slides 2 and 3. All 22 requested slide numbers were checked against the live upload listings. These are lesson-to-passage mappings provided by the owner, not claims that every individual verse is on a single slide.

`/lessons` and `/lessons/:slug` expose the authored lesson catalogue. Mapped lessons display the existing Quran slide as their central visual and have individual visual-slide links plus a verse/range link into Word Study. Unmapped lessons retain explicit artwork status and a Surah browse link. Future custom story illustrations can replace the central Quran visuals separately.

Word Study has a validated numeric Jump to verse form. The visual reader has a Jump to slide form that uses actual uploaded numbers and rejects unavailable numbers. Both update the URL. Manual slide selection clears the previous verse context to avoid labelling an unrelated slide with the old reference.

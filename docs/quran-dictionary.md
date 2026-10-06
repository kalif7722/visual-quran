# Quran dictionary

The /dictionary page searches all 6,236 verses of all 114 Surahs. Corpus editions are QuranEnc English Rowwad and Tamil Abdulhamid Baqawi; Arabic text is preserved from the English chapter API. Complete original translation and notes are retained. Attribution and edition information live in expandable Source details.

Exact phrase matching, multiword keyword matching, normalized Arabic matching and surah:verse references are supported. Related-topic matching expands known aliases with selected thematic passages and explicit synonyms. This is a curated topic dictionary, not embedding-based AI or an exhaustive interpretation. Ramadan aliases link to 2:183–187 and fasting keyword occurrences; results show exact/keyword/related labels.

Corpus integrity: `scripts/refresh-quran-search.py` retrieves current source metadata, validates every chapter against canonical counts and sequential verse numbers, joins Tamil rows by surah and verse, requires 6,236 complete rows, then produces language datasets. Run `python scripts/refresh-quran-search.py` before `npm run build`; commit refreshed datasets whenever source editions change. These are dated snapshots, not live API text. A request failure aborts refresh instead of publishing an incomplete index.

Source API and republication terms: https://quranenc.com/en/home/api/

Search runs locally in the browser after loading the selected language. Searches are not sent to a third-party search or AI service. Results are ranked with exact matches first and paginated in batches of 20; Surah and related-topic filters are available. URL parameters preserve the query and translation.

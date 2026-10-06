# Verse preview source and operation

Arabic text, English translation and footnotes are obtained verbatim from QuranEnc.com’s `english_rwwad` chapter API. Publisher: Rowwad Translation Center. The current API edition is identified at runtime and shown in each balloon with a source link. The response retains the source description and last-update metadata.

Source documentation and republication terms: https://quranenc.com/en/home/api/

The source permits republication subject to preserving content, referring to the publisher and QuranEnc.com, giving the edition/version, retaining transcript information, reporting translation notes to the source, keeping the translation updated, and excluding inappropriate advertisements. No source text is generated, shortened or retranslated. Footnotes remain available in expandable translation notes. Corrections can be sent to the source via its linked site.

Each chapter is validated against the canonical site verse count and consecutively numbered verses. Missing Arabic, translation, version metadata or verses causes an unavailable response rather than a partial passage. Chapter responses are cached for one hour at the Worker. The browser reuses a chapter request for the current page session, and a reload fetches current data through the hourly cache.

Balloon interaction: hover or focus on a reference opens the non-modal preview; the adjacent Arabic/EN button toggles it on touch devices. The preview remains interactive and scrollable, closes on Escape, outside pointer input or leaving its hover area, and renders through a document-body portal to avoid card clipping. A source-outage state retains the external read-in-context link and provides retry.

Coverage: every theme passage uses the same component; selected story passages use it too. No audio recordings are fetched or bundled.

Tamil preview uses QuranEnc's complete Abdulhamid Baqawi translation (`tamil_baqavi`), with Arabic, translation and notes preserved. Cache keys include language. Each reference has a separate தமிழ் control; source attribution and edition remain available in collapsed Source details.

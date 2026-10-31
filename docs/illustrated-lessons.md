# Illustrated Quran lesson stories

## First release

QL-006 (fairness) and QL-007 (keeping a promise) each have three newly generated story illustrations, HTML dialogue, a decision with explanatory feedback, a revealable ending, a vocabulary card and a three-step sequencing activity. All 60 lessons have family teach-back prompts, a real-world mission and an optional device-local three-step checklist. Checklists record self-reported participation, not religious merit or proof of mastery. No child names, recordings or reflection text are collected.

The Quran slide and the existing exact verse/slide links remain separate from the fictional story. Scenes are ordinary fictional children, with no depictions of Allah or prophets. Narration and dialogue are written as HTML, not embedded into artwork, to keep them accessible and ready for localisation. The English lesson text remains an editorial draft.

## Artwork and prompt set

Generated with the built-in image-generation tool. Outputs are in `public/lesson-art/ql-006-scene-01.webp` through `ql-006-scene-03.webp` and `ql-007-scene-01.webp` through `ql-007-scene-03.webp`. Each is a separate 1536×1024 image, converted from the generated PNG to WebP quality 88 without cropping. Original PNGs are retained outside the repository.

Shared prompt direction: illustration-story, premium painted gouache children's comic storybook art, one coherent 3:2 scene per file, rich teal/coral/saffron/lavender palette, modern South Indian setting, friendly stylized cartoon faces rather than realistic faces. No panels, collages, speech balloons, readable text, logos, watermarks, Quran text, prophets or divine depictions. The first illustration of each story is a reference for its two later scenes.

1. Fairness, scene 1: Umar (teal kurta, cream trousers) and his mustard-shirt friend inspect a cricket ball touching a white boundary line in a flowering school courtyard. Other players wait. The scorebook is in Umar's hand.
2. Fairness, scene 2: same characters and courtyard; Umar considers the open scorebook as his friend asks for a favour. An open raised hand conveys a gentle but firm decision.
3. Fairness, scene 3: Umar records the correct score at a bench while his friend and the other team watch. Focus on trust and equal rules, not victory or trophies.
4. Promise, scene 1: Amina (mint hijab, cream dress) lends a coral-cover storybook to Hana (lavender hijab, long teal dress) at a sunny classroom bookshelf.
5. Promise, scene 2: same Hana at her desk on Thursday evening, considering the unfinished story and her schoolbag; the illustration makes her dilemma and preparation visible.
6. Promise, scene 3: in the same classroom, Hana returns the coral book to Amina on Friday morning. Same characters and clothing; direction of giving reverses and the bookmark is kept separately.

## Progress and interaction

Local key: `visual-quran-lesson-<ID>`. Only read/reflect/mission booleans are saved; storage-denied environments continue without persistence. Each lesson has independent state. Wrong choices give explanations with unlimited retries; the ending is available independently of a correct choice. Sequencing supports touch and keyboard through native buttons. No timers, public rankings, login or paid gating were added.


## First ten stories expansion

QL-001 through QL-010 now contain 32 story illustrations. QL-004 and QL-007 use four scenes; the other eight use three. Scene counts are data-driven and the ending renders every remaining scene, allowing future stories to use their natural length. Each story has expanded narration, paragraph breaks, accessible dialogue, a tailored decision, sequencing, a practical mission and a discussion prompt. Original Quran slide mappings and reader links are preserved. Modern fictional stories illustrate the concepts; they are not accounts quoted from the Quran. New generation prompt notes are in `first-ten-illustration-prompts.json`. All assets are WebP with descriptive alt text.

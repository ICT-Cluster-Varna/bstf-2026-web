# Subtitle job — one video, one cue range

You make subtitle texts for a range of cues of ONE conference talk (CONNEXUS 2026, Varna). Be efficient: read your inputs once,
write your files once, do not re-read or re-check them afterwards.

## Inputs (S = the scratchpad folder named in your task)
- `S/ctx/<id>.txt` — title, speakers, session, spoken language. It is your glossary for names.
- `S/src/<id>.tsv` — auto-caption cues: `N <TAB> startMs <TAB> endMs <TAB> text`. The timing is fixed, NOT yours to change.
  Read the WHOLE file if it is short; for a long one read your range plus about 15 cues before and after it for context.
  You write ONLY your range (cue numbers `from`..`to`); cue N of every output belongs to the same moment as cue N here.

## Output (Write tool only; one Write call per file; no scripts)
`S/work/<id>/<lang>.p<part>.tsv`, one line per cue of your range: `N <TAB> text` — exactly the same N as the source, none missing.
Files: `orig.p<part>.tsv` (the corrected text in the talk's own language) and one per target language named in your task.
Text may be empty only for pure noise/filler cues (only "Uh", "[music]", ...).

## orig — corrected original
- Fix mis-heard words, names, company and product names, terms (use ctx and common sense), punctuation, capitalisation.
  Speakers' names exactly as in ctx (Latin form in English text; Cyrillic form in Bulgarian text).
- Delete fillers (uh, um, er, "ъъъ"...) and stutters/false starts. Do NOT paraphrase or summarise — it stays what was said.
  Remove `>>` and sound tags. A sentence continuing into the next cue simply has no final full stop.
- If a passage is garbage, give the most probable reading; if truly unintelligible, leave the cue empty.

## translations — bg, en, de, it, tr (only the ones in your task)
- Translate from YOUR corrected orig. Natural, fluent spoken-register subtitles. 1:1 by cue number.
- Cues cut sentences in the middle: translate the SENTENCE fluently, then place the words so each cue carries roughly what is
  said in the same cue; you may move one word or one short clause across a cue boundary when the grammar needs it, no more.
- Length: target ≤ 70 characters per cue, HARD maximum 84. If longer, condense (drop filler, shorter word), keep meaning.
  No line breaks inside a cue.
- Never translate proper names (people, companies, organisations' official names, products, brands, programmes, CONNEXUS,
  Black Sea Technology Forum). For Bulgarian output write speakers' names in Cyrillic exactly as in ctx "Speakers (BG)" and
  customary Bulgarian forms for places/institutions (Варна, Европейската комисия). Latin forms for every other language.
- Numbers/percentages/units stay as spoken; use the target language's conventions (decimal comma in bg/de/it/tr).
- Register: German formal ("Sie"), Italian standard, Turkish standard written, Bulgarian standard ("Вие" to the audience).
- Greetings/thanks at the start and end stay.

## When done
Reply with ONE line: files written, cue range, and up to 3 names/terms you had to guess (or "none").

# VSL raw media

Seedance 2.5 via higgsfield main.py, 16:9. Every prompt ends with the style suffix: ", cinematic, warm tungsten light, brass and dark walnut tones, shallow depth of field, slow steady camera, Swiss workshop atmosphere, no text, no logos, no visible faces in close-up"

All 10 clips were launched in parallel at 1080p before the 720p / reduced-list update arrived. Only clip 9 completed. The API rejected the other 9 with "Your credit balance is too low to complete this request" (exit 4), and the runner retried each one once with the same result. The API returned no per-generation credit cost and no remaining balance.

| id | duration s | resolution | status | file | size bytes | prompt (before suffix) |
|---|---|---|---|---|---|---|
| 1 | 7 | 1080p | FAILED: credit balance too low (x2) | - | 0 | Night workshop, desk lamp pool of light, laptop glow, smartphone vibrating on a wooden desk, a person's hands typing, seen from behind |
| 2 | 11 | 1080p | FAILED: credit balance too low (x2) | - | 0 | Daylight workshop, hands working carefully on a wooden piece with a chisel, a smartphone beside them lights up with an incoming call and then goes dark |
| 3 | 8 | 1080p | FAILED: credit balance too low (x2); skipped per update (reuse hero film) | - | 0 | Extreme macro of a mechanical watch movement, brass gears turning and meshing, a red ruby jewel glinting, slow orbit |
| 5a | 6 | 1080p | FAILED: credit balance too low (x2); skipped per update (motion graphics) | - | 0 | A smartphone lying on a workbench lights up with a new message notification |
| 5b | 5 | 1080p | FAILED: credit balance too low (x2); skipped per update (motion graphics) | - | 0 | A woman in a cafe looks at her phone and smiles, soft focus |
| 5c | 5 | 1080p | FAILED: credit balance too low (x2); skipped per update (motion graphics) | - | 0 | A hand closing a laptop on a tidy walnut desk |
| 6 | 11 | 1080p | FAILED: credit balance too low (x2); skipped per update (motion graphics) | - | 0 | Close-up of fingers pulling out and turning the crown of a mechanical wristwatch to set the time |
| 7 | 13 | 1080p | FAILED: credit balance too low (x2) | - | 0 | Shop owner locking the door of a small workshop at dusk in a Swiss old-town lane, warm street lamps, then walking away calmly |
| 8 | 6 | 1080p | FAILED: credit balance too low (x2) | - | 0 | Small Swiss medieval town on a river at golden hour, old stone bridge, calm wide shot, slow drift |
| 9 | 6 | 1080p | OK (attempt 1) | clip-9.mp4 | 4080910 | A single red ruby jewel in a watch movement, the light slowly dims to darkness |

## Voice samples

voice/<voice>/<scene>.mp3 for scenes 1-9 (edge-tts, rate -5%). 54 files in total.
- German: de-DE-ConradNeural, de-DE-FlorianMultilingualNeural, de-DE-SeraphinaMultilingualNeural
- English: en-GB-RyanNeural, en-GB-SoniaNeural, en-US-AndrewMultilingualNeural (scenes 4, 7 and 8 needed a free re-run after "No audio received")

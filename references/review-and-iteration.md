# Review and iteration

## Locate the problem

Review in this order until you find the first issue that materially affects play.

1. Can the player identify the available action and understand its outcome?
2. Are the target, character, numerals and selection distinguishable?
3. Do perspective, weight, light, materials, icons and type agree?
4. Are input, movement, confirmation and recovery continuous?
5. Do filtering, clipping, layout, transparency and runtime cost hold up?

Describe the exact state and consequence. “The numeral and the edge shadow have similar contrast, so the 2 disappears on the smallest board” gives the next artist something to change.

## Decide whether rendering technology is involved

For grids with a few actors, try the agreed shape, state and material treatment in the existing renderer. For dense sprite scenes, measure redraws, compositing and resource cost. For complex rigs, cameras or multiplatform tooling, document the workflow capabilities that are missing. Compare the benefit of a renderer or engine change against migration, testing and maintenance costs.

When input feels slow, distinguish input arrival, state update, first visible acknowledgment and end of motion. Examine networking, first-use decoding and queued effects before recommending a migration. Use current official documentation when an implementation depends on specific APIs.

## Select observable acceptance criteria

| Quality | Evidence to collect |
| --- | --- |
| Identity | At target scale the cast and key objects remain recognizable, including without the title. |
| Cohesion | Different screens share the agreed edge, light, numeral, icon and motion treatment. |
| Readability | The smallest supported view distinguishes targets, clues, available actions and depleted ones. |
| Responsiveness | Actual inputs, including fast repeats, get timely responses at the correct position. |
| Completeness | Success, failure, exhaustion, interruption and re-entry settle in valid states where relevant. |
| Runtime | Record the tested environment and measure any suspected regression affecting play. |

An untested condition stays open. A critical input or information error needs its own fix even if other aspects are polished. Use playtesting to assess understanding and taste.

## Match checks to the edit

- **Single control.** Exercise available, pressed and unavailable states in context. Check adjacent layout and hit bounds. For touch, test hold, release and cancellation. A programmatic click skips part of that path. Identify whether results came from emulation or a physical device.
- **Asset family.** View a contact sheet, light/dark/game backgrounds and both size extremes. Inspect every scene and any cached versions.
- **Motion or input.** Try repeated input, interruption, phase exit, reduced motion and completion. Record a short clip when timing or alignment is the issue.
- **Full redesign.** Walk the actual flow from entry through selection, lobby, play, results and replay. Include relevant empty, waiting and failure states across primary platforms.
- **Hidden information or networking.** Check the affected roles and spectator states. Confirm that movement, discovery, reconnect and turn updates reveal only authorized information.

Compare before and after using the same viewport, game state, character and resources. Capture the actual build and identify its version. If you cannot run it, state what remains unverified.

## Iterate and hand off

Keep an approved version for comparison. Record the observed problem, hypothesis, edit and outcome. Revisit silhouette, hierarchy or input if a surface treatment does not help. Respect requests to preserve older versions and unrelated work.

Match the delivery description to the evidence. A concept supplies direction and studies. Production assets include masters, exports and technical checks. An implementation includes a runnable result and observed behavior. A published release needs an authorized deployment and a verified destination. Time spent, images generated and a successful build do not establish aesthetic acceptance.

## Review at the size and tempo of play

Pick the smallest crop that could disprove the edit. A still pair works for occlusion; an event log can establish a double charge; a slowed replay can expose a detached trail. An accelerated clear can test a terminal branch while concealing the very wait that frustrates a player. Repeat the changed beat once at ordinary speed. If a camera, audio device or physical input dominates the experience, record which parts have only been simulated.

For a “rough everywhere” report, choose the first repeated loss of understanding or control, one high-impact authored moment and an inexpensive comparison. Defer additional variants until that sample holds up. For each accepted revision record the next fragile condition: first use after load, overlapping events, another language, a new input method, a narrower room or a repeated loss. Use that note to guide future review instead of reinstating an exhaustive checklist on every task.

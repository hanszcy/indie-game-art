# Interface and motion

## Map intent to outcome

Write one line for each primary action, from player intent through input, immediate acknowledgment, game result and next available action. If inspecting a tile also catches its occupant, make the target and outcome apparent at that tile. A second control or tutorial paragraph can create another apparent mode.

Choose an input that fits how often the action is repeated and where players expect to perform it. Test direct taps, direction keys or drag gestures in context. Preserve familiar routes into the action, including keyboard or controller support where available.

| State | Information the player needs | Visual response |
| --- | --- | --- |
| Available | What can I do now? | Give likely actions clear shapes and appropriate emphasis. |
| Pressed | Did the game receive my input? | Compress, shade or move the visible face locally while keeping the hit target stable. |
| Selected | Which item or mode is active? | Use a persistent mark or outline alongside color. |
| Exhausted or unavailable | Can I still use this? | Reduce emphasis and preserve identity. Give a short reason when needed. |
| Pending | Has the action been confirmed? | Acknowledge input while awaiting the authoritative outcome. Guard against duplicate submission. |
| Ready to advance | What ends this phase? | Emphasize the relevant confirmation or end-turn control at the right moment. |

Keep consistent names and marks across screens. Theme the interface through shape, material and rhythm. Familiar controls can stay simple. Reserve copy for decisions, status, risk and outcomes. Confirm that a cue is already clear before removing its only label.

Judge numeral shapes, timer widths, long names and localized text at real size. Align icons by visual weight and optical center. A narrow arrow and a solid paw can carry very different weight in the same box. Test thumb occlusion, safe areas, focus and the software keyboard on the target platform.

## Pace the surrounding screens

| Scene | Focus | Watch for |
| --- | --- | --- |
| Home | A memorable focal object, discoverable entry and quiet signs of life | Characters pacing continuously and competing with the action |
| Selection and lobby | Identity, selection, arrivals and readiness | Excessive bouncing or unexplained changes in relative scale |
| Play | Input, target, resources and immediate consequences | Popups covering targets or instructions taking over the screen |
| Results | Outcome first, contributions next, an available route to play again | Celebrations ending abruptly or locking input until every effect finishes |
| Profile and history | Identity, truthful records and an easy return | Empty states implying invented data or local records presented as online history |

## Tune motion by function

Use timing ranges below as starting values. Tune on the device and against the pace of the game.

- **Input.** Show acknowledgment on the next drawable frame. Try 80–140 ms for a small compression or highlight.
- **Action.** Let movement, reveal or selection settle in roughly 120–280 ms as a first pass. Retarget or interrupt when actions repeat.
- **Transition.** Try 180–400 ms to preserve a spatial relationship across phases. Keep interactive geometry stable.
- **Event.** Give a capture or achievement one main visual beat. Add sound or particles where they reinforce its meaning.
- **Idle.** Allow stillness. A small breath or occasional blink can give a character life. Offset neighboring characters' timing.
- **Celebration.** After the main beat, let atmosphere continue for several seconds if it suits the result. The next action can become available earlier.

A soft character, a heavy piece and a paper page each accelerate and settle differently. Give related materials consistent behavior.

## Stage one discovery

Respond at the point of input. On confirmation, change the target or its cell first. Let character reaction, a brief effect and the counter follow. Settle in a state that makes the new board easy to read. Remove transient numbers, dots or trails whose meaning has expired.

The finder, the discovered player and a teammate observing the event have different emotional and informational needs. Render only what that viewpoint is entitled to see. Use one movement source for the actor, range overlay and shadow. Keep logical coordinates and decorative offsets explicit.

On rapid input, phase changes or departure, cancel obsolete motion and ensure completion handlers commit once. Put breathing on a child layer so it cannot resize the board. Keep chat updates inside their own scroll area. Respect live turn timers. With reduced motion or muted audio, the outcome should remain legible. If audio or haptics are appropriate, trigger them from the same event and limit overlaps.

## Teach one real action

Give the player a small safe task, a visible target, a chance to perform the action, a clear success response and then the next step. A spotlight or gesture cue should leave the target accessible. Use the production rules, art and controls. Follow the product's decision on explicit entry or first-run teaching. Provide a practical route to revisit the lesson.

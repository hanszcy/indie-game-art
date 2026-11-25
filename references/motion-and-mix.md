# Compose an action across pose, effects, camera and sound

Choose one event at its busiest plausible moment. Mark the frame when the rule becomes true and the first frame the player can act again. Build pose, trail, sound and UI around those facts. A looping movie tests staging; actual input tests timing. [Dead Cells](source-notebook.md#dead-cells) offers a production account of retiming key poses when the move itself changes.

## A strike you can tune

| Beat | Character and world | Secondary channels | Check by stopping here |
| --- | --- | --- | --- |
| Intent | Set a readable weight shift or aim shape at the attacker. Indicate a threatened lane while the player can still react. | An optional rising sound can identify an offscreen source. | Silence audio and cover the HUD. Is there a usable warning? |
| Release | Change silhouette from stored effort to extension. Pin the launch point to the moving hand or muzzle in world space. | Give the trail a head, direction and a tail that expires. | Advance across a camera move. Does the trail detach? |
| Contact | Put the strongest local value change at the object actually hit. Show block, miss and damage differently. | Start the material sound on contact. Hit stop, if useful, belongs to an explicit clock. | Pause on the result. Did the HUD and target agree? Was a second target accidentally implied? |
| Recovery | Return to a pose from which the next action can plausibly begin. Retarget or cancel an interrupted recovery. | Attenuate debris and low-priority sounds before the next warning. | Fire twice or kill the attacker mid-recovery. Look for ghosts, duplicate hits or a stale camera kick. |

Prototype three decisive silhouette drawings at gameplay size. Flip between them with interpolation disabled. If anticipation and recovery read as the same pose, adjust the center of mass or prop angle before adding frames. Keep planted feet and contact shadows anchored through squash. Make the hand travel in an arc if the joint demands it. Vary idle cycles by character and give resting spaces quiet stretches.

**Illustrative tuning experiment.** For a soft puzzle tile, try two timings on identical input. Acknowledge both on the next draw; let the first settle with the revealed number after a short compression, and let the second carry a longer spring. Tap a neighboring tile as soon as the number becomes legible. Keep the version that communicates the change without displacing the next target. Do not add anticipation to a direct tap if it delays acknowledgment. Sample durations in [UI and motion](ui-and-motion.md) are starting values.

## Layer effects so the player can still read

Give an effect an origin, contour, peak, decay, drawing layer and removal condition. A flat ring can denote radius; a directional streak can denote travel; a fragment inherits a material and gravity. Preserve size relationships with the actual hit area. For a cosmetic blast larger than that area, quiet the outer edge so it does not promise damage.

Stage competing events in priority order by the next decision: imminent threat, confirmed action, optional reward, atmosphere. Try maximum fire rate with a reward landing during an enemy wind-up. Suppress one layer at a time. Count how many persistent marks survive after everything settles. Keep the threatened cell, unit silhouette and next tap visible. Reduced motion can substitute a fixed impact notch and a changed pose for travel or shake.

## Camera and clock ownership

Separate the simulation clock, UI clock, hit stop and purely decorative oscillation. Specify which runs during pause, a perk draft, backgrounding or a network wait. Shake a render layer when motion is useful. Keep targeting on the intended world coordinate and test a tap during peak shake. In a real-time shared game, local hit stop must respect the authoritative timer.

For a tracking camera, mark the player's feet at a reversal, the space available ahead, the upcoming obstacle and the screen margins. Try a slow approach and an abrupt turn near a boundary. Settle the camera after a room change before directing attention to a new panel. Provide a reduced-camera-motion path where appropriate.

## Sound and touch under load

Assign one cue to each meaning: physical contact, accepted action, invalid action, danger, outcome. Vary pitch or choose from a small family within that meaning. Reserve a contrasting register or rhythm for danger. Group repeated coin ticks into a short phrase while the total updates in full. When the player mutes music, verify whether important signals are routed through the intended effects channel. Test simultaneous hits with one speaker, muted audio and the busiest supported scene. [Mini Motorways](source-notebook.md#mini-motorways) documents a minimal soundscape which retains important feedback.

Use haptics for a committed event if the device supports them; a finger hovering over a valid target can use a visual cue. Stop queued rumble when leaving the scene. Compare the first cold playback with a warm replay before attributing a late cue to animation timing. Record the actual test path and any channel you could only inspect in code.

## Ambient rhythm

Choose one slow environmental movement to carry the scene between inputs: a ferry rising against a fixed pier, paper settling on a still counter, a distant lantern crossing a dark bank. Make the pause between movements part of the composition. Reserve a faster rhythm for the living subject. Compare at ordinary speed with the decorative loop muted or held. If the quiet version gives the hero more presence, reduce the loop's amplitude, contrast or frequency.

For a close picture-and-sound cue, compare audible contact and visible contact on the intended output. Use the actual device before adjusting the timing. A fixed mark and settled pose should still carry the event when sound or motion is absent.

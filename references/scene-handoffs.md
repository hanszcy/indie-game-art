# Finish, fail and enter the next scene

Design the handoff from the last playable frame. Preserve the object or relationship the player was watching. Choose the question the *next* screen answers and the input that can dismiss it. Sketch a sequence at actual display size; include the screen underneath any modal.

## Paint the emotional handoff

Pick an anchor the player already cares about. Lay the last frame beside the settled end frame. Keep its scale or screen position long enough to recognize it. Change the space *around* it: a newly open horizon, an empty mooring, a ring of teammates drawing close. A win and a loss can share a palette and typeface while differing profoundly in framing, posture and duration.

| Scene | One art direction to try | What to compare |
| --- | --- | --- |
| Arrival | A wide, quiet silhouette interrupted by one repeating signal. Let the first interactive surface borrow a shape from the world. | With the title hidden, does this still feel like the same game? |
| Gathering | Reuse a family of poses, with a small turn or small shift toward a new arrival. Keep the ensemble's ground line and shadow. | One character entering versus a full room. Does the newcomer read without making everyone bounce? |
| A rare win | Open up the negative space, give the hero a held release pose and let one local light spread. Let flecks or cloth drift after the button becomes live. | Remove the particles. Is the win already clear from the picture? |
| A close loss | Hold on the empty place or object the player just lost. Leave a quiet area for a short, factual line. Try one unfinished environmental gesture, such as a pennant that falls slack. | Compare a first loss with a fifth retry. Which single image still earns its time on repeat? |
| Return | Carry one physical trace into the next scene, such as a stamped ticket on the route map. | Can the player recognize the previous place after the camera or scale changes? |

## Win — make the achievement belong to this game

**Example direction for a delivery game.** The final parcel slips through the slot. The destination stamp changes to delivered. The signed receipt rises beside the slot, showing the destinations reached and any reward actually earned. The clerk sets down the stamp; the player can depart while the paper still settles. The postmark can recur on the route map. One familiar object links action, outcome and progression. A confetti overlay is optional.

| Point | Visible evidence | Implementation question |
| --- | --- | --- |
| Last action | Show the cause on the world object. Keep the playfield framed long enough to recognize it. | Which authoritative event ends play? What if the last input repeats? |
| Outcome | Establish win, clear, draw or team outcome with a distinct silhouette, pose or wording. | Does a spectator or eliminated teammate receive a different truthful account? |
| Receipt | Show the most useful contribution first, in its unit. Keep personal best, run total and permanent reward separate. | Which values were recorded at the end? If an online award is pending, can the player leave safely? |
| Release | Provide a clear next level, return or replay route according to the run. Atmosphere can continue behind it. | Skip the count-up halfway, advance with a held button, reload after the reward. The total and destination should agree. |

Check a first clear and an ordinary repeat. Let the first breathe if the game has earned a landmark moment. An everyday win may need only a material change and a quick exit. For a run report, check which stats even apply in this mode, as in [Mindustry](source-notebook.md#mindustry). For a quieter puzzle ending, try leaving the solved arrangement visible.

## Loss — choose its consequence before its layout

| Loss in this game | Give the player | Exercise |
| --- | --- | --- |
| A short execution miss | One readable contact point and an immediate path back to the checkpoint. | On the fifth retry, the player can attempt the move again without reading a repeated explanation. Check that held attack does not confirm a different action. |
| A long strategic run | What finally happened, which fact could inform a different next decision, and what survives the run. | Freeze the last visible state. Verify the causal claim against events. A wall reaching zero supports “wall breached”; attributing it to the wrong build requires more evidence. |
| A puzzle dead end | The last meaningful move and undo/restart if the design supports them. Preserve the layout for diagnosis. | Undo once after a cascade. Has the game restored every linked change and any consumed move? |
| A multiplayer elimination | Who was eliminated, the team's actual status, and what the local player can do while teammates continue. | Check victim, opponent, teammate and spectator separately. Replay a capture using only information appropriate to each role. |
| An interrupted session | Whether the run is saved, suspended, reconnecting or genuinely over. | Interrupt just before a reward, after it is credited and while a new run is loading. Re-entry must produce one coherent state. |

**Example direction for a missed jump.** Hold the near edge of the gap in view as the skier drops out of frame. Let the retry control appear where the player can reach it on the next attempt. Compare a first fall with the fifth fall at the same gap. If the repeated pause feels long, shorten the hold and keep the takeoff point visible. For games that already offer assistance across attempts, see the [Hades developer FAQ](source-notebook.md#hades).

## Connect the quieter screens

| Handoff | Stage the continuity | Failure worth reproducing |
| --- | --- | --- |
| Title → resume / new run | Give the current save one recognizable anchor, such as its location or party portrait. Place destructive reset elsewhere. | Fresh install, existing save and a missing save slot. Does the first confirm do what its label promised? |
| Lobby → match | Carry the chosen silhouette or color into its spawn. Establish who is ready, who may start, and what changes if somebody leaves. | Last player joins as the host starts. Verify roster, focus and ready count. |
| First lesson → free play | Teach one actual decision. Remove the teaching cue when the player acts and leave the outcome visible. | Replay with prior knowledge; skip or revisit through the product's intended route. |
| Play → shop / draft | Preserve the part of the build relevant to the offer. Expose cost, effect recipient and duration. Make clock behavior visible when it matters. | Spend the last coin, cancel where supported, return with an empty offer or an unaffordable item. |
| Play → pause / settings | Keep orientation and the intended focus target. Preview a setting on the same object the player will experience in play. | Reduce motion mid-effect; dismiss using a different input; return after the OS suspended audio. |
| Discovery → journal → world | Retain the discovered fact and its provenance. On closing, return to the same spatial or reading anchor. | Re-enter next session. Can the player recall a lead without the journal solving it for them? See [Outer Wilds](source-notebook.md#outer-wilds). |
| Local completion → synced record | Distinguish earned, queued and synchronized status only where it affects the next action. | Offline completion followed by reconnection. The same run must not acquire two entries or two rewards. |

A scene list can always grow. Add a scene when there is a new player decision, a change of perspective, or a new ownership of input, time, truth or progress. Otherwise a local state change on the current screen may serve better.

## Study a handoff in First Light

Run the same gap three ways. Land the jump, fall before the first checkpoint, then fall after a checkpoint. In the two falls, compare the last visible stretch of slope with the first frame after retry. The game records distance and cleared gaps, and its retry control uses the available checkpoint. [Course state](../examples/ski/course.js) · [Result and retry controls](../examples/ski/ski.js)

**Edit to try.** Keep one landmark visible between the fall and the settled report. Compare two placements for the report with the camera and input held fixed. Ask a player to point to the missed edge and predict where the next attempt begins. Record the result separately from your proposed treatment.

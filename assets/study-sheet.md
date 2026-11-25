# Design study sheet

Copy the applicable lines into an existing brief, issue or shot list. Keep one completed example with the next iteration.

| Field | Worked example for a landing | Your scene |
| --- | --- | --- |
| Player decision / previous frame | The skier is above the far edge of a gap. When can the next jump be charged? | |
| Evidence and locator | The [paired jump capture](../showcase/ski-jump.webp) shows both editions crossing the same gap. Step through the last airborne frame and the first grounded frame. | |
| What transfers / what stays specific | Synchronize contact feedback with the game’s landing check. Snow powder belongs to this particular surface. | |
| Hypothesis | A compressed landing pose can communicate contact even when particles are reduced. | |
| Authoritative data and perspective | The [course](../examples/ski/course.js) sets the grounded state. The [renderer](../examples/ski/scene.js) uses the landing event to draw spray. | |
| Before / contact / settle | Knees tucked → skis touch and knees compress → body returns to its gliding pose. | |
| Input and interruption | Try holding before contact and pressing again just after landing. Record when the next charge actually starts. | |
| Muted / reduced motion | Compare the pose and the edge of the skis with sound muted and reduced motion enabled. | |
| Cheapest meaningful comparison | Replay the same release at the same gap and viewport. Compare the silhouette at contact and during recovery. | |
| Asset provenance | Identify the captured build, art master and editable source. The paired capture comes from the playable examples. | |
| Observed outcome | The two captures show the same jump trajectory. Whether players recognize the grounded state earlier is a question for a playtest. | |

# Visual production

## Give each asset a job

| Asset | Define before drawing | Inspect in play |
| --- | --- | --- |
| Character | Silhouette, center of mass, facial focal point, camera and family traits | Recognition at the smallest size and finish at the largest |
| Tile | Availability, height, visible boundary and revealed surface | Tiling, seams, readable states and alignment with the hit area |
| Action icon | Verb, optical weight, stroke and perspective | Recognition beside adjacent icons and with its label |
| Control surface | Material, lighting, resting, pressed and unavailable states | Stable borders, independent type and coherent state changes |
| Background | Focal point, quiet regions, camera and value structure | Cropping, legible actors and scenery that might suggest a false interaction |
| Event effect | Trigger, authorized location, meaning and exit | Readable numbers, visible targets and an accurate settled state |

Use original illustrations or generated artwork for assets that benefit from them. Use precise geometry, text rendering and semantic input surfaces where the task calls for accuracy. Honor requests for custom icons. Inspect the entire icon family together at its working size.

## Build a recognizable cast

Make representative family members before scaling up. Share eye and highlight treatment, line language, shading and how feet meet the ground. Vary the mass of the chest and belly, ears, face width, pose, tail and resting gesture. Compare silhouettes first, then expressions, then markings. Retain approved characters as anchors.

At small sizes, reserve detail for recognition points. In a larger portrait, allow richer interior marks. If the design uses the same illustration throughout, use its real production version in each scene. A character can face the viewer on a top-down map if the base, shadow and occupied cell read clearly. Reinforce roles through distinct outlines, scale or localized cues alongside color.

## Make material express state

Ask what happens when the object is touched. A key sinks, a paper page folds and a wooden piece settles. In a Minesweeper-style board, a raised cover can compress on contact, then leave a recessed face holding the number. All three states should feel like a single object at the same position. Use this treatment where pressing is an appropriate metaphor.

Establish broad values, edges and contact before adding surface noise. Inspect adjacent values in grayscale and judge mood in color. Keep the strongest contrast and texture where attention is needed. A dark background or muted palette can accommodate a clearly readable target.

## Generate a family, then prepare it for play

1. Choose an approved identity or material reference and a screenshot of its destination. State which properties this edit preserves.
2. Describe the real use and size. A 48-pixel actor and a menu portrait invite different decisions.
3. Try a small family or a complete set of states. Adjust a named variable after a failure and stop repeating an approach that produces the same defect.
4. Inspect anatomy, object count, perspective, crop, accidental lettering, edges and alpha. Generated sheets may have uneven spacing.
5. Normalize canvases, pivots, baselines and perceived size. Retain editable masters and export runtime assets in the intended format.
6. View those exports against the actual background, at target scale and in motion. Correct inconsistencies in the source art.

Check current tool capabilities for editing and transparent output. Match the production run to the user's authorized scope. Keep prompts specific enough that an artist could use them too.

**Example brief.** Draw a seated cat for a 48-pixel board cell. Give it a broad trapezoid of chest fur, two short ear tufts and widely spaced eyes. Preserve the approved dark-brown contour and two matte shadow values. The tufts and chest outline must survive reduction. Deliver one complete figure with transparent margins and a common foot baseline. Keep the existing expression. Exclude lettering and scenery.

For a reference edit, identify the role of each input image, the subject and view, the properties to change, and the output canvas, count and background. Review the generated object in context before commissioning more variants.

## Runtime handoff

- Inspect alpha over light, dark and actual backgrounds. An alpha channel can contain a fully opaque checkerboard. Preserve white fur and highlights during cleanup.
- Compare visible bounds and weight. Large ears or a curved tail can leave a body looking tiny inside an equally sized canvas.
- Keep hit areas independent of art scale. Anchor feet and shadows to the ground. Apply breathing on a child layer.
- Preserve a common canvas and pivot across motion frames. Tight-cropping each frame independently introduces jitter.
- Keep live labels, translations, counts and player names separate from the raster surface. Scale decorative borders without stretching their corners.
- Verify every consumer of a replaced asset, including home, selection, lobby, board, results and cached portraits. Preserve stable IDs when replacing appearance.
- Review filtering, compression, alpha and memory in the runtime. Pixel art and soft-edged illustration can require different sampling.

Record the asset ID, source or generation note, usage rights, approved anchor, source and export paths, dimensions, pivot, state and consuming scenes in the project's existing inventory. Scale recordkeeping to the size of the change.

## Art-direct a room and a family, not just a hero render

Draw the smallest gameplay crop and a quiet wide shot. On each, group the picture into masses for background, traversable space, actors and effects. Pick one expression of the game's fantasy that changes use: a harbor wall can carry its crew and visibly withstand damage; a border decorated with unrelated anchors adds little information. For an intimate story scene, use that budget on faces, hands and the distance between speakers instead. Check what the player sees before the title names the world.

| Pass | Small edit to try | Evidence to inspect |
| --- | --- | --- |
| Shape and scale | Make a few solid cutouts at final size. Separate a fast threat from a heavy one through posture and mass distribution; align the foot line to the same space. | Mix the family in a real crowd. Which pair still needs color or a label to tell apart? |
| Color and value | Mark quiet, active and danger regions on the same keyframe. Reserve the sharpest edge or strongest local value separation for the current decision. | Repeat on another biome, with the warning at the edge and the selected unit on a matching hue. Inspect grayscale and color; each reveals different errors. |
| Material and wear | Choose the surfaces a hand, wheel or tool actually touches. Put the worn edge there. Try a clean patch behind the value that changes most often. | If the button reads as chipped before it reads as pressed, remove one bevel or highlight and compare. |
| Light, contact and layers | Set one key light for actors and their pedestals. Draw a cast shadow from the same anchor and give tall props an explicit occlusion silhouette. | Move the shortest actor behind the tallest prop, then stop on contact. Check its feet, target ring and actionable edge remain intelligible. |
| Icons and typography | Reserve a stable silhouette for each verb; tune the negative space and optical center at final size. Set numerals in fixture strings with maximum width and a changing sign. | Switch language and input device mid-menu. A cropped descender, a wandering price or a controller glyph that still says “tap” is a concrete production defect. |
| Place and story | Pick an object with a before/after condition tied to play: a rope goes slack when the ferry departs, or a sign turns after a sale. | Can the player infer what changed without a caption? If it reveals a secret too early, move the change to the correct narrative beat. |

**Plan for retakes.** Separate the reusable frame, localized content, changing condition and one-off flourish in the source master. Compare the real export at 1×, then after one camera zoom or resolution change. For a busy scene, measure the first cold spawn and a sustained repeated spawn. A pre-rendered complex background can save runtime cost but makes changing the light or removing an occlusion expensive. Choose what to bake by what remains stable during play.

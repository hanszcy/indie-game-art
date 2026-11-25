---
name: indie-game-art
description: "Develop and implement an authored visual identity for playable indie games: distinctive worlds, production artwork, expressive action, and interfaces grounded in play. Use for game art direction, replacement of placeholder art, visual redesign, and critiques at actual play size."
metadata:
  version: "2.1.0"
---

# Indie Game Art

Make the player care about something particular, then make the playable picture carry that feeling. An indie identity comes from a coherent point of view, selective craft, and the relationship between action and consequence. It is not a genre palette, a fox mascot, faux paper, more particles, or an expensive illustration behind unchanged placeholders.

Preserve the requested game, rules, player knowledge, camera constraints, and approved art. This skill directs the experience; it does not grant publishing permissions or replace engineering checks.

## Start with the actual job

- **New game or substantial art redesign:** complete the representative slice below before multiplying screens, levels, or assets. Keep the evidence in a small working art brief.
- **Small edit:** work on the affected object or beat in context. Do not require a full concept process to repair a button.
- **Critique:** inspect the actual picture or sequence, state the artistic problem and a concrete alternative. Do not manufacture an implementation the user did not request.
- **Existing approved identity:** develop its vocabulary instead of replacing it with the skill's own preferred taste.

When a complete build looks like a themed interface, use the [playfield edit](references/playfield-edit.md) on its busiest ordinary frame. Read [production.md](references/production.md) for a playable implementation or generated/raster asset work. For a requested with/without comparison, also read [comparison.md](references/comparison.md).

## 1. Write a direction that changes the image

In a few sentences, name:

- The **player's activity and emotional tension**. What is satisfying, frightening, strange, or tender about doing this repeatedly?
- A **specific world or process** that informs marks, materials, shapes and behavior. “Cozy”, “premium”, “minimal” and “indie” alone are not directions.
- The **dominant visual decision**: spatial composition, light, scale, shape language, material or typography. Explain where attention lands and what stays quiet.
- One **cost or deliberate omission**. Do not claim every possible virtue. Dense material may cost immediate readability; a stark graphic treatment may sacrifice intimacy.

For a new direction, make two visibly different readings of the same playable moment, not just two palettes. A rough composition study is enough to reject one; a final scene needs production craft. Reference works can inform reasoning, not supply a style to impersonate. When citing a work, inspect the evidence and identify the observable decision being borrowed.

## 2. Finish a representative playable slice

Put the real actor, environment, interactable, HUD and primary input together at the shipping camera and target device size. Use the busiest ordinary state, not an empty title screen.

Produce a screenshot of this slice and a short sequence showing **input → contact/decision → consequence → next legal action**. Inspect them before scaling. A pretty isolated asset or concept screenshot is not this evidence.

Ask these questions of the actual capture:

1. With the title hidden, what makes this recognizably this game? Point to a visible choice, not the art brief.
2. Are foreground actor, interactable and surrounding art equally resolved? A painted backdrop with geometric stand-ins is unfinished unless that contrast has an intentional, demonstrated function.
3. Can the player infer what can move, what is blocked, and what just changed? Does the atmosphere survive after fixing those reads?
4. Does the action express its subject? A heavy parcel compresses and settles differently from a brittle shell breaking or a taut rope going slack.
5. Would the image still have a voice with decorative particles and framing removed?

If the answer rests only on palette, rounded corners, a mascot or a marketing wrapper, revise the central picture. Do not scale a failed slice into a complete batch.

## 3. Choose and finish the medium

Choose illustration, pixels, modeled forms, collage, typography or code-native geometry according to the identity. No medium guarantees quality. Use available image generation or authored assets when the desired surface depends on drawing, material, or complex spatial design; do not quietly replace that craft with circles and rectangles because they are easier to animate.

Intentional geometric art is legitimate when its composition, proportions, silhouettes, motion and interaction carry the idea. Verify that with the same representative-slice gate. “Procedural” is not an exemption from art direction.

For generated artwork, separate production assets from concept art. Specify camera, lighting, anchor, framing and transparency. Integrate the actor and interactable early. Keep collisions, legal moves, state, text and controls in code. Inspect assets at their real screen size on their real backgrounds. Do not ship a painted UI screenshot as a playable surface.

Read [picture.md](references/picture.md) for shape, lighting, material and image production. Reuse constraints that give a family coherence; do not reuse the same scenery and silhouette across unrelated games by default.

## 4. Give the player's action a performance

Choose the body or material experiencing the event. Define its anticipation where appropriate, contact pose, settling or release, and persistent changed state. Timing follows what the player must feel and when they can act again; arbitrary tween durations and constant bobbing are not direction.

Acknowledge input immediately. Animate from confirmed game events. Keep rapid repeated input, undo, interruption, invalid moves, pause and reduced motion truthful. Give ordinary actions room to repeat without a victory spectacle every time. Use sound, motion, particles and camera for different jobs; omit channels that only duplicate noise.

Read [performance.md](references/performance.md) for action staging and [continuity.md](references/continuity.md) for arrival, endings and restarting.

## 5. Keep the interface inside the game

Place evidence, input and consequence where the player already looks. Use semantic, code-native controls (not necessarily system-default styling) and readable text, but derive their proportions, texture, language or motion from this world. A puzzle may need a quiet undo button; an action game may need almost no permanent chrome. Do not surround a small game with a large dashboard or use page decoration as the main art investment.

For touch, inspect the smallest intended screen: fingers must not conceal necessary consequences; targets must be usable; camera and board proportions must survive resizing. Preserve legibility and keyboard focus. Read [interface.md](references/interface.md) for controls and copy.

## 6. Judge the shipped result, not the intention

Capture the built game at actual device dimensions, including one ordinary action and one failure or recovery. Compare to the chosen slice. Fix the largest artistic mismatch first: composition and silhouette before surface decoration.

Keep a short evidence record: direction, production assets and provenance, captures, observed strengths, tradeoff, unresolved issue. Name the largest observed defect and inspect its correction; if successive revisions do not resolve it, present the concrete alternatives and unresolved judgment instead of silently looping or declaring success. Functional tests prove behavior, not artistic quality. Do not call the result “10/10”, “agency approved”, or “indie quality” on your own authority. State what the evidence shows and what still needs human judgment.

For multiple requested games, finish and evaluate one before beginning the next when the user asks for sequential work. Carry the lessons into the skill; carry each game's own identity into its assets.

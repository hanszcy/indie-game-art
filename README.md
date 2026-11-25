# Indie Game Art

**English** · [简体中文](README.zh-CN.md) · [日本語](README.ja.md)

**Indie Game Art is an art direction skill for independent game developers working with Codex.** It helps you decide what the player should notice first, how a place should feel, and how that feeling carries through the controls and the characters in motion. Use it to explore a new game's look or to refine one interaction in a playable build.

- **Find a visual identity.** Compare small color and lighting studies of the same scene. Choose a palette, a silhouette and a level of detail that hold up at play size.
- **Carry the look through play.** Give characters, scenery, type, icons and control surfaces a shared vocabulary of shapes and materials. Keep interactive objects easy to pick out in a busy frame.
- **Give actions weight and rhythm.** Work through anticipation, contact and recovery. Replay the same input on the target screen to judge the pose, effects and return of control together.

## Playable comparisons

| Play in your browser | Without the skill | With Indie Game Art |
| --- | --- | --- |
| Ski jumping | [Play the baseline](https://indie-game-art-biscuits.vercel.app/ski/classic/) | [Play First Light](https://indie-game-art-biscuits.vercel.app/ski/alpenglow/) |
| Food match-3 | [Play the baseline](https://indie-game-art-biscuits.vercel.app/classic/) | [Play Komaru Kissaten](https://indie-game-art-biscuits.vercel.app/kissaten/) |

[Open the demo shelf](https://indie-game-art-biscuits.vercel.app/play/?lang=en) · [Install the skill](#install). Both games have Chinese controls.

### First Light · Read a jump in silhouette

![The fourth gap, captured from both playable builds. The skier charges, tucks and lands.](showcase/ski-jump.webp)

**Try it.** Hold the slope or the bottom control, then release beside a red flag. On a keyboard, hold and release Space. Both editions share the 782-metre course, all ten gaps, speed, jump arc and landing checks. The clip replays identical input at the fourth gap.

**Watch the knees, then the skis.** In the baseline a blue figure crosses a simple ridge. In First Light an ochre jacket and red scarf pick the rider out against a printed mountain landscape. As the skier tucks, the knees rise and the skis tilt. On contact the body compresses and a short burst of powder marks the landing.

[Play baseline](https://indie-game-art-biscuits.vercel.app/ski/classic/) · [Play First Light](https://indie-game-art-biscuits.vercel.app/ski/alpenglow/) · [Full frame](showcase/ski-alpenglow.webp) · [Course and renderer](examples/ski/)

### Komaru Kissaten · Follow an omelet to the order ticket

![The same first swap at two counters. Three omelets clear and one serving travels up to the paper ticket in the kissaten.](showcase/lunch.gif)

**Try it.** Pick the first lunch order, tap Start, then Hint (提示). Swap the outlined pair. Both editions start with the same six-by-six board and 14 moves. In both, this swap serves three of the four omelets and leaves 13 moves.

**Follow the dish after it clears.** In the baseline, the counter changes to 3/4. In the kissaten, an illustrated omelet lifts from its tray and shrinks into the omelet line on the paper ticket. The wooden counter and printed menu establish the café, and the path of that one dish explains which part of the order you filled.

[Play baseline](https://indie-game-art-biscuits.vercel.app/classic/) · [Play Komaru Kissaten](https://indie-game-art-biscuits.vercel.app/kissaten/)

## The art desk

Paint the same harbor at first light, before a squall, and just after rain. Keep the clerk and the boat. Change where a roofline disappears, how much open water surrounds the figure, and where the wet pier catches the light. Use those decisions again on a button, a character gesture and a farewell.

![Original harbor color keys for a fictional delivery game, comparing light, depth and atmosphere across three moments.](assets/studies/harbor-color-script.webp)

[Look-development workshop](references/look-development.md) · [Studio and artist field notes](references/source-notebook.md) · [Original studies](assets/studies/README.md)

For a closer craft pass, explore [character and material families](references/visual-production.md), [control surfaces](references/control-craft.md), [pose, FX and ambience](references/motion-and-mix.md) or [the last playable frame and its ending](references/scene-handoffs.md). Save a source, an edit and a judgment in the [worked study sheet](assets/study-sheet.md).

## Install

```sh
npx skills add hanszcy/indie-game-art --skill indie-game-art
```

Or install directly in Codex:

```sh
git clone https://github.com/hanszcy/indie-game-art.git ~/.codex/skills/indie-game-art
```

Open your playable project and try one specific interaction:

> Use $indie-game-art to polish the landing in my ski prototype. Keep the jump physics fixed. Show the crouch, the instant the skis touch and the recovery at phone size.

[Skill guide](SKILL.md) · [Six reference studies](references/research-and-direction.md) · [Visual contract template](assets/visual-contract.md) · [Cat-and-mouse case notes](references/session-lessons.md)

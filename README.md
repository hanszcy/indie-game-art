# Indie Game Art

**English** · [简体中文](README.zh-CN.md) · [日本語](README.ja.md)

**Indie Game Art helps indie developers replace placeholder characters, scenery, controls and animations in a playable prototype.** Load the skill in your game project, pick a scene, and describe the mood you want and the rules you want to keep. Start with that scene and play the changes in the build.

| What you're stuck on | What you can get |
| --- | --- |
| The mechanics work, but you haven't settled on a look. | Side-by-side sketches of the same scene. Choose the lighting, colors and character shapes you like, then use the chosen sketch as a guide for the next batch of assets. |
| The buttons look like a website and the characters look pasted onto the background. | A playable scene with the characters, scenery, icons and controls drawn to fit together. Try a button and see how its face changes under your finger and when you release it. |
| A tap changes a number, but it's hard to tell what happened. | An animation wired to the actual input. Replay the same move before and after the edit to see what reacts, when the action takes effect and where the result appears. |

A screenshot is enough to start a review. Mark the most useful changes and compare a redrawn frame with the original. With access to the project source, the chosen treatment can go into the game.

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

## Install

```sh
npx skills add hanszcy/indie-game-art --skill indie-game-art
```

To install manually, copy the repository into your tool’s skills directory as `indie-game-art`. The entry point is [SKILL.md](SKILL.md).

Try this in your game project.

> Use Indie Game Art on the current game screen. Keep the rules and main character. Start with the button that looks most like a web control. Redraw its icon, its pressed state and the feedback when it activates so I can try it in the build.

[Skill guide](SKILL.md) · [Six reference studies](references/research-and-direction.md) · [Visual contract template](assets/visual-contract.md) · [Cat-and-mouse case notes](references/session-lessons.md)

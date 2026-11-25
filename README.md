# Indie Game Art

**English** · [简体中文](README.zh-CN.md) · [日本語](README.ja.md)

Give a playable prototype its own visual language. This Codex skill helps you decide what a player should see, which object should react to a tap, and how that reaction reads on a phone.

[Play the match-3](https://indie-game-art-biscuits.vercel.app/kissaten/) · [Play the tower defense](https://indie-game-art-biscuits.vercel.app/watch/lantern/?lang=en) · [Install](#install)

## The art desk

Paint the same harbor at first light, before a squall, and just after rain. Keep the clerk and the boat. Change where a roofline disappears, how much open water surrounds the figure, and where the wet pier catches the light. Use those decisions again on a button, a character gesture and a farewell.

![Original harbor color keys for a fictional delivery game, comparing light, depth and atmosphere across three moments.](assets/studies/harbor-color-script.webp)

[Look-development workshop](references/look-development.md) · [Studio and artist field notes](references/source-notebook.md) · [Original studies](assets/studies/README.md)

For a closer craft pass, explore [character and material families](references/visual-production.md), [control surfaces](references/control-craft.md), [pose, FX and ambience](references/motion-and-mix.md) or [the last playable frame and its ending](references/scene-handoffs.md). Save a source, an edit and a judgment in the [worked study sheet](assets/study-sheet.md).

## 01 · A lunch order, served two ways

**Watch the order ticket when the omelets disappear.** Both games start Lunch for Two with the same board, 14 moves and an order for four omelets and four sandwiches. Tap Hint and swap the outlined pair. The classic counter updates the quantity. In the kissaten, a piece lifts off the tray and travels to the matching line on the paper ticket.

![Side-by-side capture of the same swap. Three omelets leave both boards. One serving flies to the kissaten ticket.](showcase/lunch.gif)

[Play the baseline](https://indie-game-art-biscuits.vercel.app/classic/) · [Play Komaru Kissaten](https://indie-game-art-biscuits.vercel.app/kissaten/)

## 02 · A full seawall: recruit, merge or train?

Harbor Hands is a portrait merge defense game. Spend silver to recruit a random defender or draw three training options. Two matching defenders of the same star rank merge into a stronger one and free a berth. Four waves approach from offshore, ending with a flagship.

The paired capture uses the same recruits, spending and attackers. The classic edition uses geometric class symbols. In the harbor edition, the otter’s harpoon, the penguin’s crystal and the crab’s broad cannon identify merge partners at thumb scale. **Recruit four times, drag the two gunner crabs together, then fill the berth you just opened.**

![Identical runs in two portrait editions. A pair of gunner crabs merges into one two-star defender while the crew keeps firing.](showcase/watch.gif)

[Play the baseline](https://indie-game-art-biscuits.vercel.app/watch/classic/?lang=en) · [Play Harbor Hands](https://indie-game-art-biscuits.vercel.app/watch/lantern/?lang=en) · [Rules and source](examples/night-watch/)

Both case studies are captured from playable builds. The two defense editions share a simulation, with separate seeded draws for recruiting, enemies and training.

## Install

```sh
npx skills add hanszcy/indie-game-art --skill indie-game-art
```

Or install directly in Codex:

```sh
git clone https://github.com/hanszcy/indie-game-art.git ~/.codex/skills/indie-game-art
```

Open your playable project and try one specific interaction:

> Use $indie-game-art to polish one tower firing. Keep the map, range and damage fixed. Show the targeting cue, shot and impact at phone size, then test a crowded wave.

[Skill guide](SKILL.md) · [Six reference studies](references/research-and-direction.md) · [Visual contract template](assets/visual-contract.md) · [Cat-and-mouse case notes](references/session-lessons.md)

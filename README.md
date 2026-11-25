# Indie Game Art

**English** · [简体中文](README.zh-CN.md) · [日本語](README.ja.md)

Give a playable prototype its own visual language. This Codex skill helps you decide what a player should see, which object should react to a tap, and how that reaction reads on a phone.

[Play the match-3](https://indie-game-art-biscuits.vercel.app/kissaten/) · [Play the tower defense](https://indie-game-art-biscuits.vercel.app/watch/lantern/?lang=en) · [Install](#install)

## 01 · A lunch order, served two ways

**Watch the order ticket when the omelets disappear.** Both games start Lunch for Two with the same board, 14 moves and an order for four omelets and four sandwiches. Tap Hint and swap the outlined pair. The classic counter updates the quantity. In the kissaten, a piece lifts off the tray and travels to the matching line on the paper ticket.

![Side-by-side capture of the same swap. Three omelets leave both boards. One serving flies to the kissaten ticket.](showcase/lunch.gif)

[Play the baseline](https://indie-game-art-biscuits.vercel.app/classic/) · [Play Komaru Kissaten](https://indie-game-art-biscuits.vercel.app/kissaten/)

## 02 · Hold the coast until dawn

**Can you tell which tower just fired?** The baseline uses a route diagram and colored markers. Wickwatch gives the flare a brass lantern, the frost tower a tall crystal and the mortar a low, wide barrel. A flash at the target ends each shot. Try placing the mortar beside the first bend, then call the tide.

![The same coastal defense encounter in both editions. A plain route diagram sits beside an illustrated island with a working lighthouse, moths and lantern towers.](showcase/watch.gif)

[Play the baseline](https://indie-game-art-biscuits.vercel.app/watch/classic/?lang=en) · [Play Wickwatch](https://indie-game-art-biscuits.vercel.app/watch/lantern/?lang=en) · [Read the playable source](examples/night-watch/)

Each pair shares its rules and opening state. Tower defense also shares its fixed-step simulation and relic draws for the same run and choices. These are authored comparisons of two art directions. The captures come from the playable builds.

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

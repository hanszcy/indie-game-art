# Field notes from shipped games

Find a case by the design decision. Each entry separates what the source establishes from an experiment for another game. Unless otherwise stated, experiments below are proposals. These links point to source material for study. The reusable drawings in the skill are original.

| When you need to decide… | Read |
| --- | --- |
| How to choose a palette, line, prop, layout or material | [Six art-direction studies](research-and-direction.md#six-worked-references) |
| How to give a biome a material signature, or score an emotional relationship | [Dead Cells environment art](#dead-cells-environments), [Neva](#neva) |
| How much information to reveal before a move | [Into the Breach](#into-the-breach), [Outer Wilds](#outer-wilds) |
| Which actions may tolerate early input, and which need deliberate confirmation | [Celeste](#celeste) |
| How to separate outcome, record and retry | [Celeste Classic](#celeste-classic), [Mindustry](#mindustry), [Hades](#hades) |
| Which sounds should survive the busy mix | [Mini Motorways](#mini-motorways) |
| How to produce a family of retimable animations | [Dead Cells](#dead-cells) |
| How a story choice carries into physical play | [80 Days](#80-days) |

### Dead Cells environments

**Evidence.** Artist Gwenaël Massé describes copper, glass and runes as an alchemical vocabulary. The article pairs environment revisions and discusses how changes in lighting, mist, water and vegetation density affect ambience. **Try.** Take one room through two keys. Hold the hero and geometry steady, swallow some far edges in haze, and change where one material catches light. See if the room changes mood while its interactable objects remain legible. **Boundary.** The material vocabulary belongs to Dead Cells; the procedure can serve ink, gouache or flat paper just as well. [Artist's environment breakdown, “Alchemy and magic” and biome variants](https://www.gamedeveloper.com/production/art-design-deep-dive-giving-back-colors-to-cryptic-worlds-in-i-dead-cells-i-)

### Neva

**Evidence.** Nomada Studio describes a changing relationship between two characters and a direction combining delicate drawing, traditional animation, a restrained UI and a musical score. **Try.** Give a pair of characters a shared patch of quiet space. Draw them before and after a change in their relationship, keeping faces small. Change the gaze, spacing and weight of a gesture until the relationship reads without a caption. **Boundary.** Those pose studies are our proposal. The studio account describes the creative intention and does not supply shot timings. [Studio introduction, illustrated with official images](https://blog.playstation.com/2023/05/24/introducing-neva-the-beautiful-new-game-from-the-developer-of-gris/)

### Into the Breach

**Evidence.** Subset describes enemies announcing attacks so the player can plan a counter on their turn. **Try.** On the busiest board, mark origin, threatened tile and the point at which the player can still intervene. Ask someone to predict the threatened object before committing a move. **Boundary.** A turn-based explanation can remain on screen throughout deliberation. A real-time game has a shorter reading window; a hidden-role game may deliberately conceal the source. [Studio game page, “Perfect Your Strategy”](https://subsetgames.com/itb.html)

### Outer Wilds

**Evidence.** In an early development entry, Mobius describes a ship computer that records gathered information and illustrates an Ember Twin entry. **Try.** Reopen a discovery after a break. Restore the observation and where it came from; let the player form the next hypothesis. **Boundary.** This development snapshot supports the journal's purpose. It does not establish final navigation timings or permission to reveal undiscovered locations. [Studio development note, ship computer](https://www.mobiusdigitalgames.com/news/planet-progress)

### Celeste

**Evidence.** The studio changelog describes buffered quick restart and a hold to reset control bindings. It also records a fix for confirming a message accidentally reopening the unlocked game. **Try.** Exercise frequent retry and destructive reset with the same input device. Put the extra commitment where a mistake is expensive. Open a new dialog while confirm is held. **Boundary.** The specific buffer tuned for Celeste is not a default duration for a puzzle or card game. [Developer changelog, control rebinding, pause buffering and UI fixes](https://www.celestegame.com/changelog.html)

### Celeste Classic

**Evidence.** The published PICO-8 **C# port** has separate paths for death and completion. The flag draws a score, time and deaths; the player-death path emits particles and schedules a room restart. **Try.** Compare failure on the same obstacle three times with celebration at the end of a difficult route. Spend the longest reading time on the event with the longest interval between occurrences. **Boundary.** Code establishes event order and data. It does not measure perceived pacing or describe all editions of Celeste. [Flag implementation](https://github.com/NoelFB/Celeste/blob/1b0ce45c75e05649ae91b44a8bb6b196684e4352/Source/PICO-8/Classic.cs#L1138-L1174) · [Death and restart](https://github.com/NoelFB/Celeste/blob/1b0ce45c75e05649ae91b44a8bb6b196684e4352/Source/PICO-8/Classic.cs#L1348-L1385)

### Mindustry

**Evidence.** The game-over dialog stores the HUD's visibility, hides it while the dialog is open and restores its previous value on close. Wave survival is conditional on wave rules. Its other stat rows take different reveal delays. **Try.** Construct results from a frozen run record. Check whether each row applies to this mode. Skip visible tallying while preserving the final record and the return route. **Boundary.** Skip behavior here is a proposed test. The cited code establishes the visibility handling, mode check and row staging. [Game-over dialog, pinned source](https://github.com/Anuken/Mindustry/blob/19a0f40d44514f4802a8b79770456e7e32e34da0/core/src/mindustry/ui/dialogs/GameOverDialog.java#L30-L95)

### Hades

**Evidence.** Supergiant describes optional God Mode as granting damage resilience that increases with deaths. **Try.** In a game that already persists progression, separate what a lost run ended from any benefit that actually carries over. Check the experience with assistance both enabled and disabled. **Boundary.** The FAQ describes a mechanic. It gives no evidence for a specific death-screen composition or for silently changing another game's difficulty. [Studio FAQ, God Mode](https://www.supergiantgames.com/blog/hades-faq/)

### Mini Motorways

**Evidence.** Dinosaur Polo Club describes sounds made by game events, including new houses and deliveries, and a Minimal soundscape that retains important feedback. **Try.** Play the same busy passage with ambience, with only decision-relevant sounds and fully muted. Mark the first event that disappears in each mix. Recover essential information on screen if the player can miss it silently. **Boundary.** A procedural soundtrack suits this simulation. A fixed musical score can still use the same prioritization exercise. [Studio support, audio settings and soundtrack](https://dinopoloclub.com/support/mini-motorways/)

### Dead Cells

**Evidence.** Artist Thomas Vasseur describes judging a move from a few key poses, adding frames selectively and retiming them after gameplay changes. He also identifies small-scale pixel flicker as a limitation. **Try.** Approve wind-up, contact and recovery silhouettes at the real play size. Change the attack cooldown once before multiplying the asset across weapons. **Boundary.** The reusable lesson concerns inexpensive iteration. A 3D-to-sprite pipeline is a production choice with its own costs. [Artist's production account and animation examples](https://www.gamedeveloper.com/production/art-design-deep-dive-using-a-3d-pipeline-for-2d-animation-in-i-dead-cells-i-)

### 80 Days

**Evidence.** Inkle describes a route-planning adventure that combines authored and procedural material, including opportunities for shortcuts and disasters. **Try.** Give a tempting route one visible tradeoff and one narrative uncertainty. After arrival, let a world or journal change recall the choice. **Boundary.** This source describes structure, not the measured response of readers to a particular choice UI. [Studio introduction](https://www.inklestudios.com/2014/04/01/eighty-days)

## Add a case after real work

Start with a question the existing notes cannot answer. Record title, creator, link and a locator that gets another reader to the evidence (timestamp, still, section or commit and lines). Check which build, platform or development stage it represents if that matters. State one observation, one transferable decision and one situation in which it breaks down. Link an actual project capture and record what happened on transfer if available. Label an untried idea as such. Re-index by decision and update an existing note when the new evidence resolves the same question.

For stills and clips from other games, keep links with attribution by default. Before redistributing any source asset, check its explicit reuse terms for the intended use. Store your own diagrams, masters or captures separately with their origin; replace stale links or mark the observation unverified when its evidence disappears. The [study sheet](../assets/study-sheet.md) can travel with a project's art files.

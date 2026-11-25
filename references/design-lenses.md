# Four lenses for art direction

Use the lens that resolves a live disagreement. Each example below is an original design exercise. The linked texts supply the theory. The proposed redraws and tests are applications of it.

## What experience can this rule support?

Hunicke, LeBlanc and Zubek use *aesthetics* for the experience of play, including discovery, challenge and fellowship. Their MDA framework links the rules of a game, the behavior that emerges during play, and the experience that behavior gives the player. Work backwards from the intended experience and identify what the art must let a player perceive. [MDA, original paper](https://www.cs.northwestern.edu/~hunicke/pubs/MDA.pdf)

Imagine a snowfield where a player chooses a landing before jumping. If the pleasure is committing to a line, paint the two landing lips clearly enough to compare before takeoff. Preserve a stretch of quiet snow for the airborne silhouette. If the pleasure is discovering a sheltered valley, conceal the valley floor behind the near ridge and reveal it on descent. Both promise a particular feeling using the same camera and jump. Watch where players commit. If the hidden landing produces hesitation about collision, reveal its leading edge and keep the shelter itself concealed. If the landing is completely predetermined by the rules, offer the second visual promise.

## Can the player form an intention? Can they read the consequence?

Doug Church separates forming a plan from perceiving what one's action caused. Diagnose the two moments independently. A player can understand a tool, use it successfully and still think it failed. [Formal Abstract Design Tools, especially *Intention* and *Perceivable Consequence*](https://www.gamedeveloper.com/design/formal-abstract-design-tools)

Take a grid search. Before input, show the legal target area and the cell that will receive the action. After input, an empty search should leave a count **in the selected cell**, while a capture should briefly connect that same cell to the captured piece in the roster. Put a plain zero or a distinct opened face on the empty-zero branch, according to what the rules communicate. Previewing a cell, revealing a clue, catching a piece and attempting an unavailable search deserve distinguishable states. Keep undiscovered positions private.

Pause before a tap and ask which cell it will affect. Let the tap happen, cover the event log, then ask what changed. If the first answer is wrong, fix the target or affordance. If the second is wrong, strengthen the settled cell or the link to the roster. A more dramatic entrance animation cannot repair either diagnosis by itself.

## Which marks does a player read as one object?

Celia Hodent's perception examples show how proximity and similarity lead the eye to group elements. This matters whenever two numbers could plausibly describe the same object. Study the grouping examples in her GDC material and reconstruct the groups by drawing a loop around each perceived set. [Hodent, *The Gamer's Brain, Part 1 — Perception*](https://celiahodent.com/video-game-ux-psychology/)

In a shared kitchen, three orders have timers and each plate has a quantity. Placing all numbers in matching circles can make one order's expiry look like the adjacent plate count. Mount the timer on the order slip and stencil the quantity on its plate. Try it again with a double-digit value, a longer translated dish name and a red alarm. If the nearest circle starts to read as a new button, remove its enclosing edge. In a game where cross-order comparison is the whole job, line up the timers on a shared rail and keep a visible connection to each order.

## Where does the sense of weight come from?

Steve Swink separates real-time control, simulated space and polish. Use that distinction to isolate the fault. An arc that responds late, a collider that ends above the floor, and a drawing with no compression can look like the same floaty landing. Each needs a different edit. [Swink, *Game Feel*, chapter 1](https://mycours.es/gamedesign2014/files/2014/10/Game-Feel-Steve-Swink-chapter-1.pdf)

Record one landing against a fixed ground mark. Locate the first accepted steering input, collision and first drawn contact. Move the art pivot if the feet float above the collision point. If the silhouette already meets the floor, compress the load-bearing knee, let the scarf finish later, and listen to the boot separately. Add sound or debris only if it contributes a fact such as surface or force. Test a second jump at the earliest legal instant and under reduced motion. A fine smear drawing still fails if it covers the lip of the next jump. For a turn-based action, use the rule acknowledgement and stable outcome in place of a continuous physics model.

## Keep evidence at its proper scale

Use a screenshot to judge edges, value and grouping. Use ordered frames for staging. Use a controllable build or input trace for responsiveness. A developer account can explain an intention or a discarded prototype. Record a player's interpretation as a player observation only when someone actually gives it. An honest small finding is enough to choose the next edit.

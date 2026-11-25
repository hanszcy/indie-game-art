# Field notes from a mobile cat-and-mouse game

In this grid game, a seeker inspects cells for hidden opponents and receives Minesweeper-style neighbor counts. Survivors can move between rounds, so clues expire. These notes document player and designer feedback during development. They describe decisions and hypotheses specific to that setting.

| Feedback | Decision worth carrying to another project | Context to preserve |
| --- | --- | --- |
| Repeated palette and scenery changes still felt like a web demo. | Examine screen hierarchy, object identity and feedback together. | Web technology alone did not diagnose the issue. |
| References ranged from dark red scenes to bright, quiet puzzles. | Record which principle from a reference the player values and update the current direction. | A color preference can change. |
| A comparison to a high-end 3D game was about quality. | Ask which visual or interactive quality is missing before choosing a renderer. | The game itself used a top-down board. |
| Cats sharing a body shape felt generic. Some mice had memorable silhouettes. | Vary proportion, mass, posture and expression. Keep approved family members as anchors. | The Maine Coon and Ragdoll designs had already been accepted. |
| Oblique, bulky controls looked strange beneath a top-down board. | Align the visible control face with its actual interaction plane. | Characters can still use an expressive portrait view. |
| The menu first felt static, then characters moved too much. | Give idle life and action feedback separate roles. | The desired home composition was a row of animals breathing gently. |
| Victory ended too quickly. | Extend the emotional tail of the scene while making replay available. | A longer celebration does not set the pace for routine inputs. |
| A player searched for a capture button although scanning already caught the target. | Inspect the action mapping and feedback before rewriting the tutorial. | A long-press drag experiment was hard to discover here. |
| Plain tiles felt inert. | Show covered, pressed and revealed states through the object's material. | A raised key settling into a recess suited this particular board. |
| The board jumped between phases. The scan range moved ahead of the seeker. | Anchor geometry and render coupled elements from one movement source. | An extra easing curve could amplify the mismatch. |
| A capture briefly revealed others. A red dot and a minus-one label lingered. | Respect viewpoint permissions during animation and clear expired effects. | Decorative feedback implied information or a cost that the rules did not support. |
| Incoming chat scrolled the page away from play. | Keep social updates within their own scroll container. | Conversation remained part of the game. |

The later design used cats and mice on opposing teams, one cell per character, one illustration per identity across scenes, larger cats and smaller mice, direction controls for movement and tile taps for scanning. The tutorial opened from its designated entry. These are product decisions. Derive rules and permissions anew for each project.

Preserve partial approval carefully. Feedback that the ears and body are good but the feet and tail are too long calls for a controlled edit. In this project, recognizing a long-eared jerboa also changed how the proportions were interpreted. Check species intent before erasing a distinctive trait.

Compare like with like. A close-up drawing cannot answer a complaint about character size on a phone board. Once a character family changes, inspect its name, portrait and appearance from selection through results. Each iteration should resolve a visible uncertainty and carry successful choices forward.

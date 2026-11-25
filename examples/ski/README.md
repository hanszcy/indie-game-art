# First Light

[Play the baseline](https://indie-game-art-biscuits.vercel.app/ski/classic/) · [Play First Light](https://indie-game-art-biscuits.vercel.app/ski/alpenglow/)

Hold the screen or Space to charge, then release near a red flag to jump. On a phone, either the slope or the bottom control accepts the gesture. The route is 782 metres long, with ten gaps and three checkpoints. Both editions use the same timing and terrain.

To try the comparison, jump the first gap in each edition. Watch the skier's silhouette as the knees fold, then look at the point where the skis meet the snow. The scarf follows the pose, while the spray begins at ski height on contact.

## Explore the build

- [Course and physics](course.js) defines the terrain, gaps, charge curve, gravity and landing checks.
- [Scene renderer](scene.js) draws the mountain layers, the skier and the snow thrown by the skis. The [mountain backdrop](art/first-light.webp) was generated for this example.
- [Controls](ski.js) handles touch, keyboard, checkpoints and pause for both editions.

To run locally, serve the repository root with `python3 -m http.server 8000`. Open [the baseline](http://localhost:8000/examples/ski/classic/) or [First Light](http://localhost:8000/examples/ski/alpenglow/).

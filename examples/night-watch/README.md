# Night Watch / Wickwatch

Two small tower defense games share one simulation. The first watch starts with the same seed, one flare tower, thirteen brass and seven beacon light. You can build between and during tides. Choose one of three relics after each of the first three tides. A new watch advances the seed.

[Play Night Watch](https://indie-game-art-biscuits.vercel.app/watch/classic/?lang=en) · [Play Wickwatch](https://indie-game-art-biscuits.vercel.app/watch/lantern/?lang=en)

Run locally from this directory with `python3 -m http.server 8000`, then open `http://localhost:8000/classic/` or `http://localhost:8000/lantern/`. The language picker offers English, simplified Chinese and Japanese.

- [Simulation](engine.js) defines the route, towers, enemy movement, combat and relic draws.
- [Map and sprites](paint.js) draws both editions. The terrain is cached. Moving actors and hits are painted at the map’s native resolution.
- [Controls](ui.js) handles building, fixed-step updates, pausing, language selection and the end of a watch.

# Merge Defense / Harbor Hands

[Play classic](https://indie-game-art-biscuits.vercel.app/watch/classic/?lang=en) · [Play Harbor Hands](https://indie-game-art-biscuits.vercel.app/watch/lantern/?lang=en)

Recruit from three crew families with silver. Defenders attack automatically. Merge two crew of the same family and star rank by dragging or tapping both. A merge preserves the family and adds one star, up to four. Every fifth recruit opens another berth, up to eight. Spend silver on training to choose one of three perks. Both actions grow more expensive. Enemies striking the seawall keep dealing damage until defeated. Hold four waves and defeat the flagship.

The portrait layout, shared resource decision and merge gesture were informed by the [official beginner guide for 永远的蔚蓝星球](https://m.chuangyuejoy.com/article/7/). The crew, harbor art, encounter, ability values and upgrades belong to this demo. The illustrated backdrop was generated for this project. Character silhouettes, effects, hit areas, costs and controls are drawn or computed at runtime.

Run locally from this directory with `python3 -m http.server 8000`, then open `/classic/` or `/lantern/`. English, simplified Chinese and Japanese are available in both editions.

[Gameplay and deterministic draws](engine.js) · [Sprites and effects](paint.js) · [Input and fixed-step loop](ui.js)

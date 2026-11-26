# 海湾重绘 · 最终采用的生成提示词

工具：内置 imagegen。运行图由原始PNG用cwebp编码为WebP，alpha来自原图。没有通过 Python 改画或色键去背。生成目录：`/Users/macbook/.codex/generated_images/01a21393-794c-72b1-bf73-8d8df89c1840/`。原始PNG另保存在本地工作区 `surf-art-masters/`；下表的文件名可追溯默认生成目录。

| 输出 | 原始文件 | 项目用途 |
| --- | --- | --- |
| 两种构造试样 | exec-a9e79507-455e-4b3a-b51f-4caf71856e7d.png | character-directions.png |
| 海湾背景 | exec-7b27b37b-6ba5-49f9-b2a2-1aee785fde3f.png | coastal-bay.webp |
| 滑行姿态 | exec-a8268188-76a7-493c-932a-eff380099491.png | rider-cruise.webp |
| 深蹲姿态 | exec-50158236-10ca-4bf1-b3ec-8526aa14bf4e.png | rider-crouch.webp |
| 腾空姿态 | exec-bd67f645-9c8e-487f-b114-bf2a68284a27.png | rider-air.webp |
| 归港姿态 | exec-7e961387-a644-4635-b630-c0ba0ff32194.png | rider-greet.webp |

## 造型试样

`transparent_background: false`，无输入参考图。

> Landscape 3:2 design comparison for an original ukiyo-e inspired indie 2D surfing game. Two equal panels, no text. Same adult Japanese woman surfing RIGHT on same length board, straw hat, dark bob haircut, red scarf, indigo coat, ivory trousers. LEFT: compact weighty 3.5-head proportions, broad low straw hat, rounded short coat, balloon trousers, readable calm face, deeply bent knees, strong negative space between arms and torso. RIGHT: elegant elongated 5-head proportions, pointed hat, long open coat, slim legs, dancer-like extended stance. Both beautifully illustrated with confident carved dark ink contours, selective hatching, large flat indigo, jade, ivory, ochre and vermilion color masses, no glossy 3D, no stick limbs, no generic clipart. Both panels show a curled wave under board, a rock and spiral shell ahead, sparse jade sea and pale warm sky. Left wave broad low sweep with forked hooked foam; right wave narrow high arch with ribbon foam. Same playable scene, character size and palette to judge structural differences. Large clear full-body silhouettes, professional art direction study, delightful but not childish.

## 海湾背景

`transparent_background: false`，参考图为上面的造型试样。

> Create ONE portrait 2:3 background painting for a playable mobile 2D Japanese surfing indie game, inspired by the ink/shape language of the LEFT reference panel, but a substantially quieter scene. No characters, no surfboards, no UI, no words, no border, no foreground objects. Original modern Japanese woodblock illustration, confident subtly irregular carved contours, broad rounded masses cut by one or two angular breaks, restrained fine hatching only on rock faces, flat color areas with gentle ink granulation. PALETTE: warm pale ivory sky, pale jade haze, dusty turquoise sea, petrol blue distant land, sparse ochre, small muted coral sun. Avoid orange/yellow wash everywhere, avoid old-paper distress, avoid photorealism, avoid a reproduction of the Great Wave. COMPOSITION EXACTLY: upper 28% almost empty ivory sky with two thin elongated cloud shelves and a small coral sun toward upper right around 25% height; middle 28%-52% an evocative coastal bay, rounded mountainous island to the LEFT with cascading layered cliffs and sparse pines, a low distant peninsula to RIGHT with a tiny cluster of indigo roofed harbor houses and one ochre beacon, generous quiet open-water negative space across the center; bottom 48% progressively calmer open turquoise sea, wide long cream foam ribbons and 2-3 low broad sweeping wave shoulders only at outer edges, no tall crashing wave covering the center. Horizon around 42% height. Sea must reach the entire bottom edge. This is backdrop only: the character, hazards and animated playable wave will be composited over the central/lower water. Make it inviting, airy, distinctive and beautifully composed, professional finished indie game environment art, not a UI mockup.

## 滑行姿态

`transparent_background: true`，无输入参考图。

> A single beautifully illustrated 2D game character cutout on a transparent background: adult Japanese woman surfing toward the right, broad low straw hat, short black bob, calm smiling profile face, coral scarf blowing left, indigo short haori with cream wave motif, voluminous ivory trousers, dark sandals, low balanced crouch on a horizontal cream surfboard with red wave patterns. Compact charming 3.5-head tall proportions, broad clothing masses and distinct arm/torso negative space, elegant ukiyo-e carved ink outlines and very restrained woodcut hatching. Full figure and whole surfboard visible, no water, no background, no text, no floor. Production sprite, crisp clean edges, readable at 100 pixels tall, not stick figure, not geometric clipart.

## 深蹲姿态

`transparent_background: true`，无输入参考图。

> Single full-body ukiyo-e woodblock game sprite, transparent background, landscape 1536x1024. Compact adult Japanese woman on a slim cream surfboard with red wave motifs, facing right. Broad low ochre straw hat with black hatch lines, short black bob, calm smiling profile, coral scarf streams left, short indigo haori with cream curling wave patterns on wide sleeves, balloon ivory trousers, black thong sandals. Same charming 3.5-head compact body proportions, warm cream skin, deep dark ink outlines. DEEP CROUCHED ANTICIPATION pose: hips down near heels, torso leaning right, head low, both arms out and slightly down for balance, loose trousers fold and bunch. Feet touching board. Full board goes from x50 y950 to x1490 y840, slight perspective right nose up, bottom of board near y1010. Straw hat centered about x800 y260, character occupies most canvas. Beautiful coherent illustration, hand carved contours, few deliberate fold strokes, no stick limbs. Whole person and board, no text, no shadows, no water, no scenery. Real alpha transparency.

## 腾空姿态

`transparent_background: true`，无输入参考图。

> A single full-body 2D ukiyo-e woodblock game sprite on transparent background, 1536x1024 landscape. Charming compact ADULT Japanese woman in airborne surfing balancing pose facing RIGHT. Broad low ochre straw hat, short black bob, calm smiling profile, coral scarf streaming to upper left, indigo SHORT haori with large cream curl-wave patterns on wide sleeves, voluminous ivory trousers, black thong sandals. Warm cream skin and dark carved ink outlines, restrained hatch lines, coherent polished illustration not vector clipart. Legs bent, arms lifted diagonally in a wide V for airborne balance, hands visible, feet touching a slim cream surfboard with vermilion wave motifs. Entire board from x50 near y950 to x1490 near y840, bottom edge near y1000. Head with broad hat near x800 y200; whole figure and hands fit within frame. Wide 3.5-head compact character proportions. FULL character and complete board, no cropping, no sea, no splash, no scenery, no shadows, no text. TRUE alpha transparency.

## 归港姿态

`transparent_background: true`，无输入参考图。

> A single full body ukiyo-e woodblock 2D game sprite on TRANSPARENT background, landscape 1536x1024. Compact adult Japanese woman on cream surfboard with vermilion wave motifs, facing right. Wide low ochre straw hat with carved hatch lines, short black bob, calm smiling profile, coral scarf streaming left, short indigo haori with cream curl-wave motifs on broad sleeves, voluminous ivory trousers, black thong sandals. Victory homecoming pose: knees gently bent, left arm balances low behind, right forearm raised waving one hand beside the hat. Head comfortably below top edge, whole hat and hands visible. Broad compact body masses, charming adult face, 3.5-head proportions, fine dark ink outlines, few carved fold strokes. Feet planted on board. Board spans almost whole image from x50 y950 to x1490 y840, bottom at y1010. Exact whole figure and full board, no crop, no scene, no water, no shadows, no words. Real alpha transparent cutout. Professional indie-game character illustration, not geometric clipart, not stick limbs.

## 人工接入与限制

提示词中的位置是生成约束，不代表输出逐像素满足。实际采用时检查了alpha、板面锚点、手机大小、深浅背景以及关键姿态切换。不同姿态的图案和脸部有轻微差异，未宣称骨骼动画或精确连续帧；最终使用四张姿态图和代码驱动板角。游戏中的水线、碰撞和输入由原共享物理决定。

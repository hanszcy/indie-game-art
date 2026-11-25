# Indie Game Art · 独立游戏美术

[English](README.md) · **简体中文** · [日本語](README.ja.md)

**Indie Game Art 是面向独立游戏开发者的 Codex 美术指导 Skill。** 它把你希望玩家感受到的氛围，落实到画面的光线、角色的轮廓，以及一个动作最该被看清的瞬间。你可以用它探索一款新游戏的画风，也可以拿已有原型，只打磨一个动作。

- **确定画风。** 把同一场景画成几张配色和光照不同的小稿，在实际游玩尺寸下比较，选出合适的色彩、轮廓和细节密度。
- **统一视觉语言。** 让角色、场景、字体、图标和按钮共用一套造型与材质规则。把它们放回最热闹的一帧，检查玩家还能否分清背景、角色和可以操作的物件。
- **打磨动作和反馈。** 从动作前的预备姿势，一直看到接触、停顿和恢复操作。用同一次输入回看修改前后，判断动作的重量、特效的位置和界面回应的节奏。

## 实机对照与试玩

| 浏览器试玩 | 未使用 Skill | 使用 Indie Game Art |
| --- | --- | --- |
| 滑雪跳跃 | [玩基础版](https://indie-game-art-biscuits.vercel.app/ski/classic/) | [玩《雪线晨光》](https://indie-game-art-biscuits.vercel.app/ski/alpenglow/) |
| 美食消消乐 | [玩基础版](https://indie-game-art-biscuits.vercel.app/classic/) | [玩《小满洋食屋》](https://indie-game-art-biscuits.vercel.app/kissaten/) |

[打开试玩合集](https://indie-game-art-biscuits.vercel.app/play/?lang=zh) · [安装 Skill](#安装)

### 雪线晨光 · 腾空看姿势，落地看雪板

![两版实机用相同输入越过第四道雪沟，依次呈现蓄力、腾空和落地。](showcase/ski-jump.webp)

**自己试一跳。** 按住雪坡或底部按钮蓄力，在红旗旁松手。电脑上可以用空格键。两版共用 782 米雪道、10 道雪沟，以及同一套速度、跳跃弧线和落地判定。上图录的是同一组输入经过第四道雪沟。

**盯住膝盖，再看板尾。** 基础版里，蓝色小人越过浅色山脊。《雪线晨光》用赭黄色外套和红围巾把人从版画般的群山里挑出来。腾空时双膝收起、雪板倾斜，触地那一下身体压低，板尾扬起一小撮雪粉。

[玩基础版](https://indie-game-art-biscuits.vercel.app/ski/classic/) · [玩《雪线晨光》](https://indie-game-art-biscuits.vercel.app/ski/alpenglow/) · [看完整竖屏画面](showcase/ski-alpenglow.webp) · [雪道与绘制源码](examples/ski/)

### 小满洋食屋 · 消掉的蛋包饭去了哪里？

![两版交换同一对餐点，三份蛋包饭消除，洋食屋里有一盘飞向对应的订单行。](showcase/lunch.gif)

**试试第一手。** 选第一单「午间双人餐」，开始后点「提示」，交换亮起的两格。两版共用同一张 6×6 棋盘，开局都是 14 步。这一手都会交付三份蛋包饭，订单变为 3/4，剩下 13 步。

**顺着盘子看。** 基础版里，订单数字随消除更新。《小满洋食屋》里，一盘蛋包饭从木托盘上飞起，缩小，落进纸质订单上对应的那一行。木柜台和菜单交代了小店的气氛，这一小段飞行则把棋盘上的操作和出餐结果连了起来。

[玩基础版](https://indie-game-art-biscuits.vercel.app/classic/) · [玩《小满洋食屋》](https://indie-game-art-biscuits.vercel.app/kissaten/)

## 美术工作台

同一个港口画三次：清晨、风暴将至、雨过天晴。保留送件员和渡船，改远岸屋顶消失在哪里、人物周围留下多少水面、潮湿码头哪一条边反光。再让这些选择延续到一枚按钮、角色的一个动作和最后的告别。

![原创港口气氛稿，用三个时刻对照光线、空间层次与情绪。](assets/studies/harbor-color-script.webp)

[画风与气氛工作手册](references/look-development.md) · [艺术家与工作室的一手案例](references/source-notebook.md) · [原创气氛稿与可编辑图例](assets/studies/README.md)

具体打磨时可以只读一处：[角色与材质](references/visual-production.md)、[交互表面](references/control-craft.md)、[姿势、特效与环境节奏](references/motion-and-mix.md)，或[从最后一个可玩画面走到胜负结算](references/scene-handoffs.md)。用[带示例的研究表](assets/study-sheet.md)记下借鉴了什么，以及实际效果怎样。

## 安装

```sh
npx skills add hanszcy/indie-game-art --skill indie-game-art
```

也可以直接装进 Codex：

```sh
git clone https://github.com/hanszcy/indie-game-art.git ~/.codex/skills/indie-game-art
```

打开自己的游戏项目，先交给它一个具体的动作：

> 用 $indie-game-art 打磨我的滑雪游戏里落地的那一下。保留跳跃物理，给我看手机尺寸下的收膝、雪板触地和恢复滑行。

[中文使用指南](docs/guide.zh-CN.md) · [Skill 原文](SKILL.md) · [六个参考案例](references/research-and-direction.md) · [美术约定模板](assets/visual-contract.md) · [猫鼠游戏复盘](references/session-lessons.md)

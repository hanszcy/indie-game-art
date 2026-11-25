# Indie Game Art · ゲームの画づくり

[English](README.md) · [简体中文](README.zh-CN.md) · **日本語**

プレイできる試作に、そのゲームらしい表情を与える Codex スキルです。指で触れた瞬間、どこを見てほしいか。何がどう応えれば、次にすることが伝わるか。スマートフォンの画面で試しながら決めていきます。

[マッチ3で遊ぶ](https://indie-game-art-biscuits.vercel.app/kissaten/) · [タワーディフェンスで遊ぶ](https://indie-game-art-biscuits.vercel.app/watch/lantern/?lang=ja) · [導入](#導入)

## 01 · 同じランチを二つの店で

**オムライスが消えたら、注文票に注目。** どちらも同じ盤面から始まり、14手でオムライスとサンドイッチを4皿ずつ集めます。「提示」を押して、枠で示された料理を入れ替えてみてください。標準版では注文数が更新されます。喫茶店版では一皿がトレーから浮かび、注文票の該当する行へ飛んでいきます。こちらのゲーム内表記は中国語です。

![同じ手で3皿のオムライスが消える様子。喫茶店版では一皿が注文票に飛んでいく。](showcase/lunch.gif)

[標準版で遊ぶ](https://indie-game-art-biscuits.vercel.app/classic/) · [喫茶店版で遊ぶ](https://indie-game-art-biscuits.vercel.app/kissaten/)

## 02 · 夜明けまで灯台を守る

**いま撃ったのはどの塔？** 標準版は経路図の上に色分けした塔を置きます。『灯港の夜番』では火花塔が真鍮のランタン、霜灯塔が細長い結晶、迫撃塔が背の低い太い砲身を持っています。弾道の先で光るのが着弾地点です。道の前半のカーブに迫撃塔を置き、「潮を迎える」で最初の群れを迎撃してみてください。

![同じ配置、同じ敵の波を収録。経路図と、灯台や蛾を描いた夜の海岸を見比べられる。](showcase/watch.gif)

[標準版で遊ぶ](https://indie-game-art-biscuits.vercel.app/watch/classic/?lang=ja) · [灯港の夜番で遊ぶ](https://indie-game-art-biscuits.vercel.app/watch/lantern/?lang=ja) · [ソースを読む](examples/night-watch/)

各組はルールと初期状態が共通です。タワーディフェンスは時間の進め方も共通で、同じ周回で同じ選択をすると、同じ遺物が出ます。二つの画づくりを意図的に比較した作例で、動画は実際のプレイ画面を収録しました。

## 導入

```sh
npx skills add hanszcy/indie-game-art --skill indie-game-art
```

Codex に直接インストールする場合：

```sh
git clone https://github.com/hanszcy/indie-game-art.git ~/.codex/skills/indie-game-art
```

自分のプロジェクトを開き、まず一つの動作を指定します。

> $indie-game-art で塔が一発撃つ場面を磨いて。地形、射程、威力はそのままに、狙い、発射、着弾がスマホで読み取れるようにして、敵が密集したときも試して。

[日本語ガイド](docs/guide.ja.md) · [スキル原文](SKILL.md) · [参考作品6例](references/research-and-direction.md) · [画づくりのテンプレート](assets/visual-contract.md) · [猫とネズミの開発記録](references/session-lessons.md)

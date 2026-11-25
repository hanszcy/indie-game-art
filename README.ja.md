# Indie Game Art · ゲームの画づくり

[English](README.md) · [简体中文](README.zh-CN.md) · **日本語**

プレイできる試作に、そのゲームらしい表情を与える Codex スキルです。指で触れた瞬間、どこを見てほしいか。何がどう応えれば、次にすることが伝わるか。スマートフォンの画面で試しながら決めていきます。

[マッチ3で遊ぶ](https://indie-game-art-biscuits.vercel.app/kissaten/) · [タワーディフェンスで遊ぶ](https://indie-game-art-biscuits.vercel.app/watch/lantern/?lang=ja) · [導入](#導入)

## 01 · 同じランチを二つの店で

**オムライスが消えたら、注文票に注目。** どちらも同じ盤面から始まり、14手でオムライスとサンドイッチを4皿ずつ集めます。「提示」を押して、枠で示された料理を入れ替えてみてください。標準版では注文数が更新されます。喫茶店版では一皿がトレーから浮かび、注文票の該当する行へ飛んでいきます。こちらのゲーム内表記は中国語です。

![同じ手で3皿のオムライスが消える様子。喫茶店版では一皿が注文票に飛んでいく。](showcase/lunch.gif)

[標準版で遊ぶ](https://indie-game-art-biscuits.vercel.app/classic/) · [喫茶店版で遊ぶ](https://indie-game-art-biscuits.vercel.app/kissaten/)

## 02 · 城壁が埋まったら、召喚する？ 合成する？

『灯港の防衛隊』は縦画面の合成防衛ゲームです。銀貨はランダムな仲間の召喚にも、三択の強化にも使えます。同じ種類・星数の二人を重ねると星が一つ増え、枠が空きます。沖から四波が押し寄せ、最後には旗艦が現れます。

どちらの映像も召喚結果、銀貨、敵の出現は共通です。通常版では職種を図形で示し、港版ではラッコの銛、ペンギンの氷晶、カニの太い砲身で仲間を見分けます。**四回召喚したら、大砲ガニをもう一匹の大砲ガニに重ね、空いた枠に次の仲間を呼んでみてください。**

![同じ戦闘を二つの縦画面で収録。大砲ガニ二匹が星二つの仲間に合成される。](showcase/watch.gif)

[通常版で遊ぶ](https://indie-game-art-biscuits.vercel.app/watch/classic/?lang=ja) · [灯港の防衛隊で遊ぶ](https://indie-game-art-biscuits.vercel.app/watch/lantern/?lang=ja) · [ルールとソース](examples/night-watch/)

どの動画も実際のゲーム画面を収録しています。防衛の二版は戦闘の処理を共有し、召喚・敵・強化にそれぞれ同じシードの乱数列を使っています。

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

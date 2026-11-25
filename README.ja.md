# Indie Game Art · ゲームの画づくり

[English](README.md) · [简体中文](README.zh-CN.md) · **日本語**

**Indie Game Art は、Codex でインディーゲームを作る人のためのアートディレクションスキルです。** 場面にどんな空気が流れ、プレイヤーの目が最初にどこへ向かうかを考えます。企画初期に絵柄を探すときにも、遊べる試作の一動作を磨くときにも使えます。

- **絵柄を決める。** 同じ場面で配色と光の異なる小さな絵を描き比べます。実際に遊ぶ大きさで見て、輪郭や描き込みの密度を選びます。
- **画面全体の造形をそろえる。** キャラクター、背景、文字、アイコン、ボタンに共通する形と素材を決めます。要素が増えた場面でも、触れられるものが見つかるかを確かめます。
- **動きに重さと間をつける。** 予備動作、接触、次の操作へ戻る姿勢までを作ります。同じ入力を繰り返し、ポーズ、効果、操作への応答を対象端末の画面で見比べます。

## 遊んで比べる

| ブラウザーで遊ぶ | スキルを使わない版 | Indie Game Art 版 |
| --- | --- | --- |
| スキージャンプ | [標準版で遊ぶ](https://indie-game-art-biscuits.vercel.app/ski/classic/) | [First Light で遊ぶ](https://indie-game-art-biscuits.vercel.app/ski/alpenglow/) |
| 料理のマッチ3 | [標準版で遊ぶ](https://indie-game-art-biscuits.vercel.app/classic/) | [小満洋食屋で遊ぶ](https://indie-game-art-biscuits.vercel.app/kissaten/) |

[デモ一覧](https://indie-game-art-biscuits.vercel.app/play/?lang=ja) · [スキルの導入](#導入)。ゲーム内の表示は中国語です。

### First Light · シルエットで読むジャンプ

![同じ入力で四つ目の割れ目を越えるところ。両画面で踏み切り、空中姿勢、着地がそろう。](showcase/ski-jump.webp)

**一度跳んでみる。** 画面か下のボタンを長押しし、赤い旗のそばで指を離します。キーボードではスペースキーを使います。全長782メートル、十か所の割れ目、速度、ジャンプの軌道、着地判定は両版で共通です。映像では同じ入力で四つ目の割れ目を跳んでいます。

**膝から板へ視線を移す。** 標準版では青い人影が尾根を越えます。First Light では黄土色の上着と赤いマフラーが版画調の山並みに映えます。空中では膝が上がり、板が傾く。着地の瞬間には体が沈み、板の後ろで粉雪がはねます。

[標準版で遊ぶ](https://indie-game-art-biscuits.vercel.app/ski/classic/) · [First Light で遊ぶ](https://indie-game-art-biscuits.vercel.app/ski/alpenglow/) · [縦画面全体](showcase/ski-alpenglow.webp) · [コースと描画のソース](examples/ski/)

### 小満洋食屋 · 消えたオムライスの行き先

![同じ一手で三皿のオムライスが消え、喫茶店版では一皿が注文票に飛び込む。](showcase/lunch.gif)

**最初の一手を試す。** 一番上のランチを選んで開始し、「提示」で示された二品を入れ替えます。両版とも同じ6×6の盤面で、持ち手は14。最初の一手でオムライスを三皿届けると、注文票は3/4、残りは13手になります。

**皿の行方を見る。** 標準版では消去とともに注文の数字が変わります。小満洋食屋ではオムライスが木のトレーから浮き、小さくなりながら紙の注文票の同じ料理の欄に届きます。木のカウンターやお品書きが店の雰囲気をつくり、皿の軌道が盤面と注文を結びます。

[標準版で遊ぶ](https://indie-game-art-biscuits.vercel.app/classic/) · [小満洋食屋で遊ぶ](https://indie-game-art-biscuits.vercel.app/kissaten/)

## 美術の作業机

同じ港を、夜明け・嵐の前・雨上がりの三通りに描きます。配達員と渡し船を残し、消える屋根の輪郭、人物を囲む水面の余白、濡れた桟橋の反射を変えてみます。その絵の判断を、ボタンの表面、仕草、見送りの場面にも引き継ぎます。

![同じ港を三つの時間に描き、光と奥行き、空気感を比較するオリジナルのカラーキー。](assets/studies/harbor-color-script.webp)

[画づくりの手引き](references/look-development.md) · [制作者による一次資料](references/source-notebook.md) · [オリジナルの図版](assets/studies/README.md)

[キャラクターと質感](references/visual-production.md)、[操作面の素材](references/control-craft.md)、[ポーズ・演出・環境音](references/motion-and-mix.md)、[最後の一手から結果画面まで](references/scene-handoffs.md)を場面に応じて掘り下げます。[研究シート](assets/study-sheet.md)に参照元・手を入れた箇所・実際の印象を記録できます。

## 導入

```sh
npx skills add hanszcy/indie-game-art --skill indie-game-art
```

Codex に直接インストールする場合：

```sh
git clone https://github.com/hanszcy/indie-game-art.git ~/.codex/skills/indie-game-art
```

自分のプロジェクトを開き、まず一つの動作を指定します。

> 私のスキーゲームの着地を $indie-game-art で磨いてください。ジャンプの物理はそのまま、膝を抱えた姿勢、板が雪に触れる瞬間、滑走に戻る姿をスマートフォンの大きさで見せてください。

[日本語ガイド](docs/guide.ja.md) · [スキル原文](SKILL.md) · [参考作品6例](references/research-and-direction.md) · [画づくりのテンプレート](assets/visual-contract.md) · [猫とネズミの開発記録](references/session-lessons.md)

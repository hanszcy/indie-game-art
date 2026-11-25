# Indie Game Art · ゲームの画づくり

[English](README.md) · [简体中文](README.zh-CN.md) · **日本語**

**Indie Game Art は、試作中のゲームの仮素材を、実際に操作して試せるキャラクター、背景、ボタン、アニメーションに作り替えるスキルです。** プロジェクトでスキルを読み込み、直したい場面、出したい雰囲気、残したいルールを伝えます。一場面から手を入れ、いつもの操作で仕上がりを確かめられます。

| こんなときに | 手元で確かめられるもの |
| --- | --- |
| 遊び方は決まったけれど、絵柄が決まらない。 | 同じ場面で光、配色、人物の形を変えたラフを並べて選べます。選んだ一枚を、次の素材を描くときの見本にできます。 |
| ボタンはウェブサイト風で、キャラクターが背景から浮いて見える。 | 人物、背景、アイコン、ボタンを同じタッチで作り直した、実際に遊べる一場面。ボタンに触れたときと指を離したときの見え方も試せます。 |
| タップすると数字が変わるだけで、何が起きたのか伝わらない。 | 実際の入力に合わせて動くアニメーション。同じ手を改修前後で試し、何が反応し、いつ効き、どこに結果が出るかを見比べられます。 |

スクリーンショット一枚からでも始められます。直す箇所を書き込み、描き直した一枚を元の画面と並べて比べます。プロジェクトのソースがあれば、選んだ案をゲームに反映できます。

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

## 導入

```sh
npx skills add hanszcy/indie-game-art --skill indie-game-art
```

手動で導入するには、お使いのツールのスキル用ディレクトリに、このリポジトリを `indie-game-art` という名前でコピーします。入口は [SKILL.md](SKILL.md) です。

自分のプロジェクトで、こんな頼み方ができます。

> Indie Game Art で今のゲーム画面に手を入れてください。ルールと主人公はそのままで、まず一番ウェブサイトらしく見えるボタンを選んでください。アイコン、押したときの見た目、押した後の反応を作り直して、実際に押して試せるようにしてください。

[日本語ガイド](docs/guide.ja.md) · [スキル原文](SKILL.md) · [参考作品6例](references/research-and-direction.md) · [画づくりのテンプレート](assets/visual-contract.md) · [猫とネズミの開発記録](references/session-lessons.md)

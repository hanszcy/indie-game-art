(() => {
  const picker = document.querySelector("#language");
  const nodes = [...document.querySelectorAll("[data-word]")];
  const english = Object.fromEntries(
    nodes.map((el) => [el.dataset.word, el.textContent]),
  );
  const copy = {
    en: english,
    zh: {
      title: "实机试玩",
      intro: "用两种版本跳同一道雪沟，或在同一张棋盘上交换两份餐点。",
      ski: "雪线晨光",
      jump: "按住蓄力，在红旗旁松手。落地时留意板尾扬起的雪粉。",
      lunch: "小满洋食屋",
      swap: "选第一单，开始后点「提示」。交换亮起的两格，看看蛋包饭去了哪里。",
      base: "玩基础版",
      skill: "玩 Skill 版",
      note: "手机和电脑均可试玩。",
      notes: "在 GitHub 看实机对照 ↗",
    },
    ja: {
      title: "デモで遊ぶ",
      intro: "同じ雪の割れ目を跳ぶ。同じ二皿を入れ替える。二つの版で試せます。",
      ski: "First Light",
      jump: "長押しして、赤い旗のそばで指を離します。着地の瞬間、板の後ろに注目。",
      lunch: "小満洋食屋",
      swap: "一番上のランチを開始し、「提示」をタップ。二品を入れ替えて、オムライスの行き先を見てください。",
      base: "通常版で遊ぶ",
      skill: "スキル版で遊ぶ",
      note: "ゲーム内の表示は中国語です。",
      notes: "GitHub で実例を見る ↗",
    },
  };
  const pages = {
    en: "#readme",
    zh: "/blob/main/README.zh-CN.md",
    ja: "/blob/main/README.ja.md",
  };
  function apply(lang) {
    for (const node of nodes) node.textContent = copy[lang][node.dataset.word];
    document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
    document.title = copy[lang].title + " · Indie Game Art";
    document.querySelector("#notes").href =
      "https://github.com/hanszcy/indie-game-art" + pages[lang];
    picker.value = lang;
  }
  const query = new URL(location.href);
  const selected =
    query.searchParams.get("lang") || navigator.language.split("-")[0];
  apply(Object.hasOwn(copy, selected) ? selected : "en");
  picker.hidden = false;
  picker.addEventListener("change", () => {
    apply(picker.value);
    query.searchParams.set("lang", picker.value);
    history.replaceState(null, "", query);
  });
})();

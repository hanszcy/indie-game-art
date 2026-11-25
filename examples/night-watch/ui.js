const el = (id) => document.getElementById(id);
const query = new URLSearchParams(location.search);
let lang = query.get("lang") || navigator.language.slice(0, 2);
if (!(lang in messages)) lang = "en";
let m = messages[lang],
  round = 0,
  watch = newWatch(14629),
  pick = 0,
  focus = -1,
  overlay = "",
  caption = "place",
  last = 0,
  debt = 0,
  elapsed = 0;
const reduced = matchMedia("(prefers-reduced-motion:reduce)");
function fill() {
  document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
  document.title = art ? m.title : m.plain;
  document.querySelector("h1").textContent = document.title;
  el("edition").textContent = art ? m.edition : m.base;
  el("language").value = lang;
  el("sister").href = "../" + (art ? "classic" : "lantern") + "/?lang=" + lang;
  el("sister").textContent = m.other + " ↗";
  el("armory").textContent = art ? m.arm : m.shop;
  el("pads").setAttribute("aria-label", m.shop);
  el("towers").replaceChildren();
  guns.forEach((gun, i) => {
    const b = document.createElement("button");
    b.className = "tower";
    b.dataset.type = i;
    const emblem = document.createElement("canvas");
    emblem.width = 32;
    emblem.height = 26;
    drawGun(emblem.getContext("2d"), 16, 22, i, true);
    emblem.setAttribute("aria-hidden", "true");
    const label = document.createElement("span");
    label.innerHTML =
      "<b>" + m.types[i] + "</b><small>" + m.abilities[i] + "</small>";
    const price = document.createElement("strong");
    price.textContent = gun.cost;
    price.title = m.gold;
    b.append(emblem, label, price);
    b.onclick = () => {
      pick = i;
      caption = "slotHint";
      refresh();
    };
    el("towers").append(b);
  });
  el("pads").replaceChildren();
  sockets.forEach(([x, y], i) => {
    const b = document.createElement("button");
    b.className = "socket";
    b.style.left = (x / 384) * 100 + "%";
    b.style.top = (y / 228) * 100 + "%";
    b.onfocus = () => {
      focus = i;
    };
    b.onpointerenter = (e) => {
      if (e.pointerType === "mouse") focus = i;
    };
    b.onpointerleave = () => {
      if (document.activeElement !== b) focus = -1;
    };
    b.onclick = () => {
      focus = i;
      caption = place(watch, i, pick) || caption;
      refresh();
    };
    el("pads").append(b);
  });
  el("pause").textContent = m.pause;
  el("guide").setAttribute("aria-label", m.guide);
  refresh();
}
function refresh() {
  el("wave").innerHTML =
    m.wave +
    " <b>" +
    Math.max(1, watch.wave + (watch.phase === "build" ? 1 : 0)) +
    "/4</b>";
  el("light").innerHTML = m.light + " <b>" + watch.light + "/7</b>";
  el("gold").innerHTML = m.gold + " <b>" + watch.gold + "</b>";
  el("start").textContent = watch.phase === "fight" ? m.active : m.start;
  el("start").disabled = watch.phase !== "build";
  el("notice").textContent = m[caption];
  el("towers")
    .querySelectorAll("button")
    .forEach((b, i) => {
      b.setAttribute("aria-pressed", String(i === pick));
      b.disabled = watch.gold < guns[i].cost;
    });
  el("pads")
    .querySelectorAll("button")
    .forEach((b, i) =>
      b.setAttribute(
        "aria-label",
        m.soundSlot +
          " " +
          (i + 1) +
          " · " +
          (watch.towers[i] ? m.types[watch.towers[i].type] : m.empty),
      ),
    );
}
function closeSheet() {
  if (el("modal").open) el("modal").close();
  overlay = "";
  last = 0;
}
function button(text, action) {
  const b = document.createElement("button");
  b.textContent = text;
  b.onclick = action;
  el("choices").append(b);
  return b;
}
function sheet(kind) {
  overlay = kind;
  el("choices").replaceChildren();
  const titles = {
    draft: m.draft,
    pause: m.pause,
    guide: m.guide,
    win: m.clear,
    loss: m.lost,
  };
  el("modalTitle").textContent = titles[kind];
  el("modalBody").textContent = {
    pause: m.pauseMsg,
    guide: m.rules,
    draft: m.pick,
    win: m.finish + " " + watch.cleared + "/4 · " + m.kills + " " + watch.kills,
    loss:
      m.finish + " " + watch.cleared + "/4 · " + m.kills + " " + watch.kills,
  }[kind];
  if (kind === "pause" || kind === "guide") {
    button(m.resume, closeSheet);
    if (kind === "pause") button(m.restart, restart);
  }
  if (kind === "draft")
    watch.offer.forEach((id) => {
      const b = button(m.relic[id] + " · " + m.effect[id], () => {
        choose(watch, id);
        caption = "braced";
        closeSheet();
        refresh();
      });
      b.dataset.relic = id;
    });
  if (kind === "win" || kind === "loss") button(m.again, restart);
  if (!el("modal").open) el("modal").showModal();
}
function restart() {
  closeSheet();
  watch = newWatch(14629 + ++round * 173);
  pick = 0;
  focus = -1;
  caption = "place";
  debt = 0;
  refresh();
}
el("modal").addEventListener("cancel", (e) => {
  e.preventDefault();
  if (overlay === "pause" || overlay === "guide") closeSheet();
});
el("start").onclick = () => {
  if (watch.phase === "build") {
    startWave(watch);
    caption = watch.wave === 1 ? "incoming" : "active";
    focus = -1;
    refresh();
  }
};
el("pause").onclick = () => sheet("pause");
el("guide").onclick = () => sheet("guide");
el("language").onchange = (e) => {
  lang = e.target.value;
  m = messages[lang];
  const url = new URL(location.href);
  url.searchParams.set("lang", lang);
  history.replaceState(null, "", url);
  fill();
};
document.addEventListener("visibilitychange", () => {
  last = 0;
  if (document.hidden && watch.phase === "fight" && !overlay) sheet("pause");
});
function frame(now) {
  const dt = last ? Math.min(0.1, (now - last) / 1000) : 0;
  last = now;
  if (!overlay && !document.hidden) {
    elapsed += dt;
    if (watch.phase === "fight") {
      debt += dt;
      const prevGold = watch.gold,
        prevLight = watch.light;
      while (debt >= 1 / 60 && watch.phase === "fight") {
        advance(watch, 1 / 60);
        debt -= 1 / 60;
      }
      if (
        prevGold !== watch.gold ||
        prevLight !== watch.light ||
        watch.phase !== "fight"
      )
        refresh();
      if (watch.phase !== "fight") {
        debt = 0;
        sheet(watch.phase);
      }
    }
  }
  paintMap(watch, reduced.matches ? 0 : elapsed, focus, pick);
  requestAnimationFrame(frame);
}
fill();
requestAnimationFrame(frame);

const el = (id) => document.getElementById(id),
  query = new URLSearchParams(location.search);
let lang = query.get("lang") || navigator.language.slice(0, 2);
if (!(lang in messages)) lang = "en";
let m = messages[lang],
  round = 0,
  run = newRun(14629),
  selected = -1,
  status = "ready",
  overlay = "",
  debt = 0,
  last = 0,
  drag = null,
  clock = 0;
const calm = matchMedia("(prefers-reduced-motion:reduce)");
const icons = {
  summon: "M5 17h14l-2-3V9a5 5 0 0 0-10 0v5zm5 3h4M12 2v2",
  upgrade: "m4 17 8-10 8 10-8-4zM5 21l7-4 7 4",
};
for (const [id, d] of Object.entries(icons))
  el(id).querySelector("i").innerHTML =
    '<svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" d="' +
    d +
    '"/></svg>';
function pairs() {
  return run.slots.some((h, i) =>
    run.slots.slice(i + 1).some((b) => compatible(h, b)),
  );
}
function meter() {
  el("muster").hidden = run.phase !== "ready";
  el("gold").textContent = m.coins + "　" + run.coins;
  el("wave").textContent = m.wave + "　" + run.wave + " / " + WAVES;
  el("wall").textContent = m.wall + "　" + run.hp + " / " + MAX_HP;
  el("wall").style.setProperty("--life", (run.hp / MAX_HP) * 100 + "%");
  const free = run.slots.slice(0, capacity(run)).includes(null);
  el("summon").disabled =
    !free || !playable(run) || run.coins < summonCost(run);
  el("upgrade").disabled =
    run.phase !== "battle" || run.coins < upgradeCost(run);
  el("summon").querySelector("b").textContent = summonCost(run);
  el("upgrade").querySelector("b").textContent = upgradeCost(run);
  el("notice").textContent =
    m[
      !free && pairs() && selected < 0 && status !== "merged" ? "full" : status
    ];
}
function roster() {
  [...el("pads").children].forEach((b, i) => {
    const h = run.slots[i],
      locked = i >= capacity(run);
    b.classList.toggle("locked", locked);
    b.classList.toggle("chosen", i === selected);
    b.classList.toggle(
      "match",
      selected >= 0 && selected !== i && compatible(run.slots[selected], h),
    );
    b.disabled = locked || !h;
    b.setAttribute("aria-pressed", String(selected === i));
    b.setAttribute(
      "aria-label",
      m.slot +
        " " +
        (i + 1) +
        " · " +
        (h
          ? m.heroes[h.type] + " " + h.rank + " " + m.star
          : locked
            ? m.lock
            : m.empty),
    );
    const token = h
      ? h.type + "-" + h.rank + "-" + lang
      : locked
        ? "locked"
        : "empty";
    if (b.dataset.token === token) return;
    b.dataset.token = token;
    if (h)
      b.innerHTML =
        '<img alt="" draggable="false" src="' +
        crewIcons[h.type].src +
        '"><small>' +
        m.heroes[h.type] +
        '</small><b class="stars">' +
        "★".repeat(h.rank) +
        "</b>";
    else
      b.innerHTML =
        '<span class="socketmark" aria-hidden="true">' +
        (locked ? "" : "＋") +
        "</span>";
  });
  meter();
}
function pulse(i) {
  const b = el("pads").children[i];
  if (!calm.matches)
    b.animate(
      [
        { transform: "scale(.83)" },
        { transform: "scale(1.09)", offset: 0.55 },
        { transform: "scale(1)" },
      ],
      { duration: 300 },
    );
}
function pair(a, b) {
  if (merge(run, a, b)) {
    selected = -1;
    status = "merged";
    roster();
    pulse(b);
    return true;
  }
  return false;
}
function tap(i) {
  if (overlay || !playable(run) || !run.slots[i]) return;
  if (selected === i) {
    selected = -1;
    status = "next";
  } else if (selected < 0) {
    selected = i;
    status = run.slots.some((b,j)=>j!==i&&compatible(run.slots[i],b)) ? "selected" : "invalid";
  } else if (pair(selected, i)) return;
  else {
    selected = i;
    status = "invalid";
  }
  roster();
}
for (let i = 0; i < 8; i++) {
  const b = document.createElement("button");
  b.dataset.slot = i;
  el("pads").append(b);
  b.onclick = (e) => {
    if (e.detail === 0) tap(i);
  };
  b.onpointerdown = (e) => {
    if (drag || overlay || b.disabled || e.button !== 0) return;
    drag = { i, id: e.pointerId, x: e.clientX, y: e.clientY, ghost: null };
    b.setPointerCapture(e.pointerId);
  };
  b.onpointermove = (e) => {
    if (drag?.id !== e.pointerId) return;
    if (!drag.ghost && Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > 7) {
      drag.ghost = b.querySelector("img").cloneNode();
      drag.ghost.className = "dragged";
      document.body.append(drag.ghost);
      selected = i;
      status = "selected";
      roster();
    }
    if (drag.ghost) {
      drag.ghost.style.left = e.clientX + "px";
      drag.ghost.style.top = e.clientY + "px";
    }
  };
  b.onpointerup = (e) => {
    if (drag?.id !== e.pointerId) return;
    const moved = Boolean(drag.ghost);
    clearDrag();
    if (!moved) {
      tap(i);
      return;
    }
    const target = document
      .elementFromPoint(e.clientX, e.clientY)
      ?.closest("[data-slot]");
    if (!target || !pair(i, +target.dataset.slot)) {
      selected = -1;
      status = "invalid";
      roster();
    }
  };
  b.onpointercancel = () => {
    clearDrag();
    selected = -1;
    roster();
  };
}
function clearDrag() {
  drag?.ghost?.remove();
  drag = null;
}
function fill() {
  document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
  document.title = art ? m.title : m.plain;
  document.querySelector("h1").textContent = document.title;
  el("edition").textContent = art ? m.art : m.normal;
  el("sister").textContent = m.other + " ↗";
  el("sister").href = "../" + (art ? "classic" : "lantern") + "/?lang=" + lang;
  el("language").value = lang;
  for (const id of ["summon", "upgrade"])
    el(id).querySelector("span").textContent = m[id];
  el("guide").setAttribute("aria-label", m.help);
  el("pause").setAttribute("aria-label", m.pause);
  el("pads").setAttribute("aria-label", m.roster);
  el("muster").innerHTML =
    '<div class="portraits">' +
    crewIcons.map((icon) => '<img alt="" src="' + icon.src + '">').join("") +
    "</div><b>" +
    m.roster +
    "</b><small>" +
    m.ready +
    "</small>";
  roster();
}
function dismiss() {
  if (el("modal").open) el("modal").close();
  overlay = "";
  last = 0;
}
function option(title, sub, fn) {
  const b = document.createElement("button");
  b.innerHTML =
    "<strong>" +
    title +
    "</strong>" +
    (sub ? "<small>" + sub + "</small>" : "");
  b.onclick = fn;
  el("choices").append(b);
}
function restart() {
  dismiss();
  run = newRun(14629 + ++round * 173);
  selected = -1;
  status = "ready";
  debt = 0;
  clock = 0;
  roster();
}
function sheet(kind) {
  clearDrag();
  overlay = kind;
  el("modalTitle").textContent = m[kind];
  el("modalBody").textContent =
    kind === "help"
      ? m.rules
      : kind === "pause"
        ? m.paused
        : kind === "draft"
          ? m.draftDetail
          : m.wave + " " + run.wave + " / 4 · " + m.kills + " " + run.kills;
  el("choices").replaceChildren();
  if (kind === "draft")
    run.offer.forEach((id) =>
      option(m.perks[id], m.details[id], () => {
        choose(run, id);
        status = "next";
        dismiss();
        roster();
      }),
    );
  else if (kind === "win" || kind === "loss") option(m.restart, "", restart);
  else {
    option(m.resume, "", dismiss);
    if (kind === "pause") option(m.restart, "", restart);
  }
  if (!el("modal").open) el("modal").showModal();
}
el("summon").onclick = () => {
  const i = summon(run);
  if (i < 0) return;
  selected = -1;
  status = pairs() ? "pair" : "built";
  roster();
  pulse(i);
};
el("upgrade").onclick = () => {
  if (draft(run)) {
    meter();
    sheet("draft");
  }
};
el("guide").onclick = () => sheet("help");
el("pause").onclick = () => sheet("pause");
el("modal").oncancel = (e) => {
  e.preventDefault();
  if (overlay === "pause" || overlay === "help") dismiss();
};
el("language").onchange = (e) => {
  lang = e.target.value;
  m = messages[lang];
  const u = new URL(location.href);
  u.searchParams.set("lang", lang);
  history.replaceState(null, "", u);
  fill();
};
document.addEventListener("visibilitychange", () => {
  last = 0;
  if (document.hidden && run.phase === "battle" && !overlay) sheet("pause");
});
function frame(now) {
  const dt = last ? Math.min(0.1, (now - last) / 1000) : 0;
  last = now;
  if (!overlay && !document.hidden) {
    clock += dt;
    const coins = run.coins,
      hp = run.hp,
      wave = run.wave,
      old = run.phase;
    if (run.phase === "battle") {
      debt += dt;
      while (debt >= 1 / 60 && run.phase === "battle") {
        advance(run, 1 / 60);
        debt -= 1 / 60;
      }
    }
    if (wave !== run.wave) {
      status = run.wave === WAVES ? "boss" : "next";
    }
    if (old !== run.phase && ["win", "loss"].includes(run.phase))
      sheet(run.phase);
    if (hp !== run.hp || coins !== run.coins || wave !== run.wave) meter();
  }
  paint(run, calm.matches ? 0 : clock);
  requestAnimationFrame(frame);
}
fill();
requestAnimationFrame(frame);

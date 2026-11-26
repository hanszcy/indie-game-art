(() => {
  "use strict";
  const { Run, meters, fixedStep, gaps } = SkiCourse;
  const q = (s) => document.querySelector(s);
  const icons = {
    sound:
      '<path d="M3 10h4l5-4v16l-5-4H3zm13-1c3 3 3 7 0 10m3-13c5 4 5 11 0 16"/>',
    muted: '<path d="M3 10h4l5-4v16l-5-4H3zm13 1 6 6m0-6-6 6"/>',
    pause: '<path d="M8 6v15m8-15v15" stroke-width="3.7"/>',
    camp: '<path d="M5 23V4m1 1c4-3 8 3 14 0l-2 8c-5 2-9-4-12-1"/>',
    fall: '<path d="m3 19 7-7 3 3 8-10m-9 1 2-2m1 8 2-2M4 24l8-3m4-1 5-2"/>',
    finish:
      '<path d="M5 24V3h16v12H6"/><path d="M6 4h5v5H6zm5 5h5v5h-5zm5-5h5v5h-5" fill="currentColor" stroke="none"/>',
  };
  const svg = (key) =>
    '<svg viewBox="0 0 26 28" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' +
    icons[key] +
    "</svg>";
  const ui = {
    stage: q(".playfield"),
    canvas: q("#scene"),
    distance: q("#distance"),
    cleared: q("#cleared"),
    jump: q("#jump"),
    action: q("#action"),
    hint: q("#hint"),
    cue: q("#cue"),
    pause: q("#pause"),
    sound: q("#sound"),
    overlay: q("#overlay"),
    main: q("#main-action"),
    second: q("#secondary"),
    title: q("#dialog-title"),
    detail: q("#detail"),
    bars: [...document.querySelectorAll(".power i")],
  };
  const run = new Run();
  const scene = new SkiScene(
    ui.canvas,
    q("#profile"),
    matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const decorated = document.documentElement.dataset.skin === "alpenglow";
  let firstApproach = false,
    soundOn = false,
    ctx,
    pointer = null,
    key = null,
    cueTime = 0,
    previousState,
    last = performance.now(),
    bank = 0;
  ui.pause.innerHTML = svg("pause");
  function changeSound(on) {
    soundOn = on;
    ui.sound.innerHTML = svg(on ? "sound" : "muted");
    ui.sound.setAttribute("aria-pressed", String(on));
    ui.sound.setAttribute("aria-label", on ? "关闭声音" : "开启声音");
    if (on) {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (Audio) {
        try {
          ctx ||= new Audio();
          if (ctx.state === "suspended") ctx.resume().catch(() => {});
          tone("toggle");
        } catch {}
      }
    }
  }
  function tone(kind) {
    if (!soundOn || !ctx || ctx.state !== "running") return;
    const notes = {
      jump: [310, 510, 0.12],
      land: [135, 63, 0.1],
      clear: [610, 810, 0.14],
      fall: [200, 72, 0.24],
      camp: [520, 1040, 0.24],
      finish: [510, 1020, 0.4],
      toggle: [450, 640, 0.1],
    };
    const n = notes[kind];
    if (!n) return;
    const t = ctx.currentTime,
      gain = ctx.createGain(),
      osc = ctx.createOscillator();
    osc.type = kind === "land" ? "triangle" : "sine";
    osc.frequency.setValueAtTime(n[0], t);
    osc.frequency.exponentialRampToValueAtTime(n[1], t + n[2]);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.11, t + 0.009);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + n[2]);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + n[2] + 0.01);
    osc.onended = () => {
      osc.disconnect();
      gain.disconnect();
    };
  }
  function write(el, v) {
    v = String(v);
    if (el.textContent !== v) el.textContent = v;
  }
  function cue(text, seconds) {
    ui.cue.textContent = text;
    cueTime = seconds;
    ui.cue.classList.add("show");
  }
  function clearCue() {
    cueTime = 0;
    ui.cue.classList.remove("show");
  }
  function reset(camp = 0) {
    inputCancel();
    run.reset(camp);
    firstApproach = camp > 0;
    scene.puffs = [];
    clearCue();
    update();
    ui.jump.focus({ preventScroll: true });
  }
  function pause() {
    if (run.state !== "running") return;
    inputCancel();
    run.pause();
    update();
  }
  function resume() {
    run.resume();
    bank = 0;
    last = performance.now();
    update();
    ui.jump.focus({ preventScroll: true });
  }
  function showSheet(state) {
    const pause = state === "paused",
      done = state === "finished";
    const d = meters(run.x) + " m";
    const hasCamp = run.camp > 0;
    q(".ticket-icon").innerHTML = svg(
      pause ? "pause" : done ? "finish" : "fall",
    );
    ui.title.textContent = pause
      ? "雪道暂停"
      : done
        ? "顺利抵达"
        : decorated
          ? "落进了雪窝"
          : "跌落雪沟";
    ui.detail.textContent = pause
      ? d + " · 已越过 " + run.cleared + " 道雪沟"
      : done
        ? d + " · 越过全部 " + gaps.length + " 道雪沟"
        : d + " · 已越过 " + run.cleared + " / " + gaps.length + " 道雪沟";
    ui.main.textContent = pause
      ? "继续滑行"
      : done
        ? "再滑一次"
        : hasCamp
          ? "从补给点继续"
          : "重新挑战";
    ui.second.textContent = "从起点重滑";
    ui.second.hidden = done || (!pause && !hasCamp);
    ui.main.focus({ preventScroll: true });
  }
  function update() {
    write(ui.distance, meters(run.x));
    write(ui.cleared, run.cleared);
    const state = run.state,
      modal = ["fallen", "paused", "finished"].includes(state);
    if (state !== previousState) {
      ui.stage.dataset.state = state;
      ui.overlay.hidden = !modal;
      ui.pause.disabled = state !== "running";
      ui.jump.disabled = modal;
      ui.stage.querySelector(".bar").inert = modal;
      ui.stage.querySelector(".deck").inert = modal;
      if (modal) showSheet(state);
      previousState = state;
    }
    const air = !run.grounded;
    ui.jump.classList.toggle("held", run.holding);
    ui.jump.classList.toggle("air", air);
    write(
      ui.action,
      air
        ? "腾空中"
        : run.holding
          ? run.charge >= 0.98
            ? "蓄力已满"
            : "蓄力中"
          : "按住蓄力",
    );
    write(
      ui.hint,
      air ? "落地后可再跳" : run.holding ? "松手起跳" : "松开起跳",
    );
    const lit = run.holding ? Math.max(1, Math.round(run.charge * 5)) : 0;
    ui.bars.forEach((bar, i) => bar.classList.toggle("lit", i < lit));
  }
  function inputCancel() {
    pointer = null;
    key = null;
    run.cancelHold();
  }
  function press() {
    if (run.press()) {
      clearCue();
      update();
      return true;
    }
    return false;
  }
  function release() {
    run.release();
    update();
  }
  for (const el of [ui.canvas, ui.jump]) {
    el.addEventListener("pointerdown", (e) => {
      if (e.button !== 0 || pointer !== null || key !== null) return;
      e.preventDefault();
      if (press()) {
        pointer = e.pointerId;
        el.setPointerCapture(e.pointerId);
      }
    });
    el.addEventListener("pointerup", (e) => {
      if (e.pointerId !== pointer) return;
      e.preventDefault();
      pointer = null;
      release();
    });
    el.addEventListener("pointercancel", (e) => {
      if (e.pointerId === pointer) pause();
    });
    el.addEventListener("lostpointercapture", (e) => {
      if (e.pointerId === pointer) pause();
    });
    el.addEventListener("contextmenu", (e) => e.preventDefault());
  }
  ui.jump.addEventListener("click", (e) => {
    if (e.detail === 0 && key === null && pointer === null && press())
      release();
  });
  window.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      if (e.repeat) return;
      if (run.state === "paused") resume();
      else pause();
      return;
    }
    if (
      !["Space", "ArrowUp"].includes(e.code) ||
      e.altKey ||
      e.ctrlKey ||
      e.metaKey ||
      !ui.overlay.hidden
    )
      return;
    if (
      e.target.closest?.("a,button") &&
      e.target !== ui.jump &&
      e.code === "Space"
    )
      return;
    e.preventDefault();
    if (!e.repeat && pointer === null && key === null && press()) key = e.code;
  });
  window.addEventListener("keyup", (e) => {
    if (e.code === key) {
      e.preventDefault();
      key = null;
      release();
    }
  });
  ui.pause.addEventListener("click", pause);
  ui.main.addEventListener("click", () =>
    run.state === "paused"
      ? resume()
      : reset(run.state === "fallen" ? run.camp : 0),
  );
  ui.second.addEventListener("click", () => reset());
  ui.sound.addEventListener("click", () => changeSound(!soundOn));
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) pause();
  });
  window.addEventListener("blur", pause);
  ui.overlay.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    e.preventDefault();
    (ui.second.hidden || document.activeElement === ui.second
      ? ui.main
      : ui.second
    ).focus();
  });
  function handleEvents() {
    for (const event of run.events) {
      scene.onEvent(event, run);
      tone(event);
      if (event === "camp") cue("已到补给点", 1.5);
      if (event === "clear" && run.cleared === 1) cue("越过第一道雪沟", 1.2);
      if (event === "fall" || event === "finish") clearCue();
    }
    run.events.length = 0;
  }
  function frame(now) {
    const delta = Math.min(0.1, Math.max(0, (now - last) / 1000));
    last = now;
    bank += delta;
    while (bank >= fixedStep) {
      run.step(fixedStep);
      handleEvents();
      bank -= fixedStep;
    }
    if (
      !firstApproach &&
      run.state === "running" &&
      run.x >= gaps[0][0] - 212
    ) {
      firstApproach = true;
      cue("在红旗旁松手，跃过雪沟", 1.5);
    }
    if (cueTime > 0 && run.state === "running") {
      cueTime -= delta;
      if (cueTime <= 0) clearCue();
    }
    update();
    scene.draw(run, delta);
    requestAnimationFrame(frame);
  }
  new ResizeObserver(() => scene.resize()).observe(ui.stage);
  changeSound(false);
  update();
  scene.draw(run, 0);
  requestAnimationFrame(frame);
})();

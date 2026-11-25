export const STEP = 1 / 60;
const TAU = Math.PI * 2;
const rocks = [
  [28, 1.5, 1.05], [72, 2.0, 1.25], [116, 1.6, 1.05],
  [150, 2.35, 1.4], [192, 1.8, 1.1], [234, 2.5, 1.35],
  [272, 1.65, 1.05], [310, 2.25, 1.45], [354, 1.7, 1.1],
  [393, 2.3, 1.35], [430, 1.7, 1.15]
];
export const COURSE = Object.freeze({
  seed: 1729,
  length: 460,
  obstacles: Object.freeze(rocks.map(([x,width,height], i) => Object.freeze({ id: i, x, width, height }))),
  pickups: Object.freeze(rocks.map(([x], i) => Object.freeze({ id: i, x: x + (i % 2 ? 0.8 : -0.6), height: 3.8 })))
});

export function groundY(x) {
  return 0.16 * x + 1.8 * Math.sin(x / 26) + 0.55 * Math.sin(x / 10.5) + 0.35 * Math.sin(x / 6.7);
}
export function slopeAt(x) {
  return 0.16 + 1.8 / 26 * Math.cos(x / 26) + 0.55 / 10.5 * Math.cos(x / 10.5) + 0.35 / 6.7 * Math.cos(x / 6.7);
}
function initialState() {
  return { mode: 'ready', tick: 0, time: 0, x: 0, speed: 14.4, height: 0, vy: 0, grounded: true,
    pose: 'ski', angle: 0, airTime: 0, held: false, snowContact: 1, recovery: 0,
    gap: 31, pickups: 0, collected: new Set(), flips: 0, hits: 0, events: [], lastEvent: null,
    jumpTick: -1000, landTick: -1000, hitTick: -1000 };
}
export function createGame() {
  const state = initialState();
  const passed = new Set();
  let pendingJump = false;
  function reset() {
    Object.assign(state, initialState());
    passed.clear();
    pendingJump = false;
  }
  function start() { reset(); state.mode = 'running'; }
  function announce(type, fields = {}) {
    const e = { type, tick: state.tick, x: state.x, ...fields };
    state.events.push(e);
    state.lastEvent = e;
  }
  function press() {
    if (state.mode !== 'running' || state.held) return;
    state.held = true;
    if (state.grounded && state.recovery <= 0) pendingJump = true;
  }
  function release() { state.held = false; }
  function pause() {
    if (state.mode === 'running') { state.mode = 'paused'; release(); pendingJump = false; }
  }
  function resume() { if (state.mode === 'paused') state.mode = 'running'; }
  function hit(reason) {
    if (state.recovery > 0) return;
    state.hits++;
    state.hitTick = state.tick;
    state.gap -= 8.4;
    state.recovery = 1.16;
    state.grounded = true;
    state.height = state.angle = state.vy = state.airTime = 0;
    announce('hit', {reason});
  }
  function tick() {
    if (state.mode !== 'running') return;
    state.events = [];
    state.tick++;
    state.time = state.tick * STEP;
    if (pendingJump) {
      state.grounded = false;
      state.vy = 11.9;
      state.airTime = 0;
      state.angle = 0;
      state.jumpTick = state.tick;
      announce('jump');
      pendingJump = false;
    }
    state.recovery = Math.max(0, state.recovery - STEP);
    const cruise = 14.4 + state.x / COURSE.length * 2.1 + 1.1 * (slopeAt(state.x) - 0.16);
    state.speed = cruise - 6.4 * Math.min(1, state.recovery / 0.6);
    state.x = Math.min(COURSE.length, state.x + state.speed * STEP);
    state.gap -= (cruise + 0.18 - state.speed) * STEP;
    if (!state.grounded) {
      state.airTime += STEP;
      state.height += state.vy * STEP - 0.5 * 21.5 * STEP * STEP;
      state.vy -= 21.5 * STEP;
      if (state.held && state.airTime > 0.18) state.angle = Math.max(-TAU, state.angle - 7.65 * STEP);
      if (state.height <= 0) {
        state.landTick = state.tick;
        const upright = Math.abs(Math.atan2(Math.sin(state.angle), Math.cos(state.angle))) < 0.78;
        if (upright) {
          announce('land', {impact: Math.abs(state.vy)});
          if (state.angle < -Math.PI) { state.flips++; announce('flip'); }
        } else {
          hit('angle');
        }
        state.grounded = true;
        state.height = state.angle = state.vy = state.airTime = 0;
      }
    }
    for (const item of COURSE.pickups) {
      if (state.collected.has(item.id) || Math.abs(state.x - item.x) > 1.35) continue;
      if (Math.abs(state.height + 1.05 - item.height) < 1.5) {
        state.collected.add(item.id); state.pickups++;
        state.gap = Math.min(35, state.gap + 1.6);
        announce('pickup', {id: item.id});
      }
    }
    for (const rock of COURSE.obstacles) {
      if (passed.has(rock.id)) continue;
      if (state.x > rock.x + rock.width / 2 + 0.35) { passed.add(rock.id); continue; }
      if (Math.abs(state.x - rock.x) < rock.width / 2 + 0.3 && state.height < rock.height - 0.05) {
        passed.add(rock.id);
        hit('rock');
      }
    }
    state.pose = state.recovery > 0 ? 'recover' : state.grounded ? 'ski' : 'air';
    state.snowContact = state.grounded ? Math.min(1, 0.6 + state.speed / 35) : 0;
    if (state.gap <= 0) { state.gap = 0; state.mode = 'lost'; release(); announce('loss'); }
    else if (state.x >= COURSE.length) { state.mode = 'won'; release(); announce('win'); }
  }
  function lookAhead(range = 60) {
    const visible = item => item.x >= state.x - 2 && item.x <= state.x + range;
    return { obstacles: COURSE.obstacles.filter(visible), pickups: COURSE.pickups.filter(i => visible(i) && !state.collected.has(i.id)) };
  }
  return { state, start, reset, press, release, pause, resume, tick, lookAhead };
}

export function attachGame({game, stage, render, onAction}) {
  const manual = new URLSearchParams(location.search).get('manual') === '1';
  const draw = () => render(game.state, game);
  function act(name) {
    if (name === 'start' || name === 'reset') game.start();
    else if (name === 'pause') game.pause();
    else if (name === 'resume') game.resume();
    else return;
    onAction?.(name); draw();
  }
  function down() {
    if (game.state.mode === 'running') game.press();
    else if (game.state.mode === 'paused') act('resume');
    else act('start');
    draw();
  }
  function up() { game.release(); draw(); }
  function advance(ticks = 1) {
    const n = Math.max(0, Math.floor(ticks));
    for (let i = 0; i < n; i++) game.tick();
    draw();
    return game.state;
  }
  let activePointer = null;
  function pointerDown(e) {
    if (!e.isPrimary || e.button !== 0 || e.target.closest('button, a, input, [data-act]')) return;
    activePointer = e.pointerId;
    stage.setPointerCapture?.(activePointer);
    e.preventDefault();
    down();
  }
  function pointerUp(e) {
    if (e.pointerId !== activePointer) return;
    activePointer = null;
    up();
  }
  function click(e) {
    const source = e.target.closest('[data-act]');
    if (source && stage.contains(source)) act(source.dataset.act);
  }
  function keyDown(e) {
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    if (!['Space','ArrowUp','KeyP','Escape','Enter'].includes(e.code)) return;
    const focusedButton = e.target.closest?.('[data-act]');
    if (focusedButton && e.code === 'Enter') return;
    e.preventDefault();
    if (e.repeat) return;
    if (e.code === 'KeyP' || e.code === 'Escape') {
      if (game.state.mode === 'running') act('pause');
      else if (game.state.mode === 'paused') act('resume');
    } else if (e.code !== 'Enter' || game.state.mode !== 'running') down();
  }
  function keyUp(e) { if (e.code === 'Space' || e.code === 'ArrowUp') {e.preventDefault(); up();} }
  function sleep() { if (document.hidden && game.state.mode === 'running') act('pause'); }
  const bindings = [[stage,'pointerdown',pointerDown],[stage,'pointerup',pointerUp],[stage,'pointercancel',pointerUp],
    [stage,'lostpointercapture',pointerUp],[stage,'click',click],[window,'keydown',keyDown],[window,'keyup',keyUp],
    [window,'resize',draw],[document,'visibilitychange',sleep]];
  for (const [target,event,fn] of bindings) target.addEventListener(event,fn);
  let request = 0, last = 0, remainder = 0;
  function frame(now) {
    if (game.state.mode === 'running' && last) {
      remainder += Math.min(0.15, (now - last) / 1000);
      while (remainder >= STEP) {game.tick(); remainder -= STEP;}
    } else { remainder = 0; }
    last = now; draw(); request = requestAnimationFrame(frame);
  }
  draw();
  if (!manual) request = requestAnimationFrame(frame);
  return { game, advance, down, up, render: draw, destroy() {
    cancelAnimationFrame(request);
    for (const [target,event,fn] of bindings) target.removeEventListener(event,fn);
  }};
}

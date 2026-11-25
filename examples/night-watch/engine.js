// The two editions run this same fixed-step simulation. All lengths use map pixels.
const route = [
  [0, 132],
  [48, 132],
  [71, 110],
  [71, 69],
  [106, 52],
  [153, 52],
  [175, 74],
  [175, 136],
  [201, 156],
  [244, 156],
  [267, 133],
  [267, 91],
  [292, 73],
  [331, 73],
  [356, 98],
];
const sockets = [
  [45, 105],
  [95, 88],
  [128, 34],
  [150, 89],
  [194, 113],
  [226, 178],
  [244, 108],
  [296, 102],
];
const guns = [
  { cost: 5, range: 50, pace: 0.62, hit: 3 },
  { cost: 6, range: 52, pace: 1.04, hit: 2 },
  { cost: 8, range: 59, pace: 1.58, hit: 6 },
];
const segments = route
  .slice(1)
  .map(([x, y], i) => Math.hypot(x - route[i][0], y - route[i][1]));
const length = segments.reduce((a, b) => a + b, 0);
function position(distance) {
  for (let i = 0; i < segments.length; i++) {
    if (distance <= segments[i]) {
      const t = Math.max(0, distance) / segments[i];
      return route[i].map((n, j) => n + (route[i + 1][j] - n) * t);
    }
    distance -= segments[i];
  }
  return route[route.length - 1];
}
function newWatch(seed) {
  return {
    seed,
    phase: "build",
    wave: 0,
    cleared: 0,
    light: 7,
    gold: 13,
    towers: sockets.map((_, i) => (i === 1 ? { type: 0, timer: 0 } : null)),
    hostiles: [],
    shots: [],
    spawn: 0,
    clock: 0,
    serial: 0,
    kills: 0,
    damage: 1,
    range: 1,
    rate: 1,
    offer: [],
  };
}
function random(w) {
  w.seed = (Math.imul(w.seed, 1664525) + 1013904223) >>> 0;
  return w.seed / 4294967296;
}
function place(w, slot, type) {
  if (!["build", "fight"].includes(w.phase)) return false;
  if (w.towers[slot]) return "full";
  if (w.gold < guns[type].cost) return "poor";
  w.gold -= guns[type].cost;
  w.towers[slot] = { type, timer: 0 };
  return "placed";
}
function startWave(w) {
  if (w.phase !== "build") return;
  w.wave++;
  w.spawn = 6 + w.wave * 3;
  w.clock = 0;
  w.phase = "fight";
}
function draft(w) {
  const pool = [0, 1, 2, 3, 4];
  for (let i = 4; i > 0; i--) {
    const j = Math.floor(random(w) * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  w.offer = pool.slice(0, 3);
  w.phase = "draft";
}
function choose(w, id) {
  if (w.phase !== "draft" || !w.offer.includes(id)) return;
  switch (id) {
    case 0:
      w.damage *= 1.25;
      break;
    case 1:
      w.rate *= 0.85;
      break;
    case 2:
      w.range *= 1.18;
      break;
    case 3:
      w.gold += 9;
      break;
    case 4:
      w.light = Math.min(7, w.light + 3);
      break;
  }
  w.offer = [];
  w.phase = "build";
}
function advance(w, dt) {
  if (w.phase !== "fight") return;
  w.clock -= dt;
  if (w.spawn && w.clock <= 0) {
    const kind =
      w.wave >= 2 && w.spawn % 4 === 0 ? 2 : w.spawn % 3 === 0 ? 1 : 0;
    const hp = (4 + w.wave * 3) * [1, 0.7, 1.85][kind];
    w.hostiles.push({
      id: ++w.serial,
      d: 0,
      hp,
      max: hp,
      kind,
      speed: (22 + w.wave * 2) * [1, 1.46, 0.72][kind],
      chill: 0,
      pos: route[0],
    });
    w.spawn--;
    w.clock += 0.83 - w.wave * 0.035;
  }
  for (const e of w.hostiles) {
    e.chill = Math.max(0, e.chill - dt);
    e.d += dt * e.speed * (e.chill > 0 ? 0.53 : 1);
    e.pos = position(e.d);
  }
  for (let i = 0; i < w.towers.length; i++) {
    const tower = w.towers[i];
    if (!tower) continue;
    tower.timer = Math.max(0, tower.timer - dt);
    if (tower.timer > 0) continue;
    const stats = guns[tower.type],
      [x, y] = sockets[i];
    let target = null;
    for (const e of w.hostiles)
      if (
        e.hp > 0 &&
        Math.hypot(x - e.pos[0], y - e.pos[1]) <= stats.range * w.range &&
        (!target || e.d > target.d)
      )
        target = e;
    if (!target) continue;
    const power = stats.hit * w.damage;
    target.hp -= power;
    if (tower.type === 1) target.chill = 1.8;
    if (tower.type === 2)
      for (const e of w.hostiles)
        if (
          e !== target &&
          Math.hypot(e.pos[0] - target.pos[0], e.pos[1] - target.pos[1]) <= 21
        )
          e.hp -= power * 0.72;
    w.shots.push({
      from: [x, y - 5],
      to: [...target.pos],
      type: tower.type,
      age: 0,
    });
    tower.timer = stats.pace * w.rate;
  }
  w.hostiles = w.hostiles.filter((e) => {
    if (e.hp <= 0) {
      w.gold++;
      w.kills++;
      return false;
    }
    if (e.d >= length) {
      w.light = Math.max(0, w.light - 1);
      return false;
    }
    return true;
  });
  w.shots.forEach((s) => (s.age += dt));
  w.shots = w.shots.filter((s) => s.age < 0.25);
  if (w.light === 0) {
    w.phase = "loss";
    return;
  }
  if (!w.spawn && !w.hostiles.length) {
    w.cleared = w.wave;
    w.gold += 3;
    if (w.wave === 4) w.phase = "win";
    else draft(w);
  }
}

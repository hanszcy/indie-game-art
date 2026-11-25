// All gameplay values are shared by the classic and illustrated renderers.
const WALL = 295,
  WAVES = 4,
  MAX_HP = 30,
  MAX_RANK = 4;
const heroes = [
  { power: 6, delay: 0.85 },
  { power: 4, delay: 1.06 },
  { power: 9, delay: 1.68 },
];
function roll(run, key) {
  run[key] = (Math.imul(run[key], 1664525) + 1013904223) >>> 0;
  return run[key] / 4294967296;
}
function newRun(seed) {
  return {
    deck: seed,
    sea: seed + 415,
    gifts: seed + 829,
    phase: "ready",
    wave: 1,
    hp: MAX_HP,
    coins: 40,
    summons: 0,
    upgrades: 0,
    slots: Array(8).fill(null),
    levels: [0, 0, 0, 0, 0, 0],
    offer: [],
    enemies: [],
    fx: [],
    kills: 0,
    serial: 0,
    spawned: 0,
    clock: 0.35,
    rest: 0,
    time: 0,
  };
}
const capacity = (run) => Math.min(8, 4 + Math.floor(run.summons / 5));
const summonCost = (run) => 8 + Math.floor(run.summons / 3) * 2;
const upgradeCost = (run) => 12 + run.upgrades * 5;
const playable = (run) => run.phase === "ready" || run.phase === "battle";
function summon(run) {
  if (!playable(run)) return -1;
  const empty = run.slots
    .slice(0, capacity(run))
    .map((h, i) => (h ? -1 : i))
    .filter((i) => i >= 0);
  if (!empty.length || run.coins < summonCost(run)) return -1;
  const type = Math.floor(roll(run, "deck") * 3),
    slot = empty[Math.floor(roll(run, "deck") * empty.length)];
  run.coins -= summonCost(run);
  run.summons++;
  run.slots[slot] = { type, rank: 1, cd: 0.12 };
  run.phase = "battle";
  return slot;
}
function compatible(a, b) {
  return Boolean(
    a && b && a.type === b.type && a.rank === b.rank && a.rank < MAX_RANK,
  );
}
function merge(run, from, to) {
  if (
    !playable(run) ||
    from === to ||
    !compatible(run.slots[from], run.slots[to])
  )
    return false;
  run.slots[from] = null;
  run.slots[to].rank++;
  run.slots[to].cd = 0;
  return true;
}
// Two distinct perks for each hero family, plus immediate wall repair and a shared attack bonus.
function draft(run) {
  if (run.phase !== "battle" || run.coins < upgradeCost(run)) return false;
  const roster = new Set(run.slots.filter(Boolean).map((h) => h.type));
  const pool = [...roster].flatMap((i) => [i * 2, i * 2 + 1]);
  pool.push(6, 7);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(roll(run, "gifts") * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  run.coins -= upgradeCost(run);
  run.upgrades++;
  run.offer = pool.slice(0, 3);
  run.phase = "draft";
  return true;
}
function choose(run, id) {
  if (run.phase !== "draft" || !run.offer.includes(id)) return false;
  if (id === 6) run.hp = Math.min(MAX_HP, run.hp + 9);
  else if (id === 7) run.command = (run.command || 0) + 1;
  else run.levels[id]++;
  run.offer = [];
  run.phase = "battle";
  return true;
}
const countWave = (wave) => 5 + wave * 3;
function spawn(run) {
  const boss = run.wave === WAVES && run.spawned === countWave(run.wave) - 1;
  const kind = boss
    ? 3
    : Math.floor(roll(run, "sea") * Math.min(3, run.wave + 1));
  const x = 34 + roll(run, "sea") * 252;
  const hp =
    (6 + 2 * run.wave + 1.7 * run.wave ** 2) * [1, 0.72, 1.65, 10][kind];
  run.enemies.push({
    id: ++run.serial,
    x,
    y: 58,
    kind,
    hp,
    max: hp,
    chill: 0,
    bite: 0.25,
    speed: [22, 32, 16, 14][kind] + run.wave,
  });
  run.spawned++;
}
function attack(run, h, slot) {
  const origin = 40 + (slot % 4) * 80 + (slot >= 4 ? 9 : -9);
  const targets = run.enemies
    .filter((e) => e.hp > 0 && e.y >= 105)
    .sort(
      (a, b) =>
        b.y - a.y + 0.1 * (Math.abs(a.x - origin) - Math.abs(b.x - origin)),
    );
  if (!targets.length) return;
  const k = h.type,
    amp = run.levels[k * 2],
    special = run.levels[k * 2 + 1];
  const damage =
    heroes[k].power *
    Math.pow(2.32, h.rank - 1) *
    (1 + 0.35 * amp) *
    (1 + 0.18 * (run.command || 0));
  const target = targets[0],
    hit = (e, p) => {
      e.hp -= p;
      if (k === 1) e.chill = 1.6 + 0.2 * amp;
      run.fx.push({ x: origin, y: WALL - 7, tx: e.x, ty: e.y, k, age: 0 });
    };
  hit(target, damage);
  if (k < 2 && special)
    for (const e of targets.slice(1, 1 + special)) hit(e, damage * 0.65);
  if (k === 2)
    for (const e of targets.slice(1))
      if (Math.hypot(e.x - target.x, e.y - target.y) <= 27 + special * 13)
        e.hp -= damage * 0.72;
  h.cd = heroes[k].delay / (1 + 0.1 * (h.rank - 1));
}
function advance(run, dt) {
  if (run.phase !== "battle") return;
  run.time += dt;
  run.clock -= dt;
  if (run.spawned < countWave(run.wave) && run.clock <= 0) {
    spawn(run);
    run.clock = 1.05 - run.wave * 0.06;
  }
  for (const e of run.enemies) {
    e.chill = Math.max(0, e.chill - dt);
    e.y = Math.min(WALL - 7, e.y + dt * e.speed * (e.chill ? 0.54 : 1));
  }
  run.slots.forEach((h, i) => {
    if (h) {
      h.cd = Math.max(0, h.cd - dt);
      if (!h.cd) attack(run, h, i);
    }
  });
  for (const e of run.enemies)
    if (e.hp > 0 && e.y >= WALL - 7) {
      e.bite -= dt;
      if (e.bite <= 0) {
        run.hp = Math.max(0, run.hp - (e.kind === 3 ? 4 : 2));
        e.bite = 1.65;
      }
    }
  run.enemies = run.enemies.filter((e) => {
    if (e.hp > 0) return true;
    run.kills++;
    run.coins += e.kind === 3 ? 10 : 3;
    return false;
  });
  run.fx.forEach((f) => (f.age += dt));
  run.fx = run.fx.filter((f) => f.age < 0.26);
  if (!run.hp) {
    run.phase = "loss";
    return;
  }
  if (run.spawned === countWave(run.wave) && !run.enemies.length) {
    if (run.wave === WAVES) {
      run.phase = "win";
      return;
    }
    run.rest += dt;
    if (run.rest >= 1.2) {
      run.wave++;
      run.spawned = 0;
      run.clock = 0.25;
      run.rest = 0;
      run.coins += 5;
    }
  }
}

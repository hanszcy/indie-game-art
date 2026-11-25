import { LEVELS } from './levels.js';

export { LEVELS };
const DIRECTIONS = Object.freeze({ up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] });
const cell = (x, y) => Object.freeze({ x, y });
const key = (x, y) => x + ',' + y;

function readLevel({ name, rows }) {
  const walls = [], targets = [], crates = [];
  let player;
  for (const [y, row] of rows.entries()) {
    for (const [x, tile] of [...row].entries()) {
      if (tile === '#') walls.push(cell(x, y));
      if ('.*+'.includes(tile)) targets.push(cell(x, y));
      if ('$*'.includes(tile)) crates.push(cell(x, y));
      if ('@+'.includes(tile)) player = cell(x, y);
    }
  }
  return { name, width: rows[0].length, height: rows.length, walls: Object.freeze(walls),
    wallKeys: new Set(walls.map(p => key(p.x, p.y))), targets: Object.freeze(targets),
    targetKeys: new Set(targets.map(p => key(p.x, p.y))), crates, player };
}
const maps = LEVELS.map(readLevel);

/**
 * createGame(zeroBasedLevel = 0) creates an isolated session. getState() returns
 * a read-only snapshot with level, levelCount, name, width, height, walls,
 * targets, player, crates, moves, pushes, onTargets, solved and canUndo.
 * All positions are {x, y}; the origin is the upper-left tile.
 * move('up'|'down'|'left'|'right'), undo(), restart(), load(level) and next()
 * return true on success. Illegal moves leave the counters and history intact.
 * next() requires a solved non-final level. undo() also works after a win.
 */
export function createGame(zeroBasedLevel = 0) {
  let level, map, history, player, crates, moves, pushes, onTargets;
  function load(index) {
    if (!Number.isInteger(index) || index < 0 || index >= maps.length) return false;
    level = index;
    map = maps[index];
    history = [];
    player = map.player;
    crates = Object.freeze([...map.crates]);
    moves = 0;
    pushes = 0;
    countTargets();
    return true;
  }
  function countTargets() {
    onTargets = crates.filter(p => map.targetKeys.has(key(p.x, p.y))).length;
  }
  function getState() {
    return Object.freeze({ level, levelCount: maps.length, name: map.name,
      width: map.width, height: map.height, walls: map.walls, targets: map.targets,
      player, crates, moves, pushes, onTargets, solved: onTargets === crates.length,
      canUndo: history.length > 0 });
  }
  function blocked(x, y) {
    return x < 0 || y < 0 || x >= map.width || y >= map.height || map.wallKeys.has(key(x, y));
  }
  function boxAt(x, y) {
    return crates.findIndex(p => p.x === x && p.y === y);
  }
  function move(direction) {
    if (!Object.hasOwn(DIRECTIONS, direction) || onTargets === crates.length) return false;
    const [dx, dy] = DIRECTIONS[direction];
    const x = player.x + dx, y = player.y + dy;
    if (blocked(x, y)) return false;
    const box = boxAt(x, y);
    if (box >= 0 && (blocked(x + dx, y + dy) || boxAt(x + dx, y + dy) !== -1)) return false;
    history.push({ player, crates, moves, pushes, onTargets });
    if (box >= 0) {
      crates = Object.freeze(crates.map((p, i) => i === box ? cell(x + dx, y + dy) : p));
      pushes++;
      countTargets();
    }
    player = cell(x, y);
    moves++;
    return true;
  }
  function undo() {
    if (!history.length) return false;
    ({ player, crates, moves, pushes, onTargets } = history.pop());
    return true;
  }
  const restart = () => load(level);
  const next = () => onTargets === crates.length && load(level + 1);
  if (!load(zeroBasedLevel)) throw new RangeError('Unknown Sokoban level');
  return Object.freeze({ getState, move, undo, restart, load, next });
}

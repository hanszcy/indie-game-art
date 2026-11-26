import { Match3 } from '../shared/core.js';

const $ = id => document.getElementById(id);
const board = $('board');
const labels = ['胡萝卜', '番茄', '玉米', '茄子', '豌豆'];
const art = [
  '<path d="M26 15C18 8 17 2 22 3l5 7c-1-9 3-12 5-8l-1 11c7-7 11-6 9-2l-9 7" fill="#489535" stroke="#287234" stroke-width="1.5"/><path d="M16 15c5-6 15-2 16 4 1 7-17 23-22 24-2-7 0-23 6-28Z" fill="#f79029" stroke="#b85b21" stroke-width="1.5"/><path d="M25 18c-5 1-9 10-11 19" stroke="#ffd16b" stroke-width="4" fill="none" stroke-linecap="round"/><path d="m13 26 5 2m4-8 5 3m-11 11 4 2" stroke="#cf6920" stroke-width="2" stroke-linecap="round"/>',
  '<path d="M24 13C6 4 0 27 10 38c5 6 10 5 14 4 5 1 11 2 16-6 9-15-1-29-16-23Z" fill="#ed654c" stroke="#b73b31" stroke-width="1.5"/><path d="M25 15c13-4 18 12 11 22-3 4-7 5-11 5 8-7 9-17 0-27Z" fill="#d94638"/><path d="m24 16-12-4 8-2 3-7 4 7 10 1-9 5-4 8-3-8" fill="#519b43" stroke="#367d35" stroke-width="1"/><path d="M24 11c0-5 3-8 6-8" stroke="#397a36" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M13 21c-3 3-4 6-3 9" stroke="#ffa594" stroke-width="4" fill="none" stroke-linecap="round"/>',
  '<path d="M15 34C9 22 17 4 25 4s12 19 6 31Z" fill="#f9c541" stroke="#ba8a28" stroke-width="1.5"/><path d="M20 9v22m6-23v23m5-18v17M15 15h17M14 21h20M14 27h19" stroke="#e7a42c" stroke-width="1.8" fill="none"/><path d="M24 43C10 40 5 31 7 17c9 6 13 13 17 26Z" fill="#65a94b" stroke="#3d8134" stroke-width="1.5"/><path d="M23 43c14-4 17-14 16-27-10 6-14 16-16 27Z" fill="#83bc50" stroke="#3d8134" stroke-width="1.5"/><path d="m11 24 12 19 12-20" stroke="#b4d575" stroke-width="2" fill="none"/>',
  '<path d="M29 11C17 14 23 23 11 28 0 34 7 46 20 43c14-3 15-16 16-25Z" fill="#8456ae" stroke="#56367e" stroke-width="1.5"/><path d="M29 17c-1 12-4 21-17 24 8 6 23-5 23-20Z" fill="#684193"/><path d="M22 23c-2 4-5 6-9 8" stroke="#b896d6" stroke-width="4" fill="none" stroke-linecap="round"/><path d="m27 12 3-7 5 5 6 5-8 1-2 7-4-6-7 2Z" fill="#66a94b" stroke="#3f8138" stroke-width="1.2"/><path d="M32 10c1-5 4-7 8-7" stroke="#4c8d3b" stroke-width="3" fill="none" stroke-linecap="round"/>',
  '<path d="M9 38C5 25 18 8 35 8l6-4-1 7c-1 18-15 32-28 30Z" fill="#5c9e45" stroke="#347837" stroke-width="1.5"/><path d="M12 36c6-1 20-12 24-24-13 1-25 13-24 24Z" fill="#c1d96c"/><circle cx="17" cy="30" r="5.5" fill="#8fbc4e" stroke="#5f9b3e"/><circle cx="25" cy="22" r="5.5" fill="#9bc853" stroke="#5f9b3e"/><circle cx="31" cy="14" r="4.5" fill="#a9cf5d" stroke="#5f9b3e"/><path d="m15 28 2-2m7-6 2-2m4-6 2-1" stroke="#dce99b" stroke-width="2" stroke-linecap="round"/>',
];
let game = new Match3(43);
let selected = null;
let busy = false;
let focused = 0;
let keyboardMode = false;
let gesture = null;
let ignoreClickUntil = 0;
let hintTimer;
let run = 0;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const wait = ms => new Promise(resolve => setTimeout(resolve, reducedMotion ? 20 : ms));
const frame = () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

function announce(text) { $('announcement').textContent = text; }
function message(text) { $('message').textContent = text; }
function render(values = game.board) {
  board.innerHTML = values.map((color, index) => `<button class="tile" type="button" role="gridcell" data-index="${index}" tabindex="${index === focused ? 0 : -1}" aria-label="${labels[color]}，第 ${Math.floor(index / 7) + 1} 行，第 ${index % 7 + 1} 列" aria-selected="false"><span class="piece"><svg viewBox="0 0 48 48" aria-hidden="true">${art[color]}</svg></span></button>`).join('');
  updateSelection();
  if (keyboardMode) board.children[focused]?.focus({ preventScroll: true });
}
function stats(score = game.score) {
  $('score').textContent = score.toLocaleString('en-US');
  $('moves').textContent = game.moves;
  $('moves').parentElement.classList.toggle('low', game.moves <= 5);
  $('progress-fill').style.width = `${Math.min(100, score / game.target * 100)}%`;
  $('progress').setAttribute('aria-valuenow', Math.min(game.target, score));
}
function updateSelection() {
  [...board.children].forEach((tile, index) => {
    tile.classList.toggle('selected', index === selected);
    tile.setAttribute('aria-selected', String(index === selected));
    tile.tabIndex = index === focused ? 0 : -1;
  });
}
function clearHint() {
  clearTimeout(hintTimer);
  document.querySelectorAll('.hinted').forEach(tile => tile.classList.remove('hinted'));
}
function setBusy(value) {
  busy = value;
  board.classList.toggle('busy', value);
  board.setAttribute('aria-busy', String(value));
  $('hint').disabled = value || game.over;
  $('restart').disabled = value;
}
function select(index) {
  if (busy || game.over) return;
  clearHint();
  focused = index;
  if (selected === index) selected = null;
  else if (selected !== null && game.adjacent(selected, index)) { swap(selected, index); return; }
  else selected = index;
  updateSelection();
  message(selected === null ? '交换相邻蔬菜，连成 3 个即可收获' : '再选一颗相邻蔬菜，交换位置');
}

async function swap(a, b) {
  if (busy || game.over || !game.adjacent(a, b)) return;
  const currentRun = run;
  clearHint(); selected = null; updateSelection(); setBusy(true);
  const aTile = board.children[a], bTile = board.children[b];
  const aPiece = aTile.querySelector('.piece'), bPiece = bTile.querySelector('.piece');
  const aRect = aTile.getBoundingClientRect(), bRect = bTile.getBoundingClientRect();
  const dx = bRect.x - aRect.x, dy = bRect.y - aRect.y;
  aTile.classList.add('swapping'); bTile.classList.add('swapping');
  const duration = reducedMotion ? 0 : 150;
  aPiece.style.transition = bPiece.style.transition = `transform ${duration}ms ease-in-out`;
  aPiece.style.transform = `translate(${dx}px,${dy}px)`;
  bPiece.style.transform = `translate(${-dx}px,${-dy}px)`;
  await wait(160);
  if (run !== currentRun) return;
  const previousScore = game.score;
  const result = game.swap(a, b);
  if (!result.valid) {
    aPiece.style.transform = bPiece.style.transform = '';
    message('还差一点！试试能连成三个的交换');
    announce('未连成三个，不消耗步数');
    await wait(170);
    render(); setBusy(false); return;
  }
  let displayedScore = previousScore;
  stats(displayedScore);
  for (const wave of result.waves) {
    if (run !== currentRun) return;
    render(wave.before);
    await frame();
    wave.removed.forEach(index => board.children[index].querySelector('.piece').classList.add('clearing'));
    $('points-pop').classList.remove('show');
    void $('points-pop').offsetWidth;
    $('points-pop').innerHTML = `+${wave.points}${wave.combo > 1 ? `<small>${wave.combo} 连收</small>` : ''}`;
    $('points-pop').classList.add('show');
    message(wave.combo > 1 ? `${wave.combo} 次连收！田里又丰收啦` : `收获了 ${wave.removed.length} 颗新鲜蔬菜`);
    displayedScore += wave.points; stats(displayedScore);
    await wait(250);
    render(wave.after);
    const removed = new Set(wave.removed);
    const cellStep = board.children[7].getBoundingClientRect().y - board.children[0].getBoundingClientRect().y;
    for (let x = 0; x < 7; x++) {
      const survivors = [];
      for (let y = 0; y < 7; y++) if (!removed.has(y * 7 + x)) survivors.push(y);
      const newCount = 7 - survivors.length;
      for (let y = 0; y < 7; y++) {
        const piece = board.children[y * 7 + x].querySelector('.piece');
        const from = y < newCount ? y - newCount : survivors[y - newCount];
        piece.style.transform = `translateY(${(from - y) * cellStep}px)`;
        if (y < newCount) piece.style.opacity = '0';
      }
    }
    await frame();
    board.querySelectorAll('.piece').forEach(piece => {
      piece.style.transition = `transform ${reducedMotion ? 0 : 230}ms cubic-bezier(.2,.7,.3,1.05), opacity 150ms ease`;
      piece.style.transform = ''; piece.style.opacity = '1';
    });
    await wait(260);
  }
  if (run !== currentRun) return;
  render(); stats(); setBusy(false);
  if (result.shuffled) { message('菜地重新整理好啦，继续收获吧'); announce('已重新排列，可以继续消除'); }
  else announce(`当前 ${game.score} 分，剩余 ${game.moves} 步`);
  if (game.over) showResult();
  setTimeout(() => { if (run === currentRun) $('points-pop').classList.remove('show'); }, 350);
}

function hint() {
  if (busy || game.over) return;
  clearHint(); selected = null; updateSelection();
  const pair = game.findMove();
  if (!pair) return;
  pair.forEach(index => board.children[index].classList.add('hinted'));
  message('交换这两颗闪亮的蔬菜试试');
  announce(`提示：交换第 ${Math.floor(pair[0]/7)+1} 行第 ${pair[0]%7+1} 列与第 ${Math.floor(pair[1]/7)+1} 行第 ${pair[1]%7+1} 列`);
  hintTimer = setTimeout(clearHint, 4000);
}
function showResult() {
  const won = game.won;
  $('result-icon').textContent = won ? '★' : '✧';
  $('result-eyebrow').textContent = won ? '今日大丰收' : '菜园等你回来';
  $('result-title').textContent = won ? '满载而归！' : '再种一次吧';
  $('result-description').textContent = won ? `收获 ${game.score.toLocaleString('en-US')} 分，还剩 ${game.moves} 步。菜篮装满啦！` : `收获 ${game.score.toLocaleString('en-US')} / 1,800 分。再来一次，让菜园迎来丰收。`;
  $('result').hidden = false;
  $('hint').disabled = true;
  message(won ? '丰收目标达成！' : '步数用完啦，再试一次吧');
  announce(won ? `成功通关，共 ${game.score} 分` : `步数用完，共 ${game.score} 分`);
  $('play-again').focus({ preventScroll: true });
}
function restart() {
  if (busy) return;
  run++; clearHint(); game = new Match3(43); selected = null; focused = 0;
  $('result').hidden = true; $('points-pop').classList.remove('show');
  render(); stats(); setBusy(false);
  message('交换相邻蔬菜，连成 3 个即可收获');
  announce('新的一局，在 24 步内收获 1,800 分');
}

board.addEventListener('click', event => {
  if (performance.now() < ignoreClickUntil) return;
  const tile = event.target.closest('.tile');
  if (tile) select(Number(tile.dataset.index));
});
board.addEventListener('pointerdown', event => {
  keyboardMode = false;
  if (busy || game.over || !event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
  const tile = event.target.closest('.tile');
  if (!tile) return;
  gesture = { index: Number(tile.dataset.index), x: event.clientX, y: event.clientY, id: event.pointerId };
  tile.setPointerCapture(event.pointerId);
});
board.addEventListener('pointerup', event => {
  if (!gesture || gesture.id !== event.pointerId) return;
  const start = gesture; gesture = null;
  const dx = event.clientX - start.x, dy = event.clientY - start.y;
  if (Math.max(Math.abs(dx), Math.abs(dy)) < 14) return;
  ignoreClickUntil = performance.now() + 350;
  const horizontal = Math.abs(dx) > Math.abs(dy);
  const target = start.index + (horizontal ? (dx > 0 ? 1 : -1) : (dy > 0 ? 7 : -7));
  if (game.adjacent(start.index, target)) swap(start.index, target);
});
board.addEventListener('pointercancel', () => { gesture = null; });
board.addEventListener('focusin', event => {
  const tile = event.target.closest('.tile');
  if (tile && focused !== Number(tile.dataset.index)) {
    focused = Number(tile.dataset.index);
    updateSelection();
  }
});
board.addEventListener('keydown', event => {
  const offsets = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
  if (!(event.key in offsets)) return;
  event.preventDefault(); if (busy || game.over) return;
  keyboardMode = true;
  const candidate = focused + offsets[event.key];
  if (game.adjacent(focused, candidate)) { focused = candidate; updateSelection(); board.children[focused].focus({ preventScroll: true }); }
});
document.addEventListener('keydown', event => {
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.key.toLowerCase() === 'h') { event.preventDefault(); hint(); }
  if (event.key.toLowerCase() === 'r') { event.preventDefault(); restart(); }
});
$('hint').addEventListener('click', hint);
$('restart').addEventListener('click', restart);
$('play-again').addEventListener('click', restart);
render(); stats();

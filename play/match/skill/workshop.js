(() => {
  'use strict';

  const { Game, TYPES, SIZE, adjacent } = window.CandyMatch;
  const game = new Game(0);
  const get = id => document.getElementById(id);
  const board = get('board');
  const sweets = get('sweets');
  const shards = get('shards');
  const sockets = get('sockets');
  const buttons = [];
  const actors = new Map();
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const position = index => ({x: ((index % SIZE) + SIZE) % SIZE, y: Math.floor(index / SIZE)});
  const orderNumbers = Array.from({length: SIZE}, (_, i) => i + 1);
  const keyboardHelp = '点选或滑动，三颗同色即消。';
  let state = game.getState();
  let focused = 0;
  let selected = -1;
  let pair = [];
  let gesture = null;
  let ignoreClick = false;
  let busy = false;
  let generation = 0;
  let keyboard = false;
  let audio = null;
  let soundOn = false;

  function chime(hz, endHz, length, gain, delay = 0, wave = 'sine') {
    if (!soundOn || !audio || audio.state !== 'running') return;
    const tone = audio.createOscillator();
    const envelope = audio.createGain();
    const when = audio.currentTime + delay;
    tone.type = wave;
    tone.frequency.setValueAtTime(hz, when);
    tone.frequency.exponentialRampToValueAtTime(endHz, when + length);
    envelope.gain.setValueAtTime(.0001, when);
    envelope.gain.exponentialRampToValueAtTime(gain, when + .004);
    envelope.gain.exponentialRampToValueAtTime(.0001, when + length);
    tone.connect(envelope).connect(audio.destination);
    tone.start(when);
    tone.stop(when + length);
  }

  function locate(el, index) {
    const {x,y} = position(index);
    el.style.setProperty('--left', (100 * x / SIZE) + '%');
    el.style.setProperty('--top', (100 * y / SIZE) + '%');
  }

  function makeActor(tile) {
    const el = document.createElement('div');
    el.className = 'sweet';
    el.dataset.id = tile.id;
    el.dataset.type = tile.type;
    el.style.setProperty('--angle', ((tile.id * 11 % 13) - 6) + 'deg');
    const img = document.createElement('img');
    img.src = './art/' + tile.type + '.webp';
    img.alt = '';
    img.draggable = false;
    el.append(img);
    actors.set(tile.id, el);
    sweets.append(el);
    return el;
  }

  function place(next) {
    const present = new Set();
    next.board.forEach((tile, i) => {
      if (!tile) return;
      present.add(tile.id);
      const el = actors.get(tile.id) || makeActor(tile);
      locate(el, i);
    });
    for (const [id, el] of actors) {
      if (!present.has(id)) {
        el.remove();
        actors.delete(id);
      }
    }
    state = next;
    controls();
  }

  function updateHUD(s) {
    get('level').textContent = String(s.level + 1).padStart(2, '0');
    get('order-title').textContent = s.title;
    get('moves').textContent = s.movesLeft;
    get('score').textContent = s.score;
    const area = get('goals');
    if (area.childElementCount !== s.goals.length || area.dataset.level !== String(s.level)) {
      area.dataset.level = s.level;
      area.replaceChildren();
      s.goals.forEach(g => {
        const row = document.createElement('div');
        row.className = 'goal';
        const icon = document.createElement('img');
        icon.src = './art/' + g.type + '.webp';
        icon.alt = '';
        const name = document.createElement('span');
        name.className = 'name';
        name.textContent = TYPES[g.type];
        const count = document.createElement('span');
        count.className = 'count';
        count.append(document.createElement('b'), document.createElement('em'));
        row.append(icon, name, count);
        area.append(row);
      });
    }
    s.goals.forEach((g, i) => {
      const row = area.children[i];
      row.classList.toggle('done', g.target === g.collected);
      row.setAttribute('aria-label', TYPES[g.type] + '已收集' + g.collected + '，目标' + g.target);
      row.querySelector('b').textContent = g.collected;
      row.querySelector('em').textContent = '/' + g.target;
    });
  }

  function controls() {
    board.setAttribute('aria-busy', String(busy));
    board.dataset.state = state.status;
    get('hint').disabled = busy || state.status !== 'playing';
    buttons.forEach((el, i) => {
      const tile = state.board[i];
      el.tabIndex = focused === i && state.status === 'playing' ? 0 : -1;
      el.setAttribute('aria-label', `第${position(i).y + 1}行第${position(i).x + 1}列，${tile ? TYPES[tile.type] : '空模'}`);
      el.setAttribute('aria-pressed', String(i === selected));
      el.classList.toggle('selected', i === selected);
      el.classList.toggle('hinted', pair.includes(i));
      el.classList.toggle('kfocus', keyboard && i === focused && !busy && state.status === 'playing' && document.activeElement === el);
      if (tile) actors.get(tile.id)?.classList.toggle('lift', selected === i);
    });
  }

  function setFocus(i, moveDOM = true) {
    focused = i;
    if (moveDOM) buttons[i].focus({preventScroll:true});
    controls();
  }

  const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
  function animate(el, frames, duration, easing = 'linear', delay = 0) {
    if (!el || motion.matches) return;
    el.animate(frames, {duration, easing, delay, fill:delay ? 'backwards' : 'none'});
  }

  function moveSweet(el, from, to, kind, duration, delay = 0) {
    const a = position(from), b = position(to);
    const x = (a.x - b.x) * 100, y = (a.y - b.y) * 100;
    const start = `translate(${x}%,${y}%)`;
    if (kind === 'fall' || kind === 'pour') {
      const isNew = kind === 'pour';
      animate(el, [
        {transform:start + (isNew ? ' rotate(-14deg)' : ''), opacity:isNew ? .75 : 1, offset:0},
        {transform:'translateY(2%) rotate(1deg)', opacity:1, offset:.84},
        {transform:'translateY(-1%) rotate(-.5deg)', offset:.93},
        {transform:'none', offset:1}
      ], duration, 'cubic-bezier(.42,.02,.76,1)', delay);
    } else {
      animate(el, [
        {transform:start},
        {transform:`translate(${x * .48}%,${y * .48 - (kind === 'swap' ? 4 : 0)}%) rotate(${kind === 'swap' ? -3 : 2}deg)`},
        {transform:'none'}
      ], duration, kind === 'revert' ? 'cubic-bezier(.26,.66,.36,1)' : 'ease-in-out');
    }
  }

  function fracture(tile) {
    const actor = actors.get(tile.id);
    if (!actor || motion.matches) return;
    const cracks = document.createElementNS('http://www.w3.org/2000/svg','svg');
    cracks.setAttribute('viewBox','0 0 100 100');
    cracks.classList.add('fracture');
    const vein = document.createElementNS(cracks.namespaceURI,'path');
    vein.setAttribute('d','M27 24 48 43 44 51 61 59 65 76 M45 50 32 54 27 62 M60 58 73 47');
    cracks.append(vein);
    actor.append(cracks);
    animate(actor, [{transform:'scale(1)'},{transform:'scale(1.045)'},{transform:'scale(1.025)'}], 75, 'ease-out');
  }

  const fragments = [
    ['polygon(0 0,35% 0,50% 43%,43% 52%,0 67%)',-13,-10,-15],
    ['polygon(35% 0,100% 0,100% 31%,65% 59%,43% 52%,50% 43%)',11,-13,8],
    ['polygon(100% 31%,100% 100%,68% 100%,65% 59%)',16,8,14],
    ['polygon(0 67%,43% 52%,65% 59%,68% 100%,0 100%)',-9,13,-8]
  ];

  function breakSweet(tile) {
    const actor = actors.get(tile.id);
    if (!actor || motion.matches) return;
    for (const [clip,x,y,angle] of fragments) {
      const part = document.createElement('div');
      part.className = 'fragment';
      part.style.setProperty('--angle',actor.style.getPropertyValue('--angle'));
      locate(part, tile.index);
      const img = actor.firstElementChild.cloneNode();
      img.style.clipPath = clip;
      if (tile.type === 2) img.style.width = img.style.height = '94%';
      if (tile.type === 3) img.style.width = img.style.height = '84%';
      part.append(img);
      shards.append(part);
      animate(part,[{opacity:1,transform:'none'},{opacity:.85,offset:.45},{opacity:0,transform:`translate(${x}%,${y}%) rotate(${angle}deg) scale(.7)`}],155,'ease-out');
    }
  }

  async function runEvent(event, token) {
    const reduce = motion.matches;
    if (event.kind === 'swap' || event.kind === 'revert') {
      const a = event.a, b = event.b;
      const time = event.kind === 'swap' ? 154 : 145;
      place(event.state);
      moveSweet(actors.get(state.board[a].id),b,a,event.kind,time);
      moveSweet(actors.get(state.board[b].id),a,b,event.kind,time);
      if (event.kind === 'revert') get('status').textContent = '未连成三颗，糖果归位。';
      updateHUD(state);
      if (event.kind === 'revert') chime(475,300,.08,.045);
      if (!reduce) await pause(time);
    } else if (event.kind === 'clear') {
      event.tiles.forEach(fracture);
      if (!reduce) await pause(76);
      if (token !== generation) return;
      chime(1850,950,.055,.052,0,'triangle');
      chime(2680,1740,.065,.035,.012);
      event.tiles.forEach(breakSweet);
      place(event.state);
      updateHUD(state);
      get('status').textContent = event.chain > 1 ? '连锁 ×' + event.chain + '，糖片碎开。' : '收下 ' + event.tiles.length + ' 颗糖。';
      if (!reduce) await pause(150);
      if (token === generation) shards.replaceChildren();
    } else if (event.kind === 'fall') {
      place(event.state);
      let end = 0;
      for (const m of event.movements) {
        const distance = Math.floor(m.to / SIZE) - Math.floor(m.from / SIZE);
        const duration = 125 + Math.sqrt(distance) * 51;
        const delay = m.from < 0 ? 24 : 0;
        moveSweet(actors.get(m.id), m.from, m.to, m.from < 0 ? 'pour' : 'fall', duration, delay);
        end = Math.max(end, duration + delay);
      }
      if (!reduce) await pause(end + 16);
      if (token === generation) chime(740,510,.08,.035);
    } else if (event.kind === 'shuffle') {
      const old = new Map();
      state.board.forEach((tile, i) => {if (tile) old.set(tile.id, i)});
      place(event.state);
      state.board.forEach((tile, i) => {
        if (old.has(tile.id) && old.get(tile.id) !== i) moveSweet(actors.get(tile.id),old.get(tile.id),i,'shuffle',230);
      });
      get('status').textContent = '已重排模盘，可继续交换。';
      if (!reduce) await pause(230);
    }
  }

  function finish(s) {
    place(s);
    updateHUD(s);
    if (s.status === 'playing') return;
    const won = s.status === 'won';
    const finalLevel = won && s.level === s.levelCount - 1;
    get('stamp').textContent = won ? '本炉交货' : '本炉未齐';
    const missing = s.goals.filter(g => g.collected < g.target).map(g => TYPES[g.type] + '差' + (g.target - g.collected) + '颗');
    get('reason').textContent = won ? (finalLevel ? '三炉订单全部完成。' : s.title + '，订单已经装齐。') : '步数用尽，' + missing.join('、') + '。';
    get('next').textContent = won ? (finalLevel ? '再做第一炉' : '下一炉') : '重试本炉';
    get('receipt').hidden = false;
    get('status').textContent = won ? '订单完成。' : '订单未完成。';
    get('next').focus({preventScroll:true});
  }

  async function exchange(a, b) {
    if (busy || state.status !== 'playing' || !adjacent(a,b)) return;
    busy = true;
    const token = ++generation;
    if (gesture) {gesture.cell.classList.remove('pressing');gesture = null;ignoreClick = true}
    selected = -1;
    pair = [];
    controls();
    const turn = game.swap(a,b);
    for (const event of turn.events) {
      if (token !== generation) return;
      await runEvent(event, token);
    }
    if (token !== generation) return;
    busy = false;
    finish(turn.state);
    if (!turn.valid) get('status').textContent = '未连成三颗，步数未扣。';
  }

  function pick(i) {
    if (busy || state.status !== 'playing') return;
    setFocus(i);
    pair = [];
    if (selected >= 0 && adjacent(selected,i)) {
      exchange(selected,i);
      return;
    }
    selected = selected === i ? -1 : i;
    if (selected >= 0) chime(1040,860,.055,.04);
    get('status').textContent = selected < 0 ? keyboardHelp : '已选' + TYPES[state.board[i].type] + '，再选相邻糖果。';
    controls();
  }

  function restart(level) {
    generation++;
    gesture = null;
    ignoreClick = false;
    busy = false;
    selected = -1;
    pair = [];
    focused = 0;
    board.getAnimations({subtree:true}).forEach(animation => animation.cancel());
    actors.clear();
    sweets.replaceChildren();
    shards.replaceChildren();
    buttons.forEach(b => b.classList.remove('pressing'));
    get('receipt').hidden = true;
    get('status').textContent = keyboardHelp;
    finish(game.reset(level));
    setFocus(0, keyboard);
  }

  for (const row of orderNumbers) for (const col of orderNumbers) {
    const button = document.createElement('button');
    button.className = 'cell';
    button.type = 'button';
    const index = (row - 1) * SIZE + col - 1;
    button.dataset.index = index;
    button.addEventListener('click', () => {
      if (ignoreClick) {ignoreClick = false; return}
      pick(index);
    });
    buttons.push(button);
    sockets.append(button);
  }

  function neighbor(i, dx, dy) {
    const {x,y} = position(i);
    if (x + dx < 0 || x + dx >= SIZE || y + dy < 0 || y + dy >= SIZE) return null;
    return i + dx + dy * SIZE;
  }

  sockets.addEventListener('pointerdown', e => {
    keyboard = false;
    if (!e.isPrimary || e.button !== 0) return;
    ignoreClick = busy || state.status !== 'playing';
    if (ignoreClick) return;
    const cell = e.target.closest('[data-index]');
    if (!cell) return;
    const i = Number(cell.dataset.index);
    gesture = {id:e.pointerId, x:e.clientX,y:e.clientY, i, cell};
    cell.setPointerCapture(e.pointerId);
    setFocus(i);
    cell.classList.add('pressing');
  });

  sockets.addEventListener('pointerup', e => {
    if (!gesture || gesture.id !== e.pointerId) return;
    const {x,y,i,cell} = gesture;
    gesture = null;
    cell.classList.remove('pressing');
    const dx = e.clientX - x, dy = e.clientY - y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < board.clientWidth / SIZE * .32) return;
    ignoreClick = true;
    if (busy || state.status !== 'playing') return;
    const dest = Math.abs(dx) >= Math.abs(dy) ? neighbor(i,Math.sign(dx),0) : neighbor(i,0,Math.sign(dy));
    if (dest !== null) {setFocus(dest);exchange(i,dest)}
  });

  sockets.addEventListener('pointercancel', () => {
    gesture?.cell.classList.remove('pressing');
    gesture = null;
    ignoreClick = true;
  });

  document.addEventListener('keydown', e => {
    const onBoard = board.contains(document.activeElement) || document.activeElement === document.body;
    if (!onBoard || e.metaKey || e.ctrlKey || e.altKey) return;
    const dirs = {ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};
    if (!(e.key in dirs) && !['Enter',' ','Escape'].includes(e.key)) return;
    e.preventDefault();
    if (busy || state.status !== 'playing') return;
    keyboard = true;
    if (e.key in dirs) {
      const dest = neighbor(focused,...dirs[e.key]);
      setFocus(dest === null ? focused : dest);
    } else if (e.key === 'Escape') {
      selected = -1; pair = [];get('status').textContent = keyboardHelp;controls();
    } else if (!e.repeat) {
      pick(focused);
    }
  });

  get('sound').addEventListener('click', async () => {
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) {
      get('status').textContent = '当前浏览器不支持音效。';
      return;
    }
    soundOn = !soundOn;
    get('sound').setAttribute('aria-pressed',String(soundOn));
    get('sound').title = soundOn ? '关闭音效' : '开启音效';
    if (soundOn) {
      try {
        audio ??= new Audio();
        await audio.resume();
        chime(1050,820,.095,.045);
      } catch {
        soundOn = false;
        get('sound').setAttribute('aria-pressed','false');
        get('sound').title = '开启音效';
        get('status').textContent = '音效暂不可用。';
      }
    }
  });
  get('hint').addEventListener('click', () => {
    if (busy || state.status !== 'playing') return;
    const hint = game.hint();
    if (!hint) return;
    selected = -1;
    pair = [hint.a,hint.b];
    const a = position(hint.a), b = position(hint.b);
    get('status').textContent = `交换第${a.y+1}行${a.x+1}列与第${b.y+1}行${b.x+1}列。`;
    setFocus(hint.a);
  });
  get('retry').addEventListener('click', () => restart(state.level));
  get('next').addEventListener('click', () => restart(state.status === 'won' ? (state.level + 1) % state.levelCount : state.level));
  finish(state);
})();

/* Shared, deterministic rules for the candy match game. No DOM dependencies. */
(function (root) {
  'use strict';

  const SIZE = 7;
  const TYPES = ['莓心', '香橙', '柠檬糖', '薄荷叶', '星星糖', '贝壳糖'];
  const LEVELS = [
    {title:'莓果开张', seed:57021, moves:13, goals:[[0,8],[1,6]]},
    {title:'薄荷午后', seed:41078, moves:15, goals:[[3,9],[4,8]]},
    {title:'星光礼盒', seed:88039, moves:17, goals:[[2,8],[5,8],[0,6]]}
  ];

  function random(seed) {
    return () => {
      seed = (Math.imul(1664525, seed) + 1013904223) >>> 0;
      return seed / 4294967296;
    };
  }

  function shuffled(items, roll) {
    const result = items.slice();
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(roll() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function matching(board) {
    const marked = new Set();
    for (let row = 0; row < SIZE; row++) {
      for (let col = 0; col < SIZE; col++) {
        const index = row * SIZE + col;
        if (!board[index]) continue;
        const type = board[index].type;
        if (col === 0 || board[index - 1]?.type !== type) {
          let x = col + 1;
          while (x < SIZE && board[row * SIZE + x]?.type === type) x++;
          if (x - col >= 3) {
            for (let c = col; c < x; c++) marked.add(row * SIZE + c);
          }
        }
        if (row === 0 || board[index - SIZE]?.type !== type) {
          let y = row + 1;
          while (y < SIZE && board[y * SIZE + col]?.type === type) y++;
          if (y - row >= 3) {
            for (let r = row; r < y; r++) marked.add(r * SIZE + col);
          }
        }
      }
    }
    return Array.from(marked).sort((a,b) => a - b);
  }

  function exchange(board,a,b) { [board[a],board[b]] = [board[b],board[a]]; }

  function adjacent(a,b) {
    if (!Number.isInteger(a) || !Number.isInteger(b) || a < 0 || b < 0 || a >= SIZE*SIZE || b >= SIZE*SIZE) return false;
    return Math.abs(Math.floor(a/SIZE)-Math.floor(b/SIZE)) + Math.abs(a%SIZE-b%SIZE) === 1;
  }

  function legal(board, goals = []) {
    const moves = [];
    for (let a = 0; a < board.length; a++) {
      const neighbors = [];
      if (a%SIZE < SIZE-1) neighbors.push(a+1);
      if (a+SIZE < board.length) neighbors.push(a+SIZE);
      for (const b of neighbors) {
        if (!board[a] || !board[b] || board[a].type === board[b].type) continue;
        exchange(board,a,b);
        const indices = matching(board);
        if (indices.length) {
          const counts = Array(TYPES.length).fill(0);
          for (const i of indices) counts[board[i].type]++;
          const collected = goals.reduce((sum,g) => sum + Math.min(Math.max(0,g.target-g.collected), counts[g.type]),0);
          moves.push({a,b,indices,priority:collected*10+indices.length});
        }
        exchange(board,a,b);
      }
    }
    return moves.sort((a,b) => b.priority-a.priority || a.a-b.a || a.b-b.b);
  }

  class Game {
    constructor(level = 0) { this.reset(level); }

    reset(level = this.level) {
      if (!Number.isInteger(level) || !LEVELS[level]) throw new RangeError('Unknown candy level');
      const def = LEVELS[level];
      this.level = level;
      this.roll = random(def.seed);
      this.nextId = 1;
      this.bag = [];
      this.movesLeft = def.moves;
      this.score = 0;
      this.status = 'playing';
      this.goals = def.goals.map(([type,target]) => ({type,target,collected:0}));
      this.board = this.makeBoard();
      return this.getState();
    }

    makeBoard() {
      // A balanced 49-cell board uses eight of each sweet and one rotating extra.
      for (;;) {
        const board = [];
        const counts = Array(TYPES.length).fill(8);
        counts[this.level % TYPES.length]++;
        for (let i=0; i<SIZE*SIZE; i++) {
          const choices = shuffled([0,1,2,3,4,5],this.roll).filter(type =>
            counts[type] > 0 &&
            !(i%SIZE >= 2 && board[i-1].type === type && board[i-2].type === type) &&
            !(i >= 2*SIZE && board[i-SIZE].type === type && board[i-2*SIZE].type === type));
          // Place abundant types earlier to avoid stranding the last type.
          choices.sort((a,b) => counts[b] - counts[a]);
          if (!choices.length) break;
          const type = choices[0];
          counts[type]--;
          board.push({id:this.nextId++, type});
        }
        if (board.length === SIZE*SIZE && legal(board).length) return board;
      }
    }

    getState() {
      const def = LEVELS[this.level];
      return {level:this.level,levelCount:LEVELS.length,title:def.title,size:SIZE,
        board:this.board.map(tile => tile && {...tile}),movesLeft:this.movesLeft,
        goals:this.goals.map(g => ({...g})),score:this.score,status:this.status};
    }

    findMoves() { return this.status === 'playing' ? legal(this.board,this.goals) : []; }
    hint() { return this.findMoves()[0] || null; }

    draw() {
      if (!this.bag.length) this.bag = shuffled([0,1,2,3,4,5],this.roll);
      return {id:this.nextId++,type:this.bag.pop()};
    }

    fill() {
      const movements = [];
      for (let c=0; c<SIZE; c++) {
        let dest = SIZE-1;
        for (let r=SIZE-1; r>=0; r--) {
          const from = r*SIZE+c;
          const tile = this.board[from];
          if (!tile) continue;
          const to = dest*SIZE+c;
          if (from !== to) {
            this.board[to] = tile;
            this.board[from] = null;
            movements.push({...tile,from,to});
          }
          dest--;
        }
        const holes = dest+1;
        for (let r=dest; r>=0; r--) {
          const to = r*SIZE+c;
          const tile = this.draw();
          this.board[to] = tile;
          movements.push({...tile,from:(r-holes)*SIZE+c,to});
        }
      }
      return movements;
    }

    recover() {
      for (let attempt=0; attempt<160; attempt++) {
        const candidate = shuffled(this.board,this.roll);
        if (!matching(candidate).length && legal(candidate).length) {
          this.board = candidate;
          return;
        }
      }
      this.board = this.makeBoard();
    }

    swap(a,b) {
      const events = [];
      const finish = (valid,reason) => ({valid,reason,events,state:this.getState()});
      const record = (kind,details) => events.push({kind,...details,state:this.getState()});
      if (this.status !== 'playing') return finish(false,'finished');
      if (!adjacent(a,b)) return finish(false,'nonadjacent');
      exchange(this.board,a,b);
      let indices = matching(this.board);
      if (indices.length) this.movesLeft--;
      record('swap',{a,b});
      if (!indices.length) {
        exchange(this.board,a,b);
        record('revert',{a,b});
        return finish(false,'no-match');
      }
      let chain = 0;
      while (indices.length) {
        chain++;
        const tiles = indices.map(index => ({...this.board[index],index}));
        for (const tile of tiles) {
          const goal = this.goals.find(g => g.type === tile.type);
          if (goal) goal.collected = Math.min(goal.target,goal.collected+1);
          this.board[tile.index] = null;
        }
        this.score += chain*10*tiles.length;
        record('clear',{indices,tiles,chain});
        const movements = this.fill();
        record('fall',{movements,chain});
        indices = matching(this.board);
      }
      if (this.goals.every(g => g.collected >= g.target)) this.status = 'won';
      else if (!this.movesLeft) this.status = 'lost';
      else if (!legal(this.board).length) {
        this.recover();
        record('shuffle',{});
      }
      return finish(true,'matched');
    }
  }

  const api = {Game, SIZE, TYPES, LEVELS, adjacent};
  root.CandyMatch = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof globalThis === 'undefined' ? window : globalThis);

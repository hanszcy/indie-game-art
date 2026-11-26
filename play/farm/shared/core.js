export function random(seed = 26011) {
  return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t ^= t + Math.imul(t ^ t >>> 7, 61 | t); return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}

export const LEVELS = [
  ['#######','#     #','#  .  #','#  $  #','#  @  #','#     #','#######'],
  ['#######','#     #','# . . #','# $ $ #','#  @  #','#     #','#######'],
  ['#######','#  .  #','#  $  #','# # # #','# $@. #','#     #','#######'],
  ['########','#      #','# . .  #','# $$   #','#  #   #','#  @   #','#      #','########'],
  ['########','#   .  #','# $    #','#  # . #','# $ $  #','# . @  #','#      #','########'],
];

export class Sokoban {
  constructor(level = 0) { this.level = level % LEVELS.length; const rows = LEVELS[this.level]; this.w = rows[0].length; this.h = rows.length; this.walls = new Set(); this.goals = new Set(); this.boxes = new Set(); this.history = []; this.steps = 0; this.pushes = 0;
    rows.forEach((row,y)=>[...row].forEach((c,x)=>{ const i=y*this.w+x; if(c==='#')this.walls.add(i); if(c==='.')this.goals.add(i); if(c==='$')this.boxes.add(i); if(c==='@')this.player=i; }));
  }
  get won() { return [...this.goals].every(i=>this.boxes.has(i)); }
  move(dx,dy) {
    if(this.won)return {moved:false};
    const x=this.player%this.w+dx, y=Math.floor(this.player/this.w)+dy;
    if(x<0||x>=this.w||y<0||y>=this.h)return {moved:false};
    const next=y*this.w+x, beyond=next+dx+dy*this.w;
    if(this.walls.has(next)||(this.boxes.has(next)&&(this.walls.has(beyond)||this.boxes.has(beyond))))return {moved:false};
    this.history.push({player:this.player,boxes:new Set(this.boxes),steps:this.steps,pushes:this.pushes});
    const pushed=this.boxes.has(next); if(pushed){this.boxes.delete(next);this.boxes.add(beyond);this.pushes++;}
    this.player=next;this.steps++;return {moved:true,pushed,landed:pushed&&this.goals.has(beyond),at:beyond};
  }
  undo(){const s=this.history.pop();if(s){Object.assign(this,s);return true;}return false;}
}

export class Match3 {
  constructor(seed=43){this.rng=random(seed);this.score=0;this.moves=24;this.target=1800;this.board=[];this.generate();}
  generate(){
    do { this.board=[];for(let i=0;i<49;i++){let c; do{c=Math.floor(this.rng()*5);}while((i%7>=2&&this.board[i-1]===c&&this.board[i-2]===c)||(i>=14&&this.board[i-7]===c&&this.board[i-14]===c));this.board.push(c);} }while(!this.findMove());
  }
  matches(board=this.board){const out=new Set();for(let y=0;y<7;y++)for(let x=0;x<7;x++){const i=y*7+x,c=board[i];if(c<0)continue;if(x<5&&board[i+1]===c&&board[i+2]===c){out.add(i);out.add(i+1);out.add(i+2);}if(y<5&&board[i+7]===c&&board[i+14]===c){out.add(i);out.add(i+7);out.add(i+14);}}return [...out];}
  adjacent(a,b){return Number.isInteger(a)&&Number.isInteger(b)&&a>=0&&b>=0&&a<49&&b<49&&Math.abs(a%7-b%7)+Math.abs(Math.floor(a/7)-Math.floor(b/7))===1;}
  findMove(){for(let a=0;a<49;a++)for(const b of [a+1,a+7]){if(!this.adjacent(a,b))continue;const board=[...this.board];[board[a],board[b]]=[board[b],board[a]];if(this.matches(board).length)return [a,b];}return null;}
  get won(){return this.score>=this.target;}
  get over(){return this.won||this.moves<=0;}
  swap(a,b){
    if(this.over||!this.adjacent(a,b))return {valid:false};
    [this.board[a],this.board[b]]=[this.board[b],this.board[a]];
    if(!this.matches().length){[this.board[a],this.board[b]]=[this.board[b],this.board[a]];return {valid:false};}
    this.moves--;const waves=[];let removed=this.matches(),combo=0;
    while(removed.length){combo++;const before=[...this.board],points=removed.length*20*combo;this.score+=points;removed.forEach(i=>this.board[i]=-1);
      for(let x=0;x<7;x++){const column=[];for(let y=6;y>=0;y--)if(this.board[y*7+x]>=0)column.push(this.board[y*7+x]);for(let y=6;y>=0;y--)this.board[y*7+x]=column[6-y]??Math.floor(this.rng()*5);}
      waves.push({before,removed,after:[...this.board],points,combo});removed=this.matches();
    }
    let shuffled=false;if(!this.over&&!this.findMove()){this.generate();shuffled=true;}return {valid:true,waves,shuffled};
  }
}

export function slope(x){return 304+Math.sin(x/240)*22+Math.sin(x/93)*8;}
export class Ski {
  constructor(seed=2026){this.rng=random(seed);this.x=0;this.y=slope(0);this.vy=0;this.speed=165;this.distance=0;this.coins=0;this.jumps=0;this.combo=0;this.airtime=0;this.grounded=true;this.started=false;this.over=false;this.won=false;this.objects=[];this.spawnX=380;this.flash=0;this.reason='';this.populate();}
  populate(){while(this.spawnX<this.x+1000){const type=this.rng()<.45?'rock':'tree';this.objects.push({x:this.spawnX,type,hit:false});for(let i=0;i<3;i++)this.objects.push({x:this.spawnX-90+i*32,type:'coin',height:65+Math.sin(i/2*Math.PI)*23,hit:false});this.spawnX+=280+this.rng()*140;}}
  jump(){if(!this.started||this.over||!this.grounded)return false;this.vy=-380;this.grounded=false;this.jumps++;this.airtime=0;return true;}
  update(dt){if(!this.started||this.over)return [];dt=Math.min(dt,.04);const events=[];this.speed=Math.min(275,165+this.x/180);this.x+=this.speed*dt;this.distance=Math.floor(this.x/10);this.flash=Math.max(0,this.flash-dt);const ground=slope(this.x);
    if(!this.grounded){this.vy+=920*dt;this.y+=this.vy*dt;this.airtime+=dt;if(this.y>=ground){this.y=ground;this.vy=0;this.grounded=true;events.push({type:'land'});}}else this.y=ground;
    this.populate();for(const o of this.objects){if(o.hit)continue;const delta=Math.abs(o.x-this.x);if(o.type==='coin'){if(delta<24&&Math.abs(this.y-20-(slope(o.x)-o.height))<30){o.hit=true;this.coins++;events.push({type:'coin'});}}else if(delta<(o.type==='tree'?17:20)&&this.y>slope(o.x)-(o.type==='tree'?49:28)){this.over=true;this.reason=o.type==='tree'?'撞到松树了':'碰到岩石了';events.push({type:'crash'});break;}}
    this.objects=this.objects.filter(o=>o.x>this.x-180);if(!this.over&&this.distance>=1000){this.won=true;this.over=true;events.push({type:'win'});}return events;
  }
}

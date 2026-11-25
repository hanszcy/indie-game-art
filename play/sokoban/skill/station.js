import { createGame } from '../engine.js';
import { drawSurface } from './surface.js';

const game = createGame();
const board = document.querySelector('#board');
const pieces = document.querySelector('#pieces');
const work = document.querySelector('.work');
const directions = {left:[-1,0],right:[1,0],up:[0,-1],down:[0,1]};
const keys = {arrowleft:'left',a:'left',arrowright:'right',d:'right',arrowup:'up',w:'up',arrowdown:'down',s:'down'};
const dirButtons = [...document.querySelectorAll('[data-dir]')];
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const times = ['23:40','23:44','23:49','23:53','23:58'];
const art = Object.fromEntries(['porter','trunk','delivered'].map(name => {
  const url = suffix => new URL('./art/'+name+suffix+'.webp',import.meta.url).href;
  const width = name === 'porter' ? 357 : 390;
  return [name,{src:url(''),set:[48,96,176].map(w=>url('-'+w)+' '+w+'w').concat(url('')+' '+width+'w').join(', ')}];
}));
const sizes = '(max-width: 720px) 44px, 86px';
const receipt = new Image();
receipt.sizes=sizes;
receipt.srcset=art.delivered.set;
receipt.src=art.delivered.src;
function setArt(img,name) {
  if(img.dataset.sprite===name) return;
  img.dataset.sprite=name;
  img.sizes=sizes;
  img.srcset=art[name].set;
  img.src=art[name].src;
}
let porter, trunks=[], facing=1;
const $ = id=>document.getElementById(id);
const two = n => String(n).padStart(2,'0');
const same = (a,b)=>a.x===b.x && a.y===b.y;

function piece(kind) {
  const root = document.createElement('div');
  root.className = 'piece '+kind;
  const shadow = document.createElement('span');
  shadow.className = 'shadow';
  const ink = document.createElement('div');
  ink.className = 'ink';
  const img = new Image();
  img.alt = '';
  img.draggable = false;
  ink.append(img);
  root.append(shadow,ink);
  pieces.append(root);
  return {root,ink,img};
}
function place(actor,p) {
  actor.root.style.setProperty('--x',p.x);
  actor.root.style.setProperty('--y',p.y);
  actor.root.style.zIndex = String(p.y*2 + (actor===porter?1:0));
}
function pose(actor,frames,duration) {
  actor.ink.getAnimations().forEach(a=>a.cancel());
  if(!reduced.matches) actor.ink.animate(frames.map(transform=>({transform})),{duration,easing:'ease-out'});
}
function stopEffects() {
  pieces.querySelectorAll('.ink').forEach(el=>el.getAnimations().forEach(a=>a.cancel()));
}
function build(state) {
  board.classList.add('snapped');
  facing=1;
  work.style.setProperty('--ratio',state.width/state.height);
  work.style.setProperty('--rows',state.height);
  board.style.setProperty('--columns',state.width);
  drawSurface($('surface'),state);
  pieces.replaceChildren();
  trunks=state.crates.map(()=>piece('crate'));
  porter=piece('porter');
  setArt(porter.img,'porter');
  update(state);
  board.getBoundingClientRect();
  board.classList.remove('snapped');
}
function update(s) {
  place(porter,s.player);
  porter.root.style.setProperty('--facing',facing);
  s.crates.forEach((p,i)=>{
    const actor=trunks[i], landed=s.targets.some(t=>same(p,t));
    setArt(actor.img,landed?'delivered':'trunk');
    actor.root.dataset.delivered=String(landed);
    place(actor,p);
  });
  $('level').textContent=two(s.level+1);
  $('level-name').textContent=s.name;
  $('departure').textContent=times[s.level];
  $('moves').textContent=two(s.moves);
  $('pushes').textContent=two(s.pushes);
  $('arrived').textContent=s.onTargets+'/'+s.crates.length;
  $('progress').textContent=two(s.level+1)+' / '+two(s.levelCount);
  $('undo-btn').disabled=!s.canUndo;
  $('dispatch').hidden=!s.solved;
  const final=s.level===s.levelCount-1;
  $('next').firstChild.textContent = final?'重新值班 ':'下一站台 ';
  $('dispatch-label').textContent=final?'五台装毕 · 末班发车':'本台装齐';
  Object.assign(document.documentElement.dataset,{level:s.level+1,moves:s.moves,pushes:s.pushes,onTargets:s.onTargets,solved:s.solved});
  board.dataset.player=s.player.x+','+s.player.y;
  board.dataset.crates=s.crates.map(p=>p.x+','+p.y).join('|');
}
function speak(message){$('feedback').textContent=message}
function move(dir) {
  const before=game.getState();
  if(before.solved) return;
  const [dx,dy]=directions[dir];
  if(dx) facing=dx;
  const key=dirButtons.find(b=>b.dataset.dir===dir);
  key.classList.add('pressed');
  clearTimeout(key.pressTimer);
  key.pressTimer=setTimeout(()=>key.classList.remove('pressed'),100);
  if(!game.move(dir)){
    porter.root.style.setProperty('--facing',facing);
    pose(porter,['none',`translate(${dx*4}%,${dy*3}%) rotate(${dx*2.8}deg)`,'none'],180);
    speak('前方受阻');
    return;
  }
  const after=game.getState();
  const pushed=after.pushes>before.pushes;
  update(after);
  if(pushed){
    pose(porter,['none',`translate(${dx*8}%,${dy*5}%) rotate(${dx*3}deg)`,'none'],190);
    const idx=before.crates.findIndex((p,i)=>!same(p,after.crates[i]));
    pose(trunks[idx],['none',`rotate(${dx*1.5}deg) translateY(-1.4%)`,'none'],210);
    if(after.onTargets>before.onTargets) speak(after.solved?'本台全部到位':'行李到位');
    else speak('推进行李');
  }else{
    pose(porter,['none','translateY(-2.5%)','none'],125);
    speak('移动至第'+after.player.y+'行，第'+after.player.x+'列');
  }
}
function undo(){
  if(!game.undo()) return;
  stopEffects();
  update(game.getState());
  speak('已撤销一步');
}
function restart(){
  game.restart();
  build(game.getState());
  speak('本台重新开始');
}
function next(){
  const s=game.getState();
  if(!s.solved) return;
  if(s.level===s.levelCount-1) game.load(0);
  else game.next();
  build(game.getState());
  speak('进入'+game.getState().name);
  board.focus({preventScroll:true});
}
dirButtons.forEach(b=>b.addEventListener('click',()=>move(b.dataset.dir)));
$('undo-btn').addEventListener('click',undo);
$('restart-btn').addEventListener('click',restart);
$('next').addEventListener('click',next);
window.addEventListener('keydown',e=>{
  if(e.metaKey || e.ctrlKey || e.altKey) return;
  const key=e.key.toLowerCase();
  if(keys[key]) {e.preventDefault();move(keys[key]);return}
  if(key==='z'||key==='u'||key==='backspace'){e.preventDefault();undo()}
  else if(key==='r'){e.preventDefault();restart()}
  else if(key==='n'||(key==='enter' && e.target.tagName!=='BUTTON')){if(game.getState().solved){e.preventDefault();next()}}
});
let gesture;
board.addEventListener('pointerdown',e=>{
  if(!e.isPrimary || e.button!==0)return;
  gesture={x:e.clientX,y:e.clientY,id:e.pointerId};
  board.setPointerCapture(e.pointerId);
});
board.addEventListener('pointerup',e=>{
  if(!gesture || gesture.id!==e.pointerId)return;
  const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;
  gesture=null;
  if(Math.max(Math.abs(dx),Math.abs(dy))<15)return;
  move(Math.abs(dx)>Math.abs(dy)?(dx>0?'right':'left'):(dy>0?'down':'up'));
});
board.addEventListener('pointercancel',()=>{gesture=null});
build(game.getState());

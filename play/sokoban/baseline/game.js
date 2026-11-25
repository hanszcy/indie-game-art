import { createGame } from '../engine.js';
import { paint } from './art.js';

const game = createGame();
const $ = id => document.getElementById(id);
const canvas = $('board'), guide = $('guide');
const read = {up:'上',down:'下',left:'左',right:'右'};
let facing = 'down';
let frame = 0;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');

function draw(state, previous) {
  cancelAnimationFrame(frame);
  canvas.style.aspectRatio = state.width + ' / ' + state.height;
  if (!previous || reduced.matches) {
    paint(canvas,state,facing,null,1);
    return;
  }
  const start = performance.now();
  function animate(now) {
    const t = Math.min(1, (now-start)/105);
    paint(canvas,state,facing,previous,1 - (1-t)**2);
    if (t<1) frame=requestAnimationFrame(animate);
  }
  frame=requestAnimationFrame(animate);
}
function render(previous) {
  const s = game.getState(), last = s.level === s.levelCount-1;
  $('level-number').textContent = '第 ' + String(s.level+1).padStart(2,'0') + ' 关 / 共 ' + String(s.levelCount).padStart(2,'0') + ' 关';
  $('level-name').textContent=s.name;
  $('moves').textContent=s.moves;
  $('delivered').textContent=s.onTargets+' / '+s.crates.length;
  $('undo').disabled=!s.canUndo;
  $('task-title').textContent=s.solved?(last?'全部签收':'本关签收'):'货运任务';
  $('instruction').textContent=s.solved?('用了 '+s.moves+' 步，推动 '+s.pushes+' 次。'):'把木箱推到绿色货位。';
  $('next').hidden=!s.solved;
  $('next').textContent=last?'再玩一轮':'下一关 →';
  document.querySelector('.control-panel').classList.toggle('complete',s.solved);
  for(const button of document.querySelectorAll('[data-dir]')) button.disabled=s.solved;
  canvas.setAttribute('aria-label',s.name+'，'+s.width+' 列 '+s.height+' 行。搬运员在第 '+(s.player.x+1)+' 列，第 '+(s.player.y+1)+' 行。已归位 '+s.onTargets+' 个木箱。');
  if(s.solved) $('announce').textContent=$('task-title').textContent+'。'+$('instruction').textContent;
  draw(s,previous);
}
function move(dir) {
  const previous=game.getState();
  if(!game.move(dir)) return;
  facing=dir;
  $('announce').textContent='向'+read[dir]+'移动。';
  render(previous);
}
function undo() {
  if(!game.undo()) return;
  $('announce').textContent='已撤销一步。';
  render();
}
function restart() {
  game.restart(); facing='down';
  $('announce').textContent='已重新开始本关。';
  render();
}
$('next').addEventListener('click',()=>{
  const s=game.getState();
  if(!s.solved) return;
  if(s.level===s.levelCount-1) game.load(0);
  else game.next();
  facing='down';
  $('announce').textContent='开始'+game.getState().name+'。';
  render();
});
$('undo').addEventListener('click',undo);
$('restart').addEventListener('click',restart);
$('help').addEventListener('click',()=>guide.showModal());
guide.addEventListener('click',event=>{if(event.target===guide) {
  const b=guide.getBoundingClientRect();
  if(event.clientX<b.left || event.clientX>b.right || event.clientY<b.top || event.clientY>b.bottom) guide.close();
}});
for(const btn of document.querySelectorAll('[data-dir]')) btn.addEventListener('click',()=>move(btn.dataset.dir));
const keys={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',w:'up',s:'down',a:'left',d:'right'};
document.addEventListener('keydown',e=>{
  if(guide.open || e.altKey) return;
  const k=e.key.length===1 ? e.key.toLowerCase() : e.key;
  if(k==='z' && !e.shiftKey){e.preventDefault();undo();return;}
  if(e.ctrlKey || e.metaKey) return;
  if(k==='r'){e.preventDefault();restart();return;}
  if(Object.hasOwn(keys,k)){e.preventDefault();move(keys[k]);}
});
let drag=null;
canvas.addEventListener('pointerdown',e=>{
  if(!e.isPrimary || e.button!==0) return;
  drag={x:e.clientX,y:e.clientY,id:e.pointerId};canvas.setPointerCapture(e.pointerId);
});
canvas.addEventListener('pointerup',e=>{
  if(!drag || drag.id!==e.pointerId) return;
  const dx=e.clientX-drag.x, dy=e.clientY-drag.y;drag=null;
  if(Math.max(Math.abs(dx),Math.abs(dy))<18) return;
  move(Math.abs(dx)>Math.abs(dy)?(dx>0?'right':'left'):(dy>0?'down':'up'));
});
canvas.addEventListener('lostpointercapture',()=>{drag=null;});
canvas.addEventListener('pointercancel',()=>{drag=null;});
new ResizeObserver(()=>draw(game.getState())).observe(canvas);
render();

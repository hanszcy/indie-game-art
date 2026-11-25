import {createGame,attachGame} from '../engine.mjs';
import {createPainter} from './snow.mjs';
const by=id=>document.getElementById(id);
const stage=by('slope'),game=createGame(),trace=[],events=[];
const art=Object.fromEntries(await Promise.all(['fjord','tuck','jump','land'].map(async name=>{
 const image=new Image();image.src=new URL('./art/'+name+'.webp',import.meta.url).href;await image.decode();return [name,image];
})));
const draw=createPainter(by('landscape'),art);
for(const action of ['start','reset']){
 const resetRun=game[action];game[action]=()=>{resetRun();trace.length=events.length=0;trace.push({x:0,contact:true,rut:0});};
}
const tick=game.tick;
game.tick=()=>{
 if(game.state.mode!=='running')return;
 tick();const s=game.state;
 trace.push({x:s.x,contact:s.grounded,rut:s.recovery});if(trace.length>120)trace.shift();
 if(s.events.length)events.push(...s.events);
 while(events.length&&events[0].tick<s.tick-115)events.shift();
};
function tell(id,msg){const el=by(id);if(el.textContent!==msg)el.textContent=msg;}
function panel(mode,s){
 const intros={
  ready:['风口下山','跃过岩石，赶在雪崩前抵达山口。','出发','start'],
  paused:['停在坡上','轻点起跳，长按后空翻。','继续滑行','resume'],
  lost:['雪崩追上了',`停在 ${Math.floor(s.x)} 米处 · 收集 ${s.pickups} 枚铜铃`,'再滑一次','reset'],
  won:['抵达山口',`460 米 · ${s.pickups} 枚铜铃 · ${s.flips} 次后空翻`,'再滑一次','reset']
 };
 const visible=mode!=='running';by('panel').hidden=!visible;
 by('run').hidden=visible;by('approach').hidden=mode==='ready';by('feedback').hidden=visible;
 stage.classList.toggle('terminal',mode==='lost'||mode==='won');
 if(!visible)return;
 const [title,explain,action,key]=intros[mode];
 tell('title',title);tell('explain',explain);by('main-action').dataset.act=key;
 by('main-action').firstChild.nodeValue=action+' ';by('controls').hidden=mode!=='ready';
}
let lastMode,feedback='';
function render(s){
 draw(s,trace,events);
 if(lastMode!==s.mode){panel(s.mode,s);lastMode=s.mode;}
 tell('distance',String(Math.floor(s.x)).padStart(3,'0'));tell('bells',String(s.pickups));
 tell('gap',String(Math.ceil(s.gap)));
 by('needle').style.transform=`translateX(${Math.round(s.gap/35*81)}px)`;
 by('approach').classList.toggle('close',s.gap<=11);
 let next='';
 if(s.recovery>.01)next='失去平衡';
 else if(s.flips&&events.some(e=>e.type==='flip'&&s.tick-e.tick<58))next='后空翻落地';
 if(next!==feedback){tell('feedback',next);feedback=next;}
}
window.ski=attachGame({game,stage,render});

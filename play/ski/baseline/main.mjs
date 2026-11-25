import {createGame,attachGame,COURSE} from '../engine.mjs';
import {scene} from './scene.mjs';
const stage=document.getElementById('stage');
const el=id=>document.getElementById(id);
const paint=scene(document.querySelector('canvas'));
const game=createGame();
const ui={panel:el('panel'),live:el('live'),title:el('title'),desc:el('desc'),sub:el('sub'),primary:el('primary'),
  commands:el('commands'),pause:el('pause'),distance:el('distance'),pickups:el('pickups'),gap:el('gap'),
  notice:el('notice'),progress:document.querySelector('#progress i'),avalanche:document.querySelector('.avalanche'),
  gauge:document.querySelector('.gauge i')};
const copy={
  ready:['云杉线 · 全长 460 米','风口下山','越过岩石，收集山徽，在雪崩赶上前抵达山屋。','出发','start'],
  paused:['云杉线 · 休息中','已暂停','长按起跳可以后空翻，转完一圈即可稳稳落地。','继续滑行','resume'],
  won:['云杉线 · 终点','抵达山屋','','再次出发','reset'],
  lost:['云杉线 · 行程结束','雪崩赶上了','','再试一次','reset']
};
let previousMode;
const fine=window.matchMedia('(pointer:fine)');
function render(s){
  paint(s);
  ui.distance.textContent=Math.floor(s.x);
  ui.pickups.textContent=s.pickups;
  ui.progress.style.transform='scaleX('+s.x/COURSE.length+')';
  if(previousMode!==s.mode){
    const playing=s.mode==='running';ui.panel.hidden=playing;ui.live.hidden=!playing;ui.pause.hidden=!playing;
    if(!playing){
      const [sub,title,desc,button,action]=copy[s.mode];
      ui.sub.textContent=sub;ui.title.textContent=title;ui.desc.textContent=desc||('滑行 '+Math.floor(s.x)+' 米，收集 '+s.pickups+' 枚山徽，完成 '+s.flips+' 次空翻。');
      ui.primary.querySelector('span').textContent=button; ui.primary.dataset.act=action;
      ui.commands.hidden=s.mode!=='ready';
    }
    previousMode=s.mode;
  }
  if(s.mode==='running'){
    ui.gap.textContent=Math.round(s.gap)+' 米';
    ui.gauge.style.transform='scaleX('+Math.min(1,s.gap/35)+')';
    ui.avalanche.dataset.risk=String(s.gap<13);
    const e=s.lastEvent;
    let text='';
    if(s.recovery>0)text=e?.reason==='angle'?'落地失衡，雪崩逼近':'撞到岩石，雪崩逼近';
    else if(e&&s.tick-e.tick<48){
      if(e.type==='pickup')text='山徽 +1';
      if(e.type==='flip')text='空翻落地';
    } else if(s.x<20)text=fine.matches?'空格跳跃 · 长按空翻':'轻点跳跃 · 长按空翻';
    ui.notice.textContent=text;
  }
}
window.ski=attachGame({game,stage,render});

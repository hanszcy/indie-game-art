// Deterministic simulation shared by both independent presentations.
export const COURSE_LENGTH = 6000;
export function water(x,t=0) { return 340 + 30*Math.sin(x/175-t*.42) + 10*Math.sin(x/61-t*.22); }
export function slope(x,t=0) { return 30/175*Math.cos(x/175-t*.42) + 10/61*Math.cos(x/61-t*.22); }
export function makeCourse() {
  const items = []; let id = 0;
  for (let i = 0, x = 620; x < COURSE_LENGTH - 140; i++, x += 420 + (i % 3) * 34) {
    const type = i % 3 === 1 ? 'log' : 'reef';
    items.push({id:id++,x,type,width:type==='reef'?36:26,height:type==='reef'?24:35,hit:false});
    for(let j=0;j<3;j++) items.push({id:id++,x:x-52+j*52,type:'shell',width:18,height:48+Math.sin(j*Math.PI/2)*32,collected:false});
  }
  return items;
}
export class SurfRun {
  constructor(){this.reset();}
  reset(){Object.assign(this,{phase:'ready',x:120,y:water(120),vy:0,speed:180,grounded:true,charge:0,holding:false,health:3,shells:0,jumps:0,distance:0,time:0,invulnerable:0,landPulse:0,slow:0,reason:'',pendingJump:false,objects:makeCourse()});}
  start(){if(this.phase==='ready'){this.phase='playing';return true;}return false;}
  press(){if(this.phase==='ready')this.start();if(this.phase!=='playing'||!this.grounded)return false;this.holding=true;return true;}
  release(){if(!this.holding)return false;this.holding=false;if(this.phase!=='playing'||!this.grounded){this.charge=0;return false;}this.vy=-330-165*this.charge+slope(this.x,this.time)*this.speed;this.grounded=false;this.jumps++;this.charge=0;this.pendingJump=true;return true;}
  togglePause(){if(this.phase==='playing'){this.phase='paused';this.holding=false;this.charge=0;return true;}if(this.phase==='paused'){this.phase='playing';return true;}return false;}
  update(dt){
    if(this.phase!=='playing')return [];
    dt=Math.max(0,Math.min(.05,dt));const events=[];
    if(this.pendingJump){events.push({type:'jump'});this.pendingJump=false;}
    this.time+=dt;this.invulnerable=Math.max(0,this.invulnerable-dt);this.slow=Math.max(0,this.slow-dt);this.landPulse=Math.max(0,this.landPulse-dt*5);
    if(this.holding&&this.grounded)this.charge=Math.min(1,this.charge+dt/0.5);
    this.speed=(180+Math.min(48,this.distance*.05))*(this.slow>0?.58:1);
    const oldX=this.x;this.x=Math.min(120+COURSE_LENGTH,this.x+this.speed*dt);this.distance=Math.max(0,Math.floor((this.x-120)/7.5));
    const floor=water(this.x,this.time);
    if(this.grounded)this.y=floor;else{this.vy+=940*dt;this.y+=this.vy*dt;if(this.y>=floor&&this.vy>0){this.y=floor;this.vy=0;this.grounded=true;this.landPulse=1;events.push({type:'land',x:this.x});}}
    for(const item of this.objects){
      if(item.type==='shell'){if(!item.collected&&Math.abs(item.x-this.x)<25&&Math.abs((this.y-22)-(water(item.x,this.time)-item.height))<29){item.collected=true;this.shells++;events.push({type:'shell',x:item.x});}}
      else if(!item.hit&&this.invulnerable<=0&&oldX-12<=item.x+item.width/2&&this.x+12>=item.x-item.width/2&&this.y>water(item.x,this.time)-item.height-4){item.hit=true;this.health--;this.invulnerable=1.6;this.slow=.85;this.holding=false;this.charge=0;events.push({type:'hit',x:item.x});if(this.health<=0){this.phase='lost';this.reason=item.type==='reef'?'撞到了礁石':'碰到了漂木';events.push({type:'lose'});break;}}
    }
    if(this.phase==='playing'&&this.x>=120+COURSE_LENGTH){this.phase='won';this.holding=false;events.push({type:'win'});}
    return events;
  }
}

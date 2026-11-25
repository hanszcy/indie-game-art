import {groundY,slopeAt,COURSE} from '../engine.mjs';

const TAU=2*Math.PI;
const paths=new Map();
function path(data){if(!paths.has(data)) paths.set(data,new Path2D(data));return paths.get(data);}
function paint(c,data,color){c.fillStyle=color;c.fill(path(data));}
function stroke(c,data,color,width=1){c.strokeStyle=color;c.lineWidth=width;c.stroke(path(data));}
function polygon(c,p,color){c.fillStyle=color;c.beginPath();c.moveTo(p[0],p[1]);for(let j=2;j<p.length;j+=2)c.lineTo(p[j],p[j+1]);c.closePath();c.fill();}
function rand(n,k=0){const v=Math.sin(n*127.1+k*311.7)*43758.5453;return v-Math.floor(v);}
function clamp(n,a,b){return Math.max(a,Math.min(b,n));}
function band(c,top,bottom,color,w=390){c.beginPath();for(let x=-8;x<=w+8;x+=4){const y=top(x);if(x===-8)c.moveTo(x,y);else c.lineTo(x,y);}for(let x=w+8;x>=-8;x-=4)c.lineTo(x,typeof bottom==='function'?bottom(x):bottom);c.closePath();c.fillStyle=color;c.fill();}
function ridge(x){return 10*Math.sin(x*.042)+8*Math.sin(x*.017+.7)+4*Math.sin(x*.11);}
function tree(c,x,y,h,color,seed){
 c.save();c.translate(x,y);c.scale(h/22,h/22);c.fillStyle=color;
 c.beginPath();c.moveTo(-.35,0);c.lineTo(-.45,-3);
 for(let i=0;i<5;i++){let yy=-3-i*3.4;let b=5.5-i*.94;c.lineTo(-b,yy+rand(seed,i));c.lineTo(-b*.33,yy-3.8);}
 c.lineTo(.5,-22);
 for(let i=4;i>=0;i--){let yy=-3-i*3.4;let b=5.6-i*.94;c.lineTo(b*.28,yy-3.6);c.lineTo(b*.90,yy-1);c.lineTo(b,yy+.55);}
 c.lineTo(.48,-3);c.lineTo(.4,0);c.closePath();c.fill();c.restore();
}
function backdrop(c,s,h,im,ground){
 const bottom=h*.575+6, bh=bottom+6,bw=bh*im.naturalWidth/im.naturalHeight;
 const left=-(bw-390)*.79-s.x*.135+22;
 c.fillStyle='#132c50';c.fillRect(0,0,390,h);
 c.drawImage(im,left,-1,bw,bh+2);
 const haze=c.createLinearGradient(0,bottom-85,0,bottom+5);haze.addColorStop(0,'#527faf00');haze.addColorStop(1,'#6287b875');c.fillStyle=haze;c.fillRect(0,bottom-85,390,90);
 const p=s.x*.72;
 const far=x=>h*.528+16+.058*(x-190)+ridge(x*.66+p)*.71;
 band(c,far,h,'#334e74');
 // Alpine shelter on the opposite shore, with two warm windows at twilight.
 const cabinX=292-s.x*.73;
 if(cabinX>-22){let y=far(cabinX);c.save();c.translate(cabinX,y);paint(c,'M-15 0V-7L-9-13L9-12L16-6V1Z','#294061');paint(c,'M-18-6L-10-14L11-13L17-6L10-8L-8-9Z','#a9cad6');c.fillStyle='#e4c387';c.fillRect(-6,-6,2.5,3);c.fillRect(3,-5,2,2.5);c.restore();}
 const p2=s.x*2.1;
 const ledge=x=>h*.552+16+.07*(x-160)+ridge(x+p2)*.69;
 band(c,ledge,h,'#244565');
 const first=Math.floor(p2/3.9)-6;
 for(let j=first;j<first+116;j++){const x=j*3.9-p2+rand(j,1)*3.6;const thick=.65+.35*Math.sin(j*.15);tree(c,x,ledge(x)+1,(7+rand(j,1)*10)*thick,'#29496b',j);}
 const p3=s.x*3.5;
 const hill=x=>h*.590+14+14*Math.sin((x+p3)*.0108)+ridge((x+p3)*.7)*.4;
 band(c,hill,h,'#1d3c59');
 const nearStart=Math.floor(p3/7.1)-4;
 for(let j=nearStart;j<nearStart+64;j++){const x=j*7.1-p3+rand(j,4)*7;const g=Math.pow(.5+.5*Math.sin(j*.187+1.5),1.9);tree(c,x,hill(x)+1,(8+rand(j,3)*22)*g+3,'#193650',j);}
 // A shaded drift forms the far bank of the skiable ridge.
 const near=x=>ground(x)-9-8*Math.sin((x+s.x*6)*.016);
 band(c,near,h,'#6286a5');band(c,near,x=>near(x)+2,'#93b6c8');
}

function plume(c,s,px,y,h,reduce,front=false){
 const urgency=1-clamp(s.gap/32,0,1);
 const x=front?px+20:px-73+81*urgency;
 const size=(.81+.37*urgency)*(h<480?.78:1);
 const t=reduce?0:s.time;
 c.save();c.translate(x,y+(front?0:-21));c.scale(size,size);
 const puff=reduce?0:Math.sin(t*2.8)*1.5;
 c.translate(0,puff);
 // A breaking crown, an advancing tongue and lee-side folds make one avalanche front.
 paint(c,'M-230 53V-172Q-192-177-172-143Q-148-146-129-117Q-106-123-94-105Q-70-113-59-90Q-38-91-31-73Q-6-72 0-52Q25-46 24-28Q43-18 46-2L74 27L89 48Z','#7c9db5');
 paint(c,'M-202-153Q-179-166-161-139L-166-146Q-138-145-125-112Q-106-121-95-100Q-117-112-123-96Q-141-120-153-109L-174-126Z','#d6e7e7');
 paint(c,'M-127-106Q-111-123-93-102Q-89-99-87-94Q-70-105-58-88Q-47-92-39-77Q-56-84-62-72Q-69-90-84-82Q-96-99-112-91Z','#c9dfe4');
 c.save();c.translate(Math.sin(t*2.3)*1.7,Math.sin(t*1.95+.7)*1.1);
 paint(c,'M-83-80Q-69-96-55-81Q-49-72-50-65Q-46-78-35-75Q-18-77-12-56Q0-61 12-46Q17-38 16-31Q29-32 34-18Q30-23 21-22Q31-15 25-5Q17-26 3-18Q4-42-12-40Q-7-27-21-22Q-19-47-36-47Q-33-59-45-59Q-52-49-68-55Z','#c0d9e0');
 paint(c,'M-52-62Q-40-77-27-66Q-18-62-17-52Q-30-64-40-57Q-37-47-48-43Q-46-54-52-62ZM-7-46Q5-53 13-37Q4-42 0-35Z','#e3eeeb');
 c.restore();c.save();c.translate(Math.sin(t*2.6+.8)*2,Math.sin(t*1.8+.5)*.97);
 paint(c,'M-93-49Q-76-69-58-48Q-47-59-31-42Q-17-48-5-26Q12-32 17-13Q37-13 53 15Q59 26 80 38L87 49H-160Z','#a5c2d1');
 paint(c,'M-74-46Q-56-55-44-34Q-28-45-17-26Q-3-28 3-15Q-20-29-31-18Q-42-34-55-23Q-54-38-74-46ZM15-12Q30-12 47 13Q31 2 18 1Z','#d0e0e2');
 paint(c,'M-55-13Q-41-27-23-9Q-6-21 7-2Q26-9 39 9Q54 10 65 28L91 49H-125Z','#c6dce1');
 paint(c,'M-45-6Q-21-17-14 0Q-2-12 11 1Q18 5 21 13Q28 6 43 19Q49 22 54 28Q32 16 23 22Q11 9-4 13Q-17-1-36 6Z','#e1ebea');
 // Wind breaks flakes and thin sheets off the leading edge of the powder cloud.
 paint(c,'M-9-60L3-60L16-56L6-57ZM19-37L35-33L43-28L28-32Z','#d7e8e8');
 paint(c,'M-58-86L-42-87L-25-81L-39-84ZM10-49L21-49L29-45L18-47Z','#bdcfd8');
 c.restore();
 if(!reduce){for(let i=0;i<35;i++){const v=(t*(.37+rand(i,3)*.6)+rand(i,1))%1;const xx=-100+rand(i,8)*157+v*28, yy=-101+(xx+98)*.59-11*Math.sin(v*Math.PI)-rand(i,5)*15;c.globalAlpha=Math.sin(v*Math.PI)*.68;const r=.9+rand(i,2)*2;polygon(c,[xx-r,yy,xx+2*r,yy+r*.3,xx+r,yy+r,xx-r,yy+r*.6],'#d5e5e9');}}
 c.restore();
}

function windMark(c,x,y,len,deep,tint){
 c.save();c.translate(x,y);c.scale(len/100,deep);
 paint(c,'M0 0C17 -1 26 -5 42 -5C62 -5 79 -1 100 -3C84 0 70 0 57 -1C39 -4 23 -1 0 0Z',tint);c.restore();
}
function field(c,s,h,ground,unit,px){
 const snow=c.createLinearGradient(0,h*.54,0,h);snow.addColorStop(0,'#e6eeec');snow.addColorStop(.18,'#c4dce5');snow.addColorStop(.54,'#a8c8dd');snow.addColorStop(1,'#748faf');
 band(c,ground,h+10,snow);
 // Long, asymmetric sastrugi are fixed to world coordinates; their sheltered faces are blue.
 for(let lane=0;lane<7;lane++){
  const step=lane<3?58:86, k=unit*s.x*(1+lane*.055), start=Math.floor(k/step)-3;
  for(let j=start;j<start+Math.ceil(630/step)+3;j++){
   const x=j*step-k+rand(j,lane+3)*step*.82;
   const depth=7+lane*lane*3.8+rand(j,lane+9)*(8+lane*2), y=ground(x)+depth;
   const len=(22+rand(j,lane+23)*55)*(1+lane*.16),d=.23+lane*.12;
   c.save();c.translate(x,y);c.rotate(.8*Math.atan(slopeAt(s.x+(x-px)/unit)));
   windMark(c,0,0,len,d,['#b0cedb','#a6c7d8','#a1c0d3','#98bbd0','#88aac2','#779cb9','#7394b1'][lane]);
   if(rand(j,lane+23)>.34)windMark(c,len*.18,-1,len*.7,d*.6,'#d4e5e8');
   if(lane>0&&rand(j,lane+11)>.69){
    const hollow=1+lane*.46;
    polygon(c,[len*.1,0,len*.29,-1.6*hollow,len*.45,-2.1*hollow,len*.68,-.6*hollow,len*.91,.15*hollow,len*.59,.5*hollow,len*.36,-.25*hollow],lane<4?'#a8c5d5':'#8aa9be');
    polygon(c,[len*.04,.2*hollow,len*.28,-1.9*hollow,len*.45,-2.1*hollow,len*.32,-1.25*hollow], '#d5e4e8');
   }
   c.restore();
  }
 }
 // A foreground wind lip. Broad overlaps describe the steep slope below the skier.
 const edge=x=>ground(x)+Math.min(h*.18,139)+16*Math.sin((x+s.x*unit*1.19)*.0087)+8*Math.sin((x+s.x*unit*1.19)*.022);
 const lower=c.createLinearGradient(0,h*.75,0,h);lower.addColorStop(0,'#86a9c3');lower.addColorStop(.7,'#577c9c');lower.addColorStop(1,'#355774');
 band(c,edge,h+10,lower);
 // The lip breaks off in blue facets. Fissures narrow into the lee face.
 const drift=s.x*unit*1.19, slab=Math.floor(drift/148)-2;
 for(let j=slab;j<slab+7;j++){
  const x=j*148-drift+rand(j,12)*45, len=74+rand(j,4)*69;
  const top=dx=>edge(x+dx);
  const fall=7+rand(j,27)*15;
  polygon(c,[x,top(0),x+len*.34,top(len*.34),x+len*.65,top(len*.65),x+len,top(len),
   x+len*.71,top(len*.71)+fall*.22,x+len*.53,top(len*.53)+fall,x+len*.29,top(len*.29)+fall*.46],'#86a7bf');
  polygon(c,[x+len*.34,top(len*.34),x+len*.65,top(len*.65),x+len*.53,top(len*.53)+fall],'#a3bfd0');
  c.beginPath();c.moveTo(x+len*.65,top(len*.65)+1);c.lineTo(x+len*.55,top(len*.55)+fall*.73);c.lineTo(x+len*.51,top(len*.51)+fall*.86);c.strokeStyle='#7599b3';c.lineWidth=.85;c.stroke();
 }
 band(c,x=>edge(x)-1.6,x=>edge(x)+1.15,'#ccdde4');
 const shelfDrift=s.x*unit*1.38, firstShelf=Math.floor(shelfDrift/528)-1;
 for(let j=firstShelf;j<=firstShelf+2;j++){
  const x=j*528+147+rand(j,44)*53-shelfDrift;
  if(x< -155||x>400)continue;
  const y=edge(x)+28+rand(j,25)*17;
  c.save();c.translate(x,y);c.scale(.79+rand(j,87)*.35,.82+rand(j,72)*.4);c.rotate(.09);
  // Half-buried bedding on the foreground side of the cornice.
  paint(c,'M-8 12L5 6L23 5L35-1L53-3L65-7L78-6L93-13L105-10L117-5L129-4L120-1L98 0L88 5L74 6L57 10L41 9L28 13L6 15Z','#7f9bb0');
  paint(c,'M22 9L40 0L61-4L50 3L40 5L37 8ZM66 0L77-3L92-11L101-10L93-4L85-1ZM88 3L103-3L115-4L109 0Z','#617f97');
  paint(c,'M-10 12L5 6L22 5L34-2L51-4L66-9L80-8L91-14L102-13L117-6L104-7L96-10L85-5L72-4L64-5L55-1L36 2L25 8L11 8Z','#b8cdd9');
  paint(c,'M2 14L26 9L34 10L53 5L61 6L43 11L26 13L20 14ZM67 5L75 3L82 3L76 6Z','#aac1d0');
  stroke(c,'M43 3L52 0L58-3M91-2L98-5L103-6','#a5bed0',.9);
  c.restore();
 }
 const k=s.x*unit*1.19, start=Math.floor(k/87)-3;
 for(let j=start;j<start+10;j++){const x=j*87-k+rand(j,19)*32;const y=edge(x);
  c.save();c.translate(x,y);c.rotate(.12+rand(j,33)*.09);
  const len=70+rand(j,7)*70;windMark(c,4,18,len,1.45,'#7298b5');windMark(c,-25,51,len*1.23,2,'#658aa8');windMark(c,13,64,len*.55,.55,'#99b6c9');c.restore();}
 band(c,x=>ground(x)-1.5,x=>ground(x)+1.2,'#f0f5ee');
}
function bellPost(c,x,y,unit,item,removed,ringAge){
 const top=groundY(item.x)-item.height, len=unit*(groundY(item.x+1.4)-top);
 c.save();c.translate(x,y);
 // Willow wand bends downwind. The route bell comes off its small hook.
 c.strokeStyle='#483e3b';c.lineWidth=2.3;c.beginPath();c.moveTo(unit*1.45,len);c.quadraticCurveTo(unit*1.08,-20,.6,-17);c.stroke();
 c.strokeStyle='#cca477';c.lineWidth=.9;c.beginPath();c.moveTo(unit*1.45-.5,len);c.quadraticCurveTo(unit*1.12,-17,2,-16.6);c.stroke();
 stroke(c,'M1-17L-1-10Q-1-8 1-8','#d8d3aa',1);
 paint(c,'M11-12Q16-13 18-10L22-10L19-8L22-6Q17-5 12-9Z','#c76942');
 if(!removed){
  if(ringAge==null){const halo=c.createRadialGradient(0,0,0,0,0,15);halo.addColorStop(0,'#ffdc9855');halo.addColorStop(1,'#ffe39c00');c.fillStyle=halo;c.fillRect(-15,-15,30,30);}
  stroke(c,'M-2-7Q-3-12 0-12Q3-12 2-7','#ffe4a6',1.7);
  paint(c,'M-7 5C-3 0-6-7-1-8Q4-10 5-4L6 1L9 4L8 6L-7 7Z','#483f3b');
  paint(c,'M-6 4Q-3 1-3-3Q-3-7 0-7Q4-7 4-2L6 3L7 4Z','#f1be5c');
  paint(c,'M-1-6Q1-7 2-5L2-2L0 1L-2 2Z','#fff0ae');
  paint(c,'M-7 5L8 4L8 6L-7 7Z','#ffdc89');
  paint(c,'M-1 7L3 7Q2 12-1 9Z','#d19750');
 }
 c.restore();
}
function rock(c,x,y,item,unit){
 const w=unit*item.width,h=unit*item.height;c.save();c.translate(x,y);c.rotate(Math.atan(slopeAt(item.x)));c.scale(w/44,h/26);
 // Schist turns in distinct broken planes; only its lip and foot carry snow.
 paint(c,'M-34 1Q-15-2-5-2L29 0L41 4L17 7L-29 4Z','#97b6c8');
 paint(c,'M-23 1L-20-6L-17-7L-15-17L-7-20L-4-25L5-26L12-19L16-18L23-3L21 2L8 5L-12 3Z','#24394e');
 paint(c,'M-22 0L-16-8L-13-16L-4-20L0-24L3-23L-5-12L-11-7L-12 2Z','#607786');
 paint(c,'M-10 0L-3-11L4-14L6-22L11-18L9-13L13-9L8-3L2 1Z','#344d5d');
 paint(c,'M10-17L15-15L21-4L17-6L15-10L11-8L13-15Z','#4d6374');
 paint(c,'M-17-11L-14-18L-8-20L-4-25L4-27L8-25L13-19L7-20L4-22L0-20L-5-19L-8-15L-12-16Z','#e2eae5');
 paint(c,'M-4-19L-1-21L4-22L5-20L0-18Z','#abc7d1');
 stroke(c,'M-14-5L-9-8L-8-11M-4 1L0-5L5-7M14-4L18-5','#8396a0',.85);
 paint(c,'M-25 1L-18 0L-12 2L-6 1L1 3L12 2L7 5L-7 5L-16 3Z','#d2e2e4');c.restore();
}
function finish(c,x,y,unit){
 c.save();c.translate(x,y);const scale=unit/17;c.scale(scale,scale);paint(c,'M-2 4L0-109L4-110L3 5Z','#4b4a49');paint(c,'M1-107L41-105L31-91L18-94L2-91Z','#db9b51');paint(c,'M4-102L30-101L28-98L4-100Z','#ffdb9a');stroke(c,'M0-110L4-110','#dce6df',2.3);c.restore();
}

function skiTrail(c,hist,s,cam,ground){
 const lifted=15;let start=-1;
 function ribbon(from,end,offset,width,color){
  if(end<=from) return;c.beginPath();
  for(let j=from;j<=end;j++){let sx=cam(hist[j].x)-lifted;let y=ground(sx)+offset;if(j===from)c.moveTo(sx,y);else c.lineTo(sx,y);}
  c.strokeStyle=color;c.lineWidth=width;c.stroke();
 }
 for(let i=0;i<hist.length;i+=2){
  const sample=hist[i];if(!sample.rut)continue;
  const x=cam(sample.x)-16,y=ground(x),d=sample.rut*3.5;
  polygon(c,[x-2,y+2,x+3,y+2,x+8,y+4+d,x+3,y+4+d*1.2], '#91aebb');
  polygon(c,[x+3,y+4+d,x+8,y+4+d,x+10,y+3+d,x+7,y+6+d], '#dfeceb');
 }
 for(let i=0;i<=hist.length;i++){
  if(i<hist.length&&hist[i].contact){if(start<0)start=i;}
  else if(start>=0){ribbon(start,i-1,2,1.65,'#84a6bb');ribbon(start,i-1,4.7,1,'#a2bcc8');start=-1;}
 }
}
function chips(c,s,mem,cam,ground,unit,reduced){
 for(const e of mem){const age=(s.tick-e.tick)/60;const isBell=e.type==='pickup';
 if(age<0||age>(isBell?.52:.64))continue;
 const x=cam(e.x),y=ground(x);
 if(isBell){if(reduced)continue;const t=age/.52;c.save();c.translate(x,y-unit*3.8);c.globalAlpha=(1-t)*.9;
  for(let j=0;j<5;j++){const a=j*TAU/5+.3;const rr=8+t*15;c.beginPath();c.moveTo(Math.cos(a)*rr,Math.sin(a)*rr);c.lineTo(Math.cos(a)*(rr+3.8*(1-t)),Math.sin(a)*(rr+3.8*(1-t)));c.strokeStyle='#ffe4a4';c.lineWidth=1.5;c.stroke();}c.restore();continue;}
 const hard=e.type==='hit', landing=e.type==='land'||e.type==='flip', n=reduced?4:hard?25:landing?15:9;
 c.save();for(let j=0;j<n;j++){const side=hard?(j%5===0?1:-1):-1, xx=x+side*(5+(9+rand(j,e.tick)*67)*age*1.65), yy=y-2-(18+rand(j,e.tick+2)*(hard?118:68))*age+152*age*age;
  const r=(1+rand(j,e.tick+1)*(hard?3:2.3))*(1-age/.9);
  c.globalAlpha=1-age/.7;polygon(c,[xx-r,yy,xx+1.5*r,yy-r*.7,xx+r*.5,yy+r,xx-r*.8,yy+r],j%4===0?'#9dbccc':'#eef5ef');}c.restore();}
}
function rider(c,s,img,px,floor,unit,reduced){
 const groundAngle=Math.atan(slopeAt(s.x)),recover=s.recovery>0,landAge=s.tick-s.landTick;
 const which=recover||(s.grounded&&landAge<14)?'land':s.grounded?'tuck':'jump';
 const sprite=img[which],w=91,h=w*sprite.naturalHeight/sprite.naturalWidth;
 const ax=which==='jump'?.43:.385,ay=which==='jump'?.861:.977;
 let y=floor-s.height*unit;
 // Two slots taper behind the last ski. In air, the shadow remains on the furrow.
 c.save();c.translate(px,floor);c.rotate(groundAngle);c.globalAlpha=s.grounded?.42:.20-s.height*.027;c.fillStyle='#647f8e';c.beginPath();c.ellipse(6,2,s.grounded?39:30+3*s.height,s.grounded?1.9:2.1,0,0,TAU);c.fill();c.restore();
 if(s.grounded&&s.tick>1&&!reduced){
  c.save();c.translate(px-21,floor-2);c.rotate(groundAngle);
  for(let j=0;j<12;j++){let phase=(s.time*(2+rand(j,14)*1.7)+rand(j,7))%1;let xx=-8-phase*(22+rand(j,3)*19), yy=-2-Math.sin(phase*Math.PI)*(3.2+rand(j,5)*(recover?17:7));let r=(1-phase)*1.35+.35;c.globalAlpha=Math.sin(phase*Math.PI)*.77;polygon(c,[xx-r*2,yy+r*.25,xx+r,yy-r*.6,xx+r*.6,yy+r*.6],'#eaf3ee');}c.restore();
 }
 c.save();c.translate(px,y);c.rotate(groundAngle);
 if(!s.grounded){const cy=-h*.46;c.translate(0,cy);c.rotate(s.angle);c.translate(0,-cy);}
 else {
  const dent=recover?Math.min(.16,s.recovery*.2):Math.max(0,(12-landAge)/12)*.12;
  c.scale(1+dent*.12,1-dent);
 }
 c.drawImage(sprite,-ax*w,-ay*h,w,h);c.restore();
}

export function createPainter(canvas,img){
 const c=canvas.getContext('2d',{alpha:false}), media=matchMedia('(prefers-reduced-motion: reduce)');
 function draw(s,trace,events){
  const rect=canvas.getBoundingClientRect();const ratio=Math.min(window.devicePixelRatio||1,2);
  const sw=Math.max(1,Math.round(rect.width*ratio)),sh=Math.max(1,Math.round(rect.height*ratio));
  if(canvas.width!==sw||canvas.height!==sh){canvas.width=sw;canvas.height=sh;}
  const scale=sw/390,h=sh/scale;c.setTransform(scale,0,0,scale,0,0);c.lineJoin='round';c.lineCap='round';c.globalAlpha=1;
  const short=h<500,unit=short?14.4:16.5,px=119,base=short?h*.704:h*.643;
  const cam=world=>px+(world-s.x)*unit;
  const ground=x=>base+(groundY(s.x+(x-px)/unit)-groundY(s.x))*unit;
  const reduced=media.matches;
  backdrop(c,s,h,img.fjord,ground);plume(c,s,px,base,h,reduced);
  for(const item of COURSE.pickups){const x=cam(item.x);if(x< -65||x>415)continue;bellPost(c,x,ground(x)-item.height*unit,unit,item,s.collected.has(item.id));}
  const endX=cam(COURSE.length);if(endX<405)finish(c,endX,ground(endX),unit);
  field(c,s,h,ground,unit,px);skiTrail(c,trace,s,cam,ground);
  for(const item of COURSE.obstacles){const x=cam(item.x);if(x< -70||x>430)continue;rock(c,x,ground(x),item,unit);}
  rider(c,s,img,px,base,unit,reduced);chips(c,s,events,cam,ground,unit,reduced);
  if(s.mode==='lost'){
   c.save();c.beginPath();c.moveTo(-6,-10);c.lineTo(396,-10);
   for(let x=396;x>=-6;x-=3)c.lineTo(x,ground(x)+4+4*Math.sin(x*.09));
   c.closePath();c.clip();plume(c,s,px,base+4,h,reduced,true);c.restore();
  }
  const fade=c.createLinearGradient(0,h-156,0,h);fade.addColorStop(0,'#17395700');fade.addColorStop(1,'#102e49b8');c.fillStyle=fade;c.fillRect(0,Math.max(0,h-156),390,156);
 }
 return draw;
}

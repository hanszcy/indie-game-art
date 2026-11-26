import {water,slope,COURSE_LENGTH} from '../shared/engine.js';
const INK='#183c50', PAPER='#f3e6c9';
const seaPrint=new Image();seaPrint.src=new URL('./assets/sea-print.png',import.meta.url);
export const artReady=new Promise(resolve=>{seaPrint.onload=()=>resolve(true);seaPrint.onerror=()=>resolve(false);});
function path(c,d,fill,stroke=null,width=1){const p=new Path2D(d);if(fill){c.fillStyle=fill;c.fill(p)}if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.stroke(p)}}
function line(c,pts,color,width=1){c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.strokeStyle=color;c.lineWidth=width;c.stroke()}
function ellipse(c,x,y,rx,ry,color){c.fillStyle=color;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fill()}
export function crest(c,x,y,w,h,kind='hook',alpha=1){c.save();c.translate(x,y);c.scale(w/320,h/180);c.globalAlpha=alpha;
 if(kind==='line'){path(c,'M0 156 Q87 162 135 76 Q178 -3 221 20 Q256 41 220 67 Q234 35 209 37 Q184 37 166 97 Q147 169 320 162 L320 700H0Z','#5c8994',INK,1);for(let i=0;i<8;i++)path(c,`M${-20+i*10} 170 Q${113+i*2} ${149+i*4} ${151+i*3} ${54+i*6} Q${184+i*3} ${18+i*4} ${217+i*2} ${31+i*4}`,null,i%2?PAPER:'#9db7b7',1.3);c.restore();return;}
 path(c,'M0 162 C56 169 93 136 113 91 C136 38 139 5 189 4 C228 2 259 24 254 49 C252 69 230 78 212 63 C235 66 238 48 223 40 C196 28 183 58 171 90 C151 143 195 170 320 164 L320 700H0Z','#548390',INK,1.4);
 path(c,'M12 170 C89 164 111 127 130 85 C153 25 166 14 191 16 C213 15 236 27 240 43',null,'#9bb7b5',5);
 path(c,'M46 176 C106 164 126 128 142 90 C161 44 172 29 188 27',null,PAPER,1.4);
 path(c,'M81 180 C127 157 143 126 154 99',null,PAPER,1.1);
 path(c,'M108 91 C125 63 133 31 149 17 L161 12 159 4 171 8 179 0 188 7 201 0 207 9 220 7 222 17 236 17 233 26 248 32 239 37 251 46 240 49 244 59 231 56 226 67 215 62 222 57 225 48 217 43 205 45 201 34 191 38 187 25 177 34 171 24 163 38 155 32 152 49 142 45 139 64 130 61 124 82Z',PAPER,INK,.65);
 for(const [a,b,r] of [[154,-5,3],[178,-10,2.5],[210,-8,2.6],[240,6,3],[263,31,2],[265,58,1.6],[129,20,2],[117,48,2.6]])ellipse(c,a,b,r,r*1.7,PAPER);
 c.restore();}
export function surfer(c,x,y,angle,g,variant='cut'){c.save();c.translate(x,y);c.rotate(angle);c.lineCap='round';c.lineJoin='round';
 const bend=(g.charge||0)*8+(g.landPulse||0)*5,hip=-22+bend,shoulder=hip-17;
 if(variant==='line'){
  line(c,[[-12,-3],[-9,-15],[4,hip-7],[13,hip-25]],INK,3);line(c,[[4,hip-7],[18,-14],[20,-3]],INK,3);line(c,[[11,hip-20],[-4,hip-27],[-17,hip-25]],'#af503e',4);line(c,[[11,hip-20],[27,hip-16],[37,hip-23]],'#af503e',4);ellipse(c,17,hip-33,5,6,'#c58a57');path(c,'M-29 -3Q0 4 32 -5',null,INK,2);c.restore();return;
 }
 // Feet remain on the board while hips and shoulders compress independently.
 line(c,[[-12,-4],[-18,-12],[0,hip]],'#c38c5b',5);line(c,[[14,-4],[17,-14],[5,hip]],'#d3a571',5);
 path(c,`M-8 ${hip-8} L12 ${hip-7} 12 ${hip+4} 3 ${hip+6} -1 ${hip+1} -11 ${hip+1}Z`,INK);
 const armLift=g.grounded?0:-5;
 line(c,[[1,shoulder+4],[-13,shoulder+armLift],[-27,shoulder+6+armLift]],'#c38c5b',4);
 path(c,`M1 ${shoulder-3} Q10 ${shoulder-5} 15 ${shoulder+4} L10 ${hip-3} -9 ${hip-3} -5 ${shoulder+3}Z`,'#b65742',INK,.8);
 path(c,`M-6 ${hip-9} -21 ${hip-4} -15 ${hip+5} -2 ${hip-4}Z`,'#b65742',INK,.65);
 path(c,`M-7 ${hip-7} 12 ${hip-7} 11 ${hip-3} -8 ${hip-3}Z`,PAPER);
 line(c,[[12,shoulder+5],[25,shoulder+10+armLift],[33,shoulder+3+armLift]],'#d3a571',4);
 ellipse(c,9,shoulder-11,6.5,7.5,'#d3a571');path(c,`M2 ${shoulder-13} Q1 ${shoulder-23} 12 ${shoulder-19} L16 ${shoulder-15} 11 ${shoulder-14} 5 ${shoulder-16} 4 ${shoulder-9}Z`,INK);ellipse(c,3,shoulder-20,3,3,INK);
 line(c,[[1,shoulder-14],[16,shoulder-13]],PAPER,1.6);
 const flutter=Math.sin((g.time||0)*9)*3;
 path(c,`M1 ${shoulder-14} Q-7 ${shoulder-20+flutter} -17 ${shoulder-13+flutter} L-8 ${shoulder-12+flutter}Z`,PAPER,INK,.5);
 path(c,'M-30 -4 Q-22 1 16 -1 Q27 -2 32 -7 L31 -3 Q25 3 13 4 L-18 3Q-27 2-30-4Z','#bf9859',INK,1.3);
 path(c,'M-21 -1 21 -2',null,PAPER,.9);c.restore();}
function mountain(c,w,h,drift){c.save();c.translate(w*.66-drift,h*.365);c.scale(w/420,w/420);path(c,'M-184 43 -131 10 -80 -48 -30 -120 -13 -136 2 -134 38 -80 96 -15 170 43Z','#91aaa9');path(c,'M-52 -88 -30 -120 -13 -136 2 -134 30 -94 17 -100 10 -91 -1 -109 -10 -102 -18 -116 -32 -97 -38 -101Z',PAPER);for(let i=0;i<7;i++)line(c,[[-23+i*11,-94+i*8],[-80+i*30,33]],'#688d95',.6);path(c,'M-210 47Q-154 3-109 30L-71 49 1 40 42 52 168 31 226 61Z','#7e9d9e');c.restore();}
export function render(c,w,h,g,fx=[],options={}){
 const alt=options.variant==='line',reduced=options.reduced,scale=w/420,cam=g.x-105,cy=water(g.x,g.time)-h*.615/scale;
 c.clearRect(0,0,w,h);c.fillStyle=PAPER;c.fillRect(0,0,w,h);
 if(!options.study && seaPrint.complete && seaPrint.naturalWidth){
  c.fillStyle='#f8e7c8';c.fillRect(0,0,w,h);
  const offset=Math.max(0,h*.13),bw=w+16, bh=bw*seaPrint.naturalHeight/seaPrint.naturalWidth,dx=-8+(reduced?0:Math.sin(g.x/2300)*5);
  c.drawImage(seaPrint,dx,offset,bw,bh);
  const edge=c.createLinearGradient(0,offset,0,offset+25);edge.addColorStop(0,'#f8e7c8');edge.addColorStop(1,'#f8e7c800');c.fillStyle=edge;c.fillRect(0,offset,w,25);
 } else {
 const sky=c.createLinearGradient(0,0,0,h*.48);sky.addColorStop(0,'#b8cbd0');sky.addColorStop(.48,'#e6dfc6');sky.addColorStop(1,PAPER);c.fillStyle=sky;c.fillRect(0,0,w,h*.64);
 ellipse(c,w*.37,h*.205,w*.074,w*.074,'#c57859');
 // Long cloud shelves leave a quiet opening around the small, distant mountain.
 path(c,`M${w*.04} ${h*.25}q${w*.1} -7 ${w*.23} 0h${w*.15}m${w*.13} ${-h*.095}h${w*.24}`,null,'#f3e6c9',8*scale);
 mountain(c,w,h,reduced?0:Math.sin(g.x/2500)*14);
 c.fillStyle='#a8b9b0';c.fillRect(0,h*.405,w,h*.3);
 for(let i=0;i<9;i++){const y=h*.415+i*9*scale;line(c,[[0,y],[w,y+Math.sin(i)*2]],i%3===0?'#728f91':'#c4cbbb',.7*scale);}
 // A distant fishing boat stays below the mountain; its scale locates the sea.
 c.save();c.translate(w*.74-(reduced?0:g.x*.025%w),h*.442);c.scale(scale,scale);path(c,'M-28 0 28 0 19 8-16 8Z','#657c78',INK,.8);path(c,'M0 -42V2M2 -38 20 -8 2 -8',PAPER,INK,.7);c.restore();
 const drift=reduced?0:g.x*.10%500;
 crest(c,-210*scale,h*.49-150*scale,800*scale,220*scale,alt?'line':'hook',.82);

 }
 // The playable waterline is sampled from the exact physics surface.
 c.save();c.beginPath();for(let sx=0;sx<=w+5;sx+=4){const y=(water(cam+sx/scale,g.time)-cy)*scale;sx?c.lineTo(sx,y):c.moveTo(sx,y);}c.lineTo(w,h);c.lineTo(0,h);c.closePath();c.fillStyle='#235770';c.fill();c.clip();
 for(let n=1;n<14;n++){c.beginPath();for(let sx=-10;sx<=w+10;sx+=6){const wx=cam+sx/scale,y=(water(wx,g.time)-cy)*scale+n*23*scale+Math.sin(wx/105+n*1.6)*n*2*scale;sx===-10?c.moveTo(sx,y):c.lineTo(sx,y);}c.strokeStyle=n%3===0?'#a9c2bd':'#427990';c.lineWidth=(n%3===0?.75:1.2)*scale;c.stroke();}
 for(let i=0;i<5;i++){const x=((i*137-(reduced?0:g.x*.19))%(w+170)+w+170)%(w+170)-80;const y=h*.81+(i%3)*26;path(c,`M${x} ${y}q28 -12 57 -5m-45 12q23 -7 47 -3m-33 10 30 -2`,null,'#90b2b2',.75);}
 c.restore();
 c.beginPath();for(let sx=0;sx<=w+4;sx+=3){const y=(water(cam+sx/scale,g.time)-cy)*scale;sx?c.lineTo(sx,y):c.moveTo(sx,y);}c.strokeStyle=PAPER;c.lineWidth=7*scale;c.stroke();c.strokeStyle=INK;c.lineWidth=1*scale;c.stroke();
 for(let i=Math.floor(cam/34);i<(cam+w/scale)/34;i++){let wx=i*34,sy=(water(wx,g.time)-cy)*scale;path(c,`M${(wx-cam)*scale} ${sy+6*scale}q${9*scale} ${5*scale} ${17*scale} ${2*scale}`,null,'#c1d3c5',1.4*scale);}
 for(const item of g.objects){const px=(item.x-cam)*scale;if(px< -60||px>w+60)continue;const py=(water(item.x,g.time)-cy)*scale;c.save();c.translate(px,py);c.scale(scale,scale);
  if(item.type==='shell'&&!item.collected){c.translate(0,-item.height);const bob=reduced?0:Math.sin(g.time*3+item.id)*2;c.translate(0,bob);path(c,'M-9 5Q-14-5-7-9Q0-15 9-8Q15-1 9 7L2 10-2 10Z','#d6b773',INK,1);for(let j=-2;j<=2;j++)path(c,`M${j*3.2} -7 Q${j*2} 0 0 7`,null,'#835d3f',.65);}
  if(item.type==='reef'){path(c,'M-20 2-15-15-7-25 6-22 15-12 20 2Z',item.hit?'#81979a':'#354f5d',INK,1);path(c,'M-15-15-7-25 6-22 3-13-3-15-8-5Z','#9baea9');path(c,'M-22 2q10 5 17 2m9-1q8 3 17-1',null,PAPER,2);}
  if(item.type==='log'){c.rotate(-.30);path(c,'M-10 0-10-32 3-39 12-30 10 1Z','#946b49',INK,1);path(c,'M-6 -27 0-34 7-29 2-25Z','#d1b582',INK,.7);line(c,[[-4,-21],[-4,-3]],'#dbbc82',1);line(c,[[4,-18],[3,-1]],'#603e33',1);}
  c.restore();}
 // A harbor pennant marks a real finish location, never a random decoration.
 const finish=(COURSE_LENGTH+120-cam)*scale;if(finish>-70&&finish<w+80){const yy=(water(COURSE_LENGTH+120,g.time)-cy)*scale;for(const side of [-1,1])line(c,[[finish+side*45*scale,yy],[finish+side*45*scale,yy-115*scale]],INK,2*scale);path(c,`M${finish-45*scale} ${yy-115*scale}q${45*scale} ${12*scale} ${90*scale} 0v${22*scale}q${-45*scale} ${12*scale} ${-90*scale} 0Z`,'#b65742',INK,1);}
 const riderX=105*scale,riderY=(g.y-cy)*scale;
 if(g.grounded&&!reduced){for(let i=0;i<6;i++){const d=(g.time*70+i*7)%45;ellipse(c,riderX-(24+d)*scale,riderY+(4+Math.sin(i*3+g.time*8)*2)*scale,(3-d/20)*scale,1*scale,PAPER);}}
 c.save();c.translate(riderX,riderY);c.scale(scale,scale);const angle=g.grounded?Math.atan(slope(g.x,g.time)):Math.max(-.32,Math.min(.28,g.vy/1300));c.globalAlpha=g.invulnerable>0?.72:1;surfer(c,0,0,angle+(g.phase==='lost'?.65:0),g,alt?'line':'cut');c.restore();
 for(const f of fx){const age=g.time-f.time;if(age<0||age>0.65)continue;const px=(f.x-cam)*scale,py=(water(f.x,g.time)-cy)*scale;c.globalAlpha=1-age/.65;if(f.type==='land'){for(let i=0;i<8;i++){const a=i/7*Math.PI;ellipse(c,px+Math.cos(a)*age*80*scale,py-Math.sin(a)*age*55*scale+age*age*60*scale,2*scale,3*scale,PAPER)}}c.globalAlpha=1;}
 // The paper border is a frame, never a mask over the player or controls.
 c.strokeStyle=PAPER;c.lineWidth=12;c.strokeRect(0,0,w,h);c.strokeStyle='#6d887f';c.lineWidth=.6;c.strokeRect(7,7,w-14,h-14);
}

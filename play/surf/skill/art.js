import {water,slope,COURSE_LENGTH} from '../shared/engine.js';
const INK='#20454b',PAPER='#f7e8c9',JADE='#387b77',CORAL='#c26549';
function asset(name){const im=new Image();const ready=new Promise(resolve=>{im.onload=()=>resolve(true);im.onerror=()=>resolve(false)});im.src=new URL('./assets/'+name,import.meta.url);return {im,ready};}
const bay=asset('coastal-bay.webp'),cruise=asset('rider-cruise.webp');
const poses={cruise,crouch:asset('rider-crouch.webp'),air:asset('rider-air.webp'),greet:asset('rider-greet.webp')};
export const artReady=Promise.all([bay.ready,...Object.values(poses).map(p=>p.ready)]).then(a=>a.every(Boolean));
function path(c,d,fill,stroke=null,width=1){const p=new Path2D(d);if(fill){c.fillStyle=fill;c.fill(p)}if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.stroke(p)}}
function ellipse(c,x,y,rx,ry,color){c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fillStyle=color;c.fill();}
function stroke(c,points,color,width=1){c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.strokeStyle=color;c.lineWidth=width;c.stroke()}
// All poses share a board contact point. These atlas-independent pivots are
// measured from the actual board, never from changing hats or scarf extents.
const contacts={cruise:{x:.49,y:.934,width:148},crouch:{x:.49,y:.934,width:148},air:{x:.49,y:.934,width:148},greet:{x:.49,y:.934,width:148}};
export function surfer(c,x,y,angle,g,poseStyle){
 const pose=poseStyle==='single'?'cruise':g.phase==='won'?'greet':!g.grounded?'air':g.charge>.12||g.landPulse>.35?'crouch':'cruise';
 const source=poses[pose].im.complete&&poses[pose].im.naturalWidth?poses[pose].im:cruise.im;if(!source.naturalWidth)return;
 const p=contacts[pose],dw=p.width,dh=dw*source.naturalHeight/source.naturalWidth;
 c.save();c.translate(x,y);c.rotate(angle);
 // The board stays planted. Compression is carried by the authored pose;
 // this tiny settling movement belongs only to the water-contact beat.
 c.globalAlpha=g.invulnerable>0?.68:1;c.drawImage(source,-dw*p.x,-dh*p.y,dw,dh);c.restore();
}
export function shell(c,x,y,size=1,fade=1){c.save();c.translate(x,y);c.scale(size,size);c.globalAlpha=fade;
 path(c,'M-11 5C-17-2-13-14-3-15C8-18 18-9 15 2L21 9 8 11C3 16-7 14-11 5Z','#e9be77',INK,1.2);
 path(c,'M13 8C17-3 8-13-1-11C-10-10-11 0-5 5C2 10 9 4 7-2C5-7-3-6-3-1C-3 2 1 3 2 0',null,'#b45f43',2);
 path(c,'M-12-5 -7-7m-2 14 4-2M6-12 1-8m13 8-5 1M8 10l2-4',null,'#f9e8bb',1.5);c.restore();}
function reef(c,hit){path(c,'M-22 3C-20-7-15-10-12-18L-3-27 10-25 17-17 20-6 25 4C10 10-8 7-22 3Z',hit?'#76958a':'#254951',INK,1.2);path(c,'M-12-18-3-27 10-25 6-19 0-19-4-7-9-11-14-3-19-2Z','#8cae9b');path(c,'M-8-17-6-12m8-9-4 10m14-8 3 8M-14-1-11-6m13-2L0 1m12-10 3 7',null,'#567e79',.9);path(c,'M-18-4q7-7 12-5l-2 3-6 1m17-12 7 2-2 3-7-1',null,'#c5b47e',1.4);}
function log(c,hit){c.save();c.rotate(-.23);path(c,'M-12 1-13-28Q-12-36-3-38L9-35 14-27 12 3Z',hit?'#969d7b':'#aa8053',INK,1.2);path(c,'M-13-28Q-1-36 14-27L8-23-5-23Z','#eed3a0',INK,.8);path(c,'M-8-28q7-7 15-1l-5 3-5-2m-7 8 2 15m7-17-1 20m7-18-1 12',null,'#665b40',1);path(c,'M-13-14-21-18-23-15-12-8Z','#ad8455',INK,1);c.restore();}
function foam(c,x,y,size=1,alpha=1){c.save();c.translate(x,y);c.scale(size,size);c.globalAlpha=alpha;path(c,'M-32 4Q-18 5-11-4C-4-14 1-16 6-11Q10-7 5-4L3-7Q-1-9-4-4C-9 6-16 9-32 4ZM-10 10Q3 10 12 3C19-4 27-1 25 3Q20 0 18 6 6 14-10 10Z',PAPER);c.restore();}
function waterline(c,w,scale,cam,cy,time,offset=0){c.beginPath();for(let sx=-8;sx<=w+8;sx+=4){const y=(water(cam+sx/scale,time)-cy)*scale+offset;sx===-8?c.moveTo(sx,y):c.lineTo(sx,y)}}
let inkTile;
function waterInk(c){if(!inkTile){const tile=document.createElement('canvas');tile.width=192;tile.height=192;const pen=tile.getContext('2d');let seed=73;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};for(let i=0;i<8500;i++){pen.fillStyle=i%3?'rgba(244,231,197,.055)':'rgba(14,59,61,.05)';pen.fillRect(rand()*192,rand()*192,.3+rand()*.8,.3+rand()*.7);}inkTile=tile;}return c.createPattern(inkTile,'repeat');}
export function render(c,w,h,g,fx=[],options={}){
 const reduced=options.reduced,scale=w/420,cam=g.x-112,cy=water(g.x,g.time)-h*.59/scale;
 c.clearRect(0,0,w,h);c.fillStyle=PAPER;c.fillRect(0,0,w,h);
 if(bay.im.naturalWidth){const dx=reduced?0:Math.sin(g.x/3000)*7;c.drawImage(bay.im,-10+dx,0,w+20,h*.96);}
 // Each depth uses the same broad carved rhythm; only mark density changes.
 c.save();waterline(c,w,scale,cam,cy,g.time);c.lineTo(w+8,h);c.lineTo(-8,h);c.closePath();c.fillStyle=JADE;c.fill();c.clip();c.save();c.translate(-(cam*.18%192)*scale,0);c.fillStyle=waterInk(c);c.fillRect(-192,0,w+384,h);c.restore();
 for(let n=0;n<12;n++){
  c.beginPath();for(let sx=-8;sx<=w+8;sx+=5){const wx=cam+sx/scale,y=(water(wx,g.time)-cy)*scale+(18+n*27+Math.sin(wx/220+n)*n*3)*scale;sx===-8?c.moveTo(sx,y):c.lineTo(sx,y)}
  c.strokeStyle=n%3===0?'#71a398':n%3===1?'#28656b':'#4b8a83';c.lineWidth=(n%3===1?1.2:.65)*scale;c.stroke();
 }
 for(let band=0;band<4;band++){let start=(band*159-cam*.24)%(w+240);if(start< -120)start+=w+240;for(let k=0;k<5;k++){const yy=h*.67+band*h*.075+k*3*scale;path(c,`M${start} ${yy}q${35*scale} ${-6*scale} ${76*scale} ${-2*scale}`,null,'#77a397',.45*scale);}}
 // Long tapered foam fragments travel with the water, rather than a screen texture.
 for(let i=-2;i<9;i++){let wx=i*95+Math.floor(cam/855)*855,px=(wx-cam*.8)*scale%(w+160);if(px< -80)px+=w+160;let py=h*.70+(i%3)*h*.065;path(c,`M${px-40} ${py}q${35*scale} ${-4*scale} ${70*scale} ${2*scale}q${-24*scale} ${-1*scale} ${-46*scale} ${2*scale}Z`,i%2?'#86b0a2':'#b4c8af');}
 // A broad low foreground swell echoes the character's rounded cloth masses.
 const drift=reduced?0:Math.sin(g.time*.35)*12;
 for(let i=0;i<6;i++){const y=h*.83+i*8*scale;path(c,`M${-40+drift} ${y+30}C${w*.28} ${y-25} ${w*.5} ${y+45} ${w+60} ${y-14}`,null,i===0?'#9bbba7':'#62978e',(i===0?2:.7)*scale);}
 c.restore();
 waterline(c,w,scale,cam,cy,g.time);c.strokeStyle=PAPER;c.lineWidth=8*scale;c.stroke();c.strokeStyle='#244f55';c.lineWidth=.8*scale;c.stroke();
 for(let i=Math.floor(cam/90)-1;i<(cam+w/scale)/90+1;i++){const wx=i*90;foam(c,(wx-cam)*scale,(water(wx,g.time)-cy)*scale+4*scale,.55*scale,.9)}
 for(const item of g.objects){const px=(item.x-cam)*scale;if(px< -65||px>w+65)continue;const py=(water(item.x,g.time)-cy)*scale;c.save();c.translate(px,py);c.scale(scale,scale);
  if(item.type==='shell'&&!item.collected){const bob=reduced?0:Math.sin(g.time*3+item.id)*1.8;shell(c,0,-item.height+bob,.78);}
  if(item.type==='reef'){reef(c,item.hit);foam(c,0,3,.85)}
  if(item.type==='log'){log(c,item.hit);foam(c,0,3,.75)}c.restore();
 }
 const finish=(COURSE_LENGTH+120-cam)*scale;
 if(finish>-130&&finish<w+130){const yy=(water(COURSE_LENGTH+120,g.time)-cy)*scale;c.save();c.translate(finish,yy);c.scale(scale,scale);
  // Two weathered harbor posts and an indigo pennant are a real destination.
  for(const x of [-48,49]){path(c,`M${x-3} 10V-108l6-2V10Z`,'#b08a58',INK,1);path(c,`M${x-5}-84h10m-10 5h10m-10 5h10`,null,'#e7cca1',1.6)}
  path(c,'M-48-108Q0-96 49-108L48-77Q0-65-48-77Z','#244e59',INK,1);path(c,'M-32-92q14-15 26 0t25 0m-56 8q14-10 26 0t29 0',null,PAPER,1.4);c.restore();
 }
 const riderX=112*scale,riderY=(g.y-cy)*scale;
 if(g.grounded){foam(c,riderX-42*scale,riderY+5*scale,.9*scale,.95);if(!reduced)for(let i=0;i<7;i++){let a=(g.time*2+i*.15)%1;ellipse(c,riderX-(48+a*42)*scale,riderY+Math.sin(a*3+i)*3*scale,(2.5-a*2)*scale,(1.7-a)*scale,PAPER)}}
 const angle=g.grounded?Math.atan(slope(g.x,g.time)):Math.max(-.26,Math.min(.22,g.vy/1500));
 c.save();c.translate(riderX,riderY);c.scale(scale,scale);surfer(c,0,0,angle+(g.phase==='lost'?.14:0),g,options.poseStyle);c.restore();
 for(const f of fx){const age=g.time-f.time;if(age<0||age>.65)continue;const px=(f.x-cam)*scale,py=(water(f.x,g.time)-cy)*scale;c.save();c.globalAlpha=1-age/.65;
  if(f.type==='land'){for(const sign of [-1,1]){const spread=age*65;foam(c,px+sign*spread*scale,py-(Math.sin(age/.65*Math.PI)*15)*scale,(1+age)*scale,.9)}}
  if(f.type==='shell'){shell(c,px,py-(60+age*70)*scale,(.65-age*.5)*scale,1-age/.65);}
  if(f.type==='hit'){stroke(c,[[px-20*scale,py-32*scale],[px-13*scale,py-40*scale]],CORAL,2);stroke(c,[[px+17*scale,py-35*scale],[px+25*scale,py-43*scale]],CORAL,2)}c.restore();
 }
 // Fine ivory margins leave the scene open, without a second picture frame.
 c.strokeStyle='#f4e5c8';c.lineWidth=9;c.strokeRect(0,0,w,h);
}

const TILE = 64;

function box(ctx, x, y, w, h, color, radius = 0) {
  ctx.fillStyle = color;
  if (!radius) { ctx.fillRect(x, y, w, h); return; }
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, radius);
  ctx.fill();
}
function polygon(ctx, pts, color) {
  ctx.beginPath();
  ctx.moveTo(...pts[0]);
  for (const pt of pts.slice(1)) ctx.lineTo(...pt);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}
function oval(ctx, x, y, rx, ry, color) {
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}
function line(ctx, pts, color, width) {
  ctx.beginPath();
  ctx.moveTo(...pts[0]);
  for (const pt of pts.slice(1)) ctx.lineTo(...pt);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();
}

function floor(ctx, x, y) {
  const seed = (x * 29 + y * 41) % 5;
  box(ctx, 0, 0, 64.3, 64.3, '#bdb6a4');
  box(ctx, 1, 1, 62, 62, ['#e4decb','#e4decd','#ded8c5','#e7e1ce','#e0dbc8'][seed], 2);
  box(ctx, 4, 1.5, 56, 1.2, '#f3ebd8');
  const mx = 10 + (13*x + 7*y) % 36;
  const my = 13 + (9*x + 11*y) % 35;
  line(ctx, [[mx,my],[mx+3,my-.5]], '#cec8b7', 1.4);
  oval(ctx, 58-mx/2, 60-my/2, 0.9, 0.8, '#c7c2b0');
}

function wall(ctx, x, y) {
  const cap = (x + y * 3) % 4 ? '#648087' : '#6c898c';
  box(ctx, 0, 0, 64.3, 64.3, '#344f55');
  box(ctx, 1, 2, 62, 57, '#48676c', 3);
  box(ctx, 1, 1, 62, 49, cap, 3);
  box(ctx, 4, 2, 56, 2, '#849d9d', 1);
  box(ctx, 5, 47, 55, 1.5, '#59757c');
  box(ctx, 4, 53, 56, 1.6, '#57767b');
  if ((x + y*3) % 4 === 1) {
    for (let i=0; i<3; i++) {
      box(ctx, 23, 20+i*4, 18, 1.4, '#546e74', 1);
    }
  } else {
    for (const [px,py] of [[7,8],[56,40]]) {
      oval(ctx,px,py+0.6,1.4,1.4,'#83a09f');
      oval(ctx,px,py,1.3,1.3,'#4e6b71');
    }
  }
}

function dock(ctx) {
  box(ctx, 6, 6, 52, 52, '#c3d6bf', 5);
  box(ctx, 9, 9, 46, 46, '#d6e0ca', 3);
  for (let i=0; i<4; i++) {
    ctx.save();ctx.translate(32,32);ctx.rotate(i*Math.PI/2);
    line(ctx,[[-22,-10],[-22,-21],[-11,-21]],'#4c8975',3);ctx.restore();
  }
  oval(ctx,32,32,9,9,'#7ba18b');
  oval(ctx,32,32,6,6,'#d6e0ca');
  oval(ctx,32,32,2.5,2.5,'#65947c');
}

function crate(ctx, placed) {
  oval(ctx,32,55,27,5,'#46504b32');
  box(ctx,5,6,54,51,placed?'#3b6350':'#785028',4);
  box(ctx,7,7,50,44,placed?'#809875':'#dfab62',2);
  box(ctx,10,10,44,38,placed?'#75906c':'#cd9653');
  for (const x of [23,39]) {
    box(ctx,x,11,1.7,36,placed?'#687d5d':'#a77742');
    box(ctx,x+2,11,1.5,36,placed?'#8da382':'#e1b371');
  }
  line(ctx,[[13,27],[19,26],[21,27]],placed?'#688460':'#b68348',1.1);
  line(ctx,[[42,17],[46,18],[50,17]],placed?'#688460':'#b68348',1.1);
  polygon(ctx,[[8,41],[47,9],[54,9],[54,14],[14,46],[8,46]],placed?'#a2b191':'#efc381');
  line(ctx,[[12,46],[53,13]],placed?'#697e5f':'#b5874e',1.4);
  for (const y of [8,44]) {
    box(ctx,7,y,50,7,placed?'#a3b391':'#e9bb79',1.5);
    box(ctx,8,y+6,48,1.3,placed?'#758968':'#bd8d54');
    for(const x of [12,52]) oval(ctx,x,y+3,1.35,1.35,placed?'#64795d':'#926d46');
  }
  if (placed) {
    oval(ctx,45,44,8,8,'#377263');
    line(ctx,[[41,44],[44,47],[49,40]],'#e5ebd7',2);
  }
}

function worker(ctx, direction, gait) {
  const glance = direction==='left' ? -2 : direction==='right' ? 2 : 0;
  oval(ctx,32,53,21,5,'#46504b3d');
  box(ctx,19,44+gait,10,10,'#324549',4);
  box(ctx,35,44-gait,10,10,'#324549',4);
  box(ctx,16,50+gait,13,5,'#3e4743',2);
  box(ctx,35,50-gait,13,5,'#3e4743',2);
  box(ctx,12,28,13,17,'#547f78',5);
  box(ctx,39,28,13,17,'#547f78',5);
  oval(ctx,17,43,5,4,'#c78d54');
  oval(ctx,47,43,5,4,'#c78d54');
  box(ctx,20,27,24,20,'#3e746d',5);
  box(ctx,24,32,16,13,'#49645e',3);
  box(ctx,24,29,3,9,'#334f4f',1);
  box(ctx,38,29,3,9,'#334f4f',1);
  box(ctx,28,37,8,4,'#71877b',1.2);
  oval(ctx,32,23,14,13,'#5f5142');
  oval(ctx,32+glance,24,12,11,'#e3b382');
  oval(ctx,20+glance,25,2.5,3,'#d99e73');
  oval(ctx,44+glance,25,2.5,3,'#d99e73');
  for(const x of [28,36]) oval(ctx,x+glance,24.5,1.45,1.8,'#3d4943');
  line(ctx,[[31+glance,29],[33+glance,29.4]],'#ab7959',1.3);
  ctx.save();
  ctx.beginPath(); ctx.rect(16,5,32,14); ctx.clip();
  oval(ctx,31,17,14,11,'#bb8237');
  oval(ctx,31,15,13,9,'#e6ad4a');
  polygon(ctx,[[29,7],[33,7],[34,17],[29,17]],'#f2c76e');
  ctx.restore();
  box(ctx,16+glance,16,32,4.8,'#b68136',2);
  box(ctx,16+glance,15,32,3.5,'#efba58',2);
}

export function paint(canvas, s, direction, from, progress) {
  const w = canvas.clientWidth;
  if (!w) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  const width = Math.round(w * dpr), height = Math.round(width * s.height / s.width);
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width; canvas.height = height;
  }
  const ctx = canvas.getContext('2d');
  const scale = width / (s.width * TILE);
  ctx.setTransform(scale, 0, 0, height / (s.height*TILE), 0, 0);
  const tile = (x,y,draw) => {ctx.save();ctx.translate(x*TILE,y*TILE);draw(ctx,x,y);ctx.restore();};
  for(let y=0;y<s.height;y++) for(let x=0;x<s.width;x++) tile(x,y,floor);
  for(const p of s.targets) tile(p.x,p.y,dock);
  for(const p of s.walls) tile(p.x,p.y,wall);
  const mix = (old, now) => old + (now-old)*progress;
  s.crates.forEach((p,i) => {
    const prev=from?.crates[i] ?? p;
    const on=s.targets.some(t=>t.x===p.x && t.y===p.y);
    tile(mix(prev.x,p.x),mix(prev.y,p.y),ctx=>crate(ctx,on));
  });
  const p=s.player, prev=from?.player ?? p;
  tile(mix(prev.x,p.x),mix(prev.y,p.y), ctx=>worker(ctx,direction,Math.sin(Math.PI*progress)*2));
}

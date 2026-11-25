import { COURSE, groundY, slopeAt } from '../engine.mjs';

const TAU = Math.PI * 2;
const hash = n => {const t = Math.sin(n * 91.31 + COURSE.seed) * 14325.54; return t - Math.floor(t);};
export function scene(canvas) {
  const c = canvas.getContext('2d', { alpha: false });
  function poly(points, color) {
    c.beginPath();c.moveTo(points[0],points[1]);
    for(let i=2;i<points.length;i+=2)c.lineTo(points[i],points[i+1]);
    c.closePath();c.fillStyle=color;c.fill();
  }
  function line(points, color, width = 1) {
    c.beginPath();c.moveTo(points[0],points[1]);
    for(let i=2;i<points.length;i+=2)c.lineTo(points[i],points[i+1]);
    c.strokeStyle=color;c.lineWidth=width;c.lineCap='round';c.lineJoin='round';c.stroke();
  }
  function disk(x,y,r,color) {c.beginPath();c.arc(x,y,r,0,TAU);c.fillStyle=color;c.fill();}
  function pine(x,y,h,color, snowColor) {
    c.save();c.translate(x,y);c.scale(h,h);
    poly([-.035,0,-.027,-.65,.023,-.69,.04,0],color);
    poly([0,-1,.13,-.66,.085,-.68,.202,-.43,.13,-.47,.26,-.17,.055,-.23,-.015,-.195,-.25,-.17,-.125,-.44,-.192,-.4,-.079,-.67,-.116,-.64],color);
    if(snowColor) {
      poly([0,-.98,.055,-.78,-.007,-.802,-.079,-.696],snowColor);
      poly([-.075,-.65,-.044,-.59,-.101,-.56,-.144,-.494],snowColor);
      poly([-.12,-.428,-.075,-.35,-.15,-.33,-.21,-.253],snowColor);
    }
    c.restore();
  }
  function mountain(x,base,w,h,far) {
    c.save();c.translate(x,base);c.scale(w,h);
    const contour=[-.62,.02,-.52,-.13,-.44,-.195,-.39,-.34,-.355,-.325,-.275,-.49,-.22,-.55,-.197,-.66,-.15,-.666,-.085,-.86,-.052,-.855,0,-1,.044,-.916,.065,-.895,.1,-.786,.134,-.798,.208,-.59,.251,-.55,.282,-.448,.335,-.466,.435,-.241,.50,-.18,.61,.03];
    poly(contour,far?'#a2b3c7':'#7995ac');
    poly([-.54,-.11,-.39,-.34,-.355,-.325,-.275,-.49,-.22,-.55,-.197,-.66,-.15,-.666,-.085,-.86,-.052,-.855,0,-1,-.024,-.78,-.062,-.715,-.043,-.678,-.13,-.48,-.162,-.46,-.237,-.32,-.30,-.32,-.401,-.149],far?'#f9ddd0':'#fff0da');
    poly([0,-1,.044,-.916,.065,-.895,.1,-.786,.134,-.798,.208,-.59,.16,-.646,.155,-.58,.101,-.679,.082,-.631,.048,-.77,.027,-.763],far?'#e3d9e2':'#dfe5ec');
    poly([-.052,-.855,-.063,-.756,-.095,-.73,-.089,-.69,-.17,-.554,-.126,-.666,-.143,-.654],far?'#d6c9d0':'#d5cfce');
    poly([.132,-.786,.207,-.59,.25,-.55,.282,-.448,.335,-.466,.425,-.257,.35,-.353,.302,-.335,.218,-.459,.228,-.408,.171,-.51,.139,-.682],far?'#c4c7d5':'#b7c7d5');
    poly([-.207,-.463,-.159,-.49,-.078,-.685,-.124,-.475,-.194,-.369,-.22,-.37,-.319,-.244],far?'#b3bbce':'#9db0bf');
    c.restore();
  }
  return function paint(s) {
    const W = canvas.clientWidth, H = canvas.clientHeight;
    const dpr=Math.min(2,window.devicePixelRatio||1);
    if (!W||!H) return;
    if (canvas.width!==Math.round(W*dpr)||canvas.height!==Math.round(H*dpr)) {
      canvas.width=Math.round(W*dpr);canvas.height=Math.round(H*dpr);
    }
    c.setTransform(dpr,0,0,dpr,0,0);
    const h=H/750, landscape=W/H>1.12, size=Math.max(9.5,Math.min(W/36,H/48,22));
    const athleteX=W*(landscape?.31:.27), snowLine=H*(landscape?.59:.575);
    const wx = x => athleteX + (x-s.x)*size;
    const sy = x => snowLine + (groundY(x)-groundY(s.x))*size;
    const minX=s.x-athleteX/size-6,maxX=s.x+(W-athleteX)/size+6;
    const sky=c.createLinearGradient(0,0,0,H*.58);
    sky.addColorStop(0,'#a9b8d5');sky.addColorStop(.57,'#f2d6d3');sky.addColorStop(1,'#ffead0');
    c.fillStyle=sky;c.fillRect(0,0,W,H);
    const starX=W*.76-s.x*.09,sunY=H*.214;
    disk(starX,sunY,Math.max(21,H*.043),'#ffe7bb88');
    disk(starX,sunY,Math.max(16,H*.034),'#fff0c7');
    for(let i=-1;i<7;i++){
      const x=i*174*h-s.x*.19;const y=H*(.155+.12*hash(i+4)),l=(39+hash(i-6)*50)*h;
      line([x,y,x+l*.65,y-1.3*h,x+l,y], '#fff0de91', 2*h);
      line([x+15*h,y+5*h,x+l*.85,y+4*h], '#fff0de61', 1.3*h);
    }
    const span=Math.max(H*.58,W*.48);
    for(let i=-2;i<5;i++)mountain(W*.07+i*span*.76-s.x*.32,H*.493,span*1.36,H*(.174+hash(i+2)*.091),true);
    const peakW=Math.max(H*.66,W*.53);
    for(let i=-2;i<5;i++)mountain(W*.46+i*peakW*.89-s.x*.92,H*.526,peakW,H*(.234+.072*hash(i+30)),false);
    const mist=c.createLinearGradient(0,H*.385,0,H*.555);
    mist.addColorStop(0,'#e8e2e600');mist.addColorStop(1,'#e1e4e5');
    c.fillStyle=mist;c.fillRect(0,H*.385,W,H*.17);
    // Stepped ranks of spruces preserve depth around the snowline.
    function forest(layer,col,shadow){
      const scale=Math.min(1.45,Math.max(.65,H/720)),step=layer===1?15*scale:29*scale;
      const offset=s.x*(layer===1?1.35:2.55),start=Math.floor(offset/step)-2;
      let pts=[-40,H*.62];
      for(let n=start;n<start+W/step+5;n++){
        const x=n*step-offset, y=H*(layer===1?.494:.534)+Math.sin(n*.26)*7*scale;
        pts.push(x,y);
      }
      pts.push(W+50,H*.7,-40,H*.7);poly(pts,col);
      for(let n=start;n<start+W/step+5;n++){
        const x=n*step-offset, y=H*(layer===1?.494:.534)+Math.sin(n*.26)*7*scale;
        const height=(layer===1?8+hash(n-8)*21:15+hash(n+68)*35)*scale;
        pine(x,y+3*scale,height,col,shadow);
      }
    }
    forest(1,'#a4b8c2');forest(2,'#71959d','#c4d2d4');
    // Short timber boundary poles make horizontal travel legible.
    for (let i=Math.floor(minX/13)-1;i<=Math.ceil(maxX/13);i++){
      const x=i*13+hash(i)*3.4,px=wx(x),y=sy(x),hh=size*(1+hash(i)*.5);
      line([px,y-hh,px+1,y+3],'#9ba9a3',Math.max(1.4,size*.15));
      line([px,y-hh,px+.4,y-hh*.72],'#c67e60',Math.max(1.8,size*.17));
    }
    function cabin(x) {
      const px=wx(x), y=sy(x),u=size;
      c.save();c.translate(px,y);c.scale(u,u);
      poly([-2,-.22,-2,-2.2,0,-3.35,2,-2.12,2,.28],'#975f47');
      poly([.1,-3.2,2.2,-2.02,3.1,-2.3,1.06,-3.4],'#566971');
      poly([-2.55,-2.1,-.03,-3.77,2.55,-2.09,2.17,-1.94,-.03,-3.27,-2.36,-1.83],'#fff5df');
      poly([-.54,0,-.54,-1.57,.26,-1.57,.26,0],'#4c4d48');
      poly([.7,-1.4,1.52,-1.4,1.52,-.72,.7,-.72],'#ffd88c');
      c.restore();
    }
    if(maxX>=COURSE.length-6)cabin(COURSE.length+2.5);
    const ground=[]; for(let x=minX;x<maxX+.6;x+=.6)ground.push(wx(x),sy(x));
    const ice=c.createLinearGradient(0,snowLine-H*.05,0,H);
    ice.addColorStop(0,'#fffcf1');ice.addColorStop(.26,'#e8f1ed');ice.addColorStop(1,'#b9d5d9');
    poly([...ground,W+110,H+20,-110,H+20],ice);
    line(ground,'#fffcef',Math.max(2,size*.23));
    // Wind-carved snow bands follow the actual local pitch.
    for(let i=Math.floor(minX/6)-2;i<Math.ceil(maxX/6)+2;i++){
      for(let row=0;row<4;row++){
        const n=i*9+row*301,x=i*6+hash(n)*3.6,l=(1.5+hash(n+2)*6.5)*size;
        const px=wx(x),y=sy(x)+size*(2.1+row*5.6+hash(n+5)*4.5), grade=slopeAt(x)*.65;
        c.beginPath();c.moveTo(px,y);c.quadraticCurveTo(px+l*.6,y+grade*l*.24,px+l,y+grade*l);
        c.quadraticCurveTo(px+l*.43,y+grade*l*.73+1.6*size/12,px,y);
        c.fillStyle=row%2?'#edf4edb0':'#a9cbd047';c.fill();
      }
    }
    for(const r of COURSE.obstacles){
      if(r.x<minX||r.x>maxX)continue;
      const x=wx(r.x),y=sy(r.x),w=r.width*size,h=r.height*size;
      c.save();c.translate(x,y);c.rotate(Math.atan(slopeAt(r.x)));
      poly([-w*.69,1,w*.29,-h*.32,w*1.35,h*.16,w*1.6,h*.33,-w*.68,h*.15],'#a1b6c18a');
      poly([-w*.53,1,-w*.49,-h*.51,-w*.21,-h*.93,w*.12,-h,w*.43,-h*.57,w*.53,1],'#3e5767');
      poly([-w*.49,-h*.51,-w*.21,-h*.93,w*.12,-h,w*.18,-h*.67,-w*.16,-h*.56,-w*.19,-h*.38],'#e7e8db');
      poly([w*.12,-h,w*.43,-h*.57,w*.51,0,w*.15,-h*.17,-w*.03,-h*.49],'#6c7f86');
      c.restore();
    }
    for(const p of COURSE.pickups){
      if(s.collected.has(p.id)||p.x<minX||p.x>maxX)continue;
      const x=wx(p.x),y=sy(p.x)-p.height*size+Math.sin(s.time*4+p.id)*size*.09,q=Math.max(6,size*.58);
      c.save();c.translate(x,y);c.scale(q,q);
      disk(0,0,1.5,'#fff5c444');poly([-.7,-1.48,.7,-1.48,.44,-.64,-.44,-.64],'#b95e42');
      poly([0,-.93,.81,-.48,.81,.48,0,.96,-.81,.48,-.81,-.48],'#a66132');
      poly([0,-.77,.64,-.37,.64,.35,0,.74,-.64,.35,-.64,-.37],'#f7be61');
      poly([-.43,.32,-.02,-.46,.41,.32],'#fff6c5');c.restore();
    }
    const rear=wx(s.x-s.gap);
    if(rear>-size*9){
      const front=sy(s.x-s.gap);
      for(let layer=0;layer<2;layer++){
        const fill=layer?'#dae4e9':'#b2c4cd';
        for(let i=0;i<10;i++){
          const unit=size*(1.1+hash(i+layer*42)*1.35);
          const nx=rear+(layer?-2.1:-.8)*size-i*size*.8+Math.sin(s.time*3+i*.9)*size*.16;
          const ny=front-size*(1.6+Math.min(4,i*.58))+Math.cos(s.time*2+i)*size*.32;
          disk(nx,ny,unit,fill);poly([nx-unit,ny,nx+unit,ny,nx+unit-size*.5,front+size*3,nx-unit*2,front+size*3],fill);
        }
      }
    }
    skier(athleteX,snowLine-s.height*size,size,s);
  };
  function skier(x,y,size,s) {
    const u=Math.min(1.68,Math.max(1.05,size/10.8));
    c.save();c.translate(x,y);
    if(s.grounded && s.mode!=='ready') {
      const grade=slopeAt(s.x);
      for(let i=0;i<9;i++){
        const phase=(s.tick/21+i*.193)%1,dx=-phase*(27+i*1.1)*u;
        const dy=grade*dx-phase*(1-phase)*(14+i%4*4)*u;
        disk(dx,dy+1*u,(1+hash(i)*1.4)*u,'#ffffffc9');
      }
      line([-24*u,-24*grade*u+2*u,-10*u,-10*grade*u+1*u], '#9bb6bea1',1.5*u);
    }
    c.rotate(Math.atan(slopeAt(s.x)));c.scale(u,u);c.translate(0,-13);c.rotate(s.angle);c.translate(0,13);
    if(s.pose==='recover') {c.scale(1.08,.7);c.rotate(-.18);}
    const tuck=s.pose==='air'?2.8:0;
    // Two skis and poles, articulated legs, shell, neck gaiter, helmet and goggles.
    line([-14,1,5,1,12,-.1,15,-2.2],'#1d4952',2.8);
    line([-11,2.4,8,2.5,14,1.1,16,-.8],'#be613d',1.45);
    line([-4,-16+tuck,-12,-3.5],'#64828a',1);
    line([-14,-4,-10,-2.5],'#49616a',.9);
    line([-5,-12+tuck,1,-8+tuck*.6,-3,-2],'#294651',3.7);
    line([-1,-12+tuck,5,-8+tuck*.6,1,-2],'#365c62',4.2);
    line([-4,-1.4,-.4,-1.4],'#c69456',2.3);line([0,-1.25,3.4,-1.3],'#dba15a',2.4);
    poly([-5,-22+tuck,-1,-23+tuck,3,-20+tuck,.4,-14+tuck,-.8,-11.6+tuck,-7,-12.8+tuck,-6.5,-18+tuck],'#d96138');
    poly([-6,-20+tuck,-3,-21+tuck,-4,-13+tuck,-7,-12.8+tuck],'#ae4a31');
    line([-1,-20+tuck,3,-15+tuck,7,-16+tuck],'#e57440',3.6);
    line([7,-16+tuck,8.8,-16.6+tuck],'#284a55',2.6);
    line([8,-16+tuck,3,1],'#4c686e',1);
    line([1.8,-.3,4.6,.5],'#455e68',.9);
    line([-1,-22+tuck,-5,-23+tuck,-9,-21+tuck],'#fff2cd',2.1);
    disk(.15,-25.1+tuck,3.35,'#f1b17b');
    poly([-3.4,-25+tuck,-3.5,-27+tuck,-2.3,-29.3+tuck,.8,-30+tuck,3.1,-28.5+tuck,3.9,-25.8+tuck],'#294d59');
    line([-.55,-25.8+tuck,3.82,-26.4+tuck],'#f6d877',1.7);
    c.restore();
  }
}

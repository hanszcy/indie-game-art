// All board geometry is expressed in one fixed, 100-unit tile coordinate system.
const TILE = 100;
const point = (x, y) => x + ',' + y;
const metal = '#374d48';

function definitions() {
  return `<defs>
    <linearGradient id="carriage" x2="0" y2="1"><stop stop-color="#5b7369"/><stop offset=".18" stop-color="#354c46"/><stop offset=".85" stop-color="#243b38"/><stop offset="1" stop-color="#142727"/></linearGradient>
    <linearGradient id="glass" x2=".8" y2="1"><stop stop-color="#a8ac86"/><stop offset=".48" stop-color="#7c907a"/><stop offset="1" stop-color="#475f55"/></linearGradient>
    <linearGradient id="sill" x2="0" y2="1"><stop stop-color="#899182"/><stop offset=".23" stop-color="#566b5e"/><stop offset="1" stop-color="#2b3f39"/></linearGradient>
    <linearGradient id="litGlass" x2=".7" y2="1"><stop stop-color="#decf9c"/><stop offset=".6" stop-color="#b4a67a"/><stop offset="1" stop-color="#788774"/></linearGradient>
    <linearGradient id="castLight" x1=".15" y1="0" x2=".6" y2="1"><stop stop-color="#f1d59d" stop-opacity=".23"/><stop offset="1" stop-color="#ddd09b" stop-opacity=".02"/></linearGradient>
    <linearGradient id="wear" x2="0" y2="1"><stop stop-color="#f5d5a0" stop-opacity=".03"/><stop offset=".54" stop-color="#a7a28b" stop-opacity="0"/><stop offset="1" stop-color="#4b655d" stop-opacity=".16"/></linearGradient>
    <pattern id="grate" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(38)"><path d="M1 0v8" stroke="#95a189" stroke-width="2"/></pattern>
    <pattern id="fluting" width="7" height="7" patternUnits="userSpaceOnUse"><path d="M1 0v7" stroke="#172f2e" stroke-width="2"/><path d="M3 0v7" stroke="#577065" stroke-width="1"/></pattern>
    <pattern id="safety" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(42)"><rect width="22" height="22" fill="#565d48"/><rect width="9" height="22" fill="#aa9871"/></pattern>
    <filter id="print"><feTurbulence type="fractalNoise" baseFrequency=".50" numOctaves="3" stitchTiles="stitch"/></filter>
    <g id="bolt"><circle r="2.4" fill="#263a35"/><circle cy="-.55" r="1.7" fill="#a5a18a"/><path d="m-1 0 2-.6" stroke="#68735f" stroke-width=".65"/></g>
    <g id="panel"><rect x="4" y="4" width="92" height="92" fill="#152c2b"/><path d="M6 6h88v85H6z" fill="#607363"/><path d="M9 9h82v80H9z" fill="#3d554b"/><path d="M17 17h66v63H17z" fill="#243c37"/><path d="M21 21h58v54H21z" fill="url(#fluting)"/><path d="M20 72 72 20h8v6L29 76H20z" fill="#5e7462"/><path d="m23 71 51-51" stroke="#82917a" stroke-width="2"/><g><use href="#bolt" x="12" y="12"/><use href="#bolt" x="88" y="12"/><use href="#bolt" x="12" y="85"/><use href="#bolt" x="88" y="85"/></g><path d="M5 91h90v7H5z" fill="#20352f"/></g>
    <g id="window"><rect x="12" y="16" width="76" height="49" rx="5" fill="#142a29" stroke="#849083" stroke-width="1.5"/><rect x="17" y="21" width="66" height="39" rx="2" fill="url(#glass)"/><path d="m21 60 22-39h13L35 60zm36 0 17-30v9L62 60z" fill="#b5b395" opacity=".37"/><path d="M47 21h3v39h-3z" fill="#3b5147"/><path d="M17 52h65v8H17z" fill="#607665" opacity=".65"/><path d="M11 66h78" stroke="#8b947d" stroke-width="2"/></g>
    <g id="side"><path d="M0 0h100v100H0z" fill="#2d433e"/><path d="M0 0h9v100H0z" fill="#526456"/><path d="M13 0h56v100H13z" fill="#233b36"/><path d="M18 7h46v84H18z" fill="#566a5b"/><path d="M22 11h38v76H22z" fill="#344b41"/><path d="M23 12h36v74H23z" fill="url(#grate)" opacity=".40"/><path d="M66 0h17v100H66z" fill="url(#sill)"/><path d="M83 0h8v100h-8z" fill="url(#safety)"/><path d="M91 0h9v100h-9z" fill="#394b3e"/><path d="M0 96h82" stroke="#172e29" stroke-width="4"/><use href="#bolt" x="74" y="10"/><use href="#bolt" x="74" y="87"/></g>
    <g id="target"><g fill="none" stroke="#f0d6a0" stroke-width="3.2" stroke-linejoin="bevel"><path d="M11 26V13h14m50 0h14v13M11 74v13h14m50 0h14V74"/><path d="m50 20 28 30-28 30-28-30z" stroke="#5f5d46" stroke-width="7"/><path d="m50 20 28 30-28 30-28-30z" stroke-width="4"/></g><path d="m50 32 16 18-16 18-16-18z" fill="#a8543d"/><path d="M47 41h6v18h-6z" fill="#eed4a0"/></g>
   </defs>`;
}

function floor(x, y) {
  const t = (x * 13 + y * 41) % 11;
  const shades = ['#939781','#969985','#9e9c84','#8e947f','#929783','#999b86'];
  let boards = '';
  for (let i = 0; i < 3; i++) {
    const top = i * 33.333;
    boards += `<rect x="0" y="${top}" width="100" height="34" fill="${shades[(t + i * 3) % shades.length]}"/>`;
    boards += `<path d="M0 ${top + 1}h100" stroke="#525f53" stroke-width="1.25" opacity=".7"/><path d="M0 ${top+2.7}h100" stroke="#c3bea1" stroke-width=".8"/>`;
    const offset = (x * 67 + y * 43 + i * 17) % 66;
    if ((x + 2*y + i) % 3 === 1) {
      const line = top + 20 + (t % 5);
      boards += `<path d="M1 ${line} q13-1.3 25-.2t22-.9 35-.9l15-1.4m-55 1.1q4 3 14 2.3l20-.8" fill="none" stroke="#687264" stroke-width=".95" opacity=".57"/>`;
    }
    if ((x*2 + y + i*3) % 7 === 2) {
      boards += `<path d="M${offset} ${top+11}q12-4 23-.6-11 3.2-23 .6zm6 .3 8-.7" fill="none" stroke="#687365" stroke-width="1.1" opacity=".65"/>`;
    }
    boards += `<path d="M${12+offset} ${top+14}q10-1.2 18-1m-13 4 7-.3" fill="none" stroke="#57695a" stroke-width="1" opacity=".4"/>`;
  }
  return `<g transform="translate(${x*100} ${y*100})">${boards}<path d="M.8 0v100" stroke="#5d6959" stroke-width="1.6"/><path d="M2.9 0v100" stroke="#b4b499" stroke-width="1"/><g fill="#586455" opacity=".8"><circle cx="7" cy="9" r="1.15"/><circle cx="94" cy="24" r="1"/><circle cx="6" cy="58" r="1"/><circle cx="92" cy="75" r="1.2"/></g></g>`;
}

function train(w) {
  const width = w*TILE;
  const door = Math.floor(w/2);
  const fittings = Array.from({length:w},(_,x)=>{
    const ox = x*TILE;
    if (x === door) return `<g transform="translate(${ox})"><path d="M0 3h100v89H0z" fill="#1f3431"/><path d="M5 7h90v78H5z" fill="#55695b"/><path d="M10 9h80v71H10z" fill="#3c5145"/><path d="M13 52h74v26H13z" fill="url(#fluting)"/><path d="M25 16h50v24H25z" fill="#d4c59a" stroke="#293c32" stroke-width="2"/><text x="50" y="33" text-anchor="middle" font-family="serif" font-size="15" fill="#35463a" font-weight="bold">行 李</text><rect x="79" y="45" width="5" height="14" rx="2" fill="#b8a77f"/><path d="M0 87h100" stroke="#a2a089" stroke-width="3"/></g>`;
    const lit = x === 1 || x === w-2;
    const lamp = lit ? '<rect x="17" y="21" width="66" height="39" rx="2" fill="url(#litGlass)"/><path d="M17 21h66v8H17z" fill="#bcad83"/><path d="M17 28h66" stroke="#ded1ad" stroke-width="2"/><path d="M49 28v32" stroke="#536654" stroke-width="3"/><path d="m21 59 16-29h8L30 59z" fill="#e4d7b2" opacity=".3"/>' : '';
    return `<g transform="translate(${ox})"><use href="#window"/>${lamp}<path d="M0 9v78m4-78v78" stroke="#172e2b" opacity=".62"/><use href="#bolt" x="4" y="12"/><use href="#bolt" x="4" y="82"/></g>`;
  }).join('');
  return `<g><rect width="${width}" height="100" fill="url(#carriage)"/><path d="M0 5h${width}M0 72h${width}" stroke="#b2a079" stroke-width="2.4"/><path d="M0 77h${width}" stroke="#829076"/><path d="M0 89h${width}v11H0z" fill="#1e302d"/>${fittings}<path d="M0 98h${width}" stroke="#24352f" stroke-width="4"/></g>`;
}

function track(w, h) {
  const width=w*TILE;
  const sleepers=Array.from({length:w*3},(_,i)=>`<path d="m${i*35-16} 16 20 0 10 79-18 0z" fill="#665f4a" stroke="#27372e" stroke-width="2"/><path d="m${i*35-12} 20 8 68" stroke="#958b67" stroke-width="1.2"/>`).join('');
  return `<g transform="translate(0 ${(h-1)*TILE})"><rect width="${width}" height="100" fill="#293b34"/>${sleepers}<path d="M0 0h${width}v11H0z" fill="url(#safety)"/><path d="M0 12h${width}v7H0z" fill="#5c6c58"/><path d="M0 29h${width}v9H0zM0 73h${width}v10H0z" fill="#172821"/><path d="M0 28h${width}v5H0zM0 72h${width}v5H0z" fill="#93917c"/><path d="M0 28h${width}M0 72h${width}" fill="none" stroke="#c9bda0" stroke-width="1.4"/></g>`;
}

export function drawSurface(svg,state) {
  const {width:w,height:h,targets,walls,level}=state;
  const blocked=new Set(walls.map(p=>point(p.x,p.y)));
  const field=[];
  const piers=[];
  for(let y=1;y<h-1;y++) for(let x=1;x<w-1;x++){
    field.push(floor(x,y));
    if(blocked.has(point(x,y))) piers.push(`<use href="#panel" x="${x*100}" y="${y*100}"/><path d="M${x*100+3} ${(y+1)*100-2}h96l5 6h-98z" fill="#304538" opacity=".35"/>`);
  }
  const sides = Array.from({length:h-2},(_,i)=>`<use href="#side" y="${(i+1)*100}"/><use href="#side" transform="translate(${w*100} ${(i+1)*100}) scale(-1 1)"/>`).join('');
  const light = [1,w-2].map((x,i)=>{
    const a=x*100+17;
    return `<path d="M${a} 100h65l${i?-100:-78} ${(h-2)*100-3}h-94z" fill="url(#castLight)"/>`;
  }).join('');
  const wear = `<g clip-path="url(#deck)"><rect x="100" y="100" width="${(w-2)*100}" height="${(h-2)*100}" fill="url(#wear)"/>${light}<g fill="none" stroke="#536455" opacity=".19"><path d="M95 ${h*100-148}q73 4 119-56t126-78q73-14 147 14m-392 135q78 1 122-60t124-78q70-14 144 12" stroke-width="2.9" stroke-dasharray="22 3 5 1 14 2"/><path d="M161 86q-5 45 32 65t39 74m-80-140q-4 49 36 74t36 69" stroke-width="2" stroke-dasharray="32 2 4 1"/></g><g font-family="monospace" font-weight="bold" fill="#516753" opacity=".62"><text x="110" y="119" font-size="12" letter-spacing="1.5">D·L·R</text><text x="110" y="143" font-size="26">${String(level+1).padStart(2,'0')}</text></g></g>`;
  const topShade = `<path d="M100 100h${(w-2)*100}v7H100z M100 100h7v${(h-2)*100}h-7z" fill="#304237" opacity=".32"/>`;
  svg.setAttribute('viewBox',`0 0 ${w*TILE} ${h*TILE}`);
  svg.innerHTML = definitions()+`<defs><clipPath id="deck"><rect x="100" y="100" width="${(w-2)*100}" height="${(h-2)*100}"/></clipPath></defs><rect width="100%" height="100%" fill="${metal}"/>`+field.join('')+wear+targets.map(p=>`<use href="#target" x="${p.x*100}" y="${p.y*100}"/>`).join('')+topShade+piers.join('')+sides+train(w)+track(w,h)+`<rect width="100%" height="100%" filter="url(#print)" opacity=".11" style="mix-blend-mode:multiply" pointer-events="none"/>`;
}

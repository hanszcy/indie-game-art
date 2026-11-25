/* Original vector confections. One silhouette per type, with a shared light source. */
(function () {
  const defs = [
    ['heart','#ffb5a5','#f15962','#bf324f','#a9344c'],
    ['orange','#ffdf7e','#ffa63c','#e76e27','#bc5721'],
    ['bonbon','#fff49c','#f7d455','#e4a43c','#b58332'],
    ['mint','#c4f3bc','#74cda0','#399d85','#337d66'],
    ['star','#b0ebff','#72bcea','#5790cd','#3b739c'],
    ['shell','#f0c8f4','#c48cdb','#9a66b8','#805293']
  ];
  const parts = [
    '<path d="M32 54C25 50 9 39 8 26 7 15 14 10 21 10c5 0 9 3 11 7 4-7 10-9 16-6 8 4 10 10 8 18-3 11-16 21-24 25Z"/><path class="s" d="M14 29c-3-8 0-12 5-13m-2 19 1 1"/><path class="d" d="M35 47c7-5 13-10 16-17"/>',
    '<circle cx="32" cy="32" r="23.5"/><circle cx="32" cy="31.5" r="18" fill="#ffd36a" stroke="#fff0ad" stroke-width="2.5"/><g fill="#f99a3e" stroke="#fff0a3" stroke-width="1.45"><path d="M31 28.5 19 20q5-6 12-5ZM34 28l1-13q7 1 11 7ZM36 30.5l12-6q3 6 1 12ZM35.5 34l13 5q-3 6-10 9ZM32.5 35.5l3 13q-7 2-13-2ZM29.5 34l-9 10q-5-4-5-11ZM28.5 31l-13-1q0-5 3-8Z"/></g><path class="s" d="M15 18q3-4 8-6"/>',
    '<g transform="rotate(-22 32 32)"><path d="m16 26-11-5 1 9-3 6 3 7 12-6zm32 0 11-5-1 10 3 5-3 7-12-6z" fill="#f5cf60"/><path d="m9 28 8 4-9 6m47-10-8 4 8 5" fill="none" stroke="#c99841" stroke-width="1.5"/><rect x="15" y="16" width="34" height="32" rx="12"/><path d="m22 20 3 25m12-27 3 26" stroke="#e6ac3e" opacity=".65" stroke-width="2.8"/><path class="s" d="M21 26q0-4 5-5m3-1h2"/><path class="d" d="M31 44h4q6 0 9-5"/></g>',
    '<path d="M9 46c-2-14 4-27 18-32 10-3 18-2 27-7 4 12 2 25-5 34-8 10-22 13-34 9l-5 6-4-3z"/><path d="M12 49q18-13 33-31m-17 18-3-11m11 4 1-9m-14 21 12-1m5-15 8-1" fill="none" stroke="#3c9e81" stroke-width="2.8"/><path class="s" d="M14 35q2-12 13-16m5-2 4-1"/>',
    '<path d="M28 10q4-6 8 0l6 12 13 2q7 1 2 7l-10 9 2 13q1 7-5 4l-12-7-12 7q-6 3-5-4l2-13-10-9q-5-6 2-7l13-2z"/><path class="s" d="m25 26 6-13m-12 15-6 1"/><path class="d" d="m22 49 10-5 11 6"/>',
    '<path d="M19 48C12 43 5 35 7 29c1-4 4-6 7-6-1-5 2-10 7-11 3-1 6 0 8 2 2-5 8-6 12-2 3 1 4 4 4 7 7-1 12 5 10 11 6 3 4 10 0 14-4 4-9 7-14 8l-2 3-18-1z"/><path d="m22 46-8-17m14 17-5-27m10 27 1-29m4 29 6-21m-2 22 9-12" fill="none" stroke="#a86ebc" stroke-width="2.5"/><path class="s" d="M12 31q-.2-3 2-4m4-6q0-4 4-5m10 1q2-3 5-2"/><path class="d" d="M23 50q8 2 15 1"/>'
  ];
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns,'svg');
  svg.setAttribute('aria-hidden','true');
  svg.setAttribute('width',0); svg.setAttribute('height',0);
  svg.style.position = 'absolute';
  svg.innerHTML = '<defs>' + defs.map(([name,hi,mid,lo,stroke],i) =>
    '<linearGradient id="glaze'+i+'" x1=".17" y1="0" x2=".7" y2="1" gradientUnits="objectBoundingBox"><stop stop-color="'+hi+'"/><stop offset=".46" stop-color="'+mid+'"/><stop offset="1" stop-color="'+lo+'"/></linearGradient>'+
    '<symbol id="sweet'+i+'" viewBox="0 0 64 64"><g fill="url(#glaze'+i+')" stroke="'+stroke+'" stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5">'+parts[i]+'</g></symbol>').join('')+'</defs>';
  document.body.prepend(svg);
  window.sweetIcon = type => '<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><use href="#sweet'+type+'"></use></svg>';
  document.querySelectorAll('.backdrop i').forEach((el,i) => {el.innerHTML = window.sweetIcon([0,3,2,5,1,4][i]);});
})();

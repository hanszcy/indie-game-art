(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const game = new CandyMatch.Game();
  const names = CandyMatch.TYPES;
  const normalHelp = '轻点或滑动交换，连成三个同类糖果。';
  const cells = [];
  const pieces = new Map();
  const ui = {busy:false};
  window.candyGame = game;
  window.candyUI = ui;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let selected = null;
  let cursor = 0;
  let lastBoard = [];
  let touch = null;
  let suppressClick = 0;
  let audio = null;
  let soundOn = false;

  function note(frequency, duration=.13, offset=0) {
    if (!soundOn || !audio) return;
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    const start = audio.currentTime + offset;
    osc.type = 'sine';
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(.001,start);
    gain.gain.exponentialRampToValueAtTime(.065,start+.012);
    gain.gain.exponentialRampToValueAtTime(.001,start+duration);
    osc.connect(gain).connect(audio.destination);
    osc.start(start); osc.stop(start+duration+.015);
  }

  const pos = i => 'translate('+(i%7+7)%7*100+'%, '+Math.floor(i/7)*100+'%)';

  function goalHTML(g) {
    const done = g.collected >= g.target;
    return '<span class="goal'+(done?' done':'')+'" aria-label="'+names[g.type]+' 已收集 '+g.collected+'，目标 '+g.target+'">'+sweetIcon(g.type)+'<span>'+g.collected+'/'+g.target+'</span></span>';
  }

  function hud(state) {
    $('levelNum').textContent = '第 '+String(state.level+1).padStart(2,'0')+' 关';
    $('levelName').textContent = state.title;
    document.querySelectorAll('.level-dots i').forEach((el,i)=>el.classList.toggle('played',i<=state.level));
    $('moves').textContent = state.movesLeft;
    $('score').textContent = state.score;
    $('goals').innerHTML = state.goals.map(goalHTML).join('');
  }

  function renderBoard(state) {
    const ids = new Set();
    for (let i=0; i<state.board.length; i++) {
      const tile = state.board[i];
      cells[i].setAttribute('aria-label','第'+(Math.floor(i/7)+1)+'行第'+(i%7+1)+'列，'+(tile?names[tile.type]:'空格'));
      cells[i].setAttribute('aria-pressed',String(i===selected));
      cells[i].classList.toggle('selected',i===selected);
      cells[i].tabIndex = i===cursor ? 0 : -1;
      if (!tile) continue;
      ids.add(tile.id);
      let piece = pieces.get(tile.id);
      if (!piece) {
        piece = document.createElement('div');
        piece.className = 'piece';
        piece.dataset.id = String(tile.id);
        $('pieces').append(piece);
        pieces.set(tile.id,piece);
      }
      if (piece.dataset.type !== String(tile.type)) {
        piece.innerHTML = sweetIcon(tile.type);
        piece.dataset.type = String(tile.type);
      }
      piece.style.transform = pos(i);
    }
    for (const [id,piece] of pieces) {
      if (!ids.has(id)) {piece.remove(); pieces.delete(id);}
    }
    lastBoard = state.board;
  }

  function animate(el,keyframes,duration,easing) {
    if (!el || motion.matches) return Promise.resolve();
    const anim = el.animate(keyframes,{duration,easing});
    return anim.finished.catch(()=>{});
  }

  function shout(text) {
    $('chainFlash').textContent = text;
    if (!motion.matches) $('chainFlash').animate([
      {opacity:0,transform:'translate(-50%,-35%) scale(.85)'},
      {opacity:1,offset:.18,transform:'translate(-50%,-50%) scale(1)'},
      {opacity:1,offset:.74},
      {opacity:0,transform:'translate(-50%,-75%)'}
    ],{duration:600,easing:'ease-out'});
  }

  async function showEvent(ev) {
    const state = ev.state;
    if (ev.kind === 'clear') {
      hud(state);
      if (ev.chain>1) shout('连消 ×'+ev.chain);
      note(480+ev.chain*90); note(655+ev.chain*95,.13,.055);
      await Promise.all(ev.tiles.map(tile => animate(pieces.get(tile.id)?.firstElementChild,[
        {transform:'scale(1)',opacity:1},{transform:'scale(1.18)',opacity:1,offset:.35},{transform:'scale(.22)',opacity:0}
      ],180,'ease-in')));
      renderBoard(state);
      return;
    }
    const old = new Map(lastBoard.flatMap((tile,i)=>tile?[[tile.id,i]]:[]));
    for (const move of ev.movements || []) old.set(move.id,move.from);
    hud(state); renderBoard(state);
    if (ev.kind==='shuffle') {shout('糖果换位');$('message').textContent='暂时没有可交换的糖果，已重新排列。';}
    const duration = ev.kind==='fall' ? 255 : ev.kind==='shuffle' ? 330 : 158;
    const waits = [];
    state.board.forEach((tile,to)=>{
      const from = old.get(tile?.id);
      if (from===undefined || from===to) return;
      waits.push(animate(pieces.get(tile.id),[{transform:pos(from)},{transform:pos(to)}],
        duration,ev.kind==='fall'?'cubic-bezier(.42,0,.55,1)':'ease-in-out'));
    });
    await Promise.all(waits);
  }

  function setCursor(index,focus=false) {
    cells[cursor].tabIndex = -1;
    cursor = index;
    cells[cursor].tabIndex = 0;
    if (focus) cells[cursor].focus({preventScroll:true});
  }

  function clearHints() { for(const cell of cells) cell.classList.remove('hinted'); }
  function choose(index) {
    if (ui.busy || game.status!=='playing') return;
    clearHints();
    setCursor(index);
    if (selected!==null && CandyMatch.adjacent(selected,index)) {play(selected,index);return;}
    selected = selected===index ? null : index;
    renderBoard(game.getState());
    $('message').textContent = selected===null ? normalHelp : '已选中'+names[game.board[index].type]+'，再点一颗相邻糖果。';
  }

  function finish(state) {
    if (state.status==='playing') return;
    const won = state.status==='won', final = state.level===state.levelCount-1;
    $('resultIcon').innerHTML = sweetIcon(won?4:0);
    $('resultTitle').textContent = won ? (final?'三单全部完成！':'订单完成！') : '步数已用完';
    $('resultText').textContent = won ? ('本关得分 '+state.score+'，剩余 '+state.movesLeft+' 步。') : '再试一次，优先收集订单里的糖果。';
    $('advance').textContent = won ? (final?'从头再玩':'下一关') : '再试一次';
    $('again').hidden = !won;
    $('result').hidden = false;
    $('advance').focus({preventScroll:true});
    $('message').textContent = won?'目标糖果已全部收集。':'本单目标尚未完成。';
    if(won){note(660);note(825,.13,.11);note(990,.2,.22);}
  }

  async function play(a,b) {
    if (ui.busy || game.status!=='playing') return;
    ui.busy=true; $('board').setAttribute('aria-busy','true');
    $('restart').disabled=true; $('hint').disabled=true;
    selected=null; clearHints();
    renderBoard(game.getState());
    const result=game.swap(a,b);
    try {
      $('message').textContent = result.valid ? normalHelp : '这次交换没有连成三个，步数保留。';
      for (const event of result.events) await showEvent(event);
      hud(result.state); renderBoard(result.state);
      if(!result.valid) note(230,.11);
      finish(result.state);
    } finally {
      ui.busy=false; $('board').setAttribute('aria-busy','false');
      $('restart').disabled=false; $('hint').disabled=game.status!=='playing';
    }
  }

  function start(level,focus=true) {
    if (ui.busy) return;
    selected=null; clearHints(); setCursor(0);
    const state=game.reset(level);
    $('result').hidden=true; $('hint').disabled=false;
    $('message').textContent=normalHelp;
    hud(state);renderBoard(state);
    if(focus) cells[0].focus({preventScroll:true});
  }

  for(let i=0;i<49;i++){
    const cell=document.createElement('button');
    cell.type='button';cell.className='cell';cell.dataset.index=String(i);
    $('slots').append(cell);cells.push(cell);
  }
  $('slots').addEventListener('click',event=>{
    const el=event.target.closest('[data-index]');
    if(el && !(event.detail>0 && performance.now()<suppressClick)) choose(Number(el.dataset.index));
  });
  $('slots').addEventListener('keydown',event=>{
    const el=event.target.closest('[data-index]');
    if(!el || ui.busy || game.status!=='playing') return;
    const i=Number(el.dataset.index);
    const next={ArrowUp:i-7,ArrowDown:i+7,ArrowLeft:i-1,ArrowRight:i+1}[event.key];
    if(next!==undefined){event.preventDefault();if(CandyMatch.adjacent(i,next))setCursor(next,true);}
    if(event.key==='Escape'){selected=null;clearHints();renderBoard(game.getState());$('message').textContent=normalHelp;}
  });
  $('slots').addEventListener('pointerdown',event=>{
    if(ui.busy || game.status!=='playing' || !event.isPrimary || event.button!==0)return;
    const el=event.target.closest('[data-index]');
    if(!el)return;
    touch={i:Number(el.dataset.index),x:event.clientX,y:event.clientY,id:event.pointerId};
    el.setPointerCapture(event.pointerId);
  });
  $('slots').addEventListener('pointercancel',()=>{touch=null;});
  $('slots').addEventListener('pointerup',event=>{
    if(!touch || touch.id!==event.pointerId)return;
    const {i,x,y}=touch;touch=null;
    const dx=event.clientX-x,dy=event.clientY-y;
    if(Math.max(Math.abs(dx),Math.abs(dy))<15)return;
    suppressClick=performance.now()+300;
    const next=i+(Math.abs(dx)>Math.abs(dy)?Math.sign(dx):Math.sign(dy)*7);
    if(CandyMatch.adjacent(i,next)){setCursor(next);play(i,next);}
  });
  $('hint').addEventListener('click',()=>{
    if(ui.busy)return;
    const hint=game.hint();
    if(!hint)return;
    selected=null;renderBoard(game.getState());clearHints();
    cells[hint.a].classList.add('hinted');cells[hint.b].classList.add('hinted');
    $('message').textContent='交换虚线框中的两颗糖果。';
  });
  $('sound').addEventListener('click',async()=>{
    try{
      if(!audio) audio=new (window.AudioContext||window.webkitAudioContext)();
      if(audio.state==='suspended')await audio.resume();
      soundOn=!soundOn;
      $('sound').setAttribute('aria-pressed',String(soundOn));
      $('sound').title=soundOn?'关闭音效':'开启音效';
      $('sound').setAttribute('aria-label',$('sound').title);
      note(620);
    }catch{$('message').textContent='当前浏览器无法播放音效。';}
  });
  $('advance').addEventListener('click',()=>start(game.status==='won'?(game.level+1)%CandyMatch.LEVELS.length:game.level));
  $('again').addEventListener('click',()=>start(game.level));
  $('restart').addEventListener('click',()=>start(game.level));
  $('result').addEventListener('keydown',event=>{
    if(event.key!=='Tab') return;
    event.preventDefault();
    if($('again').hidden) $('advance').focus();
    else (document.activeElement===$('advance')?$('again'):$('advance')).focus();
  });
  start(0,false);
})();

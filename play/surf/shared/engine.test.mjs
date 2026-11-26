import assert from 'node:assert/strict';
import {SurfRun,water,COURSE_LENGTH} from './engine.js';
const step=(s,n)=>{let out=[];for(let i=0;i<n;i++)out.push(...s.update(1/120));return out};
let s=new SurfRun();assert.equal(s.phase,'ready');step(s,200);assert.equal(s.x,120);s.start();s.press();step(s,60);assert.equal(s.charge,1);assert.equal(s.release(),true);assert.equal(s.release(),false);assert.equal(s.grounded,false);assert.equal(s.jumps,1);assert(step(s,150).some(e=>e.type==='land'));assert.equal(s.y,water(s.x,s.time));s.togglePause();let x=s.x;step(s,200);assert.equal(s.x,x);s.togglePause();assert.equal(s.phase,'playing');s.reset();assert.equal(s.health,3);assert.equal(s.shells,0);
let fail=new SurfRun();fail.start();step(fail,8000);assert.equal(fail.phase,'lost');assert.equal(fail.health,0);
// Play the complete course using legal press/release inputs, with no state edits.
function auto(){const g=new SurfRun();g.start();let air=false;for(let n=0;n<10000&&g.phase==='playing';n++){let next=g.objects.find(o=>o.type!=='shell'&&!o.hit&&o.x>g.x);if(g.grounded&&next){let gap=next.x-g.x;if(gap<145&&!g.holding)g.press();if(g.holding&&gap<80)g.release();}g.update(1/120);}return g;}
const a=auto(),b=auto();assert.equal(a.phase,'won');assert.equal(a.health,3);assert(a.shells>20);assert.equal(a.distance,COURSE_LENGTH/7.5);assert.deepEqual(a,b);console.log('PASS ready, hold/release, landing contact, pause, reset, loss, legal-input full-course win, deterministic state', {distance:a.distance,shells:a.shells,health:a.health,jumps:a.jumps,time:a.time.toFixed(2)});

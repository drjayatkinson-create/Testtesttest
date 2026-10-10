const assert=require('node:assert/strict');
function calc(a,b,c,h){let x=(a?1.67:1)*(b?1.89:1)*(c?1.82:1)*({none:1,rete:1.81,soft:2.83}[h]);return 100*(1-Math.pow(.94,x));}
assert.ok(Math.abs(calc(false,false,false,'none')-6)<1e-8);
let n=0;for(let a of [false,true])for(let b of [false,true])for(let c of [false,true])for(let h of ['none','rete','soft']){let x=calc(a,b,c,h);assert.ok(Number.isFinite(x)&&x>=6&&x<100);n++;}
assert.equal(n,24);assert.ok(calc(true,true,true,'soft')>calc(true,true,true,'rete'));
console.log('Passed 24 combinations and baseline checks.');

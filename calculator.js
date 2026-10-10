'use strict';
const $ = id => document.getElementById(id);
const inputs = ['ldh','hcg','lvi'];
const names = [['LDH', 'ldh'], ['β-hCG', 'hcg'], ['LVI', 'lvi'], ['Hilum invasion', 'hilum']];
function estimateRisk({ldh=false,hcg=false,lvi=false,hilum='none'}) {
  const factors = (ldh?1.67:1)*(hcg?1.89:1)*(lvi?1.82:1)*(hilum==='rete'?1.81:hilum==='soft'?2.83:1);
  return 100*(1-Math.pow(0.94,factors));
}
function state(){return {ldh:$('ldh').checked,hcg:$('hcg').checked,lvi:$('lvi').checked,hilum:$('hilum').value};}
function update(){const s=state(), risk=estimateRisk(s);$('risk').textContent=risk.toFixed(1)+'%';$('fill').style.width=Math.min(100,risk)+'%';$('risknote').textContent='Illustrative estimate using rounded published hazard ratios; not an exact fitted-model output.';$('dots').replaceChildren();for(const [name,key] of names){const line=document.createElement('div');line.className='factor-row';const dot=document.createElement('span');dot.className='dot'+((key==='hilum'?s.hilum!=='none':s[key])?' on':'');const txt=document.createElement('span');txt.textContent=name+(key==='hilum'&&s.hilum!=='none'?' — '+(s.hilum==='rete'?'rete only':'hilar soft tissue'):'');line.append(dot,txt);$('dots').append(line);}}
inputs.forEach(id=>$(id).addEventListener('change',update));$('hilum').addEventListener('change',update);
$('reset').addEventListener('click',()=>{inputs.forEach(id=>$(id).checked=false);$('hilum').value='none';update();});
$('copy').addEventListener('click',async()=>{const s=state();const t=`Uro60 research prototype v0.1.0 — seminoma surveillance\nLDH elevated: ${s.ldh}\nβ-hCG elevated: ${s.hcg}\nLVI: ${s.lvi}\nHilum: ${s.hilum}\nApproximate five-year relapse risk: ${estimateRisk(s).toFixed(1)}%\nNot clinically validated. Source: Wagner et al., JCO 2024, doi:10.1200/JCO.23.00959. Software: Dr Jay Atkinson.`;try{await navigator.clipboard.writeText(t);$('copy').textContent='Copied';}catch{$('copy').textContent='Copy unavailable';}setTimeout(()=>{$('copy').textContent='Copy research summary';},2000);});
function tab(non){$('seminoma').classList.toggle('hidden',non);$('nonseminoma').classList.toggle('hidden',!non);$('semTab').classList.toggle('active',!non);$('nonTab').classList.toggle('active',non);}
$('semTab').addEventListener('click',()=>tab(false));$('nonTab').addEventListener('click',()=>tab(true));
update();

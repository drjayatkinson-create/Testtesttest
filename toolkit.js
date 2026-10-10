'use strict';
const catalogue=[
['Renal','Leibovich 2003','Post-nephrectomy clear-cell RCC recurrence risk','Planned'],
['Renal','VENUSS','Papillary RCC recurrence risk','Planned'],
['Renal','IMDC / Heng','Metastatic RCC prognosis','Planned'],
['Renal','RENAL nephrometry','Renal mass anatomical complexity','Planned'],
['Renal','Bosniak v2019','Cystic renal lesion classification','Planned'],
['Renal','SSIGN','Clear-cell RCC prognostic score','Planned'],
['Bladder','EAU NMIBC risk groups','NMIBC progression risk groups','Planned'],
['Bladder','EORTC / CUETO','NMIBC recurrence and progression models','Planned'],
['Bladder','BCG-unresponsive classifier','Disease timing and BCG adequacy','Planned'],
['Prostate','EAU / CPG risk groups','Localised prostate cancer risk','Planned'],
['Prostate','CAPRA','Prostate cancer prognostic score','Planned'],
['Prostate','Briganti','Pelvic lymph-node invasion estimate','Planned'],
['Prostate','PSA doubling time','Serial PSA kinetics','Prototype'],
['Testicular','IGCCCG 2021','Metastatic germ-cell tumour prognostic groups','Planned'],
['Testicular','Wagner relapse evidence','Stage I relapse evidence explorer','Existing on drjay.uk'],
['Upper tract','EAU UTUC risk stratification','Upper-tract urothelial cancer','Planned'],
['LUTS','BOOI / BCI','Pressure-flow obstruction and contractility','Prototype'],
['LUTS','IPSS','Symptom score and QoL','Planned'],
['Trauma','AAST injury grading','Urogenital trauma classification','Planned'],
['General','Clavien–Dindo','Postoperative complication grading','Planned'],
['General','NNT / ARR / NNH','Clinical evidence calculations','Planned']
];
let mode='mdt',filter='All',selected='PSA doubling time';
const $=id=>document.getElementById(id);
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function render(){const q=$('search').value.toLowerCase();const groups=['All',...new Set(catalogue.map(x=>x[0]))];$('filters').innerHTML=groups.map(g=>`<button class="${filter===g?'active':''}" data-filter="${esc(g)}">${esc(g)}</button>`).join('');$('filters').querySelectorAll('button').forEach(b=>b.onclick=()=>{filter=b.dataset.filter;render()});const rows=catalogue.filter(x=>(filter==='All'||x[0]===filter)&&x.join(' ').toLowerCase().includes(q));$('count').textContent=`${rows.length} scoring systems`; $('cards').innerHTML=rows.map(x=>`<article class="card"><span class="pill">${esc(x[0])}</span><h3>${esc(x[1])}</h3><p>${esc(mode==='mdt'?x[2]:'FRCS focus: definitions, variables, scoring table, examiner traps and viva question.')}</p><p class="small">${esc(x[3])}</p>${x[3]==='Prototype'?`<button data-open="${esc(x[1])}">Open prototype</button>`:''}</article>`).join('');$('cards').querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>{selected=b.dataset.open;renderCalc();$('calculator').scrollIntoView({behavior:'smooth'})});renderCalc()}
function renderCalc(){ $('calc-title').textContent=selected;const c=$('calc-content');if(selected==='PSA doubling time'){c.innerHTML=`<p>Enter two positive PSA results and the interval between samples. This two-point estimate assumes exponential PSA kinetics; more measurements and clinical context are preferable.</p><div class="layout"><label>Earlier PSA (ng/mL)<input type="number" min="0.001" step="any" id="psa1" value="0.2"></label><label>Later PSA (ng/mL)<input type="number" min="0.001" step="any" id="psa2" value="0.4"></label><label>Interval (months)<input type="number" min="0.001" step="any" id="months" value="6"></label></div><div class="result" id="out"></div><div id="revision"></div><button id="copy">Copy summary</button>`;['psa1','psa2','months'].forEach(id=>$(id).oninput=calculatePSA);$('copy').onclick=()=>navigator.clipboard?.writeText($('out').textContent+' — two-point PSA doubling time, educational estimate');calculatePSA()}else{c.innerHTML=`<p>Enter detrusor pressure at maximum flow (PdetQmax) and maximum flow rate (Qmax).</p><label>PdetQmax (cmH₂O)<input id="pdet" type="number" min="0" step="any" value="60"></label><label>Qmax (mL/s)<input id="qmax" type="number" min="0.1" step="any" value="10"></label><div class="result" id="out"></div><div id="revision"></div><button id="copy">Copy summary</button>`;['pdet','qmax'].forEach(id=>$(id).oninput=calculateBOOI);$('copy').onclick=()=>navigator.clipboard?.writeText($('out').textContent+' — educational pressure-flow indices');calculateBOOI()}}
function calculatePSA(){const a=+$('psa1').value,b=+$('psa2').value,t=+$('months').value;const valid=a>0&&b>0&&t>0;const d=valid&&b>a?t*Math.LN2/Math.log(b/a):NaN;$('out').textContent=!valid?'Enter valid positive values':b===a?'No measurable increase':b<a?'PSA falling; doubling time not applicable':`${d.toFixed(2)} months`; $('revision').innerHTML=mode==='frcs'?'<div class="note"><strong>Formula:</strong> PSADT = interval × ln(2) / ln(PSA₂ / PSA₁).<p><strong>Examiner trap:</strong> Two-point estimates are unstable; assay variation, treatment context and timing matter.</p><strong>Viva:</strong> How would you assess biochemical recurrence after radical prostatectomy?</div>':''}
function calculateBOOI(){const p=+$('pdet').value,q=+$('qmax').value;if(!Number.isFinite(p)||!Number.isFinite(q)||p<0||q<=0){$('out').textContent='Enter valid measurements';return}const booi=p-2*q,bci=p+5*q;const obstruction=booi>40?'Obstructed':booi<20?'Unobstructed':'Equivocal';const contractility=bci>150?'Strong':bci<100?'Weak':'Normal';$('out').textContent=`BOOI ${booi.toFixed(1)} (${obstruction}) · BCI ${bci.toFixed(1)} (${contractility})`; $('revision').innerHTML=mode==='frcs'?'<div class="note"><strong>BOOI:</strong> PdetQmax − 2 × Qmax; >40 obstructed, 20–40 equivocal, <20 unobstructed.<p><strong>BCI:</strong> PdetQmax + 5 × Qmax; <100 weak, 100–150 normal, >150 strong.</p><strong>Examiner trap:</strong> Indices are interpretation aids, not substitutes for pressure-flow traces and clinical context.<p><strong>Viva:</strong> Can a patient have both outlet obstruction and detrusor underactivity?</p></div>':''}
$('search').oninput=render;['mdt','frcs'].forEach(m=>$(m).onclick=()=>{mode=m;['mdt','frcs'].forEach(x=>{$(x).classList.toggle('active',x===m);$(x).setAttribute('aria-pressed',x===m)});render()});render();

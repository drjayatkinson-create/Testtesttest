
// Non-seminoma: factor-combination explorer only; no fabricated individual predictions.
const nsKeys=['ns-lvi','ns-hilar','ns-ec','ns-size'];
function updateNS(){
 const l=$('ns-lvi').checked,h=$('ns-hilar').checked,e=$('ns-ec').value,sz=Number($('ns-size').value);
 const factors=[['LVI',l],['Hilar soft tissue invasion',h],['Embryonal carcinoma present',e!=='absent'],['EC predominant',e==='pred']];
 $('ns-dots').replaceChildren();
 for(const [label,on] of factors){const line=document.createElement('div');line.className='factor-row';const dot=document.createElement('span');dot.className='dot'+(on?' on':'');const t=document.createElement('span');t.textContent=label;line.append(dot,t);$('ns-dots').append(line);}
 const count=Number(l)+Number(h)+Number(e!=='absent');$('ns-profile').textContent=count===0?'No selected adverse factors':count+' selected adverse factor'+(count===1?'':'s');
 const multiplier=(l?3.48:1)*(h?1.70:1)*(e==='pred'?4.06:e==='nonpred'?2.49:1)*Math.pow(sz/2.1,Math.log2(1.60));
 const estimated=100*(1-Math.pow(0.95,multiplier));
 $('ns-estimate').textContent=Number.isFinite(estimated)&&sz>0?estimated.toFixed(1)+'%':'—';
 $('ns-size-note').textContent=Number.isFinite(sz)&&sz>0?'Tumour size: '+sz.toFixed(1)+' cm (continuous model predictor).':'Enter a valid positive tumour size.';
}
nsKeys.forEach(id=>$(id).addEventListener('input',updateNS));
$('ns-reset').addEventListener('click',()=>{$('ns-lvi').checked=false;$('ns-hilar').checked=false;$('ns-ec').value='absent';$('ns-size').value='3.2';updateNS();});
updateNS();

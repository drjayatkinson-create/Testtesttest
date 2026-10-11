"use strict";
function updateRenal(){const ids=['r-radius','r-exo','r-near','r-polar'];const vals=ids.map(id=>Number(document.getElementById(id).value));const sum=vals.reduce((a,b)=>a+b,0);const category=sum<=6?'Low':sum<=9?'Moderate':'High';const suffix=document.getElementById('r-ap').value+document.getElementById('r-h').value;document.getElementById('renal-result').textContent=`RENAL ${sum}${suffix} — ${category} anatomical complexity (${vals.join(' + ')}).`;}
document.querySelectorAll('#renal-fields select').forEach(el=>el.addEventListener('change',updateRenal));updateRenal();

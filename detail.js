(function(){
  var main=document.getElementById('case');
  var id=new URLSearchParams(location.search).get('id');
  var c=(window.CASES||[]).filter(function(x){return x.id===id;})[0];
  function el(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e;}
  if(!c){
    var s=el('section','lost'),w=el('div','wrap');
    w.appendChild(el('h1','d-title','Not found'));
    w.appendChild(el('p','d-sum','This case study does not exist (yet).'));
    var b=el('a','back','All case studies');b.href='index.html#cases';w.appendChild(b);
    s.appendChild(w);main.appendChild(s);document.title='Not found | Yurida Zani';return;
  }
  document.title=c.title+' | Yurida Zani';
  var hero=el('header','hero'),hw=el('div','wrap');
  var back=el('a','back','All case studies');back.href='index.html#cases';hw.appendChild(back);
  hw.appendChild(el('h1','d-title',c.title));
  if(c.summary)hw.appendChild(el('p','d-sum',c.summary));
  var meta=el('dl','meta');
  [['Category',c.category],['Date',c.date],['Status',c.status],['Tools',(c.tools||[]).join(', ')]].forEach(function(m){
    if(!m[1])return;var d=el('div');d.appendChild(el('dt','',m[0]));d.appendChild(el('dd','',m[1]));meta.appendChild(d);
  });
  hw.appendChild(meta);hero.appendChild(hw);main.appendChild(hero);
  (c.sections||[]).forEach(function(sec){
    var s=el('section','d-sec'),w=el('div','wrap grid');
    w.appendChild(el('h2','lab',sec.heading||''));
    var m=el('div','main');
    (sec.text||[]).forEach(function(t){m.appendChild(el('p','',t));});
    if(sec.list&&sec.list.length){var l=el(sec.ordered?'ol':'ul');sec.list.forEach(function(i){l.appendChild(el('li','',i));});m.appendChild(l);}
    if(sec.image&&sec.image.src){
      var f=el('figure'),im=el('img');im.src=sec.image.src;im.alt=sec.image.alt||'';f.appendChild(im);
      if(sec.image.caption)f.appendChild(el('figcaption','',sec.image.caption));m.appendChild(f);
    }
    w.appendChild(m);s.appendChild(w);main.appendChild(s);
  });
})();

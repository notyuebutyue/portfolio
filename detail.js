(window.casesReady||Promise.resolve()).then(function(){
  var main=document.getElementById('case');
  var id=new URLSearchParams(location.search).get('id');
  var c=(window.CASES||[]).filter(function(x){return x.id===id;})[0];
  function el(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e;}
  function stk(cls,txt,r){var s=el('span','stk '+cls,txt);s.style.setProperty('--r',r);return s;}
  if(!c){
    var s=el('section','lost'),w=el('div','wrap');
    w.appendChild(el('h1','d-title','Not found'));
    w.appendChild(el('p','d-sum','This case study does not exist (yet).'));
    var b=el('a','back','All case studies');b.href='index.html#cases';w.appendChild(b);
    s.appendChild(w);main.appendChild(s);document.title='Not found | Yurida Zani';return;
  }
  document.title=c.title+' | Yurida Zani';
  var md=document.querySelector('meta[name=description]');if(md&&c.summary)md.setAttribute('content',c.summary);

  var hero=el('header','hero'),hw=el('div','wrap');
  var back=el('a','back','All case studies');back.href='index.html#cases';hw.appendChild(back);
  hw.appendChild(el('h1','d-title',c.title));
  if(c.summary)hw.appendChild(el('p','d-sum',c.summary));
  var st=el('div','hero-stk');
  st.appendChild(stk('burst','Still learning','8deg'));
  if(c.status)st.appendChild(stk('round',c.status,'-9deg'));
  hw.appendChild(st);hero.appendChild(hw);main.appendChild(hero);

  var body=el('div','wrap dl'),col=el('div','dl-main'),aside=el('aside','dl-aside');
  (c.sections||[]).forEach(function(sec,i){
    var s=el('div','blk');s.id='s'+i;
    s.appendChild(el('h2','',sec.heading||''));
    (sec.text||[]).forEach(function(t){s.appendChild(el('p','',t));});
    if(sec.list&&sec.list.length){var l=el(sec.ordered?'ol':'ul');sec.list.forEach(function(x){l.appendChild(el('li','',x));});s.appendChild(l);}
    if(sec.code){var pre=el('pre','code');pre.textContent=sec.code;s.appendChild(pre);}
    if(sec.ticket){
      var t=sec.ticket,card=el('div','tk'),hd=el('div','tk-h'),chips=el('span','tk-c');
      hd.appendChild(el('strong','tk-id',t.id||''));
      if(t.status)chips.appendChild(el('span','chip ok',t.status));
      if(t.priority)chips.appendChild(el('span','chip',t.priority+' priority'));
      hd.appendChild(chips);card.appendChild(hd);
      if(t.meta&&t.meta.length){var mg=el('dl','tk-m');t.meta.forEach(function(m){var d=el('div');d.appendChild(el('dt','',m[0]));d.appendChild(el('dd','',m[1]));mg.appendChild(d);});card.appendChild(mg);}
      var tb=el('dl','tk-b');
      (t.rows||[]).forEach(function(r){
        tb.appendChild(el('dt','',r[0]));var dd=el('dd');
        if(Array.isArray(r[1])){var tl=el(r[2]==='ordered'?'ol':'ul');r[1].forEach(function(x){tl.appendChild(el('li','',x));});dd.appendChild(tl);}
        else dd.textContent=r[1];
        tb.appendChild(dd);
      });
      card.appendChild(tb);s.appendChild(card);
    }
    [].concat(sec.image||[],sec.images||[]).forEach(function(g){
      if(!g||!g.src)return;
      var f=el('figure'),im=el('img');im.onerror=function(){if(f.parentNode)f.parentNode.removeChild(f);};
      var base=g.src,ext=['png','jpg','jpeg','webp'],n=0;
      if(/\.[a-z0-9]+$/i.test(base))im.src=base;
      else{im.onerror=function(){n++;if(n<ext.length)im.src=base+'.'+ext[n];else if(f.parentNode)f.parentNode.removeChild(f);};im.src=base+'.'+ext[0];}
      im.alt=g.alt||'';im.loading='lazy';f.appendChild(im);
      if(g.caption)f.appendChild(el('figcaption','',g.caption));s.appendChild(f);
    });
    col.appendChild(s);
  });

  var card=el('div','card');card.appendChild(el('h3','','At a glance'));
  var dl=el('dl');
  [['Category',c.category],['Status',c.status],['Date',c.date],['Tools',(c.tools||[]).join(', ')]].forEach(function(m){
    if(!m[1])return;dl.appendChild(el('dt','',m[0]));dl.appendChild(el('dd','',m[1]));
  });
  card.appendChild(dl);aside.appendChild(card);
  var nav=el('nav','card');nav.setAttribute('aria-label','On this page');nav.appendChild(el('h3','','On this page'));
  var ul=el('ul');
  (c.sections||[]).forEach(function(sec,i){var li=el('li'),a=el('a','',sec.heading||'');a.href='#s'+i;li.appendChild(a);ul.appendChild(li);});
  nav.appendChild(ul);aside.appendChild(nav);
  body.appendChild(col);body.appendChild(aside);main.appendChild(body);
});

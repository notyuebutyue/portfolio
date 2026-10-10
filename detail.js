(function(){
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
    [].concat(sec.image||[],sec.images||[]).forEach(function(g){
      if(!g||!g.src)return;
      var f=el('figure'),im=el('img');im.onerror=function(){if(f.parentNode)f.parentNode.removeChild(f);};
      im.src=g.src;im.alt=g.alt||'';im.loading='lazy';f.appendChild(im);
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
})();

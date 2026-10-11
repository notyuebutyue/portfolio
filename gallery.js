/*
  Screenshot galleries for the featured projects on the home page.
  Files go in the images/ folder and are named <key>-1, <key>-2, ... (png, jpg, jpeg or webp all work).
  n    : how many screenshots there are
  caps : optional captions in order, e.g. caps: ["Home page", "Booking form"]
*/
(function(){
  var SHOTS={
    kanagara:{title:'Kanagara Coffee Space',n:7,caps:[]},
    aci:{title:'ACI Audit Portal',n:5,caps:[]}
  };
  var EXT=['png','jpg','jpeg','webp'];
  function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!==undefined)e.textContent=x;return e;}
  function load(img,base,fail){
    var i=0;
    img.onerror=function(){i++;if(i<EXT.length)img.src=base+'.'+EXT[i];else if(fail)fail();};
    img.src=base+'.'+EXT[0];
  }
  var lb,im,cap,ct,xb,pv,nx,cur,idx=0,opener;
  function show(){
    var s=SHOTS[cur];
    im.alt=s.title+' screenshot '+(idx+1)+' of '+s.n;
    cap.textContent=s.caps[idx]||'';
    ct.textContent=(idx+1)+' / '+s.n;
    load(im,'images/'+cur+'-'+(idx+1),function(){cap.textContent='This screenshot is not available yet.';});
  }
  function go(d){var n=SHOTS[cur].n;idx=(idx+d+n)%n;show();}
  function close(){lb.hidden=true;document.documentElement.style.overflow='';if(opener)opener.focus();}
  function build(){
    lb=el('div','lb');lb.hidden=true;lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Project screenshots');
    xb=el('button','lb-x','Close');xb.type='button';xb.onclick=close;
    var fig=el('figure');im=el('img');cap=el('figcaption');fig.appendChild(im);fig.appendChild(cap);
    var bar=el('div','lb-bar');pv=el('button','','Previous');nx=el('button','','Next');ct=el('span');
    pv.type=nx.type='button';pv.onclick=function(){go(-1);};nx.onclick=function(){go(1);};
    bar.appendChild(pv);bar.appendChild(ct);bar.appendChild(nx);
    lb.appendChild(xb);lb.appendChild(fig);lb.appendChild(bar);
    lb.addEventListener('click',function(e){if(e.target===lb)close();});
    document.addEventListener('keydown',function(e){
      if(lb.hidden)return;
      if(e.key==='Escape')close();
      else if(e.key==='ArrowLeft')go(-1);
      else if(e.key==='ArrowRight')go(1);
      else if(e.key==='Tab'){var f=[xb,pv,nx],i=f.indexOf(document.activeElement);e.preventDefault();f[(i+(e.shiftKey?-1:1)+f.length)%f.length].focus();}
    });
    var sx=0;
    lb.addEventListener('touchstart',function(e){sx=e.changedTouches[0].clientX;},{passive:true});
    lb.addEventListener('touchend',function(e){var d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>50)go(d<0?1:-1);},{passive:true});
    document.body.appendChild(lb);
  }
  function open(key,btn){
    if(!lb)build();
    cur=key;idx=0;opener=btn;lb.hidden=false;document.documentElement.style.overflow='hidden';show();xb.focus();
  }
  function init(){
    document.querySelectorAll('[data-shots]').forEach(function(box){
      var k=box.getAttribute('data-shots'),s=SHOTS[k];if(!s)return;
      var b=el('button','cvb');b.type='button';b.setAttribute('aria-label','View '+s.n+' screenshots of '+s.title);
      var i=el('img');i.alt='';i.loading='lazy';load(i,'images/'+k+'-1',function(){box.remove();});
      b.appendChild(i);b.appendChild(el('span','vb','View '+s.n+' screenshots'));
      b.onclick=function(){open(k,b);};box.appendChild(b);
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

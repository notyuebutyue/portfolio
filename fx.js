(function(){
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var io=(!reduce&&'IntersectionObserver' in window)?new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.1}):null;
  if(io)document.documentElement.classList.add('js');
  function mark(){
    document.querySelectorAll('.skills .main>div,.exp article,.arch li,.creds .grid>div,.case,.wrow,.blk,.dl-aside .card').forEach(function(n,i){
      if(n.dataset.fx)return;n.dataset.fx='1';n.classList.add('rv');
      n.style.setProperty('--d',(i%4)*70+'ms');
      if(io)io.observe(n);else n.classList.add('in');
    });
  }
  function progress(){
    if(reduce||!document.querySelector('.dl'))return;
    var b=document.createElement('div');b.className='progress';document.body.appendChild(b);
    function u(){var h=document.documentElement.scrollHeight-innerHeight;b.style.transform='scaleX('+(h>0?Math.min(1,scrollY/h):0)+')';}
    addEventListener('scroll',u,{passive:true});addEventListener('resize',u);u();
  }
  function init(){
    mark();progress();
    if('MutationObserver' in window){var t;new MutationObserver(function(){clearTimeout(t);t=setTimeout(mark,60);}).observe(document.body,{childList:true,subtree:true});}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

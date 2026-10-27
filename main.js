(function(){
  var d=document,rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
  // mobile menu
  var b=d.querySelector('.menu-btn'),n=d.getElementById('nav');
  if(b&&n){b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});
    n.addEventListener('click',function(e){if(e.target.closest('a')){n.classList.remove('open');b.setAttribute('aria-expanded','false')}});
    d.addEventListener('keydown',function(e){if(e.key==='Escape'&&n.classList.contains('open')){n.classList.remove('open');b.setAttribute('aria-expanded','false');b.focus()}})}
  // reveal on scroll
  // Content is only hidden (class 'rv') while this script is running, so a JS failure never leaves it invisible.
  function reveal(){
    var els=d.querySelectorAll('.reveal:not(.in)');
    if(!('IntersectionObserver' in window)||rm){els.forEach(function(e){e.classList.add('in')});return}
    d.documentElement.classList.add('rv');
    var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
    els.forEach(function(e){io.observe(e)});
  }
  try{reveal()}catch(x){d.documentElement.classList.remove('rv')}
  window.__reveal=reveal;
  // sticky mobile bar: hidden while the hero CTA (or the page's own contact block) is on screen, so the same CTA never shows twice
  var sb=d.querySelector('.sticky-cta');
  if(sb){
    var hc=d.querySelector('[data-hero-cta]'),ec=d.querySelector('[data-end-cta]'),hcAbove=false,ecIn=false,tk=false;
    var hasIO='IntersectionObserver' in window;
    function setBar(){
      var on=(hc?hcAbove:(window.pageYOffset||d.documentElement.scrollTop)>400)&&!ecIn;
      sb.classList.toggle('show',on);
      if(on)sb.removeAttribute('inert');else sb.setAttribute('inert','');
    }
    function measure(){
      if(hc){var r=hc.getBoundingClientRect();hcAbove=r.bottom<=0}
      if(ec){var q=ec.getBoundingClientRect();ecIn=q.top<innerHeight&&q.bottom>0}
      setBar();
    }
    function onScroll(){if(tk)return;tk=true;requestAnimationFrame(function(){tk=false;measure()})}
    try{
      if(hasIO){
        var so=new IntersectionObserver(function(es){es.forEach(function(x){
          if(x.target===hc)hcAbove=!x.isIntersecting&&x.boundingClientRect.bottom<=0;
          else ecIn=x.isIntersecting;
        });setBar()});
        if(hc)so.observe(hc);
        if(ec)so.observe(ec);
        if(!hc)addEventListener('scroll',onScroll,{passive:true});
      }else{addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll)}
    }catch(x){addEventListener('scroll',onScroll,{passive:true})}
    measure();
  }
  // pointer glow on cards
  d.addEventListener('pointermove',function(e){var c=e.target.closest&&e.target.closest('.card');if(!c)return;var r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')});
  // copy email
  var cp=d.getElementById('copy'),em=d.getElementById('email'),out=d.getElementById('copied');
  if(cp&&em&&navigator.clipboard){cp.hidden=false;cp.addEventListener('click',function(){
    navigator.clipboard.writeText(em.textContent.trim()).then(function(){out.textContent='Email address copied.'},function(){out.textContent='Copy did not work. Please select the address above.'})})}
  // hero web (canvas network)
  var cv=d.getElementById('web');if(!cv||!cv.getContext)return;
  var ctx=cv.getContext('2d'),W,H,dpr,P=[],mouse={x:-999,y:-999},run=false,raf;
  function size(){var r=cv.getBoundingClientRect();dpr=Math.min(devicePixelRatio||1,2);W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
    var cnt=Math.max(22,Math.min(70,Math.round(W*H/17000)));P=[];
    for(var i=0;i<cnt;i++)P.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*1.4+.8,c:Math.random()<.7?'34,228,255':'167,139,250'});}
  function frame(step){
    ctx.clearRect(0,0,W,H);var L=Math.min(150,Math.max(100,W/7)),i,j,p,q;
    for(i=0;i<P.length;i++){p=P[i];
      if(step){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
        var dx=mouse.x-p.x,dy=mouse.y-p.y,dd=dx*dx+dy*dy;if(dd<22500&&dd>1){p.x+=dx*.004;p.y+=dy*.004}}
      for(j=i+1;j<P.length;j++){q=P[j];var ax=p.x-q.x,ay=p.y-q.y,ad=Math.sqrt(ax*ax+ay*ay);
        if(ad<L){ctx.strokeStyle='rgba(120,200,255,'+(.28*(1-ad/L))+')';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()}}
      var mx=mouse.x-p.x,my=mouse.y-p.y,md=Math.sqrt(mx*mx+my*my);
      if(md<170){ctx.strokeStyle='rgba(34,228,255,'+(.55*(1-md/170))+')';ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(mouse.x,mouse.y);ctx.stroke()}
      ctx.fillStyle='rgba('+p.c+',.9)';ctx.shadowColor='rgba('+p.c+',1)';ctx.shadowBlur=8;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,6.283);ctx.fill();ctx.shadowBlur=0}
  }
  function loop(){if(!run)return;frame(true);raf=requestAnimationFrame(loop)}
  size();frame(false);
  if(rm)return;
  var hero=cv.parentElement,vis=true;
  hero.addEventListener('pointermove',function(e){var r=cv.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top});
  hero.addEventListener('pointerleave',function(){mouse.x=mouse.y=-999});
  function upd(){var s=vis&&!d.hidden;if(s&&!run){run=true;loop()}else if(!s){run=false;cancelAnimationFrame(raf)}}
  if('IntersectionObserver' in window)new IntersectionObserver(function(es){vis=es[0].isIntersecting;upd()}).observe(hero);
  d.addEventListener('visibilitychange',upd);
  var t;addEventListener('resize',function(){clearTimeout(t);t=setTimeout(function(){size();frame(false)},200)});
  upd();
})();

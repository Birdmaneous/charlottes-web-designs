(function(){
  var D=window.PRICING,d=document;
  function el(t,c,x){var e=d.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
  var plans=d.getElementById('plans');
  D.plans.forEach(function(p,i){
    var c=el('article','card reveal');c.style.setProperty('--d',i*.1+'s');
    var h=el('h3',null,p.name);c.appendChild(h);
    var m=p.price.split(' ');var from=m[0]==='from';
    if(from)c.appendChild(el('span','price-from','From'));
    var pb=el('div','price-big',from?m.slice(1).join(' '):p.price);pb.appendChild(el('small',null,p.unit));c.appendChild(pb);
    c.appendChild(el('p',null,p.blurb)).style.margin='1rem 0 0';
    var u=el('ul','ticks');p.features.forEach(function(f){u.appendChild(el('li',null,f))});c.appendChild(u);
    var a=el('div','btn-row');var l=el('a','btn btn-primary','Email about this');l.href='mailto:charlotteswebdesignsnola@outlook.com?subject='+encodeURIComponent('Website pricing: '+p.name);a.appendChild(l);c.appendChild(a);
    plans.appendChild(c)});
  function rows(id,arr){var ul=d.getElementById(id);arr.forEach(function(x){
    var li=el('li');var b=el('b',null,x.name);var dv=el('div');dv.appendChild(b);li.appendChild(dv);
    li.appendChild(el('span','p',x.price));var dd=el('div','d',x.desc);li.appendChild(dd);
    if(x.scope){var sc=el('div','d scope',x.scope);li.appendChild(sc)}ul.appendChild(li)})}
  rows('addons',D.addons);rows('monthly',D.monthly);
  d.getElementById('foot-note').textContent=D.footnote;
  if(window.__reveal)window.__reveal();
})();

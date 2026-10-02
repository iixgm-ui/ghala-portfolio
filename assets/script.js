const ob=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');ob.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(x=>ob.observe(x));

const lang=document.getElementById('lang');
function setLanguage(language){
 const rtl=language==='ar';
 document.documentElement.lang=language;
 document.documentElement.dir=rtl?'rtl':'ltr';
 document.body.dir=rtl?'rtl':'ltr';
 document.querySelectorAll('[data-en][data-ar]').forEach(el=>{el.textContent=rtl?el.dataset.ar:el.dataset.en});
 document.querySelectorAll('[data-en-alt][data-ar-alt]').forEach(el=>{el.alt=rtl?el.dataset.arAlt:el.dataset.enAlt});
 if(lang) lang.textContent=rtl?'EN':'AR';
 const titleEl=document.querySelector('h1');
 if(titleEl) document.title=`${titleEl.textContent} — Ghala Ahmed`;
 localStorage.setItem('ghala-lang',language);
}
lang?.addEventListener('click',()=>setLanguage(document.documentElement.lang==='ar'?'en':'ar'));
setLanguage(localStorage.getItem('ghala-lang')||'en');

// Theme toggle
const theme=document.getElementById('theme');
const savedTheme=localStorage.getItem('ghala-theme');
if(savedTheme==='dark') document.body.classList.add('dark-mode');
function syncTheme(){if(theme) theme.textContent=document.body.classList.contains('dark-mode')?'☼':'◐'}
theme?.addEventListener('click',()=>{document.body.classList.toggle('dark-mode');localStorage.setItem('ghala-theme',document.body.classList.contains('dark-mode')?'dark':'light');syncTheme()});
syncTheme();

// Scroll progress
const updateProgress=()=>{const h=document.documentElement.scrollHeight-innerHeight; const p=h>0?scrollY/h:0; document.body.style.setProperty('--scroll-progress',p);};
addEventListener('scroll',updateProgress,{passive:true});
addEventListener('load',updateProgress);

// Gentle card tilt on pointer devices
if(matchMedia('(pointer:fine)').matches){
 document.querySelectorAll('.card,.skills article,.approach article').forEach(card=>{
  card.addEventListener('pointermove',e=>{
   const r=card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
   card.style.transform=`perspective(900px) rotateX(${(-y*3).toFixed(2)}deg) rotateY(${(x*3).toFixed(2)}deg) translateY(-4px)`;
  });
  card.addEventListener('pointerleave',()=>card.style.transform='');
 });
}

// Active navigation section
const navAnchors=[...document.querySelectorAll('.links a[href^="#"]')];
const sections=[...document.querySelectorAll('section[id]')];
const navObs=new IntersectionObserver(entries=>entries.forEach(entry=>{
 if(entry.isIntersecting){navAnchors.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id));}
}),{rootMargin:'-35% 0px -55% 0px',threshold:0});
sections.forEach(s=>navObs.observe(s));

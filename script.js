const DEAGENSIE_CONTENT = {"stages":[["Discover","What are you building?","Clarify the idea, customer, market and ambition. Start with the opportunity and the challenge you want to solve.","Venture context","The idea, the audience and the ambition."],["Define","Give the ambition structure.","Understand what exists, what is missing and what the venture needs across strategy, brand, product and technology.","Requirements map","A clear view of the capabilities your venture needs."],["Build","Create the foundations.","Bring strategy, positioning, product and operating systems together in a practical venture blueprint.","Venture blueprint","The foundations for a coherent brand, product and business."],["Launch","Prepare to meet the market.","Connect the offer, audience, channels and launch priorities so market entry follows a clear plan.","Launch roadmap","The sequence of work from preparation to market entry."],["Grow","Define the next chapter.","Use learning from execution to identify the next priorities, capabilities and people required for growth.","Growth priorities","An evolving roadmap shaped by execution and learning."]],"loop":[["IDEA","Bring the ambition.","Start with an idea, challenge or growth objective. The venture sets the direction."],["DEFINE","Understand the need.","Clarify the customer, market, objective and requirements before committing to execution."],["BUILD","Shape the foundation.","Structure strategy, brand, product and technology into a coherent venture blueprint."],["LAUNCH","Enter the market.","Prepare the offer, channels and go-to-market plan to bring the venture to its audience."],["MATCH","Connect the capability.","Translate requirements into roles and connect with relevant creative, strategic and technical professionals."],["EXECUTE","Put the plan to work.","Bring the right people and requirements together to deliver the work."],["SCALE","Learn. Evolve. Grow.","Use execution insights to identify new needs, return to the Growth Lab and begin the next cycle."]]};
const $=id=>document.getElementById(id);
let selectedRoleState='venture', activeModal=null, returnFocus=null;
const focusables=root=>[...root.querySelectorAll('button,a[href],input,[tabindex="0"]')].filter(el=>!el.disabled&&el.getClientRects().length);
function closeMobileMenu(restore=false){$('mobileMenu').classList.add('hidden');$('mobileMenu').classList.remove('flex');$('mobileMenu').setAttribute('aria-hidden','true');$('mobileMenuBtn').setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');if(restore)$('mobileMenuBtn').focus();}
function openModal(id){if(!activeModal)returnFocus=document.activeElement;closeMobileMenu();if(activeModal){$(activeModal).classList.add('hidden');$(activeModal).setAttribute('aria-hidden','true');}activeModal=id;$(id).classList.remove('hidden');$(id).setAttribute('aria-hidden','false');document.body.classList.add('modal-open');document.querySelectorAll('body>header,body>main,body>footer').forEach(el=>el.inert=true);$(id).querySelector('[role=dialog]').focus();}
function closeModal(){if(!activeModal)return;const modal=$(activeModal);modal.classList.add('hidden');modal.setAttribute('aria-hidden','true');modal.querySelectorAll('input[type=password],input[data-password]').forEach(input=>{input.value='';input.type='password';});modal.querySelectorAll('[aria-pressed]').forEach(btn=>{btn.setAttribute('aria-pressed','false');btn.setAttribute('aria-label','Show password');});activeModal=null;document.body.classList.remove('modal-open');document.querySelectorAll('body>header,body>main,body>footer').forEach(el=>el.inert=false);if(returnFocus?.isConnected&&returnFocus.getClientRects().length)returnFocus.focus();else $('mobileMenuBtn').focus();}
function clearMessages(){document.querySelectorAll('.form-message').forEach(el=>el.remove());}
function openLoginModal(){clearMessages();openModal('loginModal');}
function closeLoginModal(){if(activeModal==='loginModal')closeModal();}
function closeSignupModal(){if(activeModal==='signupModal')closeModal();}
function openSignupModal(role=null){clearMessages();openModal('signupModal');if(role)selectRole(role);else showRoleSelection();}
function showRoleSelection(){$('roleSelectionStep').classList.remove('hidden');$('signupFormStep').classList.add('hidden');$('signupModal').querySelector('[role=dialog]').setAttribute('aria-labelledby','signupTitle');$('roleSelectionStep').querySelector('button').focus();}
function selectRole(role){selectedRoleState=role==='creative'?'creative':'venture';$('roleSelectionStep').classList.add('hidden');$('signupFormStep').classList.remove('hidden');$('roleIndicator').textContent='Joining as '+(selectedRoleState==='creative'?'Creative':'Venture');$('signupModal').querySelector('[role=dialog]').setAttribute('aria-labelledby','signupFormTitle');clearMessages();$('firstName').focus();}
function switchToSignup(){openSignupModal();}function switchToLogin(){openLoginModal();}
function togglePassword(id,button){const input=$(id),visible=input.type==='password';input.dataset.password='true';input.type=visible?'text':'password';button.setAttribute('aria-pressed',String(visible));button.setAttribute('aria-label',visible?'Hide password':'Show password');}
function showFormMessage(kind,message){const form=$(kind+'Modal').querySelector('form');let p=form.querySelector('.form-message');if(!p){p=document.createElement('p');p.className='form-message';p.setAttribute('role','status');p.tabIndex=-1;form.append(p);}p.textContent=message;p.focus();}
function handleLoginSubmit(e){e.preventDefault();showFormMessage('login','Account access is not yet available on this site. No details have been sent or saved.');}
function handleSignupSubmit(e){e.preventDefault();showFormMessage('signup','Registration is not yet available. No account has been created and your details have not been sent or saved.');}
document.addEventListener('DOMContentLoaded',()=>{
 $('mobileMenuBtn').addEventListener('click',()=>{if($('mobileMenuBtn').getAttribute('aria-expanded')==='true'){closeMobileMenu();return;}$('mobileMenu').classList.remove('hidden');$('mobileMenu').classList.add('flex');$('mobileMenu').setAttribute('aria-hidden','false');$('mobileMenuBtn').setAttribute('aria-expanded','true');document.body.classList.add('menu-open');});
 document.querySelectorAll('.mobile-nav-link').forEach(link=>link.addEventListener('click',()=>{closeMobileMenu();const target=document.querySelector(link.getAttribute('href'));target.tabIndex=-1;target.focus({preventScroll:true});}));
 document.addEventListener('click',e=>{if(!e.target.closest('#mainHeader'))closeMobileMenu();});
 matchMedia('(min-width:960px)').addEventListener('change',e=>{if(e.matches)closeMobileMenu();});
 ['loginModal','signupModal'].forEach(id=>$(id).addEventListener('click',e=>{if(e.target===$(id))closeModal();}));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(activeModal)closeModal();else if($('mobileMenuBtn').getAttribute('aria-expanded')==='true')closeMobileMenu(true);}if(e.key==='Tab'){const root=activeModal?$(activeModal):$('mobileMenuBtn').getAttribute('aria-expanded')==='true'?$('mainHeader'):null;if(!root)return;const els=focusables(root),first=els[0],last=els.at(-1);if(e.shiftKey&&(document.activeElement===first||!els.includes(document.activeElement))){e.preventDefault();last.focus();}else if(!e.shiftKey&&(document.activeElement===last||!els.includes(document.activeElement))){e.preventDefault();first.focus();}}});
 const links=[...document.querySelectorAll('.nav-link')];const update=()=>{$('mainHeader').classList.toggle('scrolled',scrollY>20);let current='';document.querySelectorAll('section[id]').forEach(s=>{if(s.getBoundingClientRect().top<=140)current=s.id;});links.forEach(a=>{if(a.dataset.section===current)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});};addEventListener('scroll',update,{passive:true});update();
 function tabs(selector,update){const buttons=[...document.querySelectorAll(selector)];function activate(index,focus=false){buttons.forEach((b,i)=>{b.setAttribute('aria-selected',String(i===index));b.tabIndex=i===index?0:-1;});update(index);if(focus)buttons[index].focus();}buttons.forEach((b,i)=>{b.addEventListener('click',()=>activate(i));b.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(i+1)%buttons.length;if(e.key==='ArrowLeft')next=(i-1+buttons.length)%buttons.length;if(e.key==='Home')next=0;if(e.key==='End')next=buttons.length-1;if(next!==undefined){e.preventDefault();activate(next,true);}});});return activate;}
 const activateJourney=tabs('[data-journey]',i=>{const s=DEAGENSIE_CONTENT.stages[i];$('journey-label').textContent=`0${i+1} / ${s[0].toUpperCase()}`;$('journey-title').textContent=s[1];$('journey-copy').textContent=s[2];$('blueprint-focus').textContent=s[3];$('blueprint-copy').textContent=s[4];$('journey-panel').setAttribute('aria-labelledby',`journey-${i}`);});
 const journeyRoot=document.querySelector('.growth-layout');
 const journeyMotion=matchMedia('(prefers-reduced-motion: reduce)');
 let journeyTimer, journeyVisible=false;
 function scheduleJourney(){
   clearTimeout(journeyTimer);
   if(!journeyVisible||document.hidden||journeyRoot.contains(document.activeElement)||activeModal)return;
   journeyTimer=setTimeout(()=>{
     const buttons=[...journeyRoot.querySelectorAll('[data-journey]')];
     const current=buttons.findIndex(b=>b.getAttribute('aria-selected')==='true');
     activateJourney((current+1)%buttons.length);
     if(!journeyMotion.matches) [$('journey-panel'),journeyRoot.querySelector('.blueprint-focus')].forEach(el=>el.animate([{opacity:.3,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:350,easing:'ease-out'}));
     scheduleJourney();
   },3000);
 }
 new IntersectionObserver(entries=>{journeyVisible=entries[0].isIntersecting;scheduleJourney();},{threshold:0}).observe(journeyRoot);


 journeyRoot.addEventListener('focusin',()=>clearTimeout(journeyTimer));
 journeyRoot.addEventListener('focusout',()=>setTimeout(scheduleJourney,0));
 document.addEventListener('visibilitychange',scheduleJourney);
 journeyMotion.addEventListener('change',scheduleJourney);
 new MutationObserver(scheduleJourney).observe(document.body,{attributes:true,attributeFilter:['class']});

});


// Only pin cards when every card fits below the navigation. No scroll hijacking.
document.addEventListener('DOMContentLoaded', () => {
  const stack = document.getElementById('audience-stack');
  if (!stack) return;
  const cards = [...stack.querySelectorAll('.audience-stack-card')];
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let scheduled = false;
  const measure = () => {
    scheduled = false;
    const top = document.getElementById('mainHeader').getBoundingClientRect().height + 24;
    stack.style.setProperty('--stack-top', `${top}px`);
    const peek = parseFloat(getComputedStyle(stack).getPropertyValue('--stack-peek'));
    const fits = cards.every((card, i) => card.offsetHeight + top + i * peek + 24 <= innerHeight);
    stack.classList.toggle('is-stacking', fits && !motion.matches);
  };
  const schedule = () => { if (!scheduled) { scheduled = true; requestAnimationFrame(measure); } };
  new ResizeObserver(schedule).observe(stack);
  cards.forEach(card => new ResizeObserver(schedule).observe(card));
  addEventListener('resize', schedule, { passive: true });
  motion.addEventListener('change', schedule);
  document.fonts.ready.then(schedule);
  // Keyboard focus reveals the natural position of a previously covered card.
  stack.addEventListener('focusin', event => {
    if (!stack.classList.contains('is-stacking') || !event.target.matches(':focus-visible')) return;
    const card = event.target.closest('.audience-stack-card');
    if (!card) return;
    const style = getComputedStyle(stack);
    let naturalTop = stack.getBoundingClientRect().top + scrollY + parseFloat(style.paddingTop);
    for (const sibling of cards) {
      if (sibling === card) break;
      naturalTop += sibling.offsetHeight + parseFloat(style.rowGap);
    }
    window.scrollTo({ top: naturalTop - parseFloat(style.getPropertyValue('--stack-top')), behavior: 'instant' });
  });
  measure();
});



// Keep the accessible headline stable while the visual phrase types and deletes.
document.addEventListener('DOMContentLoaded', () => {
  const text = document.getElementById('heroTyped');

  if (!text) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const words = ['build.', 'match.', 'scale.'];
  let index = 0, count = words[0].length, deleting = true, timer;
  const schedule = delay => { clearTimeout(timer); if (!motion.matches && !document.hidden) timer = setTimeout(tick, delay); };
  function tick() {
    count += deleting ? -1 : 1;
    text.textContent = words[index].slice(0, count);
    if (!count) { deleting = false; index = (index + 1) % words.length; schedule(300); }
    else if (count === words[index].length && !deleting) { deleting = true; schedule(1900); }
    else schedule(deleting ? 65 : 130);
  }

  motion.addEventListener('change', () => {
    clearTimeout(timer); index = 0; count = words[0].length; deleting = true; text.textContent = words[0]; schedule(1900);
  });
  document.addEventListener('visibilitychange', () => schedule(500));
  schedule(1900);
});

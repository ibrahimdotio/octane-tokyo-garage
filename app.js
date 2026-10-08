'use strict';
const cars = {
  r34:{name:'Nissan Skyline R34',capacity:3,image:'assets/skyline-r34.webp',model:'assets/models/skyline-r34.glb',alt:'Pearl white Nissan Skyline R34, front three-quarter view'},
  r35:{name:'Nissan GT-R R35',capacity:3,image:'assets/gtr-r35.webp',model:'assets/models/nissan-gtr-r35.glb',alt:'Graphite Nissan GT-R R35, front three-quarter view'},
  supra:{name:'Toyota GR Supra',capacity:1,image:'assets/supra.webp',model:'assets/models/toyota-gr-supra-a90.glb',alt:'Lime green Toyota GR Supra, front three-quarter view'},
  ae86:{name:'Toyota AE86',capacity:3,image:'assets/ae86.webp',model:'assets/models/toyota-ae86-trueno.glb',alt:'White and black Toyota AE86, front three-quarter view'}
};
// Manufacturer references describe stock trims, not Octane's tuned fleet.
const carSpecs={
  r34:{engine:'RB26DETT',displacement:2568,power:280,drive:'awd',reference:'2000 V·spec II',source:'https://www.nissan-global.com/EN/HERITAGE_COLLECTION/280_skyline_gt-r_v-spec_ii.html'},
  r35:{engine:'VR38DETT',displacement:3799,power:570,drive:'awd',reference:'2017 GT-R',source:'https://global.nissannews.com/ja-JP/releases/160711-01-j'},
  supra:{engine:'3.0L inline-six',displacement:2998,power:340,drive:'rwd',reference:'2019 GR Supra 3.0',source:'https://newsroom.toyota.eu/2019-the-new-toyota-gr-supra/'},
  ae86:{engine:'4A-GEU',displacement:1587,power:130,gross:true,drive:'rwd',reference:'1983 GT APEX',source:'https://www.toyota-global.com/company/history_of_toyota/75years/vehicle_lineage/car/id60009032/'}
};
const copy={
  en:{engine:'Engine',displacement:'Displacement',power:'Power',drivetrain:'Drivetrain',factorySpecs:'Factory specs',awd:'All-wheel drive',rwd:'Rear-wheel drive',powerUnit:'PS',grossPower:'gross',inlineSix:'3.0L inline-six',how:'How it works',language:'Language',step:'Choose your car',description:'Explore Tokyo by night<br>with a local driver.',from:'From',perPerson:'per person',chooseRoute:'Choose your route',rotate:'Drag to rotate',contact:'Contact',howTitle:'Your night, your way.',howCar:'Choose an icon',howCarBody:'Find the Japanese car that makes the night yours.',howRoute:'Find your route',howRouteBody:"Discover Tokyo's roads, skyline and car culture with a local host.",howBook:'Book your night',howBookBody:'Choose a date, review your night, and explore the booking preview.',viewExperiences:'View experiences',modelHint:'Drag to rotate. Use the arrow keys or Home to reset.'},
  fr:{engine:'Moteur',displacement:'Cylindrée',power:'Puissance',drivetrain:'Transmission',factorySpecs:'Specs d’origine',awd:'4 roues motrices',rwd:'Propulsion',powerUnit:'ch',grossPower:'bruts',inlineSix:'6 en ligne · 3,0 L',how:'Comment ça marche',language:'Langue',step:'Choisissez votre voiture',description:'Découvrez Tokyo de nuit<br>avec un chauffeur local.',from:'À partir de',perPerson:'par personne',chooseRoute:'Choisir mon parcours',rotate:'Glissez pour tourner',contact:'Contact',howTitle:'Votre nuit, à votre façon.',howCar:'Choisissez une icône',howCarBody:'Trouvez la voiture japonaise qui vous fait rêver.',howRoute:'Choisissez votre parcours',howRouteBody:'Découvrez les routes, les lumières et la culture automobile de Tokyo avec un hôte local.',howBook:'Réservez votre nuit',howBookBody:'Choisissez une date, retrouvez votre récapitulatif et explorez la réservation en démonstration.',viewExperiences:'Voir les expériences',modelHint:'Glissez pour tourner. Utilisez les flèches ou la touche Home pour réinitialiser.'}
};
let selected='r34', locale='en', changeSequence=0, garageActive=true;
const hero=document.getElementById('hero-car');
const art=document.getElementById('car-art');
const title=document.getElementById('car-title');
let carExperience=null;
const rotateHint=document.getElementById('rotate-hint');
const options=[...document.querySelectorAll('.car-option')];
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const imageCache=new Map();
Object.values(cars).forEach(car=>{const im=new Image();im.src=car.image;imageCache.set(car.image,im);});
function updateCarSpecs(){
  const specs=carSpecs[selected],text=copy[locale];
  document.getElementById('spec-engine').textContent=selected==='supra'?text.inlineSix:specs.engine;
  document.getElementById('spec-displacement').textContent=new Intl.NumberFormat(locale==='fr'?'fr-FR':'en-GB').format(specs.displacement)+' cc';
  document.getElementById('spec-power').textContent=specs.power+' '+text.powerUnit+(specs.gross?' ('+text.grossPower+')':'');
  document.getElementById('spec-drivetrain').textContent=text[specs.drive];
  document.getElementById('spec-reference-model').textContent=specs.reference;
  document.getElementById('spec-source').href=specs.source;
}
updateCarSpecs();
async function selectCar(id){
  if(id===selected)return;
  const car=cars[id];if(!car)return;
  const sequence=++changeSequence;selected=id;carExperience?.setActive(false);rotateHint.hidden=true;
  options.forEach(button=>{const active=button.dataset.car===id;button.classList.toggle('is-selected',active);button.setAttribute('aria-pressed',String(active));let mark=button.querySelector('.selected-mark');if(active&&!mark){mark=document.createElement('span');mark.className='selected-mark';mark.setAttribute('aria-hidden','true');mark.innerHTML='<svg width="13" height="13" viewBox="0 0 16 16"><path d="m3 8 3 3 7-7" fill="none" stroke="currentColor" stroke-width="2"/></svg>';button.querySelector('.car-option-image').append(mark);}});
  art.classList.add('is-changing');
  await Promise.all([imageCache.get(car.image).decode().catch(()=>{}),new Promise(resolve=>setTimeout(resolve,reducedMotion.matches?0:180))]);
  if(sequence!==changeSequence)return;
  hero.src=car.image;hero.alt=car.alt;title.textContent=car.name;updateCarSpecs();carExperience?.setCar({id,...car});carExperience?.setActive(garageActive);
  document.getElementById('selection-status').textContent=car.name+(locale==='fr'?' sélectionnée':' selected');
  art.classList.remove('is-changing');
  window.dispatchEvent(new CustomEvent('octane:car',{detail:{id}}));
}
options.forEach((button,index)=>{button.addEventListener('click',()=>selectCar(button.dataset.car));button.addEventListener('keydown',event=>{let next;if(event.key==='ArrowDown'||event.key==='ArrowRight')next=(index+1)%options.length;else if(event.key==='ArrowUp'||event.key==='ArrowLeft')next=(index+options.length-1)%options.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=options.length-1;else return;event.preventDefault();options[next].focus();selectCar(options[next].dataset.car);});});
const mobileBooking=document.querySelector('.booking').cloneNode(true);mobileBooking.classList.add('mobile-booking');mobileBooking.querySelector('a').removeAttribute('id');document.querySelector('.garage').append(mobileBooking);
document.getElementById('language').addEventListener('change',event=>{locale=event.target.value;carExperience?.setLocale(locale);document.documentElement.lang=locale;document.querySelectorAll('[data-i18n]').forEach(element=>{const text=copy[locale][element.dataset.i18n];if(text!==undefined)element.innerHTML=text;});document.getElementById('selection-status').textContent=cars[selected].name+(locale==='fr'?' sélectionnée':' selected');document.querySelector('[data-close="how-dialog"]').setAttribute('aria-label',locale==='fr'?'Fermer':'Close');updateCarSpecs();window.dispatchEvent(new CustomEvent('octane:locale'));});
document.getElementById('how-button').addEventListener('click',()=>document.getElementById('how-dialog').showModal());
document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>document.getElementById(button.dataset.close).close()));
document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}}));
function updateClock(){document.getElementById('local-time').textContent=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Tokyo',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date())+' JST';}updateClock();setInterval(updateClock,60000);

if(document.modelContext?.registerTool){
  const lifecycle=new AbortController();
  const tool={name:'select_car',title:'Select an Octane car',description:'Change the car displayed on this landing page. This only updates the preview and does not book a ride.',inputSchema:{type:'object',properties:{carId:{type:'string',enum:Object.keys(cars)}},required:['carId'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},async execute(input){if(!input||typeof input!=='object'||Object.keys(input).length!==1||!Object.hasOwn(cars,input.carId))throw new Error('Choose r34, r35, supra or ae86.');await selectCar(input.carId);return{carId:selected,name:cars[selected].name};}};
  try{Promise.resolve(document.modelContext.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{});}catch{}
  window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
}

window.Octane={getCar:()=>({id:selected,...cars[selected]}),getLocale:()=>locale,setCar:selectCar,setGarageActive(value){garageActive=value;carExperience?.setActive(value);}};
function loadCarExperience(){const connection=navigator.connection;if(connection?.saveData)return;const start=()=>import('./car-experience.js').then(async module=>{carExperience=await module.createCarExperience({host:document.getElementById('car-3d'),photo:hero,hint:rotateHint,reducedMotion,isActive:()=>garageActive,car:{id:selected,...cars[selected]}});carExperience.setLocale(locale);}).catch(()=>{});if('requestIdleCallback' in window)requestIdleCallback(start,{timeout:2500});else setTimeout(start,700);}if(document.readyState==='complete')loadCarExperience();else window.addEventListener('load',loadCarExperience,{once:true});

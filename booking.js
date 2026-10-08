'use strict';
(() => {
  const words = {
    en: {
      car:'Car',route:'Route',date:'Date',payment:'Payment',backCars:'Back to cars',backRoute:'Back to routes',backDate:'Back to dates',
      routeStep:'Choose your route',routeTitle:'FIND YOUR<br>NIGHT.',routeIntro:'From city lights to the meeting places of Japanese car culture.',
      daikoku:'Daikoku night ride',bay:'Tokyo Bay',city:'City lights',hours:'hours',concept:'Concept route',classic:'The Octane classic',
      daikokuBody:'Tokyo expressways, the bay crossing, and a stop at Daikoku’s legendary car meeting place.',
      bayBody:'A slower evening along the waterfront, crossing Rainbow Bridge with the skyline in view.',
      cityBody:'An urban loop through the lights of Tokyo, with landmark stops and time for photos.',
      daikokuStops:'Tokyo · Rainbow Bridge · Daikoku',bayStops:'Waterfront · Rainbow Bridge · Odaiba',cityStops:'Shibuya · Tokyo Tower · City centre',
      mapNote:'Illustrated route overview',video:'NIGHT RIDE PREVIEW',play:'Play preview',pause:'Pause preview',chosenCar:'Your car',person:'per person',
      chooseDate:'Choose your date',previewNote:'Booking preview · routes, fares and dates are illustrative.',
      dateStep:'Choose your date',dateTitle:'MAKE IT<br>A NIGHT.',dateIntro:'Pick your evening. Every time below is local to Tokyo.',
      guests:'Guests',fewer:'Fewer guests',more:'More guests',previousMonth:'Previous month',nextMonth:'Next month',previewCalendar:'Preview calendar · Japan Standard Time (JST)',
      chooseDay:'Choose a date to see departure times.',times:'Departure times',noSlots:'No preview times on this date. Try another evening.',
      full:'Full',trip:'YOUR NIGHT',duration:'Duration',departure:'Departure',notChosen:'Not selected',total:'Total',tax:'Illustrative total in JPY',checkout:'Continue to checkout',
      editCar:'Edit car',editRoute:'Edit route',editDate:'Edit date',checkoutStep:'Review & payment',checkoutTitle:'ONE LAST<br>TURN.',checkoutIntro:'Your car. Your route. Your night.',
      details:'Your details',first:'First name',last:'Last name',email:'Email address',emailHelp:'Used for your booking confirmation when live booking is connected.',
      paymentPreview:'Payment preview',demoCard:'Demo card',noCard:'No card details needed. This preview makes no charge.',consent:'I understand this is a preview and does not reserve a ride.',
      previewBooking:'Preview booking',formError:'Please complete your name, a valid email address, and the preview acknowledgement.',confirmTitle:'YOUR NIGHT<br>IS READY.',
      confirmBody:'Your itinerary is ready to review. No reservation has been made and no payment has been taken.',reference:'PREVIEW ITINERARY',meeting:'Meeting point',
      meetingBody:'Shibuya, Tokyo. The exact pickup location and arrival instructions will be confirmed by Octane when you make a live booking.',
      liveBooking:'Book with Octane',calendar:'Add to calendar',startOver:'Back to the garage',preview:'Preview',calendarDescription:'Octane itinerary preview. Not a confirmed reservation. Verify all details with Octane.',
      rider:'Guest',calendarDownload:'Your itinerary has been downloaded.',readyStatus:'Your booking preview is ready.',stepOf:'Step',of:'of',soldOutDay:'No preview departures'
    },
    fr: {
      car:'Voiture',route:'Parcours',date:'Date',payment:'Paiement',backCars:'Retour aux voitures',backRoute:'Retour aux parcours',backDate:'Retour aux dates',
      routeStep:'Choisissez votre parcours',routeTitle:'TROUVEZ<br>VOTRE NUIT.',routeIntro:'Des lumières de la ville aux lieux emblématiques de la culture automobile japonaise.',
      daikoku:'Virée à Daikoku',bay:'Tokyo Bay',city:'Lumières de Tokyo',hours:'heures',concept:'Parcours concept',classic:'Le classique Octane',
      daikokuBody:'Les voies rapides de Tokyo, la traversée de la baie et un arrêt au légendaire rassemblement de Daikoku.',
      bayBody:'Une soirée au bord de l’eau, en passant par Rainbow Bridge avec la skyline en panorama.',
      cityBody:'Une boucle dans les lumières de Tokyo, avec des arrêts emblématiques et du temps pour les photos.',
      daikokuStops:'Tokyo · Rainbow Bridge · Daikoku',bayStops:'Front de mer · Rainbow Bridge · Odaiba',cityStops:'Shibuya · Tokyo Tower · Centre-ville',
      mapNote:'Vue illustrée du parcours',video:'APERÇU DE LA VIRÉE',play:'Lire la vidéo',pause:'Mettre en pause',chosenCar:'Votre voiture',person:'par personne',
      chooseDate:'Choisir la date',previewNote:'Aperçu de réservation · parcours, tarifs et dates illustratifs.',
      dateStep:'Choisissez votre date',dateTitle:'CHOISISSEZ<br>VOTRE SOIR.',dateIntro:'Choisissez votre soirée. Tous les horaires sont à l’heure de Tokyo.',
      guests:'Passagers',fewer:'Moins de passagers',more:'Plus de passagers',previousMonth:'Mois précédent',nextMonth:'Mois suivant',previewCalendar:'Calendrier de démonstration · Heure de Tokyo (JST)',
      chooseDay:'Choisissez une date pour voir les départs.',times:'Horaires de départ',noSlots:'Aucun départ de démonstration ce jour-là. Essayez une autre soirée.',
      full:'Complet',trip:'VOTRE NUIT',duration:'Durée',departure:'Départ',notChosen:'Non sélectionné',total:'Total',tax:'Total illustratif en JPY',checkout:'Continuer vers le paiement',
      editCar:'Modifier la voiture',editRoute:'Modifier le parcours',editDate:'Modifier la date',checkoutStep:'Récapitulatif et paiement',checkoutTitle:'LE DERNIER<br>VIRAGE.',checkoutIntro:'Votre voiture. Votre parcours. Votre nuit.',
      details:'Vos coordonnées',first:'Prénom',last:'Nom',email:'Adresse e-mail',emailHelp:'Pour la confirmation de réservation une fois la réservation réelle connectée.',
      paymentPreview:'Aperçu du paiement',demoCard:'Carte de démonstration',noCard:'Aucune donnée bancaire requise. Cet aperçu ne prélève rien.',consent:'Je comprends que cet aperçu ne réserve pas de virée.',
      previewBooking:'Voir la réservation',formError:'Complétez votre nom, une adresse e-mail valide et la confirmation de démonstration.',confirmTitle:'VOTRE NUIT<br>EST PRÊTE.',
      confirmBody:'Votre itinéraire est prêt. Aucune réservation n’a été faite et aucun paiement n’a été prélevé.',reference:'ITINÉRAIRE DE DÉMONSTRATION',meeting:'Point de rendez-vous',
      meetingBody:'Shibuya, Tokyo. Le lieu précis et les instructions d’arrivée seront confirmés par Octane lors de votre réservation réelle.',
      liveBooking:'Réserver avec Octane',calendar:'Ajouter au calendrier',startOver:'Retour au garage',preview:'Aperçu',calendarDescription:'Itinéraire Octane de démonstration. Aucune réservation confirmée. Vérifiez les détails avec Octane.',
      rider:'Passager',calendarDownload:'Votre itinéraire a été téléchargé.',readyStatus:'Votre aperçu de réservation est prêt.',stepOf:'Étape',of:'sur',soldOutDay:'Aucun départ de démonstration'
    }
  };
  const routes = {
    daikoku:{duration:3,price:25000,path:'M170 320 C200 270 290 240 345 240 S395 277 465 290 L645 350 Q685 365 715 405 L830 458',end:[830,458],label:[808,488]},
    bay:{duration:2.5,price:22000,path:'M230 190 C265 235 280 250 345 260 L465 290 L645 350 Q690 373 748 395',end:[748,395],label:[726,425]},
    city:{duration:2,price:18000,path:'M170 320 L200 250 Q220 200 230 190 L285 140 Q340 137 355 205 L310 265 Q230 286 170 320',end:[230,190],label:[210,168]}
  };
  const journey=document.getElementById('journey'), garage=document.querySelector('.garage'), progress=document.querySelector('.journey-progress');
  const getLocale=()=>window.Octane.getLocale();
  const t=key=>words[getLocale()][key];
  const money=amount=>new Intl.NumberFormat(getLocale()==='fr'?'fr-FR':'en-US',{style:'currency',currency:'JPY',maximumFractionDigits:0}).format(amount);
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const todayParts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
  const part=type=>todayParts.find(p=>p.type===type).value;
  const today=part('year')+'-'+part('month')+'-'+part('day');
  const monthStart=new Date(Date.UTC(Number(part('year')),Number(part('month'))-1,1));
  const state={step:'car',route:'daikoku',date:'',time:'',guests:1,month:0,first:'',last:'',email:'',consent:false,completed:false};
  const steps=['car','routes','date','checkout'];
  let videoPaused=false;
  function car(){return window.Octane.getCar();}
  function route(){return routes[state.route];}
  function dateLabel(value,short=false){
    if(!value)return t('notChosen');
    return new Intl.DateTimeFormat(getLocale()==='fr'?'fr-FR':'en-GB',{timeZone:'Asia/Tokyo',day:'numeric',month:short?'short':'long',...(short?{year:'numeric'}:{weekday:'short'})}).format(new Date(value+'T12:00:00+09:00'));
  }
  function previewSlots(date){
    if(!date||Number(date.slice(-2))%4===0)return [];
    const times=state.route==='city'?['18:00','19:00','20:00']:['18:30','19:30','20:30'];
    return times.map((time,index)=>({time,capacity:(Number(date.slice(-2))+index)%5===0?0:Math.min(car().capacity,index===0?2:3)}));
  }
  function validSlot(){return previewSlots(state.date).some(s=>s.time===state.time&&s.capacity>=state.guests);}
  function chosenCar(){const c=car();return '<div class="chosen-car"><img src="'+c.image+'" alt=""><div><small>'+t('chosenCar')+'</small><strong>'+c.name+'</strong><button class="quiet-button" data-action="go" data-step="car">'+t('editCar')+'</button></div></div>';}
  function summary(withContinue=false,withEdit=false){
    const c=car();
    return '<aside class="trip-summary" aria-label="'+t('trip')+'"><p class="summary-overline">'+t('trip')+'</p><img class="summary-car" src="'+c.image+'" alt=""><h3>'+c.name+'</h3><p class="summary-route">'+t(state.route)+' · '+route().duration+' '+t('hours')+'</p>'+
      (withEdit?'<div class="summary-edit"><button class="quiet-button" data-action="go" data-step="car">'+t('editCar')+'</button><button class="quiet-button" data-action="go" data-step="routes">'+t('editRoute')+'</button><button class="quiet-button" data-action="go" data-step="date">'+t('editDate')+'</button></div>':'')+
      '<dl class="summary-rows"><div><dt>'+t('date')+'</dt><dd>'+dateLabel(state.date,true)+'</dd></div><div><dt>'+t('departure')+'</dt><dd>'+(state.time?state.time+' JST':t('notChosen'))+'</dd></div><div><dt>'+t('guests')+'</dt><dd>'+state.guests+'</dd></div><div><dt>'+t('person')+'</dt><dd>'+money(route().price)+'</dd></div></dl>'+
      '<div class="summary-total"><span>'+t('total')+'</span><strong>'+money(route().price*state.guests)+'</strong></div><p class="preview-note">'+t('tax')+'</p>'+
      (withContinue?'<button class="primary-button" data-action="go" data-step="checkout" '+(!validSlot()?'disabled':'')+'>'+t('checkout')+'</button>':'')+
      '<p class="preview-note">'+t('previewNote')+'</p></aside>';
  }
  function flowIntro(number,step,title,body,back){
    return '<button class="quiet-button flow-back" data-action="go" data-step="'+back+'">'+t(back==='car'?'backCars':back==='routes'?'backRoute':'backDate')+'</button><p class="flow-step"><span>'+number+'</span><span>'+t(step)+'</span><span>/ 04</span></p><h1 class="flow-title" tabindex="-1">'+t(title)+'</h1><p class="flow-description">'+t(body)+'</p>';
  }
  function renderRoutes(){
    const r=route();
    const options=Object.keys(routes).map((id,i)=>'<button class="route-option '+(id===state.route?'is-selected':'')+'" type="button" data-action="route" data-route="'+id+'" aria-pressed="'+(id===state.route)+'"><span class="route-number">0'+(i+1)+'</span><span><strong>'+t(id)+'</strong><small>'+routes[id].duration+' '+t('hours')+' · '+money(routes[id].price)+'</small></span></button>').join('');
    journey.innerHTML='<section class="flow-shell"><div class="route-layout"><div class="route-copy">'+flowIntro('02','routeStep','routeTitle','routeIntro','car')+
      '<div class="route-options" role="group" aria-label="'+t('routeStep')+'">'+options+'</div><div class="route-detail"><div class="route-tags"><span class="route-tag">'+t(state.route==='daikoku'?'classic':'concept')+'</span><span class="route-tag">'+r.duration+' '+t('hours')+'</span></div><p>'+t(state.route+'Body')+'</p><p>'+t(state.route+'Stops')+'</p></div></div>'+
      '<div class="map-surface" aria-label="'+t('mapNote')+'"><div class="map-art" role="img" aria-label="'+t('mapNote')+'"></div><div class="map-content"><svg class="route-map" viewBox="0 0 1000 650" preserveAspectRatio="none" aria-hidden="true"><defs><radialGradient id="selected-zone"><stop offset="0" stop-color="#ff784a" stop-opacity=".25"/><stop offset="1" stop-color="#ff784a" stop-opacity="0"/></radialGradient></defs><ellipse cx="'+r.end[0]+'" cy="'+r.end[1]+'" rx="85" ry="55" fill="url(#selected-zone)"/><path class="map-line-soft" d="'+r.path+'"/><path class="map-line" d="'+r.path+'"/><circle class="map-dot" cx="170" cy="320" r="5"/><circle class="map-dot" cx="'+r.end[0]+'" cy="'+r.end[1]+'" r="6"/><text class="map-label" x="145" y="345">TOKYO</text><text class="map-label" x="'+r.label[0]+'" y="'+r.label[1]+'">'+(state.route==='daikoku'?'DAIKOKU':state.route==='bay'?'TOKYO BAY':'TOKYO TOWER')+'</text></svg></div>'+
      '<div class="route-preview"><div class="preview-caption"><span>'+t('video')+'</span></div><div class="preview-frame"><video id="route-video" muted loop playsinline preload="metadata" poster="assets/route-preview.webp" '+(!videoPaused&&!reducedMotion.matches?'autoplay':'')+'><source src="assets/octane-night-preview.mp4" type="video/mp4"></video><button class="preview-toggle" data-action="video" aria-label="'+t(videoPaused||reducedMotion.matches?'play':'pause')+'">'+(videoPaused||reducedMotion.matches?'▶':'Ⅱ')+'</button></div><div class="preview-caption"><span class="preview-name">'+t(state.route)+'</span><span>'+r.duration+' '+t('hours')+'</span></div></div><p class="map-note">'+t('mapNote')+'</p></div></div>'+
      '<div class="flow-bottom">'+chosenCar()+'<div class="flow-action"><div class="flow-fare">'+money(r.price)+'<small>'+t('person')+'</small></div><button class="primary-button" data-action="go" data-step="date">'+t('chooseDate')+'</button></div></div><p class="preview-note">'+t('previewNote')+'</p></section>';
    const video=document.getElementById('route-video');
    video.addEventListener('loadedmetadata',()=>{const point={daikoku:4,bay:16,city:25}[state.route];if(video.duration>point)video.currentTime=point;},{once:true});
  }
  function renderDate(){
    const month=new Date(Date.UTC(monthStart.getUTCFullYear(),monthStart.getUTCMonth()+state.month,1));
    const monthText=new Intl.DateTimeFormat(getLocale()==='fr'?'fr-FR':'en-GB',{timeZone:'UTC',month:'long',year:'numeric'}).format(month);
    const offset=(month.getUTCDay()+6)%7,days=new Date(Date.UTC(month.getUTCFullYear(),month.getUTCMonth()+1,0)).getUTCDate();
    let cells='<span class="empty-day" aria-hidden="true"></span>'.repeat(offset);
    for(let day=1;day<=days;day++){
      const key=month.getUTCFullYear()+'-'+String(month.getUTCMonth()+1).padStart(2,'0')+'-'+String(day).padStart(2,'0');
      const disabled=key<=today, hasSlots=previewSlots(key).some(s=>s.capacity>=state.guests);
      cells+='<button type="button" class="'+(key===state.date?'is-selected ':'')+(!disabled&&hasSlots?'has-slots':'')+'" data-action="day" data-date="'+key+'" aria-label="'+esc(dateLabel(key))+(hasSlots?'':' · '+t('soldOutDay'))+'" aria-pressed="'+(key===state.date)+'" '+(disabled?'disabled':'')+'>'+day+'</button>';
    }
    const weekdays=(getLocale()==='fr'?['L','M','M','J','V','S','D']:['M','T','W','T','F','S','S']).map(day=>'<span>'+day+'</span>').join('');
    const slots=previewSlots(state.date);
    const times=slots.length?'<div class="slots">'+slots.map(s=>'<button type="button" class="slot-button '+(s.time===state.time?'is-selected':'')+'" data-action="slot" data-time="'+s.time+'" aria-pressed="'+(s.time===state.time)+'" '+(s.capacity<state.guests?'disabled aria-label="'+s.time+' · '+t('full')+'"':'')+'>'+s.time+(s.capacity<state.guests?' · '+t('full'):'')+'</button>').join('')+'</div>':'<p class="slot-empty">'+t(state.date?'noSlots':'chooseDay')+'</p>';
    journey.innerHTML='<section class="flow-shell"><div class="schedule-layout"><div class="schedule-copy">'+flowIntro('03','dateStep','dateTitle','dateIntro','routes')+'<div class="guest-count"><strong>'+t('guests')+'</strong><div class="counter"><button data-action="guest" data-delta="-1" aria-label="'+t('fewer')+'" '+(state.guests===1?'disabled':'')+'>−</button><span>'+state.guests+'</span><button data-action="guest" data-delta="1" aria-label="'+t('more')+'" '+(state.guests===car().capacity?'disabled':'')+'>+</button></div></div><p class="preview-note">'+t('previewNote')+'</p></div>'+
      '<div class="calendar-panel"><div class="calendar-header"><h2>'+monthText+'</h2><div class="month-buttons"><button data-action="month" data-delta="-1" aria-label="'+t('previousMonth')+'" '+(state.month===0?'disabled':'')+'>‹</button><button data-action="month" data-delta="1" aria-label="'+t('nextMonth')+'" '+(state.month===2?'disabled':'')+'>›</button></div></div><div class="calendar-week" aria-hidden="true">'+weekdays+'</div><div class="calendar-days" role="group" aria-label="'+monthText+'">'+cells+'</div><p class="preview-note">'+t('previewCalendar')+'</p><div class="slot-area" aria-live="polite"><h3>'+t('times')+(state.date?' · '+dateLabel(state.date,true):'')+'</h3>'+times+'</div></div>'+summary(true)+'</div></section>';
  }
  function renderCheckout(){
    journey.innerHTML='<section class="flow-shell"><div class="checkout-layout"><div class="checkout-main">'+flowIntro('04','checkoutStep','checkoutTitle','checkoutIntro','date')+
      '<form id="checkout-form" class="checkout-form" novalidate><p class="form-error" id="checkout-error" role="alert" hidden></p><fieldset class="form-section"><legend>'+t('details')+'</legend><div class="form-grid">'+
      '<label class="form-field">'+t('first')+'<input name="first" value="'+esc(state.first)+'" required maxlength="80" autocomplete="given-name"></label><label class="form-field">'+t('last')+'<input name="last" value="'+esc(state.last)+'" required maxlength="80" autocomplete="family-name"></label>'+
      '<label class="form-field full">'+t('email')+'<input name="email" type="email" value="'+esc(state.email)+'" required maxlength="254" autocomplete="email"></label></div></fieldset>'+
      '<fieldset class="form-section"><legend>'+t('paymentPreview')+'</legend><div class="payment-preview"><div><strong>'+t('demoCard')+'</strong><span class="card-brand">VISA</span></div><p>•••• &nbsp; •••• &nbsp; •••• &nbsp; 4242</p><small>'+t('noCard')+'</small></div></fieldset>'+
      '<label class="checkout-consent"><input name="consent" type="checkbox" required '+(state.consent?'checked':'')+'><span>'+t('consent')+'</span></label><button class="primary-button checkout-submit" type="submit">'+t('previewBooking')+'</button><p class="preview-note">'+t('previewNote')+'</p></form></div>'+summary(false,true)+'</div></section>';
  }
  function renderConfirmation(){
    const liveUrl='https://octane-team.com'+(getLocale()==='fr'?'/fr':'')+'/experiences'+(state.route==='daikoku'?'/tokyo-and-daikoku-fast-and-furious-skyline':'');
    journey.innerHTML='<section class="flow-shell"><div class="confirmation-layout"><div><div class="confirmation-mark" aria-hidden="true">✓</div><p class="flow-step"><span>04</span><span>'+t('preview')+'</span><span>/ 04</span></p><h1 class="flow-title" tabindex="-1">'+t('confirmTitle')+'</h1><p class="confirmation-lead">'+t('confirmBody')+'</p><p class="confirmation-reference">'+t('reference')+' · OCT-PREVIEW</p><div class="meeting-point"><h3>'+t('meeting')+'</h3><p>'+t('meetingBody')+'</p></div><div class="confirmation-buttons"><button class="secondary-button" data-action="calendar">'+t('calendar')+'</button><a class="primary-button" href="'+liveUrl+'" target="_blank" rel="noopener">'+t('liveBooking')+'</a></div><button class="quiet-button" data-action="go" data-step="car" style="margin-top:1.3rem">'+t('startOver')+'</button><p class="sr-only" id="download-status" aria-live="polite"></p></div>'+summary(false,true)+'</div></section>';
  }
  function renderProgress(){
    const active=state.step==='confirmation'?3:steps.indexOf(state.step);
    progress.innerHTML=steps.map((step,index)=>'<button data-action="go" data-step="'+step+'" class="'+(index===active?'is-current':index<active?'is-complete':'')+'" '+(index>active?'disabled':'')+' '+(index===active?'aria-current="step"':'')+'><span>0'+(index+1)+'</span>'+t(['car','route','date','payment'][index])+'</button>').join('');
    progress.setAttribute('aria-label',getLocale()==='fr'?'Progression de réservation':'Booking progress');
  }
  function render(){
    renderProgress();
    if(state.step==='car')return;
    if(state.step==='routes')renderRoutes();
    else if(state.step==='date')renderDate();
    else if(state.step==='checkout')renderCheckout();
    else renderConfirmation();
  }
  function go(step,push=true){
    if(!['car','routes','date','checkout','confirmation'].includes(step))step='car';
    if(step==='checkout'&&!validSlot())step='date';
    if(step==='confirmation'&&!state.completed)step=validSlot()?'checkout':'date';
    const video=document.getElementById('route-video');video?.pause();
    state.step=step;
    garage.hidden=step!=='car';journey.hidden=step==='car';progress.hidden=step==='car';
    window.Octane.setGarageActive(step==='car');
    render();
    if(push)history.pushState({step},'',step==='car'?location.pathname:'#'+step);
    window.scrollTo({top:0,behavior:'instant'});
    const heading=step==='car'?document.getElementById('hero-title'):journey.querySelector('h1');
    heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true});
  }
  function addToCalendar(){
    const start=new Date(state.date+'T'+state.time+':00+09:00'),end=new Date(start.getTime()+route().duration*3600000);
    const stamp=date=>date.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
    const escapeICS=value=>String(value).replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/[,;]/g,'\\$&');
    const foldICS=line=>{let out='',bytes=0;for(const char of line){const size=new TextEncoder().encode(char).length;if(bytes+size>75){out+='\r\n ';bytes=1;}out+=char;bytes+=size;}return out;};
    const text=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Octane//Night ride preview//EN','BEGIN:VEVENT','UID:octane-preview-'+state.date+'-'+state.time.replace(':','')+'@octane.local','DTSTAMP:'+stamp(new Date()),'DTSTART:'+stamp(start),'DTEND:'+stamp(end),'SUMMARY:'+escapeICS('Octane '+t('preview')+' · '+t(state.route)),'LOCATION:Shibuya\\, Tokyo','DESCRIPTION:'+escapeICS(t('calendarDescription')+' '+car().name),'STATUS:TENTATIVE','END:VEVENT','END:VCALENDAR',''].map(foldICS).join('\r\n');
    const url=URL.createObjectURL(new Blob([text],{type:'text/calendar;charset=utf-8'}));
    const a=document.createElement('a');a.href=url;a.download='octane-preview-'+state.date+'.ics';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
    document.getElementById('download-status').textContent=t('calendarDownload');
  }
  document.addEventListener('click',event=>{
    const entry=event.target.closest('a[href="#routes"]');
    if(entry){event.preventDefault();document.getElementById('how-dialog').close();go('routes');return;}
    if(event.target.closest('.logo')){event.preventDefault();go('car');return;}
    const button=event.target.closest('[data-action]');if(!button||button.disabled)return;
    const action=button.dataset.action;
    if(action==='go'){go(button.dataset.step);return;}
    if(action==='route'){state.route=button.dataset.route;state.time='';state.completed=false;renderRoutes();journey.querySelector('[data-route="'+state.route+'"]').focus({preventScroll:true});return;}
    if(action==='day'){state.date=button.dataset.date;state.time='';state.completed=false;renderDate();journey.querySelector('[data-date="'+state.date+'"]').focus({preventScroll:true});return;}
    if(action==='slot'){state.time=button.dataset.time;state.completed=false;renderDate();journey.querySelector('[data-time="'+state.time+'"]').focus({preventScroll:true});return;}
    if(action==='guest'){const delta=button.dataset.delta;state.guests=Math.min(car().capacity,Math.max(1,state.guests+Number(delta)));if(!validSlot())state.time='';state.completed=false;renderDate();const target=journey.querySelector('.counter button[data-delta="'+delta+'"]:not(:disabled)')||journey.querySelector('.counter button:not(:disabled)');target?.focus({preventScroll:true});return;}
    if(action==='month'){const delta=button.dataset.delta;state.month=Math.min(2,Math.max(0,state.month+Number(delta)));renderDate();const target=journey.querySelector('.month-buttons button[data-delta="'+delta+'"]:not(:disabled)')||journey.querySelector('.month-buttons button:not(:disabled)');target?.focus({preventScroll:true});return;}
    if(action==='calendar'){addToCalendar();return;}
    if(action==='video'){
      const video=document.getElementById('route-video');
      if(video.paused){video.play().then(()=>{videoPaused=false;button.textContent='Ⅱ';button.setAttribute('aria-label',t('pause'));}).catch(()=>{});}
      else{video.pause();videoPaused=true;button.textContent='▶';button.setAttribute('aria-label',t('play'));}
    }
  });
  journey.addEventListener('input',event=>{
    const field=event.target;if(['first','last','email'].includes(field.name))state[field.name]=field.value;
    if(field.name==='consent')state.consent=field.checked;
  });
  journey.addEventListener('submit',event=>{
    if(event.target.id!=='checkout-form')return;event.preventDefault();
    const form=event.target;
    const first=form.elements.first,last=form.elements.last,email=form.elements.email,consent=form.elements.consent;
    if(!first.value.trim()||!last.value.trim()||!email.checkValidity()||!consent.checked){
      const error=document.getElementById('checkout-error');error.hidden=false;error.textContent=t('formError');
      (!first.value.trim()?first:!last.value.trim()?last:!email.checkValidity()?email:consent).focus();return;
    }
    if(!validSlot()){go('date');return;}
    state.first=first.value.trim();state.last=last.value.trim();state.email=email.value.trim();state.consent=consent.checked;state.completed=true;go('confirmation');
  });
  window.addEventListener('popstate',()=>go(location.hash.slice(1)||'car',false));
  window.addEventListener('octane:locale',()=>render());
  window.addEventListener('octane:car',()=>{state.completed=false;state.guests=Math.min(state.guests,car().capacity);if(!validSlot())state.time='';if(state.step!=='car')render();});
  document.addEventListener('visibilitychange',()=>{const video=document.getElementById('route-video');if(!video)return;if(document.hidden)video.pause();else if(!videoPaused&&!reducedMotion.matches)video.play().catch(()=>{});});
  go(location.hash.slice(1)||'car',false);
})();

import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
const clamp=(v,min,max)=>Math.min(max,Math.max(min,v));

export async function createCarExperience({host,photo,hint,reducedMotion,isActive,car}) {
  const art=host.parentElement,cache=new Map(),loader=new GLTFLoader();
  let active=isActive(),disposed=false,failed=false,entry=null,config=car,ready=false,revealed=false;
  let serial=0,animation=0,revealAnimation=0,baseAngle=0,hoverAngle=0,actualAngle=0,drag=null,locale='en';
  const initialAzimuth=.68,elevation=.13;
  let renderer,scene,camera,environment;
  const mesh=new Image();mesh.className='mesh-reveal';mesh.alt='';
  const surface=document.createElement('div');surface.className='car-surface';surface.setAttribute('role','slider');
  surface.setAttribute('aria-valuemin','-180');surface.setAttribute('aria-valuemax','180');surface.tabIndex=-1;
  host.dataset.renderer='threejs';
  function updateAria(){
    const degrees=Math.round(((baseAngle*180/Math.PI+180)%360+360)%360-180);
    surface.setAttribute('aria-label',(locale==='fr'?'Tourner la ':'Rotate ')+config.name);
    surface.setAttribute('aria-valuenow',String(degrees));surface.setAttribute('aria-valuetext',degrees+'°');
  }
  function render(){
    if(!renderer||!entry||disposed||failed)return;
    const azimuth=initialAzimuth+actualAngle;
    const distance=((config.id==='ae86'?9.2:8.8)+Math.max(0,Math.abs(Math.sin(azimuth))-Math.sin(initialAzimuth))*5.2)*Math.max(1,1.89/camera.aspect);
    const horizontal=distance*Math.cos(elevation);
    camera.position.set(horizontal*Math.sin(azimuth),distance*Math.sin(elevation),horizontal*Math.cos(azimuth));
    camera.lookAt(0,0,0);renderer.render(scene,camera);host.dataset.angle=String(Math.round(actualAngle*180/Math.PI));
  }
  function resize(){
    if(!renderer||disposed)return;
    const box=host.getBoundingClientRect();if(!box.width||!box.height)return;
    camera.aspect=box.width/box.height;camera.updateProjectionMatrix();renderer.setSize(box.width,box.height,false);render();
  }
  const resizeObserver=new ResizeObserver(resize);
  function stop(){cancelAnimationFrame(animation);animation=0;cancelAnimationFrame(revealAnimation);revealAnimation=0;}
  function tick(){
    animation=0;if(!active||!revealed||disposed||document.hidden)return;
    const desired=baseAngle+hoverAngle;actualAngle+=(desired-actualAngle)*(drag ? .32 : .12);render();
    if(Math.abs(desired-actualAngle)>.00015)animation=requestAnimationFrame(tick);
  }
  function wake(){if(!animation&&active&&revealed&&!document.hidden)animation=requestAnimationFrame(tick);}
  function endDrag(event){
    if(!drag||event.pointerId!==drag.id)return;
    baseAngle=actualAngle;hoverAngle=0;drag=null;surface.classList.remove('is-dragging');
    if(surface.hasPointerCapture(event.pointerId))surface.releasePointerCapture(event.pointerId);
    if(entry)entry.angle=baseAngle;updateAria();
  }
  surface.addEventListener('pointerdown',event=>{
    if(!active||!revealed||event.button!==0)return;
    baseAngle=actualAngle;hoverAngle=0;drag={id:event.pointerId,x:event.clientX,angle:baseAngle};
    surface.setPointerCapture(event.pointerId);surface.classList.add('is-dragging');surface.focus({preventScroll:true});
  });
  surface.addEventListener('pointermove',event=>{
    if(!active||!revealed)return;
    const box=surface.getBoundingClientRect();
    if(drag&&event.pointerId===drag.id){baseAngle=drag.angle-(event.clientX-drag.x)/Math.max(box.width,1)*Math.PI*1.5;hoverAngle=0;}
    else if(event.pointerType!=='touch'&&!reducedMotion.matches)hoverAngle=clamp((event.clientX-box.left)/box.width-.5,-.5,.5)*.09;
    wake();
  });
  surface.addEventListener('pointerleave',()=>{if(!drag){hoverAngle=0;wake();}});
  surface.addEventListener('pointerup',endDrag);surface.addEventListener('pointercancel',endDrag);
  surface.addEventListener('lostpointercapture',()=>{if(drag)endDrag({pointerId:drag.id});});
  surface.addEventListener('keydown',event=>{
    if(!revealed||!active||!['ArrowLeft','ArrowRight','Home'].includes(event.key))return;
    event.preventDefault();baseAngle=event.key==='Home'?0:baseAngle+(event.key==='ArrowLeft'?1:-1)*Math.PI/18;
    hoverAngle=0;entry.angle=baseAngle;updateAria();wake();
  });
  function showPhoto(){
    art.classList.remove('is-revealing','is-live');art.style.setProperty('--reveal','0');
    host.style.setProperty('--reveal','0');host.setAttribute('aria-hidden','true');host.style.visibility='hidden';
    photo.setAttribute('aria-hidden','false');surface.tabIndex=-1;hint.hidden=true;
  }
  function finishReveal(){
    if(!active||!entry)return;
    host.style.visibility='visible';host.style.setProperty('--reveal','1');art.style.setProperty('--reveal','1');
    art.classList.remove('is-revealing');art.classList.add('is-live');host.dataset.phase='ready';
    host.setAttribute('aria-hidden','false');photo.setAttribute('aria-hidden','true');surface.tabIndex=0;hint.hidden=false;
    revealed=true;entry.revealed=true;updateAria();
  }
  async function reveal(){
    if(!active||!ready||revealed||disposed||failed||!entry||entry.preparing)return;
    if(entry.revealed||reducedMotion.matches){resize();render();finishReveal();return;}
    const target=entry,token=serial;target.preparing=true;
    try{
      resize();target.rig.visible=false;target.shadow.visible=false;target.wire.visible=true;render();
      mesh.src=renderer.domElement.toDataURL('image/png');
      target.wire.visible=false;target.rig.visible=true;target.shadow.visible=true;render();
      await mesh.decode();
      if(disposed||token!==serial||!active||target!==entry)return;
      host.style.visibility='visible';art.classList.add('is-revealing');host.dataset.phase='revealing';
      const start=performance.now();
      const scan=now=>{
        if(!active||disposed||token!==serial){revealAnimation=0;return;}
        const t=clamp((now-start)/1900,0,1),value=t*t*(3-2*t);
        host.style.setProperty('--reveal',String(value));art.style.setProperty('--reveal',String(value));
        if(t<1)revealAnimation=requestAnimationFrame(scan);else{revealAnimation=0;finishReveal();}
      };
      revealAnimation=requestAnimationFrame(scan);
    }catch(error){if(token===serial)fail(error);}finally{target.preparing=false;}
  }
  function setActive(value){
    active=Boolean(value);
    if(!active){stop();if(drag)endDrag({pointerId:drag.id});if(entry)entry.angle=baseAngle;hoverAngle=0;showPhoto();}
    else if(ready){resize();render();if(revealed)finishReveal();else reveal();}
  }
  function fail(error){
    if(disposed)return;
    failed=true;ready=false;revealed=false;stop();showPhoto();host.dataset.phase='failed';
    console.warn('Octane: photograph retained because native 3D is unavailable.',error.message);
  }
  function finishMaterials(model,id){
    const presets={
      r34:{paint:['Material.001'],color:0xe3e5df,wheels:['Material.012'],rubber:['Material.011','Material.013'],glass:['Material.006'],trim:['Material.002']},
      r35:{paint:['auto','hw0123','material_33'],color:0x393b3d,wheels:['barrel','face1','cap1','cap2','lug_nuts'],rubber:['auto_2','auto_3'],glass:['glass1'],trim:['FrontColor','GLOSSTRIM','MATRIM','diff_carbon','frbpr','rbpr','hw_diff','material_25','material_28']},
      supra:{paint:['Car_Paint'],color:0x9fcf45,wheels:['Rim_crhome','Rim_BlackPiano'],rubber:['EXT_tyre'],glass:['Ext_Glass'],trim:['Gril','Mirror_Carbon','Plastic3','Black_Piano','Black_Plastic']},
      ae86:{paint:['Material.001'],color:0xe8e9e4,wheels:['Material.003'],rubber:['Material.004','Material.020'],glass:['Material.011'],trim:['Material.002']}
    };
    const preset=presets[id],visited=new Set(),paintCopies=new Map();
    model.traverse(object=>{
      if(!object.isMesh)return;
      // Separate the pigment from its lacquer instead of making paint behave like bare metal.
      const finish=source=>{
        let material=source;
        if(preset.paint.includes(source.name)&&!source.isMeshPhysicalMaterial){
          if(!paintCopies.has(source)){
            const lacquer=new THREE.MeshPhysicalMaterial();
            THREE.MeshStandardMaterial.prototype.copy.call(lacquer,source);
            lacquer.defines={STANDARD:'',PHYSICAL:''};paintCopies.set(source,lacquer);
          }
          material=paintCopies.get(source);
        }
        if(visited.has(material))return material;
        // Bind the map to each material: scene.environment alone overrides envMapIntensity in Three.js.
        visited.add(material);material.envMap=environment.texture;material.envMapIntensity=.3;
        if(preset.paint.includes(material.name)){
          // Hex paint swatches are sRGB; Color.set converts them to the linear lighting space.
          material.color.set(preset.color);material.metalness=.12;material.roughness=.38;
          material.clearcoat=.55;material.clearcoatRoughness=.3;material.envMapIntensity=.45;
        }else if(preset.rubber.includes(material.name)){
          material.color.set(0x17191b);material.metalness=0;material.roughness=.92;material.envMapIntensity=.035;
          if(material.isMeshPhysicalMaterial)material.clearcoat=0;
        }else if(preset.wheels.includes(material.name)){
          material.color.set(0x35393e);material.metalness=.65;material.roughness=.4;material.envMapIntensity=.4;
        }else if(preset.glass.includes(material.name)){
          material.color.set(0x10151a);material.metalness=0;material.roughness=.2;material.envMapIntensity=.1;
          if(material.isMeshPhysicalMaterial){material.specularIntensity=.5;material.transmission=0;material.clearcoat=0;}
          // GLTFLoader disables depth writes for BLEND glass. Restore them when making it opaque,
          // otherwise rear lamps can still be drawn over the cabin windows.
          material.opacity=1;material.transparent=false;material.depthWrite=true;
        }else if(preset.trim.includes(material.name)){
          material.color.set(0x202326);material.metalness=0;material.roughness=.68;material.envMapIntensity=.12;
        }
        if(id==='supra'&&material.name==='Glass_Light'){
          material.color.set(0x9aa3a9);material.metalness=0;material.roughness=.18;material.envMapIntensity=.3;
          material.transparent=true;material.opacity=.22;material.depthWrite=false;
        }
        if(id==='supra'&&material.name==='Light_on_head'){material.color.set(0xd8dfe3);material.emissive.set(0xd8dfe3);material.emissiveIntensity=.2;}
        if(id==='supra'&&['Ext_Tail_light','Ext_Tail_Light_2','Breaking_light'].includes(material.name)){material.color.set(0x9c1820);material.emissive.set(0x9c1820);material.emissiveIntensity=.08;}
        material.needsUpdate=true;return material;
      };
      object.material=Array.isArray(object.material)?object.material.map(finish):finish(object.material);
    });
    for(const source of paintCopies.keys())source.dispose();
  }
  async function load(next){
    let timer;
    const timeout=new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error('Model load timed out')),45000);});
    const gltf=await Promise.race([loader.loadAsync(new URL(next.model,import.meta.url).href),timeout]).finally(()=>clearTimeout(timer));
    const model=gltf.scene;model.updateMatrixWorld(true);
    const bounds=new THREE.Box3().setFromObject(model),size=bounds.getSize(new THREE.Vector3()),center=bounds.getCenter(new THREE.Vector3());
    const scale=4.4/Math.max(size.x,size.z),rig=new THREE.Group();
    model.position.sub(center);rig.add(model);rig.scale.setScalar(scale);finishMaterials(model,next.id);
    const wire=rig.clone(true),wireMaterial=new THREE.MeshBasicMaterial({color:0xff784a,wireframe:true,transparent:true,opacity:.85});
    wire.traverse(object=>{if(object.isMesh)object.material=wireMaterial;});wire.visible=false;
    const pixels=new Uint8Array(64*64*4);
    for(let y=0;y<64;y++)for(let x=0;x<64;x++)pixels[(y*64+x)*4+3]=Math.round(145*Math.pow(Math.max(0,1-Math.hypot((x-31.5)/31.5,(y-31.5)/31.5)),1.3));
    const texture=new THREE.DataTexture(pixels,64,64);texture.needsUpdate=true;
    const shadow=new THREE.Mesh(new THREE.PlaneGeometry(size.x*scale*1.35,size.z*scale*1.15),new THREE.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false}));
    shadow.rotation.x=-Math.PI/2;shadow.position.y=-size.y*scale/2-.015;
    return{rig,wire,shadow,angle:0,revealed:false,preparing:false};
  }
  async function setCar(next){
    const token=++serial;if(entry)entry.angle=baseAngle;
    stop();if(drag)endDrag({pointerId:drag.id});showPhoto();
    if(entry)scene.remove(entry.rig,entry.wire,entry.shadow);
    entry=null;config=next;ready=false;revealed=false;failed=false;hoverAngle=0;actualAngle=0;baseAngle=0;
    host.dataset.car=next.id;host.dataset.phase='loading';updateAria();
    try{
      if(!cache.has(next.id))cache.set(next.id,load(next).catch(error=>{cache.delete(next.id);throw error;}));
      const loaded=await cache.get(next.id);if(disposed||token!==serial)return;
      entry=loaded;scene.add(entry.rig,entry.wire,entry.shadow);baseAngle=entry.angle;actualAngle=baseAngle;ready=true;
      resize();render();updateAria();if(active)reveal();
    }catch(error){if(token===serial)fail(error);}
  }
  const onVisibility=()=>{if(document.hidden)stop();else if(active&&ready){resize();render();if(!revealed)reveal();else wake();}};
  document.addEventListener('visibilitychange',onVisibility);
  const controller={setCar,setActive,setLocale(value){locale=value;updateAria();},async destroy(){
    disposed=true;serial++;stop();resizeObserver.disconnect();document.removeEventListener('visibilitychange',onVisibility);
    const geometries=new Set(),materials=new Set(),textures=new Set();
    for(const promise of cache.values()){
      const result=await promise.catch(()=>null);if(!result)continue;
      for(const root of [result.rig,result.wire,result.shadow])root.traverse(object=>{
        if(object.geometry)geometries.add(object.geometry);
        for(const material of [].concat(object.material||[])){materials.add(material);for(const value of Object.values(material))if(value?.isTexture)textures.add(value);}
      });
    }
    textures.delete(environment?.texture);
    geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());
    environment?.dispose();renderer?.dispose();host.replaceChildren();
  }};
  try{
    renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));renderer.setClearColor(0x000000,0);
    renderer.outputColorSpace=THREE.SRGBColorSpace;
    renderer.toneMapping=THREE.NeutralToneMapping;renderer.toneMappingExposure=.9;
    renderer.domElement.className='inline-model';renderer.domElement.setAttribute('aria-hidden','true');
    renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();fail(new Error('Graphics context lost'));});
    host.replaceChildren(renderer.domElement,mesh,surface);scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(14,1,.05,100);
    const pmrem=new THREE.PMREMGenerator(renderer),room=new RoomEnvironment();environment=pmrem.fromScene(room,.04);
    scene.environment=environment.texture;scene.environmentIntensity=.45;room.dispose();pmrem.dispose();
    scene.add(new THREE.HemisphereLight(0xffffff,0x1a1c20,.3));
    const key=new THREE.DirectionalLight(0xffffff,1.6);key.position.set(-3,7,5);scene.add(key);
    const fill=new THREE.DirectionalLight(0xffffff,.45);fill.position.set(5,2,-4);scene.add(fill);
    resizeObserver.observe(host);resize();setCar(car);
  }catch(error){fail(error);}
  return controller;
}

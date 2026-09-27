import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import GUI from 'lil-gui';
import Stats from 'stats.js';
import gsap from 'gsap';
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from 'three-mesh-bvh';

import { box as _box } from './utils.js';
import { createWings } from './buildings/Wings.js';
import { createFrontFacade } from './buildings/FrontFacade.js';
import { createPerimeterFence } from './buildings/PerimeterFence.js';
import { createFarm } from './buildings/Farm.js';
import { createBasement } from './buildings/Basement.js';
import { buildSmartClassroom } from './buildings/SmartClassroom.js';
import { buildSpecializedWorkshops } from './buildings/SpecializedWorkshops.js';
import { buildCampus } from './sceneFactory.js';

THREE.Mesh.prototype.raycast = acceleratedRaycast;
THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaed3e4);
scene.fog = new THREE.Fog(0xaed3e4, 70, 175);

const box = (...args) => {
  const b = _box(...args);
  scene.add(b);
  return b;
};

const camera = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, 0.1, 500);
camera.position.set(42, 34, 58);

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.0));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
document.body.appendChild(renderer.domElement);

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(innerWidth, innerHeight);
labelRenderer.domElement.style.position = 'fixed';
labelRenderer.domElement.style.inset = '0';
labelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(labelRenderer.domElement);

const stats = new Stats();
stats.showPanel(0);
stats.dom.style.left = 'auto';
stats.dom.style.right = '12px';
stats.dom.style.bottom = '92px';
stats.dom.style.top = 'auto';
stats.dom.style.display = 'none';
document.body.appendChild(stats.dom);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 7, 0);
controls.enableDamping = true;
controls.maxPolarAngle = Math.PI * 0.48;
controls.minDistance = 23;
controls.maxDistance = 115;

scene.add(new THREE.HemisphereLight(0xe3f4ff, 0x355c31, 2));
const sun = new THREE.DirectionalLight(0xfff4d6, 3.2);
sun.position.set(-35, 58, 30);
sun.castShadow = true;
sun.shadow.mapSize.set(1024, 1024);
sun.shadow.bias = -0.0004;
sun.shadow.camera.left = -70;
sun.shadow.camera.right = 70;
sun.shadow.camera.top = 70;
sun.shadow.camera.bottom = -70;
scene.add(sun);

const sky = new Sky();
sky.scale.setScalar(450);
scene.add(sky);
sky.material.uniforms.turbidity.value = 7;
sky.material.uniforms.rayleigh.value = 1.8;
sky.material.uniforms.mieCoefficient.value = 0.006;
sky.material.uniforms.mieDirectionalG.value = 0.8;
const sunPosition = new THREE.Vector3();
sunPosition.setFromSphericalCoords(1, THREE.MathUtils.degToRad(58), THREE.MathUtils.degToRad(135));
sky.material.uniforms.sunPosition.value.copy(sunPosition);

const surfaceGroup = new THREE.Group();
scene.add(surfaceGroup);

const ground = new THREE.Mesh(new THREE.PlaneGeometry(300, 240), new THREE.MeshStandardMaterial({ color: 0x789c72, roughness: 1 }));
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
surfaceGroup.add(ground);

const colliders = [];

createWings(surfaceGroup, colliders);
createFrontFacade(surfaceGroup, colliders);
createPerimeterFence(surfaceGroup, colliders);
createFarm(surfaceGroup);
const { group: basementGroup, waterMesh } = createBasement(scene);
buildCampus(surfaceGroup, (w, h, d, mat, x, y, z) => {
  const b = _box(w, h, d, mat, x, y, z);
  surfaceGroup.add(b);
  return b;
});
const classroomGroup = buildSmartClassroom(scene);
const workshopsGroup = buildSpecializedWorkshops(scene);

const zoneLabels = [];
const settings = {
  sunIntensity: sun.intensity,
  showFps: false,
  showLabels: true,
  quality: 'Alto'
};

const gui = new GUI({ title: 'Campus 3D' });
gui.close();
gui.add(settings, 'sunIntensity', 0, 6, 0.1).name('Luz solar').onChange((value) => { sun.intensity = value; });
gui.add(settings, 'showLabels').name('Etiquetas').onChange((value) => {
  zoneLabels.forEach((item) => { item.object.visible = value; });
});
gui.add(settings, 'showFps').name('Mostrar FPS').onChange((value) => {
  stats.dom.style.display = value ? 'block' : 'none';
});
gui.add(settings, 'quality', ['Alto', 'Medio']).name('Calidad').onChange((value) => {
  const high = value === 'Alto';
  renderer.setPixelRatio(Math.min(devicePixelRatio, high ? 2 : 1));
  sun.shadow.mapSize.set(high ? 2048 : 1024, high ? 2048 : 1024);
  sun.shadow.map?.dispose();
  sun.shadow.map = null;
});

function zoneLabel(text, x, y, z, id) {
  const label = document.createElement('div');
  label.className = 'zone-label';
  label.textContent = text;
  const object = new CSS2DObject(label);
  object.position.set(x, y, z);
  scene.add(object);
  zoneLabels.push({ object, position: object.position, id });
}

zoneLabel('Patio central', 0, 3.4, 1, 'patio');
zoneLabel('Finca / Granja', 6, 5.2, -40, 'finca');
zoneLabel('Acceso principal', 0, 4.4, 26.8, 'acceso');
zoneLabel('Cancha de Vóleibol', 43, 4, -38, 'voley');
zoneLabel('Cancha de Básquet', 68, 4, -38, 'basket');
zoneLabel('Cicloparqueadero', 32, 3.5, 0, 'bikes');
zoneLabel('🏊 Taller de natación', -17, -4.5, 0, 'basement-pool');
zoneLabel('⏱️ Pizarra y material deportivo', -22, -4.2, 4, 'basement-gear');
zoneLabel('🏪 Gran Kiosko y Cafetería Tangüis', 24.5, -4.5, -7.5, 'basement-cafe');
zoneLabel('🌱 Bio-Huerto vertical NFT', 28, -4.2, 0, 'basement-hydro');
zoneLabel('🏫 Gran Aula Magna Inteligente 2035', 0, -12.5, -28, 'workshop-classroom');
zoneLabel('🩰 Gran Conservatorio de Ballet Clásico', -34, -12.0, 0, 'workshop-ballet');
zoneLabel('🥋 Gran Dojang de Taekwondo WTF', 34, -12.0, 0, 'workshop-taekwondo');

const targets = {
  front: { p: new THREE.Vector3(0, 18, 74), t: new THREE.Vector3(0, 7, 18), button: 'front' },
  court: { p: new THREE.Vector3(0, 48, 26), t: new THREE.Vector3(0, 1.2, 0), button: 'court' },
  classroom: { p: new THREE.Vector3(0, -13.6, -19.5), t: new THREE.Vector3(0, -14.6, -29.0), button: 'classroom' },
  ballet: { p: new THREE.Vector3(-30.0, -14.0, 2.5), t: new THREE.Vector3(-34.0, -14.5, 0), button: 'ballet' },
  taekwondo: { p: new THREE.Vector3(30.0, -14.0, 2.5), t: new THREE.Vector3(34.0, -14.5, 0), button: 'taekwondo' },
  garden: { p: new THREE.Vector3(12, 16, -74), t: new THREE.Vector3(6, 1.5, -40), button: 'garden' },
  sports: { p: new THREE.Vector3(90, 30, -38), t: new THREE.Vector3(56, 1, -38), button: 'sports' },
  bikes: { p: new THREE.Vector3(45, 6, 32), t: new THREE.Vector3(33, 1.5, 15), button: 'bikes' },
  basement: { p: new THREE.Vector3(0, -3.6, 15), t: new THREE.Vector3(0, -5.2, -4), button: 'basement' },
  pool: { p: new THREE.Vector3(-7.5, -3.8, 5.0), t: new THREE.Vector3(-18.5, -5.2, -1.0), button: 'pool' },
  cafe: { p: new THREE.Vector3(8.5, -4.2, -6.5), t: new THREE.Vector3(24.0, -5.2, -7.5), button: 'cafe' },
  free: { p: new THREE.Vector3(42, 34, 58), t: new THREE.Vector3(0, 7, 0), button: 'reset' }
};

const collisionRaycaster = new THREE.Raycaster();

function constrainCamera() {
  if (camera.position.y < 0.2 || controls.target.y < 0.2) return;
  if (controls.target.z < -14 && controls.target.y < 4.5) return; // Inside classroom
  const direction = new THREE.Vector3().subVectors(camera.position, controls.target);
  const distance = direction.length();
  direction.normalize();
  collisionRaycaster.set(controls.target, direction);
  const hit = collisionRaycaster.intersectObjects(colliders, false)[0];
  if (hit && hit.distance < distance) {
    camera.position.copy(controls.target).addScaledVector(direction, Math.max(4, hit.distance - 0.7));
  }
}

function setActiveView(buttonId) {
  document.querySelectorAll('.controls button').forEach((button) => {
    const active = button.id === buttonId;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

function move(v) {
  const target = targets[v];
  if (!target) return;
  setActiveView(target.button);

  const isStudio = v === 'classroom' || v === 'ballet' || v === 'taekwondo';
  const isBasement = v === 'basement' || v === 'pool' || v === 'cafe';

  if (isStudio) {
    controls.minDistance = 1.0;
    controls.maxDistance = 15;
    controls.maxPolarAngle = Math.PI * 0.62;
  } else if (isBasement) {
    controls.minDistance = 2;
    controls.maxDistance = 55;
    controls.maxPolarAngle = Math.PI * 0.58;
  } else {
    controls.minDistance = 12;
    controls.maxDistance = 115;
    controls.maxPolarAngle = Math.PI * 0.48;
  }

  gsap.killTweensOf(camera.position);
  gsap.killTweensOf(controls.target);
  gsap.to(camera.position, { x: target.p.x, y: target.p.y, z: target.p.z, duration: 1.5, ease: 'power3.inOut' });
  gsap.to(controls.target, { x: target.t.x, y: target.t.y, z: target.t.z, duration: 1.5, ease: 'power3.inOut' });
}

// =========================================================================
// AUTOMATED CINEMATIC TOUR CONTROLLER
// =========================================================================
const tourSteps = [
  { key: 'front', title: '1/11 · Fachada y Acceso Principal', duration: 10000 },
  { key: 'court', title: '2/11 · Vista Aérea del Patio Central', duration: 11000 },
  { key: 'classroom', title: '3/11 · Gran Aula Magna Tecnológica 2035', duration: 12000 },
  { key: 'ballet', title: '4/11 · Gran Conservatorio de Ballet Clásico', duration: 12000 },
  { key: 'taekwondo', title: '5/11 · Gran Dojang de Taekwondo Olímpico', duration: 12000 },
  { key: 'garden', title: '6/11 · Bio-Huerto y Finca Escolar', duration: 10000 },
  { key: 'sports', title: '7/11 · Canchas Deportivas (Vóley y Básquet)', duration: 10000 },
  { key: 'bikes', title: '8/11 · Cicloparqueadero y Eco-Reciclaje', duration: 10000 },
  { key: 'basement', title: '9/11 · Entrada al Sótano Ecológico', duration: 9000 },
  { key: 'pool', title: '10/11 · Taller de Natación (Piscina Olímpica)', duration: 12000 },
  { key: 'cafe', title: '11/11 · Kiosko Escolar y Autoservicio', duration: 10000 }
];

let tourActive = false;
let tourPaused = false;
let tourIndex = 0;
let tourStartTime = 0;
let tourElapsedBeforePause = 0;

const tourPlayer = document.getElementById('tour-player');
const tourTitle = document.getElementById('tour-title');
const tourProgress = document.getElementById('tour-progress');
const tourToggleBtn = document.getElementById('tour-toggle');
const tourPlayPauseBtn = document.getElementById('tour-play-pause');
const tourPrevBtn = document.getElementById('tour-prev');
const tourNextBtn = document.getElementById('tour-next');
const tourCloseBtn = document.getElementById('tour-close');

function setTourStep(idx) {
  tourIndex = (idx + tourSteps.length) % tourSteps.length;
  const step = tourSteps[tourIndex];
  move(step.key);

  if (tourTitle) tourTitle.textContent = step.title;
  tourStartTime = performance.now();
  tourElapsedBeforePause = 0;
  if (tourProgress) tourProgress.style.width = '0%';
}

function startTour(fromIndex = 0) {
  tourActive = true;
  tourPaused = false;
  if (tourPlayer) tourPlayer.style.display = 'flex';
  if (tourToggleBtn) {
    tourToggleBtn.classList.add('is-active');
    tourToggleBtn.textContent = '⏹ Detener recorrido';
  }
  if (tourPlayPauseBtn) tourPlayPauseBtn.textContent = '⏸ Pausa';
  setTourStep(fromIndex);
}

function stopTour() {
  tourActive = false;
  tourPaused = false;
  if (tourPlayer) tourPlayer.style.display = 'none';
  if (tourToggleBtn) {
    tourToggleBtn.classList.remove('is-active');
    tourToggleBtn.textContent = '🎬 Iniciar recorrido';
  }
  if (tourProgress) tourProgress.style.width = '0%';
}

function toggleTour() {
  if (tourActive) {
    stopTour();
  } else {
    startTour(0);
  }
}

function togglePlayPauseTour() {
  if (!tourActive) {
    startTour(0);
    return;
  }
  if (tourPaused) {
    tourPaused = false;
    tourStartTime = performance.now() - tourElapsedBeforePause;
    if (tourPlayPauseBtn) tourPlayPauseBtn.textContent = '⏸ Pausa';
  } else {
    tourPaused = true;
    tourElapsedBeforePause = performance.now() - tourStartTime;
    if (tourPlayPauseBtn) tourPlayPauseBtn.textContent = '▶ Reanudar';
  }
}

function nextTourStep() {
  if (!tourActive) {
    startTour(1);
    return;
  }
  setTourStep(tourIndex + 1);
}

function prevTourStep() {
  if (!tourActive) {
    startTour(tourSteps.length - 1);
    return;
  }
  setTourStep(tourIndex - 1);
}

if (tourToggleBtn) tourToggleBtn.onclick = toggleTour;
if (tourPlayPauseBtn) tourPlayPauseBtn.onclick = togglePlayPauseTour;
if (tourNextBtn) tourNextBtn.onclick = nextTourStep;
if (tourPrevBtn) tourPrevBtn.onclick = prevTourStep;
if (tourCloseBtn) tourCloseBtn.onclick = stopTour;

document.getElementById('front').onclick = () => { if (tourActive) setTourStep(0); else move('front'); };
document.getElementById('court').onclick = () => { if (tourActive) setTourStep(1); else move('court'); };
document.getElementById('classroom').onclick = () => { if (tourActive) setTourStep(2); else move('classroom'); };
document.getElementById('ballet').onclick = () => { if (tourActive) setTourStep(3); else move('ballet'); };
document.getElementById('taekwondo').onclick = () => { if (tourActive) setTourStep(4); else move('taekwondo'); };
document.getElementById('garden').onclick = () => { if (tourActive) setTourStep(5); else move('garden'); };
document.getElementById('sports').onclick = () => { if (tourActive) setTourStep(6); else move('sports'); };
document.getElementById('bikes').onclick = () => { if (tourActive) setTourStep(7); else move('bikes'); };
document.getElementById('basement').onclick = () => { if (tourActive) setTourStep(8); else move('basement'); };
document.getElementById('pool').onclick = () => { if (tourActive) setTourStep(9); else move('pool'); };
document.getElementById('cafe').onclick = () => { if (tourActive) setTourStep(10); else move('cafe'); };
document.getElementById('reset').onclick = () => { stopTour(); move('free'); };
setActiveView('reset');

window.addEventListener('keydown', (event) => {
  if (event.target instanceof HTMLInputElement) return;
  if (event.key === 'ArrowRight') {
    event.preventDefault();
    nextTourStep();
    return;
  }
  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    prevTourStep();
    return;
  }
  if (event.key === ' ' || event.code === 'Space') {
    if (tourActive) {
      event.preventDefault();
      togglePlayPauseTour();
      return;
    }
  }

  const keys = {
    1: 'front',
    2: 'court',
    3: 'classroom',
    4: 'ballet',
    5: 'taekwondo',
    6: 'garden',
    7: 'sports',
    8: 'bikes',
    9: 'basement',
    0: 'pool'
  };
  if (keys[event.key]) {
    if (tourActive) {
      const idx = tourSteps.findIndex((s) => s.key === keys[event.key]);
      if (idx !== -1) setTourStep(idx);
    } else {
      move(keys[event.key]);
    }
  }
});

window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  labelRenderer.setSize(innerWidth, innerHeight);
});

function tick() {
  requestAnimationFrame(tick);
  if (settings.showFps) stats.begin();
  controls.update();
  constrainCamera();

  // Update Automated Tour Timeline Progress Bar
  if (tourActive && !tourPaused) {
    const step = tourSteps[tourIndex];
    const elapsed = performance.now() - tourStartTime;
    const progressPercent = Math.min(100, (elapsed / step.duration) * 100);
    if (tourProgress) tourProgress.style.width = `${progressPercent}%`;

    if (elapsed >= step.duration) {
      setTourStep(tourIndex + 1);
    }
  }

  const camY = camera.position.y;
  const isLevel2 = camY < -9.5;
  const isBasement = camY >= -9.5 && camY < 0.5;
  const isSurface = camY >= 0.5;

  // Hierarchical Zone / Level Culling (Dramatic FPS Boost)
  if (workshopsGroup) workshopsGroup.visible = isLevel2 || camY < -7.0;
  if (classroomGroup) classroomGroup.visible = isLevel2 || camY < -7.0;
  if (basementGroup) basementGroup.visible = isBasement || (camY < 2.5 && camY > -11.0);
  if (surfaceGroup) surfaceGroup.visible = isSurface || (camY > -5.0 && camera.position.z > 8.0);
  if (sky) sky.visible = isSurface;
  sun.castShadow = isSurface;

  // Dynamic pool water ripple animation only when in basement
  if (waterMesh && waterMesh.geometry && isBasement) {
    const time = performance.now() * 0.0024;
    const pos = waterMesh.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const u = pos.getX(i);
      const v = pos.getY(i);
      const wave = Math.sin(u * 0.8 + time * 2.2) * 0.04 + Math.cos(v * 0.6 + time * 1.8) * 0.04;
      pos.setZ(i, wave);
    }
    pos.needsUpdate = true;
  }

  if (settings.showLabels) {
    const isLevel2 = camera.position.y < -9.5;
    const isBasement = camera.position.y >= -9.5 && camera.position.y < 0.5;
    const camZ = camera.position.z;
    zoneLabels.forEach((item) => {
      const isWorkshopItem = item.id.startsWith('workshop-');
      const isBasementItem = item.id.startsWith('basement-');

      if (isLevel2) {
        item.object.visible = isWorkshopItem && camera.position.distanceTo(item.position) < 55;
      } else if (isBasement) {
        item.object.visible = isBasementItem && camera.position.distanceTo(item.position) < 48;
      } else {
        if (isBasementItem || isWorkshopItem) {
          item.object.visible = false;
          return;
        }
        const near = camera.position.distanceTo(item.position) < 78;
        const inZone =
          (item.id === 'patio' && camZ < 48 && camZ > -18) ||
          (item.id === 'acceso' && camZ > 30) ||
          (item.id === 'finca' && camZ < -8) ||
          (item.id === 'voley') ||
          (item.id === 'basket') ||
          (item.id === 'bikes');
        item.object.visible = near && inZone;
      }
    });
  }

  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
  if (settings.showFps) stats.end();
}

tick();

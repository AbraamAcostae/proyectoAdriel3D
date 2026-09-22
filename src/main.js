import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import GUI from 'lil-gui';
import Stats from 'stats.js';
import gsap from 'gsap';
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from 'three-mesh-bvh';

import { box as _box } from './utils.js';
import * as mats from './materials.js';
import { createWings } from './buildings/Wings.js';
import { createFrontFacade } from './buildings/FrontFacade.js';
import { createPerimeterFence } from './buildings/PerimeterFence.js';
import { createFarm } from './buildings/Farm.js';

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

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
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
stats.dom.style.top = '12px';
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
sun.shadow.mapSize.set(2048, 2048);
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

const ground = new THREE.Mesh(new THREE.PlaneGeometry(220, 220), new THREE.MeshStandardMaterial({color: 0x789c72, roughness: 1}));
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

const colliders = [];

// Create buildings and fences
createWings(scene, colliders);
createFrontFacade(scene, colliders);
createPerimeterFence(scene, colliders);
createFarm(scene);

// Main street frontage: sidewalk, road, trees and passing cars
const street = new THREE.MeshStandardMaterial({color: 0x3f4a49, roughness: 1}), sidewalk = new THREE.MeshStandardMaterial({color: 0xd8d5c8, roughness: 0.9}), curb = new THREE.MeshStandardMaterial({color: 0xe4b52e, roughness: 0.8});
box(58, 0.12, 12, street, 0, 0.06, 34);
box(58, 0.18, 4, sidewalk, 0, 0.18, 27.8);
box(58, 0.12, 0.35, curb, 0, 0.31, 29.8);
box(58, 0.12, 0.35, curb, 0, 0.31, 38.2);

function streetTree(x) {
  const trunk = box(0.25, 2.5, 0.25, mats.wood, x, 1.25, 28.8);
  const crown = new THREE.Mesh(new THREE.SphereGeometry(1.35, 12, 9), new THREE.MeshStandardMaterial({color: 0x4c9448, roughness: 1}));
  crown.position.set(x, 3.1, 28.8);
  crown.castShadow = true;
  scene.add(crown);
}
[-22, -15, 15, 22].forEach(streetTree);

function car(x, color, scale = 1) {
  box(3.2 * scale, 0.55, 1.5 * scale, new THREE.MeshStandardMaterial({color, roughness: 0.55}), x, 0.72, 34.2);
  box(1.5 * scale, 0.55, 1.25 * scale, mats.glass, x, 0.98, 34.2);
  for(const wheelX of [x - 1.05 * scale, x + 1.05 * scale]) {
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.34 * scale, 0.34 * scale, 0.18, 16), mats.dark);
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(wheelX, 0.38, 34.2);
    scene.add(wheel);
  }
}
car(-15, 0x263b42, 0.95);
car(16, 0xd65b32, 1.05);

// Courtyard (Modern Soccer Field and Plaza)
// Base plaza concrete
box(32, 0.18, 30, new THREE.MeshStandardMaterial({color: 0xc9c6b8, roughness: 0.95}), 0, 0.1, 1);

// Big Soccer Field (Cancha de fútbol)
const fieldWidth = 24;
const fieldDepth = 26;
const fieldCenterZ = 1;
box(fieldWidth, 0.16, fieldDepth, mats.turf, 0, 0.23, fieldCenterZ);

// White lines for the field
const line = new THREE.MeshStandardMaterial({color: 0xffffff, roughness: 0.8});
const lineY = 0.32;
// Outer bounds
box(fieldWidth, 0.03, 0.15, line, 0, lineY, fieldCenterZ - fieldDepth/2); // Top
box(fieldWidth, 0.03, 0.15, line, 0, lineY, fieldCenterZ + fieldDepth/2); // Bottom
box(0.15, 0.03, fieldDepth, line, -fieldWidth/2, lineY, fieldCenterZ); // Left
box(0.15, 0.03, fieldDepth, line, fieldWidth/2, lineY, fieldCenterZ); // Right
// Center line
box(fieldWidth, 0.03, 0.15, line, 0, lineY, fieldCenterZ);
// Center circle
const circle = new THREE.Mesh(new THREE.TorusGeometry(3, 0.07, 8, 32), line);
circle.rotation.x = -Math.PI / 2;
circle.position.set(0, lineY, fieldCenterZ);
scene.add(circle);
// Penalty boxes
box(10, 0.03, 0.15, line, 0, lineY, fieldCenterZ - fieldDepth/2 + 4);
box(0.15, 0.03, 4, line, -5, lineY, fieldCenterZ - fieldDepth/2 + 2);
box(0.15, 0.03, 4, line, 5, lineY, fieldCenterZ - fieldDepth/2 + 2);

box(10, 0.03, 0.15, line, 0, lineY, fieldCenterZ + fieldDepth/2 - 4);
box(0.15, 0.03, 4, line, -5, lineY, fieldCenterZ + fieldDepth/2 - 2);
box(0.15, 0.03, 4, line, 5, lineY, fieldCenterZ + fieldDepth/2 - 2);

// Goals (Arcos)
function goal(z, side) {
  // Crossbar
  box(4.2, 0.12, 0.12, line, 0, 2.2, z);
  // Posts
  box(0.12, 2.2, 0.12, line, -2.1, 1.1, z);
  box(0.12, 2.2, 0.12, line, 2.1, 1.1, z);
  // Net (simplified with green transparent glass)
  const netMat = new THREE.MeshStandardMaterial({color: 0xffffff, transparent: true, opacity: 0.2, wireframe: true});
  const netZ = z + (side * 0.8);
  box(4.2, 2.2, 0.05, netMat, 0, 1.1, netZ);
  box(0.05, 2.2, 0.8, netMat, -2.1, 1.1, z + (side * 0.4));
  box(0.05, 2.2, 0.8, netMat, 2.1, 1.1, z + (side * 0.4));
}
goal(fieldCenterZ - fieldDepth/2, -1);
goal(fieldCenterZ + fieldDepth/2, 1);

// Planters and Benches around the courtyard
function courtyardPlanter(x, z, w, d) {
  box(w, 0.4, d, mats.concrete, x, 0.3, z); // concrete base
  box(w - 0.2, 0.1, d - 0.2, mats.soil, x, 0.5, z); // soil
  for(let qx = -w/2 + 0.4; qx < w/2; qx += 1.5) {
    for(let qz = -d/2 + 0.4; qz < d/2; qz += 1.5) {
      const plant = new THREE.Mesh(new THREE.SphereGeometry(0.45, 9, 7), mats.leafMat);
      plant.position.set(x + qx, 0.8, z + qz);
      scene.add(plant);
    }
  }
}
// Add planters on the corners of the plaza
courtyardPlanter(-14, -12, 3, 3);
courtyardPlanter(14, -12, 3, 3);
courtyardPlanter(-14, 14, 3, 3);
courtyardPlanter(14, 14, 3, 3);

// Solar roof arrays
function panels(x, z, w, d) {
  for(let a = 0; a < w; a++) {
    for(let b = 0; b < d; b++) {
      const p = box(1.35, 0.08, 0.78, mats.solar, x + (a - (w - 1) / 2) * 1.48, 12.55, z + (b - (d - 1) / 2) * 0.95);
      p.rotation.x = -0.18;
    }
  }
}
panels(-20, 0, 5, 12); panels(20, 0, 5, 12); panels(0, -23, 18, 2); panels(3, 23, 12, 2);

// GUI setup (cleaned up since we removed huerto and solar toggles to keep it simple for now, or just sun)
const gui = new GUI({title: 'Campus 3D'});
const settings = {sunIntensity: sun.intensity};
gui.add(settings, 'sunIntensity', 0, 6, 0.1).name('Luz solar').onChange((value) => sun.intensity = value);

// Flag + shadow students
box(0.1, 10, 0.1, mats.concrete, 12, 5, 15);
const flag = new THREE.Mesh(new THREE.PlaneGeometry(3.3, 2.1), new THREE.MeshStandardMaterial({color: 0xffffff, side: THREE.DoubleSide}));
flag.position.set(13.7, 8.5, 15);
scene.add(flag);
const red1 = box(0.75, 0.01, 2.1, new THREE.MeshStandardMaterial({color: 0xd92930}), 12.6, 8.5, 15.02);
red1.rotation.x = -Math.PI / 2;
const red2 = box(0.75, 0.01, 2.1, new THREE.MeshStandardMaterial({color: 0xd92930}), 14.8, 8.5, 15.02);
red2.rotation.x = -Math.PI / 2;

for(let i = 0; i < 15; i++) {
  const x = -8 + (i % 6) * 3.1, z = -1 + Math.floor(i / 6) * 3.5;
  const student = box(0.42, 1.5, 0.42, new THREE.MeshStandardMaterial({color: i % 2 ? 0x1c2836 : 0xf0eee8}), x, 0.95, z);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 8), new THREE.MeshStandardMaterial({color: 0x8c5d40}));
  head.position.set(x, 1.85, z);
  head.castShadow = true;
  scene.add(head);
}

// Distant hills
const hillMat = new THREE.MeshStandardMaterial({color: 0x779f7b, roughness: 1});
for(let i = 0; i < 20; i++) {
  const h = new THREE.Mesh(new THREE.ConeGeometry(10 + Math.random() * 15, 15 + Math.random() * 24, 7), hillMat);
  h.position.set(-100 + i * 11, 8, -110 - Math.random() * 30);
  scene.add(h);
}

function zoneLabel(text, x, y, z) {
  const label = document.createElement('div');
  label.className = 'zone-label';
  label.textContent = text;
  const object = new CSS2DObject(label);
  object.position.set(x, y, z);
  scene.add(object);
}
zoneLabel('Patio central', 0, 2.8, 2);
zoneLabel('Finca / Granja', 0, 7, -40); // Replaced Huerto and Zona Tecnica
zoneLabel('Acceso principal', 0, 14, 24);

const targets = {
  front: {p: new THREE.Vector3(0, 22, 82), t: new THREE.Vector3(0, 6, 12)},
  court: {p: new THREE.Vector3(0, 27, 34), t: new THREE.Vector3(0, 3, 0)},
  garden: {p: new THREE.Vector3(0, 28, -82), t: new THREE.Vector3(0, 1, -36)},
  free: {p: new THREE.Vector3(42, 34, 58), t: new THREE.Vector3(0, 7, 0)}
};
const collisionRaycaster = new THREE.Raycaster();

function constrainCamera() {
  const direction = new THREE.Vector3().subVectors(camera.position, controls.target);
  const distance = direction.length();
  direction.normalize();
  collisionRaycaster.set(controls.target, direction);
  const hit = collisionRaycaster.intersectObjects(colliders, false)[0];
  if(hit && hit.distance < distance) {
    camera.position.copy(controls.target).addScaledVector(direction, Math.max(4, hit.distance - 0.7));
  }
}

function move(v) {
  const target = targets[v];
  gsap.killTweensOf(camera.position);
  gsap.killTweensOf(controls.target);
  gsap.to(camera.position, {x: target.p.x, y: target.p.y, z: target.p.z, duration: 1.5, ease: 'power3.inOut'});
  gsap.to(controls.target, {x: target.t.x, y: target.t.y, z: target.t.z, duration: 1.5, ease: 'power3.inOut'});
}

document.getElementById('front').onclick = () => move('front');
document.getElementById('court').onclick = () => move('court');
document.getElementById('garden').onclick = () => move('garden');
document.getElementById('reset').onclick = () => move('free');

window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  labelRenderer.setSize(innerWidth, innerHeight);
});

function tick() {
  requestAnimationFrame(tick);
  stats.begin();
  controls.update();
  constrainCamera();
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
  stats.end();
}
tick();

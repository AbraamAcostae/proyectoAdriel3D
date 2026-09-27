import * as THREE from 'three';
import * as mats from './materials.js';
import { instancedBoxes } from './utils.js';

function streetTree(scene, box, x, z = 27.5) {
  const trunk = box(0.25, 2.5, 0.25, mats.wood, x, 1.25, z);
  trunk.castShadow = true;

  const crown = new THREE.Mesh(new THREE.SphereGeometry(1.35, 12, 9), new THREE.MeshStandardMaterial({ color: 0x4c9448, roughness: 1 }));
  crown.position.set(x, 3.1, z);
  crown.castShadow = true;
  scene.add(crown);
}

function streetLightPole(scene, box, x, z = 44.8) {
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x4a555e, metalness: 0.8, roughness: 0.35 });
  const lampGlowMat = new THREE.MeshBasicMaterial({ color: 0xfffae0 });
  // Vertical pole
  box(0.2, 7.5, 0.2, poleMat, x, 3.75, z);
  // Curved/horizontal arm reaching over road
  box(0.14, 0.14, 3.2, poleMat, x, 7.45, z - 1.6);
  // Luminaire fixture
  box(0.38, 0.14, 0.9, poleMat, x, 7.4, z - 3.2);
  // LED glow emitter
  const glow = box(0.3, 0.04, 0.76, lampGlowMat, x, 7.3, z - 3.2);
  scene.add(glow);
}

function createVehicle(scene, box, { x, z, color, type = 'car', dir = 1, scale = 1 }) {
  const headLightMat = new THREE.MeshBasicMaterial({ color: 0xfffae0 });
  const tailLightMat = new THREE.MeshBasicMaterial({ color: 0xff2020 });
  const bodyMat = new THREE.MeshStandardMaterial({ color, roughness: 0.45, metalness: 0.3 });
  const wheelMat = mats.dark;
  const hubMat = new THREE.MeshStandardMaterial({ color: 0xd0d0d0, metalness: 0.85, roughness: 0.25 });

  const addWheel = (wx, wz, r = 0.35 * scale, w = 0.2) => {
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(r, r, w, 16), wheelMat);
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(wx, r, wz);
    scene.add(wheel);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.45, r * 0.45, w + 0.02, 12), hubMat);
    hub.rotation.z = Math.PI / 2;
    hub.position.set(wx, r, wz);
    scene.add(hub);
  };

  if (type === 'bus') {
    const len = 9.4 * scale;
    const wid = 2.45 * scale;
    const hei = 2.4 * scale;
    box(len, hei, wid, bodyMat, x, hei / 2 + 0.3, z);
    box(len * 0.98, 0.18, wid * 0.96, new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.4 }), x, hei + 0.38, z);
    box(0.08, 1.05 * scale, wid * 0.88, mats.glass, x + dir * (len / 2 + 0.02), 1.7 * scale, z);
    box(len * 0.86, 0.95 * scale, wid + 0.05, mats.glass, x - dir * 0.25, 1.7 * scale, z);
    const frontX = x + dir * (len / 2 + 0.02);
    const backX = x - dir * (len / 2 + 0.02);
    box(0.08, 0.22, 0.4, headLightMat, frontX, 0.75, z - 0.72 * scale);
    box(0.08, 0.22, 0.4, headLightMat, frontX, 0.75, z + 0.72 * scale);
    box(0.08, 0.25, 0.35, tailLightMat, backX, 0.85, z - 0.72 * scale);
    box(0.08, 0.25, 0.35, tailLightMat, backX, 0.85, z + 0.72 * scale);
    for (const wx of [x - 2.8 * scale, x - 1.8 * scale, x + 2.8 * scale]) {
      addWheel(wx, z - wid / 2, 0.44 * scale, 0.25);
      addWheel(wx, z + wid / 2, 0.44 * scale, 0.25);
    }
  } else if (type === 'suv') {
    const len = 4.4 * scale;
    const wid = 1.95 * scale;
    box(len, 0.72, wid, bodyMat, x, 0.76, z);
    box(len * 0.58, 0.65, wid * 0.9, mats.glass, x - dir * 0.25 * scale, 1.38, z);
    box(len * 0.56, 0.1, wid * 0.88, bodyMat, x - dir * 0.25 * scale, 1.74, z);
    const frontX = x + dir * (len / 2 + 0.02);
    const backX = x - dir * (len / 2 + 0.02);
    box(0.08, 0.18, 0.35, headLightMat, frontX, 0.8, z - 0.65 * scale);
    box(0.08, 0.18, 0.35, headLightMat, frontX, 0.8, z + 0.65 * scale);
    box(0.08, 0.18, 0.3, tailLightMat, backX, 0.85, z - 0.65 * scale);
    box(0.08, 0.18, 0.3, tailLightMat, backX, 0.85, z + 0.65 * scale);
    for (const wx of [x - 1.35 * scale, x + 1.35 * scale]) {
      addWheel(wx, z - wid / 2, 0.38 * scale);
      addWheel(wx, z + wid / 2, 0.38 * scale);
    }
  } else if (type === 'van') {
    const len = 4.9 * scale;
    const wid = 1.9 * scale;
    box(len, 1.35, wid, bodyMat, x, 1.08, z);
    box(0.08, 0.55, wid * 0.86, mats.glass, x + dir * (len / 2 + 0.02), 1.38, z);
    box(len * 0.52, 0.48, wid + 0.04, mats.glass, x, 1.38, z);
    const frontX = x + dir * (len / 2 + 0.02);
    const backX = x - dir * (len / 2 + 0.02);
    box(0.08, 0.2, 0.32, headLightMat, frontX, 0.72, z - 0.65 * scale);
    box(0.08, 0.2, 0.32, headLightMat, frontX, 0.72, z + 0.65 * scale);
    box(0.08, 0.22, 0.28, tailLightMat, backX, 0.78, z - 0.65 * scale);
    box(0.08, 0.22, 0.28, tailLightMat, backX, 0.78, z + 0.65 * scale);
    for (const wx of [x - 1.45 * scale, x + 1.45 * scale]) {
      addWheel(wx, z - wid / 2, 0.36 * scale);
      addWheel(wx, z + wid / 2, 0.36 * scale);
    }
  } else {
    // Standard car or taxi
    const len = 3.7 * scale;
    const wid = 1.68 * scale;
    box(len, 0.54, wid, bodyMat, x, 0.64, z);
    box(len * 0.52, 0.5, wid * 0.88, mats.glass, x - dir * 0.15 * scale, 1.1, z);
    box(len * 0.5, 0.08, wid * 0.86, bodyMat, x - dir * 0.15 * scale, 1.38, z);
    if (type === 'taxi') {
      box(0.55, 0.16, 0.32, new THREE.MeshBasicMaterial({ color: 0xffffff }), x - dir * 0.15 * scale, 1.5, z);
    }
    const frontX = x + dir * (len / 2 + 0.02);
    const backX = x - dir * (len / 2 + 0.02);
    box(0.08, 0.16, 0.3, headLightMat, frontX, 0.66, z - 0.56 * scale);
    box(0.08, 0.16, 0.3, headLightMat, frontX, 0.66, z + 0.56 * scale);
    box(0.08, 0.16, 0.25, tailLightMat, backX, 0.72, z - 0.56 * scale);
    box(0.08, 0.16, 0.25, tailLightMat, backX, 0.72, z + 0.56 * scale);
    for (const wx of [x - 1.15 * scale, x + 1.15 * scale]) {
      addWheel(wx, z - wid / 2, 0.33 * scale);
      addWheel(wx, z + wid / 2, 0.33 * scale);
    }
  }
}

function goal(scene, box, z, side) {
  const lineMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 });

  box(4.2, 0.12, 0.12, lineMat, 0, 2.2, z);
  box(0.12, 2.2, 0.12, lineMat, -2.1, 1.1, z);
  box(0.12, 2.2, 0.12, lineMat, 2.1, 1.1, z);

  const netMat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.2, wireframe: true });
  const netZ = z + side * 0.8;
  box(4.2, 2.2, 0.05, netMat, 0, 1.1, netZ);
  box(0.05, 2.2, 0.8, netMat, -2.1, 1.1, z + side * 0.4);
  box(0.05, 2.2, 0.8, netMat, 2.1, 1.1, z + side * 0.4);
}

function courtyardPlanter(scene, box, x, z, w, d) {
  box(w, 0.4, d, mats.concrete, x, 0.3, z);
  box(w - 0.2, 0.1, d - 0.2, mats.soil, x, 0.5, z);

  for (let qx = -w / 2 + 0.4; qx < w / 2; qx += 1.5) {
    for (let qz = -d / 2 + 0.4; qz < d / 2; qz += 1.5) {
      const plant = new THREE.Mesh(new THREE.SphereGeometry(0.45, 9, 7), mats.leafMat);
      plant.position.set(x + qx, 0.8, z + qz);
      scene.add(plant);
    }
  }
}

function solarPanels(scene, box, x, z, w, d) {
  for (let a = 0; a < w; a++) {
    for (let b = 0; b < d; b++) {
      const panel = box(1.35, 0.08, 0.78, mats.solar, x + (a - (w - 1) / 2) * 1.48, 12.55, z + (b - (d - 1) / 2) * 0.95);
      panel.rotation.x = -0.18;
    }
  }
}

function createFlag(scene) {
  const flagCanvas = document.createElement('canvas');
  flagCanvas.width = 360;
  flagCanvas.height = 240;
  const flagCtx = flagCanvas.getContext('2d');
  flagCtx.fillStyle = '#d91023';
  flagCtx.fillRect(0, 0, 120, 240);
  flagCtx.fillStyle = '#ffffff';
  flagCtx.fillRect(120, 0, 120, 240);
  flagCtx.fillStyle = '#d91023';
  flagCtx.fillRect(240, 0, 120, 240);

  const flag = new THREE.Mesh(
    new THREE.PlaneGeometry(3.2, 2.1),
    new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(flagCanvas), side: THREE.DoubleSide, roughness: 0.7 })
  );
  flag.position.set(18.1, 8.2, 13.6);
  scene.add(flag);
}

function createStudentSpots(scene, box) {
  const studentSpots = [
    [-12.8, -11.2], [-10.2, -11.2], [-7.6, -11.2],
    [7.6, -11.2], [10.2, -11.2], [12.8, -11.2],
    [-12.8, 13.4], [-10.2, 13.4], [10.2, 13.4], [12.8, 13.4],
    [-15.6, -3], [-15.6, 3], [-15.6, 9],
    [15.6, -3], [15.6, 9]
  ];

  studentSpots.forEach((spot, i) => {
    const [x, z] = spot;
    box(0.42, 1.5, 0.42, new THREE.MeshStandardMaterial({ color: i % 2 ? 0x1c2836 : 0xf0eee8 }), x, 0.95, z);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 8), new THREE.MeshStandardMaterial({ color: 0x8c5d40 }));
    head.position.set(x, 1.85, z);
    head.castShadow = true;
    scene.add(head);
  });
}

function createDistantHills(scene) {
  const hillMat = new THREE.MeshStandardMaterial({ color: 0x779f7b, roughness: 1 });
  for (let i = 0; i < 20; i++) {
    const hill = new THREE.Mesh(new THREE.ConeGeometry(10 + Math.random() * 15, 15 + Math.random() * 24, 7), hillMat);
    hill.position.set(-100 + i * 11, 8, -110 - Math.random() * 30);
    scene.add(hill);
  }
}

function buildStreet(scene, box) {
  const roadLen = 270;
  const roadZ = 36.5;
  const roadWidth = 14.2;

  const streetMat = new THREE.MeshStandardMaterial({ color: 0x272b2e, roughness: 0.95 });
  const sidewalkMat = new THREE.MeshStandardMaterial({ color: 0xd8d5c8, roughness: 0.9 });
  const curbMat = new THREE.MeshStandardMaterial({ color: 0xe4b52e, roughness: 0.8 });
  const lineWhite = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.65 });
  const lineYellow = new THREE.MeshStandardMaterial({ color: 0xffcc00, roughness: 0.65 });
  const guardRailMat = new THREE.MeshStandardMaterial({ color: 0x9fa8a3, metalness: 0.8, roughness: 0.3 });

  // Main highway asphalt surface
  box(roadLen, 0.12, roadWidth, streetMat, 0, 0.08, roadZ);

  // Sidewalks
  // School-side sidewalk
  box(roadLen, 0.18, 3.2, sidewalkMat, 0, 0.18, 27.6);
  box(roadLen, 0.14, 0.35, curbMat, 0, 0.31, 29.25);

  // Far-side sidewalk & curb
  box(roadLen, 0.18, 3.2, sidewalkMat, 0, 0.18, 45.4);
  box(roadLen, 0.14, 0.35, curbMat, 0, 0.31, 43.75);

  // Far-side guardrail
  box(roadLen, 0.42, 0.08, guardRailMat, 0, 0.85, 47.0);
  for (let gx = -130; gx <= 130; gx += 6) {
    box(0.12, 0.85, 0.12, guardRailMat, gx, 0.45, 47.0);
  }

  // Edge solid white lines (bermas)
  box(roadLen, 0.02, 0.18, lineWhite, 0, 0.155, 29.8);
  box(roadLen, 0.02, 0.18, lineWhite, 0, 0.155, 43.2);

  // Double yellow median line (broken at crosswalk x = [-4, 4])
  for (const offset of [-0.22, 0.22]) {
    box(131, 0.02, 0.14, lineYellow, -69.5, 0.155, roadZ + offset);
    box(131, 0.02, 0.14, lineYellow, 69.5, 0.155, roadZ + offset);
  }

  // Dashed lane divider lines (4 lanes total)
  for (let lx = -132; lx <= 132; lx += 8) {
    if (Math.abs(lx) < 5) continue;
    box(4.2, 0.02, 0.15, lineWhite, lx, 0.155, 33.15); // Eastbound lanes divider
    box(4.2, 0.02, 0.15, lineWhite, lx, 0.155, 39.85); // Westbound lanes divider
  }

  // Zebra pedestrian crosswalk directly in front of main school entrance
  for (let zBand = 30.2; zBand <= 42.8; zBand += 1.1) {
    box(7.0, 0.02, 0.55, lineWhite, 0, 0.16, zBand);
  }

  // Modern bus stop shelter (Paradero escolar)
  const shelterMat = new THREE.MeshStandardMaterial({ color: 0x1b3528, metalness: 0.7, roughness: 0.35 });
  box(0.12, 2.7, 0.12, shelterMat, 9.2, 1.35, 26.3);
  box(0.12, 2.7, 0.12, shelterMat, 14.8, 1.35, 26.3);
  box(6.0, 0.1, 2.2, mats.greenGlass, 12, 2.7, 27.2);
  box(5.6, 1.9, 0.08, mats.glass, 12, 1.5, 26.3);
  box(4.8, 0.45, 0.55, mats.wood, 12, 0.45, 26.6);

  // Highway streetlights
  for (let lx = -120; lx <= 120; lx += 30) {
    streetLightPole(scene, box, lx, 45.4);
  }

  // Trees along school sidewalk
  const treePositions = [-125, -105, -85, -65, -45, -28, -16, 19, 32, 50, 70, 90, 110, 128];
  treePositions.forEach((tx) => streetTree(scene, box, tx));

  // Traffic vehicles
  // Eastbound traffic (dir = 1)
  createVehicle(scene, box, { x: -65, z: 31.5, color: 0xdeaa12, type: 'bus', dir: 1, scale: 1.05 });
  createVehicle(scene, box, { x: -25, z: 34.8, color: 0xe5a308, type: 'taxi', dir: 1, scale: 0.95 });
  createVehicle(scene, box, { x: 20, z: 31.5, color: 0x1d528b, type: 'car', dir: 1, scale: 1 });
  createVehicle(scene, box, { x: 60, z: 34.8, color: 0xf0f0f0, type: 'suv', dir: 1, scale: 1.05 });
  createVehicle(scene, box, { x: 96, z: 31.5, color: 0x8b9499, type: 'car', dir: 1, scale: 0.95 });
  createVehicle(scene, box, { x: -110, z: 34.8, color: 0xb52222, type: 'car', dir: 1, scale: 0.9 });

  // Westbound traffic (dir = -1)
  createVehicle(scene, box, { x: 115, z: 41.5, color: 0xefefef, type: 'van', dir: -1, scale: 1 });
  createVehicle(scene, box, { x: 75, z: 38.2, color: 0x2b3036, type: 'suv', dir: -1, scale: 1.05 });
  createVehicle(scene, box, { x: 35, z: 41.5, color: 0xd9571e, type: 'car', dir: -1, scale: 1 });
  createVehicle(scene, box, { x: -8, z: 38.2, color: 0x1f664d, type: 'suv', dir: -1, scale: 1 });
  createVehicle(scene, box, { x: -50, z: 41.5, color: 0x16171a, type: 'car', dir: -1, scale: 1 });
  createVehicle(scene, box, { x: -90, z: 38.2, color: 0x2a7b88, type: 'car', dir: -1, scale: 0.95 });
}

function buildCourtyard(scene, box) {
  box(32, 0.18, 30, new THREE.MeshStandardMaterial({ color: 0xc9c6b8, roughness: 0.95 }), 0, 0.1, 1);

  const fieldWidth = 24;
  const fieldDepth = 26;
  const fieldCenterZ = 1;
  box(fieldWidth, 0.16, fieldDepth, mats.turf, 0, 0.23, fieldCenterZ);

  const line = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 });
  const lineY = 0.32;
  box(fieldWidth, 0.03, 0.15, line, 0, lineY, fieldCenterZ - fieldDepth / 2);
  box(fieldWidth, 0.03, 0.15, line, 0, lineY, fieldCenterZ + fieldDepth / 2);
  box(0.15, 0.03, fieldDepth, line, -fieldWidth / 2, lineY, fieldCenterZ);
  box(0.15, 0.03, fieldDepth, line, fieldWidth / 2, lineY, fieldCenterZ);
  box(fieldWidth, 0.03, 0.15, line, 0, lineY, fieldCenterZ);

  const circle = new THREE.Mesh(new THREE.TorusGeometry(3, 0.07, 8, 32), line);
  circle.rotation.x = -Math.PI / 2;
  circle.position.set(0, lineY, fieldCenterZ);
  scene.add(circle);

  box(10, 0.03, 0.15, line, 0, lineY, fieldCenterZ - fieldDepth / 2 + 4);
  box(0.15, 0.03, 4, line, -5, lineY, fieldCenterZ - fieldDepth / 2 + 2);
  box(0.15, 0.03, 4, line, 5, lineY, fieldCenterZ - fieldDepth / 2 + 2);
  box(10, 0.03, 0.15, line, 0, lineY, fieldCenterZ + fieldDepth / 2 - 4);
  box(0.15, 0.03, 4, line, -5, lineY, fieldCenterZ + fieldDepth / 2 - 2);
  box(0.15, 0.03, 4, line, 5, lineY, fieldCenterZ + fieldDepth / 2 - 2);

  goal(scene, box, fieldCenterZ - fieldDepth / 2, -1);
  goal(scene, box, fieldCenterZ + fieldDepth / 2, 1);

  courtyardPlanter(scene, box, -14, -12, 3, 3);
  courtyardPlanter(scene, box, 14, -12, 3, 3);
  courtyardPlanter(scene, box, -14, 14, 3, 3);
  courtyardPlanter(scene, box, 14, 14, 3, 3);

  buildBasementEntrance(scene, box);
}

function buildBasementEntrance(scene, box) {
  // Ground-level entrance portal to the basement (Courtyard at x=0, z=15.5)
  const portalW = 5.6;
  const portalD = 3.0;
  const portalH = 2.8;
  const portalMat = new THREE.MeshStandardMaterial({ color: 0x1d4734, metalness: 0.7, roughness: 0.3 });

  // Glass canopy
  box(portalW, 0.08, portalD, mats.greenGlass, 0, portalH, 15.5);
  // Supporting frame
  box(portalW, 0.12, 0.12, portalMat, 0, portalH, 15.5 - portalD / 2);
  box(portalW, 0.12, 0.12, portalMat, 0, portalH, 15.5 + portalD / 2);
  box(0.12, portalH, 0.12, portalMat, -portalW / 2, portalH / 2, 15.5 - portalD / 2);
  box(0.12, portalH, 0.12, portalMat, portalW / 2, portalH / 2, 15.5 - portalD / 2);
  box(0.12, portalH, 0.12, portalMat, -portalW / 2, portalH / 2, 15.5 + portalD / 2);
  box(0.12, portalH, 0.12, portalMat, portalW / 2, portalH / 2, 15.5 + portalD / 2);

  // Glass side panels
  box(0.06, portalH - 0.2, portalD, mats.glass, -portalW / 2, portalH / 2, 15.5);
  box(0.06, portalH - 0.2, portalD, mats.glass, portalW / 2, portalH / 2, 15.5);

  // Glowing sign over entrance
  const signCanvas = document.createElement('canvas');
  signCanvas.width = 512; signCanvas.height = 128;
  const ctx = signCanvas.getContext('2d');
  ctx.fillStyle = '#06281e'; ctx.fillRect(0, 0, 512, 128);
  ctx.fillStyle = '#39e75f'; ctx.font = 'bold 36px Arial'; ctx.textAlign = 'center';
  ctx.fillText('▼ ACCESO AL SÓTANO', 256, 56);
  ctx.fillStyle = '#ffffff'; ctx.font = '26px Arial';
  ctx.fillText('Taller de Natación & Kiosko', 256, 96);
  const signTex = new THREE.CanvasTexture(signCanvas);

  const signMesh = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 1.0), new THREE.MeshBasicMaterial({ map: signTex, side: THREE.DoubleSide }));
  signMesh.position.set(0, portalH + 0.55, 15.5 - portalD / 2);
  scene.add(signMesh);
}

function buildRoofFeatures(scene, box) {
  // Dense Full-Coverage Rooftop Solar Farm (700+ Photovoltaic Panels across all pavilions)
  const transforms = [];
  const panelY = 12.55;
  const tiltX = -0.18;

  // 1. Left Wing (Primaria) Rooftop: 5 columns x 40 rows = 200 panels
  for (let x = -25.2; x <= -18.8; x += 1.55) {
    for (let z = -19.5; z <= 19.5; z += 1.0) {
      transforms.push({ x, y: panelY, z, rx: tiltX, ry: 0, rz: 0 });
    }
  }

  // 2. Right Wing (Inicial & Talleres) Rooftop: 5 columns x 40 rows = 200 panels
  for (let x = 18.8; x <= 25.2; x += 1.55) {
    for (let z = -19.5; z <= 19.5; z += 1.0) {
      transforms.push({ x, y: panelY, z, rx: tiltX, ry: 0, rz: 0 });
    }
  }

  // 3. Back Wing (Secundaria) Rooftop: 34 columns x 6 rows = 204 panels
  for (let x = -25.0; x <= 25.0; x += 1.52) {
    for (let z = -22.2; z <= -15.8; z += 1.1) {
      transforms.push({ x, y: panelY, z, rx: tiltX, ry: 0, rz: 0 });
    }
  }

  // 4. Front Wing (Administración & Acceso) Rooftop: 22 columns x 4 rows = 88 panels
  for (let x = -16.0; x <= 16.0; x += 1.5) {
    for (let z = 21.2; z <= 24.8; z += 1.1) {
      transforms.push({ x, y: panelY, z, rx: tiltX, ry: 0, rz: 0 });
    }
  }

  // Single high-performance instanced draw call for all 692+ solar panels!
  instancedBoxes(scene, mats.solar, 1.42, 0.08, 0.85, transforms, false);

  // Aluminum mounting rails under the panels
  const railMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 });
  for (let x = -25; x <= -19; x += 3.1) {
    box(0.08, 0.12, 40, railMat, x, panelY - 0.06, 0);
  }
  for (let x = 19; x <= 25; x += 3.1) {
    box(0.08, 0.12, 40, railMat, x, panelY - 0.06, 0);
  }
  for (let z = -22; z <= -16; z += 3.0) {
    box(52, 0.12, 0.08, railMat, 0, panelY - 0.06, z);
  }

  box(0.12, 9.2, 0.12, mats.concrete, 16.4, 4.6, 13.6);
  createFlag(scene);
}

function createBike(scene, box, x, z, rotationY = 0) {
  const bike = new THREE.Group();
  const darkMetal = new THREE.MeshStandardMaterial({ color: 0x202328, roughness: 0.7, metalness: 0.85 });
  const accent = new THREE.MeshStandardMaterial({ color: 0x54b766, roughness: 0.5, metalness: 0.2 });
  const frame = new THREE.MeshStandardMaterial({ color: 0x1d5d49, roughness: 0.55, metalness: 0.35 });

  const wheelGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.14, 20);

  const rearWheel = new THREE.Mesh(wheelGeo, darkMetal);
  rearWheel.rotation.z = Math.PI / 2;
  rearWheel.position.set(-1.15, 0.42, 0);

  const frontWheel = rearWheel.clone();
  frontWheel.position.set(1.15, 0.42, 0);

  const frameBar = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.08, 0.08), frame);
  frameBar.position.set(0, 0.8, 0);

  const downTube = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.75, 0.08), frame);
  downTube.position.set(-0.42, 0.98, 0);

  const seatTube = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.7, 0.08), frame);
  seatTube.position.set(0.6, 1.15, 0);

  const topTube = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.08, 0.08), frame);
  topTube.position.set(0.1, 1.44, 0);

  const handleBar = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.08, 0.08), accent);
  handleBar.position.set(1.0, 1.46, 0);

  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.12, 0.18), accent);
  seat.position.set(0.02, 1.7, 0);

  const frontFork = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.8, 0.08), frame);
  frontFork.position.set(0.9, 1.08, 0);

  const chain = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.08, 0.05), accent);
  chain.position.set(-0.15, 0.78, 0.06);

  bike.add(rearWheel);
  bike.add(frontWheel);
  bike.add(frameBar);
  bike.add(downTube);
  bike.add(seatTube);
  bike.add(topTube);
  bike.add(handleBar);
  bike.add(seat);
  bike.add(frontFork);
  bike.add(chain);

  bike.position.set(x, 0, z);
  bike.rotation.y = rotationY;
  scene.add(bike);
}

function createBikeParking(scene, box) {
  // Bikes along the RIGHT SIDE WALL of the school
  // The school right perimeter is at x=28. Bikes run along z from +18 down to -18.
  const wallX = 28;
  const bikeX = 29.8;   // Just outside the fence
  const rackX = 29.0;   // Rack post flush with fence
  const rackMat = new THREE.MeshStandardMaterial({ color: 0x4a5e4a, roughness: 0.5, metalness: 0.75 });
  const paveMat = new THREE.MeshStandardMaterial({ color: 0xaab09a, roughness: 0.9 });

  // Paved strip along the wall
  const strip = box(3.5, 0.14, 38, paveMat, bikeX + 0.3, 0.1, 0);
  strip.receiveShadow = true;
  scene.add(strip);

  // Rack rail running the full length along the wall
  scene.add(box(0.08, 0.08, 38, rackMat, rackX + 0.3, 1.02, 0));

  // U-shaped rack posts every 2.2m along z
  const rackZPositions = [16, 13, 10, 7, 4, 1, -2, -5, -8, -11, -14, -17];
  rackZPositions.forEach((rz) => {
    scene.add(box(0.1, 1.0, 0.1, rackMat, rackX, 0.55, rz));
    scene.add(box(0.1, 1.0, 0.1, rackMat, rackX + 0.6, 0.55, rz));
    scene.add(box(0.6, 0.1, 0.1, rackMat, rackX + 0.3, 1.0, rz));
  });

  // Bikes leaned against the rack — rotation.y = Math.PI/2 so bikes face along Z axis
  const bikeZList = [17, 15, 13, 11, 9, 7, 5, 3, 1, -1, -3, -5, -7, -9, -11, -13, -15, -17];
  bikeZList.forEach((bz, i) => {
    const lean = (i % 2 === 0) ? 0.08 : -0.06;
    createBike(scene, box, bikeX + 0.2, bz, Math.PI / 2 + lean);
  });

  // Sign at the north end of the strip
  const signCanvas = document.createElement('canvas');
  signCanvas.width = 512; signCanvas.height = 128;
  const ctx = signCanvas.getContext('2d');
  ctx.fillStyle = '#1a6b2e';
  ctx.fillRect(0, 0, 512, 128);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('🚲 CICLOPARQUEADERO', 256, 82);
  const signTex = new THREE.CanvasTexture(signCanvas);
  scene.add(box(0.12, 3.2, 0.12, new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.8 }), bikeX + 0.3, 1.6, 20.5));
  const signMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(4.0, 1.0),
    new THREE.MeshBasicMaterial({ map: signTex, transparent: true, side: THREE.DoubleSide })
  );
  signMesh.position.set(bikeX + 2.3, 3.4, 20.5);
  signMesh.rotation.y = -Math.PI / 2;
  scene.add(signMesh);
}

function createSportsArea(scene, box) {
  // ============================================================
  // TWO COURTS SIDE BY SIDE (horizontal, same Z center)
  // OUTSIDE the school to the right (x > 28)
  // Both courts run wide in X and shallow in Z.
  // Volleyball: x=43 (18m wide × 10m deep)
  // Basketball: x=68 (28m wide × 15m deep)
  // Both centered at z=-38
  // ============================================================

  const lineMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 });
  const netPostMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.85, roughness: 0.25 });

  // === SHARED GRASS BASE (covers both courts) ===
  const grassBase = box(62, 0.2, 20, new THREE.MeshStandardMaterial({ color: 0x5fa060, roughness: 0.95 }), 60, 0.1, -38);
  grassBase.receiveShadow = true;

  // === ACCESS PATH from school fence to courts ===
  scene.add(box(5, 0.18, 10, new THREE.MeshStandardMaterial({ color: 0xc4c0b0, roughness: 0.9 }), 30.5, 0.12, -30));

  // -----------------------------------------------
  // VOLLEYBALL COURT — centered at x=43, z=-38
  // Court: 18m (x) × 9m (z), reglamentario
  // -----------------------------------------------
  const vCX = 43; const vCZ = -38;
  const vW = 18; const vD = 9;

  const voleyBase = box(vW, 0.14, vD, new THREE.MeshStandardMaterial({ color: 0x1e9e5a, roughness: 0.85 }), vCX, 0.22, vCZ);
  voleyBase.receiveShadow = true;

  // Boundary lines
  const vLY = 0.37;
  scene.add(box(vW + 0.6, 0.02, 0.14, lineMat, vCX, vLY, vCZ - vD / 2)); // back line
  scene.add(box(vW + 0.6, 0.02, 0.14, lineMat, vCX, vLY, vCZ + vD / 2)); // front line
  scene.add(box(0.14, 0.02, vD, lineMat, vCX - vW / 2, vLY, vCZ));        // left line
  scene.add(box(0.14, 0.02, vD, lineMat, vCX + vW / 2, vLY, vCZ));        // right line
  // Center line (net position)
  scene.add(box(vW, 0.02, 0.12, lineMat, vCX, vLY, vCZ));                  // center
  // Attack lines (3m from center)
  scene.add(box(vW, 0.02, 0.1, lineMat, vCX, vLY, vCZ - 3));               // back attack
  scene.add(box(vW, 0.02, 0.1, lineMat, vCX, vLY, vCZ + 3));               // front attack

  // Net posts (on side lines)
  scene.add(box(0.12, 2.5, 0.12, netPostMat, vCX - vW / 2 - 0.5, 1.3, vCZ));
  scene.add(box(0.12, 2.5, 0.12, netPostMat, vCX + vW / 2 + 0.5, 1.3, vCZ));
  // Net cable
  scene.add(box(vW + 1.5, 0.05, 0.05, new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 0.9 }), vCX, 2.44, vCZ));
  // Net mesh
  const vNetMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(vW + 1, 2.0),
    new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.22, wireframe: true })
  );
  vNetMesh.rotation.y = Math.PI / 2;
  vNetMesh.position.set(vCX, 1.45, vCZ);
  scene.add(vNetMesh);

  // Volleyball sign
  const vSignCanvas = document.createElement('canvas');
  vSignCanvas.width = 512; vSignCanvas.height = 128;
  const vCtx = vSignCanvas.getContext('2d');
  vCtx.fillStyle = '#155a30'; vCtx.fillRect(0, 0, 512, 128);
  vCtx.fillStyle = '#ffffff'; vCtx.font = 'bold 54px Arial'; vCtx.textAlign = 'center';
  vCtx.fillText('CANCHA DE VÓLEIBOL', 256, 84);
  const vSignMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(5.5, 1.3),
    new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(vSignCanvas), transparent: true, side: THREE.DoubleSide })
  );
  vSignMesh.position.set(vCX, 3.5, vCZ - vD / 2 - 1.5);
  scene.add(vSignMesh);
  scene.add(box(0.14, 4.0, 0.14, new THREE.MeshStandardMaterial({ color: 0x2d5a2d, metalness: 0.6 }), vCX, 2.0, vCZ - vD / 2 - 1.5));

  // -----------------------------------------------
  // BASKETBALL COURT — centered at x=68, z=-38
  // Court: 28m (x) × 15m (z), reglamentario
  // -----------------------------------------------
  const bCX = 68; const bCZ = -38;
  const bW = 28; const bD = 15;

  const basketBase = box(bW, 0.14, bD, new THREE.MeshStandardMaterial({ color: 0xc05820, roughness: 0.85 }), bCX, 0.22, bCZ);
  basketBase.receiveShadow = true;

  // Boundary lines
  const bLY = 0.37;
  scene.add(box(bW + 0.6, 0.02, 0.14, lineMat, bCX, bLY, bCZ - bD / 2)); // back
  scene.add(box(bW + 0.6, 0.02, 0.14, lineMat, bCX, bLY, bCZ + bD / 2)); // front
  scene.add(box(0.14, 0.02, bD, lineMat, bCX - bW / 2, bLY, bCZ));        // left
  scene.add(box(0.14, 0.02, bD, lineMat, bCX + bW / 2, bLY, bCZ));        // right
  // Center line
  scene.add(box(0.12, 0.02, bD, lineMat, bCX, bLY, bCZ));
  // Center circle
  const cenCirc = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.07, 8, 32), lineMat);
  cenCirc.rotation.x = -Math.PI / 2;
  cenCirc.position.set(bCX, bLY + 0.01, bCZ);
  scene.add(cenCirc);

  // Key areas (rectangle lane) — painted darker orange
  const keyMat = new THREE.MeshStandardMaterial({ color: 0xa04010, roughness: 0.8 });
  scene.add(box(6, 0.13, 5.8, keyMat, bCX - bW / 2 + 3, 0.28, bCZ));   // left key
  scene.add(box(6, 0.13, 5.8, keyMat, bCX + bW / 2 - 3, 0.28, bCZ));   // right key
  // Key borders
  scene.add(box(6.2, 0.02, 0.1, lineMat, bCX - bW / 2 + 3, bLY, bCZ - 2.9));
  scene.add(box(6.2, 0.02, 0.1, lineMat, bCX - bW / 2 + 3, bLY, bCZ + 2.9));
  scene.add(box(6.2, 0.02, 0.1, lineMat, bCX + bW / 2 - 3, bLY, bCZ - 2.9));
  scene.add(box(6.2, 0.02, 0.1, lineMat, bCX + bW / 2 - 3, bLY, bCZ + 2.9));
  // Restricted area semi-circle
  const rArc = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.06, 8, 24, Math.PI), lineMat);
  rArc.rotation.x = -Math.PI / 2;
  rArc.position.set(bCX - bW / 2 + 1.5, bLY + 0.01, bCZ);
  scene.add(rArc);
  const rArcR = rArc.clone();
  rArcR.position.set(bCX + bW / 2 - 1.5, bLY + 0.01, bCZ);
  scene.add(rArcR);
  // Three-point arcs (half-circles)
  const arc3 = new THREE.Mesh(new THREE.TorusGeometry(6.75, 0.08, 8, 36, Math.PI), lineMat);
  arc3.rotation.x = -Math.PI / 2;
  arc3.rotation.z = Math.PI / 2;
  arc3.position.set(bCX - bW / 2 + 1.5, bLY + 0.01, bCZ);
  scene.add(arc3);
  const arc3R = arc3.clone();
  arc3R.rotation.z = -Math.PI / 2;
  arc3R.position.set(bCX + bW / 2 - 1.5, bLY + 0.01, bCZ);
  scene.add(arc3R);

  // Basketball hoops
  const backboardMat = new THREE.MeshStandardMaterial({ color: 0xeeeeee, roughness: 0.5, transparent: true, opacity: 0.88 });
  const rimMat2 = new THREE.MeshStandardMaterial({ color: 0xff4400, roughness: 0.45, metalness: 0.45 });
  const createHoop = (hx, hz, dirX) => {
    const g = new THREE.Group();
    g.add(box(0.16, 4.0, 0.16, new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0.85 }), 0, 2.0, 0));
    g.add(box(1.2, 0.1, 0.1, new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.8 }), dirX * 0.5, 3.75, 0));
    const board = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.1, 1.8), backboardMat);
    board.position.set(dirX * 1.1, 3.65, 0);
    g.add(board);
    const sq = new THREE.Mesh(new THREE.EdgesGeometry(new THREE.BoxGeometry(0.01, 0.45, 0.72)), new THREE.LineBasicMaterial({ color: 0xff4400 }));
    sq.position.set(dirX * 1.15, 3.58, 0);
    g.add(sq);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.225, 0.025, 8, 24), rimMat2);
    rim.rotation.z = Math.PI / 2;
    rim.position.set(dirX * 1.5, 3.35, 0);
    g.add(rim);
    const net = new THREE.Mesh(
      new THREE.ConeGeometry(0.225, 0.55, 12, 1, true),
      new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.38, wireframe: true })
    );
    net.rotation.z = Math.PI / 2 * dirX;
    net.position.set(dirX * 1.8, 3.08, 0);
    g.add(net);
    g.position.set(hx, 0, hz);
    scene.add(g);
  };
  createHoop(bCX - bW / 2 - 0.8, bCZ, 1);   // left hoop
  createHoop(bCX + bW / 2 + 0.8, bCZ, -1);  // right hoop

  // Basketball sign
  const bSignCanvas = document.createElement('canvas');
  bSignCanvas.width = 512; bSignCanvas.height = 128;
  const bCtx = bSignCanvas.getContext('2d');
  bCtx.fillStyle = '#6b2a00'; bCtx.fillRect(0, 0, 512, 128);
  bCtx.fillStyle = '#ffffff'; bCtx.font = 'bold 54px Arial'; bCtx.textAlign = 'center';
  bCtx.fillText('CANCHA DE BÁSQUET', 256, 84);
  const bSignMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(5.5, 1.3),
    new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(bSignCanvas), transparent: true, side: THREE.DoubleSide })
  );
  bSignMesh.position.set(bCX, 3.5, bCZ - bD / 2 - 1.5);
  scene.add(bSignMesh);
  scene.add(box(0.14, 4.0, 0.14, new THREE.MeshStandardMaterial({ color: 0x5a2000, metalness: 0.6 }), bCX, 2.0, bCZ - bD / 2 - 1.5));

  // -----------------------------------------------
  // PERIMETER CHAIN-LINK FENCE around both courts
  // -----------------------------------------------
  const sfMat = new THREE.MeshStandardMaterial({ color: 0x777777, metalness: 0.7, roughness: 0.4 });
  const fMinX = 28.5; const fMaxX = 83;
  const fMinZ = bCZ - bD / 2 - 3; const fMaxZ = vCZ + vD / 2 + 3; // = -49.5 to -32.5
  // Rails
  scene.add(box(fMaxX - fMinX, 0.1, 0.1, sfMat, (fMinX + fMaxX) / 2, 2.4, fMinZ));
  scene.add(box(fMaxX - fMinX, 0.1, 0.1, sfMat, (fMinX + fMaxX) / 2, 2.4, fMaxZ));
  scene.add(box(0.1, 2.4, fMaxZ - fMinZ, sfMat, fMinX, 1.2, (fMinZ + fMaxZ) / 2));
  scene.add(box(0.1, 2.4, fMaxZ - fMinZ, sfMat, fMaxX, 1.2, (fMinZ + fMaxZ) / 2));
  // Posts every 4m on top and bottom rails
  for (let fx = fMinX + 2; fx < fMaxX; fx += 4) {
    scene.add(box(0.12, 2.4, 0.12, sfMat, fx, 1.2, fMinZ));
    scene.add(box(0.12, 2.4, 0.12, sfMat, fx, 1.2, fMaxZ));
  }
  for (let fz = fMinZ + 2; fz < fMaxZ; fz += 4) {
    scene.add(box(0.12, 2.4, 0.12, sfMat, fMinX, 1.2, fz));
    scene.add(box(0.12, 2.4, 0.12, sfMat, fMaxX, 1.2, fz));
  }
}

function createRecyclingCenter(scene, box) {
  // Centro de Reciclaje Ecológico
  const rx = 36;
  const rz = 22; // Near bikes at z=20.5

  const concrete = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.8 });
  const woodMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.9 });
  
  // Base
  const base = box(12, 0.2, 6, concrete, rx, 0.1, rz);
  base.receiveShadow = true;

  // Canopy structure
  box(10, 0.1, 4, woodMat, rx, 3.0, rz);
  box(0.2, 3, 0.2, woodMat, rx - 4.8, 1.5, rz - 1.8);
  box(0.2, 3, 0.2, woodMat, rx + 4.8, 1.5, rz - 1.8);
  box(0.2, 3, 0.2, woodMat, rx - 4.8, 1.5, rz + 1.8);
  box(0.2, 3, 0.2, woodMat, rx + 4.8, 1.5, rz + 1.8);

  // Bins
  const bins = [
    { color: 0x3b82f6, label: 'PAPEL', offsetX: -3 },
    { color: 0xeab308, label: 'PLÁSTICO', offsetX: -1 },
    { color: 0x22c55e, label: 'VIDRIO', offsetX: 1 },
    { color: 0x475569, label: 'GENERAL', offsetX: 3 },
  ];

  bins.forEach((b) => {
    const binMat = new THREE.MeshStandardMaterial({ color: b.color, roughness: 0.5, metalness: 0.2 });
    const bin = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.5, 1.4, 16), binMat);
    bin.position.set(rx + b.offsetX, 0.9, rz);
    bin.castShadow = true;
    scene.add(bin);

    // Lids
    const lidMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6 });
    const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.6, 0.1, 16), lidMat);
    lid.position.set(rx + b.offsetX, 1.65, rz);
    scene.add(lid);
  });

  // Sign
  const signCanvas = document.createElement('canvas');
  signCanvas.width = 512; signCanvas.height = 128;
  const ctx = signCanvas.getContext('2d');
  ctx.fillStyle = '#0f766e'; ctx.fillRect(0, 0, 512, 128);
  ctx.fillStyle = '#ffffff'; ctx.font = 'bold 38px Arial'; ctx.textAlign = 'center';
  ctx.fillText('♻️ ECO-PUNTO DE RECICLAJE', 256, 75);
  const signMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(6, 1.5),
    new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(signCanvas) })
  );
  signMesh.position.set(rx, 3.8, rz);
  scene.add(signMesh);
}

function createSideTrees(scene, box) {
  for(let z = -20; z <= 20; z += 5) {
    streetTree(scene, box, 39, z);
    streetTree(scene, box, -32, z);
  }
}

export function buildCampus(scene, box) {
  buildStreet(scene, box);
  buildCourtyard(scene, box);
  buildRoofFeatures(scene, box);
  createStudentSpots(scene, box);
  createBikeParking(scene, box);
  createSportsArea(scene, box);
  createDistantHills(scene);
  createRecyclingCenter(scene, box);
  createSideTrees(scene, box);
}

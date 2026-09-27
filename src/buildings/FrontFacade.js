import * as THREE from 'three';
import { box, addCollider, instancedBoxes } from '../utils.js';
import { concrete, greenGlass, glass, leafMat, dark } from '../materials.js';

export function createFrontFacade(scene, colliders) {
  // Main administrative building body
  // To make classrooms visible from the back (courtyard side), we build floors and a back glass wall
  // Building spans from z=17 to z=23
  
  // Side walls
  scene.add(box(0.5, 16, 6, concrete, -27.75, 8, 20));
  scene.add(box(0.5, 16, 6, concrete, 27.75, 8, 20));
  // Roof
  scene.add(box(56, 0.5, 6, concrete, 0, 16.25, 20));
  
  // Administrative Floors and internal offices facing the courtyard (back)
  const deskMat = new THREE.MeshStandardMaterial({ color: 0x9a6b42, roughness: 0.5 });
  const chairMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.25 });
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.7, roughness: 0.3 });

  // Courtyard Top Banner: "★ PABELLÓN ADMINISTRATIVO Y DIRECCIÓN GENERAL ★"
  const adminCanvas = document.createElement('canvas');
  adminCanvas.width = 1024; adminCanvas.height = 160;
  const aCtx = adminCanvas.getContext('2d');
  aCtx.fillStyle = '#0f2942'; aCtx.fillRect(0, 0, 1024, 160);
  aCtx.strokeStyle = '#38bdf8'; aCtx.lineWidth = 10; aCtx.strokeRect(8, 8, 1008, 144);
  aCtx.fillStyle = '#ffffff'; aCtx.font = 'bold 50px Arial'; aCtx.textAlign = 'center';
  aCtx.fillText('★ PABELLÓN ADMINISTRATIVO Y DIRECCIÓN ★', 512, 70);
  aCtx.fillStyle = '#38bdf8'; aCtx.font = 'bold 26px Arial';
  aCtx.fillText('DIRECCIÓN GENERAL · SECRETARÍA · SALA DE PROFESORES · PSICOLOGÍA', 512, 122);
  const adminTex = new THREE.CanvasTexture(adminCanvas);
  const adminBanner = new THREE.Mesh(new THREE.PlaneGeometry(16.0, 2.5), new THREE.MeshBasicMaterial({ map: adminTex, side: THREE.DoubleSide }));
  adminBanner.position.set(0, 17.5, 16.9);
  adminBanner.rotation.y = Math.PI;
  scene.add(adminBanner);

  const officeNames = [
    ['TÓPICO MÉDICO', 'SECRETARÍA', 'RECEPCIÓN', 'MESA DE PARTES', 'CAJA'],
    ['SUBDIRECCIÓN', 'DIRECCIÓN GENERAL', 'SALA DE REUNIONES', 'ASESORÍA', 'COORDINACIÓN'],
    ['SALA DE PROFESORES', 'SALA DE PROFESORES', 'SALA MULTIUSOS', 'COORDINACIÓN', 'ARCHIVOS'],
    ['PSICOLOGÍA', 'TUTORÍA', 'ORIENTACIÓN', 'DEPTO. INGLÉS', 'SALA TÉCNICA']
  ];

  for (let f = 0; f < 4; f++) {
    const y = f * 4;
    // Floor slab
    scene.add(box(55.5, 0.4, 6, concrete, 0, y + 0.2, 20));

    // Balcony railing along courtyard (z = 16.9)
    scene.add(box(55.5, 0.95, 0.08, metalMat, 0, y + 0.65, 16.9));
    scene.add(box(55.5, 0.06, 0.12, concrete, 0, y + 1.15, 16.9));

    // Windows and glass corridor facing courtyard
    scene.add(box(55.5, 2.4, 0.06, glass, 0, y + 2.4, 17.2));
    // Window frames and horizontal bands
    scene.add(box(55.5, 0.08, 0.12, frameMat, 0, y + 1.2, 17.2));
    scene.add(box(55.5, 0.08, 0.12, frameMat, 0, y + 3.6, 17.2));

    // Internal offices and partition walls
    for (let x = -20; x <= 20; x += 10) {
      scene.add(box(0.2, 3.6, 5.8, concrete, x, y + 2.2, 20.05));
      scene.add(box(0.1, 2.4, 0.1, frameMat, x, y + 2.4, 17.2)); // Vertical mullion
    }

    // Office furniture inside each room
    for (let rx = -25; rx <= 25; rx += 10) {
      // Executive office desk
      scene.add(box(1.8, 0.75, 0.9, deskMat, rx, y + 0.4, 20));
      // Computer monitor
      scene.add(box(0.5, 0.35, 0.06, chairMat, rx, y + 0.95, 20.1));
      // Swivel chair
      scene.add(box(0.5, 0.6, 0.5, chairMat, rx, y + 0.5, 19.2));
      // Bookshelf / Filing cabinet on back wall
      scene.add(box(1.6, 2.0, 0.4, deskMat, rx, y + 1.2, 22.6));
    }
  }
  
  // Base collider for the building footprint
  addCollider(56, 16, 6, 0, 8, 20, colliders);

  // Background glass for the entire front facade (street side)
  const mainGlass = box(55.8, 15.8, 0.2, greenGlass, 0, 8, 23.1);
  scene.add(mainGlass);

  // Futuristic panel grid (Retícula)
  const gridMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, roughness: 0.3, metalness: 0.1});
  
  // Horizontal panels (floors)
  for (let y = 0; y <= 16; y += 4) {
    scene.add(box(56, 0.4, 0.4, gridMaterial, 0, y, 23.2));
    // Add futuristic glowing strips under each floor
    const glow = box(56, 0.1, 0.1, new THREE.MeshBasicMaterial({color: 0xaaffaa}), 0, y - 0.25, 23.15);
    scene.add(glow);
  }

  // Vertical panels
  for (let x = -28; x <= 28; x += 4) {
    scene.add(box(0.4, 16, 0.4, gridMaterial, x, 8, 23.2));
  }

  // Open windows (awnings)
  const createAwning = (x, y) => {
    // Modern rectangular glass awning
    const awning = box(3.2, 0.1, 1.5, greenGlass, x, y, 23.8);
    awning.rotation.x = -Math.PI / 6;
    scene.add(awning);
    
    // Awning frame
    const frameLeft = box(0.05, 1.5, 0.05, gridMaterial, x - 1.6, y - 0.3, 23.8);
    frameLeft.rotation.x = -Math.PI / 6;
    scene.add(frameLeft);
    const frameRight = box(0.05, 1.5, 0.05, gridMaterial, x + 1.6, y - 0.3, 23.8);
    frameRight.rotation.x = -Math.PI / 6;
    scene.add(frameRight);
  };

  // Add awnings in a pattern
  for (let y = 2.5; y <= 14.5; y += 4) {
    for (let x of [-22, -18, -10, -6, 6, 10, 18, 22]) {
      createAwning(x, y);
    }
  }

  // Central Entrance Tower (Imponente)
  const entranceBody = box(12, 18, 2.5, gridMaterial, 0, 9, 23.6);
  scene.add(entranceBody);
  const entranceVoid = box(10, 5.5, 3, dark, 0, 2.75, 23.6); // Hole for doors
  scene.add(entranceVoid);
  const entranceGlass = box(11.2, 11, 0.2, greenGlass, 0, 11.5, 24.8);
  scene.add(entranceGlass);
  
  // Glass doors
  scene.add(box(4.5, 4, 0.2, glass, -2.4, 2, 24.8));
  scene.add(box(4.5, 4, 0.2, glass, 2.4, 2, 24.8));
  
  // Entrance glow outline
  const entranceGlow = box(10.2, 5.6, 0.1, new THREE.MeshBasicMaterial({color: 0x55ffaa}), 0, 2.8, 24.9);
  scene.add(entranceGlow);

  // Sign (Neon/Futuristic)
  const sign = document.createElement('canvas');
  sign.width = 1024; sign.height = 180;
  const ctx = sign.getContext('2d');
  ctx.fillStyle = '#aaffaa'; // Glowing green text
  ctx.font = 'bold 80px Inter, Arial';
  ctx.textAlign = 'center';
  ctx.shadowColor = '#aaffaa';
  ctx.shadowBlur = 20;
  ctx.fillText('LICEO FERMÍN TANGUIS', 512, 115);
  const signTex = new THREE.CanvasTexture(sign);
  const signMesh = new THREE.Mesh(new THREE.PlaneGeometry(10, 1.7), new THREE.MeshBasicMaterial({map: signTex, transparent: true}));
  signMesh.position.set(0, 16.5, 24.9);
  scene.add(signMesh);

  // School logo below the name sign — loaded from public/logofermin.png
  const logoLoader = new THREE.TextureLoader();
  logoLoader.load('/logofermin.png', (logoTex) => {
    logoTex.colorSpace = THREE.SRGBColorSpace;
    // Square logo, displayed as a shield centered on the facade
    const logoMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(4.8, 4.8),
      new THREE.MeshBasicMaterial({ map: logoTex, transparent: true, alphaTest: 0.05 })
    );
    logoMesh.position.set(0, 12.8, 24.92);
    scene.add(logoMesh);
  });

  // Vertical Gardens (Modern eco-touch)
  const createVerticalGarden = (x) => {
    scene.add(box(3.6, 15.6, 0.5, gridMaterial, x, 8, 23.4));
    for (let y = 1; y < 15.5; y += 0.8) {
      for (let vx = -1.2; vx <= 1.2; vx += 0.8) {
        const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 7), leafMat);
        leaf.scale.set(1, 0.6, 0.4);
        leaf.position.set(x + vx, y + Math.random() * 0.4, 23.7);
        scene.add(leaf);
      }
    }
  };

  createVerticalGarden(-14);
  createVerticalGarden(14);

  // Front Fence and Gate (Rejas blancas)
  const fenceZ = 26.5;
  const fenceMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, roughness: 0.5});
  const fencePillarMat = new THREE.MeshStandardMaterial({color: 0xe1e1d8, roughness: 0.8}); // Concrete-like

  // Main Gate (Puerta central)
  // Two pillars for the gate
  scene.add(box(0.8, 3.5, 0.8, fencePillarMat, -4, 1.75, fenceZ));
  scene.add(box(0.8, 3.5, 0.8, fencePillarMat, 4, 1.75, fenceZ));
  // Gate sign (COLEGIO FERMIN TANGUIS)
  const gateSign = box(7.2, 0.8, 0.2, gridMaterial, 0, 3.1, fenceZ);
  scene.add(gateSign);
  // Metal gates (doors)
  for (let x = -3.5; x <= -0.5; x += 0.3) {
    scene.add(box(0.05, 2.5, 0.05, fenceMaterial, x, 1.25, fenceZ)); // Left gate
  }
  for (let x = 0.5; x <= 3.5; x += 0.3) {
    scene.add(box(0.05, 2.5, 0.05, fenceMaterial, x, 1.25, fenceZ)); // Right gate
  }
  // Gate frames
  scene.add(box(3.5, 0.1, 0.1, fenceMaterial, -2, 2.5, fenceZ));
  scene.add(box(3.5, 0.1, 0.1, fenceMaterial, 2, 2.5, fenceZ));

  const frontPillars = [];
  const frontBars = [];
  const createFenceSection = (startX, endX) => {
    for (let x = startX; x <= endX; x += 4) {
      frontPillars.push({ x, y: 1.25, z: fenceZ });
    }
    scene.add(box(endX - startX, 0.1, 0.1, fenceMaterial, (startX + endX) / 2, 0.5, fenceZ));
    scene.add(box(endX - startX, 0.1, 0.1, fenceMaterial, (startX + endX) / 2, 2.2, fenceZ));
    for (let x = startX + 0.3; x < endX; x += 0.3) {
      if (Math.abs((x - startX) % 4) > 0.4 && Math.abs((x - startX) % 4) < 3.6) {
        frontBars.push({ x, y: 1.2, z: fenceZ });
      }
    }
  };

  createFenceSection(-28, -4.5);
  createFenceSection(4.5, 28);
  instancedBoxes(scene, fencePillarMat, 0.6, 2.5, 0.6, frontPillars);
  instancedBoxes(scene, fenceMaterial, 0.05, 2.4, 0.05, frontBars);
}

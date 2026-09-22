import * as THREE from 'three';
import { box, addCollider } from '../utils.js';
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
  
  // Floors and internal classroom walls facing the courtyard (back)
  for (let y = 0; y <= 12; y += 4) {
    // Floor slab
    scene.add(box(55.5, 0.4, 6, concrete, 0, y + 0.2, 20));
    // Back glass wall (classrooms facing courtyard at z=17.1)
    if (y < 12) {
      scene.add(box(55.5, 3.6, 0.1, glass, 0, y + 2.2, 17.1));
      // Internal separating walls (classrooms)
      for (let x = -20; x <= 20; x += 10) {
        scene.add(box(0.2, 3.6, 5.8, concrete, x, y + 2.2, 20.05));
      }
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

  // Rest of the fence (rejas)
  const createFenceSection = (startX, endX) => {
    // Pillars every 4 units
    for (let x = startX; x <= endX; x += 4) {
      scene.add(box(0.6, 2.5, 0.6, fencePillarMat, x, 1.25, fenceZ));
    }
    // Horizontal rails
    scene.add(box(endX - startX, 0.1, 0.1, fenceMaterial, (startX + endX)/2, 0.5, fenceZ));
    scene.add(box(endX - startX, 0.1, 0.1, fenceMaterial, (startX + endX)/2, 2.2, fenceZ));
    // Vertical bars
    for (let x = startX + 0.3; x < endX; x += 0.3) {
      // Don't add a bar if it's inside a pillar
      if (Math.abs((x - startX) % 4) > 0.4 && Math.abs((x - startX) % 4) < 3.6) {
        scene.add(box(0.05, 2.4, 0.05, fenceMaterial, x, 1.2, fenceZ));
      }
    }
  };

  createFenceSection(-28, -4.5);
  createFenceSection(4.5, 28);
}

import * as THREE from 'three';
import { box } from '../utils.js';
import { wood, turf, soil, leafMat } from '../materials.js';

export function createFarm(scene) {
  // Main Farm Area (from z=-20 to z=-55) replacing technical zone and huerto
  // Grass base for the farm
  const farmPad = box(56, 0.2, 35, turf, 0, 0.1, -37.5);
  farmPad.receiveShadow = true;
  scene.add(farmPad);

  // Stable (Establo) on the right side (where technical zone was)
  const stableX = 15;
  const stableZ = -45;
  // Floor
  scene.add(box(16, 0.3, 12, soil, stableX, 0.2, stableZ));
  // Columns
  for (const cx of [stableX - 7.5, stableX + 7.5]) {
    for (const cz of [stableZ - 5.5, stableZ + 5.5]) {
      scene.add(box(0.4, 4, 0.4, wood, cx, 2, cz));
    }
  }
  // Roof (flat wooden roof)
  scene.add(box(17, 0.4, 13, wood, stableX, 4.2, stableZ));

  // A couple of trees for shade
  const createTree = (x, z) => {
    scene.add(box(0.3, 3, 0.3, wood, x, 1.5, z));
    const crown = new THREE.Mesh(new THREE.IcosahedronGeometry(2, 1), leafMat);
    crown.position.set(x, 4, z);
    crown.castShadow = true;
    scene.add(crown);
  };
  createTree(22, -30);
  createTree(-20, -50);

  // Minecraft-style Blocky Horses
  const horseMatBrown = new THREE.MeshStandardMaterial({color: 0x5c4033, roughness: 0.9});
  const horseMatWhite = new THREE.MeshStandardMaterial({color: 0xeaeaea, roughness: 0.9});
  const blackMat = new THREE.MeshStandardMaterial({color: 0x111111});

  const createHorse = (x, z, rotationY, mat) => {
    const horse = new THREE.Group();
    // Body
    const body = box(1.2, 1, 2.4, mat, 0, 1.5, 0);
    horse.add(body);
    // Legs
    horse.add(box(0.3, 1.2, 0.3, mat, -0.4, 0.6, -0.9));
    horse.add(box(0.3, 1.2, 0.3, mat, 0.4, 0.6, -0.9));
    horse.add(box(0.3, 1.2, 0.3, mat, -0.4, 0.6, 0.9));
    horse.add(box(0.3, 1.2, 0.3, mat, 0.4, 0.6, 0.9));
    // Neck and Head
    const neck = box(0.6, 1.2, 0.8, mat, 0, 2.3, 1);
    neck.rotation.x = -Math.PI / 8;
    horse.add(neck);
    const head = box(0.7, 0.8, 1.4, mat, 0, 2.8, 1.4);
    horse.add(head);
    // Eyes
    horse.add(box(0.8, 0.15, 0.15, blackMat, 0, 2.9, 1.5));
    // Tail
    const tail = box(0.2, 1, 0.2, blackMat, 0, 1.2, -1.3);
    tail.rotation.x = Math.PI / 8;
    horse.add(tail);

    horse.position.set(x, 0, z);
    horse.rotation.y = rotationY;
    scene.add(horse);
  };

  createHorse(15, -45, -Math.PI / 4, horseMatBrown); // Inside stable
  createHorse(10, -42, Math.PI / 2, horseMatWhite);  // Just outside
  createHorse(-5, -35, Math.PI / 6, horseMatBrown);  // Roaming

  // Some blocky chickens/birds
  const chickenMat = new THREE.MeshStandardMaterial({color: 0xffffff});
  const beakMat = new THREE.MeshStandardMaterial({color: 0xffaa00});
  const createChicken = (x, z) => {
    const chicken = new THREE.Group();
    chicken.add(box(0.4, 0.4, 0.5, chickenMat, 0, 0.2, 0));
    chicken.add(box(0.2, 0.3, 0.2, chickenMat, 0, 0.5, 0.2));
    chicken.add(box(0.1, 0.1, 0.1, beakMat, 0, 0.5, 0.35));
    chicken.position.set(x, 0, z);
    chicken.rotation.y = Math.random() * Math.PI * 2;
    scene.add(chicken);
  };
  createChicken(12, -40);
  createChicken(14, -38);
  createChicken(-8, -48);

  // Fences for the animal enclosures (Corrales)
  const createCorralFence = (startX, startZ, endX, endZ) => {
    const dx = endX - startX;
    const dz = endZ - startZ;
    const length = Math.sqrt(dx * dx + dz * dz);
    const numPillars = Math.floor(length / 2.5);
    const midX = (startX + endX) / 2;
    const midZ = (startZ + endZ) / 2;
    const angle = Math.atan2(dz, dx);
    
    // Rails
    const railMat = wood;
    const r1 = box(length, 0.1, 0.05, railMat, midX, 0.4, midZ); r1.rotation.y = -angle; scene.add(r1);
    const r2 = box(length, 0.1, 0.05, railMat, midX, 0.8, midZ); r2.rotation.y = -angle; scene.add(r2);
    const r3 = box(length, 0.1, 0.05, railMat, midX, 1.2, midZ); r3.rotation.y = -angle; scene.add(r3);
    
    // Posts
    for (let i = 0; i <= numPillars; i++) {
      const t = i / numPillars;
      scene.add(box(0.15, 1.4, 0.15, wood, startX + t * dx, 0.7, startZ + t * dz));
    }
  };

  createCorralFence(-2, -30, 26, -30);
  createCorralFence(-2, -30, -2, -54);
}

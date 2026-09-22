import * as THREE from 'three';
import { box, addCollider } from '../utils.js';

export function createPerimeterFence(scene, colliders) {
  const fenceMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, roughness: 0.5});
  const fencePillarMat = new THREE.MeshStandardMaterial({color: 0xe1e1d8, roughness: 0.8});

  const createFenceLine = (startX, startZ, endX, endZ) => {
    const dx = endX - startX;
    const dz = endZ - startZ;
    const length = Math.sqrt(dx * dx + dz * dz);
    const numPillars = Math.floor(length / 4);
    
    // Rails
    const midX = (startX + endX) / 2;
    const midZ = (startZ + endZ) / 2;
    const angle = Math.atan2(dz, dx);
    
    const lowerRail = box(length, 0.1, 0.1, fenceMaterial, midX, 0.5, midZ);
    lowerRail.rotation.y = -angle;
    scene.add(lowerRail);
    
    const upperRail = box(length, 0.1, 0.1, fenceMaterial, midX, 2.2, midZ);
    upperRail.rotation.y = -angle;
    scene.add(upperRail);

    // Pillars and bars
    for (let i = 0; i <= numPillars; i++) {
      const t = i / numPillars;
      const px = startX + t * dx;
      const pz = startZ + t * dz;
      scene.add(box(0.6, 2.5, 0.6, fencePillarMat, px, 1.25, pz));

      // Add bars between pillars
      if (i < numPillars) {
        for (let j = 1; j < 12; j++) { // approx 12 bars per section
          const bt = t + (j / 12) * (1 / numPillars);
          const bx = startX + bt * dx;
          const bz = startZ + bt * dz;
          scene.add(box(0.05, 2.4, 0.05, fenceMaterial, bx, 1.2, bz));
        }
      }
    }
  };

  // Left boundary (from front fence at z=26.5 to back at z=-55)
  createFenceLine(-28, 26.5, -28, -55);
  addCollider(1, 10, 81.5, -28.5, 5, -14.25, colliders);

  // Right boundary (from front fence at z=26.5 to back at z=-55)
  createFenceLine(28, 26.5, 28, -55);
  addCollider(1, 10, 81.5, 28.5, 5, -14.25, colliders);

  // Back boundary (x=-28 to 28 at z=-55)
  createFenceLine(-28, -55, 28, -55);
  addCollider(56, 10, 1, 0, 5, -55.5, colliders);
}

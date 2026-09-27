import * as THREE from 'three';
import { box, addCollider, instancedBoxes } from '../utils.js';

export function createPerimeterFence(scene, colliders) {
  const barMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 });
  const pillarMat = new THREE.MeshStandardMaterial({ color: 0xe1e1d8, roughness: 0.8 });

  const pillars = [];
  const bars = [];

  const addLine = (startX, startZ, endX, endZ) => {
    const dx = endX - startX;
    const dz = endZ - startZ;
    const length = Math.hypot(dx, dz);
    const angle = Math.atan2(dz, dx);
    const midX = (startX + endX) / 2;
    const midZ = (startZ + endZ) / 2;

    const lowerRail = box(length, 0.1, 0.1, barMat, midX, 0.5, midZ);
    lowerRail.rotation.y = -angle;
    scene.add(lowerRail);

    const upperRail = box(length, 0.1, 0.1, barMat, midX, 2.2, midZ);
    upperRail.rotation.y = -angle;
    scene.add(upperRail);

    const numPillars = Math.max(1, Math.floor(length / 4));
    for (let i = 0; i <= numPillars; i++) {
      const t = i / numPillars;
      pillars.push({ x: startX + t * dx, y: 1.25, z: startZ + t * dz });
      if (i < numPillars) {
        for (let j = 1; j < 12; j++) {
          const bt = t + (j / 12) * (1 / numPillars);
          bars.push({
            x: startX + bt * dx,
            y: 1.2,
            z: startZ + bt * dz
          });
        }
      }
    }
  };

  addLine(-28, 26.5, -28, -55);
  addLine(28, 26.5, 28, -55);
  addLine(-28, -55, 28, -55);

  instancedBoxes(scene, pillarMat, 0.6, 2.5, 0.6, pillars);
  instancedBoxes(scene, barMat, 0.05, 2.4, 0.05, bars);

  addCollider(1, 10, 81.5, -28.5, 5, -14.25, colliders);
  addCollider(1, 10, 81.5, 28.5, 5, -14.25, colliders);
  addCollider(56, 10, 1, 0, 5, -55.5, colliders);
}

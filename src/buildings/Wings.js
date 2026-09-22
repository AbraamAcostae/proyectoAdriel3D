import * as THREE from 'three';
import { box, addCollider } from '../utils.js';
import { concrete, roof, glass } from '../materials.js';

function createWingWithClassrooms(scene, colliders, x, z, w, d, floors, rotY) {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  group.rotation.y = rotY;
  
  const floorHeight = 4;
  
  // Outer solid frame
  // Back wall (away from courtyard)
  group.add(box(w, floors * floorHeight, 0.5, concrete, 0, (floors * floorHeight) / 2, -d / 2 + 0.25));
  // Roof
  group.add(box(w, 0.5, d, roof, 0, floors * floorHeight + 0.25, 0));
  // Side walls
  group.add(box(0.5, floors * floorHeight, d, concrete, -w / 2 + 0.25, (floors * floorHeight) / 2, 0));
  group.add(box(0.5, floors * floorHeight, d, concrete, w / 2 - 0.25, (floors * floorHeight) / 2, 0));
  
  for (let f = 0; f < floors; f++) {
    const y = f * floorHeight;
    // Floor slab
    group.add(box(w - 1, 0.4, d - 0.5, concrete, 0, y + 0.2, 0.25));
    
    // Glass wall facing courtyard (+z inside the group)
    group.add(box(w - 1, 3.6, 0.1, glass, 0, y + 2.2, d / 2 - 0.05));
    
    // Internal separating walls (classrooms every ~8 units)
    for (let cx = -w / 2 + 8; cx < w / 2 - 1; cx += 8) {
      group.add(box(0.2, 3.6, d - 1, concrete, cx, y + 2.2, 0.25));
    }
  }

  scene.add(group);
  
  // If rotated by 90 degrees, swap w and d for the collider
  const isRotated = Math.abs(rotY) > 0.1;
  const colW = isRotated ? d : w;
  const colD = isRotated ? w : d;
  
  addCollider(colW, floors * floorHeight, colD + 1.5, x, (floors * floorHeight) / 2, z, colliders);
}

export function createWings(scene, colliders) {
  // We use createWingWithClassrooms(scene, colliders, x, z, length_w, depth_d, floors, rotation_y)
  // Courtyard side is always +z in local space
  
  // Rear Wing (Faces front/courtyard which is +z)
  // original pos: x=0, z=-18. w=56, d=6.
  createWingWithClassrooms(scene, colliders, 0, -18, 56, 6, 3, 0);
  
  // Left Wing (Faces courtyard which is +x)
  // To make +z face +x, we rotate by -90 degrees (-Math.PI/2)
  // original pos: x=-22, z=0. length=46, depth=12.
  createWingWithClassrooms(scene, colliders, -22, 0, 46, 12, 3, -Math.PI / 2);
  
  // Right Wing (Faces courtyard which is -x)
  // To make +z face -x, we rotate by +90 degrees (Math.PI/2)
  // original pos: x=22, z=0. length=46, depth=12.
  createWingWithClassrooms(scene, colliders, 22, 0, 46, 12, 3, Math.PI / 2);
}

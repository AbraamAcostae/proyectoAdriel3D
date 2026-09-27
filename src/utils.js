import * as THREE from 'three';
import { colliderMaterial } from './materials.js';

export function box(w, h, d, m, x, y, z) {
  const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
  o.position.set(x, y, z);
  o.castShadow = true;
  o.receiveShadow = true;
  return o;
}

export function addCollider(w, h, d, x, y, z, collidersArray) {
  const geometry = new THREE.BoxGeometry(w, h, d);
  geometry.computeBoundsTree();
  const collider = new THREE.Mesh(geometry, colliderMaterial);
  collider.position.set(x, y, z);
  collidersArray.push(collider);
  return collider;
}

const _dummy = new THREE.Object3D();

export function instancedBoxes(scene, material, w, h, d, transforms, shadows = true) {
  if (!transforms.length) return null;
  const mesh = new THREE.InstancedMesh(new THREE.BoxGeometry(w, h, d), material, transforms.length);
  mesh.castShadow = shadows;
  mesh.receiveShadow = shadows;
  transforms.forEach((t, i) => {
    _dummy.position.set(t.x, t.y, t.z);
    _dummy.rotation.set(t.rx || 0, t.ry || 0, t.rz || 0);
    _dummy.updateMatrix();
    mesh.setMatrixAt(i, _dummy.matrix);
  });
  mesh.instanceMatrix.needsUpdate = true;
  scene.add(mesh);
  return mesh;
}

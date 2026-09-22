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

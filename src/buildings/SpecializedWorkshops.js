import * as THREE from 'three';
import { box } from '../utils.js';

/**
 * Creates dynamic CanvasTexture for Ballet Grand Banner & Principles
 */
function createBalletGrandSignTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 384;
  const ctx = canvas.getContext('2d');

  // Royal velvet rose & deep plum gradient
  const grad = ctx.createLinearGradient(0, 0, 1024, 384);
  grad.addColorStop(0, '#1f0d2c');
  grad.addColorStop(0.5, '#4a154b');
  grad.addColorStop(1, '#1b0924');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 384);

  // Ornate gold border
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 10;
  ctx.strokeRect(8, 8, 1008, 368);
  ctx.strokeStyle = '#f472b6';
  ctx.lineWidth = 2;
  ctx.strokeRect(18, 18, 988, 348);

  ctx.fillStyle = '#fff1f2';
  ctx.font = 'bold 44px "Georgia", serif';
  ctx.textAlign = 'center';
  ctx.fillText('🩰 GRAN CONSERVATORIO DE BALLET Y DANZA CLÁSICA', 512, 65);

  ctx.fillStyle = '#f472b6';
  ctx.font = 'bold 22px Arial, sans-serif';
  ctx.fillText('LICEO FERMÍN TANGÜIS · CENTRO DE ALTO RENDIMIENTO ARTÍSTICO 2035', 512, 104);

  ctx.textAlign = 'left';
  ctx.font = '20px Arial, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('• Formación Académica Vaganova: Port de Bras, Plié, Relevé y Grand Battement', 45, 160);
  ctx.fillText('• Repertorio Clásico: El Lago de los Cisnes, Cascanueces, Coppélia y Don Quijote', 45, 202);
  ctx.fillText('• Acondicionamiento Físico: Flexibilidad, Salto (Grand Jeté), Giros (Fouetté)', 45, 244);
  ctx.fillText('• Acompañamiento en Vivo: Piano de cola acústico para tempo y ritmo clásico', 45, 286);

  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 22px Arial, sans-serif';
  ctx.fillText('DIRECCIÓN ARTÍSTICA: Mtra. Elena Valdivia · Pianista Residente: Mtro. Roberto Soto', 45, 340);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates dynamic CanvasTexture for Ballet Motion Analysis Video Wall
 */
function createBalletChoreographyScreen() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 1024, 512);

  // Grid lines (biomechanical motion capture overlay)
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
  ctx.lineWidth = 1;
  for (let x = 0; x <= 1024; x += 64) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 512); ctx.stroke();
  }
  for (let y = 0; y <= 512; y += 64) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1024, y); ctx.stroke();
  }

  // Header
  ctx.fillStyle = 'rgba(244, 114, 182, 0.2)';
  ctx.fillRect(0, 0, 1024, 80);
  ctx.fillStyle = '#fdf2f8';
  ctx.font = 'bold 34px Arial';
  ctx.fillText('ANALIZADOR BIOMECÁNICO DE POSTURA Y MOVIMIENTO · SESIÓN EN VIVO', 30, 52);

  // Silhouette / Skeleton pose of Arabesque
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 6;
  ctx.beginPath();
  // Head
  ctx.arc(380, 180, 25, 0, Math.PI * 2);
  // Spine & Torso
  ctx.moveTo(380, 205); ctx.lineTo(390, 290);
  // Supporting leg
  ctx.lineTo(385, 420);
  // Lifted arabesque back leg
  ctx.moveTo(390, 290); ctx.lineTo(540, 260); ctx.lineTo(670, 240);
  // Extended arms
  ctx.moveTo(385, 230); ctx.lineTo(260, 210);
  ctx.moveTo(385, 230); ctx.lineTo(490, 210);
  ctx.stroke();

  // Metrics panel
  ctx.fillStyle = 'rgba(30, 41, 59, 0.85)';
  ctx.fillRect(720, 100, 280, 380);
  ctx.strokeStyle = '#f472b6';
  ctx.strokeRect(720, 100, 280, 380);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 22px Arial';
  ctx.fillText('MÉTRICAS POSTURALES', 740, 140);
  ctx.font = '18px Arial';
  ctx.fillStyle = '#4ade80';
  ctx.fillText('Ángulo de pierna: 104° (Óptimo)', 740, 185);
  ctx.fillText('Alineación lumbar: 98%', 740, 225);
  ctx.fillText('Eje de equilibrio: +0.4 cm', 740, 265);
  ctx.fillStyle = '#facc15';
  ctx.fillText('Elevación en punta: 100%', 740, 305);
  ctx.fillText('Rotación En Dehors: 88°', 740, 345);
  ctx.fillStyle = '#38bdf8';
  ctx.fillText('Sincronización tempo: 4/4', 740, 385);
  ctx.fillText('Estado: RENDIMIENTO PRO', 740, 425);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates dynamic CanvasTexture for Taekwondo Grand Dojang Banner
 */
function createTaekwondoGrandSignTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 384;
  const ctx = canvas.getContext('2d');

  // Deep obsidian & crimson martial arts gradient
  const grad = ctx.createLinearGradient(0, 0, 1024, 384);
  grad.addColorStop(0, '#090d16');
  grad.addColorStop(0.5, '#1e1b2e');
  grad.addColorStop(1, '#110c14');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 384);

  // Dual Red & Blue border representing the Um-Yang / Taegeuk
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 10;
  ctx.strokeRect(6, 6, 1012, 372);
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 4;
  ctx.strokeRect(16, 16, 992, 352);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 44px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🥋 GRAN DOJANG OLÍMPICO DE TAEKWONDO TANGÜIS', 512, 65);

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 22px Arial, sans-serif';
  ctx.fillText('KUKKIWON · WORLD TAEKWONDO FEDERATION · CENTRO DE ALTO RENDIMIENTO', 512, 104);

  // 5 Principles in high-contrast badges
  const tenets = [
    { kr: '예의 (Ye Ui)', es: 'CORTESÍA' },
    { kr: '염치 (Yom Chi)', es: 'INTEGRIDAD' },
    { kr: '인내 (In Nae)', es: 'PERSEVERANCIA' },
    { kr: '극기 (Guk Gi)', es: 'AUTOCONTROL' },
    { kr: '백절불굴 (Baekjul)', es: 'ESPÍRITU INDOMABLE' }
  ];

  tenets.forEach((item, idx) => {
    const bx = 110 + idx * 195;
    ctx.fillStyle = 'rgba(239, 68, 68, 0.16)';
    ctx.fillRect(bx - 90, 135, 180, 120);
    ctx.strokeStyle = idx % 2 === 0 ? '#ef4444' : '#3b82f6';
    ctx.lineWidth = 3;
    ctx.strokeRect(bx - 90, 135, 180, 120);

    ctx.fillStyle = '#facc15';
    ctx.font = 'bold 20px Arial';
    ctx.fillText(item.kr, bx, 180);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 17px Arial';
    ctx.fillText(item.es, bx, 222);
  });

  ctx.fillStyle = '#22c55e';
  ctx.font = 'bold 22px Arial';
  ctx.fillText('DIRECTOR TÉCNICO: Sabonim Marco Paredes (7° Dan WTF) · CAMPEONES NACIONALES ESCOLARES', 512, 320);
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '18px Arial';
  ctx.fillText('Áreas de Entrenamiento: Poomsae de Precisión · Kyorugi Olímpico · Defensa Personal · Rompimientos', 512, 355);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates dynamic CanvasTexture for Electronic Tournament Scoreboard
 */
function createDaedoScoreboardTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#05070e';
  ctx.fillRect(0, 0, 1024, 512);
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 10;
  ctx.strokeRect(6, 6, 1012, 500);

  // Top header: Tournament Title
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(10, 10, 1004, 75);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('CAMPEONATO NACIONAL INTERESCOLAR TAEKWONDO 2035', 512, 58);

  // HONG (Red Side)
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(30, 105, 450, 310);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 42px Arial';
  ctx.fillText('HONG (ROJO)', 255, 160);
  ctx.font = 'bold 150px Arial';
  ctx.fillText('24', 255, 320);
  ctx.font = 'bold 28px Arial';
  ctx.fillStyle = '#fef08a';
  ctx.fillText('GAM-JEOM (Faltas): 01', 255, 385);

  // CHONG (Blue Side)
  ctx.fillStyle = '#2563eb';
  ctx.fillRect(544, 105, 450, 310);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 42px Arial';
  ctx.fillText('CHONG (AZUL)', 769, 160);
  ctx.font = 'bold 150px Arial';
  ctx.fillText('21', 769, 320);
  ctx.font = 'bold 28px Arial';
  ctx.fillStyle = '#fef08a';
  ctx.fillText('GAM-JEOM (Faltas): 02', 769, 385);

  // Center Timer Box
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(362, 425, 300, 75);
  ctx.strokeStyle = '#22c55e';
  ctx.lineWidth = 4;
  ctx.strokeRect(362, 425, 300, 75);
  ctx.fillStyle = '#22c55e';
  ctx.font = 'bold 40px monospace';
  ctx.fillText('01:18 · R3', 512, 478);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates a highly articulated 3D Ballerina figure
 */
function createDetailedBallerina(x, y, z, pose = 'barre', tutuColor = 0xf472b6) {
  const ballerina = new THREE.Group();
  ballerina.position.set(x, y, z);

  const tutuMat = new THREE.MeshStandardMaterial({ color: tutuColor, roughness: 0.5 });
  const leotardMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
  const skinMat = new THREE.MeshStandardMaterial({ color: 0xe5b887, roughness: 0.75 });
  const hairMat = new THREE.MeshStandardMaterial({ color: 0x24160d, roughness: 0.9 });
  const shoeMat = new THREE.MeshStandardMaterial({ color: tutuColor, roughness: 0.3, metalness: 0.1 });

  // 1. Torso & Leotard
  ballerina.add(box(0.34, 0.48, 0.24, leotardMat, 0, 0.95, 0));

  // 2. Multi-tier Classical Tutu plate
  const tutuGeo1 = new THREE.CylinderGeometry(0.68, 0.55, 0.12, 20);
  const t1 = new THREE.Mesh(tutuGeo1, tutuMat);
  t1.position.set(0, 0.78, 0);
  ballerina.add(t1);

  const tutuGeo2 = new THREE.CylinderGeometry(0.78, 0.68, 0.08, 20);
  const t2 = new THREE.Mesh(tutuGeo2, tutuMat);
  t2.position.set(0, 0.73, 0);
  ballerina.add(t2);

  // 3. Legs & Arms based on pose
  if (pose === 'jete') {
    // Grand Jeté (Mid-air split leap!)
    // Forward leg reaching high
    const fLeg = box(0.13, 0.82, 0.13, skinMat, 0, 0.85, 0.42);
    fLeg.rotation.x = -Math.PI / 3;
    ballerina.add(fLeg);
    const fFoot = box(0.14, 0.1, 0.22, shoeMat, 0, 1.15, 0.8);
    fFoot.rotation.x = -Math.PI / 3;
    ballerina.add(fFoot);

    // Backward leg extended straight back
    const bLeg = box(0.13, 0.82, 0.13, skinMat, 0, 0.85, -0.42);
    bLeg.rotation.x = Math.PI / 3;
    ballerina.add(bLeg);
    const bFoot = box(0.14, 0.1, 0.22, shoeMat, 0, 1.15, -0.8);
    bFoot.rotation.x = Math.PI / 3;
    ballerina.add(bFoot);

    // Dynamic flying arms
    const lArm = box(0.62, 0.09, 0.09, skinMat, -0.38, 1.25, 0);
    lArm.rotation.z = Math.PI / 6;
    ballerina.add(lArm);
    const rArm = box(0.62, 0.09, 0.09, skinMat, 0.38, 1.35, 0);
    rArm.rotation.z = -Math.PI / 4;
    ballerina.add(rArm);
  } else if (pose === 'arabesque') {
    // High Arabesque on pointe
    ballerina.add(box(0.13, 0.76, 0.13, skinMat, -0.08, 0.38, 0));
    ballerina.add(box(0.14, 0.12, 0.18, shoeMat, -0.08, 0.06, 0.02));

    const arabLeg = box(0.13, 0.76, 0.13, skinMat, 0.08, 0.72, -0.36);
    arabLeg.rotation.x = Math.PI / 2.7;
    ballerina.add(arabLeg);
    const arabFoot = box(0.14, 0.12, 0.2, shoeMat, 0.08, 0.95, -0.72);
    arabFoot.rotation.x = Math.PI / 2.7;
    ballerina.add(arabFoot);

    // Reaching arms
    ballerina.add(box(0.62, 0.09, 0.09, skinMat, 0.32, 1.15, 0.25));
    ballerina.add(box(0.62, 0.09, 0.09, skinMat, -0.32, 1.15, 0.25));
  } else if (pose === 'pirouette') {
    // Pirouette Passé pose
    ballerina.add(box(0.13, 0.76, 0.13, skinMat, -0.08, 0.38, 0));
    ballerina.add(box(0.14, 0.12, 0.18, shoeMat, -0.08, 0.06, 0.02));

    // Retiré / Passé bent leg
    const passeLeg = box(0.13, 0.45, 0.13, skinMat, 0.18, 0.62, 0);
    passeLeg.rotation.z = -Math.PI / 4;
    ballerina.add(passeLeg);
    const footKnee = box(0.14, 0.1, 0.18, shoeMat, 0.04, 0.72, 0);
    ballerina.add(footKnee);

    // Rounded arms (En couronne 5th position overhead)
    const armR = box(0.1, 0.52, 0.1, skinMat, 0.22, 1.45, 0);
    armR.rotation.z = -Math.PI / 5;
    ballerina.add(armR);
    const armL = box(0.1, 0.52, 0.1, skinMat, -0.22, 1.45, 0);
    armL.rotation.z = Math.PI / 5;
    ballerina.add(armL);
  } else {
    // Barre Stretch / Preparation Pose
    ballerina.add(box(0.13, 0.76, 0.13, skinMat, -0.1, 0.38, 0));
    ballerina.add(box(0.13, 0.76, 0.13, skinMat, 0.1, 0.38, 0));
    ballerina.add(box(0.14, 0.12, 0.18, shoeMat, -0.1, 0.06, 0.04));
    ballerina.add(box(0.14, 0.12, 0.18, shoeMat, 0.1, 0.06, 0.04));

    // Arm on barre
    ballerina.add(box(0.48, 0.09, 0.09, skinMat, -0.3, 1.05, 0));
    // High arched arm
    const highArm = box(0.09, 0.52, 0.09, skinMat, 0.24, 1.35, 0);
    highArm.rotation.z = -Math.PI / 5;
    ballerina.add(highArm);
  }

  // 4. Head, Hair Bun & Tiara
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.17, 14, 12), skinMat);
  head.position.set(0, 1.32, 0);
  ballerina.add(head);

  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.18, 14, 10), hairMat);
  hair.position.set(0, 1.36, -0.03);
  ballerina.add(hair);

  const bun = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), hairMat);
  bun.position.set(0, 1.5, -0.05);
  ballerina.add(bun);

  const tiara = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.02, 8, 16), new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.8 }));
  tiara.rotation.x = Math.PI / 2;
  tiara.position.set(0, 1.48, -0.05);
  ballerina.add(tiara);

  return ballerina;
}

/**
 * Creates a highly articulated 3D Taekwondo Martial Artist
 */
function createDetailedTaekwondoFighter(x, y, z, pose = 'kick', beltColor = 0x111827) {
  const fighter = new THREE.Group();
  fighter.position.set(x, y, z);

  const dobokMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.55 });
  const beltMat = new THREE.MeshStandardMaterial({ color: beltColor, roughness: 0.6 });
  const skinMat = new THREE.MeshStandardMaterial({ color: 0xc68642, roughness: 0.8 });
  const hairMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.9 });
  const gearMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.4 });

  // 1. Dobok Jacket
  const jacket = box(0.48, 0.58, 0.3, dobokMat, 0, 1.0, 0);
  jacket.castShadow = true;
  fighter.add(jacket);

  // Black V-collar
  fighter.add(box(0.22, 0.16, 0.31, new THREE.MeshStandardMaterial({ color: 0x0f172a }), 0, 1.22, 0));

  // Belt with embroidered knot and dangling ends
  fighter.add(box(0.5, 0.11, 0.32, beltMat, 0, 0.74, 0));
  fighter.add(box(0.09, 0.38, 0.04, beltMat, -0.09, 0.58, 0.18));
  fighter.add(box(0.09, 0.32, 0.04, beltMat, 0.03, 0.6, 0.18));

  // 2. Stances & Action
  if (pose === 'jump_kick') {
    // Flying Side Kick (Twimyo Yop Chagi)
    const baseLeg = box(0.19, 0.65, 0.19, dobokMat, -0.2, 0.45, -0.15);
    baseLeg.rotation.x = Math.PI / 4;
    fighter.add(baseLeg);

    // Kicking leg extended horizontally
    const kickLeg = box(0.85, 0.19, 0.19, dobokMat, 0.55, 1.05, 0.1);
    kickLeg.rotation.z = Math.PI / 8;
    fighter.add(kickLeg);
    const kickFoot = box(0.26, 0.15, 0.2, gearMat, 1.02, 1.15, 0.1);
    fighter.add(kickFoot);

    // Arms tight in combat guard
    fighter.add(box(0.38, 0.13, 0.13, dobokMat, -0.15, 1.12, 0.22));
    fighter.add(box(0.38, 0.13, 0.13, dobokMat, 0.15, 1.02, 0.22));
  } else if (pose === 'kick') {
    // Standing High Roundhouse / Side Kick
    fighter.add(box(0.19, 0.72, 0.19, dobokMat, -0.18, 0.36, 0));
    fighter.add(box(0.19, 0.12, 0.28, gearMat, -0.18, 0.06, 0.04));

    const kLeg = box(0.78, 0.19, 0.19, dobokMat, 0.45, 0.95, 0);
    kLeg.rotation.z = Math.PI / 4.5;
    fighter.add(kLeg);
    const kFoot = box(0.26, 0.14, 0.2, gearMat, 0.88, 1.15, 0);
    fighter.add(kFoot);

    fighter.add(box(0.38, 0.13, 0.13, dobokMat, -0.16, 1.15, 0.2));
    fighter.add(box(0.38, 0.13, 0.13, dobokMat, 0.16, 1.05, 0.2));
  } else if (pose === 'kneel') {
    // Formal Kneeling Bow (Mook-Nyum meditation)
    fighter.position.y -= 0.45;
    fighter.add(box(0.44, 0.25, 0.55, dobokMat, 0, 0.2, -0.1));
    fighter.add(box(0.18, 0.12, 0.24, gearMat, -0.14, 0.08, -0.38));
    fighter.add(box(0.18, 0.12, 0.24, gearMat, 0.14, 0.08, -0.38));
    // Hands neatly placed on thighs
    fighter.add(box(0.14, 0.08, 0.18, skinMat, -0.15, 0.42, 0.15));
    fighter.add(box(0.14, 0.08, 0.18, skinMat, 0.15, 0.42, 0.15));
  } else {
    // Combat Sparring Stance (Gyeorugi)
    fighter.add(box(0.19, 0.72, 0.19, dobokMat, -0.2, 0.36, -0.18));
    fighter.add(box(0.19, 0.72, 0.19, dobokMat, 0.2, 0.36, 0.22));
    fighter.add(box(0.19, 0.12, 0.28, gearMat, -0.2, 0.06, -0.15));
    fighter.add(box(0.19, 0.12, 0.28, gearMat, 0.2, 0.06, 0.26));

    // Raised fighting fists with gloves
    fighter.add(box(0.14, 0.35, 0.14, dobokMat, -0.28, 1.05, 0.18));
    fighter.add(box(0.14, 0.35, 0.14, dobokMat, 0.28, 1.15, 0.24));
    fighter.add(box(0.16, 0.16, 0.16, gearMat, -0.28, 1.25, 0.24));
    fighter.add(box(0.16, 0.16, 0.16, gearMat, 0.28, 1.35, 0.3));
  }

  // 3. Head & Hair
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.19, 14, 12), skinMat);
  head.position.set(0, 1.45, 0);
  head.castShadow = true;
  fighter.add(head);

  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.2, 14, 10), hairMat);
  hair.position.set(0, 1.5, -0.02);
  fighter.add(hair);

  return fighter;
}

/**
 * Builds the complete Grand Arts & Sports Complex:
 * - Gran Conservatorio de Ballet Clásico at X = -34, Y = -16, Z = 0 (32m x 24m x 6.5m)
 * - Gran Dojang Olímpico de Taekwondo at X = +34, Y = -16, Z = 0 (32m x 24m x 6.5m)
 * - Central Welcome & Honors Atrium at X = 0, Y = -16, Z = 0
 */
export function buildSpecializedWorkshops(scene) {
  const root = new THREE.Group();
  scene.add(root);

  const floorY = -16.0;
  const ceilingY = -9.5;
  const roomH = ceilingY - floorY; // 6.5 meters high!
  const hallW = 32;                // Width along X
  const hallD = 24;                // Depth along Z

  // Shared Premium Materials
  const chromeMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.15 });
  const goldMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.85, roughness: 0.25 });
  const darkWoodMat = new THREE.MeshStandardMaterial({ color: 0x271911, roughness: 0.6 });
  const glassRailMat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.35, roughness: 0.1 });
  const concreteWallMat = new THREE.MeshStandardMaterial({ color: 0x262b30, roughness: 0.9 });
  const acousticCeilingMat = new THREE.MeshStandardMaterial({ color: 0x181c20, roughness: 0.95 });

  // =========================================================================
  // 1. GRAN CONSERVATORIO DE BALLET Y DANZA CLÁSICA (X = -34)
  // =========================================================================
  const bCenter = new THREE.Vector3(-34, floorY, 0);

  // A) Architectural Shell (Floor, Ceiling, Walls)
  // Canadian Maple sprung hardwood floor with rich specular highlights
  const mapleFloorMat = new THREE.MeshStandardMaterial({
    color: 0xdfab71,
    roughness: 0.22,
    metalness: 0.12
  });
  const balletFloor = box(hallW, 0.4, hallD, mapleFloorMat, bCenter.x, floorY - 0.2, bCenter.z);
  balletFloor.receiveShadow = true;
  root.add(balletFloor);

  // Ceiling with recessed coffered lighting panels
  root.add(box(hallW, 0.4, hallD, acousticCeilingMat, bCenter.x, ceilingY + 0.2, bCenter.z));

  // Walls
  root.add(box(hallW, roomH, 0.4, concreteWallMat, bCenter.x, floorY + roomH / 2, bCenter.z - hallD / 2)); // North wall
  root.add(box(hallW, roomH, 0.4, concreteWallMat, bCenter.x, floorY + roomH / 2, bCenter.z + hallD / 2)); // South wall
  root.add(box(0.4, roomH, hallD, concreteWallMat, bCenter.x - hallW / 2, floorY + roomH / 2, bCenter.z)); // West wall

  // Partition with grand glass French doors towards central atrium (East wall)
  root.add(box(0.4, roomH, hallD * 0.35, concreteWallMat, bCenter.x + hallW / 2, floorY + roomH / 2, bCenter.z - hallD * 0.32));
  root.add(box(0.4, roomH, hallD * 0.35, concreteWallMat, bCenter.x + hallW / 2, floorY + roomH / 2, bCenter.z + hallD * 0.32));
  root.add(box(0.1, roomH - 0.4, hallD * 0.3, glassRailMat, bCenter.x + hallW / 2, floorY + roomH / 2, bCenter.z)); // Glass entryway

  // B) 28-Meter Full-Length Studio Mirrors with Soft Backlit Halo
  const mirrorX = bCenter.x - hallW / 2 + 0.35;
  const mirrorMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    metalness: 0.98,
    roughness: 0.02
  });
  root.add(box(0.1, 4.2, hallD - 2.5, mirrorMat, mirrorX, floorY + 2.4, bCenter.z));
  // Warm LED edge strip halo around mirror perimeter
  root.add(box(0.15, 0.08, hallD - 2.3, new THREE.MeshBasicMaterial({ color: 0xffedd5 }), mirrorX - 0.02, floorY + 4.55, bCenter.z));
  root.add(box(0.15, 0.08, hallD - 2.3, new THREE.MeshBasicMaterial({ color: 0xffedd5 }), mirrorX - 0.02, floorY + 0.25, bCenter.z));

  // C) Continuous Double-Deck Ballet Barres along the mirror wall
  const beechBarreMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.4 });
  for (const barH of [0.95, 1.25]) {
    // Long wooden barre
    root.add(box(0.08, 0.08, hallD - 3.2, beechBarreMat, mirrorX + 0.5, floorY + barH, bCenter.z));
    // Support chrome brackets every 3 meters
    for (let bz = bCenter.z - 9; bz <= bCenter.z + 9; bz += 3) {
      root.add(box(0.5, 0.04, 0.04, chromeMat, mirrorX + 0.25, floorY + barH, bz));
      root.add(box(0.05, barH, 0.05, chromeMat, mirrorX + 0.5, floorY + barH / 2, bz));
    }
  }

  // Free-standing mobile double-barres in center-court
  const mobileBarre = (mx, mz) => {
    root.add(box(0.08, 0.08, 4.5, beechBarreMat, mx, floorY + 1.15, mz));
    root.add(box(0.08, 0.08, 4.5, beechBarreMat, mx, floorY + 0.9, mz));
    for (const bEnd of [-2.1, 2.1]) {
      root.add(box(0.06, 1.2, 0.06, chromeMat, mx, floorY + 0.6, mz + bEnd));
      root.add(box(0.7, 0.08, 0.12, darkWoodMat, mx, floorY + 0.05, mz + bEnd));
    }
  };
  mobileBarre(bCenter.x + 2, bCenter.z - 5);
  mobileBarre(bCenter.x + 2, bCenter.z + 5);

  // D) Steinway-Style Concert Grand Piano in High-Gloss Black Lacquer
  const pianoPos = new THREE.Vector3(bCenter.x - 7, floorY, bCenter.z - 7.5);
  const glossBlackMat = new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.1, metalness: 0.4 });

  // Piano main body (angled grand piano curve)
  root.add(box(2.6, 0.7, 1.8, glossBlackMat, pianoPos.x, pianoPos.y + 1.15, pianoPos.z));
  root.add(box(1.4, 0.65, 1.2, glossBlackMat, pianoPos.x - 0.6, pianoPos.y + 1.15, pianoPos.z + 0.6));
  // Keyboard shelf & keys
  root.add(box(1.7, 0.18, 0.45, glossBlackMat, pianoPos.x + 0.5, pianoPos.y + 0.98, pianoPos.z + 0.95));
  root.add(box(1.5, 0.05, 0.35, new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 }), pianoPos.x + 0.5, pianoPos.y + 1.08, pianoPos.z + 0.98));
  // Black keys
  for (let k = -0.65; k <= 0.65; k += 0.12) {
    root.add(box(0.05, 0.04, 0.2, new THREE.MeshBasicMaterial({ color: 0x111111 }), pianoPos.x + 0.5 + k, pianoPos.y + 1.12, pianoPos.z + 0.93));
  }
  // Open tilted piano lid on brass prop stick
  const lid = box(2.4, 0.06, 1.7, glossBlackMat, pianoPos.x, pianoPos.y + 1.85, pianoPos.z);
  lid.rotation.z = Math.PI / 8;
  root.add(lid);
  root.add(box(0.04, 0.8, 0.04, goldMat, pianoPos.x + 0.7, pianoPos.y + 1.7, pianoPos.z)); // Prop stick
  // 3 Carved Piano Legs
  root.add(box(0.18, 0.85, 0.18, glossBlackMat, pianoPos.x - 1.0, pianoPos.y + 0.45, pianoPos.z - 0.7));
  root.add(box(0.18, 0.85, 0.18, glossBlackMat, pianoPos.x + 1.0, pianoPos.y + 0.45, pianoPos.z - 0.7));
  root.add(box(0.18, 0.85, 0.18, glossBlackMat, pianoPos.x + 1.0, pianoPos.y + 0.45, pianoPos.z + 0.8));
  // Pianist cushioned artist bench
  root.add(box(0.9, 0.52, 0.45, new THREE.MeshStandardMaterial({ color: 0x831843, roughness: 0.6 }), pianoPos.x + 0.5, pianoPos.y + 0.46, pianoPos.z + 1.6));

  // E) Spectator & Choreography 3-Tier Bleachers (North Wall)
  const bTierZ = bCenter.z - hallD / 2 + 1.8;
  for (let t = 0; t < 3; t++) {
    const tH = 0.55 * (t + 1);
    const tZ = bTierZ + t * 0.85;
    root.add(box(16, tH, 0.85, darkWoodMat, bCenter.x, floorY + tH / 2, tZ));
    // Velvet upholstered seats on each tier
    for (let sx = bCenter.x - 7; sx <= bCenter.x + 7; sx += 1.4) {
      root.add(box(1.1, 0.1, 0.7, new THREE.MeshStandardMaterial({ color: 0x9d174d, roughness: 0.6 }), sx, floorY + tH + 0.05, tZ));
    }
  }

  // F) Giant Choreography Video Wall (South Wall)
  const videoScreenTex = createBalletChoreographyScreen();
  const videoScreen = new THREE.Mesh(new THREE.PlaneGeometry(8.5, 4.2), new THREE.MeshBasicMaterial({ map: videoScreenTex }));
  videoScreen.position.set(bCenter.x, floorY + 3.2, bCenter.z + hallD / 2 - 0.25);
  videoScreen.rotation.y = Math.PI;
  root.add(videoScreen);
  // Video screen frame with LED accent
  root.add(box(8.8, 4.5, 0.1, new THREE.MeshStandardMaterial({ color: 0x09090b, metalness: 0.8 }), bCenter.x, floorY + 3.2, bCenter.z + hallD / 2 - 0.2));

  // G) Wardrobe, Costume Racks & Trophy Cabinets (East perimeter)
  const rackZ = bCenter.z + 6;
  root.add(box(0.08, 1.8, 3.8, chromeMat, bCenter.x + 11.5, floorY + 1.0, rackZ));
  const tutuColors = [0xf472b6, 0xffffff, 0x111827, 0x9333ea, 0x38bdf8];
  tutuColors.forEach((tCol, i) => {
    const tutuHanger = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.35, 0.1, 16),
      new THREE.MeshStandardMaterial({ color: tCol, roughness: 0.6 })
    );
    tutuHanger.position.set(bCenter.x + 11.5, floorY + 1.3, rackZ - 1.4 + i * 0.7);
    root.add(tutuHanger);
  });

  // Trophy Glass Cabinet with Awards & Golden Tiaras
  const cabX = bCenter.x + 11.5;
  const cabZ = bCenter.z - 6;
  root.add(box(0.8, 2.6, 3.2, glassRailMat, cabX, floorY + 1.4, cabZ));
  root.add(box(0.85, 0.15, 3.3, goldMat, cabX, floorY + 2.7, cabZ));
  for (let tz = cabZ - 1.2; tz <= cabZ + 1.2; tz += 0.8) {
    const trophyCup = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.05, 0.45, 12), goldMat);
    trophyCup.position.set(cabX, floorY + 1.5, tz);
    root.add(trophyCup);
  }

  // H) Educational Grand Signboard
  const balletSignTex = createBalletGrandSignTexture();
  const balletSign = new THREE.Mesh(new THREE.PlaneGeometry(6.5, 2.4), new THREE.MeshBasicMaterial({ map: balletSignTex }));
  balletSign.position.set(bCenter.x, floorY + 4.8, bCenter.z - hallD / 2 + 0.35);
  root.add(balletSign);

  // I) 3D BALLERINAS IN PERFORMANCE!
  // 1. Center Grand Jeté (Mid-air leap)
  const d1 = createDetailedBallerina(bCenter.x - 2, floorY + 1.2, bCenter.z, 'jete', 0xf472b6);
  root.add(d1);

  // 2. Center Arabesque on pointe
  const d2 = createDetailedBallerina(bCenter.x + 4, floorY + 0.2, bCenter.z - 2, 'arabesque', 0xffffff);
  d2.rotation.y = -Math.PI / 4;
  root.add(d2);

  // 3. Pirouette in center
  const d3 = createDetailedBallerina(bCenter.x + 1, floorY + 0.2, bCenter.z + 3, 'pirouette', 0xf43f5e);
  d3.rotation.y = Math.PI / 3;
  root.add(d3);

  // 4. Dancers at the continuous mirror barre
  const d4 = createDetailedBallerina(mirrorX + 0.8, floorY + 0.2, bCenter.z - 4, 'barre', 0xec4899);
  d4.rotation.y = Math.PI / 2;
  root.add(d4);

  const d5 = createDetailedBallerina(mirrorX + 0.8, floorY + 0.2, bCenter.z + 4, 'barre', 0xd946ef);
  d5.rotation.y = Math.PI / 2;
  root.add(d5);

  // J) Lighting (Architectural downlights & stage spots)
  const bAmbientLight = new THREE.HemisphereLight(0xfff1f2, 0x4a154b, 1.6);
  bAmbientLight.position.set(bCenter.x, ceilingY, bCenter.z);
  root.add(bAmbientLight);

  const bCenterSpot = new THREE.PointLight(0xfff7ed, 2.4, 32);
  bCenterSpot.position.set(bCenter.x, ceilingY - 1.0, bCenter.z);
  root.add(bCenterSpot);

  for (const lx of [bCenter.x - 8, bCenter.x, bCenter.x + 8]) {
    for (const lz of [bCenter.z - 6, bCenter.z, bCenter.z + 6]) {
      root.add(box(1.4, 0.06, 1.4, new THREE.MeshBasicMaterial({ color: 0xfff7ed }), lx, ceilingY - 0.05, lz));
    }
  }


  // =========================================================================
  // 2. GRAN DOJANG OLÍMPICO DE TAEKWONDO (X = +34)
  // =========================================================================
  const tCenter = new THREE.Vector3(34, floorY, 0);

  // A) Architectural Shell
  const darkAthleticFloorMat = new THREE.MeshStandardMaterial({
    color: 0x1e242b,
    roughness: 0.6,
    metalness: 0.1
  });
  const tkdFloor = box(hallW, 0.4, hallD, darkAthleticFloorMat, tCenter.x, floorY - 0.2, tCenter.z);
  tkdFloor.receiveShadow = true;
  root.add(tkdFloor);

  // Acoustic Industrial Ceiling with exposed trusses
  root.add(box(hallW, 0.4, hallD, acousticCeilingMat, tCenter.x, ceilingY + 0.2, tCenter.z));
  // Industrial black steel ceiling trusses
  for (let tz = tCenter.z - 9; tz <= tCenter.z + 9; tz += 4.5) {
    root.add(box(hallW - 1, 0.45, 0.25, new THREE.MeshStandardMaterial({ color: 0x111827, metalness: 0.8 }), tCenter.x, ceilingY - 0.35, tz));
  }

  // Walls with traditional cedar slats
  root.add(box(hallW, roomH, 0.4, concreteWallMat, tCenter.x, floorY + roomH / 2, tCenter.z - hallD / 2)); // North wall
  root.add(box(hallW, roomH, 0.4, concreteWallMat, tCenter.x, floorY + roomH / 2, tCenter.z + hallD / 2)); // South wall
  root.add(box(0.4, roomH, hallD, concreteWallMat, tCenter.x + hallW / 2, floorY + roomH / 2, tCenter.z)); // East wall

  // Partition towards atrium (West wall)
  root.add(box(0.4, roomH, hallD * 0.35, concreteWallMat, tCenter.x - hallW / 2, floorY + roomH / 2, tCenter.z - hallD * 0.32));
  root.add(box(0.4, roomH, hallD * 0.35, concreteWallMat, tCenter.x - hallW / 2, floorY + roomH / 2, tCenter.z + hallD * 0.32));
  root.add(box(0.1, roomH - 0.4, hallD * 0.3, glassRailMat, tCenter.x - hallW / 2, floorY + roomH / 2, tCenter.z));

  // B) Official World Taekwondo Competition Arena (Octagonal Ring)
  // Outer safety perimeter: Crimson Red puzzle tatami (14m x 14m)
  const tatamiRedMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.65 });
  const tatamiBlueMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.65 });

  const outerMat = box(15, 0.08, 15, tatamiRedMat, tCenter.x, floorY + 0.06, tCenter.z);
  outerMat.receiveShadow = true;
  root.add(outerMat);

  // Inner Combat Ring: Royal Blue (10m x 10m)
  const innerMat = box(10.5, 0.09, 10.5, tatamiBlueMat, tCenter.x, floorY + 0.08, tCenter.z);
  innerMat.receiveShadow = true;
  root.add(innerMat);

  // White boundary lines and center referee starting circle
  const refRing = new THREE.Mesh(
    new THREE.TorusGeometry(2.4, 0.06, 8, 36),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  refRing.rotation.x = -Math.PI / 2;
  refRing.position.set(tCenter.x, floorY + 0.14, tCenter.z);
  root.add(refRing);

  // Fighter starting marks (Hong Red & Chong Blue)
  root.add(box(0.8, 0.02, 0.15, new THREE.MeshBasicMaterial({ color: 0xef4444 }), tCenter.x - 1.5, floorY + 0.14, tCenter.z));
  root.add(box(0.8, 0.02, 0.15, new THREE.MeshBasicMaterial({ color: 0x3b82f6 }), tCenter.x + 1.5, floorY + 0.14, tCenter.z));

  // C) Heavy Punching Bag Rig (East Wall)
  const bagRackX = tCenter.x + hallW / 2 - 1.5;
  const bagColors = [0xef4444, 0x111827, 0x2563eb, 0xdc2626, 0x1e293b, 0x3b82f6];

  for (let i = 0; i < 6; i++) {
    const bz = tCenter.z - 7.5 + i * 3.0;
    // Heavy steel suspension frame
    root.add(box(1.2, 0.1, 0.1, chromeMat, bagRackX + 0.5, ceilingY - 1.2, bz));
    root.add(box(0.04, 1.4, 0.04, chromeMat, bagRackX, ceilingY - 1.9, bz)); // Chain

    // Heavy leather bag
    const bag = new THREE.Mesh(
      new THREE.CylinderGeometry(0.38, 0.38, 1.8, 18),
      new THREE.MeshStandardMaterial({ color: bagColors[i], roughness: 0.35 })
    );
    bag.position.set(bagRackX, ceilingY - 3.2, bz);
    bag.castShadow = true;
    root.add(bag);

    // WTF printed logo stripe
    root.add(box(0.8, 0.25, 0.8, new THREE.MeshBasicMaterial({ color: 0xffffff }), bagRackX, ceilingY - 3.2, bz));
  }

  // D) Traditional Korean Dojang Gate & Ceremonial Dragon Drum (Buk)
  const gateZ = tCenter.z - hallD / 2 + 1.2;
  // Traditional Pagoda Wooden Pillars
  root.add(box(0.6, roomH - 1, 0.6, darkWoodMat, tCenter.x - 4.5, floorY + (roomH - 1) / 2, gateZ));
  root.add(box(0.6, roomH - 1, 0.6, darkWoodMat, tCenter.x + 4.5, floorY + (roomH - 1) / 2, gateZ));
  // Arch lintel beam
  root.add(box(10.5, 0.45, 0.8, darkWoodMat, tCenter.x, floorY + roomH - 1.2, gateZ));
  root.add(box(11.5, 0.2, 1.1, new THREE.MeshStandardMaterial({ color: 0x991b1b }), tCenter.x, floorY + roomH - 0.9, gateZ));

  // Ceremonial Large Taekwondo Drum (Buk) on carved wooden trestle
  const drumX = tCenter.x - 8.5;
  const drumZ = gateZ + 1.2;
  const drumMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.4 });
  const drumSkinMat = new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.8 });

  const drumBody = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 1.1, 24), drumMat);
  drumBody.rotation.z = Math.PI / 2;
  drumBody.position.set(drumX, floorY + 1.8, drumZ);
  root.add(drumBody);
  // Drum face
  root.add(box(0.04, 1.6, 1.6, drumSkinMat, drumX + 0.56, floorY + 1.8, drumZ));
  root.add(box(0.04, 1.6, 1.6, drumSkinMat, drumX - 0.56, floorY + 1.8, drumZ));
  // Drum carved stand legs
  root.add(box(0.15, 1.5, 0.8, darkWoodMat, drumX - 0.4, floorY + 0.75, drumZ));
  root.add(box(0.15, 1.5, 0.8, darkWoodMat, drumX + 0.4, floorY + 0.75, drumZ));

  // E) Electronic Arena Scoreboards (Daedo PSS 4K Screens)
  const scoreTex = createDaedoScoreboardTexture();
  const scoreScreen1 = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 2.6), new THREE.MeshBasicMaterial({ map: scoreTex }));
  scoreScreen1.position.set(tCenter.x, ceilingY - 1.8, tCenter.z - 3.5);
  root.add(scoreScreen1);

  const scoreScreen2 = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 2.6), new THREE.MeshBasicMaterial({ map: scoreTex }));
  scoreScreen2.position.set(tCenter.x, ceilingY - 1.8, tCenter.z + 3.5);
  scoreScreen2.rotation.y = Math.PI;
  root.add(scoreScreen2);

  // F) Wall of Mastery: Complete Dan Belts & Honor Showcase
  const beltWallZ = tCenter.z + hallD / 2 - 0.35;
  root.add(box(14, 3.2, 0.12, darkWoodMat, tCenter.x, floorY + 2.5, beltWallZ));
  const fullRanks = [
    { name: 'Blanco 10° Gup', color: 0xffffff },
    { name: 'Amarillo 8° Gup', color: 0xfacc15 },
    { name: 'Verde 6° Gup', color: 0x16a34a },
    { name: 'Azul 4° Gup', color: 0x2563eb },
    { name: 'Rojo 2° Gup', color: 0xdc2626 },
    { name: 'Negro 1° Dan', color: 0x09090b },
    { name: 'Negro 4° Dan Sabonim', color: 0x09090b },
    { name: 'Negro 7° Dan Gran Maestro', color: 0x09090b }
  ];
  fullRanks.forEach((r, i) => {
    const rx = tCenter.x - 5.5 + i * 1.55;
    root.add(box(0.15, 1.6, 0.08, new THREE.MeshStandardMaterial({ color: r.color, roughness: 0.5 }), rx, floorY + 2.4, beltWallZ - 0.1));
    root.add(box(0.25, 0.15, 0.04, goldMat, rx, floorY + 3.3, beltWallZ - 0.1)); // Gold nameplate
  });

  // Hogu Chest Protectors and Helmets Gear Rack
  const gearX = tCenter.x + 9;
  const gearZ = tCenter.z + hallD / 2 - 1.5;
  root.add(box(4.5, 2.4, 0.8, new THREE.MeshStandardMaterial({ color: 0x1e293b }), gearX, floorY + 1.2, gearZ));
  for (let gx = gearX - 1.5; gx <= gearX + 1.5; gx += 1.0) {
    const isRed = gx < gearX;
    root.add(box(0.65, 0.85, 0.25, new THREE.MeshStandardMaterial({ color: isRed ? 0xef4444 : 0x3b82f6 }), gx, floorY + 1.6, gearZ));
    // Electronic sparring helmet on top shelf
    const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 10), new THREE.MeshStandardMaterial({ color: isRed ? 0xef4444 : 0x3b82f6 }));
    helmet.position.set(gx, floorY + 2.5, gearZ);
    root.add(helmet);
  }

  // G) Grand Dojang Signboard
  const tkdSignTex = createTaekwondoGrandSignTexture();
  const tkdSign = new THREE.Mesh(new THREE.PlaneGeometry(7.2, 2.7), new THREE.MeshBasicMaterial({ map: tkdSignTex }));
  tkdSign.position.set(tCenter.x, floorY + 4.5, tCenter.z - hallD / 2 + 0.35);
  root.add(tkdSign);

  // H) 3D MARTIAL ARTISTS IN HIGH-FLYING ACTION!
  // 1. Fighter 1: Spectacular Jump Flying Side Kick (Twimyo Yop Chagi) breaking boards!
  const fighter1 = createDetailedTaekwondoFighter(tCenter.x - 1.2, floorY + 1.1, tCenter.z - 0.5, 'jump_kick', 0x09090b);
  fighter1.rotation.y = Math.PI / 4;
  root.add(fighter1);

  // Broken pine wooden board flying into two pieces!
  const boardMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.8 });
  const bHalf1 = box(0.35, 0.25, 0.04, boardMat, tCenter.x + 0.4, floorY + 2.4, tCenter.z - 0.2);
  bHalf1.rotation.set(0.3, 0.4, 0.8);
  root.add(bHalf1);
  const bHalf2 = box(0.35, 0.25, 0.04, boardMat, tCenter.x + 0.6, floorY + 1.9, tCenter.z - 0.5);
  bHalf2.rotation.set(-0.4, 0.2, -0.7);
  root.add(bHalf2);

  // 2. Fighter 2: Counter Sparring Guard with Red Hogu
  const fighter2 = createDetailedTaekwondoFighter(tCenter.x + 1.6, floorY + 0.2, tCenter.z + 1.2, 'guard', 0xef4444);
  fighter2.rotation.y = -Math.PI * 0.7;
  root.add(fighter2);

  // 3. Grand Master (Sabonim 7° Dan) supervising
  const master = createDetailedTaekwondoFighter(tCenter.x - 4.5, floorY + 0.2, tCenter.z + 3.8, 'guard', 0x09090b);
  master.rotation.y = -Math.PI / 5;
  root.add(master);

  // 4. Squad of 3 students in kneeling meditation (Mook-Nyum)
  for (let s = 0; s < 3; s++) {
    const bColor = s === 0 ? 0xfacc15 : s === 1 ? 0x16a34a : 0x2563eb;
    const student = createDetailedTaekwondoFighter(tCenter.x - 4.5 + s * 1.8, floorY + 0.65, tCenter.z - 5.5, 'kneel', bColor);
    root.add(student);
  }

  // I) Dojang Arena Floodlights
  const tkdAmbientLight = new THREE.HemisphereLight(0xfffbeb, 0x1e1b2e, 1.6);
  tkdAmbientLight.position.set(tCenter.x, ceilingY, tCenter.z);
  root.add(tkdAmbientLight);

  const tkdCenterSpot = new THREE.PointLight(0xfef08a, 2.4, 32);
  tkdCenterSpot.position.set(tCenter.x, ceilingY - 1.0, tCenter.z);
  root.add(tkdCenterSpot);

  for (const lx of [tCenter.x - 8, tCenter.x, tCenter.x + 8]) {
    for (const lz of [tCenter.z - 6, tCenter.z, tCenter.z + 6]) {
      root.add(box(1.5, 0.08, 1.5, new THREE.MeshBasicMaterial({ color: 0xffffff }), lx, ceilingY - 0.05, lz));
    }
  }


  // =========================================================================
  // 3. CENTRAL WELCOME ATRIUM & HONORS HALLWAY (X = 0)
  // =========================================================================
  const atriumW = 20;
  const atriumD = hallD;
  const atriumFloorMat = new THREE.MeshStandardMaterial({ color: 0x151c22, roughness: 0.35, metalness: 0.2 });

  root.add(box(atriumW, 0.4, atriumD, atriumFloorMat, 0, floorY - 0.2, 0));
  root.add(box(atriumW, 0.4, atriumD, acousticCeilingMat, 0, ceilingY + 0.2, 0));
  root.add(box(atriumW, roomH, 0.4, concreteWallMat, 0, floorY + roomH / 2, -atriumD / 2));
  root.add(box(atriumW, roomH, 0.4, concreteWallMat, 0, floorY + roomH / 2, atriumD / 2));

  // Grand Directional Atrium Signboard
  const aSignCanvas = document.createElement('canvas');
  aSignCanvas.width = 1024; aSignCanvas.height = 256;
  const aCtx = aSignCanvas.getContext('2d');
  aCtx.fillStyle = '#090d14'; aCtx.fillRect(0, 0, 1024, 256);
  aCtx.strokeStyle = '#facc15'; aCtx.lineWidth = 8; aCtx.strokeRect(6, 6, 1012, 244);
  aCtx.fillStyle = '#ffffff'; aCtx.font = 'bold 44px Arial'; aCtx.textAlign = 'center';
  aCtx.fillText('NIVEL -2 · CENTRO DE ALTO RENDIMIENTO Y ARTES', 512, 75);
  aCtx.fillStyle = '#f472b6'; aCtx.font = 'bold 30px Arial';
  aCtx.fillText('◀ 🩰 CONSERVATORIO DE BALLET', 280, 160);
  aCtx.fillStyle = '#38bdf8';
  aCtx.fillText('🥋 DOJANG DE TAEKWONDO ▶', 740, 160);
  aCtx.fillStyle = '#a1a1aa'; aCtx.font = '22px Arial';
  aCtx.fillText('LICEO FERMÍN TANGÜIS · EXCELENCIA Y DISCIPLINA 2035', 512, 215);

  const aSignTex = new THREE.CanvasTexture(aSignCanvas);
  const aSign = new THREE.Mesh(new THREE.PlaneGeometry(8.0, 2.0), new THREE.MeshBasicMaterial({ map: aSignTex }));
  aSign.position.set(0, floorY + 4.2, -atriumD / 2 + 0.35);
  root.add(aSign);

  // Central Reception Desk & Trophies
  root.add(box(4.2, 1.1, 1.2, new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3 }), 0, floorY + 0.55, 3));
  root.add(box(4.4, 0.1, 1.4, goldMat, 0, floorY + 1.15, 3));

  // Modern Atrium Ring Chandelier
  const ringChandelier = new THREE.Mesh(
    new THREE.TorusGeometry(3.5, 0.12, 12, 48),
    new THREE.MeshBasicMaterial({ color: 0xffedd5 })
  );
  ringChandelier.rotation.x = Math.PI / 2;
  ringChandelier.position.set(0, ceilingY - 1.2, 0);
  root.add(ringChandelier);

  const aLight = new THREE.PointLight(0xfff7ed, 2.5, 24);
  aLight.position.set(0, ceilingY - 1.5, 0);
  root.add(aLight);

  return root;
}

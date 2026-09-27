import * as THREE from 'three';
import { box } from '../utils.js';

/**
 * Creates dynamic canvas textures for realistic screens, menus and signs
 */
function createScreenTexture(title, subtitle, stats, theme = 'cyan') {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  const bgGrad = ctx.createLinearGradient(0, 0, 1024, 512);
  if (theme === 'cyan') {
    bgGrad.addColorStop(0, '#04161f');
    bgGrad.addColorStop(1, '#082a3a');
  } else if (theme === 'green') {
    bgGrad.addColorStop(0, '#061a12');
    bgGrad.addColorStop(1, '#0e3822');
  } else if (theme === 'kiosk') {
    bgGrad.addColorStop(0, '#1c1508');
    bgGrad.addColorStop(1, '#3a270d');
  } else {
    bgGrad.addColorStop(0, '#121218');
    bgGrad.addColorStop(1, '#20202e');
  }
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 512);

  // Border outline with neon glow
  ctx.strokeStyle = theme === 'cyan' ? '#00e5ff' : theme === 'green' ? '#39e75f' : theme === 'kiosk' ? '#ffb300' : '#ff3366';
  ctx.lineWidth = 10;
  ctx.strokeRect(10, 10, 1004, 492);

  // Header banner
  ctx.fillStyle = theme === 'cyan' ? 'rgba(0, 229, 255, 0.18)' : theme === 'green' ? 'rgba(57, 231, 95, 0.18)' : 'rgba(255, 179, 0, 0.2)';
  ctx.fillRect(10, 10, 1004, 110);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 44px Arial, sans-serif';
  ctx.fillText(title, 40, 72);

  ctx.fillStyle = theme === 'cyan' ? '#7ee9ff' : theme === 'green' ? '#9effb5' : '#ffd54f';
  ctx.font = '24px Arial, sans-serif';
  ctx.fillText(subtitle, 42, 104);

  // Divider
  ctx.fillStyle = theme === 'cyan' ? '#00e5ff' : theme === 'green' ? '#39e75f' : '#ffb300';
  ctx.fillRect(40, 128, 944, 4);

  // Stats / Metrics
  ctx.font = 'bold 28px Arial, sans-serif';
  let y = 180;
  stats.forEach((item) => {
    ctx.fillStyle = '#ffffff';
    ctx.fillText(item.label, 44, y);
    ctx.fillStyle = theme === 'cyan' ? '#00f0ff' : theme === 'green' ? '#49f274' : '#ffca28';
    ctx.textAlign = 'right';
    ctx.fillText(item.val, 980, y);
    ctx.textAlign = 'left';

    // Thin bar under each stat
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.fillRect(44, y + 10, 936, 2);
    y += 56;
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates canvas texture for the Swimming Workshop Coach Board
 */
function createCoachBoardTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 384;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 512, 384);

  // Aluminum frame
  ctx.strokeStyle = '#4a5568';
  ctx.lineWidth = 12;
  ctx.strokeRect(6, 6, 500, 372);

  // Header
  ctx.fillStyle = '#1a365d';
  ctx.fillRect(12, 12, 488, 54);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('🏊 TALLER DE NATACIÓN TANGÜIS', 256, 48);

  ctx.textAlign = 'left';
  ctx.font = 'bold 18px Arial';
  ctx.fillStyle = '#c53030';
  ctx.fillText('SESIÓN DE ENTRENAMIENTO · DÍA 4', 28, 95);

  ctx.font = '16px monospace';
  ctx.fillStyle = '#2d3748';
  const lines = [
    '• 400m Calentamiento (Crol / Espalda suave)',
    '• 8 x 50m Patada con tabla (desc. 15")',
    '• 6 x 100m Estilos (Mariposa, Espalda, Pecho, Crol)',
    '• 4 x 25m Velocidad máxima desde partidor',
    '• 200m Vuelta a la calma y estiramientos',
    '------------------------------------------',
    'PROFESOR: Prof. Carlos M. | HORARIO: 3:30 - 5:00 PM',
    'OBJETIVO: Técnica de viraje y respiración bilateral'
  ];

  let y = 130;
  lines.forEach((l) => {
    ctx.fillText(l, 28, y);
    y += 28;
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates canvas texture for the 4-hand Swimming Pace Clock
 */
function createPaceClockTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Clock frame
  ctx.fillStyle = '#111827';
  ctx.beginPath();
  ctx.arc(256, 256, 248, 0, Math.PI * 2);
  ctx.fill();

  ctx.lineWidth = 14;
  ctx.strokeStyle = '#f59e0b';
  ctx.stroke();

  // Dial background
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(256, 256, 230, 0, Math.PI * 2);
  ctx.fill();

  // Minute / Second numbers: 60, 15, 30, 45
  ctx.fillStyle = '#111827';
  ctx.font = 'bold 44px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('60', 256, 60);
  ctx.fillText('15', 450, 256);
  ctx.fillText('30', 256, 450);
  ctx.fillText('45', 60, 256);

  // Intermediate numbers 5, 10, 20, 25, 35, 40, 50, 55
  ctx.font = 'bold 26px Arial';
  for (let s = 5; s < 60; s += 5) {
    if (s % 15 === 0) continue;
    const rad = (s / 60) * Math.PI * 2 - Math.PI / 2;
    const nx = 256 + Math.cos(rad) * 190;
    const ny = 256 + Math.sin(rad) * 190;
    ctx.fillText(String(s), nx, ny);
  }

  // 4 Swimming Pace Clock Sweep Hands (Red, Green, Blue, Yellow)
  const hands = [
    { angle: 0, color: '#dc2626' },             // 12 o'clock (Red)
    { angle: Math.PI / 2, color: '#16a34a' },     // 3 o'clock (Green)
    { angle: Math.PI, color: '#2563eb' },         // 6 o'clock (Blue)
    { angle: (3 * Math.PI) / 2, color: '#eab308' } // 9 o'clock (Yellow)
  ];

  hands.forEach((h) => {
    ctx.strokeStyle = h.color;
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(256, 256);
    ctx.lineTo(256 + Math.cos(h.angle - Math.PI / 2) * 175, 256 + Math.sin(h.angle - Math.PI / 2) * 175);
    ctx.stroke();

    // Hand arrow tip
    ctx.fillStyle = h.color;
    ctx.beginPath();
    const tipX = 256 + Math.cos(h.angle - Math.PI / 2) * 185;
    const tipY = 256 + Math.sin(h.angle - Math.PI / 2) * 185;
    ctx.arc(tipX, tipY, 9, 0, Math.PI * 2);
    ctx.fill();
  });

  // Center hub
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(256, 256, 16, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates canvas texture for the Kiosk Menu and Blackboard
 */
function createKioskMenuTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Blackboard dark texture
  ctx.fillStyle = '#18241e';
  ctx.fillRect(0, 0, 1024, 512);

  // Wood frame
  ctx.strokeStyle = '#a67c52';
  ctx.lineWidth = 20;
  ctx.strokeRect(10, 10, 1004, 492);

  // Header
  ctx.fillStyle = '#ffea79';
  ctx.font = 'bold 50px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('★ KIOSKO ESCOLAR FERMÍN TANGÜIS ★', 512, 70);

  ctx.fillStyle = '#57e389';
  ctx.font = 'bold 24px Arial';
  ctx.fillText('SNACKS SALUDABLES · BEBIDAS FRÍAS · FRUTAS FRESCAS', 512, 110);

  // Two columns of menu items
  ctx.textAlign = 'left';
  ctx.font = 'bold 26px Arial';

  // Left column: Sandwiches & Frutas
  ctx.fillStyle = '#ffffff';
  ctx.fillText('🥪 SÁNDWICHES Y WRAPS', 50, 165);
  ctx.font = '22px Arial';
  ctx.fillStyle = '#d7ede1';
  ctx.fillText('• Triple de Palta, Huevo y Tomate ....... S/ 3.50', 50, 205);
  ctx.fillText('• Pan con Pollo Deshilachado Bio ...... S/ 4.00', 50, 245);
  ctx.fillText('• Mixto Caliente Integral ............. S/ 3.50', 50, 285);
  ctx.fillText('• Wrap de Quinua y Verduras ........... S/ 4.50', 50, 325);

  ctx.font = 'bold 26px Arial';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('🍎 FRUTAS FRESCAS', 50, 380);
  ctx.font = '22px Arial';
  ctx.fillStyle = '#d7ede1';
  ctx.fillText('• Plátano de Seda / Manzana / Mandarina .. S/ 1.00', 50, 420);
  ctx.fillText('• Vaso de Fruta Picada Variada ....... S/ 3.00', 50, 460);

  // Right column: Bebidas & Snacks
  ctx.font = 'bold 26px Arial';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('🥤 BEBIDAS E HIDRATACIÓN', 530, 165);
  ctx.font = '22px Arial';
  ctx.fillStyle = '#d7ede1';
  ctx.fillText('• Agua Mineral San Mateo 600ml ........ S/ 2.00', 530, 205);
  ctx.fillText('• Bebida Isotónica Natación 500ml ..... S/ 3.50', 530, 245);
  ctx.fillText('• Jugo Natural Maracuyá / Naranja ...... S/ 3.00', 530, 285);
  ctx.fillText('• Chicha Morada Casera ................ S/ 2.50', 530, 325);

  ctx.font = 'bold 26px Arial';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('⚡ SNACKS ENERGÉTICOS', 530, 380);
  ctx.font = '22px Arial';
  ctx.fillStyle = '#d7ede1';
  ctx.fillText('• Barra de Cereal y Avena con Miel .... S/ 1.50', 530, 420);
  ctx.fillText('• Mix de Frutos Secos y Pasas ......... S/ 2.50', 530, 460);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates plant cluster (ferns / tropical bushes)
 */
function createBush(x, y, z, scale = 1, isTropical = false) {
  const group = new THREE.Group();
  group.position.set(x, y, z);
  const leafColor = isTropical ? 0x247a3e : 0x1f6634;
  const leafMat = new THREE.MeshStandardMaterial({
    color: leafColor,
    roughness: 0.8,
    metalness: 0.1,
    side: THREE.DoubleSide
  });

  const leafCount = 8;
  for (let i = 0; i < leafCount; i++) {
    const angle = (i / leafCount) * Math.PI * 2;
    const leafGeo = new THREE.ConeGeometry(0.35 * scale, 1.2 * scale, 4);
    const leaf = new THREE.Mesh(leafGeo, leafMat);
    leaf.rotation.z = Math.PI / 3;
    leaf.rotation.y = angle;
    leaf.position.y = 0.4 * scale;
    leaf.castShadow = true;
    group.add(leaf);
  }

  const centerGeo = new THREE.SphereGeometry(0.45 * scale, 8, 6);
  const centerMesh = new THREE.Mesh(centerGeo, leafMat);
  centerMesh.position.y = 0.5 * scale;
  group.add(centerMesh);

  return group;
}

/**
 * Creates an indoor potted palm tree
 */
function createIndoorPalm(scene, x, y, z) {
  const palm = new THREE.Group();
  palm.position.set(x, y, z);

  const potMat = new THREE.MeshStandardMaterial({ color: 0xf0f0f0, roughness: 0.3 });
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.45, 1.1, 16), potMat);
  pot.position.y = 0.55;
  pot.castShadow = true;
  palm.add(pot);

  const soil = new THREE.Mesh(
    new THREE.CircleGeometry(0.62, 16),
    new THREE.MeshStandardMaterial({ color: 0x24180d, roughness: 1 })
  );
  soil.rotation.x = -Math.PI / 2;
  soil.position.y = 1.08;
  palm.add(soil);

  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x6e5235, roughness: 0.9 });
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 2.6, 8), trunkMat);
  trunk.position.y = 2.2;
  trunk.castShadow = true;
  palm.add(trunk);

  const frondMat = new THREE.MeshStandardMaterial({
    color: 0x228340,
    roughness: 0.6,
    side: THREE.DoubleSide
  });

  for (let i = 0; i < 9; i++) {
    const angle = (i / 9) * Math.PI * 2;
    const frond = new THREE.Mesh(new THREE.ConeGeometry(0.45, 2.2, 4), frondMat);
    frond.position.set(0, 3.4, 0);
    frond.rotation.y = angle;
    frond.rotation.z = Math.PI / 2.6;
    palm.add(frond);
  }

  scene.add(palm);
  return palm;
}

/**
 * Adds full realistic props for the Swimming Academy / Workshop
 */
function createSwimmingWorkshopProps(group, floorY, poolCX, poolCZ, poolW, poolL) {
  const metalMat = new THREE.MeshStandardMaterial({ color: 0xd8d8d8, metalness: 0.9, roughness: 0.2 });
  const redRescueMat = new THREE.MeshStandardMaterial({ color: 0xe53935, roughness: 0.4 });
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });

  // 1. BACKSTROKE TURN INDICATOR FLAGS (Banderines de viraje de espalda)
  // Two cables across the pool at 5m from each end, suspended at Y = floorY + 2.4
  const flagCableZ = [poolCZ - poolL / 2 + 5, poolCZ + poolL / 2 - 5];
  const flagColors = [0xe53935, 0x1e88e5, 0xfdd835, 0x43a047];

  flagCableZ.forEach((fz) => {
    // Left & right support posts
    group.add(box(0.1, 2.8, 0.1, metalMat, poolCX - poolW / 2 - 0.8, floorY + 1.4, fz));
    group.add(box(0.1, 2.8, 0.1, metalMat, poolCX + poolW / 2 + 0.8, floorY + 1.4, fz));

    // Tension cable across pool
    group.add(box(poolW + 1.6, 0.03, 0.03, metalMat, poolCX, floorY + 2.7, fz));

    // Triangular flags hanging along the cable
    for (let fx = poolCX - poolW / 2 + 0.5; fx <= poolCX + poolW / 2 - 0.5; fx += 0.9) {
      const col = flagColors[Math.floor(Math.abs(fx * 3)) % flagColors.length];
      const flagMesh = new THREE.Mesh(
        new THREE.ConeGeometry(0.32, 0.65, 3),
        new THREE.MeshStandardMaterial({ color: col, side: THREE.DoubleSide })
      );
      flagMesh.rotation.z = Math.PI;
      flagMesh.position.set(fx, floorY + 2.35, fz);
      group.add(flagMesh);
    }
  });

  // 2. FALSE START ROPE (Cuerda de salida en falso a 15m)
  const falseStartZ = poolCZ - poolL / 2 + 15;
  group.add(box(0.1, 2.6, 0.1, metalMat, poolCX - poolW / 2 - 0.8, floorY + 1.3, falseStartZ));
  group.add(box(0.1, 2.6, 0.1, metalMat, poolCX + poolW / 2 + 0.8, floorY + 1.3, falseStartZ));
  group.add(box(poolW + 1.6, 0.03, 0.03, metalMat, poolCX, floorY + 2.5, falseStartZ));
  for (let bx = poolCX - poolW / 2 + 1; bx <= poolCX + poolW / 2 - 1; bx += 1.8) {
    const floatMesh = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), redRescueMat);
    floatMesh.position.set(bx, floorY + 2.5, falseStartZ);
    group.add(floatMesh);
  }

  // 3. OFFICIAL 4-HAND SWIMMING PACE CLOCK (Reloj de paso de 4 manecillas)
  const paceClockTex = createPaceClockTexture();
  const paceClock = new THREE.Mesh(
    new THREE.CircleGeometry(1.6, 32),
    new THREE.MeshBasicMaterial({ map: paceClockTex, side: THREE.DoubleSide })
  );
  paceClock.position.set(poolCX - poolW / 2 - 3.4, floorY + 3.8, poolCZ);
  paceClock.rotation.y = Math.PI / 2;
  group.add(paceClock);
  group.add(box(0.12, 3.4, 3.4, new THREE.MeshStandardMaterial({ color: 0x1f2937 }), poolCX - poolW / 2 - 3.48, floorY + 3.8, poolCZ));

  // 4. COACH / TRAINER WORKSHOP STATION
  const coachX = poolCX - poolW / 2 - 2.8;
  const coachZ = poolCZ + 4;

  // Tactical Whiteboard on wheels
  const wbTex = createCoachBoardTexture();
  const boardMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(3.0, 2.1),
    new THREE.MeshBasicMaterial({ map: wbTex, side: THREE.DoubleSide })
  );
  boardMesh.position.set(coachX, floorY + 1.9, coachZ);
  boardMesh.rotation.y = Math.PI / 2;
  group.add(boardMesh);

  // Whiteboard rolling aluminum frame & legs
  group.add(box(0.08, 2.5, 0.08, metalMat, coachX, floorY + 1.25, coachZ - 1.45));
  group.add(box(0.08, 2.5, 0.08, metalMat, coachX, floorY + 1.25, coachZ + 1.45));
  group.add(box(0.6, 0.08, 0.08, metalMat, coachX, floorY + 0.1, coachZ - 1.45));
  group.add(box(0.6, 0.08, 0.08, metalMat, coachX, floorY + 0.1, coachZ + 1.45));

  // Coach's Table with stopwatch, clipboard and orange training cones
  const cTable = box(1.0, 0.85, 1.8, new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 }), coachX, floorY + 0.42, coachZ + 2.4);
  cTable.castShadow = true;
  group.add(cTable);

  // Digital stopwatch on table
  group.add(box(0.2, 0.05, 0.25, new THREE.MeshStandardMaterial({ color: 0xfacc15 }), coachX, floorY + 0.88, coachZ + 2.1));
  // Coach clipboards
  group.add(box(0.28, 0.03, 0.4, new THREE.MeshStandardMaterial({ color: 0xd97706 }), coachX, floorY + 0.87, coachZ + 2.5));
  // Whistle lanyard
  group.add(box(0.08, 0.04, 0.12, metalMat, coachX + 0.2, floorY + 0.88, coachZ + 2.8));

  // Orange training cones on deck
  for (let c = 0; c < 3; c++) {
    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(0.22, 0.55, 12),
      new THREE.MeshStandardMaterial({ color: 0xff6600, roughness: 0.3 })
    );
    cone.position.set(coachX + 0.2, floorY + 0.28, coachZ - 2.0 - c * 0.8);
    cone.castShadow = true;
    group.add(cone);
    // White stripe on cone
    const stripe = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.14, 12), whiteMat);
    stripe.position.set(coachX + 0.2, floorY + 0.35, coachZ - 2.0 - c * 0.8);
    group.add(stripe);
  }

  // 5. SWIMMING GEAR & EQUIPMENT RACKS (Estantes con tablas, pull buoys, aletas y fideos)
  const rackX = poolCX - poolW / 2 - 2.8;
  const rackZ = poolCZ - 7.5;

  // Aluminum shelf frame (3 tiers)
  group.add(box(0.8, 2.2, 3.4, new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.7, roughness: 0.3 }), rackX, floorY + 1.1, rackZ));
  const shelfTierY = [floorY + 0.5, floorY + 1.15, floorY + 1.8];

  // Tier 1: Colorful Swimming Kickboards (Tablas de patada)
  const boardColors = [0xef4444, 0x3b82f6, 0x10b981, 0xf59e0b];
  boardColors.forEach((bCol, idx) => {
    for (let stack = 0; stack < 3; stack++) {
      const kBoard = box(0.5, 0.06, 0.7, new THREE.MeshStandardMaterial({ color: bCol, roughness: 0.4 }), rackX, shelfTierY[0] + 0.04 + stack * 0.08, rackZ - 1.2 + idx * 0.8);
      group.add(kBoard);
    }
  });

  // Tier 2: Pull Buoys (Flotadores de entrenamiento bicolores)
  for (let pb = 0; pb < 5; pb++) {
    const pz = rackZ - 1.2 + pb * 0.6;
    const buoyL = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.4, 12), new THREE.MeshStandardMaterial({ color: 0x2563eb }));
    buoyL.rotation.x = Math.PI / 2;
    buoyL.position.set(rackX - 0.1, shelfTierY[1] + 0.15, pz);
    group.add(buoyL);

    const buoyR = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.4, 12), new THREE.MeshStandardMaterial({ color: 0xffffff }));
    buoyR.rotation.x = Math.PI / 2;
    buoyR.position.set(rackX + 0.1, shelfTierY[1] + 0.15, pz);
    group.add(buoyR);
  }

  // Tier 3: Swimming Fins (Aletas de silicona de colores)
  const finMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, roughness: 0.4 });
  for (let f = 0; f < 4; f++) {
    const fz = rackZ - 1.0 + f * 0.7;
    const fin1 = box(0.22, 0.08, 0.55, finMat, rackX - 0.15, shelfTierY[2] + 0.06, fz);
    const fin2 = box(0.22, 0.08, 0.55, finMat, rackX + 0.15, shelfTierY[2] + 0.06, fz);
    group.add(fin1);
    group.add(fin2);
  }

  // Vertical Bin with Floating Foam Noodles (Fideos de natación)
  const noodleBin = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55, 0.5, 1.2, 16),
    new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.5 })
  );
  noodleBin.position.set(rackX, floorY + 0.6, rackZ + 2.4);
  group.add(noodleBin);

  const noodleColors = [0xec4899, 0x8b5cf6, 0x10b981, 0x06b6d4, 0xfacc15];
  noodleColors.forEach((nCol, i) => {
    const angle = (i / noodleColors.length) * Math.PI * 2;
    const noodle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 2.2, 8),
      new THREE.MeshStandardMaterial({ color: nCol, roughness: 0.5 })
    );
    noodle.position.set(rackX + Math.cos(angle) * 0.25, floorY + 1.4, rackZ + 2.4 + Math.sin(angle) * 0.25);
    noodle.rotation.z = (Math.random() - 0.5) * 0.2;
    noodle.rotation.x = (Math.random() - 0.5) * 0.2;
    group.add(noodle);
  });

  // 6. STUDENT BLEACHERS FOR WORKSHOP CLASSES (Gradas de espectadores / alumnos)
  const bX = poolCX - poolW / 2 - 3.6;
  const bZ = poolCZ + 10;
  for (let tier = 0; tier < 3; tier++) {
    const tY = floorY + (tier + 1) * 0.45;
    const tX = bX - tier * 0.65;
    const bench = box(0.5, 0.1, 5.0, new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.6 }), tX, tY, bZ);
    bench.castShadow = true;
    group.add(bench);

    // Support legs
    group.add(box(0.08, tY - floorY, 0.08, metalMat, tX, floorY + (tY - floorY) / 2, bZ - 2.0));
    group.add(box(0.08, tY - floorY, 0.08, metalMat, tX, floorY + (tY - floorY) / 2, bZ + 2.0));

    // Student swim backpacks & rolled towels on benches
    if (tier > 0) {
      group.add(box(0.35, 0.35, 0.45, new THREE.MeshStandardMaterial({ color: 0x1e3a8a }), tX, tY + 0.2, bZ - 1.2));
      group.add(box(0.2, 0.15, 0.4, new THREE.MeshStandardMaterial({ color: 0x06b6d4 }), tX, tY + 0.1, bZ + 1.2));
    }
  }

  // 7. WALL-MOUNTED LIFEBUOYS & RESCUE POLE
  for (const lz of [poolCZ - 9, poolCZ + 9]) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.5, 0.12, 12, 28),
      redRescueMat
    );
    ring.position.set(poolCX - poolW / 2 - 3.8, floorY + 2.2, lz);
    ring.rotation.y = Math.PI / 2;
    group.add(ring);

    // White strap wraps on lifebuoy
    for (let r = 0; r < 4; r++) {
      const strap = new THREE.Mesh(new THREE.TorusGeometry(0.51, 0.04, 8, 8, Math.PI / 3), whiteMat);
      strap.position.set(poolCX - poolW / 2 - 3.8, floorY + 2.2, lz);
      strap.rotation.y = Math.PI / 2;
      strap.rotation.z = (r * Math.PI) / 2;
      group.add(strap);
    }
  }

  // Telescopic rescue reach pole mounted on wall
  group.add(box(0.06, 0.06, 7.5, new THREE.MeshStandardMaterial({ color: 0xeab308, metalness: 0.8 }), poolCX - poolW / 2 - 3.8, floorY + 1.2, poolCZ));

  // 8. DEPTH WARNING MARKINGS (Profundidad rotulada en borde)
  const depthCanvas = document.createElement('canvas');
  depthCanvas.width = 256; depthCanvas.height = 128;
  const dCtx = depthCanvas.getContext('2d');
  dCtx.fillStyle = '#ffffff'; dCtx.fillRect(0, 0, 256, 128);
  dCtx.fillStyle = '#0f172a'; dCtx.font = 'bold 52px Arial'; dCtx.textAlign = 'center';
  dCtx.fillText('2.20 M', 128, 65);
  dCtx.font = 'bold 24px Arial'; dCtx.fillStyle = '#dc2626';
  dCtx.fillText('NO CLAVADOS', 128, 105);
  const depthTex = new THREE.CanvasTexture(depthCanvas);

  const depthMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.7), new THREE.MeshBasicMaterial({ map: depthTex }));
  depthMesh.rotation.x = -Math.PI / 2;
  depthMesh.position.set(poolCX - poolW / 2 - 0.4, floorY + 0.08, poolCZ - 5);
  group.add(depthMesh);

  // 9. ELECTRONIC TOUCH PADS UNDER WATER (Placas de cronometraje táctil en cada carril)
  const touchPadMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.4 });
  for (let l = 0; l < 4; l++) {
    const px = poolCX - poolW / 2 + 1.75 + l * 3.5;
    const pad = box(1.8, 1.1, 0.04, touchPadMat, px, floorY - 0.65, poolCZ - poolL / 2 + 0.16);
    group.add(pad);
  }
}

/**
 * Adds the Grand School Kiosk against the East wall, complete with
 * commercial illuminated beverage coolers, Italian espresso station,
 * digital menu monitors, pastry display domes, snack shelves, and front counter.
 */
function createSchoolKiosk(group, floorY, ceilingY) {
  // East retaining wall is at X = 30.7. Kiosk back is mounted against this wall.
  const wallX = 30.4;
  const kCZ = -7.5;
  const kLength = 14.0; // Spans Z from -14.5 to -0.5
  const kH = 4.2;

  const counterX = 25.8; // Front service counter facing West into cafeteria
  const counterL = 13.0; // Length along Z

  const woodKioskMat = new THREE.MeshStandardMaterial({ color: 0x5a3418, roughness: 0.6 });
  const flutedWoodMat = new THREE.MeshStandardMaterial({ color: 0x935c30, roughness: 0.5 });
  const whiteMarbleMat = new THREE.MeshStandardMaterial({ color: 0xfdfbf7, roughness: 0.2, metalness: 0.1 });
  const darkSlateMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.88, roughness: 0.2 });
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.45, roughness: 0.1 });
  const greenCanopyMat = new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.6 });
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 });

  // 1. BACK ARCHITECTURAL ACCENT WALL AGAINST EAST WALL (X = 30.4)
  const backPanel = box(0.25, kH, kLength, darkSlateMat, wallX - 0.12, floorY + kH / 2, kCZ);
  group.add(backPanel);

  // Vertical warm wood acoustic ribs on back wall
  for (let rz = kCZ - kLength / 2 + 0.4; rz <= kCZ + kLength / 2 - 0.4; rz += 0.5) {
    group.add(box(0.08, kH, 0.08, flutedWoodMat, wallX - 0.28, floorY + kH / 2, rz));
  }

  // Back-bar lower work cabinetry (stainless steel & dark wood)
  const backCabinet = box(0.85, 1.05, kLength - 0.6, woodKioskMat, wallX - 0.7, floorY + 1.05 / 2, kCZ);
  group.add(backCabinet);
  group.add(box(0.9, 0.06, kLength - 0.5, metalMat, wallX - 0.7, floorY + 1.06, kCZ));

  // 2. THREE LARGE VERTICAL COMMERCIAL BEVERAGE COOLERS (Mounted against back wall)
  const coolerWidth = 1.35;
  const coolerHeight = 2.4;
  const coolerDepth = 0.8;
  const coolerZs = [kCZ - 4.5, kCZ - 2.5, kCZ - 0.5];

  coolerZs.forEach((cZ, cIdx) => {
    // Cooler body
    group.add(box(coolerDepth, coolerHeight, coolerWidth, darkSlateMat, wallX - 0.7, floorY + 1.1 + coolerHeight / 2, cZ));
    // Illuminated glass front door
    group.add(box(0.04, coolerHeight - 0.15, coolerWidth - 0.1, glassMat, wallX - 0.7 - coolerDepth / 2 - 0.02, floorY + 1.1 + coolerHeight / 2, cZ));
    // Interior cool cyan LED light
    const clLight = new THREE.PointLight(0xa5f3fc, 1.4, 3.5);
    clLight.position.set(wallX - 0.7 - coolerDepth / 2 - 0.15, floorY + 1.1 + coolerHeight - 0.3, cZ);
    group.add(clLight);

    // Shelves with beverage bottles inside
    const bottleColors = [0x0284c7, 0x16a34a, 0xea580c, 0xfacc15, 0xdc2626];
    for (let shelf = 0; shelf < 4; shelf++) {
      const sY = floorY + 1.35 + shelf * 0.5;
      group.add(box(coolerDepth - 0.2, 0.03, coolerWidth - 0.15, metalMat, wallX - 0.7, sY, cZ));
      for (let bz = cZ - coolerWidth / 2 + 0.2; bz <= cZ + coolerWidth / 2 - 0.2; bz += 0.2) {
        const colorIndex = ((shelf + Math.floor(bz * 10)) % bottleColors.length + bottleColors.length) % bottleColors.length;
        const col = bottleColors[colorIndex];
        const bottle = new THREE.Mesh(
          new THREE.CylinderGeometry(0.045, 0.045, 0.28, 8),
          new THREE.MeshStandardMaterial({ color: col, roughness: 0.2, transparent: true, opacity: 0.85 })
        );
        bottle.position.set(wallX - 0.7 - 0.08, sY + 0.15, bz);
        group.add(bottle);
      }
    }
  });

  // 3. COMMERCIAL ITALIAN ESPRESSO STATION (on back-bar counter at Z = kCZ + 2.4)
  const espZ = kCZ + 2.4;
  const espMachine = box(0.65, 0.55, 0.95, metalMat, wallX - 0.7, floorY + 1.35, espZ);
  group.add(espMachine);
  // Coffee bean hoppers (clear cylinders)
  for (const hz of [-0.25, 0.25]) {
    const hopper = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.1, 0.3, 12), glassMat);
    hopper.position.set(wallX - 0.7, floorY + 1.75, espZ + hz);
    group.add(hopper);
  }
  // Stack of coffee cups
  for (let c = 0; c < 3; c++) {
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.045, 0.08, 12), whiteMat);
    cup.position.set(wallX - 0.7 - 0.15, floorY + 1.66, espZ - 0.35 + c * 0.12);
    group.add(cup);
  }

  // 4. MULTI-TIER SNACK & BAKERY WIRE RACKS (on back-bar at Z = kCZ + 4.6)
  const rackZ = kCZ + 4.6;
  group.add(box(0.6, 2.2, 2.0, metalMat, wallX - 0.7, floorY + 1.1 + 1.1, rackZ));
  const snackColors = [0xef4444, 0x3b82f6, 0x10b981, 0xf59e0b, 0x8b5cf6];
  for (let tier = 0; tier < 4; tier++) {
    const ty = floorY + 1.35 + tier * 0.5;
    for (let sIdx = 0; sIdx < 5; sIdx++) {
      const bag = box(0.25, 0.22, 0.12, new THREE.MeshStandardMaterial({ color: snackColors[(tier + sIdx) % snackColors.length] }), wallX - 0.7 - 0.15, ty + 0.12, rackZ - 0.75 + sIdx * 0.38);
      group.add(bag);
    }
  }

  // 5. THREE DIGITAL WALL MENU MONITORS (Overhead on back wall)
  const menuBoardTex = createKioskMenuTexture();
  const menuBoard = new THREE.Mesh(
    new THREE.PlaneGeometry(5.2, 2.2),
    new THREE.MeshBasicMaterial({ map: menuBoardTex, side: THREE.DoubleSide })
  );
  menuBoard.position.set(wallX - 0.35, floorY + 2.7, kCZ);
  menuBoard.rotation.y = -Math.PI / 2;
  group.add(menuBoard);

  // 6. MAIN FRONT SERVING COUNTER (Facing West into cafeteria, X = counterX = 25.8)
  // Main counter body in fluted oak
  const frontCounter = box(0.85, 1.15, counterL, flutedWoodMat, counterX, floorY + 0.58, kCZ);
  frontCounter.castShadow = true;
  group.add(frontCounter);

  // Polished Calacatta White Quartz countertop
  const cTop = box(1.15, 0.08, counterL + 0.3, whiteMarbleMat, counterX, floorY + 1.18, kCZ);
  group.add(cTop);

  // Recessed warm LED under-counter glow strip
  group.add(box(0.08, 0.05, counterL, new THREE.MeshBasicMaterial({ color: 0xfef08a }), counterX - 0.52, floorY + 1.12, kCZ));
  // Warm LED toe-kick base strip
  group.add(box(0.08, 0.06, counterL, new THREE.MeshBasicMaterial({ color: 0xffd54f }), counterX - 0.52, floorY + 0.06, kCZ));

  // Front counter lower decorative slats
  group.add(box(0.08, 0.9, counterL - 0.2, new THREE.MeshStandardMaterial({ color: 0x166534 }), counterX - 0.48, floorY + 0.55, kCZ));

  // 7. COUNTERTOP PROPS & EQUIPMENT
  // A) Two Touchscreen POS Cash Registers
  for (const rz of [kCZ - 3.2, kCZ + 2.8]) {
    const reg = box(0.35, 0.35, 0.35, new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.7 }), counterX, floorY + 1.35, rz);
    group.add(reg);
    // Green touch screen
    group.add(box(0.04, 0.24, 0.3, new THREE.MeshBasicMaterial({ color: 0x22c55e }), counterX - 0.18, floorY + 1.45, rz));
    // Receipt printer
    group.add(box(0.18, 0.15, 0.2, metalMat, counterX, floorY + 1.28, rz - 0.3));
    // Card pin-pad terminal
    group.add(box(0.12, 0.08, 0.16, new THREE.MeshStandardMaterial({ color: 0x1e293b }), counterX - 0.25, floorY + 1.25, rz + 0.25));
  }

  // B) Two Curved Glass Pastry & Sandwich Display Vitrines
  for (const vz of [kCZ - 0.6, kCZ + 0.6]) {
    const caseBase = box(0.5, 0.08, 0.9, metalMat, counterX, floorY + 1.22, vz);
    group.add(caseBase);
    const caseCover = box(0.46, 0.32, 0.86, glassMat, counterX, floorY + 1.38, vz);
    group.add(caseCover);
    // Warm interior showcase light
    const vLight = new THREE.PointLight(0xffedd5, 1.2, 2.5);
    vLight.position.set(counterX, floorY + 1.48, vz);
    group.add(vLight);
    // Sandwiches & croissants inside
    for (let sw = 0; sw < 3; sw++) {
      group.add(box(0.22, 0.09, 0.2, new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.6 }), counterX, floorY + 1.28, vz - 0.24 + sw * 0.24));
    }
  }

  // C) Fresh Organic Fruit Baskets
  const basketMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.9 });
  const basket1 = box(0.4, 0.14, 0.55, basketMat, counterX, floorY + 1.26, kCZ - 5.0);
  group.add(basket1);
  for (let a = 0; a < 6; a++) {
    const apple = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), new THREE.MeshStandardMaterial({ color: 0xdc2626 }));
    apple.position.set(counterX + (a % 2) * 0.12 - 0.06, floorY + 1.35, kCZ - 5.15 + (a % 3) * 0.15);
    group.add(apple);
  }

  const basket2 = box(0.4, 0.14, 0.55, basketMat, counterX, floorY + 1.26, kCZ + 4.8);
  group.add(basket2);
  for (let b = 0; b < 5; b++) {
    const banana = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.32, 6),
      new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.4 })
    );
    banana.rotation.x = Math.PI / 4 + b * 0.2;
    banana.rotation.z = Math.PI / 3;
    banana.position.set(counterX, floorY + 1.38, kCZ + 4.65 + b * 0.08);
    group.add(banana);
  }

  // D) Commercial Double Juice Dispenser Machine (Cold beverage dispenser)
  const juiceZ = kCZ - 1.8;
  group.add(box(0.4, 0.18, 0.6, metalMat, counterX, floorY + 1.26, juiceZ));
  // Transparent juice bowl 1 (Orange Juice)
  const tank1 = box(0.32, 0.35, 0.24, new THREE.MeshStandardMaterial({ color: 0xf97316, transparent: true, opacity: 0.85 }), counterX, floorY + 1.48, juiceZ - 0.14);
  group.add(tank1);
  // Transparent juice bowl 2 (Maracuyá / Passion Fruit)
  const tank2 = box(0.32, 0.35, 0.24, new THREE.MeshStandardMaterial({ color: 0xeab308, transparent: true, opacity: 0.85 }), counterX, floorY + 1.48, juiceZ + 0.14);
  group.add(tank2);

  // E) Straws, napkins, trays
  group.add(box(0.14, 0.24, 0.14, metalMat, counterX, floorY + 1.32, kCZ - 4.0));
  group.add(box(0.12, 0.22, 0.12, new THREE.MeshStandardMaterial({ color: 0x38bdf8 }), counterX, floorY + 1.31, kCZ - 3.7));

  // 8. MODERN SLATTED OAK TIMBER PERGOLA / CANOPY OVER COUNTER
  const pergolaH = 3.6;
  const pergolaW = 3.8; // Extends from counter to wall
  const pergolaCX = (counterX + wallX) / 2;
  const numSlats = 16;
  const slatSpacing = (counterL + 1.0) / numSlats;

  for (let s = 0; s < numSlats; s++) {
    const sz = kCZ - counterL / 2 - 0.2 + s * slatSpacing;
    const slat = box(pergolaW, 0.14, 0.06, flutedWoodMat, pergolaCX, floorY + pergolaH, sz);
    group.add(slat);
  }

  // Suspended industrial warm pendant lights over front counter
  for (let lz = kCZ - 4.5; lz <= kCZ + 4.5; lz += 2.2) {
    // Hanging cord
    group.add(box(0.03, 0.8, 0.03, metalMat, counterX - 0.2, floorY + pergolaH - 0.4, lz));
    // Cone shade
    const shade = new THREE.Mesh(
      new THREE.ConeGeometry(0.24, 0.22, 16, 1, true),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4 })
    );
    shade.position.set(counterX - 0.2, floorY + pergolaH - 0.85, lz);
    group.add(shade);
    // Warm bulb glow
    const pLight = new THREE.PointLight(0xffeaad, 1.4, 4.5);
    pLight.position.set(counterX - 0.2, floorY + pergolaH - 0.95, lz);
    group.add(pLight);
  }

  // 9. GRAND ILLUMINATED MARQUEE SIGN ACROSS TOP
  const signCanvas = document.createElement('canvas');
  signCanvas.width = 1024; signCanvas.height = 256;
  const sCtx = signCanvas.getContext('2d');
  sCtx.fillStyle = '#14532d'; sCtx.fillRect(0, 0, 1024, 256);
  sCtx.strokeStyle = '#facc15'; sCtx.lineWidth = 14; sCtx.strokeRect(10, 10, 1004, 236);
  sCtx.fillStyle = '#ffffff'; sCtx.font = 'bold 58px Arial'; sCtx.textAlign = 'center';
  sCtx.fillText('★ GRAN KIOSKO FERMÍN TANGÜIS ★', 512, 95);
  sCtx.fillStyle = '#fef08a'; sCtx.font = 'bold 34px Arial';
  sCtx.fillText('CAFETERÍA · SNACKS SALUDABLES · BEBIDAS NATURALES', 512, 168);
  const signTex = new THREE.CanvasTexture(signCanvas);

  const kioskSign = new THREE.Mesh(new THREE.PlaneGeometry(8.5, 1.8), new THREE.MeshBasicMaterial({ map: signTex, side: THREE.DoubleSide }));
  kioskSign.position.set(counterX - 0.1, floorY + pergolaH + 0.9, kCZ);
  kioskSign.rotation.y = -Math.PI / 2;
  group.add(kioskSign);

  // 10. HIGH BISTRO BARSTOOLS IN FRONT OF COUNTER (X = counterX - 1.4 = 24.4)
  const stoolMat = new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.6 });
  const stoolCount = 8;
  const stoolStep = (counterL - 2.0) / (stoolCount - 1);
  for (let st = 0; st < stoolCount; st++) {
    const sz = kCZ - counterL / 2 + 1.0 + st * stoolStep;
    const stoolSeat = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.08, 16), stoolMat);
    stoolSeat.position.set(counterX - 1.4, floorY + 0.8, sz);
    group.add(stoolSeat);
    group.add(box(0.06, 0.8, 0.06, metalMat, counterX - 1.4, floorY + 0.4, sz));
    const stoolBase = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.04, 16), metalMat);
    stoolBase.position.set(counterX - 1.4, floorY + 0.02, sz);
    group.add(stoolBase);
  }
}

/**
 * Main function to create the entire underground Basement facility
 */
export function createBasement(scene) {
  const basementGroup = new THREE.Group();
  scene.add(basementGroup);

  // Dimensions matching the campus footprint
  const bW = 62;    // X from -31 to +31
  const bD = 46;    // Z from -23 to +23
  const floorY = -7.5;
  const ceilingY = -0.6;
  const roomH = ceilingY - floorY; // 6.9m height

  // ----------------------------------------------------
  // MATERIALS
  // ----------------------------------------------------
  const concreteWallMat = new THREE.MeshStandardMaterial({
    color: 0x3a4247,
    roughness: 0.85,
    metalness: 0.15
  });

  const polishedFloorMat = new THREE.MeshStandardMaterial({
    color: 0x222a2e,
    roughness: 0.28,
    metalness: 0.22
  });

  const ceilingMat = new THREE.MeshStandardMaterial({
    color: 0x2a3136,
    roughness: 0.9
  });

  const woodDeckMat = new THREE.MeshStandardMaterial({
    color: 0x8a5a2f,
    roughness: 0.6,
    metalness: 0.1
  });

  const tilePoolMat = new THREE.MeshStandardMaterial({
    color: 0x7dd3fc,
    emissive: 0x0284c7,
    emissiveIntensity: 0.4,
    roughness: 0.2,
    metalness: 0.15
  });

  const metalTrimMat = new THREE.MeshStandardMaterial({
    color: 0xd8d8d8,
    metalness: 0.88,
    roughness: 0.2
  });

  const bioLedGreenMat = new THREE.MeshBasicMaterial({ color: 0x39e75f });
  const bioLedCyanMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
  const warmLedMat = new THREE.MeshBasicMaterial({ color: 0xffe6a8 });

  // ----------------------------------------------------
  // 1. ARCHITECTURAL SHELL (Floor, Ceiling, Walls)
  // ----------------------------------------------------
  // Main Floor Slabs (Built with 4 pieces to leave a hole for the pool)
  // Pool spans X: -24 to -10, Z: -13 to 13.

  // Part 1: North of pool
  const floorN = box(21, 0.4, 10, polishedFloorMat, -20.5, floorY - 0.2, -18);
  floorN.receiveShadow = true;
  basementGroup.add(floorN);

  // Part 2: South of pool
  const floorS = box(21, 0.4, 10, polishedFloorMat, -20.5, floorY - 0.2, 18);
  floorS.receiveShadow = true;
  basementGroup.add(floorS);

  // Part 3: West of pool
  const floorW = box(7, 0.4, 26, polishedFloorMat, -27.5, floorY - 0.2, 0);
  floorW.receiveShadow = true;
  basementGroup.add(floorW);

  // Part 4: East of pool (covers the rest of the basement)
  const floorE = box(41, 0.4, 46, polishedFloorMat, 10.5, floorY - 0.2, 0);
  floorE.receiveShadow = true;
  basementGroup.add(floorE);

  // Ceiling Slab
  const ceilingSlab = box(bW, 0.4, bD, ceilingMat, 0, ceilingY + 0.2, 0);
  ceilingSlab.receiveShadow = true;
  basementGroup.add(ceilingSlab);

  // Structural Ceiling Beams (Exposed architectural waffle grid)
  for (let bx = -bW / 2 + 6; bx < bW / 2; bx += 7.5) {
    const beamX = box(0.6, 0.75, bD, concreteWallMat, bx, ceilingY - 0.35, 0);
    basementGroup.add(beamX);
  }
  for (let bz = -bD / 2 + 6; bz < bD / 2; bz += 7.5) {
    const beamZ = box(bW, 0.75, 0.6, concreteWallMat, 0, ceilingY - 0.35, bz);
    basementGroup.add(beamZ);
  }

  // Industrial exposed ventilation ducts
  const ductMat = new THREE.MeshStandardMaterial({ color: 0x7c878e, metalness: 0.8, roughness: 0.3 });
  for (const dx of [-15, 15]) {
    const duct = box(1.1, 0.5, bD - 4, ductMat, dx, ceilingY - 0.9, 0);
    basementGroup.add(duct);
    for (let dz = -bD / 2 + 5; dz < bD / 2; dz += 8) {
      basementGroup.add(box(1.2, 0.55, 0.25, bioLedCyanMat, dx, ceilingY - 0.9, dz));
    }
  }

  // Perimeter Retaining Walls with recessed LED cove lighting
  basementGroup.add(box(bW, roomH, 0.6, concreteWallMat, 0, floorY + roomH / 2, -bD / 2));
  basementGroup.add(box(bW, 0.1, 0.1, bioLedGreenMat, 0, floorY + 1.2, -bD / 2 + 0.32));
  basementGroup.add(box(bW, 0.1, 0.1, bioLedCyanMat, 0, ceilingY - 0.8, -bD / 2 + 0.32));

  basementGroup.add(box(bW, roomH, 0.6, concreteWallMat, 0, floorY + roomH / 2, bD / 2));
  basementGroup.add(box(bW, 0.1, 0.1, bioLedGreenMat, 0, floorY + 1.2, bD / 2 - 0.32));
  basementGroup.add(box(bW, 0.1, 0.1, bioLedCyanMat, 0, ceilingY - 0.8, bD / 2 - 0.32));

  basementGroup.add(box(0.6, roomH, bD, concreteWallMat, -bW / 2, floorY + roomH / 2, 0));
  basementGroup.add(box(0.1, 0.1, bD, bioLedCyanMat, -bW / 2 + 0.32, floorY + 1.2, 0));

  basementGroup.add(box(0.6, roomH, bD, concreteWallMat, bW / 2, floorY + roomH / 2, 0));
  basementGroup.add(box(0.1, 0.1, bD, bioLedGreenMat, bW / 2 - 0.32, floorY + 1.2, 0));

  // ----------------------------------------------------
  // 2. CENTRAL PROMENADE & GLASS ACOUSTIC DIVIDER
  // ----------------------------------------------------
  const walkwayMat = new THREE.MeshStandardMaterial({ color: 0xecf0f1, roughness: 0.25, metalness: 0.15 });
  const walkway = box(6.0, 0.05, bD - 2, walkwayMat, 0, floorY + 0.03, 0);
  walkway.receiveShadow = true;
  basementGroup.add(walkway);

  basementGroup.add(box(0.1, 0.02, bD - 2, bioLedCyanMat, -2.8, floorY + 0.06, 0));
  basementGroup.add(box(0.1, 0.02, bD - 2, bioLedGreenMat, 2.8, floorY + 0.06, 0));

  const partGlassMat = new THREE.MeshStandardMaterial({
    color: 0x4dd0e1,
    transparent: true,
    opacity: 0.35,
    roughness: 0.1,
    metalness: 0.2
  });

  for (let z = -19; z <= 19; z += 4.5) {
    if (Math.abs(z) < 3) continue;
    const glassPanel = box(0.1, roomH - 1.2, 4.3, partGlassMat, -3.2, floorY + (roomH - 1.2) / 2, z);
    basementGroup.add(glassPanel);
    basementGroup.add(box(0.18, roomH - 1.2, 0.15, metalTrimMat, -3.2, floorY + (roomH - 1.2) / 2, z + 2.15));
    basementGroup.add(box(0.12, 0.45, 4.25, new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5, transparent: true, opacity: 0.6 }), -3.2, floorY + 1.8, z));
  }

  // Structural Support Columns with living moss
  const colMat = new THREE.MeshStandardMaterial({ color: 0x4e585f, roughness: 0.7 });
  const mossMat = new THREE.MeshStandardMaterial({ color: 0x247a3e, roughness: 0.95 });
  const columnPositions = [
    [-16, -12], [-16, 0], [-16, 12],
    [16, -12], [16, 0], [16, 12]
  ];

  columnPositions.forEach(([cx, cz]) => {
    const col = box(1.1, roomH, 1.1, colMat, cx, floorY + roomH / 2, cz);
    col.castShadow = true;
    basementGroup.add(col);

    const moss = box(1.14, 2.8, 0.3, mossMat, cx, floorY + 2.2, cz);
    basementGroup.add(moss);

    const colNeon = box(0.1, roomH - 0.5, 0.1, cx < 0 ? bioLedCyanMat : bioLedGreenMat, cx + 0.56, floorY + roomH / 2, cz);
    basementGroup.add(colNeon);

    const ringPot = new THREE.Mesh(
      new THREE.CylinderGeometry(1.4, 1.2, 0.7, 16),
      new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.3 })
    );
    ringPot.position.set(cx, floorY + 0.35, cz);
    basementGroup.add(ringPot);

    for (let a = 0; a < 6; a++) {
      const rad = (a / 6) * Math.PI * 2;
      const bsh = createBush(cx + Math.cos(rad) * 1.05, floorY + 0.7, cz + Math.sin(rad) * 1.05, 0.7);
      basementGroup.add(bsh);
    }
  });

  // ----------------------------------------------------
  // 3. SEMI-OLYMPIC POOL & SWIMMING ACADEMY WORKSHOP
  // ----------------------------------------------------
  const poolW = 14;     // X dimension (width)
  const poolL = 26;     // Z dimension (length)
  const poolCX = -17;
  const poolCZ = 0;
  const poolDepth = 2.4;
  const waterLevelY = floorY - 0.25;

  // Pool Basin Floor & Walls
  const basinFloor = box(poolW, 0.3, poolL, tilePoolMat, poolCX, floorY - poolDepth, poolCZ);
  basinFloor.receiveShadow = true;
  basementGroup.add(basinFloor);

  basementGroup.add(box(poolW, poolDepth, 0.3, tilePoolMat, poolCX, floorY - poolDepth / 2, poolCZ - poolL / 2));
  basementGroup.add(box(poolW, poolDepth, 0.3, tilePoolMat, poolCX, floorY - poolDepth / 2, poolCZ + poolL / 2));
  basementGroup.add(box(0.3, poolDepth, poolL, tilePoolMat, poolCX - poolW / 2, floorY - poolDepth / 2, poolCZ));
  basementGroup.add(box(0.3, poolDepth, poolL, tilePoolMat, poolCX + poolW / 2, floorY - poolDepth / 2, poolCZ));

  // Pool Coping / Rim (White non-slip stone border)
  const rimMat = new THREE.MeshStandardMaterial({ color: 0xe6e9eb, roughness: 0.35 });
  basementGroup.add(box(poolW + 1.6, 0.1, 0.8, rimMat, poolCX, floorY + 0.05, poolCZ - poolL / 2 - 0.4));
  basementGroup.add(box(poolW + 1.6, 0.1, 0.8, rimMat, poolCX, floorY + 0.05, poolCZ + poolL / 2 + 0.4));
  basementGroup.add(box(0.8, 0.1, poolL + 1.6, rimMat, poolCX - poolW / 2 - 0.4, floorY + 0.05, poolCZ));
  basementGroup.add(box(0.8, 0.1, poolL + 1.6, rimMat, poolCX + poolW / 2 + 0.4, floorY + 0.05, poolCZ));

  // Wooden Pool Deck (Teak wood slats) - 4 Perimeter walkways leaving the pool basin interior completely open
  const deckThick = 0.08;
  const deckY = floorY + 0.02;
  const deckBorder = 3.0; // 3m deck border on all sides

  // North Deck Border
  const deckN = box(poolW + deckBorder * 2, deckThick, deckBorder, woodDeckMat, poolCX, deckY, poolCZ - poolL / 2 - deckBorder / 2);
  deckN.receiveShadow = true;
  basementGroup.add(deckN);

  // South Deck Border
  const deckS = box(poolW + deckBorder * 2, deckThick, deckBorder, woodDeckMat, poolCX, deckY, poolCZ + poolL / 2 + deckBorder / 2);
  deckS.receiveShadow = true;
  basementGroup.add(deckS);

  // West Deck Border
  const deckW = box(deckBorder, deckThick, poolL, woodDeckMat, poolCX - poolW / 2 - deckBorder / 2, deckY, poolCZ);
  deckW.receiveShadow = true;
  basementGroup.add(deckW);

  // East Deck Border
  const deckE = box(deckBorder, deckThick, poolL, woodDeckMat, poolCX + poolW / 2 + deckBorder / 2, deckY, poolCZ);
  deckE.receiveShadow = true;
  basementGroup.add(deckE);

  // Swimming Lane markings on basin floor (4 lanes)
  const laneMat = new THREE.MeshStandardMaterial({ color: 0x054f77, roughness: 0.4 });
  for (let l = 1; l <= 3; l++) {
    const lx = poolCX - poolW / 2 + (l * poolW) / 4;
    basementGroup.add(box(0.3, 0.02, poolL - 2, laneMat, lx, floorY - poolDepth + 0.16, poolCZ));
  }

  // Floating Lane Dividers (Carrileras con boyas esféricas bicolores)
  const buoyRed = new THREE.MeshStandardMaterial({ color: 0xde3636, roughness: 0.3 });
  const buoyWhite = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
  for (let l = 1; l <= 3; l++) {
    const lx = poolCX - poolW / 2 + (l * poolW) / 4;
    for (let bz = poolCZ - poolL / 2 + 1; bz <= poolCZ + poolL / 2 - 1; bz += 0.8) {
      const isRed = Math.sin(bz * 2) > 0;
      const buoy = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), isRed ? buoyRed : buoyWhite);
      buoy.position.set(lx, waterLevelY, bz);
      basementGroup.add(buoy);
    }
  }

  // Subsurface Caustic Grid Plane on bottom
  const causticGridMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.25, wireframe: true });
  const causticPlane = new THREE.Mesh(new THREE.PlaneGeometry(poolW - 0.2, poolL - 0.2, 24, 48), causticGridMat);
  causticPlane.rotation.x = -Math.PI / 2;
  causticPlane.position.set(poolCX, floorY - poolDepth + 0.05, poolCZ);
  basementGroup.add(causticPlane);

  // Animated Water Plane with bright vibrant CELESTE (sky-blue) crystal appearance
  const waterGeo = new THREE.PlaneGeometry(poolW - 0.1, poolL - 0.1, 48, 48);
  const waterMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,       // Brilliant sky-blue / celeste
    transparent: true,
    opacity: 0.85,
    side: THREE.DoubleSide
  });
  const waterMesh = new THREE.Mesh(waterGeo, waterMat);
  waterMesh.rotation.x = -Math.PI / 2; // Rotate mesh so local Z is vertical normal
  waterMesh.position.set(poolCX, waterLevelY, poolCZ);
  basementGroup.add(waterMesh);

  // Submerged Aqua Underwater Spotlights
  for (let pz = -8; pz <= 8; pz += 8) {
    const uLightL = new THREE.PointLight(0x00f0ff, 2.8, 12);
    uLightL.position.set(poolCX - 4, waterLevelY - 1.2, poolCZ + pz);
    basementGroup.add(uLightL);

    const uLightR = new THREE.PointLight(0x00f0ff, 2.8, 12);
    uLightR.position.set(poolCX + 4, waterLevelY - 1.2, poolCZ + pz);
    basementGroup.add(uLightR);
  }

  // High-Tech Starting Podiums / Blocks (North end of pool)
  const podiumMat = new THREE.MeshStandardMaterial({ color: 0x009bb4, metalness: 0.5, roughness: 0.3 });
  for (let l = 0; l < 4; l++) {
    const px = poolCX - poolW / 2 + 1.75 + l * 3.5;
    const pz = poolCZ - poolL / 2 - 0.4;

    const blockBase = box(0.7, 0.4, 0.7, podiumMat, px, floorY + 0.3, pz);
    blockBase.castShadow = true;
    basementGroup.add(blockBase);

    // Number plaque
    const numCanvas = document.createElement('canvas');
    numCanvas.width = 128; numCanvas.height = 128;
    const nCtx = numCanvas.getContext('2d');
    nCtx.fillStyle = '#005b6e'; nCtx.fillRect(0, 0, 128, 128);
    nCtx.fillStyle = '#ffffff'; nCtx.font = 'bold 88px Arial'; nCtx.textAlign = 'center';
    nCtx.fillText(String(l + 1), 64, 96);
    const numTex = new THREE.CanvasTexture(numCanvas);
    const numPlaque = new THREE.Mesh(new THREE.PlaneGeometry(0.35, 0.35), new THREE.MeshBasicMaterial({ map: numTex }));
    numPlaque.position.set(px, floorY + 0.32, pz + 0.36);
    basementGroup.add(numPlaque);

    // Grab bar
    basementGroup.add(box(0.5, 0.04, 0.04, metalTrimMat, px, floorY + 0.54, pz + 0.2));
  }

  // Pool Ladders
  const ladderZ = [poolCZ - 8, poolCZ + 8];
  ladderZ.forEach((lz) => {
    const lx = poolCX - poolW / 2 + 0.15;
    basementGroup.add(box(0.04, 2.2, 0.04, metalTrimMat, lx, floorY - 0.8, lz - 0.25));
    basementGroup.add(box(0.04, 2.2, 0.04, metalTrimMat, lx, floorY - 0.8, lz + 0.25));
    for (let r = 0; r < 4; r++) {
      basementGroup.add(box(0.03, 0.03, 0.5, metalTrimMat, lx, floorY - 0.4 - r * 0.45, lz));
    }
  });

  // Modern Poolside Loungers (Tumbonas)
  const loungerMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
  const cushionMat = new THREE.MeshStandardMaterial({ color: 0x3cd0b2, roughness: 0.7 });
  for (let lz = -4; lz <= 4; lz += 4.0) {
    const lx = poolCX + poolW / 2 + 1.8;
    const base = box(1.8, 0.25, 0.7, loungerMat, lx, floorY + 0.2, lz);
    base.castShadow = true;
    basementGroup.add(base);

    basementGroup.add(box(1.7, 0.08, 0.65, cushionMat, lx, floorY + 0.36, lz));
    const back = box(0.65, 0.08, 0.65, cushionMat, lx + 0.55, floorY + 0.55, lz);
    back.rotation.z = Math.PI / 6;
    basementGroup.add(back);
  }

  // Giant LED Telemetry & Race Scoreboard Screen
  const poolScreenTex = createScreenTexture(
    '🏊 TALLER DE NATACIÓN · FERMÍN TANGÜIS',
    'Complejo Acuático Climatizado · Nivel Subterráneo -1',
    [
      { label: 'Temperatura del agua', val: '27.4 °C (Geotermia)' },
      { label: 'pH del agua / Salinidad', val: '7.28 · Óptimo' },
      { label: 'Purificación UV-C & Ozono', val: '100% Sin Químicos nocivos' },
      { label: 'Entrenamiento activo', val: 'Taller Escolar: 24 Alumnos' },
      { label: 'Mejor tiempo 50m Crol', val: '00:27.42 (Récord Colegio)' }
    ],
    'cyan'
  );
  const poolScreen = new THREE.Mesh(
    new THREE.PlaneGeometry(8.5, 4.4),
    new THREE.MeshBasicMaterial({ map: poolScreenTex })
  );
  poolScreen.position.set(poolCX, floorY + 4.2, -bD / 2 + 0.35);
  basementGroup.add(poolScreen);
  basementGroup.add(box(8.8, 4.7, 0.15, metalTrimMat, poolCX, floorY + 4.2, -bD / 2 + 0.26));

  // Add the detailed props for the Swimming Workshop (coach board, pace clock, gear racks, kickboards, flags)
  createSwimmingWorkshopProps(basementGroup, floorY, poolCX, poolCZ, poolW, poolL);

  // ----------------------------------------------------
  // 4. DETAILED SCHOOL KIOSK & DINING AREA
  // ----------------------------------------------------
  const cafeFloorMat = new THREE.MeshStandardMaterial({ color: 0x342921, roughness: 0.65 });
  const cafeFloor = box(25, 0.06, bD - 4, cafeFloorMat, 17, floorY + 0.03, 0);
  cafeFloor.receiveShadow = true;
  basementGroup.add(cafeFloor);

  // Build the detailed School Kiosk
  createSchoolKiosk(basementGroup, floorY, ceilingY);

  // Dining Tables & Chairs
  const tableMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.3 });
  const chairMat = new THREE.MeshStandardMaterial({ color: 0x228340, roughness: 0.7 });
  const chairLegMat = new THREE.MeshStandardMaterial({ color: 0x2c3437, metalness: 0.8, roughness: 0.3 });

  const createTableCluster = (tx, tz) => {
    const tableTop = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.05, 0.07, 24), tableMat);
    tableTop.position.set(tx, floorY + 0.85, tz);
    tableTop.castShadow = true;
    basementGroup.add(tableTop);

    basementGroup.add(box(0.12, 0.8, 0.12, metalTrimMat, tx, floorY + 0.42, tz));
    const tableBase = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.04, 16), metalTrimMat);
    tableBase.position.set(tx, floorY + 0.03, tz);
    basementGroup.add(tableBase);

    basementGroup.add(createBush(tx, floorY + 0.9, tz, 0.28, true));

    for (let c = 0; c < 4; c++) {
      const angle = (c / 4) * Math.PI * 2;
      const chX = tx + Math.cos(angle) * 1.35;
      const chZ = tz + Math.sin(angle) * 1.35;

      const chairSeat = box(0.5, 0.06, 0.5, chairMat, chX, floorY + 0.5, chZ);
      chairSeat.lookAt(tx, floorY + 0.5, tz);
      basementGroup.add(chairSeat);

      const back = box(0.48, 0.42, 0.05, chairMat, chX, floorY + 0.75, chZ);
      back.lookAt(tx, floorY + 0.75, tz);
      basementGroup.add(back);

      basementGroup.add(box(0.05, 0.48, 0.05, chairLegMat, chX, floorY + 0.25, chZ));
    }

    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(0.9, 0.04, 8, 24),
      new THREE.MeshBasicMaterial({ color: 0xfff0c2 })
    );
    halo.rotation.x = Math.PI / 2;
    halo.position.set(tx, ceilingY - 1.2, tz);
    basementGroup.add(halo);

    const tLight = new THREE.PointLight(0xffeaad, 1.2, 5.5);
    tLight.position.set(tx, ceilingY - 1.3, tz);
    basementGroup.add(tLight);
  };

  const tableCoords = [
    // Seating placed directly in front of the Grand Kiosk
    [13, -12], [19, -12],
    [13, -7], [19, -7],
    [13, -2], [19, -2],
    // South dining zone
    [13, 6], [21, 6],
    [13, 13], [21, 13]
  ];
  tableCoords.forEach(([tx, tz]) => createTableCluster(tx, tz));

  // Planter divider troughs between table rows (lush biophilic green separation)
  for (const pz of [-9.5, -4.5, 9.5]) {
    const pCurb = box(7.5, 0.45, 0.6, new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 }), 16, floorY + 0.22, pz);
    basementGroup.add(pCurb);
    const pSoil = box(7.1, 0.08, 0.45, new THREE.MeshStandardMaterial({ color: 0x1c1917, roughness: 0.9 }), 16, floorY + 0.42, pz);
    basementGroup.add(pSoil);
    for (let px = 13.0; px <= 19.0; px += 1.4) {
      basementGroup.add(createBush(px, floorY + 0.5, pz, 0.55, px % 2 === 0));
    }
  }

  // Large Communal Harvest Table (Z = 19)
  const htx = 17;
  const htz = 19;
  const hTable = box(9.0, 0.1, 1.8, woodDeckMat, htx, floorY + 0.85, htz);
  hTable.castShadow = true;
  basementGroup.add(hTable);

  const bench1 = box(8.6, 0.08, 0.5, woodDeckMat, htx, floorY + 0.48, htz - 1.3);
  const bench2 = box(8.6, 0.08, 0.5, woodDeckMat, htx, floorY + 0.48, htz + 1.3);
  basementGroup.add(bench1);
  basementGroup.add(bench2);

  for (const lx of [-3.5, 0, 3.5]) {
    basementGroup.add(box(0.12, 0.8, 1.4, metalTrimMat, htx + lx, floorY + 0.4, htz));
    basementGroup.add(box(0.08, 0.45, 0.4, metalTrimMat, htx + lx, floorY + 0.23, htz - 1.3));
    basementGroup.add(box(0.08, 0.45, 0.4, metalTrimMat, htx + lx, floorY + 0.23, htz + 1.3));
  }

  basementGroup.add(box(7.5, 0.08, 0.35, new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.8 }), htx, floorY + 0.92, htz));
  for (let hx = -3.2; hx <= 3.2; hx += 1.2) {
    basementGroup.add(createBush(htx + hx, floorY + 1.0, htz, 0.35, true));
  }

  // Smart Recycling & Composting Hub (Placed neatly at the rear corner, Z = 20)
  const hubX = 27;
  const hubZ = 20;
  const binColors = [0x228340, 0x1f72b5, 0xe0a012, 0x9e3328];
  basementGroup.add(box(0.3, 2.2, 5.2, concreteWallMat, hubX + 1.2, floorY + 1.1, hubZ));

  binColors.forEach((col, idx) => {
    const bz = hubZ - 1.8 + idx * 1.2;
    const bin = box(0.8, 1.1, 0.7, new THREE.MeshStandardMaterial({ color: col, roughness: 0.4 }), hubX + 0.7, floorY + 0.55, bz);
    bin.castShadow = true;
    basementGroup.add(bin);
    basementGroup.add(box(0.05, 0.12, 0.45, new THREE.MeshBasicMaterial({ color: 0x111111 }), hubX + 0.28, floorY + 0.85, bz));
  });

  // ----------------------------------------------------
  // 5. LUSH HYDROPONIC VERTICAL WALLS & INDOOR BIOPHILIA
  // ----------------------------------------------------
  const wallGW_Z = 0;
  const wallGW_H = 5.2;
  const wallGW_L = 24;

  const greenWallBack = box(0.2, wallGW_H, wallGW_L, new THREE.MeshStandardMaterial({ color: 0x1a4527, roughness: 0.9 }), bW / 2 - 0.4, floorY + wallGW_H / 2 + 0.3, wallGW_Z);
  basementGroup.add(greenWallBack);

  for (let vz = wallGW_Z - wallGW_L / 2 + 1.2; vz <= wallGW_Z + wallGW_L / 2 - 1.2; vz += 1.6) {
    for (let vy = floorY + 1.0; vy <= floorY + wallGW_H; vy += 1.3) {
      const pScale = 0.55 + Math.sin(vz * 3 + vy * 5) * 0.15;
      const wallPlant = createBush(bW / 2 - 0.65, vy, vz, pScale, (vz + vy) % 2 === 0);
      basementGroup.add(wallPlant);
    }
  }

  for (let vz = wallGW_Z - wallGW_L / 2 + 2; vz <= wallGW_Z + wallGW_L / 2 - 2; vz += 5) {
    const growLight = new THREE.SpotLight(0xff55bb, 3.5, 9, Math.PI / 4, 0.4);
    growLight.position.set(bW / 2 - 2.8, ceilingY - 0.8, vz);
    growLight.target.position.set(bW / 2 - 0.5, floorY + 2.5, vz);
    basementGroup.add(growLight);
    basementGroup.add(growLight.target);
  }

  // Central Landscaped Garden Bed separating Walkway from Kiosk/Cafeteria
  const gardenCX = 3.8;
  const gardenL = 28;
  const curbMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.3 });
  const soilMat = new THREE.MeshStandardMaterial({ color: 0x24180d, roughness: 1.0 });

  basementGroup.add(box(1.5, 0.45, gardenL, curbMat, gardenCX, floorY + 0.22, 0));
  basementGroup.add(box(1.3, 0.1, gardenL - 0.2, soilMat, gardenCX, floorY + 0.4, 0));

  for (let gz = -gardenL / 2 + 1.5; gz <= gardenL / 2 - 1.5; gz += 2.2) {
    if (Math.abs(gz) < 2.5) continue;
    const bsh = createBush(gardenCX, floorY + 0.5, gz, 0.85, gz % 4 === 0);
    basementGroup.add(bsh);
  }

  // Potted indoor palms & lush trees (Biophilic Greenery)
  createIndoorPalm(basementGroup, poolCX - poolW / 2 - 2.0, floorY, poolCZ - poolL / 2);
  createIndoorPalm(basementGroup, poolCX - poolW / 2 - 2.0, floorY, poolCZ + poolL / 2);
  createIndoorPalm(basementGroup, gardenCX, floorY, -13);
  createIndoorPalm(basementGroup, gardenCX, floorY, 13);
  createIndoorPalm(basementGroup, 26, floorY, 19);

  // Additional lush palms around the Grand Kiosk & Dining Zone
  createIndoorPalm(basementGroup, 9.5, floorY, -14);
  createIndoorPalm(basementGroup, 22.5, floorY, -14);
  createIndoorPalm(basementGroup, 9.5, floorY, -0.5);
  createIndoorPalm(basementGroup, 22.5, floorY, -0.5);
  createIndoorPalm(basementGroup, 29.5, floorY, 1.5);
  createIndoorPalm(basementGroup, 29.5, floorY, -16);

  // Suspended ceiling planter boxes
  for (let pz = -14; pz <= 14; pz += 7) {
    const boxPlanter = box(2.4, 0.3, 0.6, woodDeckMat, 0, ceilingY - 1.2, pz);
    basementGroup.add(boxPlanter);
    basementGroup.add(box(0.03, 1.2, 0.03, metalTrimMat, -1.0, ceilingY - 0.6, pz));
    basementGroup.add(box(0.03, 1.2, 0.03, metalTrimMat, 1.0, ceilingY - 0.6, pz));
    for (let px = -0.9; px <= 0.9; px += 0.45) {
      const ivy = createBush(px, ceilingY - 1.25, pz, 0.42, true);
      basementGroup.add(ivy);
    }
  }

  // ----------------------------------------------------
  // 6. MONUMENTAL ACCESS STAIRCASE & PANORAMIC ELEVATOR
  // ----------------------------------------------------
  const stairZ = 19;
  const stairSteps = 14;
  const stepH = (Math.abs(floorY) - 0.2) / stairSteps;
  const stepD = 0.55;
  const stairW = 4.2;

  const treadMat = new THREE.MeshStandardMaterial({ color: 0xcc9966, roughness: 0.4 });
  for (let s = 0; s < stairSteps; s++) {
    const sy = floorY + (s + 1) * stepH - stepH / 2;
    const sz = stairZ - s * stepD;
    const step = box(stairW, stepH, stepD, treadMat, 0, sy, sz);
    step.receiveShadow = true;
    basementGroup.add(step);
    basementGroup.add(box(stairW - 0.2, 0.03, 0.04, warmLedMat, 0, sy + stepH / 2, sz - stepD / 2));
  }

  const railGlassMat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.45, roughness: 0.1 });
  for (const rx of [-stairW / 2, stairW / 2]) {
    basementGroup.add(box(0.08, stairSteps * stepH, stairSteps * stepD, railGlassMat, rx, floorY + (stairSteps * stepH) / 2 + 0.4, stairZ - (stairSteps * stepD) / 2));
    basementGroup.add(box(0.12, 0.08, stairSteps * stepD + 0.4, metalTrimMat, rx, floorY + stairSteps * stepH + 0.9, stairZ - (stairSteps * stepD) / 2));
  }

  // Panoramic Glass Elevator Shaft
  const elX = -3.2;
  const elZ = 19;
  const shaftMat = new THREE.MeshStandardMaterial({ color: 0x333b40, metalness: 0.9, roughness: 0.2 });

  for (const ox of [-1.1, 1.1]) {
    for (const oz of [-1.1, 1.1]) {
      basementGroup.add(box(0.15, roomH, 0.15, shaftMat, elX + ox, floorY + roomH / 2, elZ + oz));
    }
  }

  const elGlass = box(2.1, roomH - 0.2, 2.1, railGlassMat, elX, floorY + roomH / 2, elZ);
  basementGroup.add(elGlass);

  const cabin = box(1.9, 2.4, 1.9, new THREE.MeshStandardMaterial({ color: 0xe0e6ed, metalness: 0.6, roughness: 0.2, transparent: true, opacity: 0.8 }), elX, floorY + 1.25, elZ);
  basementGroup.add(cabin);
  basementGroup.add(box(1.7, 0.05, 1.7, bioLedCyanMat, elX, floorY + 2.4, elZ));

  // Portal sign over stairs
  const signCanvas = document.createElement('canvas');
  signCanvas.width = 1024; signCanvas.height = 256;
  const sCtx = signCanvas.getContext('2d');
  sCtx.fillStyle = '#06201a'; sCtx.fillRect(0, 0, 1024, 256);
  sCtx.strokeStyle = '#39e75f'; sCtx.lineWidth = 8; sCtx.strokeRect(8, 8, 1008, 240);
  sCtx.fillStyle = '#ffffff'; sCtx.font = 'bold 58px Arial'; sCtx.textAlign = 'center';
  sCtx.fillText('NIVEL -1 · SÓTANO ECOLÓGICO', 512, 100);
  sCtx.fillStyle = '#49f274'; sCtx.font = '36px Arial';
  sCtx.fillText('◀ TALLER DE NATACIÓN   |   KIOSKO ESCOLAR ▶', 512, 175);
  const portalSignTex = new THREE.CanvasTexture(signCanvas);

  const portalSign = new THREE.Mesh(new THREE.PlaneGeometry(6.0, 1.5), new THREE.MeshBasicMaterial({ map: portalSignTex }));
  portalSign.position.set(0, floorY + 3.8, stairZ - stairSteps * stepD - 0.8);
  basementGroup.add(portalSign);

  // ----------------------------------------------------
  // 7. AMBIENT & ARCHITECTURAL LIGHTING
  // ----------------------------------------------------
  const basementHemi = new THREE.HemisphereLight(0xbbf0ff, 0x1a2e22, 1.8);
  basementHemi.position.set(0, ceilingY, 0);
  basementGroup.add(basementHemi);

  const ceilingLightPositions = [
    [-18, -12], [-18, 0], [-18, 12],
    [0, -14], [0, 0], [0, 14],
    [18, -12], [18, 0], [18, 12]
  ];

  // High-performance focused ambient illumination (Pool, Corridor, Cafe)
  const poolLight = new THREE.PointLight(0x99f3ff, 2.2, 28);
  poolLight.position.set(-18, ceilingY - 1.2, 0);
  basementGroup.add(poolLight);

  const corridorLight = new THREE.PointLight(0xecfffa, 1.8, 24);
  corridorLight.position.set(0, ceilingY - 1.2, 0);
  basementGroup.add(corridorLight);

  const cafeLight = new THREE.PointLight(0xfff2d4, 2.2, 28);
  cafeLight.position.set(18, ceilingY - 1.2, 0);
  basementGroup.add(cafeLight);

  ceilingLightPositions.forEach(([lx, lz]) => {
    const isPool = lx < -5;
    const isCafe = lx > 5;
    const lColor = isPool ? 0x99f3ff : isCafe ? 0xfff2d4 : 0xecfffa;
    basementGroup.add(box(2.2, 0.08, 2.2, new THREE.MeshBasicMaterial({ color: lColor }), lx, ceilingY - 0.05, lz));
  });

  return {
    group: basementGroup,
    waterMesh
  };
}

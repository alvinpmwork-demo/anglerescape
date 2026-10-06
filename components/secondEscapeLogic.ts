// Pure game logic for the Second Escape mini-game (no React / DOM).
// Shared by the site component and the standalone itch.io build, and unit-tested there.

export const W = 640;
export const H = 400;
export const PLAYER_R = 20;
export const INSPECTOR_R = 22;
export const EXIT_R = 28;
export const SPOT_RANGE = 130;
export const SPOT_HALF_ANGLE = 0.42; // radians ~24deg
export const SPOT_DETECT_MS = 800;
export const PLAYER_SPEED = 145;
export const INSPECTOR_SPEED = 55;

export type Keys = { up: boolean; down: boolean; left: boolean; right: boolean };
export type Cover = { x: number; y: number; w: number; h: number };

export type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
};

export type Sim = {
  player: { x: number; y: number };
  inspector: { x: number; y: number; facing: number; patrolDir: 1 | -1 };
  exit: { x: number; y: number };
  covers: Cover[];
  spotTimer: number;
  /** player is inside the cone's range/angle but a rock blocks the beam */
  hidden: boolean;
  loseReason: "spot" | "hit" | null;
  particles: Particle[];
  shake: number;
  endFlash: number;
  juiceSpawned: boolean;
};

export type StepResult = "win" | "lose" | null;

export function initialSim(): Sim {
  return {
    player: { x: 70, y: H - 55 },
    inspector: { x: W * 0.5, y: H * 0.48, facing: 0, patrolDir: 1 },
    exit: { x: W - 70, y: 55 },
    covers: [
      { x: 160, y: 250, w: 70, h: 28 },
      { x: 320, y: 160, w: 80, h: 28 },
      { x: 460, y: 280, w: 60, h: 28 },
    ],
    spotTimer: 0,
    hidden: false,
    loseReason: null,
    particles: [],
    shake: 0,
    endFlash: 0,
    juiceSpawned: false,
  };
}

export function spawnWinBurst(sim: Sim) {
  const colors = ["#f9e79f", "#82e0aa", "#85c1e9", "#f5b041", "#ffffff"];
  for (let i = 0; i < 48; i++) {
    const a = Math.random() * Math.PI * 2;
    const sp = 60 + Math.random() * 180;
    sim.particles.push({
      x: sim.player.x,
      y: sim.player.y,
      vx: Math.cos(a) * sp,
      vy: Math.sin(a) * sp - 40,
      life: 0.7 + Math.random() * 0.6,
      color: colors[i % colors.length],
      size: 3 + Math.random() * 4,
    });
  }
  sim.endFlash = 0.45;
}

export function spawnLoseFlash(sim: Sim) {
  sim.shake = 10;
  sim.endFlash = 0.35;
  for (let i = 0; i < 18; i++) {
    const a = Math.random() * Math.PI * 2;
    const sp = 40 + Math.random() * 90;
    sim.particles.push({
      x: sim.player.x,
      y: sim.player.y,
      vx: Math.cos(a) * sp,
      vy: Math.sin(a) * sp,
      life: 0.35 + Math.random() * 0.35,
      color: i % 2 ? "#f5b7b1" : "#922b21",
      size: 2 + Math.random() * 3,
    });
  }
}

/**
 * Distance along a ray (unit direction dx,dy) from (ox,oy) to the first hit on rect c,
 * or null when the ray misses. Slab method; origin inside the rect returns 0.
 */
export function rayRectHit(
  ox: number,
  oy: number,
  dx: number,
  dy: number,
  c: Cover,
): number | null {
  let tmin = -Infinity;
  let tmax = Infinity;
  const axes: [number, number, number, number][] = [
    [ox, dx, c.x, c.x + c.w],
    [oy, dy, c.y, c.y + c.h],
  ];
  for (const [o, d, lo, hi] of axes) {
    if (Math.abs(d) < 1e-9) {
      if (o < lo || o > hi) return null;
    } else {
      let t1 = (lo - o) / d;
      let t2 = (hi - o) / d;
      if (t1 > t2) [t1, t2] = [t2, t1];
      tmin = Math.max(tmin, t1);
      tmax = Math.min(tmax, t2);
      if (tmin > tmax) return null;
    }
  }
  if (tmax < 0) return null;
  return Math.max(0, tmin);
}

/** How far the flashlight reaches along `angle` before a rock stops it. */
export function castRay(
  ox: number,
  oy: number,
  angle: number,
  maxDist: number,
  covers: Cover[],
): number {
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);
  let t = maxDist;
  for (const c of covers) {
    const hit = rayRectHit(ox, oy, dx, dy, c);
    if (hit !== null && hit < t) t = hit;
  }
  return t;
}

/** True when a rock sits between the inspector's light and the point (line-of-sight blocked). */
export function isOccluded(
  ix: number,
  iy: number,
  px: number,
  py: number,
  covers: Cover[],
): boolean {
  const dist = Math.hypot(px - ix, py - iy);
  if (dist < 1) return false;
  return castRay(ix, iy, Math.atan2(py - iy, px - ix), dist, covers) < dist;
}

/** Inside the flashlight cone's range and angle (ignoring rocks). */
export function inCone(
  px: number,
  py: number,
  ix: number,
  iy: number,
  facing: number,
): boolean {
  const dx = px - ix;
  const dy = py - iy;
  const dist = Math.hypot(dx, dy);
  if (dist > SPOT_RANGE || dist < 1) return false;
  const diff = angleDiff(Math.atan2(dy, dx), facing);
  return Math.abs(diff) <= SPOT_HALF_ANGLE;
}

/** Lit by the flashlight: in the cone and not shadowed by a rock. */
export function inSpotlight(
  px: number,
  py: number,
  ix: number,
  iy: number,
  facing: number,
  covers: Cover[],
): boolean {
  return inCone(px, py, ix, iy, facing) && !isOccluded(ix, iy, px, py, covers);
}

/** Polygon (inspector first) of the lit area, clipped by rocks, for drawing. */
export function coneOutline(
  ix: number,
  iy: number,
  facing: number,
  covers: Cover[],
  rays = 48,
): { x: number; y: number }[] {
  const pts = [{ x: ix, y: iy }];
  for (let i = 0; i <= rays; i++) {
    const a = facing - SPOT_HALF_ANGLE + (2 * SPOT_HALF_ANGLE * i) / rays;
    const d = castRay(ix, iy, a, SPOT_RANGE, covers);
    pts.push({ x: ix + Math.cos(a) * d, y: iy + Math.sin(a) * d });
  }
  return pts;
}

export function circlesOverlap(
  ax: number,
  ay: number,
  ar: number,
  bx: number,
  by: number,
  br: number,
): boolean {
  return Math.hypot(ax - bx, ay - by) < ar + br;
}

export function clampPlayer(x: number, y: number, covers: Cover[]) {
  let nx = Math.max(PLAYER_R, Math.min(W - PLAYER_R, x));
  let ny = Math.max(PLAYER_R, Math.min(H - PLAYER_R, y));
  for (const c of covers) {
    const nearestX = Math.max(c.x, Math.min(nx, c.x + c.w));
    const nearestY = Math.max(c.y, Math.min(ny, c.y + c.h));
    const dx = nx - nearestX;
    const dy = ny - nearestY;
    const d = Math.hypot(dx, dy);
    if (d < PLAYER_R && d > 0) {
      const push = (PLAYER_R - d) / d;
      nx += dx * push;
      ny += dy * push;
    } else if (d === 0) {
      ny = c.y - PLAYER_R;
    }
  }
  nx = Math.max(PLAYER_R, Math.min(W - PLAYER_R, nx));
  ny = Math.max(PLAYER_R, Math.min(H - PLAYER_R, ny));
  return { x: nx, y: ny };
}

export function angleDiff(a: number, b: number) {
  let diff = a - b;
  while (diff > Math.PI) diff -= Math.PI * 2;
  while (diff < -Math.PI) diff += Math.PI * 2;
  return diff;
}

export function lerpAngle(a: number, b: number, t: number) {
  return a - angleDiff(a, b) * t;
}

/** Advance one "playing" frame. Returns the outcome when the round ends. */
export function stepSim(sim: Sim, keys: Keys, dt: number, ts: number): StepResult {
  let mx = 0;
  let my = 0;
  if (keys.left) mx -= 1;
  if (keys.right) mx += 1;
  if (keys.up) my -= 1;
  if (keys.down) my += 1;
  if (mx !== 0 || my !== 0) {
    const len = Math.hypot(mx, my);
    const next = clampPlayer(
      sim.player.x + (mx / len) * PLAYER_SPEED * dt,
      sim.player.y + (my / len) * PLAYER_SPEED * dt,
      sim.covers,
    );
    sim.player.x = next.x;
    sim.player.y = next.y;
  }

  // inspector patrols left-right, mostly looking along the patrol, peeking toward the player
  const ins = sim.inspector;
  ins.x += ins.patrolDir * INSPECTOR_SPEED * dt;
  if (ins.x > W - 80) {
    ins.x = W - 80;
    ins.patrolDir = -1;
  } else if (ins.x < 80) {
    ins.x = 80;
    ins.patrolDir = 1;
  }
  const toPlayer = Math.atan2(sim.player.y - ins.y, sim.player.x - ins.x);
  const patrolFace = ins.patrolDir === 1 ? 0 : Math.PI;
  let desired = lerpAngle(patrolFace, toPlayer, 0.35);
  desired += Math.sin(ts / 700) * 0.55; // slow sweep
  ins.facing = lerpAngle(ins.facing, desired, Math.min(1, 3 * dt));

  // detection: rocks block the beam
  const cone = inCone(sim.player.x, sim.player.y, ins.x, ins.y, ins.facing);
  const blocked = cone && isOccluded(ins.x, ins.y, sim.player.x, sim.player.y, sim.covers);
  sim.hidden = blocked;
  if (cone && !blocked) sim.spotTimer += dt * 1000;
  else sim.spotTimer = Math.max(0, sim.spotTimer - dt * 1400);

  if (sim.spotTimer >= SPOT_DETECT_MS) {
    sim.loseReason = "spot";
    if (!sim.juiceSpawned) {
      spawnLoseFlash(sim);
      sim.juiceSpawned = true;
    }
    return "lose";
  }
  if (circlesOverlap(sim.player.x, sim.player.y, PLAYER_R, ins.x, ins.y, INSPECTOR_R)) {
    sim.loseReason = "hit";
    if (!sim.juiceSpawned) {
      spawnLoseFlash(sim);
      sim.juiceSpawned = true;
    }
    return "lose";
  }
  if (circlesOverlap(sim.player.x, sim.player.y, PLAYER_R, sim.exit.x, sim.exit.y, EXIT_R - 6)) {
    if (!sim.juiceSpawned) {
      spawnWinBurst(sim);
      sim.juiceSpawned = true;
    }
    return "win";
  }
  return null;
}

/** Particles / shake / flash decay; runs every frame regardless of state. */
export function decayJuice(sim: Sim, dt: number) {
  if (sim.shake > 0) sim.shake = Math.max(0, sim.shake - dt * 28);
  if (sim.endFlash > 0) sim.endFlash = Math.max(0, sim.endFlash - dt);
  if (sim.particles.length) {
    for (const p of sim.particles) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 120 * dt;
      p.life -= dt;
    }
    sim.particles = sim.particles.filter((p) => p.life > 0);
  }
}

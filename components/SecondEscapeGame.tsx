"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Locale = "en" | "zh";
type GameState = "ready" | "playing" | "win" | "lose";

type Props = { locale: Locale };

const W = 640;
const H = 400;
const PLAYER_R = 16;
const INSPECTOR_R = 17;
const EXIT_R = 28;
const SPOT_RANGE = 130;
const SPOT_HALF_ANGLE = 0.42; // radians ~24deg
const SPOT_DETECT_MS = 800;
const PLAYER_SPEED = 145;
const INSPECTOR_SPEED = 55;

const copy = {
  en: {
    title: "Second Escape",
    ready: "Tap / press any key to start",
    hint: "Sneak past the inspector spotlight to the bush",
    win: "Clear!",
    winSub: "Gear secured — you made it out.",
    loseSpot: "Spotted! Stay out of the light.",
    loseHit: "Caught by the inspector!",
    loseHint: "Tap Restart and try again",
    restart: "Restart",
    statusReady: "Ready",
    statusPlaying: "Sneaking…",
    statusWin: "Escaped",
    statusLose: "Caught",
    detection: "Detection",
    up: "Up",
    down: "Down",
    left: "Left",
    right: "Right",
    ariaGame: "Second Escape mini-game canvas",
    legendYou: "You — the angler",
    legendCop: "Inspector — avoid the light",
  },
  zh: {
    title: "二次逃脱",
    ready: "点击 / 按任意键开始",
    hint: "躲开检查员探照灯，潜入灌木丛出口",
    win: "恭喜通关",
    winSub: "装备成功保下",
    loseSpot: "被发现了！别待在光里。",
    loseHit: "被检查员抓住了！",
    loseHint: "点再来一次，保装备再冲",
    restart: "再来一次",
    statusReady: "准备",
    statusPlaying: "潜行中…",
    statusWin: "逃脱成功",
    statusLose: "被抓",
    detection: "暴露度",
    up: "上",
    down: "下",
    left: "左",
    right: "右",
    ariaGame: "二次逃脱小游戏画布",
    legendYou: "你 — 钓鱼佬",
    legendCop: "巡查 — 躲开探照灯",
  },
} as const;

type Keys = { up: boolean; down: boolean; left: boolean; right: boolean };

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
};

type Sim = {
  player: { x: number; y: number };
  inspector: { x: number; y: number; facing: number; patrolDir: 1 | -1 };
  exit: { x: number; y: number };
  covers: { x: number; y: number; w: number; h: number }[];
  spotTimer: number;
  loseReason: "spot" | "hit" | null;
  particles: Particle[];
  shake: number;
  endFlash: number;
  juiceSpawned: boolean;
};

function initialSim(): Sim {
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
    loseReason: null,
    particles: [],
    shake: 0,
    endFlash: 0,
    juiceSpawned: false,
  };
}

function spawnWinBurst(sim: Sim) {
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

function spawnLoseFlash(sim: Sim) {
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

function pointInCover(
  x: number,
  y: number,
  covers: Sim["covers"],
): boolean {
  return covers.some(
    (c) => x >= c.x && x <= c.x + c.w && y >= c.y && y <= c.y + c.h,
  );
}

function inSpotlight(
  px: number,
  py: number,
  ix: number,
  iy: number,
  facing: number,
  covers: Sim["covers"],
): boolean {
  if (pointInCover(px, py, covers)) return false;
  const dx = px - ix;
  const dy = py - iy;
  const dist = Math.hypot(dx, dy);
  if (dist > SPOT_RANGE || dist < 1) return false;
  const angle = Math.atan2(dy, dx);
  let diff = angle - facing;
  while (diff > Math.PI) diff -= Math.PI * 2;
  while (diff < -Math.PI) diff += Math.PI * 2;
  return Math.abs(diff) <= SPOT_HALF_ANGLE;
}

function circlesOverlap(
  ax: number,
  ay: number,
  ar: number,
  bx: number,
  by: number,
  br: number,
): boolean {
  return Math.hypot(ax - bx, ay - by) < ar + br;
}

function clampPlayer(x: number, y: number, covers: Sim["covers"]) {
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

export function SecondEscapeGame({ locale }: Props) {
  const t = copy[locale] ?? copy.en;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const simRef = useRef<Sim>(initialSim());
  const keysRef = useRef<Keys>({
    up: false,
    down: false,
    left: false,
    right: false,
  });
  const stateRef = useRef<GameState>("ready");
  const [state, setState] = useState<GameState>("ready");
  const [spotPct, setSpotPct] = useState(0);
  const rafRef = useRef<number>(0);
  const lastTsRef = useRef<number>(0);

  const setGameState = useCallback((s: GameState) => {
    stateRef.current = s;
    setState(s);
  }, []);

  const reset = useCallback(() => {
    simRef.current = initialSim();
    keysRef.current = { up: false, down: false, left: false, right: false };
    setSpotPct(0);
    setGameState("ready");
  }, [setGameState]);

  const start = useCallback(() => {
    if (stateRef.current === "playing") return;
    if (stateRef.current === "win" || stateRef.current === "lose") {
      simRef.current = initialSim();
      setSpotPct(0);
      }
    setGameState("playing");
  }, [setGameState]);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, sim: Sim, gs: GameState) => {
      ctx.save();
      if (sim.shake > 0) {
        const mag = sim.shake;
        ctx.translate((Math.random() - 0.5) * mag, (Math.random() - 0.5) * mag);
      }

      // grass field
      const grd = ctx.createLinearGradient(0, 0, 0, H);
      grd.addColorStop(0, "#1a5c3a");
      grd.addColorStop(1, "#0f3d28");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      // soft path
      ctx.fillStyle = "rgba(90, 120, 70, 0.35)";
      ctx.beginPath();
      ctx.moveTo(40, H);
      ctx.quadraticCurveTo(W * 0.4, H * 0.6, W - 40, 0);
      ctx.lineTo(W - 100, 0);
      ctx.quadraticCurveTo(W * 0.35, H * 0.65, 100, H);
      ctx.closePath();
      ctx.fill();

      // covers (rocks / crates)
      for (const c of sim.covers) {
        ctx.fillStyle = "#4a5560";
        ctx.strokeStyle = "#2d343c";
        ctx.lineWidth = 2;
        roundRect(ctx, c.x, c.y, c.w, c.h, 6);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "rgba(255,255,255,0.12)";
        ctx.fillRect(c.x + 4, c.y + 3, c.w - 8, 6);
      }

      // exit bush
      const { exit } = sim;
      ctx.beginPath();
      ctx.fillStyle = "#2ecc71";
      ctx.arc(exit.x, exit.y, EXIT_R, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = "#27ae60";
      ctx.arc(exit.x - 14, exit.y + 4, 16, 0, Math.PI * 2);
      ctx.arc(exit.x + 14, exit.y + 2, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#145a32";
      ctx.font = "bold 11px system-ui,sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(locale === "zh" ? "出口" : "EXIT", exit.x, exit.y + 4);

      const { inspector: ins } = sim;

      // spotlight cone
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(ins.x, ins.y);
      ctx.arc(
        ins.x,
        ins.y,
        SPOT_RANGE,
        ins.facing - SPOT_HALF_ANGLE,
        ins.facing + SPOT_HALF_ANGLE,
      );
      ctx.closePath();
      const spotGrad = ctx.createRadialGradient(
        ins.x,
        ins.y,
        10,
        ins.x,
        ins.y,
        SPOT_RANGE,
      );
      const hot = sim.spotTimer > 0;
      spotGrad.addColorStop(
        0,
        hot ? "rgba(255, 220, 80, 0.55)" : "rgba(255, 240, 150, 0.4)",
      );
      spotGrad.addColorStop(
        1,
        hot ? "rgba(255, 180, 40, 0.05)" : "rgba(255, 230, 120, 0.02)",
      );
      ctx.fillStyle = spotGrad;
      ctx.fill();
      ctx.restore();

      // inspector avatar (patrol / 巡查)
      drawInspectorAvatar(ctx, ins.x, ins.y, INSPECTOR_R, ins.facing);

      // player angler avatar (钓鱼佬)
      const { player: p } = sim;
      drawAnglerAvatar(ctx, p.x, p.y, PLAYER_R);

      // particles
      for (const p of sim.particles) {
        ctx.globalAlpha = Math.max(0, Math.min(1, p.life * 1.4));
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // end flash
      if (sim.endFlash > 0) {
        ctx.fillStyle =
          gs === "win"
            ? `rgba(130, 224, 170, ${sim.endFlash * 0.55})`
            : `rgba(192, 57, 43, ${sim.endFlash * 0.5})`;
        ctx.fillRect(0, 0, W, H);
      }

      // overlay messages
      if (gs !== "playing") {
        ctx.fillStyle = "rgba(8, 20, 28, 0.62)";
        ctx.fillRect(0, 0, W, H);
        ctx.textAlign = "center";
        ctx.fillStyle = "#fff";
        if (gs === "ready") {
          ctx.font = "bold 22px system-ui,sans-serif";
          ctx.fillText(t.title, W / 2, H / 2 - 28);
          ctx.font = "15px system-ui,sans-serif";
          ctx.fillStyle = "#d6eaf8";
          ctx.fillText(t.hint, W / 2, H / 2);
          ctx.fillStyle = "#f9e79f";
          ctx.fillText(t.ready, W / 2, H / 2 + 32);
        } else if (gs === "win") {
          ctx.font = "bold 34px system-ui,sans-serif";
          ctx.fillStyle = "#82e0aa";
          ctx.fillText(t.win, W / 2, H / 2 - 18);
          ctx.font = "bold 18px system-ui,sans-serif";
          ctx.fillStyle = "#f9e79f";
          ctx.fillText(t.winSub, W / 2, H / 2 + 14);
          ctx.font = "14px system-ui,sans-serif";
          ctx.fillStyle = "#d5f5e3";
          ctx.fillText(t.restart, W / 2, H / 2 + 48);
        } else if (gs === "lose") {
          ctx.font = "bold 26px system-ui,sans-serif";
          ctx.fillStyle = "#f5b7b1";
          const msg =
            sim.loseReason === "hit" ? t.loseHit : t.loseSpot;
          ctx.fillText(msg, W / 2, H / 2 - 12);
          ctx.font = "15px system-ui,sans-serif";
          ctx.fillStyle = "#fadbd8";
          ctx.fillText(t.loseHint, W / 2, H / 2 + 18);
          ctx.font = "14px system-ui,sans-serif";
          ctx.fillText(t.restart, W / 2, H / 2 + 46);
        }
      }

      ctx.restore(); // undo shake
    },
    [locale, t],
  );

  // game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const tick = (ts: number) => {
      const last = lastTsRef.current || ts;
      let dt = (ts - last) / 1000;
      lastTsRef.current = ts;
      if (dt > 0.05) dt = 0.05;

      const sim = simRef.current;
      const gs = stateRef.current;

      if (gs === "playing") {
        const keys = keysRef.current;
        let mx = 0;
        let my = 0;
        if (keys.left) mx -= 1;
        if (keys.right) mx += 1;
        if (keys.up) my -= 1;
        if (keys.down) my += 1;
        if (mx !== 0 || my !== 0) {
          const len = Math.hypot(mx, my);
          mx /= len;
          my /= len;
          const next = clampPlayer(
            sim.player.x + mx * PLAYER_SPEED * dt,
            sim.player.y + my * PLAYER_SPEED * dt,
            sim.covers,
          );
          sim.player.x = next.x;
          sim.player.y = next.y;
        }

        // inspector patrol left-right, face toward player with sweep bias
        sim.inspector.x +=
          sim.inspector.patrolDir * INSPECTOR_SPEED * dt;
        if (sim.inspector.x > W - 80) {
          sim.inspector.x = W - 80;
          sim.inspector.patrolDir = -1;
        } else if (sim.inspector.x < 80) {
          sim.inspector.x = 80;
          sim.inspector.patrolDir = 1;
        }
        // facing: blend toward player + patrol direction
        const toPlayer = Math.atan2(
          sim.player.y - sim.inspector.y,
          sim.player.x - sim.inspector.x,
        );
        const patrolFace =
          sim.inspector.patrolDir === 1 ? 0 : Math.PI;
        // mostly look along patrol, peek toward player
        let desired = lerpAngle(patrolFace, toPlayer, 0.35);
        // slow oscillation so spotlight sweeps
        desired += Math.sin(ts / 700) * 0.55;
        sim.inspector.facing = lerpAngle(
          sim.inspector.facing,
          desired,
          Math.min(1, 3 * dt),
        );

        // detection
        const spotted = inSpotlight(
          sim.player.x,
          sim.player.y,
          sim.inspector.x,
          sim.inspector.y,
          sim.inspector.facing,
          sim.covers,
        );
        if (spotted) {
          sim.spotTimer += dt * 1000;
        } else {
          sim.spotTimer = Math.max(0, sim.spotTimer - dt * 1400);
        }
        const pct = Math.min(100, (sim.spotTimer / SPOT_DETECT_MS) * 100);
        setSpotPct(pct);

        if (sim.spotTimer >= SPOT_DETECT_MS) {
          sim.loseReason = "spot";
          if (!sim.juiceSpawned) {
            spawnLoseFlash(sim);
            sim.juiceSpawned = true;
          }
          setGameState("lose");
        } else if (
          circlesOverlap(
            sim.player.x,
            sim.player.y,
            PLAYER_R,
            sim.inspector.x,
            sim.inspector.y,
            INSPECTOR_R,
          )
        ) {
          sim.loseReason = "hit";
          if (!sim.juiceSpawned) {
            spawnLoseFlash(sim);
            sim.juiceSpawned = true;
          }
          setGameState("lose");
        } else if (
          circlesOverlap(
            sim.player.x,
            sim.player.y,
            PLAYER_R,
            sim.exit.x,
            sim.exit.y,
            EXIT_R - 6,
          )
        ) {
          if (!sim.juiceSpawned) {
            spawnWinBurst(sim);
            sim.juiceSpawned = true;
          }
          setGameState("win");
        }
      }

      // juice decay always
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

      draw(ctx, sim, stateRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [draw, setGameState]);

  // keyboard
  useEffect(() => {
    const mapKey = (code: string, down: boolean) => {
      const k = keysRef.current;
      switch (code) {
        case "ArrowUp":
        case "KeyW":
          k.up = down;
          return true;
        case "ArrowDown":
        case "KeyS":
          k.down = down;
          return true;
        case "ArrowLeft":
        case "KeyA":
          k.left = down;
          return true;
        case "ArrowRight":
        case "KeyD":
          k.right = down;
          return true;
        default:
          return false;
      }
    };

    const onDown = (e: KeyboardEvent) => {
      if (mapKey(e.code, true)) e.preventDefault();
      if (stateRef.current === "ready") start();
      else if (
        (stateRef.current === "win" || stateRef.current === "lose") &&
        (e.code === "Space" || e.code === "Enter")
      ) {
        e.preventDefault();
        reset();
        start();
      }
    };
    const onUp = (e: KeyboardEvent) => {
      mapKey(e.code, false);
    };

    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, [reset, start]);

  const onCanvasPointer = () => {
    if (stateRef.current === "ready") start();
    else if (stateRef.current === "win" || stateRef.current === "lose") {
      reset();
      start();
    }
  };

  const holdDir = (dir: keyof Keys, down: boolean) => {
    keysRef.current[dir] = down;
    if (down && stateRef.current === "ready") start();
  };

  const statusLabel =
    state === "ready"
      ? t.statusReady
      : state === "playing"
        ? t.statusPlaying
        : state === "win"
          ? t.statusWin
          : t.statusLose;

  return (
    <section className="play-area game-wrap" id="play" aria-label={t.title}>
      <div className="game-hud">
        <span className="game-hud-title">{t.title}</span>
        <span className="game-hud-status" data-state={state}>
          {statusLabel}
        </span>
        <span className="game-hud-meter" aria-live="polite">
          {t.detection}: {Math.round(spotPct)}%
          <span
            className="game-meter-bar"
            style={{ width: `${spotPct}%` }}
            data-hot={spotPct > 50 ? "1" : "0"}
          />
        </span>
      </div>
      <div className="game-legend" aria-hidden="true">
        <span>🐟 {t.legendYou}</span>
        <span>🚨 {t.legendCop}</span>
      </div>

      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        className={`game-canvas${state === "win" ? " is-win" : ""}${state === "lose" ? " is-lose" : ""}`}
        aria-label={t.ariaGame}
        onPointerDown={onCanvasPointer}
      />

      {(state === "win" || state === "lose") && (
        <button
          type="button"
          className={`game-restart${state === "win" ? " is-win" : " is-lose"}`}
          onClick={() => {
            reset();
            start();
          }}
        >
          {t.restart}
        </button>
      )}

      <div className="game-controls" aria-hidden={false}>
        <button
          type="button"
          className="game-pad game-pad-up"
          aria-label={t.up}
          onPointerDown={(e) => {
            e.preventDefault();
            holdDir("up", true);
          }}
          onPointerUp={() => holdDir("up", false)}
          onPointerLeave={() => holdDir("up", false)}
          onPointerCancel={() => holdDir("up", false)}
        >
          ▲
        </button>
        <button
          type="button"
          className="game-pad game-pad-left"
          aria-label={t.left}
          onPointerDown={(e) => {
            e.preventDefault();
            holdDir("left", true);
          }}
          onPointerUp={() => holdDir("left", false)}
          onPointerLeave={() => holdDir("left", false)}
          onPointerCancel={() => holdDir("left", false)}
        >
          ◀
        </button>
        <button
          type="button"
          className="game-pad game-pad-down"
          aria-label={t.down}
          onPointerDown={(e) => {
            e.preventDefault();
            holdDir("down", true);
          }}
          onPointerUp={() => holdDir("down", false)}
          onPointerLeave={() => holdDir("down", false)}
          onPointerCancel={() => holdDir("down", false)}
        >
          ▼
        </button>
        <button
          type="button"
          className="game-pad game-pad-right"
          aria-label={t.right}
          onPointerDown={(e) => {
            e.preventDefault();
            holdDir("right", true);
          }}
          onPointerUp={() => holdDir("right", false)}
          onPointerLeave={() => holdDir("right", false)}
          onPointerCancel={() => holdDir("right", false)}
        >
          ▶
        </button>
      </div>
    </section>
  );
}


function drawAnglerAvatar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
) {
  // body / vest
  ctx.beginPath();
  ctx.fillStyle = "#1f6aa5";
  ctx.arc(x, y + 2, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#0e3d5c";
  ctx.lineWidth = 2;
  ctx.stroke();

  // face
  ctx.beginPath();
  ctx.fillStyle = "#f0c9a0";
  ctx.arc(x, y - 2, r * 0.62, 0, Math.PI * 2);
  ctx.fill();

  // bucket hat
  ctx.fillStyle = "#c49a3b";
  ctx.beginPath();
  ctx.ellipse(x, y - r * 0.55, r * 0.85, r * 0.28, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#a67c2d";
  ctx.beginPath();
  ctx.ellipse(x, y - r * 0.75, r * 0.55, r * 0.35, 0, 0, Math.PI * 2);
  ctx.fill();

  // eyes
  ctx.fillStyle = "#2c3e50";
  ctx.beginPath();
  ctx.arc(x - 3.5, y - 2, 1.4, 0, Math.PI * 2);
  ctx.arc(x + 3.5, y - 2, 1.4, 0, Math.PI * 2);
  ctx.fill();

  // fishing rod
  ctx.strokeStyle = "#5d4037";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x + r * 0.2, y + 2);
  ctx.lineTo(x + r * 1.35, y - r * 1.1);
  ctx.stroke();
  ctx.strokeStyle = "rgba(220,220,220,0.7)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x + r * 1.35, y - r * 1.1);
  ctx.lineTo(x + r * 1.55, y + r * 0.3);
  ctx.stroke();

  // fish badge
  ctx.font = `${Math.max(10, Math.floor(r))}px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("🐟", x - r * 0.75, y + r * 0.55);
}

function drawInspectorAvatar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  facing: number,
) {
  // body / uniform
  ctx.beginPath();
  ctx.fillStyle = "#2c3e50";
  ctx.arc(x, y + 2, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#1a252f";
  ctx.lineWidth = 2;
  ctx.stroke();

  // face
  ctx.beginPath();
  ctx.fillStyle = "#e8b896";
  ctx.arc(x, y - 1, r * 0.58, 0, Math.PI * 2);
  ctx.fill();

  // cap
  ctx.fillStyle = "#1a5276";
  ctx.beginPath();
  ctx.ellipse(x, y - r * 0.5, r * 0.75, r * 0.28, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#154360";
  ctx.beginPath();
  ctx.ellipse(x, y - r * 0.7, r * 0.48, r * 0.3, 0, 0, Math.PI * 2);
  ctx.fill();
  // badge on cap
  ctx.fillStyle = "#f1c40f";
  ctx.beginPath();
  ctx.arc(x, y - r * 0.55, 2.2, 0, Math.PI * 2);
  ctx.fill();

  // stern eyes
  ctx.fillStyle = "#1c2833";
  ctx.beginPath();
  ctx.arc(x - 3.2, y - 1, 1.3, 0, Math.PI * 2);
  ctx.arc(x + 3.2, y - 1, 1.3, 0, Math.PI * 2);
  ctx.fill();

  // flashlight beam direction tick
  ctx.strokeStyle = "#f7dc6f";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(
    x + Math.cos(facing) * (r + 10),
    y + Math.sin(facing) * (r + 10),
  );
  ctx.stroke();

  ctx.font = `${Math.max(11, Math.floor(r + 2))}px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("🚨", x + r * 0.7, y + r * 0.55);
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function lerpAngle(a: number, b: number, t: number) {
  let diff = b - a;
  while (diff > Math.PI) diff -= Math.PI * 2;
  while (diff < -Math.PI) diff += Math.PI * 2;
  return a + diff * t;
}

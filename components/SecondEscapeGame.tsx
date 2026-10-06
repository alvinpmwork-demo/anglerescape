"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  EXIT_R,
  H,
  INSPECTOR_R,
  PLAYER_R,
  SPOT_DETECT_MS,
  SPOT_RANGE,
  W,
  coneOutline,
  decayJuice,
  initialSim,
  stepSim,
  type Keys,
  type Sim,
} from "@/components/secondEscapeLogic";

type Locale = "en" | "zh";
type GameState = "ready" | "playing" | "win" | "lose";

type Props = { locale: Locale };

const copy = {
  en: {
    title: "Second Escape",
    ready: "Tap, or press Space / an arrow key to start",
    hint: "Rocks block the flashlight. Sneak through their shadows to the bush",
    win: "Clear!",
    winSub: "Gear secured — you made it out.",
    loseSpot: "Spotted! Stay out of the light.",
    loseHit: "Caught by the inspector!",
    loseHint: "Space / Enter or tap to try again",
    again: "Space / Enter or tap to play again",
    hidden: "hidden",
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
    altYou: "Cartoon angler in a bucket hat holding a fishing rod (the player)",
    altCop: "Fictional park inspector in a reflective vest holding a flashlight (avoid his light)",
  },
  zh: {
    title: "二次逃脱",
    ready: "点击，或按空格 / 方向键开始",
    hint: "石头能挡住手电光，借着阴影潜入灌木丛出口",
    win: "恭喜通关",
    winSub: "装备成功保下",
    loseSpot: "被发现了！别待在光里。",
    loseHit: "被检查员抓住了！",
    loseHint: "按空格 / 回车或点击，保装备再冲",
    again: "按空格 / 回车或点击再来一局",
    hidden: "藏好了",
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
    altYou: "戴渔夫帽、扛着鱼竿的卡通钓鱼佬（玩家角色）",
    altCop: "穿反光背心、拿手电筒的虚构公园巡查员（躲开他的光）",
  },
} as const;

/** Max backing-store scale vs the 640x400 logical canvas (keeps 4K fullscreen sane). */
const MAX_BACKING_SCALE = 4;

const MOVE_CODES = new Set([
  "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "KeyW", "KeyA", "KeyS", "KeyD",
]);
const ACTION_CODES = new Set(["Space", "Enter", "NumpadEnter"]);

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
  const [spritesReady, setSpritesReady] = useState(false);
  const rafRef = useRef<number>(0);
  const lastTsRef = useRef<number>(0);
  const anglerImgRef = useRef<HTMLImageElement | null>(null);
  const inspectorImgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    const angler = new Image();
    const inspector = new Image();
    let loaded = 0;
    const done = () => {
      loaded += 1;
      if (loaded >= 2 && !cancelled) {
        anglerImgRef.current = angler;
        inspectorImgRef.current = inspector;
        setSpritesReady(true);
      }
    };
    angler.onload = done;
    inspector.onload = done;
    angler.onerror = done;
    inspector.onerror = done;
    angler.src = "/game/angler.png";
    inspector.src = "/game/inspector.png";
    return () => {
      cancelled = true;
    };
  }, []);

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
      // Backing store is (CSS size x devicePixelRatio); keep drawing in 640x400 logical units.
      const k = ctx.canvas.width / W;
      ctx.setTransform(k, 0, 0, k, 0, 0);
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

      // spotlight cone, clipped by rocks (rocks cast shadows you can hide in)
      ctx.save();
      const cone = coneOutline(ins.x, ins.y, ins.facing, sim.covers);
      ctx.beginPath();
      ctx.moveTo(cone[0].x, cone[0].y);
      for (let i = 1; i < cone.length; i++) ctx.lineTo(cone[i].x, cone[i].y);
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
      drawInspectorAvatar(
        ctx,
        ins.x,
        ins.y,
        INSPECTOR_R,
        ins.facing,
        inspectorImgRef.current,
      );

      // player angler avatar (钓鱼佬)
      const { player: p } = sim;
      drawAnglerAvatar(ctx, p.x, p.y, PLAYER_R, anglerImgRef.current);
      if (gs === "playing" && sim.hidden) {
        ctx.font = "bold 11px system-ui,sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = "rgba(213, 245, 227, 0.95)";
        ctx.fillText(t.hidden, p.x, p.y - PLAYER_R - 6);
      }

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
          // the Restart *button* lives in the DOM; the canvas only hints the shortcut
          ctx.font = "14px system-ui,sans-serif";
          ctx.fillStyle = "#d5f5e3";
          ctx.fillText(t.again, W / 2, H / 2 + 46);
        } else if (gs === "lose") {
          ctx.font = "bold 26px system-ui,sans-serif";
          ctx.fillStyle = "#f5b7b1";
          const msg =
            sim.loseReason === "hit" ? t.loseHit : t.loseSpot;
          ctx.fillText(msg, W / 2, H / 2 - 12);
          ctx.font = "15px system-ui,sans-serif";
          ctx.fillStyle = "#fadbd8";
          ctx.fillText(t.loseHint, W / 2, H / 2 + 18);
        }
      }

      ctx.restore(); // undo shake
    },
    [locale, t, spritesReady],
  );

  // game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    syncBackingStore(canvas);
    const tick = (ts: number) => {
      const last = lastTsRef.current || ts;
      let dt = (ts - last) / 1000;
      lastTsRef.current = ts;
      if (dt > 0.05) dt = 0.05;

      const sim = simRef.current;
      const gs = stateRef.current;

      if (gs === "playing") {
        const result = stepSim(sim, keysRef.current, dt, ts);
        setSpotPct(Math.min(100, (sim.spotTimer / SPOT_DETECT_MS) * 100));
        if (result) setGameState(result);
      }

      decayJuice(sim, dt);
      if (++frame % 30 === 0) syncBackingStore(canvas);

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
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const el = e.target as HTMLElement | null;
      if (el?.closest?.("input, textarea, select, [contenteditable='true']")) return;
      const isAction = ACTION_CODES.has(e.code);
      // let Space/Enter activate a focused button or link natively (e.g. the Restart button)
      if (isAction && el?.closest?.("button, a")) return;
      const isMove = MOVE_CODES.has(e.code) && mapKey(e.code, true);
      if (isMove) e.preventDefault();
      const gs = stateRef.current;
      if (gs === "ready") {
        // only movement / Space / Enter start the round (not Tab, Shift, etc.)
        if (isMove || isAction) {
          if (isAction) e.preventDefault();
          start();
        }
      } else if ((gs === "win" || gs === "lose") && isAction && !e.repeat) {
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

  // re-size the backing store when the canvas' on-screen size or DPR changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let raf = 0;
    const sync = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => syncBackingStore(canvas));
    };
    window.addEventListener("resize", sync);
    document.addEventListener("fullscreenchange", sync);
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(sync) : null;
    ro?.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", sync);
      document.removeEventListener("fullscreenchange", sync);
      ro?.disconnect();
    };
  }, []);

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
      <div className="game-legend">
        <span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/game/angler.png" alt={t.altYou} width={28} height={28} />
          {t.legendYou}
        </span>
        <span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/game/inspector.png" alt={t.altCop} width={28} height={28} />
          {t.legendCop}
        </span>
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


function drawPortrait(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement | null,
  x: number,
  y: number,
  r: number,
) {
  if (img && img.complete && img.naturalWidth > 0) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, x - r, y - r, r * 2, r * 2);
    ctx.restore();
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.85)";
    ctx.lineWidth = 2.5;
    ctx.stroke();
    return true;
  }
  return false;
}

function drawAnglerAvatar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  img: HTMLImageElement | null,
) {
  if (drawPortrait(ctx, img, x, y, r)) {
    // tiny rod tip so motion reads in play
    ctx.strokeStyle = "#5d4037";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + r * 0.55, y + r * 0.15);
    ctx.lineTo(x + r * 1.25, y - r * 0.85);
    ctx.stroke();
    return;
  }
  // fallback silhouette
  ctx.beginPath();
  ctx.fillStyle = "#1f6aa5";
  ctx.arc(x, y + 2, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = "#f0c9a0";
  ctx.arc(x, y - 2, r * 0.62, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#c49a3b";
  ctx.beginPath();
  ctx.ellipse(x, y - r * 0.55, r * 0.85, r * 0.28, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawInspectorAvatar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  facing: number,
  img: HTMLImageElement | null,
) {
  if (!drawPortrait(ctx, img, x, y, r)) {
    ctx.beginPath();
    ctx.fillStyle = "#2c3e50";
    ctx.arc(x, y + 2, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "#e8b896";
    ctx.arc(x, y - 1, r * 0.58, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#1a5276";
    ctx.beginPath();
    ctx.ellipse(x, y - r * 0.5, r * 0.75, r * 0.28, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  // flashlight direction
  ctx.strokeStyle = "#f7dc6f";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(
    x + Math.cos(facing) * (r + 12),
    y + Math.sin(facing) * (r + 12),
  );
  ctx.stroke();
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

/**
 * Match the canvas backing store to its on-screen size x devicePixelRatio (getBoundingClientRect
 * includes CSS transforms, so a scaled-up iframe/fullscreen stage renders crisp), keeping 8:5.
 */
function syncBackingStore(canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect();
  if (!rect.width) return;
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
  const w = Math.round(
    Math.min(W * MAX_BACKING_SCALE, Math.max(W, rect.width * dpr)),
  );
  const h = Math.round((w * H) / W);
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
}

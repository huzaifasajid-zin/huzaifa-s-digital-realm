import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

type Tab = "particles" | "piano" | "mixer" | "snake";
const tabs: { id: Tab; label: string }[] = [
  { id: "particles", label: "Particles" },
  { id: "piano", label: "Piano" },
  { id: "mixer", label: "Color Mixer" },
  { id: "snake", label: "Snake" },
];

export function Playground() {
  const [tab, setTab] = useState<Tab>("particles");
  return (
    <div className="h-full flex flex-col bg-white/40">
      <div className="flex gap-1 p-2 border-b border-black/10 bg-white/60">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={clsx(
              "px-3 py-1.5 text-sm rounded-md transition",
              tab === t.id ? "bg-primary text-primary-foreground" : "hover:bg-black/5 text-foreground/80"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="flex-1 min-h-0 relative">
        {tab === "particles" && <Particles />}
        {tab === "piano" && <Piano />}
        {tab === "mixer" && <Mixer />}
        {tab === "snake" && <Snake />}
      </div>
    </div>
  );
}

function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let raf = 0;
    const resize = () => { c.width = c.clientWidth; c.height = c.clientHeight; };
    resize();
    window.addEventListener("resize", resize);
    const ps = Array.from({ length: 90 }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 2 + 1,
    }));
    const mouse = { x: -1e3, y: -1e3 };
    const onMove = (e: MouseEvent) => {
      const r = c.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    c.addEventListener("mousemove", onMove);
    const tick = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.fillStyle = "rgba(99,102,241,0.7)";
      for (const p of ps) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx*dx + dy*dy;
        if (d2 < 14000) { p.vx += dx / d2 * 80; p.vy += dy / d2 * 80; }
        p.vx *= 0.98; p.vy *= 0.98;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > c.width) p.vx *= -1;
        if (p.y < 0 || p.y > c.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.strokeStyle = "rgba(99,102,241,0.15)";
      for (let i = 0; i < ps.length; i++) for (let j = i+1; j < ps.length; j++) {
        const a = ps[i], b = ps[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        if (dx*dx + dy*dy < 8000) {
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); c.removeEventListener("mousemove", onMove); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

function Piano() {
  const keys = ["C","D","E","F","G","A","B"];
  const freq: Record<string, number> = { C: 261.63, D: 293.66, E: 329.63, F: 349.23, G: 392, A: 440, B: 493.88 };
  const play = (k: string) => {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AC();
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.frequency.value = freq[k]; o.type = "sine";
    g.gain.setValueAtTime(0.25, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime + 0.8);
  };
  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="flex gap-2">
        {keys.map((k) => (
          <motion.button key={k} whileTap={{ scale: 0.94, y: 4 }} onClick={() => play(k)}
            className="w-14 h-44 rounded-b-lg bg-white border border-black/20 shadow-lg flex items-end justify-center pb-2 text-sm font-medium text-foreground/70 hover:bg-primary/10">
            {k}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function Mixer() {
  const [r, setR] = useState(120); const [g, setG] = useState(180); const [b, setB] = useState(240);
  const hex = "#" + [r,g,b].map((v) => v.toString(16).padStart(2,"0")).join("");
  return (
    <div className="h-full flex flex-col md:flex-row items-stretch p-6 gap-6">
      <div className="flex-1 rounded-2xl shadow-xl border border-black/10" style={{ background: hex }} />
      <div className="md:w-72 space-y-4 self-center">
        {([["R",r,setR,"red"],["G",g,setG,"green"],["B",b,setB,"blue"]] as const).map(([l,v,s,c]) => (
          <div key={l}>
            <div className="flex justify-between text-sm"><span>{l}</span><span className="text-foreground/60">{v}</span></div>
            <input type="range" min={0} max={255} value={v} onChange={(e) => s(+e.target.value)}
              className="w-full accent-current" style={{ color: c }} />
          </div>
        ))}
        <div className="rounded-md bg-black/5 px-3 py-2 font-mono text-sm">{hex}</div>
        <button onClick={() => navigator.clipboard?.writeText(hex)} className="w-full px-3 py-2 rounded-md bg-primary text-primary-foreground text-sm">Copy hex</button>
      </div>
    </div>
  );
}

function Snake() {
  const SIZE = 18;
  const [snake, setSnake] = useState([{ x: 9, y: 9 }]);
  const [dir, setDir] = useState<{x:number;y:number}>({ x: 1, y: 0 });
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [over, setOver] = useState(false);
  const dirRef = useRef(dir); dirRef.current = dir;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const d = dirRef.current;
      if (e.key === "ArrowUp" && d.y !== 1) setDir({x:0,y:-1});
      if (e.key === "ArrowDown" && d.y !== -1) setDir({x:0,y:1});
      if (e.key === "ArrowLeft" && d.x !== 1) setDir({x:-1,y:0});
      if (e.key === "ArrowRight" && d.x !== -1) setDir({x:1,y:0});
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    if (over) return;
    const t = setInterval(() => {
      setSnake((s) => {
        const head = { x: (s[0].x + dirRef.current.x + SIZE) % SIZE, y: (s[0].y + dirRef.current.y + SIZE) % SIZE };
        if (s.some((c) => c.x === head.x && c.y === head.y)) { setOver(true); return s; }
        const ate = head.x === food.x && head.y === food.y;
        const next = [head, ...s];
        if (!ate) next.pop();
        else setFood({ x: Math.floor(Math.random() * SIZE), y: Math.floor(Math.random() * SIZE) });
        return next;
      });
    }, 130);
    return () => clearInterval(t);
  }, [food, over]);
  const reset = () => { setSnake([{x:9,y:9}]); setDir({x:1,y:0}); setFood({x:5,y:5}); setOver(false); };
  return (
    <div className="h-full flex flex-col items-center justify-center gap-3">
      <div className="text-sm text-foreground/60">Use arrow keys · Score: {snake.length - 1}</div>
      <div className="grid bg-white rounded-lg shadow-lg border border-black/10 overflow-hidden"
        style={{ gridTemplateColumns: `repeat(${SIZE}, 18px)` }}>
        {Array.from({ length: SIZE * SIZE }).map((_, i) => {
          const x = i % SIZE, y = Math.floor(i / SIZE);
          const isSnake = snake.some((c) => c.x === x && c.y === y);
          const isHead = snake[0].x === x && snake[0].y === y;
          const isFood = food.x === x && food.y === y;
          return <div key={i} className={clsx("w-[18px] h-[18px]", isHead ? "bg-primary" : isSnake ? "bg-primary/60" : isFood ? "bg-rose-500" : "bg-transparent")} />;
        })}
      </div>
      {over && <button onClick={reset} className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm">Game over — restart</button>}
    </div>
  );
}
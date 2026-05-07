import { motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { Folder, TerminalSquare, Image, Compass, Trash2, User, type LucideIcon } from "lucide-react";
import { useOS, type AppId } from "../store/os-store";
import clsx from "clsx";

interface DockItem { id: AppId; label: string; Icon: LucideIcon; gradient: string; }
const items: DockItem[] = [
  { id: "finder", label: "Finder", Icon: Folder, gradient: "from-sky-400 to-blue-600" },
  { id: "about", label: "About", Icon: User, gradient: "from-violet-400 to-fuchsia-600" },
  { id: "pictures", label: "Pictures", Icon: Image, gradient: "from-pink-400 to-rose-600" },
  { id: "terminal", label: "Terminal", Icon: TerminalSquare, gradient: "from-zinc-700 to-zinc-900" },
  { id: "safari", label: "Safari", Icon: Compass, gradient: "from-cyan-400 to-blue-500" },
  { id: "trash", label: "Trash", Icon: Trash2, gradient: "from-zinc-300 to-zinc-500" },
];

function DockIcon({ item, mouseX }: { item: DockItem; mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLButtonElement>(null);
  const { openApp, windows, bouncing } = useOS();
  const open = windows.some((w) => w.appId === item.id);
  const distance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - rect.x - rect.width / 2;
  });
  const size = useTransform(distance, [-120, 0, 120], [52, 78, 52]);
  const Icon = item.Icon;
  return (
    <div className="flex flex-col items-center">
      <motion.button
        ref={ref}
        style={{ width: size, height: size }}
        onClick={() => openApp(item.id)}
        whileTap={{ scale: 0.85 }}
        className={clsx(
          "group relative rounded-2xl shadow-lg shadow-black/40 bg-gradient-to-br flex items-center justify-center text-white",
          item.gradient,
          bouncing === item.id && "animate-dock-bounce"
        )}
        title={item.label}
      >
        <Icon className="w-1/2 h-1/2 drop-shadow" />
        <span className="absolute -top-9 px-2 py-1 rounded-md text-xs glass-strong opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {item.label}
        </span>
      </motion.button>
      <div className={clsx("h-1 w-1 mt-1 rounded-full", open ? "bg-white/80" : "bg-transparent")} />
    </div>
  );
}

export function Dock() {
  const mouseX = useMotionValue(Infinity);
  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[9998]">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="glass-strong rounded-2xl px-3 py-2 flex items-end gap-3"
      >
        {items.map((it) => (
          <DockIcon key={it.id} item={it} mouseX={mouseX} />
        ))}
      </motion.div>
    </div>
  );
}

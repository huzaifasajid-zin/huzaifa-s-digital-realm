import { motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { useOS, type AppId } from "../store/os-store";
import { appIcons } from "../data/icons";
import clsx from "clsx";

interface DockItem { id: AppId; label: string; icon: string; }
const items: DockItem[] = [
  { id: "finder", label: "Finder", icon: appIcons.finder },
  { id: "about", label: "About", icon: appIcons.about },
  { id: "pictures", label: "Pictures", icon: appIcons.pictures },
  { id: "terminal", label: "Terminal", icon: appIcons.terminal },
  { id: "safari", label: "Safari", icon: appIcons.safari },
  { id: "playground", label: "Playground", icon: appIcons.playground },
  { id: "trash", label: "Trash", icon: appIcons.trash },
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
  return (
    <div className="flex flex-col items-center">
      <motion.button
        ref={ref}
        style={{ width: size, height: size }}
        onClick={() => openApp(item.id)}
        whileTap={{ scale: 0.85 }}
        className={clsx(
          "group relative flex items-center justify-center",
          bouncing === item.id && "animate-dock-bounce"
        )}
        title={item.label}
      >
        <img src={item.icon} alt={item.label} draggable={false} className="w-full h-full object-contain drop-shadow-lg pointer-events-none" />
        <span className="absolute -top-9 px-2 py-1 rounded-md text-xs glass-strong opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-foreground">
          {item.label}
        </span>
      </motion.button>
      <div className={clsx("h-1 w-1 mt-1 rounded-full", open ? "bg-foreground/70" : "bg-transparent")} />
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

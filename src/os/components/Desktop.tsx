import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Folder, User, Image, Trash2, FileText } from "lucide-react";
import { useOS, type AppId } from "../store/os-store";

interface Icon { id: string; label: string; appId: AppId; Icon: typeof Folder; }
const icons: Icon[] = [
  { id: "projects", label: "Projects", appId: "finder", Icon: Folder },
  { id: "about", label: "About Me", appId: "about", Icon: User },
  { id: "pictures", label: "Pictures", appId: "pictures", Icon: Image },
  { id: "resume", label: "Resume.pdf", appId: "safari", Icon: FileText },
  { id: "trash", label: "Trash", appId: "trash", Icon: Trash2 },
];

function DesktopTitle() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 80, damping: 14 });
  const y = useSpring(my, { stiffness: 80, damping: 14 });
  const tx = useTransform(x, (v) => v * 20);
  const ty = useTransform(y, (v) => v * 14);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) - 0.5);
      my.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        style={{ x: tx, y: ty }}
        className="text-center no-select"
      >
        <motion.h1
          className="text-6xl md:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-white/90 to-white/40 drop-shadow-[0_8px_30px_rgba(120,80,255,0.45)]"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          Huzaifa Sajid
        </motion.h1>
        <div className="mt-3 text-white/60 tracking-[0.3em] text-xs md:text-sm uppercase">
          Portfolio · macOS Edition
        </div>
      </motion.div>
    </div>
  );
}

export function Desktop() {
  const openApp = useOS((s) => s.openApp);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div
      className="absolute inset-0 desktop-bg overflow-hidden"
      onClick={() => setSelected(null)}
    >
      <DesktopTitle />
      <div className="absolute top-12 right-6 grid gap-4">
        {icons.map((it) => {
          const Icon = it.Icon;
          const isSel = selected === it.id;
          return (
            <motion.button
              key={it.id}
              onClick={(e) => { e.stopPropagation(); setSelected(it.id); }}
              onDoubleClick={() => openApp(it.appId, it.appId === "finder" ? { payload: { view: "projects" } } : undefined)}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="w-20 flex flex-col items-center gap-1 no-select"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur flex items-center justify-center shadow-lg ${isSel ? "ring-2 ring-primary" : ""}`}>
                <Icon size={28} className="text-white/90" />
              </div>
              <span className={`text-[11px] text-white px-1.5 rounded ${isSel ? "bg-primary/80" : "bg-black/30"}`}>{it.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

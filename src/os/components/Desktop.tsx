import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { useOS, type AppId } from "../store/os-store";
import { appIcons } from "../data/icons";

interface DIcon { id: string; label: string; appId?: AppId; icon: string; href?: string; download?: string; }
const icons: DIcon[] = [
  { id: "projects", label: "Projects", appId: "finder", icon: appIcons.folder },
  { id: "about", label: "About Me", appId: "about", icon: appIcons.file },
  { id: "pictures", label: "Pictures", appId: "pictures", icon: appIcons.pictures },
  { id: "playground", label: "Playground", appId: "playground", icon: appIcons.file },
  { id: "resume", label: "Resume.pdf", icon: appIcons.pdf, href: "/resume.pdf", download: "Huzaifa-Sajid-Resume.pdf" },
  { id: "trash", label: "Trash", appId: "trash", icon: appIcons.trash },
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
          const isSel = selected === it.id;
          const activate = () => {
            if (it.href) {
              const a = document.createElement("a");
              a.href = it.href; if (it.download) a.download = it.download; a.target = "_blank"; a.rel = "noreferrer";
              a.click();
            } else if (it.appId) openApp(it.appId, it.appId === "finder" ? { payload: { view: "projects" } } : undefined);
          };
          return (
            <motion.button
              key={it.id}
              onClick={(e) => { e.stopPropagation(); setSelected(it.id); }}
              onDoubleClick={activate}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="w-20 flex flex-col items-center gap-1 no-select"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${isSel ? "ring-2 ring-primary bg-primary/10" : ""}`}>
                <img src={it.icon} alt={it.label} draggable={false} className="w-12 h-12 object-contain drop-shadow-lg" />
              </div>
              <span className={`text-[11px] px-1.5 rounded ${isSel ? "bg-primary/80 text-primary-foreground" : "bg-white/60 text-foreground"}`}>{it.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

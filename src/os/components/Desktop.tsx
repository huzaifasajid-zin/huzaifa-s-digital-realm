import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

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
          className="text-6xl md:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-indigo-600 via-fuchsia-500 to-rose-500 drop-shadow-[0_8px_30px_rgba(120,80,255,0.25)]"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          Huzaifa Sajid
        </motion.h1>
        <div className="mt-3 text-foreground/60 tracking-[0.3em] text-xs md:text-sm uppercase text-shadow-sm">
          Portfolio · macOS Edition
        </div>
      </motion.div>
    </div>
  );
}

export function Desktop() {
  const desktopRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={desktopRef}
      className="absolute inset-0 desktop-bg overflow-hidden"
    >
      <DesktopTitle />
    </div>
  );
}
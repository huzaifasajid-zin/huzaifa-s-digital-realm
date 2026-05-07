import { motion } from "framer-motion";
import { Apple } from "lucide-react";
import { useEffect, useState } from "react";

export function BootScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setProgress((p) => Math.min(100, p + 4)), 60);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(onDone, 350);
      return () => clearTimeout(t);
    }
  }, [progress, onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 bg-white flex flex-col items-center justify-center z-[10000]"
    >
      <Apple size={64} className="text-foreground mb-8" />
      <div className="w-56 h-1.5 rounded-full bg-black/10 overflow-hidden">
        <motion.div
          className="h-full bg-foreground"
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}

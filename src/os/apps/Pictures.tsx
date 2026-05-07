import { useState } from "react";
import { projects } from "../data/portfolio";
import { motion, AnimatePresence } from "framer-motion";

export function Pictures() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="h-full overflow-y-auto thin-scroll p-4">
      <div className="columns-2 md:columns-3 gap-3 [column-fill:_balance]">
        {projects.concat(projects).map((p, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`mb-3 block w-full rounded-lg bg-gradient-to-br ${p.cover} shadow-lg`}
            style={{ height: 120 + ((i * 37) % 120) }}
          />
        ))}
      </div>
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="absolute inset-0 bg-black/80 flex items-center justify-center p-8"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className={`w-full h-full rounded-xl bg-gradient-to-br ${projects.concat(projects)[active].cover}`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { useOS, type AppId } from "../store/os-store";
import { appIcons } from "../data/icons";

const items: { id: AppId; label: string; hint: string }[] = [
  { id: "finder", label: "Finder", hint: "Browse projects" },
  { id: "about", label: "About Me", hint: "Profile" },
  { id: "pictures", label: "Pictures", hint: "Gallery" },
  { id: "terminal", label: "Terminal", hint: "Shell" },
  { id: "safari", label: "Safari", hint: "Links" },
  { id: "playground", label: "Playground", hint: "Mini apps" },
  { id: "trash", label: "Trash", hint: "Empty" },
];

export function Spotlight() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const openApp = useOS((s) => s.openApp);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); setOpen((o) => !o); setQ(""); setSel(0);
      } else if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? items.filter((i) => i.label.toLowerCase().includes(s) || i.hint.toLowerCase().includes(s)) : items;
  }, [q]);

  const launch = (id: AppId) => { openApp(id); setOpen(false); };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10001] flex items-start justify-center pt-32 bg-black/10"
          onClick={() => setOpen(false)}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: -16, scale: 0.97 }} animate={{ y: 0, scale: 1 }}
            className="w-[560px] glass-strong rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-black/10">
              <Search size={18} className="text-foreground/60" />
              <input
                autoFocus value={q}
                onChange={(e) => { setQ(e.target.value); setSel(0); }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(results.length - 1, s + 1)); }
                  if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(0, s - 1)); }
                  if (e.key === "Enter" && results[sel]) launch(results[sel].id);
                }}
                placeholder="Spotlight Search"
                className="flex-1 bg-transparent outline-none text-lg"
              />
            </div>
            <div className="max-h-80 overflow-y-auto thin-scroll p-2">
              {results.map((r, i) => (
                <button key={r.id} onClick={() => launch(r.id)}
                  onMouseEnter={() => setSel(i)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left ${i === sel ? "bg-primary/15" : ""}`}>
                  <img src={appIcons[r.id]} alt="" className="w-8 h-8" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{r.label}</div>
                    <div className="text-xs text-foreground/50">{r.hint}</div>
                  </div>
                </button>
              ))}
              {results.length === 0 && <div className="px-3 py-6 text-center text-sm text-foreground/50">No results</div>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
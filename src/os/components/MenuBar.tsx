import { useEffect, useState } from "react";
import { Wifi, BatteryFull, Search, Apple } from "lucide-react";

export function MenuBar() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(t);
  }, []);
  const date = now.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
  const time = now.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  return (
    <div className="fixed top-0 left-0 right-0 h-7 z-[9999] glass-strong text-foreground text-[13px] flex items-center px-3 gap-4 no-select">
      <Apple size={15} className="opacity-90" />
      <span className="font-semibold">Huzaifa's Portfolio</span>
      {["File", "Edit", "View", "Window", "Help"].map((m) => (
        <span key={m} className="opacity-80 hover:opacity-100 cursor-default">{m}</span>
      ))}
      <div className="ml-auto flex items-center gap-3">
        <span className="opacity-60 text-[11px] hidden sm:inline">⌘K to search</span>
        <Search size={14} className="opacity-80" />
        <BatteryFull size={16} className="opacity-80" />
        <Wifi size={14} className="opacity-80" />
        <span className="opacity-90">{date}</span>
        <span className="opacity-90">{time}</span>
      </div>
    </div>
  );
}

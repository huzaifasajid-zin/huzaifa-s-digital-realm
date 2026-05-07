import { Trash2 } from "lucide-react";
export function Trash() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-foreground/50 bg-white/40">
      <Trash2 size={56} className="mb-3 opacity-60" />
      <div className="text-sm">Trash is empty.</div>
    </div>
  );
}

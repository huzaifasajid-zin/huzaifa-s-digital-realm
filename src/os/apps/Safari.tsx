import { Lock, Plus } from "lucide-react";
import { profile } from "../data/portfolio";

const bookmarks = [
  { name: "GitHub", url: profile.github, color: "from-zinc-700 to-zinc-900" },
  { name: "LinkedIn", url: profile.linkedin, color: "from-sky-500 to-blue-700" },
  { name: "Email", url: `mailto:${profile.email}`, color: "from-rose-500 to-pink-600" },
  { name: "Resume", url: "/resume.pdf", color: "from-emerald-500 to-teal-600" },
];

export function Safari() {
  return (
    <div className="h-full flex flex-col bg-white text-zinc-900">
      <div className="h-10 flex items-center gap-2 px-3 border-b border-zinc-200 bg-zinc-100">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-zinc-300" />
          <span className="w-2 h-2 rounded-full bg-zinc-300" />
        </div>
        <div className="ml-3 flex-1 flex items-center gap-2 bg-white border border-zinc-200 rounded-md px-3 py-1 text-sm text-zinc-600">
          <Lock size={12} /> huzaifa.dev — Start Page
        </div>
        <Plus size={16} className="text-zinc-500" />
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        <h1 className="text-3xl font-semibold mb-6">Favorites</h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {bookmarks.map((b) => (
            <a
              key={b.name}
              href={b.url}
              target="_blank"
              rel="noreferrer"
              className="group"
            >
              <div className={`h-24 rounded-xl bg-gradient-to-br ${b.color} shadow-md transition-transform group-hover:scale-[1.03]`} />
              <div className="mt-2 text-sm text-center font-medium">{b.name}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

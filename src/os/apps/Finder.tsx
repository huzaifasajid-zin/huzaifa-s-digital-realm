import { useState } from "react";
import { ChevronLeft, ChevronRight, Search, Folder, FileText, Image as ImageIcon, Star, HardDrive, Download, Monitor } from "lucide-react";
import { projects, experience, skills, profile } from "../data/portfolio";
import { useOS } from "../store/os-store";
import clsx from "clsx";

type View = "about" | "experience" | "skills" | "contact" | "projects" | "work" | "certs" | "desktop" | "downloads" | "disk";

const sidebar: { group: string; items: { id: View; label: string; Icon: typeof Folder }[] }[] = [
  {
    group: "Favorites",
    items: [
      { id: "about", label: "About", Icon: Star },
      { id: "experience", label: "Experience", Icon: Star },
      { id: "skills", label: "Skills", Icon: Star },
      { id: "contact", label: "Contact", Icon: Star },
    ],
  },
  {
    group: "Folders",
    items: [
      { id: "projects", label: "Projects", Icon: Folder },
      { id: "work", label: "Work", Icon: Folder },
      { id: "certs", label: "Certifications", Icon: Folder },
    ],
  },
  {
    group: "System",
    items: [
      { id: "desktop", label: "Desktop", Icon: Monitor },
      { id: "downloads", label: "Downloads", Icon: Download },
      { id: "disk", label: "Macintosh HD", Icon: HardDrive },
    ],
  },
];

export function Finder({ initialView = "projects" }: { initialView?: View }) {
  const [view, setView] = useState<View>(initialView);
  const [history, setHistory] = useState<View[]>([initialView]);
  const [hi, setHi] = useState(0);
  const [openProject, setOpenProject] = useState<string | null>(null);

  const go = (v: View) => {
    const next = history.slice(0, hi + 1).concat(v);
    setHistory(next);
    setHi(next.length - 1);
    setView(v);
    setOpenProject(null);
  };
  const back = () => { if (hi > 0) { setHi(hi - 1); setView(history[hi - 1]); setOpenProject(null); } };
  const fwd = () => { if (hi < history.length - 1) { setHi(hi + 1); setView(history[hi + 1]); setOpenProject(null); } };

  return (
    <div className="h-full flex">
      <aside className="w-52 shrink-0 bg-black/30 border-r border-white/10 p-3 overflow-y-auto thin-scroll">
        {sidebar.map((g) => (
          <div key={g.group} className="mb-4">
            <div className="text-[11px] uppercase tracking-wider text-white/40 px-2 mb-1">{g.group}</div>
            {g.items.map((it) => (
              <button
                key={it.id}
                onClick={() => go(it.id)}
                className={clsx(
                  "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm hover:bg-white/10",
                  view === it.id && "bg-primary/80 text-white"
                )}
              >
                <it.Icon size={14} className="opacity-80" />
                <span>{it.label}</span>
              </button>
            ))}
          </div>
        ))}
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <div className="h-11 flex items-center gap-2 px-3 border-b border-white/10 bg-black/20">
          <button onClick={back} className="p-1 rounded hover:bg-white/10 disabled:opacity-30" disabled={hi === 0}>
            <ChevronLeft size={16} />
          </button>
          <button onClick={fwd} className="p-1 rounded hover:bg-white/10 disabled:opacity-30" disabled={hi >= history.length - 1}>
            <ChevronRight size={16} />
          </button>
          <div className="text-sm text-white/80 font-medium ml-2 capitalize">
            {openProject ? `Projects / ${projects.find(p => p.id === openProject)?.name}` : view}
          </div>
          <div className="ml-auto flex items-center gap-2 glass rounded-md px-2 py-1 text-xs text-white/70">
            <Search size={12} /> <span>Search</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto thin-scroll p-6">
          <FinderContent view={view} openProject={openProject} setOpenProject={setOpenProject} />
        </div>
      </div>
    </div>
  );
}

function FinderContent({ view, openProject, setOpenProject }: { view: View; openProject: string | null; setOpenProject: (s: string | null) => void }) {
  const openApp = useOS((s) => s.openApp);

  if (openProject) {
    const p = projects.find((x) => x.id === openProject)!;
    return (
      <div className="max-w-3xl mx-auto text-white/90">
        <div className={`h-44 rounded-xl bg-gradient-to-br ${p.cover} mb-5 shadow-xl`} />
        <h1 className="text-3xl font-semibold">{p.name}</h1>
        <p className="text-white/60 mt-1">{p.tagline}</p>
        <p className="mt-4 leading-relaxed text-white/80">{p.description}</p>
        <h3 className="mt-6 text-sm uppercase tracking-wider text-white/50">Tech</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {p.tech.map((t) => <span key={t} className="text-xs px-2 py-1 rounded-md bg-white/10">{t}</span>)}
        </div>
        <h3 className="mt-6 text-sm uppercase tracking-wider text-white/50">Highlights</h3>
        <ul className="mt-2 list-disc list-inside text-white/80 space-y-1">
          {p.highlights.map((h) => <li key={h}>{h}</li>)}
        </ul>
        <div className="mt-6 flex gap-3">
          {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium">Live demo</a>}
          {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-md bg-white/10 text-sm">GitHub</a>}
        </div>
      </div>
    );
  }

  if (view === "projects" || view === "work") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {projects.map((p) => (
          <button
            key={p.id}
            onClick={() => setOpenProject(p.id)}
            className="text-left group"
          >
            <div className={`h-28 rounded-lg bg-gradient-to-br ${p.cover} shadow-lg transition-transform group-hover:scale-[1.03]`} />
            <div className="mt-2 text-sm font-medium text-white/90">{p.name}</div>
            <div className="text-xs text-white/50">{p.tagline}</div>
          </button>
        ))}
      </div>
    );
  }
  if (view === "about") {
    return (
      <article className="max-w-2xl mx-auto prose prose-invert">
        <h1 className="text-3xl font-semibold">{profile.name}</h1>
        <p className="text-white/60">{profile.title}</p>
        <p className="mt-4 text-white/80 leading-relaxed">{profile.bio}</p>
        <div className="mt-6 flex gap-3">
          <button onClick={() => openApp("terminal")} className="px-3 py-2 rounded-md bg-white/10 text-sm">Open terminal</button>
          <button onClick={() => openApp("safari")} className="px-3 py-2 rounded-md bg-white/10 text-sm">Open Safari</button>
        </div>
      </article>
    );
  }
  if (view === "experience") {
    return (
      <div className="max-w-2xl mx-auto space-y-5">
        {experience.map((e) => (
          <div key={e.company} className="glass rounded-xl p-5">
            <div className="flex justify-between gap-3">
              <div>
                <div className="font-semibold text-white">{e.role}</div>
                <div className="text-sm text-white/60">{e.company}</div>
              </div>
              <div className="text-xs text-white/50 whitespace-nowrap">{e.duration}</div>
            </div>
            <ul className="mt-3 list-disc list-inside text-sm text-white/80 space-y-1">
              {e.bullets.map((b) => <li key={b}>{b}</li>)}
            </ul>
            <div className="mt-3 flex flex-wrap gap-2">
              {e.tech.map((t) => <span key={t} className="text-[11px] px-2 py-0.5 rounded bg-white/10">{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (view === "skills") {
    return (
      <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(skills).map(([k, v]) => (
          <div key={k} className="glass rounded-xl p-4">
            <div className="font-semibold mb-2">{k}</div>
            <div className="flex flex-wrap gap-2">
              {v.map((s) => <span key={s} className="text-xs px-2 py-1 rounded bg-white/10">{s}</span>)}
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (view === "contact") {
    return (
      <div className="max-w-md mx-auto glass rounded-xl p-6 space-y-3">
        <div><div className="text-xs text-white/50">Email</div><div>{profile.email}</div></div>
        <div><div className="text-xs text-white/50">GitHub</div><a href={profile.github} className="text-primary" target="_blank" rel="noreferrer">{profile.github}</a></div>
        <div><div className="text-xs text-white/50">LinkedIn</div><a href={profile.linkedin} className="text-primary" target="_blank" rel="noreferrer">{profile.linkedin}</a></div>
      </div>
    );
  }
  // empty system folders
  return (
    <div className="h-full flex flex-col items-center justify-center text-white/40">
      <Folder size={48} className="mb-3 opacity-50" />
      <div className="text-sm">This folder is empty.</div>
    </div>
  );
}

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { profile, projects, skills } from "../data/portfolio";

const banner = `Huzaifa OS [Version 1.0.0]
Type 'help' to see available commands.
`;

const commands: Record<string, () => string> = {
  help: () => `Available commands:
  about       — Bio and intro
  whoami      — Quick identity
  skills      — Tech stack
  projects    — List of projects
  resume      — Open resume
  contact     — Contact info
  clear       — Clear screen`,
  whoami: () => `${profile.name}\n${profile.title}`,
  about: () => profile.bio,
  skills: () => Object.entries(skills).map(([k, v]) => `${k}: ${v.join(", ")}`).join("\n"),
  projects: () => projects.map((p) => `• ${p.name} — ${p.tagline}`).join("\n"),
  resume: () => `Opening /resume.pdf — also available from the desktop.`,
  contact: () => `Email: ${profile.email}\nGitHub: ${profile.github}\nLinkedIn: ${profile.linkedin}`,
};

export function Terminal() {
  const [lines, setLines] = useState<string[]>([banner]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState<number>(-1);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [lines]);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const run = (raw: string) => {
    const cmd = raw.trim();
    const out: string[] = [`huzaifa@portfolio ~ % ${cmd}`];
    if (cmd === "clear") { setLines([]); return; }
    if (cmd.length === 0) { setLines((l) => [...l, out[0]]); return; }
    const fn = commands[cmd];
    out.push(fn ? fn() : `zsh: command not found: ${cmd}. Try 'help'.`);
    setLines((l) => [...l, ...out]);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      if (input.trim()) setHistory((h) => [...h, input]);
      setInput("");
      setHIdx(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const next = hIdx < 0 ? history.length - 1 : Math.max(0, hIdx - 1);
      setHIdx(next);
      setInput(history[next] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hIdx < 0) return;
      const next = hIdx + 1;
      if (next >= history.length) { setHIdx(-1); setInput(""); }
      else { setHIdx(next); setInput(history[next]); }
    }
  };

  return (
    <div
      className="h-full bg-black/80 font-mono text-[13px] text-emerald-300 p-4 overflow-y-auto thin-scroll"
      onClick={() => inputRef.current?.focus()}
    >
      {lines.map((l, i) => (
        <pre key={i} className="whitespace-pre-wrap text-white/90">{l}</pre>
      ))}
      <div className="flex items-center">
        <span className="text-emerald-400">huzaifa@portfolio ~ %&nbsp;</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          className="flex-1 bg-transparent outline-none text-white"
          spellCheck={false}
          autoComplete="off"
        />
      </div>
      <div ref={endRef} />
    </div>
  );
}

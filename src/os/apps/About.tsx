import { profile } from "../data/portfolio";
import { Github, Linkedin, Mail } from "lucide-react";

export function About() {
  return (
    <div className="h-full overflow-y-auto thin-scroll p-8">
      <div className="max-w-xl mx-auto text-center">
        <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gradient-to-br from-primary to-fuchsia-500 shadow-lg flex items-center justify-center text-3xl font-semibold">
          {profile.name.split(" ").map(n => n[0]).join("")}
        </div>
        <h1 className="text-2xl font-semibold">{profile.name}</h1>
        <div className="text-white/60">{profile.title}</div>
        <p className="mt-5 text-white/80 leading-relaxed text-left">{profile.bio}</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <a href={`mailto:${profile.email}`} className="px-3 py-2 rounded-md bg-white/10 text-sm flex items-center gap-2"><Mail size={14}/> Email</a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-md bg-white/10 text-sm flex items-center gap-2"><Github size={14}/> GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-md bg-white/10 text-sm flex items-center gap-2"><Linkedin size={14}/> LinkedIn</a>
        </div>
      </div>
    </div>
  );
}

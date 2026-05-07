import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MenuBar } from "@/os/components/MenuBar";
import { Dock } from "@/os/components/Dock";
import { Desktop } from "@/os/components/Desktop";
import { BootScreen } from "@/os/components/BootScreen";
import { WindowManager } from "@/os/components/Window";
import { Finder } from "@/os/apps/Finder";
import { Terminal } from "@/os/apps/Terminal";
import { Pictures } from "@/os/apps/Pictures";
import { Safari } from "@/os/apps/Safari";
import { About } from "@/os/apps/About";
import { Trash } from "@/os/apps/Trash";
import { Playground } from "@/os/apps/Playground";
import { Spotlight } from "@/os/components/Spotlight";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Huzaifa Sajid — macOS Portfolio" },
      { name: "description", content: "An interactive macOS-inspired portfolio by Huzaifa Sajid. Explore projects, experience and more inside a desktop OS in your browser." },
      { property: "og:title", content: "Huzaifa Sajid — macOS Portfolio" },
      { property: "og:description", content: "Step into a browser-based macOS desktop. The portfolio IS the operating system." },
    ],
  }),
  component: Index,
});

function Index() {
  const [booted, setBooted] = useState(false);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background text-foreground">
      <Desktop />
      <MenuBar />
      <WindowManager
        render={(w) => {
          switch (w.appId) {
            case "finder":
              return <Finder initialView={(w.payload?.view as any) || "projects"} />;
            case "terminal":
              return <Terminal />;
            case "pictures":
              return <Pictures />;
            case "safari":
              return <Safari />;
            case "about":
              return <About />;
            case "trash":
              return <Trash />;
            case "playground":
              return <Playground />;
          }
        }}
      />
      <Dock />
      <Spotlight />
      <AnimatePresence>
        {!booted && <BootScreen onDone={() => setBooted(true)} />}
      </AnimatePresence>
    </div>
  );
}

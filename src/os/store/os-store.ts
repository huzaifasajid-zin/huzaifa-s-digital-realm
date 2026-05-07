import { create } from "zustand";

export type AppId = "finder" | "terminal" | "pictures" | "safari" | "about" | "trash" | "playground";

export interface WindowState {
  id: string;
  appId: AppId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
  // optional payload for finder path etc.
  payload?: Record<string, unknown>;
}

interface OSState {
  windows: WindowState[];
  zCounter: number;
  bouncing: AppId | null;
  openApp: (appId: AppId, opts?: Partial<WindowState>) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindow: (id: string, patch: Partial<WindowState>) => void;
  toggleMinimize: (id: string) => void;
  toggleMaximize: (id: string) => void;
}

const defaultsForApp = (appId: AppId): Partial<WindowState> => {
  switch (appId) {
    case "finder":
      return { title: "Finder", width: 880, height: 560 };
    case "terminal":
      return { title: "Terminal — huzaifa@portfolio", width: 720, height: 460 };
    case "pictures":
      return { title: "Pictures", width: 820, height: 560 };
    case "safari":
      return { title: "Safari", width: 900, height: 600 };
    case "about":
      return { title: "About Me", width: 680, height: 520 };
    case "trash":
      return { title: "Trash", width: 700, height: 480 };
    case "playground":
      return { title: "Playground", width: 820, height: 560 };
  }
};

export const useOS = create<OSState>((set, get) => ({
  windows: [],
  zCounter: 10,
  bouncing: null,
  openApp: (appId, opts) => {
    const existing = get().windows.find((w) => w.appId === appId);
    if (existing) {
      get().focusWindow(existing.id);
      if (existing.minimized) get().updateWindow(existing.id, { minimized: false });
      return;
    }
    const z = get().zCounter + 1;
    const def = defaultsForApp(appId);
    const w: WindowState = {
      id: `${appId}-${Date.now()}`,
      appId,
      title: def.title || appId,
      x: 120 + Math.random() * 120,
      y: 80 + Math.random() * 60,
      width: def.width || 720,
      height: def.height || 480,
      zIndex: z,
      minimized: false,
      maximized: false,
      ...opts,
    };
    set({ windows: [...get().windows, w], zCounter: z, bouncing: appId });
    setTimeout(() => set({ bouncing: null }), 750);
  },
  closeWindow: (id) => set({ windows: get().windows.filter((w) => w.id !== id) }),
  focusWindow: (id) => {
    const z = get().zCounter + 1;
    set({
      zCounter: z,
      windows: get().windows.map((w) => (w.id === id ? { ...w, zIndex: z, minimized: false } : w)),
    });
  },
  updateWindow: (id, patch) =>
    set({ windows: get().windows.map((w) => (w.id === id ? { ...w, ...patch } : w)) }),
  toggleMinimize: (id) =>
    set({
      windows: get().windows.map((w) => (w.id === id ? { ...w, minimized: !w.minimized } : w)),
    }),
  toggleMaximize: (id) =>
    set({
      windows: get().windows.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)),
    }),
}));

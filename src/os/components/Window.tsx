import { Rnd } from "react-rnd";
import { motion, AnimatePresence } from "framer-motion";
import { useOS, type WindowState } from "../store/os-store";
import clsx from "clsx";
import type { ReactNode } from "react";

export function Window({ win, children }: { win: WindowState; children: ReactNode }) {
  const { focusWindow, closeWindow, toggleMinimize, toggleMaximize, updateWindow } = useOS();
  if (win.minimized) return null;

  const size = win.maximized
    ? { width: window.innerWidth, height: window.innerHeight - 90 }
    : { width: win.width, height: win.height };
  const pos = win.maximized ? { x: 0, y: 28 } : { x: win.x, y: win.y };

  return (
    <Rnd
      size={size}
      position={pos}
      minWidth={420}
      minHeight={300}
      bounds="parent"
      dragHandleClassName="window-drag-handle"
      onDragStart={() => focusWindow(win.id)}
      onMouseDown={() => focusWindow(win.id)}
      onDragStop={(_, d) => updateWindow(win.id, { x: d.x, y: d.y })}
      onResizeStop={(_, __, ref, ___, position) =>
        updateWindow(win.id, {
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
          x: position.x,
          y: position.y,
        })
      }
      style={{ zIndex: win.zIndex }}
      disableDragging={win.maximized}
      enableResizing={!win.maximized}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className="w-full h-full rounded-xl overflow-hidden glass-strong shadow-2xl shadow-black/20 flex flex-col"
      >
        <div className="window-drag-handle h-9 px-3 flex items-center gap-2 border-b border-black/10 bg-white/40">
          <button
            onClick={() => closeWindow(win.id)}
            className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110"
            aria-label="Close"
          />
          <button
            onClick={() => toggleMinimize(win.id)}
            className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-110"
            aria-label="Minimize"
          />
          <button
            onClick={() => toggleMaximize(win.id)}
            className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-110"
            aria-label="Maximize"
          />
          <div className="flex-1 text-center text-xs text-foreground/70 font-medium no-select">{win.title}</div>
          <div className="w-12" />
        </div>
        <div className="flex-1 min-h-0 text-foreground">{children}</div>
      </motion.div>
    </Rnd>
  );
}

export function WindowManager({ render }: { render: (win: WindowState) => ReactNode }) {
  const windows = useOS((s) => s.windows);
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className={clsx("absolute inset-0 pointer-events-auto")}>
        <AnimatePresence>
          {windows.map((w) => (
            <Window key={w.id} win={w}>
              {render(w)}
            </Window>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

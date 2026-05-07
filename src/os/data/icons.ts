import type { AppId } from "../store/os-store";

export const appIcons: Record<AppId | "file" | "folder" | "pdf", string> = {
  finder: "/icons/finder.png",
  terminal: "/icons/terminal.png",
  pictures: "/icons/pictures.png",
  safari: "/icons/safari.png",
  about: "/icons/file.png",
  trash: "/icons/trash.png",
  playground: "/icons/file.png",
  file: "/icons/file.png",
  folder: "/icons/folder.png",
  pdf: "/icons/pdf.png",
};
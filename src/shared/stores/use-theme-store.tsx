import { create, type StateCreator } from "zustand";

export type Theme = "dark" | "light" | "system";

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const storageKey = "vite-ui-theme";
const getSystemTheme = (): Theme =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "system";
  return (localStorage.getItem(storageKey) as Theme) || "system";
};

export const useThemeStore = create<ThemeStore>(((
  set: (partial: Partial<ThemeStore>) => void
) => ({
  theme: getInitialTheme(),
  setTheme: (theme: Theme) => {
    localStorage.setItem(storageKey, theme);
    set({ theme });
  },
})) as StateCreator<ThemeStore>);

export function useTheme() {
  const theme = useThemeStore((s: ThemeStore) => s.theme);
  const setTheme = useThemeStore((s: ThemeStore) => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    let appliedTheme = theme;
    if (theme === "system") {
      appliedTheme = getSystemTheme();
    }
    root.classList.add(appliedTheme);
    return s.setTheme;
  });
  return { theme, setTheme };
}

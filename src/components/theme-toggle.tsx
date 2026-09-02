import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";
const STORAGE_KEY = "gm-theme";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const next: Theme = stored === "light" || stored === "dark" ? stored : "dark";
    setTheme(next);
    applyTheme(next);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
      className="grid size-10 shrink-0 place-items-center rounded-full border border-border bg-surface text-foreground transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}

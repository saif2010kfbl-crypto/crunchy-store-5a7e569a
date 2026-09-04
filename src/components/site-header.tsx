import { Link } from "@tanstack/react-router";
import { Search, Gamepad2 } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

type Props = {
  query?: string;
  onQueryChange?: (value: string) => void;
};

const navLinks = [
  { to: "/", label: "الرئيسية" },
  { to: "/games", label: "الألعاب" },
  { to: "/sold", label: "تم بيعها" },
] as const;

export function SiteHeader({ query, onQueryChange }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-6xl px-4 py-3">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <Link
            to="/"
            className="flex min-w-0 items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-2xl bg-surface-2 text-foreground">
              <Gamepad2 className="size-4" />
            </span>
            <span className="truncate text-lg font-extrabold tracking-tight">Crunchy Store</span>
          </Link>
          <ThemeToggle />
        </div>

        {onQueryChange && (
          <div className="relative mt-3">
            <Search className="pointer-events-none absolute top-1/2 start-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="ابحث عن لعبة أو منتج…"
              aria-label="بحث"
              className="h-11 w-full rounded-full border border-border bg-surface ps-10 pe-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        )}

        <nav className="mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              className="shrink-0 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[status=active]:bg-surface-2 data-[status=active]:font-bold data-[status=active]:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

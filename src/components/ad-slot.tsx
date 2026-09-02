import { Megaphone } from "lucide-react";
import type { Announcement } from "@/data/catalog";

/** Admin-managed announcement space. Data comes from the ads table later. */
export function AdSlot({ announcement }: { announcement?: Announcement }) {
  if (!announcement || !announcement.active) return null;

  return (
    <section
      aria-label="إعلان"
      className="rounded-3xl border border-border bg-surface p-4 sm:p-5 card-glow"
    >
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-2 text-foreground">
          <Megaphone className="size-4" />
        </span>
        <div className="min-w-0">
          <h2 className="truncate text-sm font-bold">{announcement.title}</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{announcement.body}</p>
        </div>
      </div>
    </section>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { ProductCard } from "@/components/product-card";
import { products, sections } from "@/data/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/games")({
  head: () => ({
    meta: [
      { title: "الألعاب — Game Market" },
      {
        name: "description",
        content: "أقسام الألعاب: PUBG Mobile، Free Fire، الشحن، والاشتراكات.",
      },
      { property: "og:title", content: "الألعاب — Game Market" },
      { property: "og:description", content: "تصفح المنتجات حسب القسم في متجر Game Market." },
    ],
  }),
  component: GamesPage,
});

function GamesPage() {
  // Sections are demo data now; later they come from an admin-managed table
  // (create / edit / delete / reorder) with the same shape.
  const ordered = useMemo(() => [...sections].sort((a, b) => a.order - b.order), []);
  const [active, setActive] = useState(ordered[0]?.slug ?? "");

  const current = ordered.find((s) => s.slug === active);
  const list = products.filter((p) => p.sectionSlug === active && p.status === "available");

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl space-y-5 px-4 py-6 pb-16">
        <h1 className="text-xl font-extrabold tracking-tight">الألعاب</h1>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {ordered.map((section) => (
            <button
              key={section.slug}
              type="button"
              onClick={() => setActive(section.slug)}
              className={cn(
                "shrink-0 rounded-full border border-border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                section.slug === active
                  ? "bg-surface-2 font-bold text-foreground"
                  : "text-muted-foreground hover:bg-surface",
              )}
            >
              {section.name}
            </button>
          ))}
        </div>

        {current && <p className="text-sm text-muted-foreground">{current.tagline}</p>}

        {list.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            لا توجد منتجات في هذا القسم حاليًا.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {list.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

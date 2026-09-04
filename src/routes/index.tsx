import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { AdSlot } from "@/components/ad-slot";
import { ProductCard } from "@/components/product-card";
import { announcements, products } from "@/data/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Crunchy Store — متجر حسابات وشحن الألعاب" },
      {
        name: "description",
        content: "متجر عربي لحسابات الألعاب وبطاقات الشحن والاشتراكات مع تسليم سريع وآمن.",
      },
      { property: "og:title", content: "Crunchy Store — متجر حسابات وشحن الألعاب" },
      {
        property: "og:description",
        content: "تصفح حسابات PUBG Mobile و Free Fire وباقات الشحن والاشتراكات.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const available = products.filter((p) => p.status === "available");
    if (!q) return available;
    return available.filter(
      (p) => p.title.toLowerCase().includes(q) || p.gameType.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader query={query} onQueryChange={setQuery} />

      <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6 pb-16">
        <h1 className="sr-only">Crunchy Store — متجر الألعاب</h1>
        <AdSlot announcement={announcements.find((a) => a.active)} />

        <section aria-label="المنتجات">
          {list.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted-foreground">لا توجد نتائج مطابقة.</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
              {list.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

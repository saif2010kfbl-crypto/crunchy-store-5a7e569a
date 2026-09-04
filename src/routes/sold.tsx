import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { ProductCard } from "@/components/product-card";
import { products } from "@/data/catalog";

export const Route = createFileRoute("/sold")({
  head: () => ({
    meta: [
      { title: "تم بيعها — Crunchy Store" },
      { name: "description", content: "أرشيف المنتجات التي تم بيعها في متجر Crunchy Store." },
      { property: "og:title", content: "تم بيعها — Crunchy Store" },
      { property: "og:description", content: "منتجات مباعة لم تعد متاحة للشراء." },
    ],
  }),
  component: SoldPage,
});

function SoldPage() {
  const list = products.filter((p) => p.status === "sold");

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl space-y-5 px-4 py-6 pb-16">
        <h1 className="text-xl font-extrabold tracking-tight">تم بيعها</h1>

        {list.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            لا توجد منتجات مباعة بعد.
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

import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Pencil, Search } from "lucide-react";
import { AdminCard, AdminPageHeader, EmptyState } from "@/components/admin/admin-shell";
import {
  adminProducts,
  adminSections,
  productStatusLabels,
  type AdminProductStatus,
} from "@/data/admin-mock";

export const Route = createFileRoute("/admin/products")({
  component: AdminProducts,
});

const statusStyles: Record<AdminProductStatus, string> = {
  available: "bg-share text-share-foreground",
  pending: "bg-buy text-buy-foreground",
  sold: "bg-sold text-sold-foreground",
};

function AdminProducts() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<AdminProductStatus | "all">("all");
  const [section, setSection] = useState<string>("all");

  const filtered = useMemo(
    () =>
      adminProducts.filter((p) => {
        if (status !== "all" && p.status !== status) return false;
        if (section !== "all" && p.sectionSlug !== section) return false;
        if (query && !`${p.title} ${p.gameType}`.includes(query)) return false;
        return true;
      }),
    [query, status, section],
  );

  return (
    <>
      <AdminPageHeader
        title="إدارة المنتجات"
        description="بحث وفلترة وإضافة وتعديل. المعرف الداخلي (#111) يظهر هنا فقط ولا يُعرض للمستخدم."
        action={
          <Link
            to="/admin/products/$id"
            params={{ id: "new" }}
            className="inline-flex items-center gap-1.5 rounded-full bg-buy px-4 py-2 text-sm font-bold text-buy-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Plus className="size-4" /> إضافة منتج
          </Link>
        }
      />

      <AdminCard>
        <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 start-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث باسم المنتج…"
              aria-label="بحث في المنتجات"
              className="h-10 w-full rounded-full border border-border bg-surface-2 ps-9 pe-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as AdminProductStatus | "all")}
            aria-label="فلترة حسب الحالة"
            className="h-10 rounded-full border border-border bg-surface-2 px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="all">كل الحالات</option>
            <option value="available">متوفر</option>
            <option value="pending">قيد الطلب</option>
            <option value="sold">تم البيع</option>
          </select>
          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            aria-label="فلترة حسب القسم"
            className="h-10 rounded-full border border-border bg-surface-2 px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="all">كل الأقسام</option>
            {adminSections.map((s) => (
              <option key={s.id} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </AdminCard>

      {filtered.length === 0 ? (
        <EmptyState title="لا توجد منتجات مطابقة" hint="جرّب تغيير الفلاتر أو إضافة منتج جديد." />
      ) : (
        <ul className="space-y-2">
          {filtered.map((p) => (
            <li key={p.id}>
              <AdminCard className="flex flex-wrap items-center gap-3">
                <img
                  src={p.media.find((m) => m.kind === "image")?.url}
                  alt=""
                  className="size-14 shrink-0 rounded-2xl object-cover"
                  loading="lazy"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{p.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {p.gameType} · {p.price}
                    {p.currency} · معرف داخلي {p.internalRef}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-bold ${statusStyles[p.status]}`}
                >
                  {productStatusLabels[p.status]}
                </span>
                <Link
                  to="/admin/products/$id"
                  params={{ id: p.id }}
                  aria-label={`تعديل ${p.title}`}
                  className="grid size-9 place-items-center rounded-full border border-border bg-surface-2 text-foreground transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Pencil className="size-4" />
                </Link>
              </AdminCard>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

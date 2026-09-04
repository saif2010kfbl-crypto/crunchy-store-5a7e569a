import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { AdminCard, AdminPageHeader } from "@/components/admin/admin-shell";
import { adminAds, type AdminAd } from "@/data/admin-mock";

export const Route = createFileRoute("/admin/ads")({
  component: AdminAds,
});

const fieldClass =
  "h-10 w-full rounded-2xl border border-border bg-surface-2 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";

function AdminAds() {
  const [ads, setAds] = useState<AdminAd[]>(adminAds);

  const update = (id: string, patch: Partial<AdminAd>) =>
    setAds((list) => list.map((a) => (a.id === id ? { ...a, ...patch } : a)));

  const remove = (id: string) => {
    if (!window.confirm("حذف هذا الإعلان؟")) return;
    setAds((list) => list.filter((a) => a.id !== id));
  };

  const add = () =>
    setAds((list) => [
      ...list,
      { id: `ad-${Date.now()}`, title: "إعلان جديد", body: "", active: false },
    ]);

  return (
    <>
      <AdminPageHeader
        title="الإعلانات"
        description="إعلانات إدارية تظهر في الصفحة الرئيسية. لا علاقة لها بإعلانات Google."
        action={
          <button
            type="button"
            onClick={add}
            className="inline-flex items-center gap-1.5 rounded-full bg-buy px-4 py-2 text-sm font-bold text-buy-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Plus className="size-4" /> إنشاء إعلان
          </button>
        }
      />

      <ul className="space-y-3">
        {ads.map((a) => (
          <li key={a.id}>
            <AdminCard className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <input
                  value={a.title}
                  onChange={(e) => update(a.id, { title: e.target.value })}
                  aria-label="عنوان الإعلان"
                  className={`${fieldClass} flex-1`}
                />
                <button
                  type="button"
                  onClick={() => update(a.id, { active: !a.active })}
                  className={`rounded-full px-3 py-1.5 text-[11px] font-bold ${
                    a.active ? "bg-share text-share-foreground" : "bg-surface-2 text-muted-foreground"
                  }`}
                >
                  {a.active ? "ظاهر" : "موقوف"}
                </button>
                <button
                  type="button"
                  onClick={() => remove(a.id)}
                  aria-label={`حذف ${a.title}`}
                  className="grid size-9 place-items-center rounded-full bg-sold text-sold-foreground transition-opacity hover:opacity-90"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
              <textarea
                value={a.body}
                onChange={(e) => update(a.id, { body: e.target.value })}
                aria-label="نص الإعلان"
                rows={3}
                className="w-full rounded-2xl border border-border bg-surface-2 px-3 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <div className="grid gap-2 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-xs text-muted-foreground">
                    يبدأ في (اختياري)
                  </span>
                  <input
                    type="date"
                    value={a.startsAt ?? ""}
                    onChange={(e) => update(a.id, { startsAt: e.target.value || undefined })}
                    className={fieldClass}
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs text-muted-foreground">
                    ينتهي في (اختياري)
                  </span>
                  <input
                    type="date"
                    value={a.endsAt ?? ""}
                    onChange={(e) => update(a.id, { endsAt: e.target.value || undefined })}
                    className={fieldClass}
                  />
                </label>
              </div>
            </AdminCard>
          </li>
        ))}
      </ul>
    </>
  );
}

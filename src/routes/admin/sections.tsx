import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { AdminCard, AdminPageHeader } from "@/components/admin/admin-shell";
import { adminSections, type AdminSection } from "@/data/admin-mock";

export const Route = createFileRoute("/admin/sections")({
  component: AdminSections,
});

const fieldClass =
  "h-10 w-full rounded-2xl border border-border bg-surface-2 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";

function AdminSections() {
  const [sections, setSections] = useState<AdminSection[]>(
    [...adminSections].sort((a, b) => a.order - b.order),
  );

  const update = (id: string, patch: Partial<AdminSection>) =>
    setSections((list) => list.map((s) => (s.id === id ? { ...s, ...patch } : s)));

  const remove = (id: string) => {
    if (!window.confirm("حذف هذا القسم؟ المنتجات المرتبطة به ستحتاج قسمًا آخر.")) return;
    setSections((list) => list.filter((s) => s.id !== id));
  };

  const add = () =>
    setSections((list) => [
      ...list,
      {
        id: `s-${Date.now()}`,
        slug: `section-${list.length + 1}`,
        name: "قسم جديد",
        tagline: "",
        order: list.length + 1,
        active: true,
      },
    ]);

  return (
    <>
      <AdminPageHeader
        title="الأقسام"
        description="إدارة أقسام الألعاب والخدمات وترتيب ظهورها في الواجهة العامة."
        action={
          <button
            type="button"
            onClick={add}
            className="inline-flex items-center gap-1.5 rounded-full bg-buy px-4 py-2 text-sm font-bold text-buy-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Plus className="size-4" /> إضافة قسم
          </button>
        }
      />

      <ul className="space-y-2">
        {sections.map((s) => (
          <li key={s.id}>
            <AdminCard className="grid items-center gap-2 sm:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)_auto_auto_auto]">
              <span className="text-xs font-bold text-muted-foreground">#{s.order}</span>
              <input
                value={s.name}
                onChange={(e) => update(s.id, { name: e.target.value })}
                aria-label="اسم القسم"
                className={fieldClass}
              />
              <input
                value={s.tagline}
                onChange={(e) => update(s.id, { tagline: e.target.value })}
                aria-label="وصف القسم"
                placeholder="وصف قصير"
                className={fieldClass}
              />
              <input
                type="number"
                min={1}
                value={s.order}
                onChange={(e) => update(s.id, { order: Number(e.target.value) })}
                aria-label="ترتيب الظهور"
                className={`${fieldClass} w-20`}
              />
              <button
                type="button"
                onClick={() => update(s.id, { active: !s.active })}
                className={`rounded-full px-3 py-1.5 text-[11px] font-bold ${
                  s.active ? "bg-share text-share-foreground" : "bg-surface-2 text-muted-foreground"
                }`}
              >
                {s.active ? "مفعّل" : "موقوف"}
              </button>
              <button
                type="button"
                onClick={() => remove(s.id)}
                aria-label={`حذف ${s.name}`}
                className="grid size-9 place-items-center rounded-full bg-sold text-sold-foreground transition-opacity hover:opacity-90"
              >
                <Trash2 className="size-4" />
              </button>
            </AdminCard>
          </li>
        ))}
      </ul>
    </>
  );
}

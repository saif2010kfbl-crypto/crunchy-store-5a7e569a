import { Link, createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ImagePlus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { AdminCard, AdminPageHeader } from "@/components/admin/admin-shell";
import {
  adminProducts,
  adminSections,
  productStatusLabels,
  type AdminProduct,
  type MediaItem,
} from "@/data/admin-mock";

export const Route = createFileRoute("/admin/products/$id")({
  loader: ({ params }) => {
    if (params.id === "new") return { product: null };
    const product = adminProducts.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  component: AdminProductEdit,
});

const fieldClass =
  "h-11 w-full rounded-2xl border border-border bg-surface-2 px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";

function AdminProductEdit() {
  const { product } = Route.useLoaderData();
  const navigate = useNavigate();
  const isNew = !product;

  const [form, setForm] = useState<AdminProduct>(
    product ?? {
      id: "new",
      internalRef: "(يُنشأ تلقائيًا)",
      slug: "",
      title: "",
      sectionSlug: adminSections[0]?.slug ?? "",
      gameType: "",
      price: 0,
      currency: "$",
      productType: "حساب",
      transferMethod: "",
      purchaseMethods: [],
      description: "",
      status: "available",
      media: [],
      ownerAccountName: "",
      internalNotes: "",
      createdAt: new Date().toISOString(),
    },
  );
  const [saved, setSaved] = useState(false);

  const set = <K extends keyof AdminProduct>(key: K, value: AdminProduct[K]) => {
    setSaved(false);
    setForm((f) => ({ ...f, [key]: value }));
  };

  const moveMedia = (id: string, dir: -1 | 1) => {
    const items = [...form.media].sort((a, b) => a.order - b.order);
    const idx = items.findIndex((m) => m.id === id);
    const target = idx + dir;
    if (idx < 0 || target < 0 || target >= items.length) return;
    [items[idx], items[target]] = [items[target], items[idx]];
    set(
      "media",
      items.map((m, i) => ({ ...m, order: i + 1 })),
    );
  };

  const removeMedia = (id: string) => {
    if (!window.confirm("حذف هذه الوسيلة من المعرض؟")) return;
    set(
      "media",
      form.media
        .filter((m) => m.id !== id)
        .sort((a, b) => a.order - b.order)
        .map((m, i) => ({ ...m, order: i + 1 })),
    );
  };

  const addMediaPlaceholder = (kind: MediaItem["kind"]) => {
    // Stage 3 placeholder: real upload arrives with the backend stage.
    const item: MediaItem = {
      id: `m-${Date.now()}`,
      kind,
      url:
        kind === "image"
          ? `https://picsum.photos/seed/gm-new-${form.media.length}/800/600`
          : "https://cdn.example.com/demo/new-clip.mp4",
      order: form.media.length + 1,
    };
    set("media", [...form.media, item]);
  };

  const togglePurchaseMethod = (method: string) => {
    set(
      "purchaseMethods",
      form.purchaseMethods.includes(method)
        ? form.purchaseMethods.filter((m) => m !== method)
        : [...form.purchaseMethods, method],
    );
  };

  const onSave = () => {
    // UI-only stage: nothing is persisted yet.
    setSaved(true);
  };

  const onMarkSold = () => {
    set("status", "sold");
    setSaved(true);
  };

  const onDelete = () => {
    if (!window.confirm("حذف هذا المنتج نهائيًا؟ لا يمكن التراجع.")) return;
    navigate({ to: "/admin/products" });
  };

  const purchaseOptions = ["الدفع عند التواصل", "Zain Cash", "صور بطاقة الرصيد", "كود بطاقة الرصيد"];

  return (
    <>
      <AdminPageHeader
        title={isNew ? "إضافة منتج" : `تعديل: ${form.title}`}
        description={`الحالة الحالية: ${productStatusLabels[form.status]} · المعرف الداخلي ${form.internalRef} (إداري فقط)`}
        action={
          <Link
            to="/admin/products"
            aria-label="رجوع للمنتجات"
            className="grid size-10 place-items-center rounded-full border border-border bg-surface transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowRight className="size-5" />
          </Link>
        }
      />

      <AdminCard>
        <h2 className="text-base font-extrabold tracking-tight">الوسائط (صور وفيديو)</h2>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[...form.media]
            .sort((a, b) => a.order - b.order)
            .map((m) => (
              <div
                key={m.id}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface-2"
              >
                {m.kind === "image" ? (
                  <img src={m.url} alt="" className="aspect-square w-full object-cover" />
                ) : (
                  <video src={m.url} className="aspect-square w-full object-cover" muted />
                )}
                <span className="absolute top-2 start-2 rounded-full bg-background/80 px-2 py-0.5 text-[10px] font-bold">
                  {m.kind === "image" ? "صورة" : "فيديو"} · {m.order}
                </span>
                <div className="absolute inset-x-1 bottom-1 flex justify-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => moveMedia(m.id, -1)}
                    aria-label="تقديم"
                    className="grid size-7 place-items-center rounded-full bg-background/85"
                  >
                    <ChevronUp className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveMedia(m.id, 1)}
                    aria-label="تأخير"
                    className="grid size-7 place-items-center rounded-full bg-background/85"
                  >
                    <ChevronDown className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeMedia(m.id)}
                    aria-label="حذف الوسيلة"
                    className="grid size-7 place-items-center rounded-full bg-sold text-sold-foreground"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            ))}
          <button
            type="button"
            onClick={() => addMediaPlaceholder("image")}
            className="grid aspect-square place-items-center rounded-2xl border border-dashed border-border text-xs text-muted-foreground transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="flex flex-col items-center gap-1">
              <ImagePlus className="size-5" /> إضافة صورة
            </span>
          </button>
          <button
            type="button"
            onClick={() => addMediaPlaceholder("video")}
            className="grid aspect-square place-items-center rounded-2xl border border-dashed border-border text-xs text-muted-foreground transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="flex flex-col items-center gap-1">
              <ImagePlus className="size-5" /> إضافة فيديو
            </span>
          </button>
        </div>
      </AdminCard>

      <AdminCard className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs text-muted-foreground">اسم المنتج</span>
          <input
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs text-muted-foreground">اللعبة / القسم</span>
          <select
            value={form.sectionSlug}
            onChange={(e) => set("sectionSlug", e.target.value)}
            className={fieldClass}
          >
            {adminSections.map((s) => (
              <option key={s.id} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs text-muted-foreground">السعر</span>
          <input
            type="number"
            min={0}
            value={form.price}
            onChange={(e) => set("price", Number(e.target.value))}
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs text-muted-foreground">نوع المنتج</span>
          <input
            value={form.productType}
            onChange={(e) => set("productType", e.target.value)}
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs text-muted-foreground">طريقة التحويل</span>
          <input
            value={form.transferMethod}
            onChange={(e) => set("transferMethod", e.target.value)}
            className={fieldClass}
          />
        </label>
        <fieldset>
          <legend className="mb-1 text-xs text-muted-foreground">طرق الشراء المتاحة</legend>
          <div className="flex flex-wrap gap-2">
            {purchaseOptions.map((m) => (
              <label
                key={m}
                className="flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs"
              >
                <input
                  type="checkbox"
                  checked={form.purchaseMethods.includes(m)}
                  onChange={() => togglePurchaseMethod(m)}
                />
                {m}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="block sm:col-span-2">
          <span className="mb-1 block text-xs text-muted-foreground">الوصف</span>
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            rows={4}
            className="w-full rounded-2xl border border-border bg-surface-2 px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </label>
      </AdminCard>

      {/* INTERNAL fields — never sent to the public payload. */}
      <AdminCard className="grid gap-3 sm:grid-cols-2">
        <h2 className="text-base font-extrabold tracking-tight sm:col-span-2">
          بيانات داخلية سرية (لا تظهر للمستخدم)
        </h2>
        <label className="block">
          <span className="mb-1 block text-xs text-muted-foreground">اسم صاحب الحساب</span>
          <input
            value={form.ownerAccountName}
            onChange={(e) => set("ownerAccountName", e.target.value)}
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs text-muted-foreground">نقاط / ملاحظات داخلية</span>
          <input
            value={form.internalNotes}
            onChange={(e) => set("internalNotes", e.target.value)}
            className={fieldClass}
          />
        </label>
      </AdminCard>

      {saved && (
        <p className="rounded-full bg-share px-4 py-2 text-center text-xs font-bold text-share-foreground">
          تم الحفظ (تجريبي — سيُخزّن فعليًا بعد ربط قاعدة البيانات)
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onSave}
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          حفظ
        </button>
        {form.status !== "sold" && (
          <button
            type="button"
            onClick={onMarkSold}
            className="rounded-full bg-buy px-5 py-2.5 text-sm font-bold text-buy-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            نقل إلى تم البيع
          </button>
        )}
        <button
          type="button"
          onClick={onDelete}
          className="rounded-full bg-sold px-5 py-2.5 text-sm font-bold text-sold-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          حذف المنتج
        </button>
      </div>
    </>
  );
}

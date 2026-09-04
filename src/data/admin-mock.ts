/**
 * Admin mock data (Stage 3 — UI only).
 *
 * Everything here is demo data kept deliberately separate from the UI so it can
 * be swapped for real server queries later. Fields marked INTERNAL never belong
 * in a public payload (see src/data/catalog.ts `PublicProduct`).
 */

export type AdminProductStatus = "available" | "pending" | "sold";

export const productStatusLabels: Record<AdminProductStatus, string> = {
  available: "متوفر",
  pending: "قيد الطلب",
  sold: "تم البيع",
};

export type MediaKind = "image" | "video";

export type MediaItem = {
  id: string;
  kind: MediaKind;
  url: string;
  /** Order inside the gallery; lower shows first. */
  order: number;
};

export type AdminProduct = {
  id: string;
  /** INTERNAL reference (e.g. "#111"). Never rendered publicly. */
  internalRef: string;
  /** Public identifier used in share links. */
  slug: string;
  title: string;
  sectionSlug: string;
  gameType: string;
  price: number;
  currency: string;
  productType: string;
  transferMethod: string;
  purchaseMethods: string[];
  description: string;
  status: AdminProductStatus;
  media: MediaItem[];
  /** INTERNAL: owner of the account being sold. */
  ownerAccountName: string;
  /** INTERNAL: points / private notes for admins only. */
  internalNotes: string;
  createdAt: string;
};

export type AdminSection = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  order: number;
  active: boolean;
};

export type OrderStatus = "new" | "in_progress" | "completed" | "cancelled";

export const orderStatusLabels: Record<OrderStatus, string> = {
  new: "جديد",
  in_progress: "قيد المعالجة",
  completed: "مكتمل",
  cancelled: "ملغي",
};

export type PaymentMethodId = "zain_cash" | "on_contact" | "card_images" | "card_code";

export const paymentMethodLabels: Record<PaymentMethodId, string> = {
  zain_cash: "Zain Cash",
  on_contact: "الدفع عند التواصل",
  card_images: "صور بطاقة الرصيد",
  card_code: "كود بطاقة الرصيد",
};

export type AdminOrder = {
  id: string;
  productTitle: string;
  productSlug: string;
  price: number;
  currency: string;
  /** Telegram identity arrives from the bot later. */
  buyerName: string;
  telegramUsername?: string;
  telegramUserId?: string;
  paymentMethod: PaymentMethodId;
  /** Uploaded balance-card images (multiple allowed). */
  receiptImages: string[];
  /** Balance-card code if the buyer typed one. */
  cardCode?: string;
  status: OrderStatus;
  createdAt: string;
  note?: string;
};

export type PaymentMethod = {
  id: PaymentMethodId;
  name: string;
  description: string;
  enabled: boolean;
  /** Only Zain Cash uses transfer details. */
  transferDetails?: string;
};

export type AdminAd = {
  id: string;
  title: string;
  body: string;
  active: boolean;
  startsAt?: string;
  endsAt?: string;
};

export type ModeratorRole = "owner" | "deputy" | "moderator";

export const roleLabels: Record<ModeratorRole, string> = {
  owner: "Owner",
  deputy: "Deputy",
  moderator: "Moderator",
};

export type PermissionKey =
  | "products"
  | "orders"
  | "sections"
  | "ads"
  | "payments"
  | "moderators"
  | "activity"
  | "settings";

export const permissionLabels: Record<PermissionKey, string> = {
  products: "إدارة المنتجات",
  orders: "إدارة الطلبات",
  sections: "إدارة الأقسام",
  ads: "إدارة الإعلانات",
  payments: "طرق الدفع",
  moderators: "إدارة المشرفين",
  activity: "عرض سجل الإدارة",
  settings: "الإعدادات والحماية",
};

export type Moderator = {
  id: string;
  displayName: string;
  /** Site identity must match the Telegram user ID later. */
  telegramUserId: string;
  telegramUsername: string;
  role: ModeratorRole;
  permissions: PermissionKey[];
  active: boolean;
  addedAt: string;
};

export type ActivityEntry = {
  id: string;
  at: string;
  actorName: string;
  actorRole: ModeratorRole;
  action: string;
  target: string;
  details: string;
};

const img = (n: number) => `https://picsum.photos/seed/gm-${n}/800/600`;

export const adminProducts: AdminProduct[] = [
  {
    id: "p-111",
    internalRef: "#111",
    slug: "pubg-conqueror-a7",
    title: "حساب ببجي كونكرر",
    sectionSlug: "pubg-mobile",
    gameType: "PUBG Mobile",
    price: 240,
    currency: "$",
    productType: "حساب",
    transferMethod: "تحويل كامل عبر البريد",
    purchaseMethods: ["الدفع عند التواصل", "Zain Cash"],
    description: "حساب مستوى كونكرر مع أسلحة نادرة وسكنات مميزة، بدون أي حظر سابق.",
    status: "available",
    media: [
      { id: "m1", kind: "image", url: img(1), order: 1 },
      { id: "m2", kind: "image", url: img(2), order: 2 },
      { id: "m3", kind: "video", url: "https://cdn.example.com/demo/pubg-clip.mp4", order: 3 },
    ],
    ownerAccountName: "أحمد ك.",
    internalNotes: "نقاط الحساب: 4200 — البريد جاهز للتسليم.",
    createdAt: "2026-08-21T10:12:00Z",
  },
  {
    id: "p-112",
    internalRef: "#112",
    slug: "pubg-uc-660",
    title: "شحن 660 شدة",
    sectionSlug: "topup",
    gameType: "PUBG Mobile",
    price: 9,
    currency: "$",
    productType: "شحن",
    transferMethod: "شحن مباشر بالـ ID",
    purchaseMethods: ["Zain Cash", "كود بطاقة الرصيد"],
    description: "شحن فوري بالمعرّف بدون تسليم كلمة المرور.",
    status: "pending",
    media: [{ id: "m4", kind: "image", url: img(3), order: 1 }],
    ownerAccountName: "المخزون الداخلي",
    internalNotes: "التنفيذ خلال 10 دقائق.",
    createdAt: "2026-08-24T08:40:00Z",
  },
  {
    id: "p-113",
    internalRef: "#113",
    slug: "free-fire-elite-vault",
    title: "حساب فري فاير نخبة",
    sectionSlug: "free-fire",
    gameType: "Free Fire",
    price: 130,
    currency: "$",
    productType: "حساب",
    transferMethod: "تحويل عبر البريد",
    purchaseMethods: ["الدفع عند التواصل"],
    description: "شخصيات مفتوحة وسكنات موسمية نادرة مع بريد قابل للنقل.",
    status: "available",
    media: [
      { id: "m5", kind: "image", url: img(4), order: 1 },
      { id: "m6", kind: "image", url: img(5), order: 2 },
    ],
    ownerAccountName: "مالك خاص",
    internalNotes: "نقاط: 1800.",
    createdAt: "2026-08-19T15:05:00Z",
  },
  {
    id: "p-116",
    internalRef: "#116",
    slug: "pubg-mythic-collector",
    title: "حساب ببجي جامع الأساطير",
    sectionSlug: "pubg-mobile",
    gameType: "PUBG Mobile",
    price: 480,
    currency: "$",
    productType: "حساب",
    transferMethod: "تحويل كامل عبر البريد",
    purchaseMethods: ["الدفع عند التواصل"],
    description: "مجموعة أزياء أسطورية كاملة.",
    status: "sold",
    media: [{ id: "m7", kind: "image", url: img(6), order: 1 }],
    ownerAccountName: "مالك خاص",
    internalNotes: "تم التسليم والتأكيد.",
    createdAt: "2026-07-30T12:00:00Z",
  },
  {
    id: "p-118",
    internalRef: "#118",
    slug: "season-bundle-gold",
    title: "باقة الموسم الذهبية",
    sectionSlug: "subscriptions",
    gameType: "اشتراكات",
    price: 40,
    currency: "$",
    productType: "اشتراك",
    transferMethod: "تفعيل على الحساب",
    purchaseMethods: ["Zain Cash", "صور بطاقة الرصيد"],
    description: "باقة موسمية تجمع نقاط الاشتراك ومكافآت الشحن.",
    status: "available",
    media: [{ id: "m8", kind: "image", url: img(7), order: 1 }],
    ownerAccountName: "المخزون الداخلي",
    internalNotes: "مرتبطة بعرض نهاية الأسبوع.",
    createdAt: "2026-08-26T09:20:00Z",
  },
];

export const adminSections: AdminSection[] = [
  {
    id: "s1",
    slug: "pubg-mobile",
    name: "PUBG Mobile",
    tagline: "حسابات وشحن ببجي",
    order: 1,
    active: true,
  },
  { id: "s2", slug: "free-fire", name: "Free Fire", tagline: "حسابات فري فاير", order: 2, active: true },
  { id: "s3", slug: "topup", name: "الشحن", tagline: "شدات وجواهر وعملات", order: 3, active: true },
  {
    id: "s4",
    slug: "subscriptions",
    name: "الاشتراكات",
    tagline: "اشتراكات وباقات",
    order: 4,
    active: false,
  },
];

export const adminOrders: AdminOrder[] = [
  {
    id: "o-2041",
    productTitle: "حساب ببجي كونكرر",
    productSlug: "pubg-conqueror-a7",
    price: 240,
    currency: "$",
    buyerName: "مشتري تجريبي",
    telegramUsername: "@buyer_one",
    telegramUserId: "704112233",
    paymentMethod: "on_contact",
    receiptImages: [],
    status: "new",
    createdAt: "2026-09-02T18:44:00Z",
    note: "يريد التسليم مساءً.",
  },
  {
    id: "o-2040",
    productTitle: "شحن 660 شدة",
    productSlug: "pubg-uc-660",
    price: 9,
    currency: "$",
    buyerName: "مشتري تجريبي 2",
    telegramUsername: "@buyer_two",
    telegramUserId: "704998877",
    paymentMethod: "card_code",
    receiptImages: [],
    cardCode: "ASIA-4429-1183-0056",
    status: "in_progress",
    createdAt: "2026-09-02T12:10:00Z",
  },
  {
    id: "o-2039",
    productTitle: "باقة الموسم الذهبية",
    productSlug: "season-bundle-gold",
    price: 40,
    currency: "$",
    buyerName: "مشتري تجريبي 3",
    paymentMethod: "card_images",
    receiptImages: [img(11), img(12), img(13)],
    status: "new",
    createdAt: "2026-09-01T20:02:00Z",
  },
  {
    id: "o-2035",
    productTitle: "حساب ببجي جامع الأساطير",
    productSlug: "pubg-mythic-collector",
    price: 480,
    currency: "$",
    buyerName: "مشتري تجريبي 4",
    telegramUsername: "@buyer_four",
    paymentMethod: "zain_cash",
    receiptImages: [img(14)],
    status: "completed",
    createdAt: "2026-08-28T09:31:00Z",
  },
];

export const paymentMethods: PaymentMethod[] = [
  {
    id: "zain_cash",
    name: "Zain Cash",
    description: "تحويل عبر محفظة Zain Cash مع إرسال إشعار التحويل.",
    enabled: true,
    transferDetails: "الاسم: Crunchy Store\nالرقم: 07800000000",
  },
  {
    id: "on_contact",
    name: "الدفع عند التواصل",
    description: "يتم الاتفاق على الدفع مباشرة أثناء التواصل مع الإدارة.",
    enabled: true,
  },
  {
    id: "card_images",
    name: "الدفع برفع صور بطاقة الرصيد",
    description: "يرفع المشتري صورة أو أكثر لبطاقات الرصيد.",
    enabled: true,
  },
  {
    id: "card_code",
    name: "الدفع بإدخال كود بطاقة الرصيد",
    description: "يُدخل المشتري كود البطاقة نصيًا.",
    enabled: false,
  },
];

export const adminAds: AdminAd[] = [
  {
    id: "ad-1",
    title: "عروض نهاية الأسبوع",
    body: "خصم على باقات الشحن حتى يوم الجمعة. التسليم فوري بعد تأكيد الطلب.",
    active: true,
    startsAt: "2026-09-01",
    endsAt: "2026-09-06",
  },
  {
    id: "ad-2",
    title: "حسابات جديدة قريبًا",
    body: "دفعة جديدة من حسابات PUBG Mobile ستضاف هذا الأسبوع.",
    active: false,
  },
];

export const moderators: Moderator[] = [
  {
    id: "u-1",
    displayName: "المالك الرئيسي",
    telegramUserId: "700111222",
    telegramUsername: "@gm_owner",
    role: "owner",
    permissions: [
      "products",
      "orders",
      "sections",
      "ads",
      "payments",
      "moderators",
      "activity",
      "settings",
    ],
    active: true,
    addedAt: "2026-06-01T10:00:00Z",
  },
  {
    id: "u-2",
    displayName: "نائب الإدارة",
    telegramUserId: "700333444",
    telegramUsername: "@gm_deputy",
    role: "deputy",
    permissions: ["products", "orders", "sections", "ads", "payments", "activity"],
    active: true,
    addedAt: "2026-06-14T10:00:00Z",
  },
  {
    id: "u-3",
    displayName: "مشرف الطلبات",
    telegramUserId: "700555666",
    telegramUsername: "@gm_mod1",
    role: "moderator",
    permissions: ["orders", "products"],
    active: true,
    addedAt: "2026-07-02T10:00:00Z",
  },
  {
    id: "u-4",
    displayName: "مشرف المحتوى",
    telegramUserId: "700777888",
    telegramUsername: "@gm_mod2",
    role: "moderator",
    permissions: ["ads", "sections"],
    active: false,
    addedAt: "2026-08-11T10:00:00Z",
  },
];

export const activityLog: ActivityEntry[] = [
  {
    id: "a-1",
    at: "2026-09-03T08:12:00Z",
    actorName: "المالك الرئيسي",
    actorRole: "owner",
    action: "تعديل منتج",
    target: "#111 حساب ببجي كونكرر",
    details: "تغيير السعر من 260 إلى 240",
  },
  {
    id: "a-2",
    at: "2026-09-02T19:02:00Z",
    actorName: "نائب الإدارة",
    actorRole: "deputy",
    action: "تغيير حالة إلى تم البيع",
    target: "#116 حساب ببجي جامع الأساطير",
    details: "بعد تأكيد استلام المبلغ",
  },
  {
    id: "a-3",
    at: "2026-09-02T15:40:00Z",
    actorName: "مشرف الطلبات",
    actorRole: "moderator",
    action: "تحديث طلب",
    target: "o-2040",
    details: "نقل الطلب إلى قيد المعالجة",
  },
  {
    id: "a-4",
    at: "2026-09-01T11:22:00Z",
    actorName: "المالك الرئيسي",
    actorRole: "owner",
    action: "تعديل طريقة دفع",
    target: "كود بطاقة الرصيد",
    details: "إيقاف الطريقة مؤقتًا",
  },
  {
    id: "a-5",
    at: "2026-08-30T09:15:00Z",
    actorName: "المالك الرئيسي",
    actorRole: "owner",
    action: "إضافة مشرف",
    target: "@gm_mod2",
    details: "صلاحيات: الإعلانات، الأقسام",
  },
  {
    id: "a-6",
    at: "2026-08-29T17:05:00Z",
    actorName: "نائب الإدارة",
    actorRole: "deputy",
    action: "تعديل إعلان",
    target: "عروض نهاية الأسبوع",
    details: "تحديث النص وتاريخ الانتهاء",
  },
];

export function formatDateTime(iso: string) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("ar", {
    dateStyle: "short",
    timeStyle: "short",
    numberingSystem: "latn",
  }).format(d);
}

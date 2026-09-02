/**
 * Local demo catalog.
 *
 * SECURITY / DATA BOUNDARY
 * ------------------------
 * `internalRef` (e.g. "#111"), owner name, in-game points and any credential
 * live ONLY in `InternalProductRecord` and must never leave the server or be
 * rendered. Public UI consumes `PublicProduct` exclusively, keyed by `slug`.
 * When the database is added, the mapping below becomes the server-side
 * projection (SELECT of public columns only).
 */

import pubgImg from "@/assets/game-pubg.jpg";
import freeFireImg from "@/assets/game-freefire.jpg";
import topupImg from "@/assets/game-topup.jpg";
import subsImg from "@/assets/game-subs.jpg";

export type ProductStatus = "available" | "sold";

export type PublicProduct = {
  /** Stable public identifier used in URLs and share links. */
  slug: string;
  title: string;
  /** Game / product type shown on the card, e.g. "PUBG Mobile". */
  gameType: string;
  sectionSlug: string;
  price: number;
  currency: string;
  status: ProductStatus;
  images: string[];
  /** Delivery / transfer method, e.g. "تحويل بريد اللعبة". */
  transferMethod: string;
  /** Purchase method, e.g. "تواصل عبر تيليجرام". */
  purchaseMethod: string;
  description: string;
};

/** Server-only shape. Never serialized to the client. */
export type InternalProductRecord = PublicProduct & {
  internalRef: string;
  ownerAccountName: string;
  accountPoints: number;
};

export type Section = {
  slug: string;
  name: string;
  tagline: string;
  /** Sections are admin-managed later; order drives the tabs. */
  order: number;
};

export const sections: Section[] = [
  { slug: "pubg-mobile", name: "PUBG Mobile", tagline: "حسابات وشحن ببجي", order: 1 },
  { slug: "free-fire", name: "Free Fire", tagline: "حسابات فري فاير", order: 2 },
  { slug: "topup", name: "الشحن", tagline: "شدات وجواهر وعملات", order: 3 },
  { slug: "subscriptions", name: "الاشتراكات", tagline: "اشتراكات وباقات", order: 4 },
];

const internalCatalog: InternalProductRecord[] = [
  {
    slug: "pubg-conqueror-a7",
    internalRef: "#111",
    ownerAccountName: "حساب داخلي محجوب",
    accountPoints: 4200,
    title: "حساب ببجي كونكرر",
    gameType: "PUBG Mobile",
    sectionSlug: "pubg-mobile",
    price: 240,
    currency: "$",
    status: "available",
    images: [pubgImg, topupImg, subsImg],
    transferMethod: "تحويل كامل عبر البريد",
    purchaseMethod: "طلب عبر تيليجرام",
    description:
      "حساب مستوى كونكرر مع مجموعة أسلحة نادرة وسكنات مميزة. الحساب نظيف بدون أي حظر سابق، ويتم تسليم البريد الأساسي بالكامل مع إمكانية تغيير جميع البيانات بعد الشراء.",
  },
  {
    slug: "pubg-uc-660",
    internalRef: "#112",
    ownerAccountName: "حساب داخلي محجوب",
    accountPoints: 0,
    title: "شحن 660 شدة",
    gameType: "PUBG Mobile",
    sectionSlug: "topup",
    price: 9,
    currency: "$",
    status: "available",
    images: [topupImg, pubgImg],
    transferMethod: "شحن مباشر بالـ ID",
    purchaseMethod: "طلب عبر تيليجرام",
    description:
      "شحن فوري لرصيد الشدات باستخدام معرّف اللاعب فقط، بدون الحاجة لتسليم كلمة المرور. التنفيذ خلال دقائق بعد تأكيد الطلب.",
  },
  {
    slug: "free-fire-elite-vault",
    internalRef: "#113",
    ownerAccountName: "حساب داخلي محجوب",
    accountPoints: 1800,
    title: "حساب فري فاير نخبة",
    gameType: "Free Fire",
    sectionSlug: "free-fire",
    price: 130,
    currency: "$",
    status: "available",
    images: [freeFireImg, subsImg, topupImg],
    transferMethod: "تحويل عبر البريد",
    purchaseMethod: "طلب عبر تيليجرام",
    description:
      "حساب فري فاير بمجموعة شخصيات مفتوحة وسكنات موسمية نادرة، مربوط ببريد قابل للنقل بالكامل إلى المشتري.",
  },
  {
    slug: "free-fire-diamonds-1080",
    internalRef: "#114",
    ownerAccountName: "حساب داخلي محجوب",
    accountPoints: 0,
    title: "1080 جوهرة",
    gameType: "Free Fire",
    sectionSlug: "topup",
    price: 12,
    currency: "$",
    status: "available",
    images: [topupImg, freeFireImg],
    transferMethod: "شحن مباشر بالـ ID",
    purchaseMethod: "طلب عبر تيليجرام",
    description: "شحن جواهر فوري بالمعرّف، آمن وبدون بيانات دخول.",
  },
  {
    slug: "premium-pass-90",
    internalRef: "#115",
    ownerAccountName: "حساب داخلي محجوب",
    accountPoints: 0,
    title: "اشتراك بريميوم 90 يوم",
    gameType: "اشتراكات",
    sectionSlug: "subscriptions",
    price: 25,
    currency: "$",
    status: "available",
    images: [subsImg, topupImg],
    transferMethod: "تفعيل على الحساب",
    purchaseMethod: "طلب عبر تيليجرام",
    description: "اشتراك بريميوم لمدة ثلاثة أشهر مع مزايا موسمية ومكافآت يومية.",
  },
  {
    slug: "pubg-mythic-collector",
    internalRef: "#116",
    ownerAccountName: "حساب داخلي محجوب",
    accountPoints: 9100,
    title: "حساب ببجي جامع الأساطير",
    gameType: "PUBG Mobile",
    sectionSlug: "pubg-mobile",
    price: 480,
    currency: "$",
    status: "sold",
    images: [pubgImg, subsImg],
    transferMethod: "تحويل كامل عبر البريد",
    purchaseMethod: "طلب عبر تيليجرام",
    description: "حساب نادر بمجموعة أزياء أسطورية كاملة. تم بيعه.",
  },
  {
    slug: "free-fire-starter",
    internalRef: "#117",
    ownerAccountName: "حساب داخلي محجوب",
    accountPoints: 300,
    title: "حساب فري فاير مبتدئ",
    gameType: "Free Fire",
    sectionSlug: "free-fire",
    price: 35,
    currency: "$",
    status: "sold",
    images: [freeFireImg],
    transferMethod: "تحويل عبر البريد",
    purchaseMethod: "طلب عبر تيليجرام",
    description: "حساب بداية بسعر مناسب. تم بيعه.",
  },
  {
    slug: "season-bundle-gold",
    internalRef: "#118",
    ownerAccountName: "حساب داخلي محجوب",
    accountPoints: 0,
    title: "باقة الموسم الذهبية",
    gameType: "اشتراكات",
    sectionSlug: "subscriptions",
    price: 40,
    currency: "$",
    status: "available",
    images: [subsImg, pubgImg, freeFireImg],
    transferMethod: "تفعيل على الحساب",
    purchaseMethod: "طلب عبر تيليجرام",
    description: "باقة موسمية تجمع بين نقاط الاشتراك ومكافآت الشحن بسعر مخفّض.",
  },
  {
    slug: "pubg-uc-1800",
    internalRef: "#119",
    ownerAccountName: "حساب داخلي محجوب",
    accountPoints: 0,
    title: "شحن 1800 شدة",
    gameType: "PUBG Mobile",
    sectionSlug: "topup",
    price: 22,
    currency: "$",
    status: "available",
    images: [topupImg],
    transferMethod: "شحن مباشر بالـ ID",
    purchaseMethod: "طلب عبر تيليجرام",
    description: "حزمة شحن متوسطة مع مكافأة إضافية عند أول عملية.",
  },
];

/** Strips every internal/secret field. This is the only client-facing shape. */
function toPublic(record: InternalProductRecord): PublicProduct {
  const { internalRef: _ref, ownerAccountName: _owner, accountPoints: _pts, ...rest } = record;
  return rest;
}

export const products: PublicProduct[] = internalCatalog.map(toPublic);

export function getProductBySlug(slug: string): PublicProduct | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(slug: string, limit = 6): PublicProduct[] {
  const current = getProductBySlug(slug);
  if (!current) return products.slice(0, limit);
  const sameSection = products.filter(
    (p) => p.slug !== slug && p.sectionSlug === current.sectionSlug,
  );
  const others = products.filter((p) => p.slug !== slug && p.sectionSlug !== current.sectionSlug);
  return [...sameSection, ...others].slice(0, limit);
}

export function formatPrice(product: Pick<PublicProduct, "price" | "currency">) {
  return `${product.price}${product.currency}`;
}

/** Admin-managed later; shape kept stable for the future ads table. */
export type Announcement = {
  id: string;
  title: string;
  body: string;
  active: boolean;
};

export const announcements: Announcement[] = [
  {
    id: "ann-1",
    title: "عروض نهاية الأسبوع",
    body: "خصم على باقات الشحن حتى يوم الجمعة. التسليم فوري بعد تأكيد الطلب.",
    active: true,
  },
];

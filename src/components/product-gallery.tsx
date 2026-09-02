import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  images: string[];
  title: string;
};

export function ProductGallery({ images, title }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const scrollTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(i, track.children.length - 1));
    const child = track.children[clamped] as HTMLElement | undefined;
    if (child) track.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
  }, []);

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const width = track.clientWidth || 1;
    const next = Math.round(Math.abs(track.scrollLeft) / width);
    setIndex(Math.max(0, Math.min(next, images.length - 1)));
  };

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoomed(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomed]);

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface card-glow">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="flex w-full snap-x snap-mandatory overflow-x-auto no-scrollbar"
        >
          {images.map((src, i) => (
            <div key={src + i} className="w-full shrink-0 snap-center">
              <img
                src={src}
                alt={`${title} — صورة ${i + 1}`}
                width={1024}
                height={1024}
                className="aspect-square w-full object-cover"
              />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="الصورة السابقة"
              onClick={() => scrollTo(index - 1)}
              className="absolute top-1/2 start-2 grid size-8 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronRight className="size-4" />
            </button>
            <button
              type="button"
              aria-label="الصورة التالية"
              onClick={() => scrollTo(index + 1)}
              className="absolute top-1/2 end-2 grid size-8 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronLeft className="size-4" />
            </button>
          </>
        )}

        <button
          type="button"
          aria-label="تكبير الصورة"
          onClick={() => setZoomed(true)}
          className="absolute bottom-2 end-2 grid size-9 place-items-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Expand className="size-4" />
        </button>
      </div>

      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2">
          {images.map((src, i) => (
            <button
              key={`dot-${src}-${i}`}
              type="button"
              aria-label={`عرض الصورة ${i + 1}`}
              aria-current={i === index}
              onClick={() => scrollTo(i)}
              className={cn(
                "h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                i === index ? "w-6 bg-foreground" : "w-2 bg-muted-foreground/40",
              )}
            />
          ))}
        </div>
      )}

      {zoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="عرض مكبّر"
          onClick={() => setZoomed(false)}
          className="fixed inset-0 z-50 grid place-items-center bg-background/95 p-4 animate-in fade-in"
        >
          <img
            src={images[index]}
            alt={`${title} — عرض مكبّر`}
            className="max-h-[85vh] w-auto max-w-full rounded-2xl object-contain"
          />
          <button
            type="button"
            aria-label="إغلاق"
            className="absolute top-4 end-4 grid size-10 place-items-center rounded-full border border-border bg-surface text-foreground"
            onClick={() => setZoomed(false)}
          >
            <X className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}

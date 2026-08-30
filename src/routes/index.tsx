import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { img as resolveImg, onImgError } from "../lib/site-images";
import { HashtagSection } from "../components/TikTokSections";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { GEN_MEMBER_COUNTS } from "../lib/site-config";
import { useI18n } from "../lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Five Fail Family - Beranda" },
      { name: "description", content: "Marga editor & kreator anime. Selalu open member." },
      { property: "og:title", content: "Five Fail Family" },
      { property: "og:description", content: "Marga editor & kreator anime." },
    ],
  }),
  component: Index,
});

const RAW_IMAGES = [
  "https://cdn.nekohime.site/file/1cnw6mmj.png",
  "https://cdn.nekohime.site/file/nntkcmr6.png",
  "https://cdn.nekohime.site/file/89zjqlrw.png",
];

const genImages = RAW_IMAGES.map(resolveImg);

const memberCounts = GEN_MEMBER_COUNTS;

function Index() {
  const { t } = useI18n();
  const [slide, setSlide] = useState(0);
  const [loaded, setLoaded] = useState<boolean[]>(genImages.map(() => false));
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const gens = t.home.gens;

  const handleLoad = (i: number) => {
    setLoaded((prev) => {
      const next = [...prev];
      next[i] = true;
      return next;
    });
  };

  const allLoaded = loaded.every(Boolean);

  const startTimer = () => {
    timerRef.current = setInterval(() => setSlide((s) => (s + 1) % genImages.length), 4500);
  };

  useEffect(() => {
    if (!allLoaded) return;
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [allLoaded]);

  const goToSlide = (i: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setSlide(i);
    startTimer();
  };

  return (
    <main className="mx-auto max-w-6xl px-4 pb-24">
      {/* Hero */}
      <section className="pt-16 pb-16 text-center md:pt-24">
        <div className="mb-8 flex justify-center gap-3">
          {genImages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={gens[i]?.title ?? `Gen ${i + 1}`}
              className="h-20 w-20 rounded-2xl object-cover shadow-2xl ring-1 ring-border md:h-24 md:w-24"
              style={{
                transform: `translateY(${i === 1 ? "-8px" : "0"}) rotate(${(i - 1) * 4}deg)`,
              }}
              loading="eager"
              decoding="sync"
              onError={onImgError}
            />
          ))}
        </div>
        <span className="chip">{t.home.badge}</span>
        <h1 className="font-display mt-5 text-4xl font-bold tracking-tight md:text-6xl">
          Five Fail Family
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{t.home.heroDesc}</p>
        <div className="mt-7 flex justify-center gap-3">
          <a href="#konten" className="btn-ghost inline-flex items-center gap-2">
            {t.common.explore}
          </a>
          <Link to="/join" className="btn-primary inline-flex items-center gap-2">
            {t.common.joinNow}
          </Link>
        </div>
      </section>

      {/* Slider */}
      <section id="konten" className="glass-card p-6 md:p-10">
        <div
          aria-hidden="true"
          style={{ position: "absolute", width: 0, height: 0, overflow: "hidden", pointerEvents: "none" }}
        >
          {genImages.map((src, i) => (
            <img
              key={`preload-${i}`}
              src={src}
              alt=""
              width={224}
              height={224}
              onLoad={() => handleLoad(i)}
              onError={() => handleLoad(i)}
            />
          ))}
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex"
            style={{
              transform: `translateX(-${slide * 100}%)`,
              transition: allLoaded
                ? "transform 600ms cubic-bezier(0.4, 0, 0.2, 1)"
                : "none",
              willChange: "transform",
            }}
          >
            {gens.map((g, i) => (
              <div
                key={g.title}
                className="flex min-w-full flex-col items-center gap-6 md:flex-row"
              >
                <img
                  src={genImages[i]}
                  alt={g.title}
                  className="h-40 w-40 rounded-2xl object-cover ring-1 ring-border md:h-56 md:w-56"
                  loading="eager"
                  decoding="sync"
                  onError={onImgError}
                />
                <div className="text-center md:text-left">
                  <p className="text-accent-soft text-xs tracking-widest uppercase">{g.tag}</p>
                  <h2 className="mt-1 text-2xl font-bold md:text-3xl">{g.title}</h2>
                  <p className="mt-2 max-w-md text-muted-foreground">{g.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {gens.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === slide ? "w-8 bg-accent" : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-16">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">{t.home.statsTitle}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{t.home.statsDesc}</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {memberCounts.map((m) => (
            <div key={m.gen} className="glass-card glass-card-hover p-6 text-center">
              <p className="font-display text-4xl font-bold">
                <AnimatedCounter value={m.count} />
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {m.gen} · {t.common.members}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link to="/join" className="btn-primary">
            {t.common.joinNow}
          </Link>
        </div>
      </section>

      {/* Hashtags (live via TikTok public API) */}
      <HashtagSection />

      <footer className="mt-20 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Five Fail Family ·{" "}
        <a
          href="https://www.tiktok.com/@inishinjirs"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-foreground underline-offset-4 hover:underline hover:text-accent transition-colors"
        >
          {t.home.footer}
        </a>
      </footer>
    </main>
  );
}

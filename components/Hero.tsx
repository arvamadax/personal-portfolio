"use client";
import { DownloadSimple, ArrowRight } from "@phosphor-icons/react";
import { Magnetic } from "./Motion";
import { TLink } from "./TLink";
import { PROFILE } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { btn, i, link, wrap } from "@/lib/ui";

export function Hero() {
  const { t } = useLang();
  return (
    <div className={`${wrap} grid items-center gap-10 py-10 md:min-h-[calc(100dvh-8rem)] md:grid-cols-[1.2fr_0.8fr] md:gap-12 md:py-14`}>
      <div>
        <h1 className="rise max-w-[14ch] text-5xl font-semibold leading-[1.02] tracking-tighter md:text-7xl">{t.hero.title}</h1>
        <p className="rise mt-6 max-w-[46ch] text-lg leading-relaxed text-muted" style={i(1)}>{t.hero.sub}</p>
        <div className="rise mt-10 flex flex-wrap items-center gap-3" style={i(2)}>
          <Magnetic>
            <a href={PROFILE.cv} target="_blank" rel="noopener" className={btn.primary}>
              <DownloadSimple size={18} aria-hidden /> {t.hero.cv}
            </a>
          </Magnetic>
          <Magnetic>
            <TLink href="/work" className={btn.secondary}>
              {t.hero.work} <ArrowRight size={16} aria-hidden />
            </TLink>
          </Magnetic>
          {/* aksi ketiga bergaya teks: tetap satu primer + satu sekunder */}
          <TLink href="/contact" className={`ml-2 text-sm ${link}`}>{t.hero.contact}</TLink>
        </div>
      </div>
      <div className="order-first md:order-none md:justify-self-end">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/profile.jpg"
          alt={t.hero.photo}
          width={918}
          height={917}
          fetchPriority="high"
          className="wipe aspect-square w-40 rounded-ui border border-line object-cover md:aspect-[4/5] md:w-full md:max-w-sm"
        />
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { ArrowUpRight, Check, Copy, DownloadSimple, EnvelopeSimple, GithubLogo, InstagramLogo, LinkedinLogo, MapPin, WhatsappLogo } from "@phosphor-icons/react";
import { PROFILE } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { btn, i, link, page, wrap } from "@/lib/ui";
import { Magnetic } from "./Motion";

const SOCIAL = [
  { label: "Instagram", href: PROFILE.instagram, Icon: InstagramLogo },
  { label: "LinkedIn", href: PROFILE.linkedin, Icon: LinkedinLogo },
  { label: "WhatsApp", href: PROFILE.whatsapp, Icon: WhatsappLogo },
  { label: "GitHub", href: PROFILE.github, Icon: GithubLogo },
];

// Kanal di halaman Kontak: handle yang terlihat + nilai yang disalin (kalau ada).
const CHANNELS = [
  { key: "email", label: "Email", handle: PROFILE.email, href: `mailto:${PROFILE.email}`, copy: PROFILE.email, Icon: EnvelopeSimple },
  { key: "whatsapp", label: "WhatsApp", handle: PROFILE.whatsappNumber, href: PROFILE.whatsapp, copy: PROFILE.whatsappNumber, Icon: WhatsappLogo },
  { key: "linkedin", label: "LinkedIn", handle: "in/arvamadax", href: PROFILE.linkedin, Icon: LinkedinLogo },
  { key: "instagram", label: "Instagram", handle: "@bambangdexplorer", href: PROFILE.instagram, Icon: InstagramLogo },
  { key: "github", label: "GitHub", handle: "arvamadax", href: PROFILE.github, Icon: GithubLogo },
] as const;

export function Contact() {
  const { t } = useLang();
  const c = t.contact;
  const [copied, setCopied] = useState("");

  const salin = async (key: string, v: string) => {
    try {
      await navigator.clipboard.writeText(v);
      setCopied(key);
      setTimeout(() => setCopied((k) => (k === key ? "" : k)), 1600);
    } catch {} // clipboard ditolak: handle tetap terlihat dan bisa diseleksi manual
  };

  return (
    <div className={`${page} grid gap-12 lg:grid-cols-12 lg:items-center lg:min-h-[calc(100dvh-8rem)]`}>
      <div className="lg:col-span-5">
        <h1 className="rise text-5xl font-semibold tracking-tighter md:text-6xl">{c.title}</h1>
        <p className="rise mt-5 text-lg text-muted" style={i(1)}>{c.sub}</p>
        <div className="rise mt-6 space-y-4 leading-relaxed text-muted" style={i(2)}>
          {c.body.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
        </div>
        <p className="rise mt-6 flex items-center gap-2 text-sm text-muted" style={i(3)}>
          <MapPin size={16} aria-hidden /> {c.based}
        </p>
        <div className="rise mt-8 flex flex-wrap items-center gap-3" style={i(4)}>
          <Magnetic>
            <a href={`mailto:${PROFILE.email}`} className={btn.primary}>
              <EnvelopeSimple size={18} aria-hidden /> {c.email}
            </a>
          </Magnetic>
          <a href={PROFILE.cv} target="_blank" rel="noopener" className={`ml-2 inline-flex items-center gap-1.5 text-sm ${link}`}>
            <DownloadSimple size={16} aria-hidden /> {c.cv}
          </a>
        </div>
      </div>

      <section className="rise lg:col-span-7" style={i(2)} aria-labelledby="kanal">
        <h2 id="kanal" className="text-sm font-medium">{c.channels}</h2>
        <ul className="mt-4 divide-y divide-line overflow-hidden rounded-ui border border-line bg-surface">
          {CHANNELS.map(({ key, label, handle, href, Icon, ...x }, n) => (
            <li key={key} className="rise group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-bg" style={i(3 + n)}>
              <span className="grid size-10 shrink-0 place-items-center rounded-ui border border-line bg-bg text-muted transition-colors group-hover:text-ink">
                <Icon size={20} aria-hidden />
              </span>
              <a href={href} target={key === "email" ? undefined : "_blank"} rel="noopener" className="min-w-0 flex-1">
                <span className="flex flex-wrap items-baseline gap-x-3">
                  <span className="text-sm font-medium">{label}</span>
                  <span className="truncate font-mono text-sm text-muted group-hover:text-accent">{handle}</span>
                </span>
                <span className="mt-0.5 block text-xs text-muted">{c.use[key]}</span>
              </a>
              {"copy" in x && (
                <button type="button" onClick={() => salin(key, x.copy)} aria-label={`${c.copy} ${label}`}
                  className="grid size-9 shrink-0 place-items-center rounded-ui text-muted transition-colors hover:bg-line/60 hover:text-ink">
                  {copied === key ? <Check size={16} className="text-accent" aria-hidden /> : <Copy size={16} aria-hidden />}
                </button>
              )}
              <a href={href} target={key === "email" ? undefined : "_blank"} rel="noopener" aria-label={`${c.open} ${label}`}
                className="grid size-9 shrink-0 place-items-center rounded-ui text-muted transition-[color,transform] hover:text-ink group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                <ArrowUpRight size={16} aria-hidden />
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-3 min-h-5 text-xs text-muted" role="status">{copied ? c.copied : ""}</p>
      </section>
    </div>
  );
}

// Ikon profil juga di footer kanan bawah (semua halaman).
export function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-line">
      <div className={`${wrap} flex items-center justify-between gap-4 py-3 text-xs text-muted`}>
        <p>&copy; {new Date().getFullYear()} Arva Mada Jayastu</p>
        <ul className="flex items-center gap-1" aria-label={t.footer.social}>
          {SOCIAL.map(({ label, href, Icon }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener" aria-label={label} title={label}
                className="grid size-9 place-items-center rounded-ui transition-colors hover:bg-line/60 hover:text-ink">
                <Icon size={18} aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

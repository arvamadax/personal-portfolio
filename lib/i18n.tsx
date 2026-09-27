"use client";
// Bahasa EN/ID tanpa URL terpisah: pilihan disimpan di localStorage, awalnya ikut bahasa browser.
// HTML statis dirender dalam bahasa Inggris; pengunjung berbahasa ID melihat kedip EN sesaat saat
// kunjungan pertama.
import { createContext, useContext, useEffect, useState } from "react";
import { DICT, type Dict, type Lang } from "./content";

type Ctx = { lang: Lang; t: Dict; setLang: (l: Lang) => void };
const LangCtx = createContext<Ctx>({ lang: "en", t: DICT.en, setLang: () => {} });

function awal(): Lang {
  try {
    const v = localStorage.getItem("lang");
    if (v === "en" || v === "id") return v;
  } catch {}
  return navigator.language?.toLowerCase().startsWith("id") ? "id" : "en";
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setL] = useState<Lang>("en");

  useEffect(() => {
    const l = awal();
    setL(l);
    document.documentElement.lang = l;
  }, []);

  const setLang = (l: Lang) => {
    setL(l);
    document.documentElement.lang = l;
    try { localStorage.setItem("lang", l); } catch {}
  };

  return <LangCtx.Provider value={{ lang, t: DICT[lang], setLang }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);

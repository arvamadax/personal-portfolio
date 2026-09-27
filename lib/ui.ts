// Kelas yang dipakai di banyak komponen. Satu sistem sudut: rounded-ui (4px).
const base = "inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-ui px-5 text-sm font-medium transition-colors active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50";

export const btn = {
  primary: `${base} bg-ink text-bg hover:bg-accent hover:text-on-accent`,
  secondary: `${base} border border-line text-ink hover:border-ink`,
};

export const wrap = "mx-auto w-full max-w-6xl px-4 md:px-8";
/** Isi satu halaman (tab). */
export const page = `${wrap} py-10 md:py-14`;
export const h1 = "text-3xl font-semibold tracking-tighter md:text-5xl";
export const link = "underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent";

/** style={{"--i": n}} untuk urutan .rise */
export const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

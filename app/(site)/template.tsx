// template (bukan layout) dipasang ulang tiap pindah tab → animasi .page jalan untuk halaman baru.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page">{children}</div>;
}

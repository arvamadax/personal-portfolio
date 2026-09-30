// Di luar (site): presentasi layar penuh, tanpa Nav/Terminal/Footer. URL tetap di bawah /archive.
import type { Metadata } from "next";
import { Anton, Archivo, Archivo_Black, Barlow, Fira_Sans, IBM_Plex_Mono, Montserrat, Newsreader, Poppins, Share_Tech_Mono, VT323 } from "next/font/google";
import { MenagihJanjiNegara } from "@/components/MenagihJanjiNegara";

// Di-host sendiri oleh next/font (CSP situs: font-src 'self').
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--f-anton" });
const archivo = Archivo({ subsets: ["latin"], variable: "--f-archivo" });
const archivoBlack = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--f-archivo-black" });
const barlow = Barlow({ weight: ["500", "700", "800"], subsets: ["latin"], variable: "--f-barlow" });
const fira = Fira_Sans({ weight: ["400", "600", "700"], subsets: ["latin"], variable: "--f-fira" });
const plexMono = IBM_Plex_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--f-plex-mono" });
const montserrat = Montserrat({ weight: ["500", "800", "900"], subsets: ["latin"], variable: "--f-montserrat" });
const newsreader = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], axes: ["opsz"], variable: "--f-newsreader" });
const poppins = Poppins({ weight: ["400", "600", "800"], subsets: ["latin"], variable: "--f-poppins" });
const shareTech = Share_Tech_Mono({ weight: "400", subsets: ["latin"], variable: "--f-share-tech" });
const vt323 = VT323({ weight: "400", subsets: ["latin"], variable: "--f-vt323" });
const fonts = [anton, archivo, archivoBlack, barlow, fira, plexMono, montserrat, newsreader, poppins, shareTech, vt323].map((f) => f.variable).join(" ");

export const metadata: Metadata = {
  title: "Menagih Janji Negara",
  description: "Peran, hak, dan kewajiban warga negara dalam Negara Hukum Indonesia: tujuh fenomena tagar kritik publik 2019–2025.",
};

export default function Page() {
  return <MenagihJanjiNegara className={fonts} />;
}

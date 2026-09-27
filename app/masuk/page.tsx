import type { Metadata } from "next";
import { Masuk } from "@/components/Masuk";

export const metadata: Metadata = { title: "Masuk", robots: { index: false, follow: false } };

export default function Page() {
  return <Masuk />;
}

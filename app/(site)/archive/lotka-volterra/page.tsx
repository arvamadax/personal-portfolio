import type { Metadata } from "next";
import { LotkaVolterra } from "@/components/LotkaVolterra";

export const metadata: Metadata = { title: "Lotka–Volterra" };

export default function Page() {
  return <LotkaVolterra />;
}

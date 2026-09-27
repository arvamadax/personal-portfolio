import type { Metadata } from "next";
import { Radar } from "@/components/Radar";

export const metadata: Metadata = { title: "Radar" };

export default function Page() {
  return <Radar />;
}

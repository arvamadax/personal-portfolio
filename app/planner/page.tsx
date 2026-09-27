import type { Metadata } from "next";
import { Planner } from "@/components/Planner";

export const metadata: Metadata = { title: "Planner", robots: { index: false, follow: false } };

export default function Page() {
  return <Planner />;
}

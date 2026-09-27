import type { Metadata } from "next";
import { Work } from "@/components/Work";

export const metadata: Metadata = { title: "Work" };

export default function Page() {
  return <Work />;
}

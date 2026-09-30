import type { Metadata } from "next";
import { Archive } from "@/components/Archive";

export const metadata: Metadata = { title: "Archive" };

export default function Page() {
  return <Archive />;
}

"use client";
// Link internal yang lewat transisi Blinds. Klik biasa saja yang dicegat; Ctrl/Cmd/tengah tetap buka tab baru.
import Link from "next/link";
import { useRouter } from "next/navigation";
import { navigate } from "@/lib/transition";

export function TLink({ href, onClick, ...rest }: React.ComponentProps<typeof Link> & { href: string }) {
  const router = useRouter();
  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigate(href, router.push);
      }}
    />
  );
}

"use client"; 
import { SignedIn, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noLayoutPages = ["/"]; // Halaman tanpa layout

  if (noLayoutPages.includes(pathname)) {
    return <>{children}</>; // Render langsung tanpa layout
  }

  return (
      <div className="layout-wrapper bg-transparent">
        <SignedIn>
          <header className="flex justify-end items-center p-4 gap-4 h-16 bg-transparent">
              <UserButton />
          </header>
        </SignedIn>
        {children}
      </div>
  );
}

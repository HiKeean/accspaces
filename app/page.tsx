"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  

  useEffect(() => {
    console.log(isSignedIn)
    setTimeout(()=>{
      if (isSignedIn) {
        router.push("/home"); // Kalau sudah login, langsung redirect ke /home
      }
      else router.push("/auth")
    }, 2000);
  }, [isSignedIn, router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#1d3c4b]">
      <Image src="/images/LOGO.png" alt="Logo" width={80} height={80} className="mb-8" />
      <h1 className="text-white text-2xl">Welcome to My App</h1>
    </main>
  );
}

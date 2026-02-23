"use client";

import { ButtonDefault } from "@/components/ui/button-default";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function Home() {
  const handleLogin = async () => {
    console.log("Clicado")
    signIn("google");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <ButtonDefault onClick={handleLogin}></ButtonDefault>
    </div>
  );
}

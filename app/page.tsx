"use client";

import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-8 bg-zinc-50 p-8 font-sans dark:bg-black">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight dark:text-white md:text-5xl lg:text-6xl">
          Boilerplate App
        </h1>
        <p className="mx-auto max-w-[600px] text-zinc-500 dark:text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Welcome to the robust foundation for your next big project.
        </p>
      </div>

      {status === "loading" ? (
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
      ) : session ? (
        <div className="flex flex-col items-center space-y-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
          <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
            Welcome back, <span className="text-blue-600 dark:text-blue-400">{session.user?.email}</span>
          </p>
          <Button onClick={() => signOut()} variant="destructive" className="w-full sm:w-auto">
            Sign Out
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">
            <Button asChild size="lg" className="w-full sm:w-auto rounded-full px-8">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-8">
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>

          <div className="relative w-full py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-zinc-50 dark:bg-black px-2 text-zinc-500">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            size="lg"
            className="w-full rounded-full"
            onClick={() => {
              signIn("google", { callbackUrl: "/home" });
            }}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Google
          </Button>
        </div>
      )}
    </div>
  );
}

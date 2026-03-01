"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function HomePage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading" || status === "unauthenticated") {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center space-y-8 bg-zinc-50 p-8 font-sans dark:bg-black">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold tracking-tight dark:text-white md:text-5xl">
                    Dashboard Home
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400">
                    You are successfully logged in!
                </p>
            </div>

            <div className="flex flex-col items-center space-y-4 bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 w-full max-w-md">
                <div className="space-y-2 text-center w-full">
                    <h3 className="font-medium text-zinc-900 dark:text-锌-100">User Profile</h3>
                    <div className="p-4 bg-zinc-100 dark:bg-zinc-950 rounded-lg text-sm text-left font-mono overflow-auto text-zinc-600 dark:text-zinc-400">
                        {session?.user?.email}
                    </div>
                </div>
                <Button onClick={() => signOut({ callbackUrl: "/" })} variant="destructive" className="w-full mt-4">
                    Sign Out
                </Button>
            </div>
        </div>
    );
}

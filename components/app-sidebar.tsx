import React from "react"
import { Home, Settings, Moon, Sun, LogOut, Dna, Search } from "lucide-react"
import { useTheme } from "next-themes"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const topItems = [
    {
        title: "Início",
        url: "/home",
        icon: Home,
    },
    {
        title: "Proteínas",
        url: "/proteins",
        icon: Dna,
    },
]

export function AppSidebar() {
    const { theme, setTheme } = useTheme()
    const pathname = usePathname()

    return (
        <div className="w-20 bg-neutral-950 border-r border-neutral-900 h-screen sticky top-0 left-0 text-white flex flex-col items-center py-6 gap-6 z-50 shadow-xl selects-none">
            {/* Logo Area */}
            <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg cursor-pointer transform hover:scale-105 transition">
                <div className="w-4 h-4 bg-white rotate-45 transform" />
            </div>

            {/* Dummy Search Icon */}
            <button className="p-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:bg-neutral-800 transition cursor-pointer">
                <Search className="w-4 h-4" />
            </button>

            {/* Main Navigation */}
            <nav className="flex-1 flex flex-col items-center gap-5 w-full mt-4">
                {topItems.map((item) => {
                    const isActive = pathname?.startsWith(item.url);
                    return (
                        <Link 
                            key={item.title} 
                            href={item.url}
                            className={`flex flex-col items-center justify-center gap-1 w-full py-2 cursor-pointer transition-all ${
                                isActive 
                                    ? 'text-sky-400 font-semibold' 
                                    : 'text-neutral-500 hover:text-neutral-200'
                            }`}
                        >
                            <div className={`p-2 rounded-xl transition-all ${
                                isActive ? 'bg-sky-500/10 shadow-inner' : 'hover:bg-neutral-900'
                            }`}>
                                <item.icon className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] tracking-wide mt-0.5">{item.title}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer Navigation */}
            <div className="flex flex-col items-center gap-5 w-full">
                {/* Theme Toggle toggle link inside custom grid for consistent rendering */}
                <button 
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="flex flex-col items-center gap-1 text-neutral-500 hover:text-neutral-200 cursor-pointer w-full"
                >
                    <div className="p-2 rounded-xl hover:bg-neutral-900">
                        {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </div>
                    <span className="text-[10px] tracking-wide">Interface</span>
                </button>

                <button 
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="flex flex-col items-center gap-1 text-neutral-500 hover:text-red-400 cursor-pointer w-full"
                >
                    <div className="p-2 rounded-xl hover:bg-red-500/10">
                        <LogOut className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] tracking-wide">Sair</span>
                </button>

                {/* Account / Avatar icon aesthetic bottom pinned */}
                <div className="flex flex-col items-center gap-1 w-full pt-2 border-t border-neutral-900">
                    <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center font-bold text-white text-sm shadow-md cursor-pointer hover:bg-red-500 transition">
                        G
                    </div>
                    <span className="text-[10px] text-neutral-500 tracking-wide">Conta</span>
                </div>
            </div>
        </div>
    )
}

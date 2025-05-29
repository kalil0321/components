"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = {
    "/": {
        name: "home",
    },
    "/old": {
        name: "old",
    },
    "/new": {
        name: "new",
    },
};

export default function HomeHeader({ className }: { className?: string }) {
    const currentPath = usePathname();

    return (
        <nav className={cn("w-full py-4", className)}>
            <div className="flex items-center justify-start gap-1 ">
                {Object.entries(navItems).map(([path, { name }]) => {
                    const isActive = path === currentPath;
                    return (
                        <Link
                            key={path}
                            href={path}
                            prefetch={true}
                            className={`
                                relative px-4 py-2 rounded-lg text-sm font-medium transition-all
                                ${
                                    isActive
                                        ? "text-neutral-800 dark:text-neutral-100"
                                        : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
                                }
                            `}
                        >
                            {name}
                            {isActive && (
                                <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-neutral-500/0 via-neutral-500/70 to-neutral-500/0 dark:from-neutral-400/0 dark:via-neutral-400/40 dark:to-neutral-400/0" />
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}

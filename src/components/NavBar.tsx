"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { MainNavItem } from "@/types"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { MobileNav } from "@/components/MobileNav"
import { Tv, X } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"
import { UserButton, useAuth } from "@clerk/nextjs" 

import { buttonVariants } from "./ui/button"

interface MainNavProps {
    items?: MainNavItem[]
    children?: React.ReactNode
}

export function MainNav({ items, children }: MainNavProps) {
    const segment = useSelectedLayoutSegment()
    const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)
   
    const user = useAuth();

    return (
        <>
            <div className="flex gap-6 md:gap-10">
                <Link href="/" className="hidden items-center space-x-2 md:flex">
                    <Tv />
                    <span className="hidden font-bold sm:inline-block">
                        {siteConfig.name}
                    </span>
                </Link>
                {items?.length ? (
                    <nav className="hidden gap-6 md:flex">
                        {items?.map((item, index) => (
                            <Link
                                key={index}
                                href={item.disabled ? "#" : item.href}
                                className={cn(
                                    "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                                    item.href.startsWith(`/${segment}`)
                                        ? "text-foreground"
                                        : "text-foreground/60",
                                    item.disabled && "cursor-not-allowed opacity-80"
                                )}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                ) : null}

                <button
                    className="flex items-center space-x-2 md:hidden"
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                    {showMobileMenu ? <X /> : <Tv />}
                    <span className="font-bold">Menu</span>
                </button>
                {showMobileMenu && items && (
                    <MobileNav items={items}>{children}</MobileNav>
                )}
            </div>
            <nav>
                <div className="hidden items-center space-x-4 sm:flex">
                    {user ? <UserButton afterSignOutUrl="/" /> : <Link href="/login" className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "px-4")} >Login</Link>}
                    <ThemeToggle />

                </div>
            </nav>
        </>
    )
}
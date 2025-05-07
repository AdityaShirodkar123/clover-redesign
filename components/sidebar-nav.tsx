"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, CreditCard, Home, Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SidebarNavProps {
  className?: string
}

export function SidebarNav({ className }: SidebarNavProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    {
      title: "Home",
      href: "/",
      icon: Home,
    },
    {
      title: "Scratch Cards",
      href: "/scratch-cards",
      icon: CreditCard,
    },
    {
      title: "Draw Games",
      href: "/draw-games",
      icon: Calendar,
    },
  ]

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed left-4 top-4 z-50 bg-gray-900/80 backdrop-blur-sm text-gray-400 hover:text-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-gray-200 bg-white shadow-sm transition-transform duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className,
        )}
      >
        <div className="flex h-16 items-center border-b border-gray-800 px-6">
          <Link
            href="/"
            className="font-bold text-xl bg-gradient-to-r from-green-600 to-yellow-500 bg-clip-text text-transparent"
            onClick={() => setIsOpen(false)}
          >
            ScratchWin
          </Link>
        </div>
        <ScrollArea className="flex-1 py-4">
          <nav className="grid gap-1 px-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-gradient-to-r from-green-600/20 to-yellow-500/20 text-gray-900"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                )}
              >
                <item.icon className={cn("h-5 w-5", pathname === item.href ? "text-green-600" : "text-gray-500")} />
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="mt-6 px-4">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h4 className="mb-2 text-sm font-medium text-gray-900">Upcoming Draws</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Powerball</span>
                  <span className="text-green-600">2h 45m</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Mega Millions</span>
                  <span className="text-green-600">1d 4h</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">EuroMillions</span>
                  <span className="text-green-600">2d 6h</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 w-full border-gray-200 bg-white hover:bg-gray-100 text-gray-900"
              >
                View All Draws
              </Button>
            </div>
          </div>
        </ScrollArea>
        <div className="border-t border-gray-800 p-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">GS</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Guest User</p>
              <p className="text-xs text-gray-500">Sign in for more features</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

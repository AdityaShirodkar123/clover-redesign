"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, CreditCard, Home, Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCountdowns } from "@/app/context/CountdownContext";

interface SidebarNavProps {
  className?: string;
}

// Helper to format countdown for sidebar
function formatSidebarCountdown(
  hours: number,
  minutes: number,
  seconds: number
) {
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  if (hours === 0 && minutes === 0) {
    return `${seconds}s`;
  }
  if (days > 0) {
    return `${days}d ${remainingHours}h ${minutes}m`;
  }
  return `${remainingHours}h ${minutes}m`;
}

// Helper to get the nearest countdown between two draws
function getNearestCountdown(
  a?: { hours: number; minutes: number; seconds: number },
  b?: { hours: number; minutes: number; seconds: number }
) {
  if (!a && !b) return undefined;
  if (!a) return b;
  if (!b) return a;
  const aTotal = a.hours * 3600 + a.minutes * 60 + a.seconds;
  const bTotal = b.hours * 3600 + b.minutes * 60 + b.seconds;
  return aTotal <= bTotal ? a : b;
}

// Map for live jackpot values (could be dynamic in the future)
const jackpotMap: Record<string, string> = {
  powerball: "$347,000,000",
  megaMillions: "$215,000,000"
};

export function SidebarNav({ className }: SidebarNavProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { countdowns } = useCountdowns();

  const navItems = [
    {
      title: "Scratch Cards",
      href: "/",
      icon: CreditCard
    },
    {
      title: "Remove later !!",
      href: "/scratch-cards",
      icon: CreditCard
    },
    {
      title: "Draw Games",
      href: "/draw-games",
      icon: Calendar
    }
  ];

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
          className
        )}
      >
        <div className="flex h-16 items-center border-b border-gray-800 px-6">
          <Link
            href="/"
            className="font-bold text-2xl text-green-600"
            onClick={() => setIsOpen(false)}
          >
            Clover
          </Link>
        </div>
        <ScrollArea className="flex-1 py-4">
          <nav className="grid gap-1 px-2">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-gradient-to-r from-green-600/20 to-yellow-500/20 text-gray-900"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5",
                    pathname === item.href ? "text-green-600" : "text-gray-500"
                  )}
                />
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="mt-6 px-4">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h4 className="mb-2 text-sm font-medium text-gray-900">
                Upcoming Draws
              </h4>
              <div className="space-y-3">
                <div className="rounded-md bg-gray-100 p-2 mb-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600 font-medium">Powerball</span>
                    <span className="text-green-600">
                      {countdowns && countdowns.powerball
                        ? formatSidebarCountdown(
                            countdowns.powerball.hours,
                            countdowns.powerball.minutes,
                            countdowns.powerball.seconds
                          )
                        : "--"}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-green-600 mt-1">
                    {jackpotMap.powerball}
                  </div>
                </div>
                <div className="rounded-md bg-gray-100 p-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600 font-medium">
                      Mega Millions
                    </span>
                    <span className="text-green-600">
                      {countdowns && countdowns.megaMillions
                        ? formatSidebarCountdown(
                            countdowns.megaMillions.hours,
                            countdowns.megaMillions.minutes,
                            countdowns.megaMillions.seconds
                          )
                        : "--"}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-green-600 mt-1">
                    {jackpotMap.megaMillions}
                  </div>
                </div>
                {/* Pick-3 and Pick-4 Section */}
                <div className="rounded-md bg-gray-100 p-2 mt-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600 font-medium">Pick-3</span>
                    <span className="text-green-600">
                      {(() => {
                        const c = getNearestCountdown(
                          countdowns.pick3midday,
                          countdowns.pick3evening
                        );
                        return c
                          ? formatSidebarCountdown(
                              c.hours,
                              c.minutes,
                              c.seconds
                            )
                          : "--";
                      })()}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-green-600 mt-1">
                    Up to $500
                  </div>
                </div>
                <div className="rounded-md bg-gray-100 p-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600 font-medium">Pick-4</span>
                    <span className="text-green-600">
                      {(() => {
                        const c = getNearestCountdown(
                          countdowns.pick4midday,
                          countdowns.pick4evening
                        );
                        return c
                          ? formatSidebarCountdown(
                              c.hours,
                              c.minutes,
                              c.seconds
                            )
                          : "--";
                      })()}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-green-600 mt-1">
                    Up to $5,000
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 w-full border-gray-200 bg-white hover:bg-gray-100 text-gray-900"
                asChild
              >
                <Link href="/draw-games">View All Draws</Link>
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
  );
}

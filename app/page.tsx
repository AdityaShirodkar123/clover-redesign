"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronsUpDown, LogIn, MapPin, Star, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { SidebarNav } from "@/components/sidebar-nav";
import StateSelector from "@/components/state-selector";
import JackpotMap from "@/components/jackpot-map";
import TopScratchCards from "@/components/top-scratch-cards";
import FavoriteCards from "@/components/favorite-cards";
import SocialFeed from "@/components/social-feed";

export default function LotteryAnalytics() {
  // State for authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // State for state selector
  const [stateOpen, setStateOpen] = useState(false);
  const [stateValue, setStateValue] = useState("ca");

  // State for timeframe
  const [timeframe, setTimeframe] = useState("year");

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <SidebarNav />
      <div className="flex-1 ml-0 md:ml-64">
        <header className="sticky top-0 z-30 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
          <div className="container flex h-16 items-center justify-between">
            <div className="font-bold text-xl bg-gradient-to-r from-green-600 to-yellow-500 bg-clip-text text-transparent">
              ScratchWin Analytics
            </div>
            <nav className="hidden md:flex gap-6">
              <Link href="/" className="text-sm font-medium text-gray-900">
                Home
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                About
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Blog
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                FAQ
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Contact
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex gap-1 border-gray-200 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => setIsLoggedIn(!isLoggedIn)}
              >
                <User className="h-4 w-4" />
                {isLoggedIn ? "Logout" : "Login"}
              </Button>
              <Button
                size="sm"
                className="hidden md:flex bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-500 hover:to-yellow-400"
              >
                Sign Up
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-gray-400 hover:text-gray-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              </Button>
            </div>
          </div>
        </header>
        <main className="container py-6 md:py-12">
          <div className="grid gap-6 md:gap-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-yellow-500 bg-clip-text text-transparent">
                  Lottery Scratch Card Analytics
                </h1>
                <p className="text-gray-600">
                  Track winning odds, jackpot locations, and find the best
                  scratch cards in your state.
                </p>
              </div>
              {/* State Selector Component */}
              <StateSelector
                open={stateOpen}
                setOpen={setStateOpen}
                value={stateValue}
                setValue={setStateValue}
              />
            </div>
            <div className="grid gap-6">
              <Tabs defaultValue="top-cards" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1">
                  <TabsTrigger
                    value="top-cards"
                    className="data-[state=active]:bg-white data-[state=active]:text-gray-900"
                  >
                    Top Cards
                  </TabsTrigger>
                  <TabsTrigger
                    value="favorites"
                    className="data-[state=active]:bg-white data-[state=active]:text-gray-900"
                  >
                    My Favorites
                  </TabsTrigger>
                  <TabsTrigger
                    value="jackpot-map"
                    className="data-[state=active]:bg-white data-[state=active]:text-gray-900"
                  >
                    Jackpot Map
                  </TabsTrigger>
                  <TabsTrigger
                    value="social"
                    className="data-[state=active]:bg-white data-[state=active]:text-gray-900"
                  >
                    Social
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="top-cards"
                  className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
                >
                  <TopScratchCards />
                </TabsContent>
                <TabsContent
                  value="favorites"
                  className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
                >
                  <FavoriteCards
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                </TabsContent>
                <TabsContent
                  value="jackpot-map"
                  className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
                >
                  <JackpotMap
                    timeframe={timeframe}
                    setTimeframe={setTimeframe}
                  />
                </TabsContent>
                <TabsContent
                  value="social"
                  className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
                >
                  <SocialFeed
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

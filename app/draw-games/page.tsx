"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  Calendar,
  ChevronRight,
  ExternalLink,
  Info,
  Play,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { SidebarNav } from "@/components/sidebar-nav";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import Navbar from "@/components/navbar";
import { parse, addDays, format, isAfter } from "date-fns";
import { useCountdowns } from "../context/CountdownContext";

export default function DrawGamesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [showLiveStream, setShowLiveStream] = useState(false);
  const { countdowns, countdownsReady } = useCountdowns();

  // Helper: Map day names to numbers
  const dayNameToNumber = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6
  };

  // Helper: Parse draw time string (e.g., "10:59 PM ET") and return { hours, minutes, tz }
  function parseDrawTime(
    drawTime: string
  ): { hour: number; minute: number; tz: string } | null {
    const match = drawTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)\s*([A-Z]+)/);
    if (!match) return null;
    let [, hourStr, minuteStr, ampm, tz] = match;
    let hour = Number(hourStr);
    let minute = Number(minuteStr);
    if (ampm === "PM" && hour !== 12) hour += 12;
    if (ampm === "AM" && hour === 12) hour = 0;
    return { hour, minute, tz };
  }

  // Helper: Convert a Date in the user's local time to ET (Eastern Time, UTC-4)
  function toEasternTime(date: Date): Date {
    // Get UTC time in ms
    const utc = date.getTime() + date.getTimezoneOffset() * 60000;
    // ET is UTC-4 (for daylight saving, otherwise UTC-5)
    // For simplicity, use UTC-4 (EDT)
    const offset = -4; // hours
    return new Date(utc + 3600000 * offset);
  }

  // Helper: Get the next draw Date object for a game
  function getNextDrawDate(drawDays: string[], drawTime: string): Date | null {
    // Always calculate the next draw in ET
    const now = toEasternTime(new Date());
    const parsed = parseDrawTime(drawTime);
    if (!parsed) return null;
    const { hour, minute } = parsed;

    // Find the soonest next draw day
    const today = now.getDay();
    let minDiff = 8;
    let nextDayNum = today;
    for (const day of drawDays) {
      const dayNum = dayNameToNumber[day as keyof typeof dayNameToNumber];
      let diff = (dayNum - today + 7) % 7;
      if (diff === 0) {
        const drawDate = new Date(now);
        drawDate.setHours(hour, minute, 0, 0);
        if (drawDate.getTime() > now.getTime()) {
          minDiff = 0;
          nextDayNum = dayNum;
          break;
        } else {
          diff = 7;
        }
      }
      if (diff < minDiff) {
        minDiff = diff;
        nextDayNum = dayNum;
      }
    }
    const nextDraw = new Date(now);
    nextDraw.setDate(now.getDate() + minDiff);
    nextDraw.setHours(hour, minute, 0, 0);
    return nextDraw;
  }

  // Format countdown time
  const formatCountdown = (hours: number, minutes: number, seconds: number) => {
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;
      return `${days}d ${remainingHours}h ${minutes}m`;
    }
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  // Mock data for draw games
  const drawGames = [
    {
      id: "powerball",
      name: "Powerball",
      logo: "/placeholder.svg?height=80&width=160",
      jackpot: "$253 Million",
      nextDraw: countdowns.powerball,
      country: "USA",
      buyLink: "https://www.thelotter.com",
      isHot: true,
      description:
        "Powerball is an American lottery game offered by 45 states, the District of Columbia, Puerto Rico and the U.S. Virgin Islands.",
      drawDays: ["Monday", "Wednesday", "Saturday"],
      drawTime: "10:59 PM ET",
      minJackpot: "$20 Million",
      ticketPrice: "$2.00",
      odds: "1 in 292,201,338",
      livestreamLink: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "megaMillions",
      name: "Mega Millions",
      logo: "/placeholder.svg?height=80&width=160",
      jackpot: "$325 Million",
      nextDraw: countdowns.megaMillions,
      country: "USA",
      buyLink: "https://www.thelotter.com",
      isHot: true,
      description:
        "Mega Millions is one of America's two big jackpot games, and the only one with Match 5 prizes up to $5 million.",
      drawDays: ["Tuesday", "Friday"],
      drawTime: "11:00 PM ET",
      minJackpot: "$20 Million",
      ticketPrice: "$2.00",
      odds: "1 in 302,575,350",
      livestreamLink: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "pick3midday",
      name: "Pick-3 Midday",
      logo: "/placeholder.svg?height=80&width=160",
      jackpot: "Up to $500",
      nextDraw: countdowns.pick3midday,
      country: "USA",
      buyLink: "https://www.njlottery.com/en-us/drawgames/pick3.html",
      isHot: false,
      description:
        "Pick-3 is a three-digit game with fixed prizes up to $500 on a $1 straight bet.",
      drawDays: ["Daily"],
      drawTime: "12:59 PM ET",
      minJackpot: "Fixed prize",
      ticketPrice: "$1.00",
      odds: "1 in 1,000",
      livestreamLink:
        "https://www.njlottery.com/en-us/playertools/watchdrawings.html"
    },
    {
      id: "pick3evening",
      name: "Pick-3 Evening",
      logo: "/placeholder.svg?height=80&width=160",
      jackpot: "Up to $500",
      nextDraw: countdowns.pick3evening,
      country: "USA",
      buyLink: "https://www.njlottery.com/en-us/drawgames/pick3.html",
      isHot: false,
      description:
        "Pick-3 is a three-digit game with fixed prizes up to $500 on a $1 straight bet.",
      drawDays: ["Daily"],
      drawTime: "10:57 PM ET",
      minJackpot: "Fixed prize",
      ticketPrice: "$1.00",
      odds: "1 in 1,000",
      livestreamLink:
        "https://www.njlottery.com/en-us/playertools/watchdrawings.html"
    },
    {
      id: "pick4midday",
      name: "Pick-4 Midday",
      logo: "/placeholder.svg?height=80&width=160",
      jackpot: "Up to $5,000",
      nextDraw: countdowns.pick4midday,
      country: "USA",
      buyLink: "https://www.njlottery.com/en-us/drawgames/pick4.html",
      isHot: false,
      description:
        "Pick-4 is a four-digit game with fixed prizes up to $5,000 on a $1 straight bet.",
      drawDays: ["Daily"],
      drawTime: "12:59 PM ET",
      minJackpot: "Fixed prize",
      ticketPrice: "$1.00",
      odds: "1 in 10,000",
      livestreamLink:
        "https://www.njlottery.com/en-us/playertools/watchdrawings.html"
    },
    {
      id: "pick4evening",
      name: "Pick-4 Evening",
      logo: "/placeholder.svg?height=80&width=160",
      jackpot: "Up to $5,000",
      nextDraw: countdowns.pick4evening,
      country: "USA",
      buyLink: "https://www.njlottery.com/en-us/drawgames/pick4.html",
      isHot: false,
      description:
        "Pick-4 is a four-digit game with fixed prizes up to $5,000 on a $1 straight bet.",
      drawDays: ["Daily"],
      drawTime: "10:57 PM ET",
      minJackpot: "Fixed prize",
      ticketPrice: "$1.00",
      odds: "1 in 10,000",
      livestreamLink:
        "https://www.njlottery.com/en-us/playertools/watchdrawings.html"
    },
    {
      id: "jerseyCash5",
      name: "Jersey Cash 5",
      logo: "/placeholder.svg?height=80&width=160",
      jackpot: "Progressive jackpot starting at $150,000",
      nextDraw: countdowns.jerseyCash5,
      country: "USA",
      buyLink: "https://www.njlottery.com/en-us/drawgames/jerseycash.html",
      isHot: false,
      description:
        "Jersey Cash 5 is a nightly pick-5 game with jackpots that roll over until won.",
      drawDays: ["Daily"],
      drawTime: "10:57 PM ET",
      minJackpot: "N/A",
      ticketPrice: "$2.00",
      odds: "1 in 1,221,759",
      livestreamLink:
        "https://www.njlottery.com/en-us/playertools/watchdrawings.html"
    },
    {
      id: "cash4Life",
      name: "Cash4Life",
      logo: "/placeholder.svg?height=80&width=160",
      jackpot: "$1,000 a Day for Life",
      nextDraw: countdowns.cash4Life,
      country: "USA",
      buyLink: "https://www.njlottery.com/en-us/drawgames/cash4life.html",
      isHot: false,
      description:
        "Cash4Life offers $1,000/day for life for the top prize and $1,000/week for life for the second prize.",
      drawDays: ["Daily"],
      drawTime: "9:00 PM ET",
      minJackpot: "$1,000 a Week for Life",
      ticketPrice: "$2.00",
      odds: "1 in 21,846,048",
      livestreamLink:
        "https://www.njlottery.com/en-us/playertools/watchdrawings.html"
    }
  ];

  // Filter games based on active tab
  const filteredGames =
    activeTab === "all"
      ? drawGames
      : activeTab === "hot"
      ? drawGames.filter(game => game.isHot)
      : drawGames.filter(game => game.country.toLowerCase() === activeTab);

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <SidebarNav />

      <div className="flex-1 ml-0 md:ml-64">
        <Navbar />

        <main className="container py-6 md:py-12">
          {/* Live Stream Dialog - Shows when a draw is about to happen */}
          {showLiveStream && (
            <div className="mb-8 p-4 border border-red-600 bg-red-900/20 rounded-lg animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-600"></div>
                  <h3 className="text-lg font-bold text-red-400">
                    LIVE: Powerball Drawing Starting Soon!
                  </h3>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      <Play className="h-4 w-4 mr-2" /> Watch Live
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[800px] bg-gray-900 border-gray-800">
                    <DialogHeader>
                      <DialogTitle className="text-gray-100">
                        Powerball Live Drawing
                      </DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Watch the live drawing to see if you've won the $253
                        Million jackpot!
                      </DialogDescription>
                    </DialogHeader>
                    <div className="aspect-video w-full overflow-hidden rounded-lg">
                      <iframe
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                        title="Powerball Live Drawing"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-yellow-500 bg-clip-text text-transparent">
                Lottery Draw Games
              </h1>
              <p className="text-gray-600">
                Track upcoming draws, jackpots, and buy tickets for major
                lotteries worldwide
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-200 bg-white hover:bg-gray-100 text-gray-900"
            >
              <Bell className="h-4 w-4 mr-2" />
              Set Draw Alerts
            </Button>
          </div>

          {/*<Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full mb-8"
          >
            <TabsList className="grid grid-cols-4 md:grid-cols-6 bg-gray-100 p-1">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-white data-[state=active]:text-gray-900"
              >
                All Games
              </TabsTrigger>
              <TabsTrigger
                value="hot"
                className="data-[state=active]:bg-white data-[state=active]:text-gray-900"
              >
                Hot Jackpots
              </TabsTrigger>
              <TabsTrigger
                value="usa"
                className="data-[state=active]:bg-white data-[state=active]:text-gray-900"
              >
                USA
              </TabsTrigger>
              <TabsTrigger
                value="europe"
                className="data-[state=active]:bg-white data-[state=active]:text-gray-900"
              >
                Europe
              </TabsTrigger>
              <TabsTrigger
                value="canada"
                className="hidden md:block data-[state=active]:bg-white data-[state=active]:text-gray-900"
              >
                Canada
              </TabsTrigger>
              <TabsTrigger
                value="spain"
                className="hidden md:block data-[state=active]:bg-white data-[state=active]:text-gray-900"
              >
                Spain
              </TabsTrigger>
            </TabsList>
          </Tabs>*/}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredGames.map(game => (
              <Card
                key={game.id}
                className="overflow-hidden bg-white border-gray-200 hover:border-gray-300 transition-colors shadow-sm"
              >
                <CardHeader className="p-4 pb-0">
                  <div className="flex justify-between items-start">
                    <div className="relative h-12 w-24">
                      <Image
                        src={game.logo || "/placeholder.svg"}
                        alt={game.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    {game.isHot && (
                      <Badge className="bg-red-600 text-white">
                        Hot Jackpot
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {game.name}
                      </h3>
                      <p className="text-sm text-gray-600">{game.country}</p>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">Jackpot</p>
                        {!countdownsReady ? (
                          <div className="animate-pulse">
                            <div className="h-8 w-32 bg-gray-200 rounded mb-2" />
                            <div className="h-6 w-24 bg-gray-200 rounded" />
                          </div>
                        ) : (
                          <>
                            <p className="text-2xl font-bold text-green-600">
                              {game.jackpot}
                            </p>
                          </>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Next Draw</p>
                        <div className="flex items-center gap-1">
                          <div className="h-2 w-2 rounded-full bg-green-600 animate-pulse"></div>
                          {!countdownsReady ? (
                            <div className="animate-pulse">
                              <div className="h-6 w-24 bg-gray-200 rounded" />
                            </div>
                          ) : (
                            <>
                              <p className="font-medium text-green-600">
                                {game.nextDraw
                                  ? formatCountdown(
                                      game.nextDraw.hours,
                                      game.nextDraw.minutes,
                                      game.nextDraw.seconds
                                    )
                                  : "--"}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-gray-200 bg-white hover:bg-gray-100 text-gray-900 flex items-center justify-between"
                        >
                          <Calendar className="h-4 w-4" />
                          <span>Draw Schedule</span>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-900 border-gray-800">
                        {/* Force the close button X to be white for visibility */}
                        <style>{`.fixed > button.absolute.right-4.top-4 > svg { color: white !important; }`}</style>
                        <DialogHeader>
                          <DialogTitle className="text-gray-100">
                            {game.name} Draw Schedule
                          </DialogTitle>
                          <DialogDescription className="text-gray-400">
                            Regular draw days and times for {game.name}.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-300 mb-1">
                              Draw Days
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {game.drawDays.map(day => (
                                <Badge
                                  key={day}
                                  variant="outline"
                                  className="border-gray-700 text-gray-300"
                                >
                                  {day}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-300 mb-1">
                                Draw Time
                              </h4>
                              <p className="text-gray-400">{game.drawTime}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-300 mb-1">
                                Ticket Price
                              </h4>
                              <p className="text-gray-400">
                                {game.ticketPrice}
                              </p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-300 mb-1">
                                Min. Jackpot
                              </h4>
                              <p className="text-gray-400">{game.minJackpot}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-300 mb-1">
                                Jackpot Odds
                              </h4>
                              <p className="text-gray-400">{game.odds}</p>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    className="border-gray-200 hover:bg-gray-100 text-gray-900"
                    asChild
                  >
                    <Link href={`/draw-games/${game.id}`}>
                      <Info className="h-4 w-4 mr-2" />
                      Details
                    </Link>
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-500 hover:to-yellow-400"
                    asChild
                  >
                    <a
                      href={game.buyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Buy Ticket
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

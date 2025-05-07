"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Bell, Calendar, ChevronRight, ExternalLink, Info, Play, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { SidebarNav } from "@/components/sidebar-nav"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function DrawGamesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [showLiveStream, setShowLiveStream] = useState(false)
  const [countdowns, setCountdowns] = useState({
    powerball: { hours: 2, minutes: 45, seconds: 30 },
    megaMillions: { hours: 28, minutes: 15, seconds: 10 },
    euroMillions: { hours: 54, minutes: 30, seconds: 45 },
    superLotto: { hours: 8, minutes: 20, seconds: 15 },
    lotto649: { hours: 32, minutes: 10, seconds: 5 },
    elGordo: { hours: 72, minutes: 45, seconds: 20 },
  })

  // Update countdowns every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdowns((prev) => {
        const updated = { ...prev }
        Object.keys(updated).forEach((key) => {
          let { hours, minutes, seconds } = updated[key]

          if (seconds > 0) {
            seconds--
          } else {
            if (minutes > 0) {
              minutes--
              seconds = 59
            } else {
              if (hours > 0) {
                hours--
                minutes = 59
                seconds = 59
              }
            }
          }

          updated[key] = { hours, minutes, seconds }

          // Check if we should show the live stream (when Powerball is within 10 minutes)
          if (key === "powerball" && hours === 0 && minutes < 10) {
            setShowLiveStream(true)
          }
        })
        return updated
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Format countdown time
  const formatCountdown = (hours, minutes, seconds) => {
    if (hours > 24) {
      const days = Math.floor(hours / 24)
      const remainingHours = hours % 24
      return `${days}d ${remainingHours}h ${minutes}m`
    }
    return `${hours}h ${minutes}m ${seconds}s`
  }

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
      livestreamLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
      livestreamLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: "euroMillions",
      name: "EuroMillions",
      logo: "/placeholder.svg?height=80&width=160",
      jackpot: "€130 Million",
      nextDraw: countdowns.euroMillions,
      country: "Europe",
      buyLink: "https://www.thelotter.com",
      isHot: false,
      description: "EuroMillions is a transnational lottery that requires seven correct numbers to win the jackpot.",
      drawDays: ["Tuesday", "Friday"],
      drawTime: "8:45 PM CET",
      minJackpot: "€17 Million",
      ticketPrice: "€2.50",
      odds: "1 in 139,838,160",
      livestreamLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: "superLotto",
      name: "SuperLotto Plus",
      logo: "/placeholder.svg?height=80&width=160",
      jackpot: "$42 Million",
      nextDraw: countdowns.superLotto,
      country: "USA",
      buyLink: "https://www.thelotter.com",
      isHot: false,
      description: "SuperLotto Plus is California's own in-state jackpot game with jackpots starting at $7 million.",
      drawDays: ["Wednesday", "Saturday"],
      drawTime: "7:57 PM PT",
      minJackpot: "$7 Million",
      ticketPrice: "$1.00",
      odds: "1 in 41,416,353",
      livestreamLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: "lotto649",
      name: "Lotto 6/49",
      logo: "/placeholder.svg?height=80&width=160",
      jackpot: "CA$18 Million",
      nextDraw: countdowns.lotto649,
      country: "Canada",
      buyLink: "https://www.thelotter.com",
      isHot: false,
      description: "Lotto 6/49 is one of Canada's most popular lottery games, played across the country.",
      drawDays: ["Wednesday", "Saturday"],
      drawTime: "10:30 PM ET",
      minJackpot: "CA$5 Million",
      ticketPrice: "CA$3.00",
      odds: "1 in 13,983,816",
      livestreamLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: "elGordo",
      name: "El Gordo",
      logo: "/placeholder.svg?height=80&width=160",
      jackpot: "€22 Million",
      nextDraw: countdowns.elGordo,
      country: "Spain",
      buyLink: "https://www.thelotter.com",
      isHot: false,
      description: "El Gordo de la Primitiva is a Spanish lottery known for its large jackpots and favorable odds.",
      drawDays: ["Sunday"],
      drawTime: "9:30 PM CET",
      minJackpot: "€5 Million",
      ticketPrice: "€1.50",
      odds: "1 in 31,625,100",
      livestreamLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  ]

  // Filter games based on active tab
  const filteredGames =
    activeTab === "all"
      ? drawGames
      : activeTab === "hot"
        ? drawGames.filter((game) => game.isHot)
        : drawGames.filter((game) => game.country.toLowerCase() === activeTab)

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <SidebarNav />

      <div className="flex-1 ml-0 md:ml-64">
        <header className="sticky top-0 z-30 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
          <div className="container flex h-16 items-center justify-between">
            <div className="md:hidden font-bold text-xl bg-gradient-to-r from-green-600 to-yellow-500 bg-clip-text text-transparent">
              ScratchWin Analytics
            </div>
            <div className="flex items-center gap-4 ml-auto">
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex gap-1 border-gray-200 hover:bg-gray-100 hover:text-gray-900"
              >
                <User className="h-4 w-4" />
                Login
              </Button>
              <Button
                size="sm"
                className="hidden md:flex bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-500 hover:to-yellow-400"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </header>

        <main className="container py-6 md:py-12">
          {/* Live Stream Dialog - Shows when a draw is about to happen */}
          {showLiveStream && (
            <div className="mb-8 p-4 border border-red-600 bg-red-900/20 rounded-lg animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-600"></div>
                  <h3 className="text-lg font-bold text-red-400">LIVE: Powerball Drawing Starting Soon!</h3>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      <Play className="h-4 w-4 mr-2" /> Watch Live
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[800px] bg-gray-900 border-gray-800">
                    <DialogHeader>
                      <DialogTitle className="text-gray-100">Powerball Live Drawing</DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Watch the live drawing to see if you've won the $253 Million jackpot!
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
                Track upcoming draws, jackpots, and buy tickets for major lotteries worldwide
              </p>
            </div>
            <Button variant="outline" size="sm" className="border-gray-200 bg-white hover:bg-gray-100 text-gray-900">
              <Bell className="h-4 w-4 mr-2" />
              Set Draw Alerts
            </Button>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
            <TabsList className="grid grid-cols-4 md:grid-cols-6 bg-gray-100 p-1">
              <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
                All Games
              </TabsTrigger>
              <TabsTrigger value="hot" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
                Hot Jackpots
              </TabsTrigger>
              <TabsTrigger value="usa" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
                USA
              </TabsTrigger>
              <TabsTrigger value="europe" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
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
          </Tabs>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredGames.map((game) => (
              <Card
                key={game.id}
                className="overflow-hidden bg-white border-gray-200 hover:border-gray-300 transition-colors shadow-sm"
              >
                <CardHeader className="p-4 pb-0">
                  <div className="flex justify-between items-start">
                    <div className="relative h-12 w-24">
                      <Image src={game.logo || "/placeholder.svg"} alt={game.name} fill className="object-contain" />
                    </div>
                    {game.isHot && <Badge className="bg-red-600 text-white">Hot Jackpot</Badge>}
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{game.name}</h3>
                      <p className="text-sm text-gray-600">{game.country}</p>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">Jackpot</p>
                        <p className="text-2xl font-bold text-green-600">{game.jackpot}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Next Draw</p>
                        <div className="flex items-center gap-1">
                          <div className="h-2 w-2 rounded-full bg-green-600 animate-pulse"></div>
                          <p className="font-medium text-green-600">
                            {formatCountdown(game.nextDraw.hours, game.nextDraw.minutes, game.nextDraw.seconds)}
                          </p>
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
                        <DialogHeader>
                          <DialogTitle className="text-gray-100">{game.name} Draw Schedule</DialogTitle>
                          <DialogDescription className="text-gray-400">
                            Regular draw days and times for {game.name}.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-300 mb-1">Draw Days</h4>
                            <div className="flex flex-wrap gap-2">
                              {game.drawDays.map((day) => (
                                <Badge key={day} variant="outline" className="border-gray-700 text-gray-300">
                                  {day}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-300 mb-1">Draw Time</h4>
                              <p className="text-gray-400">{game.drawTime}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-300 mb-1">Ticket Price</h4>
                              <p className="text-gray-400">{game.ticketPrice}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-300 mb-1">Min. Jackpot</h4>
                              <p className="text-gray-400">{game.minJackpot}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-300 mb-1">Jackpot Odds</h4>
                              <p className="text-gray-400">{game.odds}</p>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 grid grid-cols-2 gap-2">
                  <Button variant="outline" className="border-gray-200 hover:bg-gray-100 text-gray-900" asChild>
                    <Link href={`/draw-games/${game.id}`}>
                      <Info className="h-4 w-4 mr-2" />
                      Details
                    </Link>
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-500 hover:to-yellow-400"
                    asChild
                  >
                    <a href={game.buyLink} target="_blank" rel="noopener noreferrer">
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
  )
}

"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, ExternalLink, Play, Share2, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { SidebarNav } from "@/components/sidebar-nav"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function DrawGameDetailsPage({ params }: { params: { id: string } }) {
  const [countdown, setCountdown] = useState({ hours: 2, minutes: 45, seconds: 30 })
  const [showLiveStream, setShowLiveStream] = useState(false)

  // Update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { hours, minutes, seconds } = prev

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

        // Check if we should show the live stream (when within 10 minutes)
        if (hours === 0 && minutes < 10) {
          setShowLiveStream(true)
        }

        return { hours, minutes, seconds }
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

  // Mock data for the draw game
  const game = {
    id: params.id,
    name: "Powerball",
    logo: "/placeholder.svg?height=120&width=240",
    jackpot: "$253 Million",
    nextDraw: countdown,
    country: "USA",
    buyLink: "https://www.thelotter.com",
    isHot: true,
    description:
      "Powerball is an American lottery game offered by 45 states, the District of Columbia, Puerto Rico and the U.S. Virgin Islands. It is coordinated by the Multi-State Lottery Association (MUSL). Drawings are held every Monday, Wednesday, and Saturday at 10:59 p.m. Eastern Time.",
    drawDays: ["Monday", "Wednesday", "Saturday"],
    drawTime: "10:59 PM ET",
    minJackpot: "$20 Million",
    ticketPrice: "$2.00",
    odds: "1 in 292,201,338",
    livestreamLink: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    howToPlay:
      "To play Powerball, select five numbers from 1 to 69 for the white balls, then select one number from 1 to 26 for the red Powerball. Choose your numbers on a play slip or let the lottery terminal randomly pick your numbers. The Powerball jackpot grows until it is won. Players win a prize by matching one of the 9 Ways to Win.",
    prizeStructure: [
      { match: "5 + Powerball", prize: "Jackpot", odds: "1 in 292,201,338" },
      { match: "5", prize: "$1,000,000", odds: "1 in 11,688,054" },
      { match: "4 + Powerball", prize: "$50,000", odds: "1 in 913,129" },
      { match: "4", prize: "$100", odds: "1 in 36,525" },
      { match: "3 + Powerball", prize: "$100", odds: "1 in 14,494" },
      { match: "3", prize: "$7", odds: "1 in 580" },
      { match: "2 + Powerball", prize: "$7", odds: "1 in 701" },
      { match: "1 + Powerball", prize: "$4", odds: "1 in 92" },
      { match: "Powerball only", prize: "$4", odds: "1 in 38" },
    ],
    recentResults: [
      { date: "2023-03-15", numbers: "10, 17, 25, 45, 53", powerball: "9", jackpotWon: false },
      { date: "2023-03-12", numbers: "5, 12, 19, 27, 38", powerball: "11", jackpotWon: false },
      { date: "2023-03-08", numbers: "8, 21, 31, 32, 37", powerball: "23", jackpotWon: true },
      { date: "2023-03-05", numbers: "3, 15, 20, 23, 46", powerball: "11", jackpotWon: false },
      { date: "2023-03-01", numbers: "2, 9, 16, 25, 41", powerball: "22", jackpotWon: false },
    ],
    jackpotHistory: [
      { date: "2023-01-15", amount: "$632.6 Million" },
      { date: "2022-11-07", amount: "$2.04 Billion" },
      { date: "2022-08-03", amount: "$206.9 Million" },
      { date: "2022-04-27", amount: "$473.1 Million" },
      { date: "2022-01-05", amount: "$632.6 Million" },
    ],
  }

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <SidebarNav />

      <div className="flex-1 ml-0 md:ml-64">
        <header className="sticky top-0 z-30 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
          <div className="container flex h-16 items-center justify-between">
            <div className="md:hidden font-bold text-xl bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              ScratchWin Analytics
            </div>
            <div className="flex items-center gap-4 ml-auto">
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex gap-1 border-gray-700 hover:bg-gray-800 hover:text-gray-100"
              >
                <User className="h-4 w-4" />
                Login
              </Button>
              <Button
                size="sm"
                className="hidden md:flex bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </header>

        <main className="container py-6 md:py-12">
          <Link
            href="/draw-games"
            className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Draw Games
          </Link>

          {/* Live Stream Banner - Shows when a draw is about to happen */}
          {showLiveStream && (
            <div className="mb-8 p-4 border border-red-600 bg-red-900/20 rounded-lg animate-pulse">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-600"></div>
                  <h3 className="text-lg font-bold text-red-400">LIVE: {game.name} Drawing Starting Soon!</h3>
                </div>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  <Play className="h-4 w-4 mr-2" /> Watch Live Stream
                </Button>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-full md:w-1/3 bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center shadow-sm">
                  <div className="relative h-24 w-48 mb-4">
                    <Image src={game.logo || "/placeholder.svg"} alt={game.name} fill className="object-contain" />
                  </div>
                  <Badge className={game.isHot ? "bg-red-600 text-white mb-2" : "hidden"}>Hot Jackpot</Badge>
                  <h1 className="text-2xl font-bold text-center text-gray-900 mb-1">{game.name}</h1>
                  <p className="text-sm text-gray-600 text-center mb-4">{game.country}</p>

                  <div className="w-full space-y-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Current Jackpot</p>
                      <p className="text-3xl font-bold text-green-600">{game.jackpot}</p>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-gray-600">Next Draw In</p>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <div className="h-2 w-2 rounded-full bg-green-600 animate-pulse"></div>
                        <p className="font-medium text-xl text-green-600">
                          {formatCountdown(game.nextDraw.hours, game.nextDraw.minutes, game.nextDraw.seconds)}
                        </p>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-500 hover:to-yellow-400"
                      asChild
                    >
                      <a href={game.buyLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Buy Ticket on TheLotter
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="w-full md:w-2/3 space-y-4">
                  <h2 className="text-xl font-bold text-gray-900">About {game.name}</h2>
                  <p className="text-gray-700">{game.description}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 mb-1">Draw Days</h3>
                      <div className="flex flex-wrap gap-2">
                        {game.drawDays.map((day) => (
                          <Badge key={day} variant="outline" className="border-gray-200 text-gray-700">
                            {day}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 mb-1">Draw Time</h3>
                      <p className="text-gray-700">{game.drawTime}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 mb-1">Ticket Price</h3>
                      <p className="text-gray-700">{game.ticketPrice}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 mb-1">Min. Jackpot</h3>
                      <p className="text-gray-700">{game.minJackpot}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 mb-1">Jackpot Odds</h3>
                      <p className="text-gray-700">{game.odds}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="how-to-play" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1">
                  <TabsTrigger
                    value="how-to-play"
                    className="data-[state=active]:bg-white data-[state=active]:text-gray-900"
                  >
                    How to Play
                  </TabsTrigger>
                  <TabsTrigger
                    value="prize-structure"
                    className="data-[state=active]:bg-white data-[state=active]:text-gray-900"
                  >
                    Prize Structure
                  </TabsTrigger>
                  <TabsTrigger
                    value="recent-results"
                    className="data-[state=active]:bg-white data-[state=active]:text-gray-900"
                  >
                    Recent Results
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="how-to-play" className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">How to Play {game.name}</h3>
                  <p className="text-gray-700 mb-4">{game.howToPlay}</p>
                  <div className="aspect-video w-full overflow-hidden rounded-lg border border-gray-200">
                    <iframe
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                      title={`How to Play ${game.name}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                </TabsContent>
                <TabsContent
                  value="prize-structure"
                  className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm"
                >
                  <h3 className="text-xl font-bold mb-4 text-gray-900">{game.name} Prize Structure</h3>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-gray-700">Match</TableHead>
                          <TableHead className="text-gray-700">Prize</TableHead>
                          <TableHead className="text-gray-700">Odds</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {game.prizeStructure.map((tier, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium text-gray-900">{tier.match}</TableCell>
                            <TableCell
                              className={tier.match === "5 + Powerball" ? "text-green-600 font-bold" : "text-gray-700"}
                            >
                              {tier.prize}
                            </TableCell>
                            <TableCell className="text-gray-700">{tier.odds}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                <TabsContent
                  value="recent-results"
                  className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm"
                >
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Recent {game.name} Results</h3>
                  <div className="space-y-4">
                    {game.recentResults.map((result, index) => (
                      <Card key={index} className="bg-white border-gray-200 shadow-sm">
                        <CardHeader className="p-4 pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-base text-gray-900">Draw Date: {result.date}</CardTitle>
                            </div>
                            {result.jackpotWon && <Badge className="bg-green-600 text-white">Jackpot Won</Badge>}
                          </div>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="flex flex-wrap gap-2 mb-2">
                            {result.numbers.split(", ").map((number, i) => (
                              <div
                                key={i}
                                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-900 font-medium"
                              >
                                {number}
                              </div>
                            ))}
                            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-medium">
                              {result.powerball}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              {/* Next Draw Card */}
              <Card className="bg-gray-900/70 border-gray-800">
                <CardHeader>
                  <CardTitle>Next Draw</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-400">Jackpot</p>
                      <p className="text-2xl font-bold text-green-400">{game.jackpot}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Time Remaining</p>
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></div>
                        <p className="font-medium text-indigo-400">
                          {formatCountdown(game.nextDraw.hours, game.nextDraw.minutes, game.nextDraw.seconds)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Next Draw Date</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <p className="text-gray-300">Saturday, March 18, 2023</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Draw Time</p>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <p className="text-gray-300">{game.drawTime}</p>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
                    asChild
                  >
                    <a href={game.buyLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Buy Ticket
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Jackpot History */}
              <Card className="bg-gray-900/70 border-gray-800">
                <CardHeader>
                  <CardTitle>Jackpot History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {game.jackpotHistory.map((jackpot, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <p className="text-gray-300">{jackpot.date}</p>
                        <p className="font-medium text-green-400">{jackpot.amount}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Ad Space */}
              <div className="h-[250px] bg-gray-800/50 rounded-lg flex items-center justify-center border border-gray-700 p-4">
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Advertisement</p>
                  <p className="text-gray-300 font-medium my-2">Increase Your Chances</p>
                  <p className="text-gray-400 text-sm mb-4">Join our premium lottery pool</p>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
                  >
                    Learn More
                  </Button>
                </div>
              </div>

              {/* Share */}
              <Card className="bg-gray-900/70 border-gray-800">
                <CardHeader>
                  <CardTitle>Share</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-800">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-800">
                      Set Reminder
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

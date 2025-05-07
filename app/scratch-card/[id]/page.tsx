"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, Share2, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ScratchCardDetails() {
  const [isFavorite, setIsFavorite] = useState(false)

  // Mock data for a scratch card
  const card = {
    id: 2,
    name: "Millionaire Maker",
    price: 30,
    jackpot: "5,000,000",
    remainingJackpots: 2,
    totalJackpots: 8,
    odds: "1 in 2.98",
    roi: 0.91,
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Best Odds"],
    description:
      "Become a millionaire instantly with our most exciting scratch card yet! With multiple ways to win and a grand prize of $5 million, Millionaire Maker offers the best odds for life-changing wins.",
    howToPlay:
      "1. Scratch off the coating to reveal your numbers.\n2. Match any of your numbers to the winning numbers to win the prize shown.\n3. Reveal a money bag symbol to win all prizes automatically!\n4. Uncover the 5X or 10X multiplier to multiply your winnings.",
  }

  // Mock data for past winners
  const pastWinners = [
    { date: "2023-12-15", location: "Los Angeles, CA", prize: "$5,000,000" },
    { date: "2023-11-03", location: "San Francisco, CA", prize: "$1,000,000" },
    { date: "2023-10-22", location: "San Diego, CA", prize: "$100,000" },
    { date: "2023-09-18", location: "Sacramento, CA", prize: "$50,000" },
  ]

  // Mock data for social stats
  const socialStats = {
    favorites: 1243,
    shares: 567,
    comments: 89,
  }

  // Mock data for purchase locations
  const purchaseLocations = [
    { name: "Lucky Corner Store", address: "123 Main St, Los Angeles, CA 90001", distance: "0.5 miles" },
    { name: "7-Eleven", address: "456 Oak Ave, Los Angeles, CA 90002", distance: "1.2 miles" },
    { name: "QuickMart", address: "789 Pine Rd, Los Angeles, CA 90003", distance: "2.3 miles" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container flex h-16 items-center">
          <Link
            href="/"
            className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Cards
          </Link>
        </div>
      </header>

      <main className="container py-6 md:py-12">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-full md:w-1/2 relative">
                <Image
                  src={card.image || "/placeholder.svg"}
                  alt={card.name}
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute top-2 left-2 flex gap-1">
                  {card.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-indigo-600 text-white">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-yellow-500 bg-clip-text text-transparent">
                  {card.name}
                </h1>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-green-600">${card.price}</span>
                  <span className="text-gray-600">• Odds: {card.odds}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Jackpot: ${card.jackpot}</span>
                    <span className="font-medium text-gray-900">
                      {card.remainingJackpots}/{card.totalJackpots} remaining
                    </span>
                  </div>
                  <Progress
                    value={(card.remainingJackpots / card.totalJackpots) * 100}
                    className="h-2 bg-gray-200"
                    indicatorClassName="bg-gradient-to-r from-green-600 to-yellow-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">ROI Score:</span>
                  <span className="font-medium text-green-600">{card.roi.toFixed(2)}</span>
                </div>
                <p className="text-gray-700">{card.description}</p>
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    className="flex-1 bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-500 hover:to-yellow-400"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Star className={`mr-2 h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                  </Button>
                  <Button variant="outline" className="border-gray-200 hover:bg-gray-100">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            </div>

            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle>How to Play</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  {card.howToPlay.split("\n").map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            <Tabs defaultValue="past-winners">
              <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1">
                <TabsTrigger
                  value="past-winners"
                  className="data-[state=active]:bg-white data-[state=active]:text-gray-900"
                >
                  Past Winners
                </TabsTrigger>
                <TabsTrigger value="social" className="data-[state=active]:bg-white data-[state=active]:text-gray-900">
                  Social Data
                </TabsTrigger>
                <TabsTrigger
                  value="where-to-buy"
                  className="data-[state=active]:bg-white data-[state=active]:text-gray-900"
                >
                  Where to Buy
                </TabsTrigger>
              </TabsList>
              <TabsContent value="past-winners">
                <Card className="bg-white border-gray-200 shadow-sm">
                  <CardHeader>
                    <CardTitle>Recent Winners</CardTitle>
                    <CardDescription>Check out the latest big wins!</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Prize</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pastWinners.map((winner, index) => (
                          <TableRow key={index}>
                            <TableCell>{winner.date}</TableCell>
                            <TableCell>{winner.location}</TableCell>
                            <TableCell>{winner.prize}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="social">
                <Card className="bg-white border-gray-200 shadow-sm">
                  <CardHeader>
                    <CardTitle>Social Stats</CardTitle>
                    <CardDescription>See how popular this scratch card is!</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-indigo-400">{socialStats.favorites}</div>
                        <div className="text-sm text-gray-600">Favorites</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-400">{socialStats.shares}</div>
                        <div className="text-sm text-gray-600">Shares</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-pink-400">{socialStats.comments}</div>
                        <div className="text-sm text-gray-600">Comments</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="where-to-buy">
                <Card className="bg-white border-gray-200 shadow-sm">
                  <CardHeader>
                    <CardTitle>Nearby Retailers</CardTitle>
                    <CardDescription>Find a store to purchase this scratch card</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {purchaseLocations.map((location, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <MapPin className="h-5 w-5 text-indigo-400 mt-1" />
                          <div>
                            <div className="font-medium text-gray-900">{location.name}</div>
                            <div className="text-sm text-gray-600">{location.address}</div>
                            <div className="text-sm text-gray-500">{location.distance}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle>Prize Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Prize</TableHead>
                      <TableHead>Odds</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>$5,000,000</TableCell>
                      <TableCell>1 in 3,000,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>$1,000,000</TableCell>
                      <TableCell>1 in 1,000,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>$10,000</TableCell>
                      <TableCell>1 in 10,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>$1,000</TableCell>
                      <TableCell>1 in 1,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>$100</TableCell>
                      <TableCell>1 in 100</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle>Game Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Cards Printed:</span>
                  <span className="font-medium text-gray-900">10,000,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cards Remaining:</span>
                  <span className="font-medium text-gray-900">4,523,651</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Game Start Date:</span>
                  <span className="font-medium text-gray-900">January 1, 2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="font-medium text-gray-900">March 15, 2023</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

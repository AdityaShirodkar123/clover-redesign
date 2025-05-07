"use client"

import Image from "next/image"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Mock data for top scratch cards
const topCards = [
  {
    id: 1,
    name: "Golden Fortune",
    price: 20,
    jackpot: "2,000,000",
    remainingJackpots: 3,
    totalJackpots: 10,
    odds: "1 in 3.12",
    roi: 0.82,
    image: "/placeholder.svg?height=200&width=300",
    tags: ["New", "Hot"],
  },
  {
    id: 2,
    name: "Millionaire Maker",
    price: 30,
    jackpot: "5,000,000",
    remainingJackpots: 2,
    totalJackpots: 8,
    odds: "1 in 2.98",
    roi: 0.91,
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Best Odds"],
  },
  {
    id: 3,
    name: "Lucky 7s",
    price: 10,
    jackpot: "777,777",
    remainingJackpots: 5,
    totalJackpots: 12,
    odds: "1 in 3.45",
    roi: 0.76,
    image: "/placeholder.svg?height=200&width=300",
    tags: [],
  },
  {
    id: 4,
    name: "Emerald Riches",
    price: 5,
    jackpot: "250,000",
    remainingJackpots: 8,
    totalJackpots: 15,
    odds: "1 in 4.12",
    roi: 0.68,
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Popular"],
  },
]

export default function TopScratchCards() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Top Performing Scratch Cards</h2>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {topCards.map((card) => (
          <Card
            key={card.id}
            className="overflow-hidden bg-white border-gray-200 hover:border-gray-300 transition-colors shadow-sm"
          >
            <div className="relative">
              <Image
                src={card.image || "/placeholder.svg"}
                alt={card.name}
                width={300}
                height={200}
                className="w-full h-[160px] object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
              >
                <Star className="h-4 w-4" />
                <span className="sr-only">Add to favorites</span>
              </Button>
              {card.tags.length > 0 && (
                <div className="absolute top-2 left-2 flex gap-1">
                  {card.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      className={`text-xs ${tag === "Hot" ? "bg-red-600" : tag === "New" ? "bg-green-600" : "bg-yellow-500"} text-white`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-lg text-gray-900">{card.name}</CardTitle>
              <CardDescription className="text-gray-600">
                ${card.price} • Odds: {card.odds}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Jackpot: ${card.jackpot}</span>
                  <span className="font-medium text-gray-900">
                    {card.remainingJackpots}/{card.totalJackpots}
                  </span>
                </div>
                <Progress
                  value={(card.remainingJackpots / card.totalJackpots) * 100}
                  className="h-2 bg-gray-200"
                  indicatorClassName="bg-gradient-to-r from-green-600 to-yellow-500"
                />
                <div className="flex justify-between items-center text-sm pt-2">
                  <span className="text-gray-600">ROI Score</span>
                  <span
                    className={`font-medium ${card.roi > 0.8 ? "text-green-600" : card.roi > 0.7 ? "text-amber-600" : "text-red-600"}`}
                  >
                    {card.roi.toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button
                variant="default"
                className="w-full bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-500 hover:to-yellow-400"
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

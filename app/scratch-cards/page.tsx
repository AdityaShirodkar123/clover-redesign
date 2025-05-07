"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, ChevronsUpDown, Star, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { SidebarNav } from "@/components/sidebar-nav"

export default function ScratchCardsPage() {
  // State for state selector
  const [stateOpen, setStateOpen] = useState(false)
  const [stateValue, setStateValue] = useState("ca")

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
    {
      id: 5,
      name: "Diamond Deluxe",
      price: 25,
      jackpot: "3,000,000",
      remainingJackpots: 4,
      totalJackpots: 12,
      odds: "1 in 3.05",
      roi: 0.88,
      image: "/placeholder.svg?height=200&width=300",
      tags: [],
    },
    {
      id: 6,
      name: "Cash Explosion",
      price: 10,
      jackpot: "500,000",
      remainingJackpots: 6,
      totalJackpots: 15,
      odds: "1 in 3.22",
      roi: 0.79,
      image: "/placeholder.svg?height=200&width=300",
      tags: [],
    },
  ]
    .map((card) => ({
      ...card,
      numericOdds: Number.parseFloat(card.odds.split(" ")[2]),
    }))
    .sort((a, b) => a.numericOdds - b.numericOdds)

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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-yellow-500 bg-clip-text text-transparent">
                Lottery Scratch Cards
              </h1>
              <p className="text-gray-600">
                Track winning odds, jackpot locations, and find the best scratch cards in your state.
              </p>
            </div>

            {/* State Selector Component */}
            <StateSelector open={stateOpen} setOpen={setStateOpen} value={stateValue} setValue={setStateValue} />
          </div>

          <div className="grid gap-6">
            <Tabs defaultValue="top-cards" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1">
                <TabsTrigger
                  value="top-cards"
                  className="data-[state=active]:bg-white data-[state=active]:text-gray-900"
                >
                  Top Cards
                </TabsTrigger>
                <TabsTrigger
                  value="by-price"
                  className="data-[state=active]:bg-white data-[state=active]:text-gray-900"
                >
                  By Price
                </TabsTrigger>
                <TabsTrigger
                  value="best-odds"
                  className="data-[state=active]:bg-white data-[state=active]:text-gray-900"
                >
                  Best Odds
                </TabsTrigger>
              </TabsList>
              <TabsContent value="top-cards" className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {topCards.map((card, index) => (
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
                          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-gray-900/80 backdrop-blur-sm hover:bg-gray-800"
                        >
                          <Star className="h-4 w-4" />
                          <span className="sr-only">Add to favorites</span>
                        </Button>
                        <div className="absolute top-2 left-2 flex gap-1 items-center">
                          <Badge className="bg-gradient-to-r from-green-600 to-yellow-500 text-white">
                            Rank #{index + 1}
                          </Badge>
                          {card.tags.map((tag, tagIndex) => (
                            <Badge
                              key={tagIndex}
                              variant={tag === "Hot" ? "destructive" : "secondary"}
                              className={`text-xs ${tag === "Hot" ? "bg-red-600" : tag === "New" ? "bg-indigo-600" : "bg-purple-600"}`}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
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
                              className={`font-medium ${card.roi > 0.8 ? "text-green-400" : card.roi > 0.7 ? "text-amber-400" : "text-red-400"}`}
                            >
                              {card.roi.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Link href={`/scratch-card/${card.id}`} className="w-full">
                          <Button
                            variant="default"
                            className="w-full bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-500 hover:to-yellow-400"
                          >
                            View Details
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="by-price" className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-900">$5 Scratch Cards</h3>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {topCards
                        .filter((card) => card.price === 5)
                        .map((card) => (
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
                                className="absolute top-2 right-2 h-8 w-8 rounded-full bg-gray-900/80 backdrop-blur-sm hover:bg-gray-800"
                              >
                                <Star className="h-4 w-4" />
                                <span className="sr-only">Add to favorites</span>
                              </Button>
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
                              </div>
                            </CardContent>
                            <CardFooter className="p-4 pt-0">
                              <Link href={`/scratch-card/${card.id}`} className="w-full">
                                <Button
                                  variant="default"
                                  className="w-full bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-500 hover:to-yellow-400"
                                >
                                  View Details
                                </Button>
                              </Link>
                            </CardFooter>
                          </Card>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-900">$10 Scratch Cards</h3>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {topCards
                        .filter((card) => card.price === 10)
                        .map((card) => (
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
                                className="absolute top-2 right-2 h-8 w-8 rounded-full bg-gray-900/80 backdrop-blur-sm hover:bg-gray-800"
                              >
                                <Star className="h-4 w-4" />
                                <span className="sr-only">Add to favorites</span>
                              </Button>
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
                              </div>
                            </CardContent>
                            <CardFooter className="p-4 pt-0">
                              <Link href={`/scratch-card/${card.id}`} className="w-full">
                                <Button
                                  variant="default"
                                  className="w-full bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-500 hover:to-yellow-400"
                                >
                                  View Details
                                </Button>
                              </Link>
                            </CardFooter>
                          </Card>
                        ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="best-odds" className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                <div className="space-y-6">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left p-3 text-gray-600 font-medium">Rank</th>
                          <th className="text-left p-3 text-gray-600 font-medium">Card Name</th>
                          <th className="text-left p-3 text-gray-600 font-medium">Price</th>
                          <th className="text-left p-3 text-gray-600 font-medium">Odds</th>
                          <th className="text-left p-3 text-gray-600 font-medium">ROI</th>
                          <th className="text-left p-3 text-gray-600 font-medium">Remaining Jackpots</th>
                          <th className="text-left p-3 text-gray-600 font-medium"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {topCards.map((card, index) => (
                          <tr key={card.id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="p-3 text-gray-700">{index + 1}</td>
                            <td className="p-3 text-gray-900 font-medium">{card.name}</td>
                            <td className="p-3 text-gray-700">${card.price}</td>
                            <td className="p-3 text-gray-700">{card.odds}</td>
                            <td className="p-3">
                              <span
                                className={`font-medium ${card.roi > 0.8 ? "text-green-400" : card.roi > 0.7 ? "text-amber-400" : "text-red-400"}`}
                              >
                                {card.roi.toFixed(2)}
                              </span>
                            </td>
                            <td className="p-3 text-gray-700">
                              {card.remainingJackpots}/{card.totalJackpots}
                            </td>
                            <td className="p-3">
                              <Link href={`/scratch-card/${card.id}`}>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-gray-200 hover:bg-gray-100 text-gray-900"
                                >
                                  Details
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

// State Selector Component
function StateSelector({ open, setOpen, value, setValue }) {
  const states = [
    { value: "ca", label: "California" },
    { value: "fl", label: "Florida" },
    { value: "ny", label: "New York" },
    { value: "tx", label: "Texas" },
    { value: "il", label: "Illinois" },
    { value: "pa", label: "Pennsylvania" },
    { value: "oh", label: "Ohio" },
    { value: "ga", label: "Georgia" },
    { value: "nc", label: "North Carolina" },
    { value: "mi", label: "Michigan" },
  ]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900"
        >
          {value ? states.find((state) => state.value === value)?.label : "Select state..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-white border-gray-200">
        <Command className="bg-transparent">
          <CommandInput placeholder="Search state..." className="text-gray-900" />
          <CommandList>
            <CommandEmpty className="text-gray-600">No state found.</CommandEmpty>
            <CommandGroup>
              {states.map((state) => (
                <CommandItem
                  key={state.value}
                  value={state.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                  className="text-gray-900 aria-selected:bg-gray-100"
                >
                  <Check className={cn("mr-2 h-4 w-4", value === state.value ? "opacity-100" : "opacity-0")} />
                  {state.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

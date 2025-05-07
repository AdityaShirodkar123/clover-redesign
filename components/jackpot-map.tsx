"use client"

import { useState } from "react"
import Image from "next/image"
import { MapPin } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for jackpot winners by county
const countyData = [
  { id: 1, county: "Los Angeles", state: "CA", winners: 12, totalAmount: "15,500,000" },
  { id: 2, county: "Orange", state: "CA", winners: 8, totalAmount: "9,200,000" },
  { id: 3, county: "San Diego", state: "CA", winners: 7, totalAmount: "8,100,000" },
  { id: 4, county: "Alameda", state: "CA", winners: 5, totalAmount: "6,300,000" },
  { id: 5, county: "Sacramento", state: "CA", winners: 4, totalAmount: "4,800,000" },
]

export default function JackpotMap() {
  const [timeframe, setTimeframe] = useState("year")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Jackpot Winners Map</h2>
          <p className="text-muted-foreground">See where the big winners are located in California</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-muted/20 rounded-lg overflow-hidden border relative min-h-[400px]">
          {/* This would be replaced with an actual map component */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=400&width=800"
              alt="California county map"
              width={800}
              height={400}
              className="w-full h-full object-cover"
            />
            {/* Overlay map pins */}
            <div className="absolute top-1/4 left-1/3">
              <div className="relative">
                <MapPin className="h-8 w-8 text-red-500" />
                <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  12
                </div>
              </div>
            </div>
            <div className="absolute top-1/3 left-1/2">
              <div className="relative">
                <MapPin className="h-7 w-7 text-red-500" />
                <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  8
                </div>
              </div>
            </div>
            <div className="absolute bottom-1/3 left-1/4">
              <div className="relative">
                <MapPin className="h-7 w-7 text-red-500" />
                <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  7
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Tabs defaultValue="counties">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="counties">Top Counties</TabsTrigger>
              <TabsTrigger value="retailers">Top Retailers</TabsTrigger>
            </TabsList>
            <TabsContent value="counties" className="space-y-4 pt-4">
              {countyData.map((county) => (
                <Card key={county.id} className="overflow-hidden">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{county.county} County</CardTitle>
                        <CardDescription>{county.state}</CardDescription>
                      </div>
                      <div className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs font-medium">
                        {county.winners} Winners
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-sm text-muted-foreground">
                      Total Jackpot Amount: <span className="font-semibold text-foreground">${county.totalAmount}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="retailers" className="pt-4">
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <p className="text-muted-foreground mb-2">Retailer data is available for premium subscribers.</p>
                <button className="text-primary text-sm font-medium hover:underline">Upgrade to Premium</button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

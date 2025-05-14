"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, LogIn } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchCounties, County } from "@/lib/fetchCounties";

export default function JackpotMap() {
  const [timeframe, setTimeframe] = useState("year");
  const [counties, setCounties] = useState<County[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState(1);
  const countiesPerPage = 5;

  useEffect(() => {
    fetchCounties()
      .then(data => {
        setCounties(data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load county data");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  // Pagination logic
  const totalPages = Math.ceil(counties.length / countiesPerPage);
  const startIdx = (page - 1) * countiesPerPage;
  const endIdx = startIdx + countiesPerPage;
  const paginatedCounties = counties.slice(startIdx, endIdx);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Jackpot Winners Map</h2>
          <p className="text-muted-foreground">
            See where the big winners are located in California
          </p>
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
            {!error &&
              counties.length > 0 &&
              counties.map(county => (
                <div
                  key={county.id}
                  className="absolute"
                  style={{
                    top: `0%`,
                    left: `0%`
                  }}
                >
                  <div className="relative">
                    <MapPin className="h-8 w-8 text-red-500" />
                    <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {county.attributes.Winners}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div>
          <Tabs defaultValue="counties">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="counties">Top Counties</TabsTrigger>
              <TabsTrigger value="retailers">Top Retailers</TabsTrigger>
            </TabsList>
            <TabsContent value="counties" className="space-y-4 pt-4">
              {error ? (
                <div className="text-red-500">Failed to load county data.</div>
              ) : (
                <>
                  {paginatedCounties.map(county => (
                    <Card key={county.id} className="overflow-hidden">
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">
                              {county.attributes.County} County
                            </CardTitle>
                            <CardDescription>
                              {county.attributes.State}
                            </CardDescription>
                          </div>
                          <div className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs font-medium">
                            {county.attributes.Winners} Winners
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="text-sm text-muted-foreground">
                          Total Amount Won:{" "}
                          <span className="font-semibold text-foreground">
                            ${county.attributes.TotalAmount.toLocaleString()}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {/* Pagination controls */}
                  <div className="flex justify-center items-center gap-4 mt-4">
                    <button
                      onClick={() => setPage(page - 1)}
                      disabled={page === 1}
                      className={`px-4 py-2 rounded-md border font-medium transition-colors ${
                        page === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-900 hover:bg-gray-100 border-gray-300"
                      }`}
                    >
                      Previous
                    </button>
                    <span className="text-sm text-muted-foreground">
                      Page {page} of {totalPages}
                    </span>
                    <button
                      onClick={() => setPage(page + 1)}
                      disabled={page === totalPages}
                      className={`px-4 py-2 rounded-md border font-medium transition-colors ${
                        page === totalPages
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-900 hover:bg-gray-100 border-gray-300"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </TabsContent>
            <TabsContent value="retailers" className="pt-4">
              {!isLoggedIn ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <h3 className="text-xl font-semibold mb-2 text-black">
                    Sign in for FREE to view top retailers
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Find out which retailers have the most winners and jackpots
                    with a free account.
                  </p>
                  <div className="flex gap-4 mb-2">
                    <button
                      onClick={() => setIsLoggedIn(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors"
                    >
                      <LogIn className="h-4 w-4" /> Login
                    </button>
                    <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md font-medium text-gray-900 bg-white hover:bg-gray-100 transition-colors">
                      Sign Up
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-muted-foreground mb-2">
                    Retailer data is available for premium subscribers.
                  </p>
                  <span className="text-green-600 font-medium cursor-pointer hover:underline">
                    Upgrade to Premium
                  </span>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

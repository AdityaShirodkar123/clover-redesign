"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function FavoriteCards() {
  // Mock authentication state - would be replaced with actual auth
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Mock favorite cards data
  const favoriteCards = [
    {
      id: 5,
      name: "Diamond Deluxe",
      price: 25,
      jackpot: "3,000,000",
      remainingJackpots: 4,
      totalJackpots: 12,
      odds: "1 in 3.05",
      roi: 0.88,
      image: "/placeholder.svg?height=200&width=300"
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
      image: "/placeholder.svg?height=200&width=300"
    }
  ];

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-muted rounded-full p-6 mb-4">
          <Star className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">
          Sign in to view your favorites
        </h3>
        <p className="text-muted-foreground max-w-md mb-6">
          Track your favorite scratch cards to get updates on odds, remaining
          prizes, and more.
        </p>
        <div className="flex gap-4">
          <Button onClick={() => setIsLoggedIn(true)} className="gap-2">
            <LogIn className="h-4 w-4" />
            Login
          </Button>
          <Button variant="outline">Sign Up</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Your Favorite Cards</h2>
        <Button variant="outline" size="sm">
          Manage Favorites
        </Button>
      </div>
      {favoriteCards.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favoriteCards.map(card => (
            <Card key={card.id} className="overflow-hidden">
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
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm text-yellow-500"
                >
                  <Star className="h-4 w-4 fill-current" />
                  <span className="sr-only">Remove from favorites</span>
                </Button>
              </div>
              <CardHeader className="p-4 pb-0">
                <CardTitle className="text-lg">{card.name}</CardTitle>
                <CardDescription>
                  ${card.price} • Odds: {card.odds}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Jackpot: ${card.jackpot}</span>
                    <span className="font-medium">
                      {card.remainingJackpots}/{card.totalJackpots}
                    </span>
                  </div>
                  <Progress
                    value={(card.remainingJackpots / card.totalJackpots) * 100}
                    className="h-2"
                  />
                  <div className="flex justify-between items-center text-sm pt-2">
                    <span className="text-muted-foreground">ROI Score</span>
                    <span
                      className={`font-medium ${
                        card.roi > 0.8
                          ? "text-green-600"
                          : card.roi > 0.7
                          ? "text-amber-600"
                          : "text-red-600"
                      }`}
                    >
                      {card.roi.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button variant="default" className="w-full">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
          <p className="text-muted-foreground mb-4">
            Start adding scratch cards to your favorites to track them here.
          </p>
          <Button>Browse Cards</Button>
        </div>
      )}
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchScratchers } from "@/lib/fetchScratchers";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ScratchCard {
  id: number;
  Title: string;
  Price: number;
  Jackpot: number;
  RemainingPrizes: number;
  Odds: number;
  GameID: number;
  Place: number;
  Active: boolean;
  EndDate: string;
  MoneyWon: number;
}

export default function TopScratchCards() {
  const [cards, setCards] = useState<ScratchCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchScratchers()
      .then(data => {
        setCards(data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load scratchers");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Top Performing Scratch Cards
        </h2>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cards.map(card => {
          const paddedGameId = card.GameID.toString().padStart(5, "0");
          const imageUrl = `https://www.njlottery.com/content/dam/portal/images/instant-games/${paddedGameId}/thumb-rc@2X.png`;

          return (
            <Card
              key={card.id}
              className="overflow-hidden bg-white border-gray-200 hover:border-gray-300 transition-colors shadow-sm"
            >
              <div className="relative">
                <Image
                  src={imageUrl}
                  alt={card.Title}
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
              </div>

              <CardHeader className="p-4 pb-0">
                <Badge className="mb-2 inline-flex px-2 py-1 text-xs bg-gradient-to-r from-green-600 to-yellow-500 text-white">
                  Rank #{card.Place}
                </Badge>
                <CardTitle className="text-lg text-gray-900">
                  {card.Title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  ${card.Price} • Odds: 1 in {card.Odds.toFixed(2)}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      Jackpot: ${(card.Jackpot / 100).toLocaleString()}
                    </span>
                    <span className="font-medium text-gray-900">
                      {card.RemainingPrizes.toLocaleString()}
                    </span>
                  </div>
                  <Progress
                    value={(card.RemainingPrizes / card.Jackpot) * 100}
                    className="h-2 bg-gray-200"
                  />
                  <div className="flex justify-between items-center text-sm pt-2">
                    <span className="text-gray-600">Game ID</span>
                    <span className="font-medium text-gray-900">
                      {card.GameID}
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
          );
        })}
      </div>
    </div>
  );
}

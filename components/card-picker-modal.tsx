"use client";

import { useState } from "react";
import { Search, Calendar, DollarSign } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ScratchCard {
  id: string;
  name: string;
  price: number;
  topPrize: string;
  odds: string;
  image: string;
  category: string;
  isNew?: boolean;
  isHot?: boolean;
}

interface DrawGame {
  id: string;
  name: string;
  drawDays: string[];
  jackpot: string;
  nextDraw: string;
  image: string;
  category: string;
}

export interface CardPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCard: (
    card: ScratchCard | DrawGame,
    type: "scratch" | "draw"
  ) => void;
}

export type { ScratchCard, DrawGame };

export default function CardPickerModal({
  isOpen,
  onClose,
  onSelectCard
}: CardPickerModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("scratch");

  const scratchCards: ScratchCard[] = [
    {
      id: "1",
      name: "Diamond Deluxe",
      price: 25,
      topPrize: "$50,000",
      odds: "1 in 3.05",
      image: "/placeholder.svg?height=120&width=180",
      category: "premium",
      isHot: true
    },
    {
      id: "2",
      name: "Golden Fortune",
      price: 20,
      topPrize: "$2,000,000",
      odds: "1 in 3.12",
      image: "/placeholder.svg?height=120&width=180",
      category: "premium",
      isNew: true
    },
    {
      id: "3",
      name: "Lucky 7s",
      price: 10,
      topPrize: "$777,777",
      odds: "1 in 3.45",
      image: "/placeholder.svg?height=120&width=180",
      category: "mid-tier"
    },
    {
      id: "4",
      name: "Cash Blast",
      price: 5,
      topPrize: "$100,000",
      odds: "1 in 4.12",
      image: "/placeholder.svg?height=120&width=180",
      category: "budget"
    },
    {
      id: "5",
      name: "Emerald Riches",
      price: 5,
      topPrize: "$250,000",
      odds: "1 in 4.12",
      image: "/placeholder.svg?height=120&width=180",
      category: "budget"
    },
    {
      id: "6",
      name: "Millionaire Maker",
      price: 30,
      topPrize: "$5,000,000",
      odds: "1 in 2.98",
      image: "/placeholder.svg?height=120&width=180",
      category: "premium"
    }
  ];

  const drawGames: DrawGame[] = [
    {
      id: "1",
      name: "Powerball",
      drawDays: ["Mon", "Wed", "Sat"],
      jackpot: "$150,000,000",
      nextDraw: "Tonight 8 PM",
      image: "/placeholder.svg?height=120&width=180",
      category: "multi-state"
    },
    {
      id: "2",
      name: "Mega Millions",
      drawDays: ["Tue", "Fri"],
      jackpot: "$75,000,000",
      nextDraw: "Friday 8 PM",
      image: "/placeholder.svg?height=120&width=180",
      category: "multi-state"
    },
    {
      id: "3",
      name: "California SuperLotto Plus",
      drawDays: ["Wed", "Sat"],
      jackpot: "$12,000,000",
      nextDraw: "Wednesday 7:30 PM",
      image: "/placeholder.svg?height=120&width=180",
      category: "state"
    },
    {
      id: "4",
      name: "Daily 4",
      drawDays: ["Daily"],
      jackpot: "$10,000",
      nextDraw: "Today 6:30 PM",
      image: "/placeholder.svg?height=120&width=180",
      category: "daily"
    }
  ];

  const categories = {
    scratch: [
      { id: "all", label: "All Cards" },
      { id: "premium", label: "Premium ($20+)" },
      { id: "mid-tier", label: "Mid-Tier ($5-$19)" },
      { id: "budget", label: "Budget ($1-$4)" }
    ],
    draw: [
      { id: "all", label: "All Games" },
      { id: "multi-state", label: "Multi-State" },
      { id: "state", label: "State Games" },
      { id: "daily", label: "Daily Games" }
    ]
  };

  const filteredScratchCards = scratchCards.filter(card => {
    const matchesSearch = card.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || card.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredDrawGames = drawGames.filter(game => {
    const matchesSearch = game.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCardSelect = (card: ScratchCard | DrawGame) => {
    onSelectCard(card, activeTab as "scratch" | "draw");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-semibold">
            Choose a Game
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 pt-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="scratch">Scratch Cards</TabsTrigger>
              <TabsTrigger value="draw">Draw Games</TabsTrigger>
            </TabsList>

            {/* Search and Filter */}
            <div className="flex gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder={`Search ${
                    activeTab === "scratch" ? "scratch cards" : "draw games"
                  }...`}
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <ScrollArea className="w-full whitespace-nowrap mb-4">
              <div className="flex gap-2 pb-2">
                {categories[activeTab as keyof typeof categories].map(
                  category => (
                    <Button
                      key={category.id}
                      variant={
                        selectedCategory === category.id ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="whitespace-nowrap"
                    >
                      {category.label}
                    </Button>
                  )
                )}
              </div>
            </ScrollArea>

            <TabsContent value="scratch" className="mt-0">
              <ScrollArea className="h-[400px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pr-4">
                  {filteredScratchCards.map(card => (
                    <Card
                      key={card.id}
                      className="cursor-pointer hover:shadow-md transition-shadow border-gray-200"
                      onClick={() => handleCardSelect(card)}
                    >
                      <CardContent className="p-4">
                        <div className="relative mb-3">
                          <img
                            src={card.image || "/placeholder.svg"}
                            alt={card.name}
                            className="w-full h-24 object-cover rounded-md bg-gray-100"
                          />
                          <div className="absolute top-2 right-2 flex gap-1">
                            {card.isNew && (
                              <Badge className="bg-green-600 text-white text-xs">
                                New
                              </Badge>
                            )}
                            {card.isHot && (
                              <Badge className="bg-red-600 text-white text-xs">
                                Hot
                              </Badge>
                            )}
                          </div>
                        </div>
                        <h3 className="font-semibold text-sm mb-2">
                          {card.name}
                        </h3>
                        <div className="space-y-1 text-xs text-gray-600">
                          <div className="flex justify-between">
                            <span>Price:</span>
                            <span className="font-medium">${card.price}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Top Prize:</span>
                            <span className="font-medium text-green-600">
                              {card.topPrize}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Odds:</span>
                            <span className="font-medium">{card.odds}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="draw" className="mt-0">
              <ScrollArea className="h-[400px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-4">
                  {filteredDrawGames.map(game => (
                    <Card
                      key={game.id}
                      className="cursor-pointer hover:shadow-md transition-shadow border-gray-200"
                      onClick={() => handleCardSelect(game)}
                    >
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <img
                            src={game.image || "/placeholder.svg"}
                            alt={game.name}
                            className="w-16 h-16 object-cover rounded-md bg-gray-100"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm mb-2">
                              {game.name}
                            </h3>
                            <div className="space-y-1 text-xs text-gray-600">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{game.drawDays.join(", ")}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />
                                <span className="font-medium text-green-600">
                                  {game.jackpot}
                                </span>
                              </div>
                              <div className="text-blue-600 font-medium">
                                Next: {game.nextDraw}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}

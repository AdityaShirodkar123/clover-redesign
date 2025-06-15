"use client";

import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share,
  Trophy,
  TrendingUp,
  Calendar,
  DollarSign,
  Users,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import CardPickerModal from "./card-picker-modal";
import NumberPickerModal from "./number-picker-modal";
import DiscussionBoardModal from "./discussion-board-modal";

interface LotteryPost {
  id: string;
  user: {
    name: string;
    username: string;
    avatar: string;
    verified?: boolean;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  type: "draw" | "scratch";
  gameData: {
    game: string;
    numbers?: number[];
    powerball?: number;
    scratchCard?: {
      name: string;
      price: number;
      outcome: string;
      winAmount?: number;
    };
  };
  isBigWin?: boolean;
  liked?: boolean;
  discussionBoard?: "trending" | "winners" | null;
}

interface Comment {
  id: string;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
}

interface LeaderboardEntry {
  rank: number;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  winAmount: number;
  game: string;
  timeAgo: string;
}

export default function LotterySocialFeed({
  isLoggedIn,
  setIsLoggedIn
}: {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}) {
  const [posts, setPosts] = useState<LotteryPost[]>([
    {
      id: "big-win",
      user: {
        name: "Sarah Martinez",
        username: "@sarahm_lucky",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true
      },
      content:
        "I CAN'T BELIEVE IT! Just won $50,000 on the Diamond Deluxe scratch-off! 💎✨ My hands are literally shaking right now. This is life-changing money! Thank you universe! 🙏",
      timestamp: "2 hours ago",
      likes: 1247,
      comments: 89,
      shares: 156,
      type: "scratch",
      gameData: {
        game: "Diamond Deluxe",
        scratchCard: {
          name: "Diamond Deluxe",
          price: 25,
          outcome: "WIN",
          winAmount: 50000
        }
      },
      isBigWin: true,
      liked: false,
      discussionBoard: "winners"
    },
    {
      id: "2",
      user: {
        name: "Mike Chen",
        username: "@mikechen88",
        avatar: "/placeholder.svg?height=40&width=40"
      },
      content:
        "Playing my lucky numbers again tonight! These have been in my family for generations. Fingers crossed for the Powerball! 🤞",
      timestamp: "4 hours ago",
      likes: 23,
      comments: 12,
      shares: 3,
      type: "draw",
      gameData: {
        game: "Powerball",
        numbers: [7, 14, 23, 38, 55],
        powerball: 9
      },
      liked: true,
      discussionBoard: "trending"
    },
    {
      id: "3",
      user: {
        name: "Jennifer Lopez",
        username: "@jlopez_wins",
        avatar: "/placeholder.svg?height=40&width=40"
      },
      content:
        "Small win but still happy! $20 on a $5 scratch-off. Sometimes the little wins keep you going 😊",
      timestamp: "6 hours ago",
      likes: 45,
      comments: 8,
      shares: 2,
      type: "scratch",
      gameData: {
        game: "Lucky 7s",
        scratchCard: {
          name: "Lucky 7s",
          price: 5,
          outcome: "WIN",
          winAmount: 20
        }
      },
      liked: false,
      discussionBoard: null
    },
    {
      id: "4",
      user: {
        name: "David Rodriguez",
        username: "@davidr_lottery",
        avatar: "/placeholder.svg?height=40&width=40"
      },
      content:
        "Quick pick for tonight's Mega Millions. Sometimes random is the way to go! What's everyone else playing?",
      timestamp: "8 hours ago",
      likes: 18,
      comments: 15,
      shares: 1,
      type: "draw",
      gameData: {
        game: "Mega Millions",
        numbers: [3, 17, 21, 45, 66],
        powerball: 11
      },
      liked: false,
      discussionBoard: null
    }
  ]);

  const [comments] = useState<{ [postId: string]: Comment[] }>({
    "big-win": [
      {
        id: "c1",
        user: {
          name: "Alex Thompson",
          username: "@alexthompson",
          avatar: "/placeholder.svg?height=32&width=32"
        },
        content:
          "Congratulations! That's amazing! What's your strategy for scratch-offs?",
        timestamp: "1 hour ago",
        likes: 12
      },
      {
        id: "c2",
        user: {
          name: "Maria Garcia",
          username: "@mariagarcia",
          avatar: "/placeholder.svg?height=32&width=32"
        },
        content:
          "So happy for you! Diamond Deluxe has been hot lately. I won $500 on it last week!",
        timestamp: "1 hour ago",
        likes: 8
      },
      {
        id: "c3",
        user: {
          name: "John Smith",
          username: "@johnsmith",
          avatar: "/placeholder.svg?height=32&width=32"
        },
        content:
          "Incredible! I always check the remaining prizes before buying. Diamond Deluxe still has good odds.",
        timestamp: "45 minutes ago",
        likes: 15
      }
    ],
    "2": [
      {
        id: "c4",
        user: {
          name: "Lisa Wang",
          username: "@lisawang",
          avatar: "/placeholder.svg?height=32&width=32"
        },
        content:
          "Love that you stick with family numbers! Good luck tonight! 🍀",
        timestamp: "3 hours ago",
        likes: 5
      },
      {
        id: "c5",
        user: {
          name: "Tom Wilson",
          username: "@tomwilson",
          avatar: "/placeholder.svg?height=32&width=32"
        },
        content: "Those are solid numbers! 7 and 23 have been hot lately.",
        timestamp: "2 hours ago",
        likes: 3
      }
    ]
  });

  const [leaderboard] = useState<LeaderboardEntry[]>([
    {
      rank: 1,
      user: {
        name: "Sarah Martinez",
        username: "@sarahm_lucky",
        avatar: "/placeholder.svg?height=32&width=32"
      },
      winAmount: 50000,
      game: "Diamond Deluxe",
      timeAgo: "2 hours ago"
    },
    {
      rank: 2,
      user: {
        name: "Robert Kim",
        username: "@robertkim",
        avatar: "/placeholder.svg?height=32&width=32"
      },
      winAmount: 25000,
      game: "Powerball",
      timeAgo: "1 day ago"
    },
    {
      rank: 3,
      user: {
        name: "Amanda Foster",
        username: "@amandaf",
        avatar: "/placeholder.svg?height=32&width=32"
      },
      winAmount: 10000,
      game: "Mega Millions",
      timeAgo: "3 days ago"
    }
  ]);

  const [newPost, setNewPost] = useState("");
  const [showComments, setShowComments] = useState<{
    [postId: string]: boolean;
  }>({});
  const [showCardPicker, setShowCardPicker] = useState(false);
  const [showNumberPicker, setShowNumberPicker] = useState(false);
  const [selectedGame, setSelectedGame] = useState<string>("");
  const [showTrendingBoard, setShowTrendingBoard] = useState(false);
  const [showWinnersBoard, setShowWinnersBoard] = useState(false);

  const handleLike = (postId: string) => {
    setPosts(
      posts.map(post =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    );
  };

  const toggleComments = (postId: string) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleCardSelect = (card: any, type: "scratch" | "draw") => {
    if (type === "draw") {
      setSelectedGame(card.name);
      setShowNumberPicker(true);
    } else {
      // Handle scratch card selection
      const gameData = {
        game: card.name,
        scratchCard: {
          name: card.name,
          price: card.price,
          outcome: "PENDING"
        }
      };
      // Add to post content or create new post
      console.log("Selected scratch card:", gameData);
    }
  };

  const handleNumberConfirm = (numbers: number[], powerball?: number) => {
    const gameData = {
      game: selectedGame,
      numbers,
      powerball
    };
    // Add to post content or create new post
    console.log("Selected numbers:", gameData);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
    return `$${num}`;
  };

  const getDiscussionBoardTag = (
    board: "trending" | "winners" | null | undefined
  ) => {
    if (!board) return null;

    return (
      <Badge
        variant="outline"
        className={`text-xs ${
          board === "trending"
            ? "border-green-500 text-green-700 bg-green-50"
            : "border-yellow-500 text-yellow-700 bg-yellow-50"
        }`}
      >
        {board === "trending" ? (
          <>
            <TrendingUp className="h-3 w-3 mr-1" />
            Trending Discussion
          </>
        ) : (
          <>
            <Trophy className="h-3 w-3 mr-1" />
            Winners Discussion
          </>
        )}
      </Badge>
    );
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-gray-100 rounded-full p-6 mb-4">
          <Users className="h-10 w-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900">
          Join the Lottery Community
        </h3>
        <p className="text-gray-600 max-w-md mb-6">
          Connect with other players, share your wins, discuss strategies, and
          celebrate together!
        </p>
        <div className="flex gap-4">
          <Button
            onClick={() => setIsLoggedIn(true)}
            className="gap-2 bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-500 hover:to-yellow-400 text-gray-900"
          >
            <Users className="h-4 w-4" />
            Join Community
          </Button>
          <Button
            variant="outline"
            className="border-gray-200 bg-white hover:bg-gray-100 text-gray-900"
          >
            Learn More
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Main Feed */}
            <div className="flex-1 min-w-0 space-y-6 md:w-2/3 lg:w-9/10">
              {/* Create Post */}
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Share your lottery experience, wins, or strategy..."
                        value={newPost}
                        onChange={e => setNewPost(e.target.value)}
                        className="min-h-[100px] border-gray-200 resize-none mb-4"
                      />
                      <div className="flex justify-between items-center">
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-sm"
                            onClick={() => setShowNumberPicker(true)}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Numbers
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-sm"
                            onClick={() => setShowCardPicker(true)}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Scratch Card
                          </Button>
                        </div>
                        <Button
                          size="sm"
                          disabled={!newPost.trim()}
                          className="bg-green-100 text-green-700 hover:bg-green-200"
                        >
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Posts */}
              {posts.map(post => (
                <Card
                  key={post.id}
                  className={`bg-white border-gray-200 shadow-sm ${
                    post.isBigWin
                      ? "ring-2 ring-yellow-400 bg-gradient-to-r from-yellow-50 to-green-50"
                      : ""
                  }`}
                >
                  {post.isBigWin && (
                    <div className="bg-gradient-to-r from-yellow-400 to-green-500 text-white px-6 py-3 text-center font-semibold text-lg">
                      🎉 BIG WIN ALERT! 🎉
                    </div>
                  )}
                  <CardContent className="p-6">
                    {/* User Info */}
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={post.user.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {post.user.name
                            .split(" ")
                            .map(n => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-base text-gray-900">
                            {post.user.name}
                          </span>
                          {post.user.verified && (
                            <Badge className="bg-blue-500 text-white text-xs">
                              ✓
                            </Badge>
                          )}
                          <span className="text-gray-500 text-sm">
                            {post.user.username}
                          </span>
                          <span className="text-gray-400">·</span>
                          <span className="text-gray-500 text-sm">
                            {post.timestamp}
                          </span>
                        </div>
                        {getDiscussionBoardTag(post.discussionBoard)}
                      </div>
                    </div>

                    {/* Post Content */}
                    <p className="text-gray-900 text-lg mb-6">{post.content}</p>

                    {/* Game Data */}
                    <Card className="bg-gray-50 border-gray-200 mb-6">
                      <CardContent className="p-6">
                        {post.type === "draw" ? (
                          <div>
                            <div className="flex items-center gap-3 mb-4">
                              <Calendar className="h-5 w-5 text-gray-600" />
                              <span className="font-semibold text-lg text-gray-900">
                                {post.gameData.game}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-base text-gray-600">
                                Numbers:
                              </span>
                              <div className="flex gap-2">
                                {post.gameData.numbers?.map((num, index) => (
                                  <div
                                    key={index}
                                    className="w-10 h-10 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center text-base font-semibold"
                                  >
                                    {num}
                                  </div>
                                ))}
                                {post.gameData.powerball && (
                                  <>
                                    <span className="mx-2 text-gray-400">
                                      +
                                    </span>
                                    <div className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center text-base font-semibold">
                                      {post.gameData.powerball}
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <DollarSign className="h-5 w-5 text-gray-600" />
                                <span className="font-semibold text-lg text-gray-900">
                                  {post.gameData.scratchCard?.name}
                                </span>
                              </div>
                              <Badge
                                className={`text-base px-4 py-1 ${
                                  post.gameData.scratchCard?.outcome === "WIN"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {post.gameData.scratchCard?.outcome}
                              </Badge>
                            </div>
                            <div className="flex justify-between text-base text-gray-600">
                              <span>
                                Ticket Price: $
                                {post.gameData.scratchCard?.price}
                              </span>
                              {post.gameData.scratchCard?.winAmount && (
                                <span className="font-semibold text-green-600">
                                  Won:{" "}
                                  {formatNumber(
                                    post.gameData.scratchCard.winAmount
                                  )}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Engagement Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`gap-2 text-base ${
                          post.liked ? "text-red-500" : "text-gray-600"
                        }`}
                        onClick={() => handleLike(post.id)}
                      >
                        <Heart
                          className={`h-5 w-5 ${
                            post.liked ? "fill-current" : ""
                          }`}
                        />
                        {post.likes}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2 text-base text-gray-600"
                        onClick={() => toggleComments(post.id)}
                      >
                        <MessageCircle className="h-5 w-5" />
                        {post.comments}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2 text-base text-gray-600"
                      >
                        <Share className="h-5 w-5" />
                        {post.shares}
                      </Button>
                    </div>

                    {/* Comments */}
                    {showComments[post.id] && comments[post.id] && (
                      <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                        {comments[post.id].map(comment => (
                          <div key={comment.id} className="flex gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={comment.user.avatar || "/placeholder.svg"}
                              />
                              <AvatarFallback>
                                {comment.user.name
                                  .split(" ")
                                  .map(n => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="bg-gray-50 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold text-sm text-gray-900">
                                    {comment.user.name}
                                  </span>
                                  <span className="text-gray-500 text-xs">
                                    {comment.timestamp}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-700">
                                  {comment.content}
                                </p>
                              </div>
                              <div className="flex items-center gap-4 mt-1 ml-3">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs text-gray-500 p-0 h-auto"
                                >
                                  <Heart className="h-3 w-3 mr-1" />
                                  {comment.likes}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs text-gray-500 p-0 h-auto"
                                >
                                  Reply
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Sidebar */}
            <div className="md:w-1/3 lg:w-1/4 flex-shrink-0 space-y-6">
              {/* Leaderboard */}
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <h3 className="font-semibold text-gray-900">
                      Top Wins This Week
                    </h3>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-3">
                    {leaderboard.map(entry => (
                      <div key={entry.rank} className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            entry.rank === 1
                              ? "bg-yellow-500 text-white"
                              : entry.rank === 2
                              ? "bg-gray-400 text-white"
                              : "bg-orange-500 text-white"
                          }`}
                        >
                          {entry.rank}
                        </div>
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={entry.user.avatar || "/placeholder.svg"}
                          />
                          <AvatarFallback>
                            {entry.user.name
                              .split(" ")
                              .map(n => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-gray-900 truncate">
                            {entry.user.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {entry.game} · {entry.timeAgo}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">
                            {formatNumber(entry.winAmount)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Trending Games */}
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <h3 className="font-semibold text-gray-900">
                      Trending Games
                    </h3>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-900">
                        Diamond Deluxe
                      </span>
                      <Badge className="bg-green-100 text-green-800">Hot</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-900">Powerball</span>
                      <Badge className="bg-blue-100 text-blue-800">
                        Popular
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-900">Lucky 7s</span>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        Rising
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Discussion Board Links */}
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-blue-500" />
                    <h3 className="font-semibold text-gray-900">
                      Discussion Boards
                    </h3>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 h-auto p-3"
                    onClick={() => setShowTrendingBoard(true)}
                  >
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <div className="text-left">
                      <div className="font-medium text-sm">Trending Games</div>
                      <div className="text-xs text-gray-500">
                        Discuss hot games & strategies
                      </div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 h-auto p-3"
                    onClick={() => setShowWinnersBoard(true)}
                  >
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    <div className="text-left">
                      <div className="font-medium text-sm">Big Wins</div>
                      <div className="text-xs text-gray-500">
                        Celebrate & share winning tips
                      </div>
                    </div>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CardPickerModal
        isOpen={showCardPicker}
        onClose={() => setShowCardPicker(false)}
        onSelectCard={handleCardSelect}
      />

      <NumberPickerModal
        isOpen={showNumberPicker}
        onClose={() => setShowNumberPicker(false)}
        gameName={selectedGame || "Powerball"}
        onConfirm={handleNumberConfirm}
      />

      <DiscussionBoardModal
        isOpen={showTrendingBoard}
        onClose={() => setShowTrendingBoard(false)}
        type="trending"
        title="Trending Games Discussion"
      />

      <DiscussionBoardModal
        isOpen={showWinnersBoard}
        onClose={() => setShowWinnersBoard(false)}
        type="winners"
        title="Big Wins Discussion"
      />
    </>
  );
}

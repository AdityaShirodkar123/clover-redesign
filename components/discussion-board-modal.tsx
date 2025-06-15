"use client";

import { useState } from "react";
import { TrendingUp, Trophy, Send, Heart, Reply } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DiscussionPost {
  id: string;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
  liked?: boolean;
  game?: string;
}

export interface DiscussionBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "trending" | "winners";
  title: string;
}

export default function DiscussionBoardModal({
  isOpen,
  onClose,
  type,
  title
}: DiscussionBoardModalProps) {
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState<DiscussionPost[]>(
    type === "trending" ? trendingPosts : winnersPosts
  );

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

  const handleSubmitPost = () => {
    if (newPost.trim()) {
      const post: DiscussionPost = {
        id: Date.now().toString(),
        user: {
          name: "You",
          username: "@you",
          avatar: "/placeholder.svg?height=40&width=40"
        },
        content: newPost,
        timestamp: "Just now",
        likes: 0,
        replies: 0,
        liked: false
      };
      setPosts([post, ...posts]);
      setNewPost("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center gap-3">
            {type === "trending" ? (
              <TrendingUp className="h-6 w-6 text-green-500" />
            ) : (
              <Trophy className="h-6 w-6 text-yellow-500" />
            )}
            <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex flex-col h-[600px]">
          {/* New Post */}
          <div className="p-4 border-b bg-gray-50">
            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder={`Share your thoughts about ${
                    type === "trending" ? "trending games" : "big wins"
                  }...`}
                  value={newPost}
                  onChange={e => setNewPost(e.target.value)}
                  className="min-h-[60px] resize-none border-gray-200"
                />
                <div className="flex justify-end mt-2">
                  <Button
                    size="sm"
                    onClick={handleSubmitPost}
                    disabled={!newPost.trim()}
                    className="bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-700 hover:to-yellow-600"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Posts */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {posts.map(post => (
                <Card key={post.id} className="border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
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
                          <span className="font-semibold text-sm">
                            {post.user.name}
                          </span>
                          <span className="text-gray-500 text-xs">
                            {post.user.username}
                          </span>
                          <span className="text-gray-400">·</span>
                          <span className="text-gray-500 text-xs">
                            {post.timestamp}
                          </span>
                          {post.game && (
                            <Badge variant="outline" className="text-xs">
                              {post.game}
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-900 text-sm mb-3">
                          {post.content}
                        </p>
                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`gap-1 text-xs h-auto p-1 ${
                              post.liked ? "text-red-500" : "text-gray-500"
                            }`}
                            onClick={() => handleLike(post.id)}
                          >
                            <Heart
                              className={`h-3 w-3 ${
                                post.liked ? "fill-current" : ""
                              }`}
                            />
                            {post.likes}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1 text-xs text-gray-500 h-auto p-1"
                          >
                            <Reply className="h-3 w-3" />
                            {post.replies}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const trendingPosts: DiscussionPost[] = [
  {
    id: "1",
    user: {
      name: "Alex Chen",
      username: "@alexchen",
      avatar: "/placeholder.svg?height=32&width=32"
    },
    content:
      "Diamond Deluxe has been on fire lately! I've seen 3 big wins this week. The odds seem better than advertised.",
    timestamp: "2 hours ago",
    likes: 15,
    replies: 8,
    game: "Diamond Deluxe"
  },
  {
    id: "2",
    user: {
      name: "Maria Rodriguez",
      username: "@mariarodriguez",
      avatar: "/placeholder.svg?height=32&width=32"
    },
    content:
      "Anyone else notice Powerball jackpot climbing fast? Might be worth playing this week.",
    timestamp: "4 hours ago",
    likes: 23,
    replies: 12,
    game: "Powerball"
  },
  {
    id: "3",
    user: {
      name: "John Smith",
      username: "@johnsmith",
      avatar: "/placeholder.svg?height=32&width=32"
    },
    content:
      "Lucky 7s strategy: I always buy them in pairs. Hit $100 twice this month doing this!",
    timestamp: "6 hours ago",
    likes: 31,
    replies: 15,
    game: "Lucky 7s"
  }
];

const winnersPosts: DiscussionPost[] = [
  {
    id: "1",
    user: {
      name: "Jennifer Lopez",
      username: "@jlopez",
      avatar: "/placeholder.svg?height=32&width=32"
    },
    content:
      "Congrats to Sarah on the $50K win! That Diamond Deluxe card has been treating people well. What's your secret?",
    timestamp: "1 hour ago",
    likes: 42,
    replies: 18,
    game: "Diamond Deluxe"
  },
  {
    id: "2",
    user: {
      name: "Mike Thompson",
      username: "@mikethompson",
      avatar: "/placeholder.svg?height=32&width=32"
    },
    content:
      "Big wins always inspire me to keep playing. That $25K Powerball win yesterday was amazing to see!",
    timestamp: "3 hours ago",
    likes: 28,
    replies: 9,
    game: "Powerball"
  },
  {
    id: "3",
    user: {
      name: "Lisa Wang",
      username: "@lisawang",
      avatar: "/placeholder.svg?height=32&width=32"
    },
    content:
      "I love seeing the community celebrate together. These big wins give us all hope! 🎉",
    timestamp: "5 hours ago",
    likes: 67,
    replies: 22
  }
];

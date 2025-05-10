import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { LogIn, User } from "lucide-react";

// Social Feed Component
function SocialFeed({ isLoggedIn, setIsLoggedIn }) {
  // Mock social posts data
  const socialPosts = [
    {
      id: 1,
      user: {
        name: "Jessica Smith",
        avatar: "/placeholder.svg?height=40&width=40"
      },
      content:
        "Just won $500 on the Golden Fortune scratch card! So excited! 🎉💰",
      image: "/placeholder.svg?height=200&width=300",
      timestamp: "2 hours ago",
      likes: 42,
      comments: 8
    },
    {
      id: 2,
      user: {
        name: "Michael Johnson",
        avatar: "/placeholder.svg?height=40&width=40"
      },
      content:
        "Has anyone tried the new Millionaire Maker card? Worth the $30?",
      timestamp: "5 hours ago",
      likes: 15,
      comments: 23
    },
    {
      id: 3,
      user: {
        name: "Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40"
      },
      content:
        "My strategy: buy 5 of the $5 cards instead of one $25 card. Worked today! $100 winner!",
      image: "/placeholder.svg?height=200&width=300",
      timestamp: "Yesterday",
      likes: 87,
      comments: 12
    },
    {
      id: 4,
      user: {
        name: "David Brown",
        avatar: "/placeholder.svg?height=40&width=40"
      },
      content:
        "Just found out my local store sold a $1M winning ticket last week. Time to change my lucky spot!",
      timestamp: "2 days ago",
      likes: 65,
      comments: 31
    },
    {
      id: 5,
      user: {
        name: "Emily Davis",
        avatar: "/placeholder.svg?height=40&width=40"
      },
      content:
        "Pro tip: Check the remaining prizes on the lottery website before buying scratch cards!",
      timestamp: "3 days ago",
      likes: 124,
      comments: 18
    }
  ];

  if (!isLoggedIn) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="bg-gray-100 rounded-full p-6 mb-4">
            <User className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900">
            Sign in to view the social feed
          </h3>
          <p className="text-gray-600 max-w-md mb-6">
            Connect with other players, share your wins, and get tips from the
            community.
          </p>
          <div className="flex gap-4">
            <Button
              onClick={() => setIsLoggedIn(true)}
              className="gap-2 bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-500 hover:to-yellow-400 text-gray-900"
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </Button>
            <Button
              variant="outline"
              className="border-gray-200 bg-white hover:bg-gray-100 text-gray-900"
            >
              Create Account
            </Button>
          </div>
        </div>

        {/* Preview of social feed */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              Preview of Community Posts
            </h3>
            <Badge
              variant="outline"
              className="bg-gray-100 text-gray-600 border-gray-200"
            >
              Preview Only
            </Badge>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent z-10"></div>
            <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
              {socialPosts.map(post => (
                <div
                  key={post.id}
                  className="flex-none w-80 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden">
                        <Image
                          src={post.user.avatar || "/placeholder.svg"}
                          alt={post.user.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {post.user.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {post.timestamp}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3 line-clamp-3">
                      {post.content}
                    </p>
                    {post.image && (
                      <div className="relative h-32 w-full rounded-md overflow-hidden mb-3">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt="Post image"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{post.likes} likes</span>
                      <span>{post.comments} comments</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              Sign in to see the full social feed and join the conversation
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-yellow-500 bg-clip-text text-transparent">
          Community Feed
        </h2>
        <Button
          variant="outline"
          size="sm"
          className="border-gray-200 bg-white hover:bg-gray-100 text-gray-900"
        >
          Create Post
        </Button>
      </div>

      <div className="space-y-4">
        {socialPosts.map(post => (
          <Card key={post.id} className="bg-white border-gray-200 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image
                    src={post.user.avatar || "/placeholder.svg"}
                    alt={post.user.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{post.user.name}</p>
                  <p className="text-xs text-gray-500">{post.timestamp}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-3">{post.content}</p>
              {post.image && (
                <div className="relative h-60 w-full rounded-md overflow-hidden mb-3">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt="Post image"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 gap-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M7 10v12" />
                    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                  </svg>
                  {post.likes}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 gap-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  {post.comments}
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                    <polyline points="16 6 12 2 8 6" />
                    <line x1="12" y1="2" x2="12" y2="15" />
                  </svg>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default SocialFeed;

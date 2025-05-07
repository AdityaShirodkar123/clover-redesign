import Link from "next/link"
import Image from "next/image"
import { CalendarDays, Clock, Search, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function BlogPage() {
  // Mock data for blog posts
  const featuredPost = {
    id: 1,
    title: "What to Do If You Win the Lottery: A Comprehensive Guide",
    excerpt:
      "Winning the lottery can be life-changing, but it comes with responsibilities. Learn how to manage your windfall wisely and avoid common pitfalls.",
    date: "March 15, 2023",
    readTime: "8 min read",
    author: "Financial Expert",
    category: "Financial Advice",
    image: "/placeholder.svg?height=600&width=1200",
    slug: "what-to-do-if-you-win-the-lottery",
  }

  const blogPosts = [
    {
      id: 2,
      title: "The Psychology Behind Scratch Cards: Why We Love Instant Gratification",
      excerpt:
        "Explore the psychological factors that make scratch cards so appealing and why the instant reveal creates such a powerful dopamine response.",
      date: "February 28, 2023",
      readTime: "6 min read",
      author: "Dr. Sarah Johnson",
      category: "Psychology",
      image: "/placeholder.svg?height=400&width=600",
      slug: "psychology-behind-scratch-cards",
    },
    {
      id: 3,
      title: "Top 10 Most Successful Scratch Card Games of All Time",
      excerpt:
        "A look at the most popular and profitable scratch card games ever released, and what made them stand out from the competition.",
      date: "February 15, 2023",
      readTime: "5 min read",
      author: "Gaming Analyst",
      category: "Game Analysis",
      image: "/placeholder.svg?height=400&width=600",
      slug: "top-10-most-successful-scratch-cards",
    },
    {
      id: 4,
      title: "How to Calculate Your Real Odds of Winning",
      excerpt:
        "Beyond the advertised odds, learn how to calculate your actual chances of winning based on remaining prizes and other factors.",
      date: "January 30, 2023",
      readTime: "7 min read",
      author: "Statistics Expert",
      category: "Statistics",
      image: "/placeholder.svg?height=400&width=600",
      slug: "calculate-real-odds-of-winning",
    },
    {
      id: 5,
      title: "The History of Lottery Games: From Ancient Times to Modern Day",
      excerpt:
        "Trace the fascinating evolution of lottery games from their origins in ancient civilizations to today's digital and instant win formats.",
      date: "January 15, 2023",
      readTime: "9 min read",
      author: "History Buff",
      category: "History",
      image: "/placeholder.svg?height=400&width=600",
      slug: "history-of-lottery-games",
    },
    {
      id: 6,
      title: "Tax Implications of Lottery Winnings: What You Need to Know",
      excerpt:
        "Understanding the tax obligations that come with lottery winnings can save you from unexpected surprises. Learn about federal and state requirements.",
      date: "December 28, 2022",
      readTime: "7 min read",
      author: "Tax Specialist",
      category: "Taxes",
      image: "/placeholder.svg?height=400&width=600",
      slug: "tax-implications-lottery-winnings",
    },
  ]

  return (
    <div className="min-h-screen bg-[#0f1116] text-gray-100">
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#0f1116]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0f1116]/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="font-bold text-xl bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent"
            >
              ScratchWin Analytics
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium text-gray-400 hover:text-gray-100 transition-colors">
              Home
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-400 hover:text-gray-100 transition-colors">
              About
            </Link>
            <Link href="/blog" className="text-sm font-medium text-gray-100">
              Blog
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-400 hover:text-gray-100 transition-colors">
              FAQ
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-400 hover:text-gray-100 transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex gap-1 border-gray-700 hover:bg-gray-800 hover:text-gray-100"
            >
              <User className="h-4 w-4" />
              Login
            </Button>
            <Button
              size="sm"
              className="hidden md:flex bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
            >
              Sign Up
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden text-gray-400 hover:text-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-6 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Lottery Insights Blog
            </h1>
            <p className="text-gray-400 mt-2">Expert advice, tips, and stories about lottery games and scratch cards</p>
          </div>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              type="search"
              placeholder="Search articles..."
              className="pl-10 w-full md:w-[300px] bg-gray-900/70 border-gray-700 text-gray-100 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <Link href={`/blog/${featuredPost.slug}`} className="block group">
            <div className="grid md:grid-cols-2 gap-6 bg-gray-900/30 rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors">
              <div className="relative h-[300px] md:h-auto">
                <Image
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1116] to-transparent opacity-70"></div>
                <Badge className="absolute top-4 left-4 bg-indigo-600 hover:bg-indigo-700">Featured</Badge>
              </div>
              <div className="p-6 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                  <Badge variant="outline" className="border-gray-700 text-gray-300">
                    {featuredPost.category}
                  </Badge>
                  <span className="flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" /> {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {featuredPost.readTime}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-indigo-400 transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-300 mb-4">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400">By {featuredPost.author}</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Ad Banner */}
        <div className="w-full h-[120px] bg-gray-800/50 rounded-lg mb-12 flex items-center justify-center border border-gray-700">
          <div className="text-center">
            <p className="text-gray-400 text-sm">Advertisement</p>
            <p className="text-gray-300 font-medium">Premium Lottery Analysis Tools - Upgrade Now</p>
            <Button
              size="sm"
              className="mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <Card className="h-full bg-gray-900/70 border-gray-800 hover:border-gray-700 transition-colors overflow-hidden">
                <div className="relative h-[200px]">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
                <CardHeader className="p-4 pb-0">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <Badge variant="outline" className="border-gray-700 text-gray-300">
                      {post.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-indigo-400 transition-colors">{post.title}</CardTitle>
                  <CardDescription className="text-gray-400 line-clamp-2">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-3 w-3" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {post.readTime}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 border-t border-gray-800">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-gray-400">By {post.author}</span>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        {/* Side Ad Banner */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="md:col-span-2">
            <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-gray-300 mb-4">
                Get the latest lottery insights, tips, and exclusive content delivered straight to your inbox.
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-gray-900/70 border-gray-700 text-gray-100"
                />
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          <div className="h-[200px] bg-gray-800/50 rounded-lg flex items-center justify-center border border-gray-700">
            <div className="text-center p-4">
              <p className="text-gray-400 text-sm">Advertisement</p>
              <p className="text-gray-300 font-medium">Lottery Prediction Tools</p>
              <Button
                size="sm"
                className="mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
              >
                Try Now
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-800 py-6 md:py-0">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-16">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} ScratchWin Analytics. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-xs text-gray-500 hover:text-gray-300">
              Terms
            </Link>
            <Link href="#" className="text-xs text-gray-500 hover:text-gray-300">
              Privacy
            </Link>
            <Link href="#" className="text-xs text-gray-500 hover:text-gray-300">
              Disclaimer
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Clock, Search, User } from "lucide-react";

import Navbar from "@/components/navbar";
import { SidebarNav } from "@/components/sidebar-nav";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    slug: "what-to-do-if-you-win-the-lottery"
  };

  const blogPosts = [
    {
      id: 2,
      title:
        "The Psychology Behind Scratch Cards: Why We Love Instant Gratification",
      excerpt:
        "Explore the psychological factors that make scratch cards so appealing and why the instant reveal creates such a powerful dopamine response.",
      date: "February 28, 2023",
      readTime: "6 min read",
      author: "Dr. Sarah Johnson",
      category: "Psychology",
      image: "/placeholder.svg?height=400&width=600",
      slug: "psychology-behind-scratch-cards"
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
      slug: "top-10-most-successful-scratch-cards"
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
      slug: "calculate-real-odds-of-winning"
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
      slug: "history-of-lottery-games"
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
      slug: "tax-implications-lottery-winnings"
    }
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);

  // Get unique categories from blogPosts
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));

  // Filter posts by active categories (multi-select)
  const filteredPosts =
    activeCategories.length > 0
      ? blogPosts.filter(post => activeCategories.includes(post.category))
      : blogPosts;

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <SidebarNav />
      <div className="flex-1 ml-0 md:ml-64">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <main className="container py-6 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-black">
                Lottery Insights Blog
              </h1>
              <p className="text-muted-foreground mt-2">
                Expert advice, tips, and stories about lottery games and scratch
                cards
              </p>
            </div>
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                className="pl-10 w-full md:w-[300px] focus:border-primary"
              />
            </div>
          </div>

          {/* Featured Post */}
          <div className="mb-12">
            <Link href={`/blog/${featuredPost.slug}`} className="group">
              <div className="grid md:grid-cols-2 gap-6 bg-card rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition-all">
                <div className="relative h-[300px] md:h-auto">
                  <Image
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-30"></div>
                  <Badge className="absolute top-4 left-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                    Featured
                  </Badge>
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Badge variant="outline" className="text-foreground">
                      {featuredPost.category}
                    </Badge>
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-3 w-3" /> {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {featuredPost.readTime}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">
                      By {featuredPost.author}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Ad Banner */}
          <div className="w-full h-[120px] bg-accent rounded-lg mb-6 flex items-center justify-center border shadow-sm">
            <div className="text-center">
              <p className="text-muted-foreground text-sm">Advertisement</p>
              <p className="text-foreground font-medium">
                Premium Lottery Analysis Tools - Upgrade Now
              </p>
              <Button
                size="sm"
                className="mt-2 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Filter by topic */}
          <div className="mb-8 w-full">
            <h2 className="text-lg font-semibold text-black mb-3">
              Filter articles by topic
            </h2>
            <div className="flex flex-wrap gap-3">
              {categories.map(category => {
                const isActive = activeCategories.includes(category);
                return (
                  <Badge
                    key={category}
                    variant={isActive ? "default" : "outline"}
                    className={`cursor-pointer text-base px-3 py-1 ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground"
                    }`}
                    onClick={() => {
                      setActiveCategories(
                        isActive
                          ? activeCategories.filter(c => c !== category)
                          : [...activeCategories, category]
                      );
                    }}
                  >
                    {category}
                  </Badge>
                );
              })}
              {activeCategories.length > 0 && (
                <button
                  className="ml-4 px-3 py-1 rounded-md border border-gray-300 bg-gray-50 text-green-600 text-sm font-medium hover:bg-gray-100 transition-colors"
                  onClick={() => setActiveCategories([])}
                >
                  Clear Selection
                </button>
              )}
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredPosts.map(post => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                <Card className="h-full bg-card border shadow-sm hover:shadow-green-300/40 hover:shadow-lg transition-all overflow-hidden">
                  <div className="relative h-[200px]">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Badge variant="outline" className="text-foreground">
                        {post.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-green-600 transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="h-3 w-3" /> {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {post.readTime}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 border-t">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground">
                        By {post.author}
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>

          {/* Side Ad Banner */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="md:col-span-2">
              <div className="bg-card border rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-black">
                  Subscribe to Our Newsletter
                </h2>
                <p className="text-muted-foreground mb-4">
                  Get the latest lottery insights, tips, and exclusive content
                  delivered straight to your inbox.
                </p>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="focus:border-primary"
                  />
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
            <div className="h-[200px] bg-accent rounded-lg flex items-center justify-center border shadow-sm">
              <div className="text-center p-4">
                <p className="text-muted-foreground text-sm">Advertisement</p>
                <p className="text-foreground font-medium">
                  Lottery Prediction Tools
                </p>
                <Button
                  size="sm"
                  className="mt-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Try Now
                </Button>
              </div>
            </div>
          </div>
        </main>

        <footer className="border-t py-6 md:py-0">
          <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-16">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} ScratchWin Analytics. All rights
              reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Disclaimer
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

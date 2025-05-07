import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CalendarDays, Clock, Facebook, Linkedin, Share2, Twitter, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // In a real app, you would fetch the blog post data based on the slug
  // For now, we'll use mock data
  const post = {
    title: "What to Do If You Win the Lottery: A Comprehensive Guide",
    date: "March 15, 2023",
    readTime: "8 min read",
    author: "Financial Expert",
    authorTitle: "Certified Financial Planner",
    category: "Financial Advice",
    image: "/placeholder.svg?height=600&width=1200",
    content: `
      <p class="lead">Winning the lottery is a life-changing event that can bring incredible opportunities, but it also comes with significant responsibilities and potential pitfalls. This comprehensive guide will help you navigate the exciting but challenging journey of managing a lottery windfall.</p>
      
      <h2>The First 24 Hours: Immediate Steps</h2>
      
      <p>The moments after discovering you've won a major lottery prize are filled with excitement and adrenaline. However, it's crucial to take a step back and proceed with caution. Here's what to do immediately:</p>
      
      <ul>
        <li><strong>Sign your ticket</strong> - This establishes your ownership of the winning ticket.</li>
        <li><strong>Make a copy</strong> - Create digital and physical copies of both sides of your ticket.</li>
        <li><strong>Secure the original</strong> - Place your ticket in a secure location like a safe deposit box.</li>
        <li><strong>Stay anonymous (if possible)</strong> - Check if your state allows lottery winners to remain anonymous.</li>
        <li><strong>Don't tell everyone</strong> - Limit who you tell about your winnings to protect your privacy and security.</li>
      </ul>
      
      <h2>Assembling Your Professional Team</h2>
      
      <p>Before claiming your prize, it's essential to assemble a team of professionals who can help you manage your newfound wealth:</p>
      
      <ul>
        <li><strong>Financial advisor</strong> - Look for a fee-only fiduciary financial advisor with experience in sudden wealth.</li>
        <li><strong>Tax attorney</strong> - Lottery winnings have significant tax implications that require expert guidance.</li>
        <li><strong>Estate planning attorney</strong> - To help protect your assets and establish a plan for your wealth.</li>
        <li><strong>Certified public accountant</strong> - To assist with tax planning and preparation.</li>
      </ul>
      
      <p>Take your time interviewing multiple professionals in each category. Look for those with experience helping lottery winners or clients with sudden wealth.</p>
      
      <h2>Claiming Your Prize: Lump Sum vs. Annuity</h2>
      
      <p>One of the biggest decisions you'll face is whether to take your winnings as a lump sum or as an annuity paid out over time:</p>
      
      <h3>Lump Sum Considerations:</h3>
      <ul>
        <li>You receive a smaller amount upfront (typically 50-60% of the advertised jackpot)</li>
        <li>All taxes are paid immediately</li>
        <li>You have complete control over your money</li>
        <li>Potential for greater returns if invested wisely</li>
        <li>Higher risk of mismanagement or depletion</li>
      </ul>
      
      <h3>Annuity Considerations:</h3>
      <ul>
        <li>You receive the full advertised amount, paid out over 20-30 years</li>
        <li>Taxes are paid only on annual payments as you receive them</li>
        <li>Provides a guaranteed income stream</li>
        <li>Offers protection against poor financial decisions or spending habits</li>
        <li>Less flexibility with your money</li>
      </ul>
      
      <p>This decision should be made with your financial advisor and tax professional, considering your age, financial goals, and personal circumstances.</p>
      
      <h2>Managing Your Windfall</h2>
      
      <p>Once you've claimed your prize, the real work of managing your wealth begins:</p>
      
      <h3>Create a Financial Plan</h3>
      <p>Work with your financial advisor to create a comprehensive plan that includes:</p>
      <ul>
        <li>Short and long-term financial goals</li>
        <li>Investment strategy</li>
        <li>Budget for living expenses</li>
        <li>Charitable giving plan</li>
        <li>Estate planning</li>
      </ul>
      
      <h3>Pay Off Debt</h3>
      <p>Consider paying off high-interest debt like credit cards, personal loans, and possibly your mortgage.</p>
      
      <h3>Establish an Emergency Fund</h3>
      <p>Set aside 6-12 months of living expenses in a liquid, easily accessible account.</p>
      
      <h3>Invest Wisely</h3>
      <p>Work with your financial advisor to create a diversified investment portfolio aligned with your risk tolerance and financial goals.</p>
      
      <h3>Plan for Taxes</h3>
      <p>Set aside money for future tax obligations and work with your tax professional to implement tax-efficient strategies.</p>
      
      <h2>Protecting Yourself and Your Relationships</h2>
      
      <p>Sudden wealth can significantly impact your personal relationships and make you a target for scams and requests for money:</p>
      
      <h3>Set Boundaries</h3>
      <p>Decide in advance how you'll handle requests for money from friends and family. Consider establishing a policy that all requests must be submitted in writing and reviewed by your financial advisor.</p>
      
      <h3>Consider a Trust</h3>
      <p>Setting up a trust can provide a buffer between you and those seeking money. Your trustee can review requests according to guidelines you establish.</p>
      
      <h3>Beware of Scams</h3>
      <p>Be vigilant about investment opportunities that sound too good to be true. Consult with your financial advisor before making any investment decisions.</p>
      
      <h3>Seek Support</h3>
      <p>Consider working with a therapist or counselor who specializes in sudden wealth syndrome to help you navigate the emotional aspects of your windfall.</p>
      
      <h2>Giving Back</h2>
      
      <p>Many lottery winners find that thoughtful charitable giving is one of the most rewarding aspects of their windfall:</p>
      
      <h3>Establish a Giving Strategy</h3>
      <p>Work with your financial advisor to determine how much you can afford to give while ensuring your long-term financial security.</p>
      
      <h3>Consider a Donor-Advised Fund or Foundation</h3>
      <p>These vehicles can provide tax benefits while allowing you to support causes you care about over time.</p>
      
      <h3>Research Charities</h3>
      <p>Use resources like Charity Navigator or GuideStar to ensure your donations are going to reputable organizations.</p>
      
      <h2>Conclusion</h2>
      
      <p>Winning the lottery offers a rare opportunity to achieve financial security and make a positive impact. By taking a thoughtful, measured approach and working with qualified professionals, you can make the most of your good fortune while avoiding the pitfalls that have troubled many lottery winners in the past.</p>
      
      <p>Remember that managing wealth is a marathon, not a sprint. Take your time, make deliberate decisions, and focus on your long-term well-being and goals.</p>
    `,
    relatedPosts: [
      {
        id: 2,
        title: "The Psychology Behind Scratch Cards: Why We Love Instant Gratification",
        excerpt:
          "Explore the psychological factors that make scratch cards so appealing and why the instant reveal creates such a powerful dopamine response.",
        slug: "psychology-behind-scratch-cards",
      },
      {
        id: 6,
        title: "Tax Implications of Lottery Winnings: What You Need to Know",
        excerpt:
          "Understanding the tax obligations that come with lottery winnings can save you from unexpected surprises. Learn about federal and state requirements.",
        slug: "tax-implications-lottery-winnings",
      },
      {
        id: 3,
        title: "Top 10 Most Successful Scratch Card Games of All Time",
        excerpt:
          "A look at the most popular and profitable scratch card games ever released, and what made them stand out from the competition.",
        slug: "top-10-most-successful-scratch-cards",
      },
    ],
  }

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
        <div className="mb-8">
          <Link
            href="/blog"
            className="flex items-center text-sm font-medium text-gray-400 hover:text-gray-100 transition-colors mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>

          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Badge variant="outline" className="border-gray-700 text-gray-300">
              {post.category}
            </Badge>
            <span className="flex items-center gap-1">
              <CalendarDays className="h-3 w-3" /> {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
              <User className="h-5 w-5 text-gray-300" />
            </div>
            <div>
              <div className="font-medium text-gray-200">{post.author}</div>
              <div className="text-sm text-gray-400">{post.authorTitle}</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="relative h-[300px] md:h-[400px] mb-8 rounded-xl overflow-hidden">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>

            <div className="prose prose-invert max-w-none prose-headings:text-gray-100 prose-p:text-gray-300 prose-strong:text-gray-200 prose-li:text-gray-300 prose-a:text-indigo-400 hover:prose-a:text-indigo-300">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-800">
              <div className="text-sm text-gray-400">Share this article:</div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-8 h-8 border-gray-700 hover:bg-gray-800"
                >
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Share on Facebook</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-8 h-8 border-gray-700 hover:bg-gray-800"
                >
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Share on Twitter</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-8 h-8 border-gray-700 hover:bg-gray-800"
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">Share on LinkedIn</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-8 h-8 border-gray-700 hover:bg-gray-800"
                >
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Copy link</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Author Card */}
            <Card className="bg-gray-900/70 border-gray-800">
              <CardHeader>
                <CardTitle>About the Author</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center mb-4">
                    <User className="h-10 w-10 text-gray-300" />
                  </div>
                  <h3 className="font-bold text-gray-100">{post.author}</h3>
                  <p className="text-sm text-gray-400 mb-4">{post.authorTitle}</p>
                  <p className="text-sm text-gray-300">
                    A financial expert with over 15 years of experience helping individuals manage sudden wealth and
                    make sound financial decisions.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Ad Space */}
            <div className="h-[250px] bg-gray-800/50 rounded-lg flex items-center justify-center border border-gray-700 p-4">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Advertisement</p>
                <p className="text-gray-300 font-medium my-2">Financial Planning Services</p>
                <p className="text-gray-400 text-sm mb-4">Expert advice for lottery winners</p>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Related Posts */}
            <Card className="bg-gray-900/70 border-gray-800">
              <CardHeader>
                <CardTitle>Related Articles</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-800">
                  {post.relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.slug}`}
                      className="block p-4 hover:bg-gray-800/50 transition-colors"
                    >
                      <h3 className="font-medium text-gray-200 mb-1 hover:text-indigo-400 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-2">{relatedPost.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="bg-gray-900/70 border-gray-800">
              <CardHeader>
                <CardTitle>Subscribe to Our Newsletter</CardTitle>
                <CardDescription>Get the latest lottery insights and tips delivered to your inbox.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500">
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-800 py-6 md:py-0 mt-12">
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

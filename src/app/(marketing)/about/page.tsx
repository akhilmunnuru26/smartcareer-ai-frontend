import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Users, Zap, Heart, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: "Mission-Driven",
      description: "We're on a mission to democratize career success through AI technology.",
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "User-Focused",
      description: "Every feature is designed with job seekers' real needs in mind.",
    },
    {
      icon: <Zap className="h-8 w-8 text-green-600" />,
      title: "Innovation First",
      description: "We leverage cutting-edge AI to provide insights that actually work.",
    },
    {
      icon: <Heart className="h-8 w-8 text-red-600" />,
      title: "Privacy Matters",
      description: "Your data is yours. We never sell or share your information.",
    },
  ];

  const milestones = [
    { year: "2025", title: "Founded", description: "SmartCareer AI was born from the frustration of endless job applications" },
    { year: "2025", title: "First Users", description: "Helped 100 job seekers land interviews at top companies" },
    { year: "2026", title: "AI Powered", description: "Integrated Google Gemini for advanced career insights" },
    { year: "2026", title: "10K+ Users", description: "Growing community of successful job seekers" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900">SmartCareer AI</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/#features" className="text-gray-700 hover:text-blue-600">Features</Link>
              <Link href="/pricing" className="text-gray-700 hover:text-blue-600">Pricing</Link>
              <Link href="/about" className="text-blue-600 font-medium">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Empowering Careers with AI
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            We believe everyone deserves access to professional career guidance. 
            SmartCareer AI makes expert-level career advice accessible to all through the power of artificial intelligence.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 text-lg">
                <p>
                  SmartCareer AI started with a simple observation: the job search process is broken. 
                  Talented professionals spend countless hours tailoring resumes, preparing for interviews, 
                  and analyzing job descriptions — often without clear guidance.
                </p>
                <p>
                  We asked ourselves: <em>What if everyone had access to a personal career coach powered by AI?</em>
                </p>
                <p>
                  That question led us to build SmartCareer AI. Using cutting-edge AI technology, 
                  we&apos;ve created a platform that provides personalized, actionable career advice at scale.
                </p>
                <p>
                  Today, we&apos;re helping thousands of job seekers land their dream roles by providing 
                  AI-powered resume analysis, interview preparation, and job matching insights.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="text-2xl font-bold mb-4">By the Numbers</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-4xl font-bold text-blue-600">10,000+</div>
                    <div className="text-gray-600">Resumes Analyzed</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-purple-600">50,000+</div>
                    <div className="text-gray-600">Interview Questions Generated</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-green-600">95%</div>
                    <div className="text-gray-600">User Satisfaction Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center">
                    {value.icon}
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                  <CardDescription className="text-base">{value.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">
              Key milestones in our mission to democratize career success
            </p>
          </div>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <div className="text-2xl font-bold text-blue-600">{milestone.year}</div>
                </div>
                <div className="flex-shrink-0 w-4 relative">
                  <div className="w-4 h-4 rounded-full bg-blue-600 mt-1"></div>
                  {index !== milestones.length - 1 && (
                    <div className="absolute top-6 left-1.5 w-0.5 h-full bg-blue-200"></div>
                  )}
                </div>
                <div className="flex-grow pb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                  <p className="text-gray-700">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Built by Job Seekers, For Job Seekers</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Our team has personally experienced the challenges of job hunting. 
            We&apos;re building the tool we wish we had when navigating our own career transitions.
          </p>
          <Link href="/contact">
            <Button size="lg">
              Join Our Mission
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals using SmartCareer AI
          </p>
          <Link href="/auth/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <span className="text-white font-bold">SmartCareer AI</span>
              </div>
              <p className="text-sm">Your AI-powered career assistant</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/#features" className="hover:text-white">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/about" className="hover:text-white">About</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
            <p>© 2026 SmartCareer AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
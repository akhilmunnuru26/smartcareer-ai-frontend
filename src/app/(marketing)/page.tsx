// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { ArrowRight, CheckCircle, Sparkles, Target, TrendingUp } from 'lucide-react';

// export default function LandingPage() {
//   const features = [
//     {
//       icon: <Sparkles className="h-6 w-6 text-blue-600" />,
//       title: "AI Resume Analyzer",
//       description: "Get instant feedback on your resume with AI-powered insights and ATS optimization tips.",
//     },
//     {
//       icon: <Target className="h-6 w-6 text-purple-600" />,
//       title: "Interview Prep",
//       description: "Practice with AI-generated questions tailored to your role and get real-time feedback.",
//     },
//     {
//       icon: <TrendingUp className="h-6 w-6 text-green-600" />,
//       title: "Job Matcher",
//       description: "See how well you match job descriptions and get recommendations to improve your profile.",
//     },
//   ];

//   const benefits = [
//     "Personalized AI-powered career guidance",
//     "ATS-optimized resume analysis",
//     "Role-specific interview questions",
//     "Gap analysis for job descriptions",
//     "Unlimited analysis and practice",
//     "Save your analysis history",
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       {/* Navigation */}
//       <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-xl">S</span>
//               </div>
//               <span className="text-xl font-bold text-gray-900">SmartCareer AI</span>
//             </div>
//             <div className="flex items-center space-x-4">
//               <Link href="/auth/signin">
//                 <Button variant="ghost">Sign In</Button>
//               </Link>
//               <Link href="/auth/signup">
//                 <Button>Get Started</Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="py-20 px-4">
//         <div className="max-w-7xl mx-auto text-center">
//           <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
//             <Sparkles className="h-4 w-4" />
//             Powered by AI
//           </div>
//           <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
//             Your AI-Powered
//             <br />
//             <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Career Assistant
//             </span>
//           </h1>
//           <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
//             Get instant resume feedback, practice interviews with AI, and discover how well you match job descriptions. 
//             Land your dream job faster with personalized AI guidance.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link href="/auth/signup">
//               <Button size="lg" className="text-lg px-8">
//                 Start for Free
//                 <ArrowRight className="ml-2 h-5 w-5" />
//               </Button>
//             </Link>
//             <Link href="#features">
//               <Button size="lg" variant="outline" className="text-lg px-8">
//                 Learn More
//               </Button>
//             </Link>
//           </div>
//           <p className="text-sm text-gray-500 mt-4">
//             No credit card required • Free forever
//           </p>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="py-20 px-4 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               Everything You Need to Land Your Dream Job
//             </h2>
//             <p className="text-xl text-gray-600">
//               Powered by cutting-edge AI technology
//             </p>
//           </div>
//           <div className="grid md:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <Card key={index} className="border-2 hover:border-blue-300 transition-colors">
//                 <CardHeader>
//                   <div className="mb-4">{feature.icon}</div>
//                   <CardTitle>{feature.title}</CardTitle>
//                   <CardDescription>{feature.description}</CardDescription>
//                 </CardHeader>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Benefits Section */}
//       <section className="py-20 px-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <div>
//               <h2 className="text-4xl font-bold text-gray-900 mb-6">
//                 Why Choose SmartCareer AI?
//               </h2>
//               <p className="text-lg text-gray-600 mb-8">
//                 Our AI-powered platform helps you stand out in the job market with personalized insights and recommendations.
//               </p>
//               <ul className="space-y-4">
//                 {benefits.map((benefit, index) => (
//                   <li key={index} className="flex items-start gap-3">
//                     <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
//                     <span className="text-gray-700">{benefit}</span>
//                   </li>
//                 ))}
//               </ul>
//               <Link href="/auth/signup" className="inline-block mt-8">
//                 <Button size="lg">
//                   Get Started Now
//                   <ArrowRight className="ml-2 h-5 w-5" />
//                 </Button>
//               </Link>
//             </div>
//             <div className="relative">
//               <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 shadow-2xl">
//                 <div className="bg-white rounded-lg p-6 mb-4">
//                   <div className="flex items-center justify-between mb-4">
//                     <span className="text-sm font-medium text-gray-600">Resume Score</span>
//                     <span className="text-3xl font-bold text-green-600">85</span>
//                   </div>
//                   <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                     <div className="h-full bg-green-600 w-[85%]"></div>
//                   </div>
//                 </div>
//                 <div className="bg-white rounded-lg p-6">
//                   <h3 className="font-semibold mb-2">✓ Strong Points</h3>
//                   <p className="text-sm text-gray-600 mb-4">Clear technical skills section, quantified achievements...</p>
//                   <h3 className="font-semibold mb-2">⚠ Improvements</h3>
//                   <p className="text-sm text-gray-600">Add more leadership examples, optimize for ATS...</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-4xl font-bold text-white mb-6">
//             Ready to Accelerate Your Career?
//           </h2>
//           <p className="text-xl text-blue-100 mb-8">
//             Join thousands of professionals using SmartCareer AI to land their dream jobs
//           </p>
//           <Link href="/auth/signup">
//             <Button size="lg" variant="secondary" className="text-lg px-8">
//               Start Free Today
//               <ArrowRight className="ml-2 h-5 w-5" />
//             </Button>
//           </Link>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-gray-400 py-12 px-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//                   <span className="text-white font-bold text-xl">S</span>
//                 </div>
//                 <span className="text-white font-bold">SmartCareer AI</span>
//               </div>
//               <p className="text-sm">
//                 Your AI-powered career assistant
//               </p>
//             </div>
//             <div>
//               <h3 className="text-white font-semibold mb-4">Product</h3>
//               <ul className="space-y-2 text-sm">
//                 <li><Link href="#features" className="hover:text-white">Features</Link></li>
//                 <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
//                 <li><Link href="/about" className="hover:text-white">About</Link></li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-white font-semibold mb-4">Resources</h3>
//               <ul className="space-y-2 text-sm">
//                 <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
//                 <li><Link href="/guides" className="hover:text-white">Career Guides</Link></li>
//                 <li><Link href="/support" className="hover:text-white">Support</Link></li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-white font-semibold mb-4">Legal</h3>
//               <ul className="space-y-2 text-sm">
//                 <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
//                 <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
//                 <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
//               </ul>
//             </div>
//           </div>
//           <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
//             <p>© 2026 SmartCareer AI. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Sparkles, Target, TrendingUp, Zap, Shield, Clock } from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: <Sparkles className="h-6 w-6 text-blue-600" />,
      title: "AI Resume Analyzer",
      description: "Get instant feedback on your resume with AI-powered insights and ATS optimization tips.",
    },
    {
      icon: <Target className="h-6 w-6 text-purple-600" />,
      title: "Interview Prep",
      description: "Practice with AI-generated questions tailored to your role and get real-time feedback.",
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-green-600" />,
      title: "Job Matcher",
      description: "See how well you match job descriptions and get recommendations to improve your profile.",
    },
  ];

  const benefits = [
    "Personalized AI-powered career guidance",
    "ATS-optimized resume analysis",
    "Role-specific interview questions",
    "Gap analysis for job descriptions",
    "Unlimited analysis and practice",
    "Save your analysis history",
  ];

  const stats = [
    { value: "10K+", label: "Resumes Analyzed" },
    { value: "95%", label: "Success Rate" },
    { value: "24/7", label: "AI Availability" },
    { value: "5min", label: "Avg. Analysis Time" },
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
              <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link>
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
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            Powered by Google Gemini AI
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your AI-Powered
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Career Assistant
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get instant resume feedback, practice interviews with AI, and discover how well you match job descriptions. 
            Land your dream job faster with personalized AI guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="text-lg px-8">
                Start for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Learn More
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            No credit card required • Free forever • Powered by AI
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Land Your Dream Job
            </h2>
            <p className="text-xl text-gray-600">
              Powered by cutting-edge AI technology
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-blue-300 transition-colors hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4 bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get AI-powered career guidance in 3 simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload or Paste</h3>
              <p className="text-gray-600">
                Share your resume, answer interview questions, or paste job descriptions
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
              <p className="text-gray-600">
                Our AI analyzes your content and provides personalized insights
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Take Action</h3>
              <p className="text-gray-600">
                Get actionable recommendations to improve and land your dream job
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose SmartCareer AI?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our AI-powered platform helps you stand out in the job market with personalized insights and recommendations.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link href="/auth/signup" className="inline-block mt-8">
                <Button size="lg">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 shadow-2xl">
                <div className="bg-white rounded-lg p-6 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-600">Resume Score</span>
                    <span className="text-3xl font-bold text-green-600">85</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-green-600 w-[85%]"></div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Strong Points
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">Clear technical skills section, quantified achievements...</p>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-orange-600" />
                    Improvements
                  </h3>
                  <p className="text-sm text-gray-600">Add more leadership examples, optimize for ATS...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Job Seekers Worldwide
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Frontend Developer",
                content: "SmartCareer AI helped me land my dream job at a FAANG company. The interview prep was invaluable!",
              },
              {
                name: "Michael Chen",
                role: "Product Manager",
                content: "The resume analyzer identified gaps I didn't even know existed. Improved my response rate by 3x!",
              },
              {
                name: "Emily Rodriguez",
                role: "Data Scientist",
                content: "The job matcher feature saved me hours of research. I only applied to roles where I was a great fit.",
              },
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">{testimonial.content}</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Accelerate Your Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals using SmartCareer AI to land their dream jobs
          </p>
          <Link href="/auth/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Start Free Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="text-blue-100 mt-4">No credit card required</p>
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
              <p className="text-sm">
                Your AI-powered career assistant for resume analysis, interview prep, and job matching.
              </p>
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
                <li><Link href="/guides" className="hover:text-white">Career Guides</Link></li>
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
            <p>© 2026 SmartCareer AI. All rights reserved. Built with Next.js & Google Gemini AI By Akhil Munnuru</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
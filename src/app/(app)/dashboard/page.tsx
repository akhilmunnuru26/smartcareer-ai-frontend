// 'use client';

// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { ArrowRight, Sparkles, Target, TrendingUp } from 'lucide-react';
// import Link from 'next/link';

// export default function DashboardPage() {
//   const features = [
//     {
//       icon: <Sparkles className="h-8 w-8 text-blue-600" />,
//       title: "Resume Analyzer",
//       description: "Get instant AI-powered feedback on your resume with ATS optimization tips",
//       href: "/resume-analyzer",
//       color: "blue",
//     },
//     {
//       icon: <Target className="h-8 w-8 text-purple-600" />,
//       title: "Interview Prep",
//       description: "Practice with role-specific questions and get real-time AI feedback",
//       href: "/interview-prep",
//       color: "purple",
//     },
//     {
//       icon: <TrendingUp className="h-8 w-8 text-green-600" />,
//       title: "Job Matcher",
//       description: "See how well you match job descriptions and get improvement tips",
//       href: "/job-matcher",
//       color: "green",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Welcome Section */}
//         <div className="mb-12">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">
//             Welcome to SmartCareer AI
//           </h1>
//           <p className="text-xl text-gray-600">
//             Choose a tool to get started with your career journey
//           </p>
//         </div>

//         {/* Feature Cards */}
//         <div className="grid md:grid-cols-3 gap-6 mb-12">
//           {features.map((feature, index) => (
//             <Link key={index} href={feature.href}>
//               <Card className="h-full hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-blue-300">
//                 <CardHeader>
//                   <div className={`mb-4 bg-${feature.color}-50 w-16 h-16 rounded-lg flex items-center justify-center`}>
//                     {feature.icon}
//                   </div>
//                   <CardTitle className="text-xl">{feature.title}</CardTitle>
//                   <CardDescription className="text-base">
//                     {feature.description}
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <Button className="w-full" variant="outline">
//                     Get Started
//                     <ArrowRight className="ml-2 h-4 w-4" />
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Link>
//           ))}
//         </div>

//         {/* Quick Stats */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Your Activity</CardTitle>
//             <CardDescription>Track your career development progress</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-3 gap-6">
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-blue-600">0</div>
//                 <div className="text-sm text-gray-600">Resumes Analyzed</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-purple-600">0</div>
//                 <div className="text-sm text-gray-600">Interview Sessions</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-green-600">0</div>
//                 <div className="text-sm text-gray-600">Jobs Matched</div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Target, TrendingUp, FileText, Calendar, Award, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  totalResumes: number;
  totalInterviews: number;
  totalJobMatches: number;
  averageResumeScore: number;
  averageJobMatchScore: number;
}

interface RecentActivity {
  resumes: Array<{
    id: string;
    targetRole: string | null;
    overallScore: number;
    createdAt: string;
  }>;
  interviews: Array<{
    id: string;
    role: string;
    difficulty: string;
    questionsAnswered: number;
    createdAt: string;
  }>;
  jobMatches: Array<{
    id: string;
    jobTitle: string;
    matchPercentage: number;
    createdAt: string;
  }>;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      fetchDashboardData();
    }
  }, [session]);

  const fetchDashboardData = async () => {
    if (!session?.user?.id) return;

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/dashboard/stats/${session.user.id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const data = await response.json();
      setStats(data.data.stats);
      setRecentActivity(data.data.recentActivity);
    } catch (error) {
      console.error('Dashboard fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const features = [
    {
      icon: <Sparkles className="h-8 w-8 text-blue-600" />,
      title: "Resume Analyzer",
      description: "Get instant AI-powered feedback on your resume with ATS optimization tips",
      href: "/resume-analyzer",
      color: "blue",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: <Target className="h-8 w-8 text-purple-600" />,
      title: "Interview Prep",
      description: "Practice with role-specific questions and get real-time AI feedback",
      href: "/interview-prep",
      color: "purple",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      title: "Job Matcher",
      description: "See how well you match job descriptions and get improvement tips",
      href: "/job-matcher",
      color: "green",
      gradient: "from-green-500 to-green-600",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {session?.user?.name?.split(' ')[0] || 'there'}! 👋
          </h1>
          <p className="text-xl text-gray-600">
            Here&apos;s your career development progress
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardDescription className="text-blue-100">Total Resumes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-4xl font-bold">{stats?.totalResumes || 0}</div>
                <FileText className="h-8 w-8 opacity-80" />
              </div>
              {stats && stats.averageResumeScore > 0 && (
                <p className="text-sm text-blue-100 mt-2">
                  Avg Score: {stats.averageResumeScore}/100
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardDescription className="text-purple-100">Interview Sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-4xl font-bold">{stats?.totalInterviews || 0}</div>
                <Target className="h-8 w-8 opacity-80" />
              </div>
              <p className="text-sm text-purple-100 mt-2">
                Practice makes perfect
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardDescription className="text-green-100">Job Matches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-4xl font-bold">{stats?.totalJobMatches || 0}</div>
                <TrendingUp className="h-8 w-8 opacity-80" />
              </div>
              {stats && stats.averageJobMatchScore > 0 && (
                <p className="text-sm text-green-100 mt-2">
                  Avg Match: {stats.averageJobMatchScore}%
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardHeader className="pb-2">
              <CardDescription className="text-orange-100">Total Activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-4xl font-bold">
                  {(stats?.totalResumes || 0) + (stats?.totalInterviews || 0) + (stats?.totalJobMatches || 0)}
                </div>
                <Award className="h-8 w-8 opacity-80" />
              </div>
              <p className="text-sm text-orange-100 mt-2">
                Keep up the momentum!
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => (
            <Link key={index} href={feature.href}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-300 group">
                <CardHeader>
                  <div className={`mb-4 bg-gradient-to-br ${feature.gradient} w-16 h-16 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full group-hover:bg-blue-600" variant="outline">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        {recentActivity && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest career development actions</CardDescription>
                </div>
                <Link href="/history">
                  <Button variant="ghost" size="sm">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Recent Resumes */}
                {recentActivity.resumes.map((resume) => (
                  <div key={resume.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-600 p-2 rounded-lg">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {resume.targetRole || 'Resume Analysis'}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(resume.createdAt)}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {resume.overallScore}/100
                    </Badge>
                  </div>
                ))}

                {/* Recent Interviews */}
                {recentActivity.interviews.map((interview) => (
                  <div key={interview.id} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-600 p-2 rounded-lg">
                        <Target className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {interview.role} Interview
                        </p>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(interview.createdAt)}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      {interview.questionsAnswered} questions
                    </Badge>
                  </div>
                ))}

                {/* Recent Job Matches */}
                {recentActivity.jobMatches.map((match) => (
                  <div key={match.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-600 p-2 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {match.jobTitle}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(match.createdAt)}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {match.matchPercentage}% match
                    </Badge>
                  </div>
                ))}

                {/* Empty State */}
                {recentActivity.resumes.length === 0 && 
                 recentActivity.interviews.length === 0 && 
                 recentActivity.jobMatches.length === 0 && (
                  <div className="text-center py-12">
                    <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">No activity yet</p>
                    <p className="text-sm text-gray-500">
                      Start by analyzing your resume or practicing interviews!
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
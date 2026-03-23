

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FileText, Target, TrendingUp, Clock, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { API_BASE_URL } from '@/utils/contants';

interface ResumeAnalysisItem {
  id: string;
  targetRole: string | null;
  overallScore: number;
  createdAt: string;
}

interface InterviewSessionItem {
  id: string;
  role: string;
  difficulty: string;
  questionsAnswered: number;
  averageScore: number | null;
  createdAt: string;
}

interface JobMatchItem {
  id: string;
  jobTitle: string;
  matchPercentage: number;
  createdAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function HistoryPage() {
  const { data: session } = useSession();
  
  const [resumeHistory, setResumeHistory] = useState<ResumeAnalysisItem[]>([]);
  const [interviewHistory, setInterviewHistory] = useState<InterviewSessionItem[]>([]);
  const [jobMatchHistory, setJobMatchHistory] = useState<JobMatchItem[]>([]);
  
  const [loadingResumes, setLoadingResumes] = useState(true);
  const [loadingInterviews, setLoadingInterviews] = useState(true);
  const [loadingJobs, setLoadingJobs] = useState(true);
  
  const [error, setError] = useState('');

  useEffect(() => {
    if (session?.user?.id) {
      fetchResumeHistory();
      fetchInterviewHistory();
      fetchJobMatchHistory();
    }
  }, [session]);

  const fetchResumeHistory = async () => {
    if (!session?.user?.id) return;

    try {
      setLoadingResumes(true);
      const response = await fetch(
        `${API_BASE_URL}/api/resume/history/${session.user.id}?page=1&limit=10`
      );

      if (response.ok) {
        const data = await response.json();
        setResumeHistory(data.data);
      }
    } catch (err) {
      console.error('Fetch resume history error:', err);
    } finally {
      setLoadingResumes(false);
    }
  };

  const fetchInterviewHistory = async () => {
    if (!session?.user?.id) return;

    try {
      setLoadingInterviews(true);
      const response = await fetch(
        `${API_BASE_URL}/api/interview/history/${session.user.id}?page=1&limit=10`
      );

      if (response.ok) {
        const data = await response.json();
        setInterviewHistory(data.data);
      }
    } catch (err) {
      console.error('Fetch interview history error:', err);
    } finally {
      setLoadingInterviews(false);
    }
  };

  const fetchJobMatchHistory = async () => {
    if (!session?.user?.id) return;

    try {
      setLoadingJobs(true);
      const response = await fetch(
        `${API_BASE_URL}/api/job/history/${session.user.id}?page=1&limit=10`
      );

      if (response.ok) {
        const data = await response.json();
        setJobMatchHistory(data.data);
      }
    } catch (err) {
      console.error('Fetch job match history error:', err);
    } finally {
      setLoadingJobs(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Analysis History</h1>
        <p className="text-xl text-gray-600">
          Review your past analyses and track your progress
        </p>
      </div>

      <Tabs defaultValue="resume" className="space-y-6 flex flex-col space-x-4">
        <TabsList className="bg-transparent">
          <TabsTrigger value="resume" className='bg-transparent hover:bg-gray-100 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-md px-4 py-2'>
            Resume ({resumeHistory.length})
          </TabsTrigger>
          <TabsTrigger value="interview" className='bg-transparent hover:bg-gray-100 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-md px-4 py-2'>
            Interview ({interviewHistory.length})
          </TabsTrigger>
          <TabsTrigger value="jobs" className='bg-transparent hover:bg-gray-100 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-md px-4 py-2'>
            Jobs ({jobMatchHistory.length})
          </TabsTrigger>
        </TabsList>

        {/* Resume History */}
        <TabsContent value="resume" className="space-y-4">
          {loadingResumes ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Loader2 className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
                <p className="text-gray-600">Loading history...</p>
              </CardContent>
            </Card>
          ) : resumeHistory.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">No resume analyses yet</p>
                <p className="text-sm text-gray-500 mb-4">
                  Analyze your first resume to see it here
                </p>
                <Button onClick={() => window.location.href = '/resume-analyzer'}>
                  Analyze Resume
                </Button>
              </CardContent>
            </Card>
          ) : (
            resumeHistory.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {item.targetRole || 'Resume Analysis'}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Clock className="h-4 w-4" />
                          {formatDate(item.createdAt)}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-lg font-bold">
                      {item.overallScore}/100
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.href = `/history/analysis/${item.id}`}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Interview History */}
        <TabsContent value="interview" className="space-y-4">
          {loadingInterviews ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Loader2 className="h-12 w-12 text-purple-600 mx-auto mb-4 animate-spin" />
                <p className="text-gray-600">Loading history...</p>
              </CardContent>
            </Card>
          ) : interviewHistory.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">No interview sessions yet</p>
                <p className="text-sm text-gray-500 mb-4">
                  Start practicing to see your history here
                </p>
                <Button onClick={() => window.location.href = '/interview-prep'}>
                  Start Interview Prep
                </Button>
              </CardContent>
            </Card>
          ) : (
            interviewHistory.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <Target className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {item.role} Interview
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Clock className="h-4 w-4" />
                          {formatDate(item.createdAt)}
                        </CardDescription>
                      </div>
                    </div>
                    {item.averageScore && (
                      <Badge variant="secondary" className="text-lg font-bold">
                        {Math.round(item.averageScore)}/100
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">{item.difficulty}</span> level • {item.questionsAnswered} questions answered
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.location.href = `/history/interview/${item.id}`}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Job Match History */}
        <TabsContent value="jobs" className="space-y-4">
          {loadingJobs ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Loader2 className="h-12 w-12 text-green-600 mx-auto mb-4 animate-spin" />
                <p className="text-gray-600">Loading history...</p>
              </CardContent>
            </Card>
          ) : jobMatchHistory.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">No job matches yet</p>
                <p className="text-sm text-gray-500 mb-4">
                  Match a job description to see it here
                </p>
                <Button onClick={() => window.location.href = '/job-matcher'}>
                  Match a Job
                </Button>
              </CardContent>
            </Card>
          ) : (
            jobMatchHistory.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{item.jobTitle}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Clock className="h-4 w-4" />
                          {formatDate(item.createdAt)}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-lg font-bold">
                      {item.matchPercentage}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.href = `/history/job/${item.id}`}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
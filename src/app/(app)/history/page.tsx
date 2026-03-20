'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FileText, Target, TrendingUp, Clock, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ResumeAnalysisItem {
  id: string;
  targetRole: string | null;
  overallScore: number;
  createdAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function HistoryPage() {
  const { data: session, status } = useSession();
  const [resumeHistory, setResumeHistory] = useState<ResumeAnalysisItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  // Debug: Log session
  useEffect(() => {
    console.log('🔍 Session status:', status);
    console.log('🔍 Session data:', session);
    console.log('🔍 User ID:', session?.user?.id);
  }, [session, status]);

  useEffect(() => {
    if (status === 'loading') {
      console.log('⏳ Waiting for session to load...');
      return;
    }

    if (!session?.user?.id) {
      console.log('❌ No user ID found in session');
      setError('Please sign in to view history');
      setLoading(false);
      return;
    }

    console.log('✅ User ID found, fetching history...');
    fetchHistory();
  }, [session, status, pagination.page]);

  // const fetchHistory = async () => {
  //   if (!session?.user?.id) {
  //     console.log('❌ Cannot fetch - no user ID');
  //     setError('Please sign in to view history');
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     const url = `http://localhost:5000/api/resume/history/${session.user.id}?page=${pagination.page}&limit=${pagination.limit}`;
      
  //     console.log('📡 Fetching from:', url);
      
  //     const response = await fetch(url);
      
  //     console.log('📡 Response status:', response.status);

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch history');
  //     }

  //     const data = await response.json();
  //     console.log('📊 History data:', data);
      
  //     setResumeHistory(data.data);
  //     setPagination(data.pagination);
  //     setError('');
  //   } catch (err) {
  //     console.error('❌ Fetch history error:', err);
  //     setError(err instanceof Error ? err.message : 'Failed to load history');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

const fetchHistory = async () => {
  if (!session?.user?.id) {
    console.log('❌ Cannot fetch - no user ID');
    setError('Please sign in to view history');
    setLoading(false);
    return;
  }

  try {
    setLoading(true);
    const url = `http://localhost:5000/api/resume/history/${session.user.id}?page=${pagination.page}&limit=${pagination.limit}`;
    
    // console.log('📡 Fetching from:', url);
    
    const response = await fetch(url);
    
    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      throw new Error('Failed to fetch history');
    }

    const data = await response.json();
    console.log('📊 Full response:', JSON.stringify(data, null, 2)); // More detailed log
    console.log('📊 Data array:', data.data);
    console.log('📊 Data length:', data.data?.length);
    console.log('📊 Pagination:', data.pagination);
    
    setResumeHistory(data.data || []); // Add fallback
    setPagination(data.pagination);
    setError('');
  } catch (err) {
    console.error('❌ Fetch history error:', err);
    setError(err instanceof Error ? err.message : 'Failed to load history');
  } finally {
    setLoading(false);
  }
};

  const deleteAnalysis = async (id: string) => {
    if (!confirm('Are you sure you want to delete this analysis?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/resume/analysis/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete analysis');
      }

      // Refresh history
      fetchHistory();
    } catch (err) {
      alert('Failed to delete analysis');
      console.error('Delete error:', err);
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

  // Show loading while checking auth
  if (status === 'loading') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card>
          <CardContent className="py-12 text-center">
            <Loader2 className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
            <p className="text-gray-600">Checking authentication...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show error if not authenticated
  if (!session) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Please sign in to view your history</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Analysis History</h1>
        <p className="text-xl text-gray-600">
          Review your past analyses and track your progress
        </p>
        
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="resume" className="space-y-6 flex flex-col">
        <TabsList className="grid w-[50%] max-w-md grid-cols-3">
          <TabsTrigger value="resume">Resume</TabsTrigger>
          <TabsTrigger value="interview">Interview</TabsTrigger>
          <TabsTrigger value="jobs">Job Match</TabsTrigger>
        </TabsList>

        {/* Resume History */}
        <TabsContent value="resume" className="space-y-4">
          {loading ? (
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
            <>
              {resumeHistory.map((item) => (
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
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-lg font-bold">
                          {item.overallScore}/100
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteAnalysis(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Score: <span className="font-medium">{item.overallScore}/100</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.location.href = `/history/analysis/${item.id}`}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                    disabled={pagination.page === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-gray-600">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                    disabled={pagination.page === pagination.totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </TabsContent>

        {/* Interview History - Coming Soon */}
        <TabsContent value="interview">
          <Card>
            <CardContent className="py-12 text-center">
              <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Interview history coming soon</p>
              <p className="text-sm text-gray-500">
                Practice interviews to see your history here
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Job Match History - Coming Soon */}
        <TabsContent value="jobs">
          <Card>
            <CardContent className="py-12 text-center">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Job match history coming soon</p>
              <p className="text-sm text-gray-500">
                Match job descriptions to see them here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
// ```

// ---

// ## **Step 2: Check Browser Console**

// 1. Open browser DevTools (F12)
// 2. Go to Console tab
// 3. Refresh the history page
// 4. Look for the debug logs starting with 🔍, 📡, 📊

// **Tell me what you see in the console:**
// - What is the session status?
// - What is session.user.id?
// - What URL is it trying to fetch from?
// - What's the response?

// ---

// ## **Step 3: Check Backend Logs**

// While the history page is open, check your backend terminal for logs. You should see something like:
// ```
// GET /api/resume/history/[some-id]?page=1&limit=10
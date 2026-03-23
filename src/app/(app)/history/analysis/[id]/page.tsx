'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Target, Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { API_BASE_URL } from '@/utils/contants';

interface AnalysisDetail {
  id: string;
  resumeText: string;
  targetRole: string | null;
  overallScore: number;
  strengths: string[];
  improvements: string[];
  atsOptimization: string[];
  tailoredAdvice: string;
  createdAt: string;
}

export default function AnalysisDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [analysis, setAnalysis] = useState<AnalysisDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (params.id) {
      fetchAnalysis();
    }
  }, [params.id]);

  const fetchAnalysis = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/resume/analysis/${params.id}`);

      if (!response.ok) {
        throw new Error('Analysis not found');
      }

      const data = await response.json();
      setAnalysis(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analysis');
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error || 'Analysis not found'}</AlertDescription>
        </Alert>
        <Button onClick={() => router.push('/history')} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to History
        </Button>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => router.push('/history')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to History
        </Button>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {analysis.targetRole || 'Resume Analysis'}
        </h1>
        <div className="flex items-center gap-4 text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {formatDate(analysis.createdAt)}
          </div>
          {analysis.targetRole && (
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              {analysis.targetRole}
            </div>
          )}
        </div>
      </div>

      {/* Overall Score */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Overall Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className={`text-5xl font-bold px-6 py-3 rounded-lg ${getScoreColor(analysis.overallScore)}`}>
              {analysis.overallScore}/100
            </div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    analysis.overallScore >= 80
                      ? 'bg-green-600'
                      : analysis.overallScore >= 60
                      ? 'bg-yellow-600'
                      : 'bg-red-600'
                  }`}
                  style={{ width: `${analysis.overallScore}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strengths */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-green-600">✓ Strengths</CardTitle>
          <CardDescription>What your resume does well</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {analysis.strengths.map((strength, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Areas for Improvement */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-orange-600">⚠ Areas for Improvement</CardTitle>
          <CardDescription>What could be better</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {analysis.improvements.map((improvement, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-orange-600 mt-1">•</span>
                <span>{improvement}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* ATS Optimization */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-blue-600">🤖 ATS Optimization Tips</CardTitle>
          <CardDescription>Help your resume pass automated screening</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {analysis.atsOptimization.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Tailored Advice */}
      <Card>
        <CardHeader>
          <CardTitle className="text-purple-600">💡 Personalized Advice</CardTitle>
          <CardDescription>Specific recommendations for your career goals</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line">{analysis.tailoredAdvice}</p>
        </CardContent>
      </Card>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, TrendingUp, Loader2, AlertCircle, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { API_BASE_URL } from '@/utils/contants';

interface JobMatch {
  id: string;
  jobTitle: string;
  jobDescription: string;
  resumeText: string;
  matchPercentage: number;
  matchedSkills: string[];
  missingSkills: string[];
  matchedExperience: string[];
  missingExperience: string[];
  recommendations: string[];
  overallAssessment: string;
  createdAt: string;
}

export default function JobMatchDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [match, setMatch] = useState<JobMatch | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (params.id) {
      fetchMatch();
    }
  }, [params.id]);

  const fetchMatch = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/job/match/${params.id}`);

      if (!response.ok) {
        throw new Error('Job match not found');
      }

      const data = await response.json();
      setMatch(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load job match');
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

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 bg-green-100';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-green-600 animate-spin" />
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error || 'Job match not found'}</AlertDescription>
        </Alert>
        <Button onClick={() => router.push('/history')} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to History
        </Button>
      </div>
    );
  }

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
          {match.jobTitle}
        </h1>
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="h-4 w-4" />
          {formatDate(match.createdAt)}
        </div>
      </div>

      {/* Match Percentage */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Overall Match</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className={`text-6xl font-bold px-8 py-4 rounded-lg ${getMatchColor(match.matchPercentage)}`}>
              {match.matchPercentage}%
            </div>
            <div className="flex-1">
              <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    match.matchPercentage >= 80
                      ? 'bg-green-600'
                      : match.matchPercentage >= 60
                      ? 'bg-yellow-600'
                      : 'bg-red-600'
                  }`}
                  style={{ width: `${match.matchPercentage}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {match.matchPercentage >= 80
                  ? 'Excellent match! You meet most requirements.'
                  : match.matchPercentage >= 60
                  ? 'Good match with some gaps to address.'
                  : 'Significant gaps. Consider building more relevant experience.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Matched Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            {match.matchedSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {match.matchedSkills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                    ✓ {skill}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No matching skills found</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center gap-2">
              <XCircle className="h-5 w-5" />
              Missing Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            {match.missingSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {match.missingSkills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-red-100 text-red-800">
                    ✗ {skill}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">You have all required skills!</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Experience Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600">Matched Experience</CardTitle>
          </CardHeader>
          <CardContent>
            {match.matchedExperience.length > 0 ? (
              <ul className="space-y-2">
                {match.matchedExperience.map((exp, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{exp}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No matching experience found</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-orange-600">Missing Experience</CardTitle>
          </CardHeader>
          <CardContent>
            {match.missingExperience.length > 0 ? (
              <ul className="space-y-2">
                {match.missingExperience.map((exp, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <XCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span>{exp}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">You have all required experience!</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-purple-600 flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {match.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <span className="text-sm">{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Overall Assessment */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 whitespace-pre-line">{match.overallAssessment}</p>
        </CardContent>
      </Card>
    </div>
  );
}
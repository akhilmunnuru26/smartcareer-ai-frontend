'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, TrendingUp, AlertCircle } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface MatchResult {
  matchPercentage: number;
  matchedSkills: string[];
  missingSkills: string[];
  matchedExperience: string[];
  missingExperience: string[];
  recommendations: string[];
  overallAssessment: string;
}

export default function JobMatcher() {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MatchResult | null>(null);
  const [error, setError] = useState('');

  const analyzeMatch = async () => {
    if (resumeText.length < 100) {
      setError('Resume text must be at least 100 characters');
      return;
    }
    if (jobDescription.length < 100) {
      setError('Job description must be at least 100 characters');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      // const response = await fetch('http://localhost:5000/api/job/match', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ resumeText, jobDescription }),
      // });
      const response = await fetch('https://smartcareer-ai-backend.onrender.com/api/job/match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeText, jobDescription }),
      });

      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Match analysis failed');
      }

      setResult(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze match');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-blue-600';
    if (percentage >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-600';
    if (percentage >= 60) return 'bg-blue-600';
    if (percentage >= 40) return 'bg-orange-600';
    return 'bg-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">AI Job Matcher</h1>
          <p className="text-green-100 text-lg">
            See how well your resume matches a job description
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Resume Input */}
          <Card>
            <CardHeader>
              <CardTitle>Your Resume</CardTitle>
              <CardDescription>
                Paste your current resume text
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste your resume here...&#10;&#10;Example:&#10;John Doe&#10;Software Engineer&#10;&#10;Experience:&#10;- Built scalable applications..."
                className="min-h-[400px] font-mono text-sm"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-2">
                {resumeText.length} characters
              </p>
            </CardContent>
          </Card>

          {/* Job Description Input */}
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
              <CardDescription>
                Paste the job description you&apos;re interested in
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste job description here...&#10;&#10;Example:&#10;We are looking for a Senior Frontend Developer...&#10;&#10;Requirements:&#10;- 5+ years of React experience..."
                className="min-h-[400px] font-mono text-sm"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-2">
                {jobDescription.length} characters
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Analyze Button */}
        <div className="flex justify-center mb-6">
          <Button
            onClick={analyzeMatch}
            disabled={loading || resumeText.length < 100 || jobDescription.length < 100}
            size="lg"
            className="w-full max-w-md"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing Match...
              </>
            ) : (
              <>
                <TrendingUp className="mr-2 h-5 w-5" />
                Analyze Job Match
              </>
            )}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Results Section */}
        {result && (
          <div className="space-y-6">
            {/* Match Score Card */}
            <Card>
              <CardHeader>
                <CardTitle>Match Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8 bg-gradient-to-br from-green-50 to-teal-50 rounded-lg mb-6">
                  <div className={`text-7xl font-bold ${getMatchColor(result.matchPercentage)}`}>
                    {result.matchPercentage}%
                  </div>
                  <p className="text-gray-600 font-medium mt-3 text-lg">
                    Job Match Score
                  </p>
                  <div className="max-w-md mx-auto mt-4">
                    <Progress 
                      value={result.matchPercentage} 
                      className="h-3"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    {result.matchPercentage >= 80 && 'Excellent match! You should definitely apply! 🎉'}
                    {result.matchPercentage >= 60 && result.matchPercentage < 80 && 'Good match! Consider applying after addressing gaps'}
                    {result.matchPercentage >= 40 && result.matchPercentage < 60 && 'Moderate match. Significant skill gaps to address'}
                    {result.matchPercentage < 40 && 'Low match. Consider roles better suited to your profile'}
                  </p>
                </div>

                {/* Overall Assessment */}
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <span className="text-blue-600 text-xl">📊</span>
                    Overall Assessment
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                    {result.overallAssessment}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Skills Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Matched Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <span className="text-2xl">✓</span>
                    Matched Skills
                  </CardTitle>
                  <CardDescription>
                    Skills you have that match the job
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {result.matchedSkills.length > 0 ? (
                    <ul className="space-y-2">
                      {result.matchedSkills.map((skill, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm bg-green-50 p-3 rounded-lg">
                          <span className="text-green-600 font-bold">✓</span>
                          <span className="text-gray-700">{skill}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">No direct skill matches found</p>
                  )}
                </CardContent>
              </Card>

              {/* Missing Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="h-5 w-5" />
                    Missing Skills
                  </CardTitle>
                  <CardDescription>
                    Skills required but not in your resume
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {result.missingSkills.length > 0 ? (
                    <ul className="space-y-2">
                      {result.missingSkills.map((skill, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm bg-red-50 p-3 rounded-lg">
                          <span className="text-red-600 font-bold">✗</span>
                          <span className="text-gray-700">{skill}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">All required skills are present!</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Experience Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Matched Experience */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <span className="text-2xl">✓</span>
                    Relevant Experience
                  </CardTitle>
                  <CardDescription>
                    Your experiences that align with the role
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {result.matchedExperience.length > 0 ? (
                    <ul className="space-y-2">
                      {result.matchedExperience.map((exp, i) => (
                        <li key={i} className="text-sm bg-blue-50 p-3 rounded-lg text-gray-700">
                          • {exp}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">No matching experience found</p>
                  )}
                </CardContent>
              </Card>

              {/* Missing Experience */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-600">
                    <AlertCircle className="h-5 w-5" />
                    Experience Gaps
                  </CardTitle>
                  <CardDescription>
                    Required experiences you may lack
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {result.missingExperience.length > 0 ? (
                    <ul className="space-y-2">
                      {result.missingExperience.map((exp, i) => (
                        <li key={i} className="text-sm bg-orange-50 p-3 rounded-lg text-gray-700">
                          • {exp}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">All experience requirements met!</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-purple-600 text-2xl">💡</span>
                  Recommendations to Improve Your Match
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {result.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm bg-purple-50 p-4 rounded-lg">
                      <span className="text-purple-600 font-bold text-lg">{i + 1}.</span>
                      <span className="text-gray-700 leading-relaxed">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
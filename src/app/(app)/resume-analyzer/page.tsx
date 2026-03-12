'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

interface AnalysisResult {
  overallScore: number;
  strengths: string[];
  improvements: string[];
  atsOptimization: string[];
  tailoredAdvice: string;
}

export default function Home() {
  const [resumeText, setResumeText] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');

  const analyzeResume = async () => {
    if (resumeText.length < 100) {
      setError('Please enter at least 100 characters of resume text');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/api/resume/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeText, targetRole }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Analysis failed');
      }

      setResult(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze resume. Make sure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">AI Resume Analyzer</h1>
          <p className="text-blue-100 text-lg">
            Get instant feedback on your resume with AI-powered insights
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Input Section */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Upload Your Resume</CardTitle>
              <CardDescription>
                Paste your resume text below or upload a file for AI analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="resume" className="text-sm font-medium">
                  Resume Text *
                </Label>
                <Textarea
                  id="resume"
                  placeholder="Paste your resume here...&#10;&#10;Example:&#10;John Doe&#10;Software Engineer&#10;&#10;Experience:&#10;- Built scalable applications..."
                  className="min-h-[300px] mt-2 font-mono text-sm"
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {resumeText.length} characters (minimum 100 required)
                </p>
              </div>

              <div>
                <Label htmlFor="role" className="text-sm font-medium">
                  Target Role (Optional)
                </Label>
                <Input
                  id="role"
                  type="text"
                  placeholder="e.g., Senior Frontend Developer"
                  className="mt-2"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                />
              </div>

              <Button
                onClick={analyzeResume}
                disabled={loading || resumeText.length < 100}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing with AI...
                  </>
                ) : (
                  'Analyze Resume'
                )}
              </Button>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="h-fit overflow-scroll max-h-[572px]">
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
              <CardDescription>
                AI-powered insights and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!result && !loading && (
                <div className="text-center text-gray-500 py-16">
                  <div className="text-6xl mb-4">📄</div>
                  <p className="text-lg font-medium">No analysis yet</p>
                  <p className="text-sm mt-2">
                    Enter your resume and click analyze to see AI-powered insights
                  </p>
                </div>
              )}

              {loading && (
                <div className="text-center py-16">
                  <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
                  <p className="mt-4 text-gray-600 font-medium">
                    Analyzing with Gemini AI...
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    This usually takes 5-10 seconds
                  </p>
                </div>
              )}

              {result && (
                <div className="space-y-6">
                  {/* Overall Score */}
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                    <div className={`text-6xl font-bold ${getScoreColor(result.overallScore)}`}>
                      {result.overallScore}
                    </div>
                    <p className="text-gray-600 font-medium mt-2">Overall Score</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {result.overallScore >= 80 && 'Excellent resume! 🎉'}
                      {result.overallScore >= 60 && result.overallScore < 80 && 'Good foundation, room for improvement'}
                      {result.overallScore >= 40 && result.overallScore < 60 && 'Needs significant improvements'}
                      {result.overallScore < 40 && 'Major revisions recommended'}
                    </p>
                  </div>

                  {/* Strengths */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <span className="text-green-600 text-xl">✓</span> 
                      Strengths
                    </h3>
                    <ul className="space-y-2">
                      {result.strengths.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700 bg-green-50 p-3 rounded-lg">
                          <span className="text-green-600 font-bold mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Improvements */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <span className="text-orange-600 text-xl">⚠</span> 
                      Areas to Improve
                    </h3>
                    <ul className="space-y-2">
                      {result.improvements.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700 bg-orange-50 p-3 rounded-lg">
                          <span className="text-orange-600 font-bold mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* ATS Optimization */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <span className="text-blue-600 text-xl">🤖</span> 
                      ATS Optimization Tips
                    </h3>
                    <ul className="space-y-2">
                      {result.atsOptimization.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700 bg-blue-50 p-3 rounded-lg">
                          <span className="text-blue-600 font-bold mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Personalized Advice */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <span className="text-purple-600 text-xl">💡</span> 
                      Personalized Career Advice
                    </h3>
                    <div className="text-sm text-gray-700 bg-purple-50 p-4 rounded-lg whitespace-pre-line leading-relaxed">
                      {result.tailoredAdvice}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
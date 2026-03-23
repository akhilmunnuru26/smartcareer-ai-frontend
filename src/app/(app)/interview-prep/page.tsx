
'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Target, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import { API_BASE_URL } from '@/utils/contants';

interface Question {
  question: string;
  category: string;
}

interface Evaluation {
  score: number;
  strengths: string[];
  improvements: string[];
  feedback: string;
}

interface QuestionState {
  answer: string;
  evaluation: Evaluation | null;
}

export default function InterviewPrepPage() {
  const { data: session } = useSession();
  const [role, setRole] = useState('');
  const [difficulty, setDifficulty] = useState('mid');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  
  // Store answers and evaluations for all questions
  const [questionStates, setQuestionStates] = useState<Record<number, QuestionState>>({});
  
  const [loading, setLoading] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [error, setError] = useState('');

  // Get current question's state
  const currentAnswer = questionStates[currentQuestionIndex]?.answer || '';
  const currentEvaluation = questionStates[currentQuestionIndex]?.evaluation || null;

  const generateQuestions = async () => {
    if (!role.trim()) {
      setError('Please enter a job role');
      return;
    }

    setLoading(true);
    setError('');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setQuestionStates({});
    setSessionId(null); 


    try {
      const response = await fetch(`${API_BASE_URL}/api/interview/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role, difficulty, userId: session?.user?.id }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. You can generate 15 question sets per hour. Please try again later.');
        }
        throw new Error(data.message || 'Failed to generate questions');
      }

      if (Array.isArray(data.questions)) {
        setQuestions(data.questions);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate questions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateCurrentAnswer = (value: string) => {
    setQuestionStates(prev => ({
      ...prev,
      [currentQuestionIndex]: {
        answer: value,
        evaluation: prev[currentQuestionIndex]?.evaluation || null,
      },
    }));
  };

  const evaluateAnswer = async () => {
    if (!currentAnswer.trim()) {
      setError('Please enter your answer');
      return;
    }

    setEvaluating(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/interview/evaluate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: questions[currentQuestionIndex].question,
          answer: currentAnswer,
          role,
          userId: session?.user?.id,
          sessionId, 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please try again later.');
        }
        throw new Error(data.message || 'Failed to evaluate answer');
      }

      // Save evaluation to current question state
      setQuestionStates(prev => ({
        ...prev,
        [currentQuestionIndex]: {
          answer: currentAnswer,
          evaluation: data.evaluation,
        },
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to evaluate answer');
      console.error(err);
    } finally {
      setEvaluating(false);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setError('');
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setError('');
    }
  };

  const resetInterview = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setQuestionStates({});
    setError('');
    setRole('');
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  // Calculate overall progress
  const answeredCount = Object.keys(questionStates).length;
  const evaluatedCount = Object.values(questionStates).filter(s => s.evaluation).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">AI Interview Prep</h1>
          <p className="text-purple-100 text-lg">
            Practice with AI-generated questions and get real-time feedback
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!questions || questions.length === 0 ? (
          // Setup Phase
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Configure Your Interview</CardTitle>
                <CardDescription>
                  Choose a role and difficulty level to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Job Role *</Label>
                  <Input
                    id="role"
                    placeholder="e.g., Senior Frontend Developer"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level</SelectItem>
                      <SelectItem value="mid">Mid Level</SelectItem>
                      <SelectItem value="senior">Senior Level</SelectItem>
                      <SelectItem value="expert">Expert Level</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  onClick={generateQuestions}
                  disabled={loading}
                  className="w-full"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Questions...
                    </>
                  ) : (
                    <>
                      <Target className="mr-2 h-4 w-4" />
                      Generate Interview Questions
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Interview Phase
          <div className="space-y-6">
            {/* Progress Bar */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-gray-600">
                    {answeredCount} / {questions.length} answered • {evaluatedCount} evaluated
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-600 transition-all"
                    style={{ width: `${(answeredCount / questions.length) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Question & Answer */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Question {currentQuestionIndex + 1} of {questions.length}</CardTitle>
                        <CardDescription>{role} - {difficulty} level</CardDescription>
                      </div>
                      <Badge variant="outline">
                        {questions[currentQuestionIndex]?.category || 'General'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-lg font-medium text-gray-900">
                        {questions[currentQuestionIndex]?.question}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="answer">Your Answer</Label>
                      <Textarea
                        id="answer"
                        placeholder="Type your answer here... Be specific and provide examples."
                        className="min-h-[200px]"
                        value={currentAnswer}
                        onChange={(e) => updateCurrentAnswer(e.target.value)}
                        disabled={evaluating}
                      />
                      <p className="text-xs text-gray-500">
                        {currentAnswer.length} characters (minimum 50 recommended)
                      </p>
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="flex gap-2">
                      <Button
                        onClick={evaluateAnswer}
                        disabled={evaluating || currentAnswer.length < 10}
                        className="flex-1"
                      >
                        {evaluating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Evaluating...
                          </>
                        ) : currentEvaluation ? (
                          'Re-evaluate Answer'
                        ) : (
                          'Evaluate Answer'
                        )}
                      </Button>
                      <Button variant="outline" onClick={resetInterview}>
                        New Interview
                      </Button>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between pt-4 border-t">
                      <Button
                        variant="outline"
                        onClick={previousQuestion}
                        disabled={currentQuestionIndex === 0}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        onClick={nextQuestion}
                        disabled={currentQuestionIndex === questions.length - 1}
                      >
                        Next Question
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right: Evaluation Results */}
              <div>
                {currentEvaluation ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>AI Evaluation</CardTitle>
                      <CardDescription>Question {currentQuestionIndex + 1} feedback</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Score */}
                      <div className="text-center">
                        <div className={`inline-block text-5xl font-bold px-8 py-4 rounded-lg ${getScoreColor(currentEvaluation.score)}`}>
                          {currentEvaluation.score}/100
                        </div>
                      </div>

                      {/* Strengths */}
                      <div>
                        <h3 className="font-semibold text-green-600 mb-2 flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5" />
                          Strengths
                        </h3>
                        <ul className="space-y-2">
                          {currentEvaluation.strengths.map((strength, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <span className="text-green-600 mt-1">•</span>
                              <span>{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Improvements */}
                      <div>
                        <h3 className="font-semibold text-orange-600 mb-2 flex items-center gap-2">
                          <XCircle className="h-5 w-5" />
                          Areas for Improvement
                        </h3>
                        <ul className="space-y-2">
                          {currentEvaluation.improvements.map((improvement, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <span className="text-orange-600 mt-1">•</span>
                              <span>{improvement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Feedback */}
                      <div>
                        <h3 className="font-semibold text-blue-600 mb-2 flex items-center gap-2">
                          <Lightbulb className="h-5 w-5" />
                          Detailed Feedback
                        </h3>
                        <p className="text-sm text-gray-700 whitespace-pre-line">
                          {currentEvaluation.feedback}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">
                        {currentAnswer ? 
                          'Click "Evaluate Answer" to see AI feedback' : 
                          'Answer the question and click "Evaluate Answer"'
                        }
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
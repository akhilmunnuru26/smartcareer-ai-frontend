"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Question {
  question: string;
  difficulty: string;
  category: string;
}

interface Feedback {
  score: number;
  strengths: string[];
  improvements: string[];
  suggestion: string;
}

export default function InterviewPrep() {
  const [role, setRole] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [evaluating, setEvaluating] = useState(false);
  const [error, setError] = useState('');

  const generateQuestions = async () => {
    if (!role || !difficulty) {
      setError('Please select both role and difficulty level');
      return;
    }

    setLoading(true);
    setError('');
    setQuestions([]);
    setFeedback(null);
    setCurrentQuestionIndex(0);

    try {
      const response = await fetch('http://localhost:5000/api/interview/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role, difficulty }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to generate questions');
      }

      setQuestions(data.data.questions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate questions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const evaluateAnswer = async () => {
    if (!answer.trim()) {
      setError('Please provide an answer');
      return;
    }

    setEvaluating(true);
    setError('');
    setFeedback(null);

    try {
      const response = await fetch('http://localhost:5000/api/interview/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: questions[currentQuestionIndex].question,
          answer,
          role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to evaluate answer');
      }

      setFeedback(data.data);
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
      setAnswer('');
      setFeedback(null);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setAnswer('');
      setFeedback(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
          {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">AI Interview Prep</h1>
          <p className="text-purple-100 text-lg">
            Practice with AI-generated questions and get instant feedback
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {questions.length === 0 ? (
          /* Setup Card */
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Configure Your Interview Practice</CardTitle>
              <CardDescription>
                Select your target role and difficulty level to generate practice questions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="role">Target Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Frontend Developer">Frontend Developer</SelectItem>
                    <SelectItem value="Backend Developer">Backend Developer</SelectItem>
                    <SelectItem value="Full-Stack Developer">Full-Stack Developer</SelectItem>
                    <SelectItem value="DevOps Engineer">DevOps Engineer</SelectItem>
                    <SelectItem value="Data Engineer">Data Engineer</SelectItem>
                    <SelectItem value="Mobile Developer">Mobile Developer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Junior">Junior (0-2 years)</SelectItem>
                    <SelectItem value="Mid-Level">Mid-Level (2-5 years)</SelectItem>
                    <SelectItem value="Senior">Senior (5+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={generateQuestions}
                disabled={loading || !role || !difficulty}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Questions...
                  </>
                ) : (
                  'Generate Interview Questions'
                )}
              </Button>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        ) : (
          /* Interview Questions */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Question Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </CardTitle>
                  <span className="text-sm font-medium px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                    {questions[currentQuestionIndex].difficulty}
                  </span>
                </div>
                <CardDescription>
                  Category: {questions[currentQuestionIndex].category}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-lg font-medium text-gray-800">
                    {questions[currentQuestionIndex].question}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="answer">Your Answer</Label>
                  <Textarea
                    id="answer"
                    placeholder="Type your answer here..."
                    className="min-h-[200px]"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={evaluateAnswer}
                    disabled={evaluating || !answer.trim()}
                    className="flex-1"
                  >
                    {evaluating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Evaluating...
                      </>
                    ) : (
                      'Get AI Feedback'
                    )}
                  </Button>
                </div>

                <div className="flex justify-between">
                  <Button
                    onClick={previousQuestion}
                    disabled={currentQuestionIndex === 0}
                    variant="outline"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={nextQuestion}
                    disabled={currentQuestionIndex === questions.length - 1}
                    variant="outline"
                  >
                    Next Question
                  </Button>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Feedback Card */}
            <Card>
              <CardHeader>
                <CardTitle>AI Feedback</CardTitle>
                <CardDescription>
                  Detailed evaluation of your answer
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!feedback && !evaluating && (
                  <div className="text-center text-gray-500 py-16">
                    <div className="text-6xl mb-4">🎯</div>
                    <p className="text-lg font-medium">No feedback yet</p>
                    <p className="text-sm mt-2">
                      Answer the question and click &quot;Get AI Feedback&quot;
                    </p>
                  </div>
                )}

                {evaluating && (
                  <div className="text-center py-16">
                    <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto" />
                    <p className="mt-4 text-gray-600 font-medium">
                      Evaluating your answer...
                    </p>
                  </div>
                )}

                {feedback && (
                  <div className="space-y-6">
                    {/* Score */}
                    <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg">
                      <div className={`text-6xl font-bold ${
                        feedback.score >= 80 ? 'text-green-600' :
                        feedback.score >= 60 ? 'text-blue-600' :
                        feedback.score >= 40 ? 'text-orange-600' : 'text-red-600'
                      }`}>
                        {feedback.score}
                      </div>
                      <p className="text-gray-600 font-medium mt-2">Answer Score</p>
                    </div>

                    {/* Strengths */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <CheckCircle className="text-green-600 h-5 w-5" />
                        What You Did Well
                      </h3>
                      <ul className="space-y-2">
                        {feedback.strengths.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700 bg-green-50 p-3 rounded-lg">
                            <span className="text-green-600 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Improvements */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <XCircle className="text-orange-600 h-5 w-5" />
                        Areas to Improve
                      </h3>
                      <ul className="space-y-2">
                        {feedback.improvements.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700 bg-orange-50 p-3 rounded-lg">
                            <span className="text-orange-600 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Suggestion */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <span className="text-purple-600 text-xl">💡</span>
                        Model Answer / Suggestion
                      </h3>
                      <div className="text-sm text-gray-700 bg-purple-50 p-4 rounded-lg whitespace-pre-line">
                        {feedback.suggestion}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
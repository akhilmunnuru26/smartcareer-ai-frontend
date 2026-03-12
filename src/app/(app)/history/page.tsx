'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FileText, Target, TrendingUp, Clock, Trash2 } from 'lucide-react';

export default function HistoryPage() {
  // Mock data - we'll replace with real data later
  const [resumeHistory] = useState([
    {
      id: 1,
      date: '2026-03-12',
      score: 85,
      targetRole: 'Senior Frontend Developer',
    },
    {
      id: 2,
      date: '2026-03-10',
      score: 78,
      targetRole: 'Full-Stack Developer',
    },
  ]);

  const [interviewHistory] = useState([
    {
      id: 1,
      date: '2026-03-11',
      role: 'Frontend Developer',
      difficulty: 'Mid-Level',
      questionsAnswered: 5,
    },
  ]);

  const [jobMatchHistory] = useState([
    {
      id: 1,
      date: '2026-03-09',
      matchPercentage: 88,
      jobTitle: 'Senior React Developer',
    },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Analysis History</h1>
        <p className="text-xl text-gray-600">
          Review your past analyses and track your progress
        </p>
      </div>

      <Tabs defaultValue="resume" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="resume">Resume</TabsTrigger>
          <TabsTrigger value="interview">Interview</TabsTrigger>
          <TabsTrigger value="jobs">Job Match</TabsTrigger>
        </TabsList>

        {/* Resume History */}
        <TabsContent value="resume" className="space-y-4">
          {resumeHistory.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No resume analyses yet</p>
                <p className="text-sm text-gray-500 mt-2">
                  Analyze your first resume to see it here
                </p>
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
                          Resume Analysis
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Clock className="h-4 w-4" />
                          {new Date(item.date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-lg font-bold">
                        {item.score}/100
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Target Role: <span className="font-medium">{item.targetRole}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Interview History */}
        <TabsContent value="interview" className="space-y-4">
          {interviewHistory.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No interview sessions yet</p>
                <p className="text-sm text-gray-500 mt-2">
                  Start practicing to see your history here
                </p>
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
                          {item.role} Interview Practice
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Clock className="h-4 w-4" />
                          {new Date(item.date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>
                        Difficulty: <span className="font-medium">{item.difficulty}</span>
                      </span>
                      <span>
                        Questions: <span className="font-medium">{item.questionsAnswered}</span>
                      </span>
                    </div>
                    <Button variant="outline" size="sm">
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
          {jobMatchHistory.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No job matches yet</p>
                <p className="text-sm text-gray-500 mt-2">
                  Match a job description to see it here
                </p>
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
                          {new Date(item.date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-lg font-bold">
                        {item.matchPercentage}%
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-end">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
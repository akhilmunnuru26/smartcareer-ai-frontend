'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Sparkles, Target, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const features = [
    {
      icon: <Sparkles className="h-8 w-8 text-blue-600" />,
      title: "Resume Analyzer",
      description: "Get instant AI-powered feedback on your resume with ATS optimization tips",
      href: "/resume-analyzer",
      color: "blue",
    },
    {
      icon: <Target className="h-8 w-8 text-purple-600" />,
      title: "Interview Prep",
      description: "Practice with role-specific questions and get real-time AI feedback",
      href: "/interview-prep",
      color: "purple",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      title: "Job Matcher",
      description: "See how well you match job descriptions and get improvement tips",
      href: "/job-matcher",
      color: "green",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome to SmartCareer AI
          </h1>
          <p className="text-xl text-gray-600">
            Choose a tool to get started with your career journey
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Link key={index} href={feature.href}>
              <Card className="h-full hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-blue-300">
                <CardHeader>
                  <div className={`mb-4 bg-${feature.color}-50 w-16 h-16 rounded-lg flex items-center justify-center`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Your Activity</CardTitle>
            <CardDescription>Track your career development progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">0</div>
                <div className="text-sm text-gray-600">Resumes Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">0</div>
                <div className="text-sm text-gray-600">Interview Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">0</div>
                <div className="text-sm text-gray-600">Jobs Matched</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, History } from 'lucide-react';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              SmartCareer AI
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              Resume Analyzer
            </Link>
            <Link 
              href="/interview-prep" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              Interview Prep
            </Link>
            <Link 
              href="/job-matcher" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              Job Matcher
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ) : session ? (
              <>
                <Link href="/history">
                  <Button variant="ghost" size="sm">
                    <History className="h-4 w-4 mr-2" />
                    History
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {session.user?.name?.charAt(0) || session.user?.email?.charAt(0)}
                        </span>
                      </div>
                      <span className="hidden sm:inline">{session.user?.name || 'User'}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link href="/auth/signin">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Get Started
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
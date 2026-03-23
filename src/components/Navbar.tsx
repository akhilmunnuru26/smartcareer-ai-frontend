// 'use client';

// import Link from 'next/link';
// import { useSession, signOut } from 'next-auth/react';
// import { Button } from '@/components/ui/button';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { User, LogOut, History } from 'lucide-react';

// export default function Navbar() {
//   const { data: session, status } = useSession();

//   return (
//     <nav className="border-b bg-white shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link href="/" className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold text-xl">S</span>
//             </div>
//             <span className="text-xl font-bold text-gray-900">
//               SmartCareer AI
//             </span>
//           </Link>

//           {/* Navigation Links */}
//           <div className="hidden md:flex space-x-8">
//             <Link 
//               href="/" 
//               className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
//             >
//               Resume Analyzer
//             </Link>
//             <Link 
//               href="/interview-prep" 
//               className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
//             >
//               Interview Prep
//             </Link>
//             <Link 
//               href="/job-matcher" 
//               className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
//             >
//               Job Matcher
//             </Link>
//           </div>

//           {/* Auth Section */}
//           <div className="flex items-center space-x-4">
//             {status === 'loading' ? (
//               <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
//             ) : session ? (
//               <>
//                 <Link href="/history">
//                   <Button variant="ghost" size="sm">
//                     <History className="h-4 w-4 mr-2" />
//                     History
//                   </Button>
//                 </Link>
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button variant="ghost" size="sm" className="flex items-center gap-2">
//                       <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
//                         <span className="text-white text-sm font-medium">
//                           {session.user?.name?.charAt(0) || session.user?.email?.charAt(0)}
//                         </span>
//                       </div>
//                       <span className="hidden sm:inline">{session.user?.name || 'User'}</span>
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end">
//                     <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                     <DropdownMenuSeparator />
//                     <DropdownMenuItem>
//                       <User className="mr-2 h-4 w-4" />
//                       Profile
//                     </DropdownMenuItem>
//                     <DropdownMenuItem onClick={() => signOut()}>
//                       <LogOut className="mr-2 h-4 w-4" />
//                       Sign out
//                     </DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </>
//             ) : (
//               <Link href="/auth/signin">
//                 <Button className="bg-blue-600 hover:bg-blue-700">
//                   Get Started
//                 </Button>
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, History, Settings, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // Check if we're in the app (protected area)
  const isAppRoute = pathname?.startsWith('/dashboard') || 
                     pathname?.startsWith('/resume-analyzer') || 
                     pathname?.startsWith('/interview-prep') || 
                     pathname?.startsWith('/job-matcher') ||
                     pathname?.startsWith('/history') ||
                     pathname?.startsWith('/settings');

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={session ? "/dashboard" : "/"} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              SmartCareer AI
            </span>
          </Link>

          {/* Navigation Links - Different for authenticated users */}
          {isAppRoute && session ? (
            <div className="hidden md:flex space-x-8">
              <Link 
                href="/dashboard" 
                className={`px-3 py-2 text-sm font-medium ${
                  pathname === '/dashboard' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                href="/resume-analyzer" 
                className={`px-3 py-2 text-sm font-medium ${
                  pathname === '/resume-analyzer' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Resume Analyzer
              </Link>
              <Link 
                href="/interview-prep" 
                className={`px-3 py-2 text-sm font-medium ${
                  pathname === '/interview-prep' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Interview Prep
              </Link>
              <Link 
                href="/job-matcher" 
                className={`px-3 py-2 text-sm font-medium ${
                  pathname === '/job-matcher' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Job Matcher
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex space-x-8">
              <Link href="/#features" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Features
              </Link>
              <Link href="/pricing" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Pricing
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Contact
              </Link>
            </div>
          )}

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ) : session ? (
              <>
                <Link href="/history">
                  <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
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
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span className="font-medium">{session.user?.name}</span>
                        <span className="text-xs text-gray-500">{session.user?.email}</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/history" className="cursor-pointer">
                        <History className="mr-2 h-4 w-4" />
                        History
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
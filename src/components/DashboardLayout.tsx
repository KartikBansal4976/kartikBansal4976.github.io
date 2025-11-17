import { Activity, Apple, BarChart3, Heart } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  // allow 'home' as a page so the layout can reflect the landing state
  currentPage: 'home' | 'wellness' | 'activity' | 'meals' | 'insights';
  setCurrentPage: (page: 'home' | 'wellness' | 'activity' | 'meals' | 'insights') => void;
}

export default function DashboardLayout({ children, currentPage, setCurrentPage }: DashboardLayoutProps) {
  const navItems = [
    { id: 'wellness', label: 'Wellness', icon: Heart },
    { id: 'activity', label: 'Activity Log', icon: Activity },
    { id: 'meals', label: 'Meal Planner', icon: Apple },
    { id: 'insights', label: 'Insights', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 w-full">
              <div 
                className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setCurrentPage('home')}
              >
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-lg">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  FitTrack Pro
                </h1>
              </div>

              {/* Inline navigation placed next to title */}
              <nav className="ml-6 hidden sm:flex items-center space-x-1 overflow-x-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setCurrentPage(item.id as 'home' | 'wellness' | 'activity' | 'meals' | 'insights')}
                      className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-all ${
                        isActive
                          ? 'border-emerald-500 text-emerald-600 bg-emerald-50'
                          : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium whitespace-nowrap">{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Spacer so the right-side auth area stays right aligned */}
              <div className="flex-1" />

              {/* Clerk auth area: Sign In / Sign Up when signed out, UserButton when signed in */}
              <div className="flex items-center space-x-3">
                <SignedOut>
                  <SignInButton>
                    <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Sign In</button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700">Sign Up</button>
                  </SignUpButton>
                </SignedOut>

                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation moved into the header for a unified top bar */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

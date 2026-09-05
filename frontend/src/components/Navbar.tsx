import React from 'react';
import { 
  Scale, 
  Search, 
  UserCheck, 
  PhoneCall
} from 'lucide-react';
import { AppLanguage, UserRole } from '../types';

interface NavbarProps {
  currentView: 'matters' | 'matter-detail' | 'calendar' | 'contacts' | 'client-portal' | 'contract-analysis' | 'voice-intake';
  setCurrentView: (view: 'matters' | 'matter-detail' | 'calendar' | 'contacts' | 'client-portal' | 'contract-analysis' | 'voice-intake') => void;
  lang: AppLanguage;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  onOpenSearch: () => void;
  onOpenDemoWalkthrough: () => void;
  onOpenNewMatter: () => void;
  onOpenECourtsLookup: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  lang,
  userRole,
  setUserRole,
  onOpenSearch,
  onOpenDemoWalkthrough,
  onOpenNewMatter,
  onOpenECourtsLookup,
}) => {
  const isHi = lang === 'hi';

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-md">
      {/* Main Navigation Bar */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center space-x-3 cursor-pointer shrink-0" onClick={() => setCurrentView('matters')}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-900/30 border border-amber-400/30">
              <Scale className="w-6 h-6 text-slate-950" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-xl font-bold tracking-tight text-white font-serif leading-none">
                NyaySetu
              </span>
              <div className="flex items-center space-x-2 mt-1.5">
                <span className="text-[13px] font-medium text-amber-400 font-serif leading-none">
                  न्याय सेतु
                </span>
                <span className="text-[10px] text-slate-500 font-normal hidden lg:block leading-none border-l border-slate-700 pl-2">
                  {isHi ? 'एकीकृत मुकदमेबाजी प्रणाली' : 'Unified Litigation Platform'}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          {userRole !== 'CLIENT' && (
            <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center space-x-1 lg:flex">
              <button
                id="nav-matters-btn"
                onClick={() => setCurrentView('matters')}
                className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition cursor-pointer ${
                  currentView === 'matters' || currentView === 'matter-detail'
                    ? 'bg-amber-500/10 text-amber-400 border-b-2 border-amber-500 rounded-b-none'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {isHi ? 'केस और मामले (Matters)' : 'Cases & Matters'}
              </button>
              <button
                id="nav-calendar-btn"
                onClick={() => setCurrentView('calendar')}
                className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition cursor-pointer ${
                  currentView === 'calendar'
                    ? 'bg-amber-500/10 text-amber-400 border-b-2 border-amber-500 rounded-b-none'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {isHi ? 'कोर्ट कैलेंडर व तारीखें' : 'Court Calendar'}
              </button>
              <button
                id="nav-contract-ai-btn"
                onClick={() => setCurrentView('contract-analysis')}
                className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition cursor-pointer ${
                  currentView === 'contract-analysis'
                    ? 'bg-amber-500/10 text-amber-400 border-b-2 border-amber-500 rounded-b-none'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {isHi ? 'अनुबंध विश्लेषण' : 'Contract Intelligence'}
              </button>
              <button
                id="nav-voice-intake-btn"
                onClick={() => setCurrentView('voice-intake')}
                className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                  currentView === 'voice-intake' ? 'bg-amber-500/10 text-amber-400 border-b-2 border-amber-500 rounded-b-none' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <PhoneCall className="w-4 h-4" />
                {isHi ? 'एआई कॉल डेमो' : 'AI Call Intake'}
              </button>
              <button
                id="nav-contacts-btn"
                onClick={() => setCurrentView('contacts')}
                className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition cursor-pointer ${
                  currentView === 'contacts'
                    ? 'bg-amber-500/10 text-amber-400 border-b-2 border-amber-500 rounded-b-none'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {isHi ? 'पक्षकार और संपर्क (Directory)' : 'Parties & Directory'}
              </button>
              <button
              id="nav-ecourts-btn"
              onClick={onOpenECourtsLookup}
              className="ml-1 rounded-md border border-emerald-500/15 bg-emerald-950/25 px-3 py-2 text-sm font-medium whitespace-nowrap text-emerald-300 hover:bg-emerald-950/50 flex items-center space-x-1.5 transition cursor-pointer"
              title="Search eCourts by CNR number"
            >
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>eCourts</span>
              </button>
            </nav>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            
            {/* Global Search Button */}
            <button
              id="global-search-btn"
              onClick={onOpenSearch}
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700/80 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700 text-xs sm:text-sm transition cursor-pointer shrink-0"
              aria-label="Search matters, documents, and OCR"
              title="Search across all matters, parties, and OCR documents"
            >
              <Search className="w-4 h-4 text-amber-400" />
              <kbd className="hidden sm:inline bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded text-[10px] border border-slate-700 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Role Switcher (Advocate / Paralegal / Client) */}
            <div className="hidden sm:flex items-center space-x-2 border-l border-slate-800 pl-3 shrink-0">
              <div className="relative group">
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value as UserRole)}
                  className="bg-slate-800 text-slate-200 text-xs rounded-lg border border-slate-700 px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer font-medium appearance-none pr-7"
                >
                  <option value="ADVOCATE">Advocate View</option>
                  <option value="PARALEGAL">Paralegal View</option>
                  <option value="CLIENT">Client View</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-slate-400">
                  <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};

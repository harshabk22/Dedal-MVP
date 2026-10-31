import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, UserCheck, Shield } from 'lucide-react';

export default function Navbar({ 
  activeView, 
  setActiveView, 
  onOpenCalendars,
  onOpenAIConcierge,
  currentUser,
  allPersonas,
  onSwitchUser,
  pendingRequestsCount 
}) {
  const isStudent = currentUser.role === 'student';
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#09090b]/90 backdrop-blur-xl border-b border-white/[0.07]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Brand */}
        <div 
          onClick={() => setActiveView(isStudent ? 'discover' : 'organizer')}
          className="flex items-center gap-2.5 cursor-pointer select-none"
        >
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-bold text-black text-sm">
            C
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white text-sm sm:text-base tracking-tight">
              Campus Events
            </span>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/[0.08] text-neutral-300">
              {isStudent ? 'Student' : 'Organizer'}
            </span>
          </div>
        </div>

        {/* Center Navigation - Simple and role-tailored */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.04] p-1 rounded-xl border border-white/[0.06]">
          {isStudent ? (
            <>
              <button
                onClick={() => setActiveView('discover')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeView === 'discover'
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Discover
              </button>

              <button
                onClick={() => setActiveView('student_profile')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeView === 'student_profile'
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                My Passes & Profile
              </button>

              <button
                onClick={onOpenAIConcierge}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-neutral-400 hover:text-white transition-all hover:bg-white/[0.05]"
              >
                Campus Concierge
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveView('organizer')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  activeView === 'organizer'
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <span>Organizer Workspace</span>
                {pendingRequestsCount > 0 && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-semibold">
                    {pendingRequestsCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveView('create')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeView === 'create'
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                + Create Event
              </button>
            </>
          )}

          <button
            onClick={onOpenCalendars}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-neutral-400 hover:text-white transition-all hover:bg-white/[0.05]"
          >
            Clubs
          </button>
        </nav>

        {/* Right Section: Single Unified Profile & Account Switcher */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] transition-all"
          >
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-7 h-7 rounded-lg object-cover"
            />
            <div className="text-left hidden sm:block">
              <span className="text-xs font-semibold text-white block leading-tight">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-neutral-400 block leading-tight">
                {currentUser.collegeName} · {isStudent ? 'Student' : 'Organizer'}
              </span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Clean Popover Switcher */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 p-2 bg-[#141418] border border-white/10 rounded-2xl shadow-2xl z-50 space-y-2 animate-in fade-in-50 zoom-in-95 duration-100">
              
              {/* Active User Header */}
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    Active Session
                  </span>
                  <span className={`text-[10px] font-medium px-2 py-0.2 rounded-full ${
                    isStudent ? 'bg-blue-500/10 text-blue-300' : 'bg-amber-500/10 text-amber-300'
                  }`}>
                    {isStudent ? 'Student' : 'Organizer'}
                  </span>
                </div>
                <div className="text-xs font-semibold text-white">{currentUser.name}</div>
                <div className="text-[11px] text-neutral-400 font-mono truncate">{currentUser.email}</div>
              </div>

              {/* Persona Switcher List */}
              <div className="space-y-1">
                <div className="px-2 pt-1 pb-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                  Switch Account
                </div>

                {allPersonas.map((p) => {
                  const isSelected = p.id === currentUser.id;
                  const isPStudent = p.role === 'student';
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSwitchUser(p);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left p-2 rounded-xl text-xs transition-all flex items-center justify-between ${
                        isSelected 
                          ? 'bg-white/10 text-white font-medium' 
                          : 'text-neutral-300 hover:bg-white/[0.04] hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img 
                          src={p.avatar} 
                          alt={p.name} 
                          className="w-7 h-7 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="font-medium truncate text-white">{p.name}</div>
                          <div className="text-[10px] text-neutral-400 truncate">
                            {p.collegeName} · {isPStudent ? 'Student' : 'Organizer'}
                          </div>
                        </div>
                      </div>

                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-white flex-shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

            </div>
          )}

        </div>

      </div>
    </header>
  );
}

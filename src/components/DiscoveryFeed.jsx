import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { CATEGORIES } from '../types/data';

export default function DiscoveryFeed({ 
  events, 
  colleges, 
  currentUser,
  userRequests,
  onRequestJoin,
  onOpenPassModal,
  onOpenOrganizerWorkspace,
  filterClubId,
  onClearClubFilter 
}) {
  const [scopeFilter, setScopeFilter] = useState('all'); // 'all' | 'inter_college' | 'intra_college'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      if (scopeFilter === 'inter_college' && evt.scope !== 'inter_college') return false;
      if (scopeFilter === 'intra_college' && evt.scope !== 'intra_college') return false;
      if (selectedCategory !== 'all' && evt.category !== selectedCategory) return false;
      if (filterClubId && evt.clubId !== filterClubId) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = evt.title.toLowerCase().includes(query);
        const matchDesc = evt.description.toLowerCase().includes(query);
        const matchVenue = evt.venue.toLowerCase().includes(query);
        const matchCollege = evt.collegeName.toLowerCase().includes(query);
        if (!matchTitle && !matchDesc && !matchVenue && !matchCollege) return false;
      }

      return true;
    });
  }, [events, scopeFilter, selectedCategory, filterClubId, searchQuery]);

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-7">
      
      {/* 1. Header */}
      <div className="space-y-3 pt-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Discover Events
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 max-w-2xl leading-relaxed">
          Explore gatherings at {currentUser.collegeName} and open inter-college hackathons. Sign in with your university credentials to request passes.
        </p>

        {/* Clean Search Input */}
        <div className="pt-2 max-w-lg relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search events, clubs, or colleges..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-all"
          />
        </div>
      </div>

      {/* 2. Filter Bar */}
      <div className="space-y-3 border-b border-white/[0.07] pb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Scope filter pills */}
          <div className="inline-flex p-1 bg-white/[0.04] rounded-xl border border-white/[0.06]">
            <button
              onClick={() => setScopeFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                scopeFilter === 'all'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              All Events ({events.length})
            </button>
            <button
              onClick={() => setScopeFilter('intra_college')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                scopeFilter === 'intra_college'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Campus Only ({currentUser.collegeName})
            </button>
            <button
              onClick={() => setScopeFilter('inter_college')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                scopeFilter === 'inter_college'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Open to All Colleges
            </button>
          </div>

          {/* Active club filter notice if active */}
          {filterClubId && (
            <div className="flex items-center gap-2 text-xs text-neutral-300">
              <span>Filtered by club</span>
              <button 
                onClick={onClearClubFilter}
                className="text-white hover:underline text-xs"
              >
                (Clear)
              </button>
            </div>
          )}

        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-lg text-xs transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-white/15 text-white font-medium'
                  : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Event Cards Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const isDomainMatch = event.scope === 'inter_college' || 
              (event.allowedDomain && currentUser.domain.includes(event.allowedDomain.replace('*', '')));
            
            const userReq = userRequests.find(r => r.eventId === event.id && r.studentEmail === currentUser.email);
            const requestStatus = userReq ? userReq.status : 'none';

            return (
              <div
                key={event.id}
                className="bg-[#121215] border border-white/[0.07] hover:border-white/20 rounded-2xl overflow-hidden flex flex-col justify-between transition-all group"
              >
                <div>
                  {/* Human Photograph Header */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    
                    {/* Clean Scope Tag */}
                    <div className="absolute top-3 left-3">
                      <span className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-white border border-white/10">
                        {event.scope === 'intra_college' ? `For ${event.collegeName}` : 'All Colleges'}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-neutral-300">
                        {event.price || 'Free'}
                      </span>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-base font-semibold text-white leading-snug group-hover:text-neutral-200 transition-colors">
                      {event.title}
                    </h3>

                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>

                    <div className="pt-2 border-t border-white/[0.06] space-y-1 text-xs text-neutral-400">
                      <div className="text-neutral-300 font-medium">
                        {event.date} · {event.time}
                      </div>
                      <div className="text-neutral-400 truncate">
                        {event.venue} ({event.collegeName})
                      </div>
                      <div className="text-neutral-500 text-[11px]">
                        Organized by {event.clubName}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Simple, Human Action Button */}
                <div className="p-5 pt-0">
                  {currentUser.role === 'admin' ? (
                    <button
                      onClick={onOpenOrganizerWorkspace}
                      className="w-full py-2.5 rounded-xl text-xs font-medium bg-white/[0.06] hover:bg-white/[0.12] text-neutral-300 transition-all border border-white/10"
                    >
                      View in Workspace ({event.registeredCount}/{event.capacity})
                    </button>
                  ) : !isDomainMatch ? (
                    <button
                      disabled
                      className="w-full py-2.5 rounded-xl text-xs font-medium bg-white/[0.03] text-neutral-500 cursor-not-allowed border border-white/[0.05]"
                    >
                      Restricted to {event.collegeName}
                    </button>
                  ) : requestStatus === 'approved' ? (
                    <button
                      onClick={() => onOpenPassModal(event)}
                      className="w-full py-2.5 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-black transition-all shadow-sm"
                    >
                      View Entry Pass
                    </button>
                  ) : requestStatus === 'pending' ? (
                    <button
                      disabled
                      className="w-full py-2.5 rounded-xl text-xs font-medium bg-amber-500/10 border border-amber-500/25 text-amber-300 cursor-default"
                    >
                      Request Pending Review
                    </button>
                  ) : (
                    <button
                      onClick={() => onRequestJoin(event)}
                      className="w-full py-2.5 rounded-xl text-xs font-semibold bg-white hover:bg-neutral-200 text-black transition-all"
                    >
                      Request to Join
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center bg-white/[0.02] border border-white/[0.06] rounded-2xl space-y-2">
          <h3 className="text-sm font-semibold text-white">No events match your filter</h3>
          <p className="text-xs text-neutral-400">
            Try switching your scope filter or clearing the search query.
          </p>
        </div>
      )}

    </div>
  );
}

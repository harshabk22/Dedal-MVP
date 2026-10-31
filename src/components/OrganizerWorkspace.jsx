import React, { useState, useMemo } from 'react';
import { Plus, Search, Check, X, Users, Calendar, Clock, MapPin, Building, ArrowUpRight } from 'lucide-react';

export default function OrganizerWorkspace({ 
  currentAdmin, 
  events, 
  requests, 
  onApproveRequest, 
  onDeclineRequest, 
  onOpenCreateEvent 
}) {
  const [activeTab, setActiveTab] = useState('events'); // 'events' | 'applicants'
  const [applicantFilter, setApplicantFilter] = useState('all'); // 'all' | 'pending' | 'approved' | 'declined'
  const [applicantSearch, setApplicantSearch] = useState('');
  const [filterEventId, setFilterEventId] = useState(null);

  const pendingRequests = useMemo(() => requests.filter(r => r.status === 'pending'), [requests]);
  const approvedRequests = useMemo(() => requests.filter(r => r.status === 'approved'), [requests]);
  const totalRegistered = useMemo(() => events.reduce((sum, e) => sum + e.registeredCount, 0), [events]);

  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      if (applicantFilter === 'pending' && req.status !== 'pending') return false;
      if (applicantFilter === 'approved' && req.status !== 'approved') return false;
      if (applicantFilter === 'declined' && req.status !== 'declined') return false;
      if (filterEventId && req.eventId !== filterEventId) return false;

      if (applicantSearch.trim()) {
        const query = applicantSearch.toLowerCase();
        const matchName = req.studentName.toLowerCase().includes(query);
        const matchEmail = req.studentEmail.toLowerCase().includes(query);
        const matchEvent = req.eventTitle.toLowerCase().includes(query);
        const matchCollege = req.studentCollege.toLowerCase().includes(query);
        if (!matchName && !matchEmail && !matchEvent && !matchCollege) return false;
      }
      return true;
    });
  }, [requests, applicantFilter, applicantSearch, filterEventId]);

  const handleSelectEventApplicants = (eventId) => {
    setFilterEventId(eventId);
    setActiveTab('applicants');
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      
      {/* 1. Organizer Header */}
      <div className="bg-[#121215] p-6 sm:p-8 rounded-2xl border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4 sm:gap-5">
          <img 
            src={currentAdmin.avatar} 
            alt={currentAdmin.name} 
            className="w-16 h-16 rounded-xl object-cover border border-white/10"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {currentAdmin.name}
              </h1>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/[0.08] text-neutral-300">
                Organizer
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
              {currentAdmin.title} · {currentAdmin.collegeName}
            </p>
            <p className="text-xs text-neutral-500 font-mono mt-0.5">
              {currentAdmin.email}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenCreateEvent}
          className="px-4 py-2 bg-white hover:bg-neutral-200 text-black font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Create Event</span>
        </button>
      </div>

      {/* 2. Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-[#121215] border border-white/[0.07] space-y-1">
          <span className="text-xs text-neutral-400">Events Managed</span>
          <span className="text-2xl sm:text-3xl font-bold text-white block">{events.length}</span>
          <span className="text-xs text-neutral-500">Active campus & inter-college</span>
        </div>

        <div className="p-5 rounded-xl bg-[#121215] border border-white/[0.07] space-y-1">
          <span className="text-xs text-neutral-400">Pending Approvals</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-white block">{pendingRequests.length}</span>
            {pendingRequests.length > 0 && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/25">
                Action Required
              </span>
            )}
          </div>
          <span className="text-xs text-neutral-500">Student join requests waiting</span>
        </div>

        <div className="p-5 rounded-xl bg-[#121215] border border-white/[0.07] space-y-1">
          <span className="text-xs text-neutral-400">Total Attendees</span>
          <span className="text-2xl sm:text-3xl font-bold text-white block">{totalRegistered}</span>
          <span className="text-xs text-neutral-500">Verified college passes issued</span>
        </div>
      </div>

      {/* 3. Segmented Navigation Tabs */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3">
          <button
            onClick={() => { setActiveTab('events'); setFilterEventId(null); }}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'events'
                ? 'bg-white text-black font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Events Roster ({events.length})
          </button>

          <button
            onClick={() => setActiveTab('applicants')}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 ${
              activeTab === 'applicants'
                ? 'bg-white text-black font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <span>Applicants & Approvals</span>
            {pendingRequests.length > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === 'applicants' ? 'bg-black text-white' : 'bg-amber-500/20 text-amber-300'
              }`}>
                {pendingRequests.length}
              </span>
            )}
          </button>
        </div>

        {/* TAB 1: EVENTS ROSTER */}
        {activeTab === 'events' && (
          <div className="bg-[#121215] rounded-xl border border-white/[0.07] overflow-hidden">
            <div className="p-5 border-b border-white/[0.06] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">Your Events</h3>
                <p className="text-xs text-neutral-400 mt-0.5">Manage attendee capacity, venues, and registrations.</p>
              </div>
              <button
                onClick={onOpenCreateEvent}
                className="text-xs font-medium text-neutral-300 hover:text-white flex items-center gap-1"
              >
                <span>+ New Event</span>
              </button>
            </div>

            <div className="divide-y divide-white/[0.04]">
              {events.map((evt) => {
                const fillPercent = Math.min(100, Math.round((evt.registeredCount / evt.capacity) * 100));
                return (
                  <div key={evt.id} className="p-5 hover:bg-white/[0.02] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <img 
                        src={evt.image} 
                        alt={evt.title} 
                        className="w-16 h-12 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-white">{evt.title}</h4>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.06] text-neutral-300">
                            {evt.scope === 'intra_college' ? `Campus Only (${evt.collegeName})` : 'Inter-College'}
                          </span>
                        </div>
                        <div className="text-xs text-neutral-400 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span>{evt.date} · {evt.time}</span>
                          <span>·</span>
                          <span>{evt.venue}</span>
                          <span>·</span>
                          <span className="text-neutral-500">By {evt.clubName}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 self-end md:self-auto">
                      <div className="text-right">
                        <span className="text-xs text-neutral-300 font-medium block">
                          {evt.registeredCount} / {evt.capacity} seats
                        </span>
                        <div className="w-24 h-1.5 bg-neutral-800 rounded-full mt-1 overflow-hidden">
                          <div 
                            className="h-full bg-white rounded-full transition-all"
                            style={{ width: `${fillPercent}%` }}
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => handleSelectEventApplicants(evt.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.06] hover:bg-white/[0.12] text-neutral-200 transition-all"
                      >
                        View Applicants
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: APPLICANTS & APPROVALS LEDGER */}
        {activeTab === 'applicants' && (
          <div className="bg-[#121215] rounded-xl border border-white/[0.07] overflow-hidden space-y-4 p-5">
            
            {/* Header & Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/[0.06]">
              <div>
                <h3 className="text-sm font-semibold text-white">Student Registration Requests</h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Verify student email domains and approve passes.
                  {filterEventId && (
                    <span className="ml-2 text-white font-medium">
                      (Filtered by event · <button onClick={() => setFilterEventId(null)} className="underline text-neutral-400 hover:text-white">Clear</button>)
                    </span>
                  )}
                </p>
              </div>

              {/* Status Filters */}
              <div className="inline-flex p-1 bg-white/[0.04] rounded-lg border border-white/[0.06]">
                <button
                  onClick={() => setApplicantFilter('all')}
                  className={`px-3 py-1 rounded text-xs transition-all ${
                    applicantFilter === 'all' ? 'bg-white text-black font-semibold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  All ({requests.length})
                </button>
                <button
                  onClick={() => setApplicantFilter('pending')}
                  className={`px-3 py-1 rounded text-xs transition-all ${
                    applicantFilter === 'pending' ? 'bg-white text-black font-semibold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Pending ({pendingRequests.length})
                </button>
                <button
                  onClick={() => setApplicantFilter('approved')}
                  className={`px-3 py-1 rounded text-xs transition-all ${
                    applicantFilter === 'approved' ? 'bg-white text-black font-semibold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Approved ({approvedRequests.length})
                </button>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative max-w-sm">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search by student name, college or email..."
                value={applicantSearch}
                onChange={(e) => setApplicantSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-black/40 border border-white/10 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
              />
            </div>

            {/* Applicants Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/[0.06] text-neutral-400 text-[11px]">
                    <th className="pb-3 font-medium">Student Name & ID</th>
                    <th className="pb-3 font-medium">College Email</th>
                    <th className="pb-3 font-medium">Affiliation</th>
                    <th className="pb-3 font-medium">Requested Event</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filteredRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 font-medium text-white">
                        <div>{req.studentName}</div>
                        <div className="text-[10px] text-neutral-400 font-mono">{req.studentId}</div>
                      </td>
                      <td className="py-3.5 text-neutral-300 font-mono">
                        {req.studentEmail}
                      </td>
                      <td className="py-3.5 text-neutral-400">
                        {req.studentCollege}
                      </td>
                      <td className="py-3.5 text-neutral-200 max-w-xs truncate">
                        {req.eventTitle}
                      </td>
                      <td className="py-3.5">
                        <span className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                          req.status === 'approved'
                            ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                            : req.status === 'pending'
                            ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                            : 'bg-neutral-800 text-neutral-400'
                        }`}>
                          {req.status === 'approved' ? 'Approved' : req.status === 'pending' ? 'Pending' : 'Declined'}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        {req.status === 'pending' ? (
                          <div className="inline-flex items-center gap-2">
                            <button
                              onClick={() => onApproveRequest(req.id)}
                              className="px-2.5 py-1 bg-white hover:bg-neutral-200 text-black font-semibold rounded text-[11px] transition-all"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => onDeclineRequest(req.id)}
                              className="px-2.5 py-1 bg-white/[0.06] hover:bg-white/[0.12] text-neutral-400 hover:text-white rounded text-[11px] transition-all"
                            >
                              Decline
                            </button>
                          </div>
                        ) : (
                          <span className="text-neutral-500 text-[11px]">
                            {req.status === 'approved' ? 'Pass Issued' : 'Closed'}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredRequests.length === 0 && (
                <div className="py-12 text-center text-xs text-neutral-500">
                  No applicant requests match your search.
                </div>
              )}
            </div>

          </div>
        )}

      </div>

    </div>
  );
}

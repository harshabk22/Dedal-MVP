import React, { useState } from 'react';

export default function StudentProfileView({ 
  currentUser, 
  events, 
  userRequests, 
  onOpenPass, 
  onOpenAIConcierge,
  onUpdateInterests 
}) {
  const [activeTab, setActiveTab] = useState('passes'); // 'passes' | 'participations' | 'winnings' | 'cancellations'
  const [newInterestInput, setNewInterestInput] = useState('');

  // Collect approved passes for this user
  const approvedEventIds = userRequests
    .filter(r => r.studentEmail === currentUser.email && r.status === 'approved')
    .map(r => r.eventId);

  const approvedEvents = events.filter(e => approvedEventIds.includes(e.id));

  const handleAddInterest = (e) => {
    e.preventDefault();
    if (newInterestInput.trim() && !currentUser.interests.includes(newInterestInput.trim())) {
      onUpdateInterests([...currentUser.interests, newInterestInput.trim()]);
      setNewInterestInput('');
    }
  };

  const handleRemoveInterest = (interestToRemove) => {
    onUpdateInterests(currentUser.interests.filter(i => i !== interestToRemove));
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-7">
      
      {/* 1. Student Header */}
      <div className="bg-[#121215] p-6 sm:p-8 rounded-2xl border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4 sm:gap-5">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            className="w-16 h-16 rounded-xl object-cover border border-white/10"
          />
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {currentUser.name}
              </h1>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/[0.08] text-neutral-300">
                Student
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400">
              {currentUser.department} · {currentUser.collegeName}
            </p>
            <p className="text-xs text-neutral-500 font-mono">
              {currentUser.email} · ID: {currentUser.studentId}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenAIConcierge}
          className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] text-xs font-medium text-white transition-all"
        >
          Ask Concierge
        </button>
      </div>

      {/* 2. Interests Tag Bar */}
      <div className="bg-[#121215] p-5 rounded-xl border border-white/[0.07] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-white">
            Your Tracked Interests
          </span>
          <span className="text-[11px] text-neutral-500">
            Used to suggest relevant campus gatherings
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {currentUser.interests && currentUser.interests.map((interest, idx) => (
            <span 
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] text-neutral-200 text-xs"
            >
              <span>{interest}</span>
              <button 
                onClick={() => handleRemoveInterest(interest)}
                className="text-neutral-500 hover:text-white ml-1 text-sm leading-none"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <form onSubmit={handleAddInterest} className="flex gap-2 pt-1 max-w-sm">
          <input
            type="text"
            placeholder="Add topic (e.g. Design, Mobile)..."
            value={newInterestInput}
            onChange={(e) => setNewInterestInput(e.target.value)}
            className="flex-1 px-3 py-1.5 text-xs bg-black/40 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-white/[0.08] hover:bg-white/[0.15] text-white rounded-lg text-xs font-medium"
          >
            Add
          </button>
        </form>
      </div>

      {/* 3. Ledgers Tabs */}
      <div className="space-y-4">
        
        {/* Navigation pills */}
        <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('passes')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'passes'
                ? 'bg-white text-black font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Confirmed Passes ({approvedEvents.length})
          </button>

          <button
            onClick={() => setActiveTab('participations')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'participations'
                ? 'bg-white text-black font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Attended ({currentUser.participations ? currentUser.participations.length : 0})
          </button>

          <button
            onClick={() => setActiveTab('winnings')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'winnings'
                ? 'bg-white text-black font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Awards ({currentUser.winnings ? currentUser.winnings.length : 0})
          </button>

          <button
            onClick={() => setActiveTab('cancellations')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'cancellations'
                ? 'bg-white text-black font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Withdrawn ({currentUser.cancellations ? currentUser.cancellations.length : 0})
          </button>
        </div>

        {/* Tab 1: Confirmed Passes */}
        {activeTab === 'passes' && (
          <div className="space-y-3">
            {approvedEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {approvedEvents.map((event) => (
                  <div 
                    key={event.id}
                    className="p-5 rounded-xl bg-[#121215] border border-white/[0.07] space-y-4"
                  >
                    <div>
                      <span className="text-[11px] font-medium text-emerald-400">
                        Confirmed Entry
                      </span>
                      <h4 className="text-base font-semibold text-white mt-1">{event.title}</h4>
                      <p className="text-xs text-neutral-400 mt-1">
                        {event.date} · {event.time}
                      </p>
                      <p className="text-xs text-neutral-400">
                        {event.venue} ({event.collegeName})
                      </p>
                    </div>

                    <button
                      onClick={() => onOpenPass(event)}
                      className="w-full py-2 bg-white hover:bg-neutral-200 text-black font-semibold rounded-lg text-xs transition-all"
                    >
                      Show QR Ticket Pass
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-white/[0.02] border border-white/[0.06] rounded-xl text-neutral-400 text-xs">
                No active passes yet. Browse gatherings in the Discover feed to request an invitation.
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Participations */}
        {activeTab === 'participations' && (
          <div className="space-y-2.5">
            {currentUser.participations && currentUser.participations.map((part) => (
              <div 
                key={part.id}
                className="p-4 rounded-xl bg-[#121215] border border-white/[0.06] flex items-center justify-between gap-4"
              >
                <div>
                  <h4 className="font-medium text-white text-sm">{part.title}</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {part.organizer} · {part.date}
                  </p>
                  <p className="text-xs text-neutral-300 mt-1">
                    {part.role} — {part.outcome}
                  </p>
                </div>
                <span className="text-xs text-neutral-400 px-2.5 py-1 rounded bg-white/[0.04]">
                  {part.badge || 'Attended'}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Winnings */}
        {activeTab === 'winnings' && (
          <div className="space-y-2.5">
            {currentUser.winnings && currentUser.winnings.map((win) => (
              <div 
                key={win.id}
                className="p-4 rounded-xl bg-[#121215] border border-white/[0.06] flex items-center justify-between gap-4"
              >
                <div>
                  <span className="font-semibold text-neutral-300 text-xs">{win.position}</span>
                  <h4 className="font-medium text-white text-sm mt-0.5">{win.eventTitle}</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Hosted by {win.host} ({win.date})
                  </p>
                </div>
                <div className="text-xs text-neutral-200 font-medium px-3 py-1 rounded bg-white/[0.04]">
                  {win.prize}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Cancellations */}
        {activeTab === 'cancellations' && (
          <div className="space-y-2.5">
            {currentUser.cancellations && currentUser.cancellations.length > 0 ? (
              currentUser.cancellations.map((canc) => (
                <div 
                  key={canc.id}
                  className="p-4 rounded-xl bg-[#121215] border border-white/[0.06] flex items-center justify-between gap-4"
                >
                  <div>
                    <h4 className="font-medium text-white text-sm">{canc.eventTitle}</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      {canc.date} · Reason: {canc.reason}
                    </p>
                  </div>
                  <span className="text-xs text-neutral-400">
                    {canc.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-8 text-center bg-white/[0.02] border border-white/[0.06] rounded-xl text-neutral-400 text-xs">
                No cancelled registrations.
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}

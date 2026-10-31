import React from 'react';
import { X } from 'lucide-react';

export default function ClubCalendarsModal({ clubs, onToggleFollow, onClose, onSelectClubFilter }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-[#141418] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-white/[0.08] flex items-center justify-between">
          <div>
            <h2 className="text-sm sm:text-base font-semibold text-white">
              Student Clubs & Societies
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Subscribe to campus societies to receive their event announcements.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/[0.08] transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Club List */}
        <div className="p-5 overflow-y-auto space-y-3">
          {clubs.map((club) => (
            <div 
              key={club.id}
              className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5">
                <img 
                  src={club.avatar} 
                  alt={club.name} 
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-white text-sm">{club.name}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.06] text-neutral-300">
                      {club.college}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1 max-w-sm">
                    {club.description}
                  </p>
                  <span className="text-[11px] text-neutral-500 mt-1 block">
                    {club.followers} student subscribers
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleFollow(club.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    club.isFollowing
                      ? 'bg-white/10 text-white border border-white/15'
                      : 'bg-white text-black font-semibold hover:bg-neutral-200'
                  }`}
                >
                  {club.isFollowing ? 'Following' : 'Follow'}
                </button>

                <button
                  onClick={() => {
                    onSelectClubFilter(club.id);
                    onClose();
                  }}
                  className="px-2.5 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08]"
                >
                  Events
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

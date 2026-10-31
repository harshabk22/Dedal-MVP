import React, { useState } from 'react';
import { X, RotateCw, QrCode } from 'lucide-react';

export default function TicketPassModal({ event, currentUser, onClose }) {
  const [isFlipped, setIsFlipped] = useState(false);

  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-sm perspective-1000">
        
        {/* Dismiss Button */}
        <button
          onClick={onClose}
          className="absolute -top-11 right-0 p-2 text-neutral-400 hover:text-white bg-white/10 rounded-full transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* 3D Flip Card Container */}
        <div 
          className={`w-full transition-transform duration-700 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* ==================== FRONT OF PASS ==================== */}
          <div className="backface-hidden w-full bg-[#141418] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
            
            {/* Event Photo Header */}
            <div className="relative h-32 overflow-hidden bg-neutral-900">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141418] to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Confirmed Entry Pass
                </span>
                <h3 className="text-base font-bold text-white mt-1 leading-snug">
                  {event.title}
                </h3>
              </div>
            </div>

            {/* Perforated Divider */}
            <div className="relative flex items-center justify-between px-2 -my-2 z-10">
              <div className="w-4 h-4 rounded-full bg-[#09090b] -ml-4 border-r border-white/10" />
              <div className="flex-1 border-b border-dashed border-white/20 mx-2" />
              <div className="w-4 h-4 rounded-full bg-[#09090b] -mr-4 border-l border-white/10" />
            </div>

            {/* Ticket Body */}
            <div className="p-5 space-y-4">
              
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-neutral-400 text-[11px] block">Date & Time</span>
                  <span className="text-white font-medium block mt-0.5">{event.date}</span>
                  <span className="text-neutral-400 text-[11px] block">{event.time}</span>
                </div>
                <div>
                  <span className="text-neutral-400 text-[11px] block">Location</span>
                  <span className="text-white font-medium block mt-0.5 truncate">{event.venue}</span>
                  <span className="text-neutral-400 text-[11px] block">{event.collegeName}</span>
                </div>
              </div>

              {/* QR Code Container */}
              <div className="p-4 bg-white rounded-xl flex flex-col items-center justify-center">
                <QrCode className="w-28 h-28 text-black" />
                <span className="text-[10px] font-mono text-neutral-700 mt-1 font-semibold">
                  {event.entryCode || 'PASS-ENTRY-2026'}
                </span>
              </div>

              {/* Attendee Info */}
              <div className="text-center space-y-0.5 pt-1">
                <span className="text-xs font-semibold text-white block">
                  {currentUser.name}
                </span>
                <span className="text-[11px] text-neutral-400 block font-mono">
                  {currentUser.studentId} · {currentUser.collegeName}
                </span>
              </div>

              {/* Flip action */}
              <div className="pt-2 border-t border-white/[0.08] text-center">
                <button
                  type="button"
                  onClick={() => setIsFlipped(true)}
                  className="text-xs text-neutral-300 hover:text-white flex items-center justify-center gap-1 mx-auto transition-colors"
                >
                  <RotateCw className="w-3 h-3 text-neutral-400" />
                  <span>Gate entrance rules</span>
                </button>
              </div>

            </div>
          </div>

          {/* ==================== BACK OF PASS ==================== */}
          <div className="rotate-y-180 backface-hidden absolute inset-0 w-full h-full bg-[#141418] border border-white/10 rounded-2xl shadow-2xl p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-semibold text-white">
                  Gate Entrance Guidelines
                </span>
                <button
                  type="button"
                  onClick={() => setIsFlipped(false)}
                  className="text-xs text-neutral-300 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <RotateCw className="w-3 h-3 text-neutral-400" />
                  <span>Back to Pass</span>
                </button>
              </div>

              <div className="space-y-3 text-xs text-neutral-300">
                <div>
                  <span className="text-white font-medium block">Check-in Instructions</span>
                  <p className="text-neutral-400 text-[11px] mt-0.5">
                    Present this QR ticket along with your physical university student ID at the entrance desk.
                  </p>
                </div>

                <div>
                  <span className="text-white font-medium block">Scope Access</span>
                  <p className="text-neutral-400 text-[11px] mt-0.5">
                    {event.scope === 'intra_college' 
                      ? `Intra-college access only for ${event.collegeName} students.` 
                      : 'Inter-college entry approved for external university delegates.'}
                  </p>
                </div>

                <div>
                  <span className="text-white font-medium block">What is Included</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {event.perks && event.perks.map((p, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-white/[0.06] text-neutral-300">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-center text-[10px] text-neutral-500">
              Campus Events Pass Verification
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

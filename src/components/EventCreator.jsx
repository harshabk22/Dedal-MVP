import React, { useState } from 'react';

const PHOTO_PRESETS = [
  { id: 'p1', label: 'Hackathon Collaboration', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80' },
  { id: 'p2', label: 'Robotics & Hardware', url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80' },
  { id: 'p3', label: 'Acoustic & Music Lawn', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80' },
  { id: 'p4', label: 'Auditorium Keynote', url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=80' },
];

export default function EventCreator({ colleges, clubs, onPublishEvent, onCancel }) {
  const [title, setTitle] = useState('');
  const [scope, setScope] = useState('inter_college');
  const [collegeId, setCollegeId] = useState('mit');
  const [clubId, setClubId] = useState('cs_guild');
  const [category, setCategory] = useState('hackathon');
  const [selectedImage, setSelectedImage] = useState(PHOTO_PRESETS[0].url);
  const [date, setDate] = useState('Saturday, Dec 5');
  const [time, setTime] = useState('10:00 AM – 5:00 PM');
  const [venue, setVenue] = useState('Campus Center Hall');
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState(120);
  const [errorMsg, setErrorMsg] = useState('');

  const selectedCollege = colleges.find(c => c.id === collegeId) || colleges[1];
  const selectedClub = clubs.find(c => c.id === clubId) || clubs[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Please enter an event title.');
      return;
    }
    if (!venue.trim()) {
      setErrorMsg('Please enter a location / venue.');
      return;
    }

    const newEvent = {
      id: `evt-${Date.now()}`,
      title: title.trim(),
      scope,
      allowedDomain: scope === 'intra_college' ? selectedCollege.domain || 'mit.edu' : '*',
      collegeId,
      collegeName: selectedCollege.name,
      clubId,
      clubName: selectedClub.name,
      category,
      image: selectedImage,
      date,
      time,
      venue: venue.trim(),
      description: description.trim() || 'Join fellow students for an engaging session on campus.',
      capacity: Number(capacity) || 100,
      registeredCount: 0,
      ticketTier: 'Student Pass',
      price: 'Free',
      perks: ['Certificate of participation', 'Refreshments provided'],
      entryCode: `PASS-${Math.floor(1000 + Math.random() * 9000)}`,
      guideline: scope === 'intra_college' ? `Valid student ID from ${selectedCollege.name} required.` : 'Open to students from all universities.'
    };

    onPublishEvent(newEvent);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Create an Event
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Publish a campus-only gathering or open an inter-college competition.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2.5 bg-white hover:bg-neutral-200 text-black font-semibold rounded-xl text-xs transition-all shadow-sm"
          >
            Publish Event
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-200 text-xs">
          {errorMsg}
        </div>
      )}

      {/* Form & WYSIWYG split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Scope Selector */}
          <div className="p-5 bg-[#121215] rounded-xl border border-white/[0.08] space-y-2.5">
            <label className="text-xs font-semibold text-white block">
              Who can join this event?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setScope('inter_college')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  scope === 'inter_college'
                    ? 'bg-white/10 border-white text-white font-semibold'
                    : 'bg-black/30 border-white/[0.06] text-neutral-400 hover:text-white'
                }`}
              >
                <span className="text-xs block text-white font-medium">Open to All Colleges</span>
                <span className="text-[11px] text-neutral-400 block mt-0.5">Students across all universities can request invites.</span>
              </button>

              <button
                type="button"
                onClick={() => setScope('intra_college')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  scope === 'intra_college'
                    ? 'bg-white/10 border-white text-white font-semibold'
                    : 'bg-black/30 border-white/[0.06] text-neutral-400 hover:text-white'
                }`}
              >
                <span className="text-xs block text-white font-medium">Campus Only</span>
                <span className="text-[11px] text-neutral-400 block mt-0.5">Strictly locked to your college email domain.</span>
              </button>
            </div>
          </div>

          {/* Event Details */}
          <div className="p-5 bg-[#121215] rounded-xl border border-white/[0.08] space-y-4">
            <div>
              <label className="text-xs font-semibold text-white block mb-1">
                Event Title *
              </label>
              <input
                type="text"
                placeholder="e.g. Winter Hackathon 2026"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-black/40 border border-white/[0.08] rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-white block mb-1">
                  Host College
                </label>
                <select
                  value={collegeId}
                  onChange={(e) => setCollegeId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-black/40 border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-white/30"
                >
                  {colleges.map((c) => (
                    <option key={c.id} value={c.id} className="bg-neutral-900 text-white">
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-white block mb-1">
                  Club / Society
                </label>
                <select
                  value={clubId}
                  onChange={(e) => setClubId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-black/40 border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-white/30"
                >
                  {clubs.map((cl) => (
                    <option key={cl.id} value={cl.id} className="bg-neutral-900 text-white">
                      {cl.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-white block mb-1">
                Short Description
              </label>
              <textarea
                rows={3}
                placeholder="What will students do at this event?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-black/40 border border-white/[0.08] rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold text-white block mb-1">
                  Date
                </label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-black/40 border border-white/[0.08] rounded-lg text-white focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-white block mb-1">
                  Time
                </label>
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-black/40 border border-white/[0.08] rounded-lg text-white focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-white block mb-1">
                  Capacity (Seats)
                </label>
                <input
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-black/40 border border-white/[0.08] rounded-lg text-white focus:outline-none focus:border-white/30"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-white block mb-1">
                Venue Location *
              </label>
              <input
                type="text"
                placeholder="e.g. Student Center, Hall B"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-black/40 border border-white/[0.08] rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
              />
            </div>

            {/* Photo preset picker */}
            <div>
              <label className="text-xs font-semibold text-white block mb-2">
                Cover Photo
              </label>
              <div className="grid grid-cols-4 gap-2">
                {PHOTO_PRESETS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedImage(p.url)}
                    className={`relative aspect-[16/10] rounded-lg overflow-hidden border transition-all ${
                      selectedImage === p.url ? 'border-white ring-2 ring-white/50' : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Live Card Preview */}
        <div className="lg:col-span-5 sticky top-24 space-y-2">
          <span className="text-xs font-semibold text-neutral-400 block">
            Card Preview
          </span>

          <div className="bg-[#121215] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
              <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3">
                <span className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-white border border-white/10">
                  {scope === 'intra_college' ? `For ${selectedCollege.name}` : 'All Colleges'}
                </span>
              </div>
            </div>

            <div className="p-5 space-y-2.5">
              <h3 className="text-base font-semibold text-white leading-snug">
                {title || 'Untitled Campus Event'}
              </h3>
              <p className="text-xs text-neutral-400 line-clamp-2">
                {description || 'Event description will appear here for students.'}
              </p>
              <div className="pt-2 border-t border-white/[0.06] text-xs text-neutral-400 space-y-1">
                <div className="text-neutral-300 font-medium">{date} · {time}</div>
                <div>{venue || 'Campus Venue'} ({selectedCollege.name})</div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <div className="w-full py-2 bg-white/10 rounded-xl text-xs text-neutral-400 text-center font-medium">
                Student Request Button
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

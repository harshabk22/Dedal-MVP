import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DiscoveryFeed from './components/DiscoveryFeed';
import EventCreator from './components/EventCreator';
import TicketPassModal from './components/TicketPassModal';
import ClubCalendarsModal from './components/ClubCalendarsModal';
import StudentProfileView from './components/StudentProfileView';
import AIConciergeModal from './components/AIConciergeModal';
import OrganizerWorkspace from './components/OrganizerWorkspace';
import { 
  INITIAL_EVENTS, 
  INITIAL_COLLEGES, 
  INITIAL_CLUBS, 
  MEMBER_PROFILES, 
  ALL_PERSONAS, 
  INITIAL_JOIN_REQUESTS 
} from './types/data';

export default function App() {
  // Session Persistence across refreshes
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedId = localStorage.getItem('campus_events_user_id');
      const found = ALL_PERSONAS.find(p => p.id === savedId);
      return found || MEMBER_PROFILES[0];
    } catch {
      return MEMBER_PROFILES[0];
    }
  });

  const [activeView, setActiveView] = useState(() => {
    try {
      const savedView = localStorage.getItem('campus_events_active_view');
      return savedView || 'discover';
    } catch {
      return 'discover';
    }
  });

  const [events, setEvents] = useState(() => {
    try {
      const saved = localStorage.getItem('campus_events_list');
      return saved ? JSON.parse(saved) : INITIAL_EVENTS;
    } catch {
      return INITIAL_EVENTS;
    }
  });

  const [colleges] = useState(INITIAL_COLLEGES);
  const [clubs, setClubs] = useState(INITIAL_CLUBS);

  const [requests, setRequests] = useState(() => {
    try {
      const saved = localStorage.getItem('campus_events_requests');
      return saved ? JSON.parse(saved) : INITIAL_JOIN_REQUESTS;
    } catch {
      return INITIAL_JOIN_REQUESTS;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('campus_events_user_id', currentUser.id);
    } catch (e) {
      console.warn(e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('campus_events_active_view', activeView);
    } catch (e) {
      console.warn(e);
    }
  }, [activeView]);

  useEffect(() => {
    try {
      localStorage.setItem('campus_events_list', JSON.stringify(events));
    } catch (e) {
      console.warn(e);
    }
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem('campus_events_requests', JSON.stringify(requests));
    } catch (e) {
      console.warn(e);
    }
  }, [requests]);

  // Modals state
  const [selectedEventForPass, setSelectedEventForPass] = useState(null);
  const [isCalendarsOpen, setIsCalendarsOpen] = useState(false);
  const [isAIConciergeOpen, setIsAIConciergeOpen] = useState(false);
  const [filterClubId, setFilterClubId] = useState(null);

  // Persona Switcher with Automatic Route Adjustment
  const handleSwitchUser = (persona) => {
    setCurrentUser(persona);
    if (persona.role === 'admin') {
      setActiveView('organizer');
    } else {
      setActiveView('discover');
    }
  };

  // Student Profile Updates
  const handleUpdateInterests = (newInterests) => {
    setCurrentUser({
      ...currentUser,
      interests: newInterests
    });
  };

  const handleAddScheduledAlert = (newAlert) => {
    const existing = currentUser.scheduledAlerts || [];
    setCurrentUser({
      ...currentUser,
      scheduledAlerts: [newAlert, ...existing]
    });
  };

  // Event Creation (Admin only)
  const handlePublishEvent = (newEvent) => {
    setEvents([newEvent, ...events]);
    setActiveView('organizer');
  };

  // Request to Join Event (Student only)
  const handleRequestJoin = (event) => {
    const existing = requests.find(r => r.eventId === event.id && r.studentEmail === currentUser.email);
    if (existing) return;

    const newReq = {
      id: `req-${Date.now()}`,
      eventId: event.id,
      eventTitle: event.title,
      scope: event.scope,
      studentName: currentUser.name,
      studentEmail: currentUser.email,
      studentCollege: currentUser.collegeName,
      studentId: currentUser.studentId || "STU-8941",
      requestedAt: "Just now",
      status: "pending"
    };

    setRequests([newReq, ...requests]);
  };

  // Organizer Approvals (Admin only)
  const handleApproveRequest = (reqId) => {
    const targetReq = requests.find(r => r.id === reqId);
    if (!targetReq) return;

    setRequests(requests.map(r => r.id === reqId ? { ...r, status: 'approved' } : r));

    setEvents(events.map(evt => {
      if (evt.id === targetReq.eventId) {
        return {
          ...evt,
          registeredCount: Math.min(evt.capacity, evt.registeredCount + 1)
        };
      }
      return evt;
    }));
  };

  const handleDeclineRequest = (reqId) => {
    setRequests(requests.map(r => r.id === reqId ? { ...r, status: 'declined' } : r));
  };

  const handleToggleFollowClub = (clubId) => {
    setClubs(clubs.map(c => {
      if (c.id === clubId) {
        return {
          ...c,
          isFollowing: !c.isFollowing,
          followers: c.isFollowing ? c.followers - 1 : c.followers + 1
        };
      }
      return c;
    }));
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;

  // Strict role-based guard: prevent role route cross-contamination
  const isStudent = currentUser.role === 'student';
  const effectiveView = isStudent && ['organizer', 'create'].includes(activeView)
    ? 'discover'
    : (!isStudent && activeView === 'student_profile')
    ? 'organizer'
    : activeView;

  return (
    <div className="min-h-screen bg-[#09090b] text-neutral-100 flex flex-col font-sans selection:bg-white selection:text-black">
      
      {/* Top Apple Minimalist Navigation Bar */}
      <Navbar 
        activeView={effectiveView} 
        setActiveView={setActiveView}
        onOpenCalendars={() => setIsCalendarsOpen(true)}
        onOpenAIConcierge={() => setIsAIConciergeOpen(true)}
        pendingRequestsCount={pendingCount}
        currentUser={currentUser}
        allPersonas={ALL_PERSONAS}
        onSwitchUser={handleSwitchUser}
      />

      {/* Main Content Router */}
      <main className="flex-1 pb-16">
        
        {/* VIEW 1: STUDENT DISCOVER FEED */}
        {effectiveView === 'discover' && (
          <DiscoveryFeed 
            events={events}
            colleges={colleges}
            currentUser={currentUser}
            userRequests={requests}
            onRequestJoin={handleRequestJoin}
            onOpenPassModal={(event) => setSelectedEventForPass(event)}
            onOpenOrganizerWorkspace={() => setActiveView('organizer')}
            filterClubId={filterClubId}
            onClearClubFilter={() => setFilterClubId(null)}
          />
        )}

        {/* VIEW 2: STUDENT PROFILE */}
        {effectiveView === 'student_profile' && (
          <StudentProfileView 
            currentUser={currentUser}
            events={events}
            userRequests={requests}
            onOpenPass={(event) => setSelectedEventForPass(event)}
            onOpenAIConcierge={() => setIsAIConciergeOpen(true)}
            onUpdateInterests={handleUpdateInterests}
          />
        )}

        {/* VIEW 3: ORGANIZER WORKSPACE (Unified Roster + Applicants Ledger) */}
        {effectiveView === 'organizer' && !isStudent && (
          <OrganizerWorkspace 
            currentAdmin={currentUser}
            events={events}
            requests={requests}
            onApproveRequest={handleApproveRequest}
            onDeclineRequest={handleDeclineRequest}
            onOpenCreateEvent={() => setActiveView('create')}
          />
        )}

        {/* VIEW 4: EVENT CREATION STUDIO (Organizer only) */}
        {effectiveView === 'create' && !isStudent && (
          <EventCreator 
            colleges={colleges}
            clubs={clubs}
            onPublishEvent={handlePublishEvent}
            onCancel={() => setActiveView('organizer')}
          />
        )}

      </main>

      {/* 3D Apple Wallet Ticket Pass Modal */}
      {selectedEventForPass && (
        <TicketPassModal 
          event={selectedEventForPass}
          currentUser={currentUser}
          onClose={() => setSelectedEventForPass(null)}
        />
      )}

      {/* Campus Concierge Chat & Alert Scheduler */}
      {isAIConciergeOpen && (
        <AIConciergeModal 
          currentUser={currentUser}
          events={events}
          onClose={() => setIsAIConciergeOpen(false)}
          onRequestJoinEvent={handleRequestJoin}
          onAddScheduledAlert={handleAddScheduledAlert}
        />
      )}

      {/* Campus Clubs Directory Modal */}
      {isCalendarsOpen && (
        <ClubCalendarsModal 
          clubs={clubs}
          onToggleFollow={handleToggleFollowClub}
          onClose={() => setIsCalendarsOpen(false)}
          onSelectClubFilter={(clubId) => {
            setFilterClubId(clubId);
            setActiveView('discover');
          }}
        />
      )}

      {/* Clean Minimal Footer */}
      <footer className="w-full border-t border-white/[0.06] bg-[#070709] py-6 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <div>
            Campus Events Platform
          </div>
          <div>
            Signed in as {currentUser.name} ({currentUser.email}) · {isStudent ? 'Student Account' : 'Organizer Account'}
          </div>
        </div>
      </footer>

    </div>
  );
}

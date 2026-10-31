export const MEMBER_PROFILES = [
  {
    id: "user-mit",
    role: "student",
    name: "Alex Rivera",
    email: "alex.rivera@mit.edu",
    collegeId: "mit",
    collegeName: "MIT",
    domain: "mit.edu",
    studentId: "MIT-8941",
    department: "Computer Science",
    year: "Class of 2027",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    verified: true,
    interests: ["Artificial Intelligence", "Hackathons", "Robotics", "Web Engineering"],
    participations: [
      {
        id: "part-01",
        title: "Collegiate Codefest 2025",
        organizer: "Computer Science Guild",
        date: "October 14, 2025",
        role: "Participant",
        outcome: "Built collaborative student note tool"
      },
      {
        id: "part-02",
        title: "Autumn Research Symposium",
        organizer: "Undergraduate Research Guild",
        date: "August 22, 2025",
        role: "Student Speaker",
        outcome: "Presented student project on local models"
      }
    ],
    winnings: [
      {
        id: "win-01",
        eventTitle: "Annual Inter-College Hackathon 2025",
        position: "1st Place Champions",
        prize: "$5,000 Team Grant",
        host: "Stanford & MIT Joint Chapter",
        date: "November 2025"
      },
      {
        id: "win-02",
        eventTitle: "Department Algorithm Challenge",
        position: "Runner Up",
        prize: "Hardware Kit",
        host: "MIT EECS",
        date: "May 2025"
      }
    ],
    cancellations: [
      {
        id: "canc-01",
        eventTitle: "Weekend Chess Tournament",
        date: "September 10, 2025",
        reason: "Midterm exam preparation",
        status: "Withdrawn early"
      }
    ],
    scheduledAlerts: [
      {
        id: "alt-01",
        query: "Student Hackathons with Project Mentors",
        frequency: "Email alert",
        status: "Active"
      }
    ]
  },
  {
    id: "user-stanford",
    role: "student",
    name: "Priya Sharma",
    email: "priya.s@stanford.edu",
    collegeId: "stanford",
    collegeName: "Stanford",
    domain: "stanford.edu",
    studentId: "STAN-4412",
    department: "Electrical Engineering",
    year: "Class of 2028",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
    verified: true,
    interests: ["Robotics", "Hardware Prototyping", "Sustainable Tech"],
    participations: [
      {
        id: "part-03",
        title: "Bay Area Student Robotics Exhibition",
        organizer: "Robotics Society",
        date: "September 2025",
        role: "Hardware Lead",
        outcome: "Showcased autonomous rover"
      }
    ],
    winnings: [
      {
        id: "win-03",
        eventTitle: "Student Engineering Showcase",
        position: "Best Hardware Design",
        prize: "Lab Access Fellowship",
        host: "Stanford School of Engineering",
        date: "June 2025"
      }
    ],
    cancellations: [],
    scheduledAlerts: [
      {
        id: "alt-03",
        query: "Robotics Competitions",
        frequency: "Push notification",
        status: "Active"
      }
    ]
  }
];

export const ADMIN_PROFILES = [
  {
    id: "admin-vance",
    role: "admin",
    name: "Alan Vance",
    email: "a.vance@mit.edu",
    title: "Faculty Advisor & Event Coordinator",
    collegeId: "mit",
    collegeName: "MIT",
    department: "Student Affairs & Campus Programs",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80",
    verified: true
  },
  {
    id: "admin-chen",
    role: "admin",
    name: "Sarah Chen",
    email: "sarah.c@mit.edu",
    title: "Student Club President",
    collegeId: "mit",
    collegeName: "MIT",
    department: "Computer Science Guild",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
    verified: true
  }
];

export const ALL_PERSONAS = [
  ...MEMBER_PROFILES,
  ...ADMIN_PROFILES
];

export const INITIAL_COLLEGES = [
  { id: "all", name: "All Colleges", short: "All" },
  { id: "mit", name: "MIT", short: "MIT", domain: "mit.edu" },
  { id: "stanford", name: "Stanford", short: "Stanford", domain: "stanford.edu" },
  { id: "iitb", name: "IIT Bombay", short: "IIT Bombay", domain: "iitb.ac.in" },
  { id: "bits", name: "BITS Pilani", short: "BITS", domain: "bits-pilani.ac.in" },
  { id: "pes", name: "PES University", short: "PES", domain: "pes.edu" },
  { id: "rvce", name: "RVCE", short: "RVCE", domain: "rvce.edu.in" },
];

export const CATEGORIES = [
  { id: "all", label: "All Events" },
  { id: "hackathon", label: "Hackathons" },
  { id: "workshops", label: "Workshops & Talks" },
  { id: "cultural", label: "Music & Arts" },
  { id: "startup", label: "Startups & Pitch" },
  { id: "sports", label: "Competitions" }
];

export const INITIAL_CLUBS = [
  {
    id: "cs_guild",
    name: "Computer Science Society",
    college: "MIT",
    avatar: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=150&auto=format&fit=crop&q=80",
    followers: 1240,
    isFollowing: false,
    description: "Organizing weekend code sprints, student project showcases, and mentorship sessions."
  },
  {
    id: "robotics_club",
    name: "Campus Robotics Guild",
    college: "Stanford",
    avatar: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=150&auto=format&fit=crop&q=80",
    followers: 980,
    isFollowing: true,
    description: "Hands-on robotics hardware building, autonomous rovers, and friendly collegiate battles."
  },
  {
    id: "venture_lab",
    name: "Student Startup Network",
    college: "IIT Bombay",
    avatar: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=150&auto=format&fit=crop&q=80",
    followers: 2150,
    isFollowing: false,
    description: "Helping students turn dorm room ideas into tested products and connect with alumni founders."
  },
  {
    id: "music_society",
    name: "Campus Music Collective",
    college: "BITS Pilani",
    avatar: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&auto=format&fit=crop&q=80",
    followers: 860,
    isFollowing: false,
    description: "Acoustic open mic nights, student bands, and informal sunset music sessions on the lawn."
  }
];

export const INITIAL_JOIN_REQUESTS = [
  {
    id: "req-101",
    eventId: "evt-01",
    eventTitle: "Annual Inter-College Hackathon",
    scope: "inter_college",
    studentName: "Priya Sharma",
    studentEmail: "priya.s@stanford.edu",
    studentCollege: "Stanford",
    studentId: "STAN-4412",
    requestedAt: "15 mins ago",
    status: "pending"
  },
  {
    id: "req-102",
    eventId: "evt-01",
    eventTitle: "Annual Inter-College Hackathon",
    scope: "inter_college",
    studentName: "Vikram Patel",
    studentEmail: "vikram.p@iitb.ac.in",
    studentCollege: "IIT Bombay",
    studentId: "IITB-1082",
    requestedAt: "30 mins ago",
    status: "pending"
  },
  {
    id: "req-103",
    eventId: "evt-03",
    eventTitle: "Campus Lawn Acoustic Night",
    scope: "intra_college",
    studentName: "Kavya Rao",
    studentEmail: "kavya.r@bits-pilani.ac.in",
    studentCollege: "BITS Pilani",
    studentId: "BITS-9931",
    requestedAt: "1 hour ago",
    status: "pending"
  }
];

export const INITIAL_EVENTS = [
  {
    id: "evt-01",
    title: "Annual Inter-College Hackathon",
    scope: "inter_college",
    requiresApproval: true,
    allowedDomain: "*",
    collegeId: "mit",
    collegeName: "MIT",
    clubId: "cs_guild",
    clubName: "Computer Science Society",
    category: "hackathon",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1000&auto=format&fit=crop&q=80",
    date: "Saturday, Nov 7",
    time: "9:00 AM – 8:00 PM",
    venue: "Student Center, 4th Floor Hall",
    description: "A 24-hour collaborative sprint for students across all universities. Build projects with fellow students, get feedback from engineering mentors, and share what you created.",
    capacity: 150,
    registeredCount: 112,
    ticketTier: "Student Participant",
    price: "Free",
    perks: ["Meals & snacks provided", "Hardware sandbox access", "Participation certificate"],
    entryCode: "HACK-2026-MIT",
    guideline: "Open to students from any university. Please bring your student ID on event day."
  },
  {
    id: "evt-02",
    title: "Collegiate Robotics Championship",
    scope: "inter_college",
    requiresApproval: true,
    allowedDomain: "*",
    collegeId: "stanford",
    collegeName: "Stanford",
    clubId: "robotics_club",
    clubName: "Campus Robotics Guild",
    category: "sports",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1000&auto=format&fit=crop&q=80",
    date: "Thursday, Nov 12",
    time: "2:00 PM – 7:30 PM",
    venue: "Engineering Quad Pavilion",
    description: "Student robotics teams from colleges nationwide bring their custom-built robots to compete in precision obstacle courses and friendly matches.",
    capacity: 120,
    registeredCount: 94,
    ticketTier: "Team & Spectator Pass",
    price: "Free",
    perks: ["Pit area access", "Meet the builder teams", "Front row seating"],
    entryCode: "ROBO-STAN-44",
    guideline: "Teams must check in at 1:00 PM for frequency and safety checks."
  },
  {
    id: "evt-03",
    title: "Campus Lawn Acoustic Night",
    scope: "intra_college",
    requiresApproval: true,
    allowedDomain: "bits-pilani.ac.in",
    collegeId: "bits",
    collegeName: "BITS Pilani",
    clubId: "music_society",
    clubName: "Campus Music Collective",
    category: "cultural",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1000&auto=format&fit=crop&q=80",
    date: "Wednesday, Nov 4",
    time: "7:00 PM – 10:00 PM",
    venue: "Pine Lawn Open Amphitheatre",
    description: "An informal evening of acoustic music, poetry, and warm chai under the campus lights. Strictly for enrolled BITS Pilani students.",
    capacity: 200,
    registeredCount: 184,
    ticketTier: "Campus Entry Pass",
    price: "Free",
    perks: ["Complimentary tea & snacks", "Open mic slots available", "Outdoor seating"],
    entryCode: "ACOUSTIC-BITS-19",
    guideline: "Campus ID required at gate. Limited seating on the lawn."
  },
  {
    id: "evt-04",
    title: "Student Founder Demo Day",
    scope: "inter_college",
    requiresApproval: true,
    allowedDomain: "*",
    collegeId: "iitb",
    collegeName: "IIT Bombay",
    clubId: "venture_lab",
    clubName: "Student Startup Network",
    category: "startup",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1000&auto=format&fit=crop&q=80",
    date: "Wednesday, Nov 18",
    time: "10:00 AM – 4:30 PM",
    venue: "Main Auditorium Hall",
    description: "20 student-led projects pitch their ideas to alumni advisors, faculty, and fellow student builders. Open to students from all universities.",
    capacity: 180,
    registeredCount: 132,
    ticketTier: "Attendee & Pitch Pass",
    price: "Free",
    perks: ["Networking lunch", "Alumni mentor directory", "Pitch feedback notes"],
    entryCode: "PITCH-IITB-88",
    guideline: "Open to students across all campuses. RSVP required."
  },
  {
    id: "evt-05",
    title: "Internal Speed CodeSprint",
    scope: "intra_college",
    requiresApproval: true,
    allowedDomain: "mit.edu",
    collegeId: "mit",
    collegeName: "MIT",
    clubId: "cs_guild",
    clubName: "Computer Science Society",
    category: "hackathon",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80",
    date: "Friday, Nov 6",
    time: "4:00 PM – 7:00 PM",
    venue: "Computer Lab 3, Building 32",
    description: "A fast-paced evening challenge for MIT students to solve interesting algorithmic puzzles and debug fun codebases.",
    capacity: 80,
    registeredCount: 68,
    ticketTier: "MIT Student Pass",
    price: "Free",
    perks: ["Pizza dinner", "Department recognition badge"],
    entryCode: "SPRINT-MIT-05",
    guideline: "Restricted to students with an active @mit.edu email address."
  },
  {
    id: "evt-06",
    title: "Discussion: What to Build in 2027",
    scope: "inter_college",
    requiresApproval: true,
    allowedDomain: "*",
    collegeId: "rvce",
    collegeName: "RVCE",
    clubId: "cs_guild",
    clubName: "Computer Science Society",
    category: "workshops",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1000&auto=format&fit=crop&q=80",
    date: "Sunday, Nov 15",
    time: "11:00 AM – 1:30 PM",
    venue: "Sir MV Seminar Hall",
    description: "An open town hall discussion with visiting researchers on emerging software, robotics, and ideas worth building during college.",
    capacity: 120,
    registeredCount: 75,
    ticketTier: "General Seat",
    price: "Free",
    perks: ["Q&A discussion session", "Curated reading guide"],
    entryCode: "TALK-RVCE-12",
    guideline: "Free entry for all college students. Seating is first-come, first-served."
  }
];

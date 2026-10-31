# Campus Events · Dedal MVP

A collegiate event management platform built for students, campus clubs, and university event committees.

Designed with Apple-inspired human-first principles: authentic photography, restrained dark surfaces, zero AI fluff, and clear role boundaries.

---

## The 4 Unified Pillars

1. **Discovery**
   - Intra-campus feed locked to your institution or open inter-college radar.
   - Real-time search across topics, societies, and universities.

2. **Creation**
   - Organizer publishing studio with domain locking (`Campus Only` vs. `Open to All`).
   - Real-time card preview, capacity throttling, and cover photo selector.

3. **Access & Guidance**
   - Flippable 3D Apple Wallet ticket pass.
   - Verified gate QR code, institutional ID check rules, and Wi-Fi credentials.

4. **Coordination**
   - Unified Organizer Workspace with capacity bars and an **Applicant Vetting Ledger**.
   - 1-click approvals and declines; auto-decrements seat inventory in real-time.

5. **Campus Concierge**
   - Context-aware personal assistant recommending events based on student interests.
   - Dual-fallback architecture: Google AI Studio (`gemini-2.5-flash`) $\rightarrow$ OpenRouter $\rightarrow$ Local Context Engine.

---

## Personas & Role Switching

Click the profile avatar in the top right to instantly switch between active personas:

- **Students:** Alex Rivera (MIT), Priya Sharma (Stanford)
  - Access to Discover feed, event applications, personal tickets ledger, and AI Concierge.
- **Organizers:** Alan Vance (Faculty Lead, MIT), Sarah Chen (Club President, Stanford)
  - Access to the Organizer Workspace, Event Publishing Studio, and Applicant Vetting Ledger.

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## Deploy to Vercel

This repository is optimized for Vercel deployment:

1. Push to your GitHub repository (`main` branch).
2. Go to [Vercel](https://vercel.com) and import the repository.
3. Vercel automatically detects the **Vite** framework:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. Click **Deploy**. The included `vercel.json` ensures SPA routes and deep links work out of the box.

# API integration

The frontend calls `${NEXT_PUBLIC_API_ORIGIN}/api` through `src/lib/intelligence-api.ts`. `NEXT_PUBLIC_CREATOR_CHANNEL_ID` is sent as both `channel_id` and `creator_id`. Components use TanStack Query hooks and do not call `fetch` directly.

For local development, copy `.env.example` to `.env.local`, set the hosted backend origin (or `http://127.0.0.1:8000`), and restart Next.js. The backend must allow the exact browser origin through CORS. Do not use `no-cors` or expose backend secrets in this app.

Integrated routes include health, dashboard, creator profile/build, trends, feedback, content generation/history/regeneration, feedback analytics/weights, sponsorships/drafts, Gmail sync/scan, and notification test.

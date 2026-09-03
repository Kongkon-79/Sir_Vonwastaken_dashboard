# Backend API requirements

These are genuine gaps in the supplied API contract, not frontend mock endpoints.

## Safe integration status

`GET /api/integrations/status` → `{ "youtube": {"status":"configured|unknown"}, "reddit": {...}, "google_trends": {...}, "gmail": {...}, "openai": {...}, "notifications": {...} }`.

Reason: the frontend must not inspect backend secrets or infer configuration from empty results. A dedicated safe status endpoint is needed by Settings.

## Historical score snapshots

`GET /api/trends/history?channel_id={id}&days={7|30|90|365}` → `{ "points": [{"date":"ISO date","average_score":0}] }`.

Reason: Analytics cannot honestly render a historical trend-score chart without snapshots.

The current contract does not provide thumbnail, author, publication time, or engagement fields; the UI intentionally omits them.

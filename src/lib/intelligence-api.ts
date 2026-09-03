export type Platform = "youtube" | "reddit" | "google_trends" | string;
export type FeedbackAction = "accept" | "reject" | "ignore";

export interface Trend {
  content_id: string;
  channel_id?: string;
  platform?: Platform;
  title: string;
  url?: string;
  analysis?: { category?: string; format?: string; topics?: string[]; summary?: string };
  score?: number;
  breakdown?: Record<string, number>;
  ranked_at?: string;
}

export interface DashboardData {
  creator_profile: Record<string, unknown> | null;
  top_trends: Trend[];
  pending_email_drafts: number;
  sponsorship_emails: number;
  mongodb_connected?: boolean;
}

export interface GeneratedPackage {
  _id?: string;
  trend_id?: string;
  trend_title?: string;
  titles?: string[];
  hooks?: string[];
  outline?: { section?: string; description?: string }[];
  script_draft?: string;
  thumbnail_ideas?: unknown[];
  generated_at?: string;
}

export type EmailRecord = Record<string, unknown> & {
  external_id?: string;
  id?: string;
  subject?: string;
  sender?: string;
  from?: string;
  snippet?: string;
  body?: string;
  received_at?: string;
  created_at?: string;
  status?: string;
};

export class ApiError extends Error {
  status: number;
  details?: unknown;
  constructor(message: string, status = 0, details?: unknown) {
    super(message); this.name = "ApiError"; this.status = status; this.details = details;
  }
}

export function apiOrigin() {
  return (process.env.NEXT_PUBLIC_API_ORIGIN || process.env.VITE_API_ORIGIN || "").replace(/\/$/, "");
}
export function creatorChannelId() { return process.env.NEXT_PUBLIC_CREATOR_CHANNEL_ID || process.env.VITE_CREATOR_CHANNEL_ID || ""; }
export function apiConfigured() { return Boolean(apiOrigin() && creatorChannelId()); }

async function request<T>(path: string, init?: RequestInit, timeout = 15000): Promise<T> {
  const origin = apiOrigin();
  if (!origin) throw new ApiError("API origin is not configured.");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const endpoint = typeof window === "undefined" ? `${origin}/api${path}` : `/api/backend${path}`;
    const response = await fetch(endpoint, { ...init, signal: controller.signal, credentials: process.env.NEXT_PUBLIC_API_WITH_CREDENTIALS === "true" ? "include" : "same-origin", headers: { "Content-Type": "application/json", ...(init?.headers || {}) } });
    const body = await response.json().catch(() => null);
    if (!response.ok) throw new ApiError(body?.detail || body?.message || `API request failed (${response.status})`, response.status, body);
    return body as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof DOMException && error.name === "AbortError") throw new ApiError("The request timed out.");
    throw new ApiError(error instanceof Error ? error.message : "Unable to reach the backend.");
  } finally { clearTimeout(timer); }
}

export const intelligenceApi = {
  health: () => request<{ status: string; mongodb_connected?: boolean }>("/health"),
  dashboard: (id = creatorChannelId()) => request<DashboardData>(`/dashboard/${encodeURIComponent(id)}`),
  profile: (id = creatorChannelId()) => request<Record<string, unknown>>(`/creator-profile/${encodeURIComponent(id)}`),
  buildProfile: (maxVideos: number, id = creatorChannelId()) => request<Record<string, unknown>>(`/creator-profile/${encodeURIComponent(id)}/build?max_videos=${maxVideos}`, { method: "POST" }, 120000),
  trends: (id = creatorChannelId()) => request<Trend[]>(`/trends?channel_id=${encodeURIComponent(id)}&limit=200`),
  feedback: (contentId: string, action: FeedbackAction, notes = "", id = creatorChannelId()) => request(`/feedback/trends/${encodeURIComponent(contentId)}?creator_id=${encodeURIComponent(id)}`, { method: "POST", body: JSON.stringify({ action, notes }) }),
  generate: (contentId: string, id = creatorChannelId()) => request<GeneratedPackage>(`/content/generate/${encodeURIComponent(contentId)}?channel_id=${encodeURIComponent(id)}`, { method: "POST" }, 120000),
  history: (id = creatorChannelId()) => request<GeneratedPackage[]>(`/content/history/${encodeURIComponent(id)}?limit=100`),
  regenerate: (contentId: string, field: string, id = creatorChannelId()) => request<GeneratedPackage>(`/content/regenerate/${encodeURIComponent(contentId)}`, { method: "POST", body: JSON.stringify({ field, channel_id: id }) }, 120000),
  feedbackHistory: (id = creatorChannelId()) => request<unknown[]>(`/feedback/history/${encodeURIComponent(id)}?limit=200`),
  feedbackSummary: (days: number, id = creatorChannelId()) => request<Record<string, unknown>>(`/feedback/summary/${encodeURIComponent(id)}?days=${days}`),
  weights: (id = creatorChannelId()) => request<Record<string, unknown>>(`/feedback/weights/${encodeURIComponent(id)}`),
  updateWeights: (id = creatorChannelId()) => request(`/feedback/update-weights/${encodeURIComponent(id)}?alpha=0.1`, { method: "POST" }),
  sponsorships: () => request<EmailRecord[]>("/emails/sponsorships?limit=200"),
  drafts: () => request<EmailRecord[]>("/emails/drafts"),
  syncGmail: () => request("/collect/gmail/sync?max_results=20", { method: "POST" }, 120000),
  scanSponsorships: () => request("/emails/scan-sponsorships?limit=100", { method: "POST" }, 120000),
  summarizeEmail: (id: string) => request<Record<string, unknown>>(`/emails/${encodeURIComponent(id)}/summarize`, { method: "POST" }),
  draftReply: (id: string, creatorNotes = "") => request<Record<string, unknown>>(`/emails/${encodeURIComponent(id)}/draft-reply`, { method: "POST", body: JSON.stringify({ creator_notes: creatorNotes }) }),
  approveDraft: (id: string) => request(`/emails/drafts/${encodeURIComponent(id)}/approve`, { method: "POST" }),
  rejectDraft: (id: string, reason = "") => request(`/emails/drafts/${encodeURIComponent(id)}/reject`, { method: "POST", body: JSON.stringify({ reason }) }),
  notifyTest: (payload: unknown) => request("/notify/test", { method: "POST", body: JSON.stringify(payload) }),
};

export function formatPercent(value: unknown) { const n = Number(value); return Number.isFinite(n) ? `${(n <= 1 ? n * 100 : n).toFixed(1)}%` : "—"; }
export function formatDate(value?: string) { return value ? new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(value)) : "—"; }

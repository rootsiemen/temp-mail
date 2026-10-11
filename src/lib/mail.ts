export interface TempEmail {
  id: string;
  from: string;
  to: string;
  subject: string;
  date: string;
  text?: string;
  html?: string;
  preview?: string;
}

export const DOMAIN = "abahi.tech";

const ADJECTIVES = [
  "swift", "bright", "calm", "clever", "cozy", "daring", "eager", "fancy",
  "gentle", "happy", "jolly", "kind", "lively", "lucky", "merry", "nimble",
  "peaceful", "quick", "quiet", "sunny", "tidy", "witty", "zesty", "bold",
];

const NOUNS = [
  "fox", "panda", "tiger", "eagle", "shark", "wolf", "bear", "hawk",
  "otter", "raven", "falcon", "bison", "cobra", "dove", "elk", "finch",
  "gecko", "heron", "ibis", "jaguar", "koala", "lemur", "moose", "newt",
];

export function randomPrefix(): string {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const num = Math.floor(Math.random() * 900 + 100);
  return `${adj}.${noun}${num}`;
}

export function sanitizePrefix(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "")
    .replace(/^[._-]+/, "")
    .slice(0, 40);
}

export function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const seconds = Math.max(0, Math.floor((Date.now() - then) / 1000));
  if (seconds < 10) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

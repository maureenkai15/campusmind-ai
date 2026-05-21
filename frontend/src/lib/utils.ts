import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely (install: npm i clsx tailwind-merge) */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format distance in metres into a readable string */
export function formatDistance(metres: number): string {
  return metres >= 1000
    ? `${(metres / 1000).toFixed(1)} km`
    : `${Math.round(metres)} m`;
}

/** Format minutes into "X min" or "X h Y min" */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${Math.round(minutes)} min`;
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return m > 0 ? `${h} h ${m} min` : `${h} h`;
}

/** Generate a random uuid-like id for chat messages */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Category → emoji for building markers */
export const CATEGORY_EMOJI: Record<string, string> = {
  academic: "🏛️",
  admin: "🏢",
  canteen: "🍽️",
  sports: "🏋️",
  library: "📚",
  residence: "🏠",
  transport: "🚌",
  hub: "🔀",
};

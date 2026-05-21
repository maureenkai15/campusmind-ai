// ── Buildings ─────────────────────────────────────────────────────────────

export type BuildingCategory =
  | "academic"
  | "admin"
  | "canteen"
  | "sports"
  | "library"
  | "residence"
  | "transport"
  | "hub";

export interface Building {
  id: number;
  code: string;
  name: string;
  short_name?: string;
  description?: string;
  category: BuildingCategory;
  latitude: number;
  longitude: number;
  metadata_json?: Record<string, unknown>;
}

// ── Navigation ────────────────────────────────────────────────────────────

export type TravelMode = "walking" | "cycling" | "shuttle";

export interface NavigationStep {
  instruction: string;
  distance_m: number;
  landmark?: string;
}

export interface NavigationResponse {
  origin: Building;
  destination: Building;
  total_distance_m: number;
  estimated_minutes: number;
  steps: NavigationStep[];
  polyline: [number, number][];
}

// ── Chat / Assistant ──────────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// ── Auth ──────────────────────────────────────────────────────────────────

export interface User {
  id: number;
  email: string;
  full_name: string;
  matric_number?: string;
  is_active: boolean;
  is_staff: boolean;
}

export interface TokenPair {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

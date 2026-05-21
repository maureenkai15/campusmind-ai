/**
 * CampusMind AI – Typed API client for the FastAPI backend.
 */

import type {
  Building,
  ChatMessage,
  NavigationResponse,
  TokenPair,
  TravelMode,
  User,
} from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

// ── Helper ─────────────────────────────────────────────────────────────────

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(error.detail ?? "API error");
  }

  return res.json() as Promise<T>;
}

// ── Auth ───────────────────────────────────────────────────────────────────

export const authApi = {
  register: (data: {
    email: string;
    full_name: string;
    password: string;
    matric_number?: string;
  }): Promise<User> =>
    request("/users/register", { method: "POST", body: JSON.stringify(data) }),

  login: (email: string, password: string): Promise<TokenPair> =>
    request("/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
};

// ── Buildings ──────────────────────────────────────────────────────────────

export const buildingsApi = {
  list: (): Promise<Building[]> => request("/buildings/"),

  get: (id: number): Promise<Building> => request(`/buildings/${id}`),

  search: (q: string): Promise<Building[]> =>
    request(`/buildings/search?q=${encodeURIComponent(q)}`),

  nearby: (lat: number, lng: number, radiusM = 500): Promise<{ building: Building; distance_m: number }[]> =>
    request(`/buildings/nearby?lat=${lat}&lng=${lng}&radius_m=${radiusM}`),
};

// ── Navigation ─────────────────────────────────────────────────────────────

export const navigationApi = {
  getRoute: (
    originId: number,
    destinationId: number,
    mode: TravelMode = "walking",
    accessibility = false
  ): Promise<NavigationResponse> =>
    request("/navigation/route", {
      method: "POST",
      body: JSON.stringify({
        origin_building_id: originId,
        destination_building_id: destinationId,
        mode,
        accessibility,
      }),
    }),
};

// ── AI Assistant (streaming) ───────────────────────────────────────────────

export const assistantApi = {
  /**
   * Stream an AI response, calling `onToken` for each token received.
   * Returns a cleanup function.
   */
  streamChat: async (
    message: string,
    history: Pick<ChatMessage, "role" | "content">[] = [],
    onToken: (token: string) => void,
    onDone: () => void,
    onError: (err: Error) => void
  ): Promise<void> => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;

    try {
      const res = await fetch(`${BASE_URL}/assistant/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          message,
          history: history.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") {
              onDone();
              return;
            }
            onToken(data);
          }
        }
      }
      onDone();
    } catch (err) {
      onError(err instanceof Error ? err : new Error(String(err)));
    }
  },

  health: (): Promise<{ ollama_available: boolean; model: string }> =>
    request("/assistant/health"),
};

"use client";

import { authClient } from "./auth-client";
import type { ApiEnvelope } from "./types";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ??
  (process.env.NODE_ENV === "development" ? "http://localhost:5000" : "")
).replace(/\/$/, "");

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details?: unknown;

  constructor(status: number, message: string, code = "REQUEST_ERROR", details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

let tokenCache: { token: string; expiresAt: number } | null = null;
let tokenRequest: Promise<string | null> | null = null;

function tokenExpiry(token: string): number {
  try {
    const payloadPart = token.split(".")[1];
    if (!payloadPart) return 0;
    const normalized = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      "=",
    );
    const payload = JSON.parse(atob(padded)) as { exp?: number };
    return typeof payload.exp === "number" ? payload.exp * 1000 : 0;
  } catch {
    return 0;
  }
}

async function requestToken(): Promise<string | null> {
  try {
    const { data, error } = await authClient.token();
    if (error || !data?.token) return null;
    tokenCache = {
      token: data.token,
      expiresAt: tokenExpiry(data.token),
    };
    return data.token;
  } catch {
    return null;
  }
}

export async function getAccessToken(): Promise<string | null> {
  if (tokenCache && tokenCache.expiresAt - 30_000 > Date.now()) {
    return tokenCache.token;
  }

  if (!tokenRequest) {
    tokenRequest = requestToken().finally(() => {
      tokenRequest = null;
    });
  }

  return tokenRequest;
}

export function clearAccessToken() {
  tokenCache = null;
  tokenRequest = null;
}

interface ApiOptions {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
  formData?: FormData;
  auth?: boolean;
  signal?: AbortSignal;
}

function notifyUnauthorized() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("salonbook:unauthorized"));
  }
}

async function execute<T>(
  path: string,
  options: ApiOptions,
  canRetry: boolean,
): Promise<ApiEnvelope<T>> {
  if (!API_URL) {
    throw new ApiError(500, "The API URL is not configured", "API_NOT_CONFIGURED");
  }

  const headers = new Headers({ Accept: "application/json" });
  let body: BodyInit | undefined;

  if (options.formData) {
    body = options.formData;
  } else if (options.body !== undefined) {
    headers.set("Content-Type", "application/json");
    body = JSON.stringify(options.body);
  }

  let usedToken = false;
  if (options.auth !== false) {
    const token = await getAccessToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      usedToken = true;
    }
  }

  const response = await fetch(`${API_URL}${path}`, {
    method: options.method ?? "GET",
    headers,
    body,
    signal: options.signal,
  });

  const payload = (await response.json().catch(() => null)) as
    | (ApiEnvelope<T> & { error?: { message?: string; code?: string; details?: unknown } })
    | null;

  if (!response.ok) {
    if (response.status === 401 && usedToken && canRetry) {
      clearAccessToken();
      return execute<T>(path, options, false);
    }

    const code = payload?.error?.code ?? "REQUEST_ERROR";
    const message = payload?.error?.message ?? "Something went wrong. Please try again.";

    if (response.status === 401 || code === "ACCOUNT_BLOCKED") {
      notifyUnauthorized();
    }

    throw new ApiError(response.status, message, code, payload?.error?.details);
  }

  if (!payload) {
    throw new ApiError(response.status, "The server returned an invalid response");
  }

  return payload;
}

export function apiFetch<T>(path: string, options: ApiOptions = {}) {
  return execute<T>(path, options, true);
}

export function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("image", file);
  return apiFetch<{ url: string; thumbnailUrl: string | null; deleteUrl: string | null }>(
    "/api/uploads",
    { method: "POST", formData },
  );
}

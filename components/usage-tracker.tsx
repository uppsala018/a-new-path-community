"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type TrackedPage = {
  path: string;
  startedAt: number;
};

const STORAGE_KEY = "hh_usage_session";

function getOrCreateSessionId() {
  if (typeof window === "undefined") {
    return "";
  }

  const existing = window.localStorage.getItem(STORAGE_KEY);
  if (existing) {
    return existing;
  }

  const nextId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `usage-${Date.now()}-${Math.random().toString(16).slice(2)}`;

  window.localStorage.setItem(STORAGE_KEY, nextId);
  return nextId;
}

function sendTelemetry(payload: {
  eventType: "page_view" | "page_leave";
  sessionId: string;
  path: string;
  durationMs?: number;
}) {
  if (!payload.sessionId || !payload.path) {
    return;
  }

  const body = JSON.stringify({
    ...payload,
    referrer: document.referrer || "",
    userAgent: navigator.userAgent
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/telemetry", new Blob([body], { type: "application/json" }));
    return;
  }

  void fetch("/api/telemetry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body,
    keepalive: true
  });
}

export function UsageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPageRef = useRef<TrackedPage | null>(null);
  const sessionIdRef = useRef("");

  useEffect(() => {
    const sessionId = getOrCreateSessionId();
    sessionIdRef.current = sessionId;

    const search = searchParams.toString();
    const path = search ? `${pathname}?${search}` : pathname;
    const now = Date.now();
    const previous = currentPageRef.current;

    if (previous && previous.path !== path) {
      sendTelemetry({
        eventType: "page_leave",
        sessionId,
        path: previous.path,
        durationMs: Math.max(0, now - previous.startedAt)
      });
    }

    currentPageRef.current = {
      path,
      startedAt: now
    };

    sendTelemetry({
      eventType: "page_view",
      sessionId,
      path
    });
  }, [pathname, searchParams]);

  useEffect(() => {
    const handlePageHide = () => {
      const currentPage = currentPageRef.current;
      if (!currentPage) {
        return;
      }

      sendTelemetry({
        eventType: "page_leave",
        sessionId: sessionIdRef.current || getOrCreateSessionId(),
        path: currentPage.path,
        durationMs: Math.max(0, Date.now() - currentPage.startedAt)
      });
    };

    window.addEventListener("pagehide", handlePageHide);
    return () => window.removeEventListener("pagehide", handlePageHide);
  }, []);

  return null;
}

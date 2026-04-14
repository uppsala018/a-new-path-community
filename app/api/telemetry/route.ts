import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { recordUsageEvent } from "@/lib/backend/store";

type TelemetryBody = {
  eventType?: "page_view" | "page_leave";
  sessionId?: string;
  path?: string;
  durationMs?: number;
  referrer?: string;
  userAgent?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TelemetryBody;

    if (!body.eventType || !body.sessionId || !body.path) {
      return NextResponse.json({ error: "Missing telemetry payload." }, { status: 400 });
    }

    const supabase = await createSupabaseServerClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    const response = NextResponse.json({ ok: true });
    response.cookies.set("hh_usage_session", body.sessionId, {
      path: "/",
      sameSite: "lax"
    });

    await recordUsageEvent({
      eventType: body.eventType,
      sessionId: body.sessionId,
      userId: user?.id || null,
      userEmail: user?.email || null,
      userHandle:
        String(user?.user_metadata.handle || "").trim() ||
        user?.email?.split("@")[0]?.replace(/[^a-zA-Z0-9_-]/g, "") ||
        null,
      path: body.path,
      durationMs: body.durationMs ?? null,
      referrer: body.referrer || request.headers.get("referer"),
      userAgent: body.userAgent || request.headers.get("user-agent")
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Unable to store telemetry." }, { status: 400 });
  }
}

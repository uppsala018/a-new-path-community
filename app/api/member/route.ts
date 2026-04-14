import { NextResponse } from "next/server";
import { recordApiRequest, requireCurrentSession, saveProgress } from "@/lib/backend/store";
import type { StepProgress } from "@/lib/member-state";

export async function GET(request: Request) {
  try {
    const session = await requireCurrentSession();
    const response = NextResponse.json({
      user: session.user,
      progress: session.progress
    });
    await recordApiRequest({
      request,
      route: "/api/member",
      statusCode: 200,
      user: session.user
    });
    return response;
  } catch {
    const response = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    await recordApiRequest({ request, route: "/api/member", statusCode: 401 });
    return response;
  }
}

export async function PUT(request: Request) {
  try {
    const session = await requireCurrentSession();
    const body = (await request.json()) as {
      progress?: StepProgress;
    };

    if (!body.progress) {
      const response = NextResponse.json(
        { error: "Progress payload is required." },
        { status: 400 }
      );
      await recordApiRequest({
        request,
        route: "/api/member",
        statusCode: 400,
        user: session.user
      });
      return response;
    }

    const progress = await saveProgress(session.user.id, body.progress);
    const response = NextResponse.json({ progress });
    await recordApiRequest({
      request,
      route: "/api/member",
      statusCode: 200,
      user: session.user
    });
    return response;
  } catch (error) {
    const response = NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to save member progress."
      },
      { status: error instanceof Error && error.message === "Unauthorized" ? 401 : 400 }
    );
    await recordApiRequest({
      request,
      route: "/api/member",
      statusCode: error instanceof Error && error.message === "Unauthorized" ? 401 : 400
    });
    return response;
  }
}

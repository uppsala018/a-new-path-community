import { NextResponse } from "next/server";
import { requireCurrentSession, saveProgress } from "@/lib/backend/store";
import type { StepProgress } from "@/lib/member-state";

export async function GET() {
  try {
    const session = await requireCurrentSession();
    return NextResponse.json({
      user: session.user,
      progress: session.progress
    });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await requireCurrentSession();
    const body = (await request.json()) as {
      progress?: StepProgress;
    };

    if (!body.progress) {
      return NextResponse.json(
        { error: "Progress payload is required." },
        { status: 400 }
      );
    }

    const progress = await saveProgress(session.user.id, body.progress);
    return NextResponse.json({ progress });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to save member progress."
      },
      { status: error instanceof Error && error.message === "Unauthorized" ? 401 : 400 }
    );
  }
}

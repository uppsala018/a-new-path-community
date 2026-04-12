import { NextResponse } from "next/server";
import {
  requireCurrentSession,
  uploadFilesForUser
} from "@/lib/backend/store";

export async function POST(request: Request) {
  try {
    const session = await requireCurrentSession();
    const formData = await request.formData();
    const stepNumber = Number(formData.get("stepNumber"));
    const files = formData.getAll("files").filter((entry): entry is File => entry instanceof File);

    if (!Number.isFinite(stepNumber) || stepNumber < 1) {
      return NextResponse.json({ error: "A valid step number is required." }, { status: 400 });
    }

    if (!files.length) {
      return NextResponse.json({ error: "At least one file is required." }, { status: 400 });
    }

    const progress = await uploadFilesForUser({
      userId: session.user.id,
      stepNumber,
      files
    });
    return NextResponse.json({ progress });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to save upload."
      },
      { status: error instanceof Error && error.message === "Unauthorized" ? 401 : 400 }
    );
  }
}

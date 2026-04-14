import { NextResponse } from "next/server";
import { recordApiRequest } from "@/lib/backend/store";
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
      const response = NextResponse.json({ error: "A valid step number is required." }, { status: 400 });
      await recordApiRequest({
        request,
        route: "/api/member/uploads",
        statusCode: 400,
        user: session.user
      });
      return response;
    }

    if (!files.length) {
      const response = NextResponse.json({ error: "At least one file is required." }, { status: 400 });
      await recordApiRequest({
        request,
        route: "/api/member/uploads",
        statusCode: 400,
        user: session.user
      });
      return response;
    }

    const progress = await uploadFilesForUser({
      userId: session.user.id,
      stepNumber,
      files
    });
    const response = NextResponse.json({ progress });
    await recordApiRequest({
      request,
      route: "/api/member/uploads",
      statusCode: 200,
      user: session.user
    });
    return response;
  } catch (error) {
    const response = NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to save upload."
      },
      { status: error instanceof Error && error.message === "Unauthorized" ? 401 : 400 }
    );
    await recordApiRequest({
      request,
      route: "/api/member/uploads",
      statusCode: error instanceof Error && error.message === "Unauthorized" ? 401 : 400
    });
    return response;
  }
}

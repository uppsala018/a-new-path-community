import { NextResponse } from "next/server";
import { createInterestSubmission } from "@/lib/backend/store";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      path?: string;
      message?: string;
    };

    if (!body.email || !body.path) {
      return NextResponse.json(
        { error: "Email and preferred path are required." },
        { status: 400 }
      );
    }

    const submission = await createInterestSubmission({
      email: body.email,
      path: body.path,
      message: body.message || ""
    });

    return NextResponse.json({ submission });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to save your interest."
      },
      { status: 400 }
    );
  }
}

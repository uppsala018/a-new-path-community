import { NextResponse } from "next/server";
import { createInterestSubmission, recordApiRequest } from "@/lib/backend/store";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      path?: string;
      message?: string;
    };

    if (!body.email || !body.path) {
      const response = NextResponse.json(
        { error: "Email and preferred path are required." },
        { status: 400 }
      );
      await recordApiRequest({ request, route: "/api/interest", statusCode: 400 });
      return response;
    }

    const submission = await createInterestSubmission({
      email: body.email,
      path: body.path,
      message: body.message || ""
    });

    const response = NextResponse.json({ submission });
    await recordApiRequest({ request, route: "/api/interest", statusCode: 200 });
    return response;
  } catch (error) {
    const response = NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to save your interest."
      },
      { status: 400 }
    );
    await recordApiRequest({ request, route: "/api/interest", statusCode: 400 });
    return response;
  }
}

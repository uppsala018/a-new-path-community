import { NextResponse } from "next/server";
import { addForumPost, recordApiRequest, requireCurrentSession } from "@/lib/backend/store";

export async function POST(request: Request) {
  try {
    const session = await requireCurrentSession();
    const body = (await request.json()) as {
      channel?: string;
      message?: string;
      parentPostId?: string;
    };

    if (!body.channel || !body.message?.trim()) {
      const response = NextResponse.json(
        { error: "Channel and message are required." },
        { status: 400 }
      );
      await recordApiRequest({
        request,
        route: "/api/member/forum",
        statusCode: 400,
        user: session.user
      });
      return response;
    }

    const forumPosts = await addForumPost({
      userId: session.user.id,
      authorHandle: session.user.handle,
      channel: body.channel,
      message: body.message,
      parentPostId: body.parentPostId
    });

    const response = NextResponse.json({ forumPosts });
    await recordApiRequest({
      request,
      route: "/api/member/forum",
      statusCode: 200,
      user: session.user
    });
    return response;
  } catch (error) {
    const response = NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to save forum post."
      },
      { status: error instanceof Error && error.message === "Unauthorized" ? 401 : 400 }
    );
    await recordApiRequest({
      request,
      route: "/api/member/forum",
      statusCode: error instanceof Error && error.message === "Unauthorized" ? 401 : 400
    });
    return response;
  }
}

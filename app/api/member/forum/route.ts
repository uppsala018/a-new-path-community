import { NextResponse } from "next/server";
import { addForumPost, requireCurrentSession } from "@/lib/backend/store";

export async function POST(request: Request) {
  try {
    const session = await requireCurrentSession();
    const body = (await request.json()) as {
      channel?: string;
      message?: string;
      parentPostId?: string;
    };

    if (!body.channel || !body.message?.trim()) {
      return NextResponse.json(
        { error: "Channel and message are required." },
        { status: 400 }
      );
    }

    const forumPosts = await addForumPost({
      userId: session.user.id,
      authorHandle: session.user.handle,
      channel: body.channel,
      message: body.message,
      parentPostId: body.parentPostId
    });

    return NextResponse.json({ forumPosts });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to save forum post."
      },
      { status: error instanceof Error && error.message === "Unauthorized" ? 401 : 400 }
    );
  }
}

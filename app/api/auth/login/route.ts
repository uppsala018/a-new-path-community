import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };

    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: body.email.trim(),
      password: body.password
    });

    if (error || !data.user) {
      return NextResponse.json(
        { error: error?.message || "Invalid email or password." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: {
        id: data.user.id,
        email: data.user.email || body.email,
        handle:
          String(data.user.user_metadata.handle || "").trim() ||
          data.user.email?.split("@")[0]?.replace(/[^a-zA-Z0-9_-]/g, "") ||
          "anonymous-member",
        createdAt: data.user.created_at
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to log in."
      },
      { status: 401 }
    );
  }
}

import { NextResponse } from "next/server";
import { upsertProfileForUser } from "@/lib/backend/store";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const body = (await request.json()) as {
      email?: string;
      handle?: string;
      password?: string;
    };

    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const safeHandle =
      body.handle?.trim() ||
      body.email.split("@")[0]?.replace(/[^a-zA-Z0-9_-]/g, "") ||
      "anonymous-member";

    const { data, error } = await supabase.auth.signUp({
      email: body.email.trim(),
      password: body.password,
      options: {
        data: {
          handle: safeHandle
        }
      }
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (!data.user) {
      return NextResponse.json(
        { error: "Supabase did not return a user record." },
        { status: 400 }
      );
    }

    const user = await upsertProfileForUser({
      id: data.user.id,
      email: data.user.email || body.email,
      handle: safeHandle
    });

    return NextResponse.json({
      user,
      needsEmailConfirmation: !data.session
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to create the account."
      },
      { status: 400 }
    );
  }
}

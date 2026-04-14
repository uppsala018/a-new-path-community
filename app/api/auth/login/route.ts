import { NextResponse } from "next/server";
import { isAdminEmail } from "@/lib/admin";
import { recordApiRequest } from "@/lib/backend/store";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };

    if (!body.email || !body.password) {
      const response = NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
      await recordApiRequest({ request, route: "/api/auth/login", statusCode: 400 });
      return response;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: body.email.trim(),
      password: body.password
    });

    if (error || !data.user) {
      const response = NextResponse.json(
        { error: error?.message || "Invalid email or password." },
        { status: 401 }
      );
      await recordApiRequest({ request, route: "/api/auth/login", statusCode: 401 });
      return response;
    }

    const response = NextResponse.json({
      user: {
        id: data.user.id,
        email: data.user.email || body.email,
        isAdmin: isAdminEmail(data.user.email || body.email),
        handle:
          String(data.user.user_metadata.handle || "").trim() ||
          data.user.email?.split("@")[0]?.replace(/[^a-zA-Z0-9_-]/g, "") ||
          "anonymous-member",
        createdAt: data.user.created_at
      }
    });
    await recordApiRequest({
      request,
      route: "/api/auth/login",
      statusCode: 200,
      user: {
        id: data.user.id,
        email: data.user.email || body.email,
        handle:
          String(data.user.user_metadata.handle || "").trim() ||
          data.user.email?.split("@")[0]?.replace(/[^a-zA-Z0-9_-]/g, "") ||
          "anonymous-member",
        createdAt: data.user.created_at,
        isAdmin: isAdminEmail(data.user.email || body.email)
      }
    });
    return response;
  } catch (error) {
    const response = NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to log in."
      },
      { status: 401 }
    );
    await recordApiRequest({ request, route: "/api/auth/login", statusCode: 401 });
    return response;
  }
}

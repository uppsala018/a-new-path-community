import { NextResponse } from "next/server";
import { isAdminEmail } from "@/lib/admin";
import { recordApiRequest, upsertProfileForUser } from "@/lib/backend/store";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSiteUrl } from "@/lib/site-url";

export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const body = (await request.json()) as {
      email?: string;
      handle?: string;
      password?: string;
    };

    if (!body.email || !body.password) {
      const response = NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
      await recordApiRequest({ request, route: "/api/auth/signup", statusCode: 400 });
      return response;
    }

    const safeHandle =
      body.handle?.trim() ||
      body.email.split("@")[0]?.replace(/[^a-zA-Z0-9_-]/g, "") ||
      "anonymous-member";

    const { data, error } = await supabase.auth.signUp({
      email: body.email.trim(),
      password: body.password,
      options: {
        emailRedirectTo: `${getSiteUrl()}/auth/callback?next=/member`,
        data: {
          handle: safeHandle
        }
      }
    });

    if (error) {
      const response = NextResponse.json({ error: error.message }, { status: 400 });
      await recordApiRequest({ request, route: "/api/auth/signup", statusCode: 400 });
      return response;
    }

    if (!data.user) {
      const response = NextResponse.json(
        { error: "Supabase did not return a user record." },
        { status: 400 }
      );
      await recordApiRequest({ request, route: "/api/auth/signup", statusCode: 400 });
      return response;
    }

    const user = await upsertProfileForUser({
      id: data.user.id,
      email: data.user.email || body.email,
      handle: safeHandle
    });

    const response = NextResponse.json({
      user,
      isAdmin: isAdminEmail(user.email),
      needsEmailConfirmation: !data.session
    });
    await recordApiRequest({
      request,
      route: "/api/auth/signup",
      statusCode: 200,
      user
    });
    return response;
  } catch (error) {
    const response = NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to create the account."
      },
      { status: 400 }
    );
    await recordApiRequest({ request, route: "/api/auth/signup", statusCode: 400 });
    return response;
  }
}

import { NextResponse } from "next/server";
import { isAdminEmail } from "@/lib/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function sanitizeNextPath(next: string | null) {
  if (!next || !next.startsWith("/")) {
    return "/member";
  }

  return next;
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const nextPath = sanitizeNextPath(requestUrl.searchParams.get("next"));
  const code = requestUrl.searchParams.get("code");
  const tokenHash = requestUrl.searchParams.get("token_hash");

  if (code || tokenHash) {
    const supabase = await createSupabaseServerClient();
    const authResult = code
      ? await supabase.auth.exchangeCodeForSession(code)
      : await supabase.auth.verifyOtp({
          token_hash: tokenHash || "",
          type: "email"
        });

    if (!authResult.error) {
      const sessionUser = authResult.data.session?.user || authResult.data.user;
      const destination = isAdminEmail(sessionUser?.email) ? "/admin" : nextPath;
      return NextResponse.redirect(new URL(destination, requestUrl.origin));
    }
  }

  return NextResponse.redirect(new URL("/login", requestUrl.origin));
}

import { NextResponse } from "next/server";
import { recordApiRequest } from "@/lib/backend/store";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();

  const response = NextResponse.json({ ok: true });
  await recordApiRequest({ request, route: "/api/auth/logout", statusCode: 200 });
  return response;
}

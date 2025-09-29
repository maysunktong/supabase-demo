"use server";

import { createClientServer } from "@/utils/supabase/server-client";

export default async function UserNameDisplay() {
  const supabase = await createClientServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return <p>Not logged in</p>;

  const { data: profile } = await supabase
    .from("users")
    .select("username")
    .eq("id", user.id)
    .single();

  return (
    <div>
      <h1>Welcome, {profile?.username ?? user.email}!</h1>
    </div>
  );
}

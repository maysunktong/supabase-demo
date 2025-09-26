"use server";

import { redirect } from "next/navigation";
import { createClientServer } from "../utils/supabase/server-client";

export const LogOut = async () => {
  const supabase = await createClientServer();
  supabase.auth.signOut();

  redirect("/");
};

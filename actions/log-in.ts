"use server";

import { redirect } from "next/navigation";
import { createClientServer } from "../utils/supabase/server-client";
import { logInSchema } from "./schemas";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const LogIn = async (userdata: z.infer<typeof logInSchema>) => {

  const parsedData = logInSchema.parse(userdata);

  const supabase = await createClientServer();
  const {
    data,
    error,
  } = await supabase.auth.signInWithPassword(parsedData);

  if (error) throw new Error(error.message);

  revalidatePath("/", "layout");
  redirect("/create");
};

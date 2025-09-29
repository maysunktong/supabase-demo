"use server";

import { redirect } from "next/navigation";
import { createClientServer } from "../utils/supabase/server-client";
import { signUpSchema } from "./schemas";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const SignUp = async (userdata: z.infer<typeof signUpSchema>) => {
  const supabaseServer = await createClientServer();

  const {
    data: { user },
    error,
  } = await supabaseServer.auth.signUp(userdata);
  console.log(error);

  if (user && user.email) {
    const { data, error } = await supabaseServer
      .from("users")
      .insert([
        { id: user.id, email: user.email, username: userdata.username },
      ]);

    await supabaseServer.auth.signOut();
  }

  if (error) throw new Error(error.message);

  revalidatePath("/", "layout");
  redirect("/confirmation");
};

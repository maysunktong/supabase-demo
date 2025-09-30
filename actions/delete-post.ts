'use server'

import { revalidatePath } from "next/cache";
import { createClientServer } from "../utils/supabase/server-client";
import { redirect } from "next/navigation";

export async function deletePost(postId: number) {
  const supabase = await createClientServer();

  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", postId);

  if (error) throw new Error(error.message);

  revalidatePath("/posts");
  redirect("/posts");
}

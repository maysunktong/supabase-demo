"use server";

import z from "zod";
import { createClientServer } from "../utils/supabase/server-client";
import { addPostSchema } from "./schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { slugify } from "../utils/slugify";

const AddPost = async (userdata: z.infer<typeof addPostSchema>) => {
  const parsedData = addPostSchema.parse(userdata);

  const supabase = await createClientServer();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Not authenticated");
  }

  if (user) {
    const { data, error } = await supabase
      .from("posts")
      .insert({
        user_id: user.id,
        title: parsedData.title,
        content: parsedData.content,
        slug: slugify(parsedData.title)
      });

    if (error) throw new Error(error.message)
  }

  revalidatePath("/", "layout");
  redirect("/create");
};

export default AddPost;

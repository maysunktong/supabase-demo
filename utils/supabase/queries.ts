import { createClient } from "./browser-client";
import { QueryData } from "@supabase/supabase-js";

export const getHomePosts = async () => {
  const supabase = createClient();
  const data = await supabase
    .from("posts")
    .select('id, title,users("username")')
    .order("created_at", { ascending: true });
  return data;
};

/* get types from QueryData from @supabase/supabase-js */
export type HomePostType = QueryData<ReturnType<typeof getHomePosts>>;

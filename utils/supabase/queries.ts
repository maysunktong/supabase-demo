import { createClient } from "./browser-client";
import { QueryData } from "@supabase/supabase-js";

export const getHomePosts = async () => {
  const supabase = createClient();
  const data = await supabase
    .from("posts")
    .select('id, title, slug, users("username")')
    .order("created_at", { ascending: true });
  return data;
};

export const getSinglePost = async (slug: string) => {
  const supabase = createClient();
  const data = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug) /* eq = equal */
    .single();
  return data;
};

export const getSearchedPosts = async (searchTerm: string) => {
  const supabase = createClient();
  return await supabase
    .from("posts")
    .select("title, slug, id")
    /* .textSearch("title", searchTerm) *//* match title with searchTerm */
    .ilike("title", `${searchTerm}%`); 

    /* can do hybrid search - Google styled */
};

/* get types from QueryData from @supabase/supabase-js */
export type HomePostType = QueryData<ReturnType<typeof getHomePosts>>;

export type SinglePostType = QueryData<ReturnType<typeof getSinglePost>>;

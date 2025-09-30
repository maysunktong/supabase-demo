import { createClient } from "./browser-client";
import { QueryData} from "@supabase/supabase-js";

export const getHomePosts = async (
  supabase: ReturnType<typeof createClient>
) => {
  return await supabase
    .from("posts")
    .select("id, title, slug, created_at,  users(username, email)")
    .order("created_at", { ascending: false });
};

export const getSinglePost = async (slug: string) => {
  const supabase = createClient();
  return await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single()
};

export const getSearchedPosts = async (
  searchTerm: string,
  signal: AbortSignal
) => {
  const supabase = createClient();

  return await supabase
    .from("posts")
    .select("title, slug")
    .ilike("title", `${searchTerm}%`)
    .abortSignal(signal);
};

export async function getAccountPosts(supabase: ReturnType<typeof createClient> ) {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { data: [], error: null };
  }

  const { data, error } = await supabase
    .from("posts")
    .select("id, title, slug, created_at, users(username, email)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return { data, error };
}

export type AccountPostsType = QueryData<ReturnType<typeof getAccountPosts>>;
export type HomePostsType = QueryData<ReturnType<typeof getHomePosts>>;
export type SinglePostsType = QueryData<ReturnType<typeof getSinglePost>>;

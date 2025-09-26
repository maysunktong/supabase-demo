import HomePosts from "../../components/Home/HomePosts";
import Search from "../../components/Search";
import { createClient } from "../../utils/supabase/browser-client";
import { getHomePosts } from "../../utils/supabase/queries";

export default async function Home() {
  const supabase = createClient();
  const { data, error } = await getHomePosts(supabase);
  if (error) {
    console.error("Error fetching posts:", error.message);
    return (
      <p className="text-red-500">
        Failed to load posts. Please try again later.
      </p>
    );
  }

  if (!data || data.length === 0) {
    return <p>No posts found.</p>;
  }

  console.log("server", data);

  return (
    <>
      <Search />
      <HomePosts posts={data!} />
    </>
  );
}

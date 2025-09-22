import HomePosts from "../components/Home/HomePosts";
import { getHomePosts } from "../utils/supabase/queries";

export default async function Home() {
  const { data, error } = await getHomePosts();

   if (error) {
    console.error("Error fetching posts:", error.message);
    return <p className="text-red-500">Failed to load posts. Please try again later.</p>;
  }

  if (!data || data.length === 0) {
    return <p>No posts found.</p>;
  }

  console.log('server', data)
  
  return (
    <>
      <HomePosts posts={data!} />
    </>
  );
}

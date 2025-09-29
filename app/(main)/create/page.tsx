import HomePosts from "../../../components/Home/HomePosts";
import UserNameDisplay from "../../../components/UserNameDisplay";
import { createClient } from "../../../utils/supabase/browser-client";
import { getHomePosts } from "../../../utils/supabase/queries";
import AddPostForm from "./AddPostForm";

const CreatePost = async () => {
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

  return (
    <>
      <UserNameDisplay />
      <AddPostForm />
      <HomePosts posts={data!} />
    </>
  );
};
export default CreatePost;

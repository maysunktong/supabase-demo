import { getHomePosts } from "../utils/supabase/queries";

export default async function Home() {
  const { data, error } = await getHomePosts();
  return (
    <>
      {data &&
        data.map(({ id, title, users }) => (
          <div key={id}>
            {title} by {users?.username}
          </div>
        ))}
    </>
  );
}

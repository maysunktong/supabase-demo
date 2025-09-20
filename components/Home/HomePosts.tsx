import Link from "next/link";
import { HomePostType } from "../../utils/supabase/queries";

export default function HomePosts({ posts }: { posts: HomePostType }) {
  return (
    <>
      {posts &&
        posts.map(({ id, title, users, slug }) => (
          <Link key={id} href={`/${slug}`} className="border border-yellow-500 block">
            {title} by {users?.username}
          </Link>
        ))}
    </>
  );
}

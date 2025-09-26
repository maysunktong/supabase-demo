"use client";

import Link from "next/link";
import { getHomePosts, HomePostType } from "../../utils/supabase/queries";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "../../utils/supabase/browser-client";

export default function HomePosts({ posts }: { posts: HomePostType }) {
  const supabase = createClient();
  const { data, error } = useQuery({
    queryKey: ["home-posts"],
    queryFn: async () => {
      const { data, error } = await getHomePosts(supabase);
      if (error) throw new Error(error.message);
      return data;
    },
    initialData: posts,
    refetchOnMount: false,
    refetchInterval: 3000,
    /* staleTime: 10 * 1000 */
  });

  console.log("Client fetching", data);

  return (
    <>
      {data &&
        data.map(({ id, title, users, slug }) => (
          <Link
            key={id}
            href={`/${slug}`}
            className="border border-yellow-500 block"
          >
            {title} by {users?.username}
          </Link>
        ))}
      {error && <p>Error...</p>}
    </>
  );
}

"use client";

import Link from "next/link";
import { getHomePosts, HomePostsType } from "../../utils/supabase/queries";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "../../utils/supabase/browser-client";

export default function HomePosts({ posts }: { posts: HomePostsType }) {
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
    <div className="flex flex-col space-y-2">
      {data &&
        data.map(({ id, title, users, slug }) => (
          <Link
            key={id}
            href={`/${slug}`}
            className="block rounded-md border border-yellow-500 p-3 hover:bg-yellow-100"
          >
            <div className="font-semibold">{title}</div>
            <div className="text-sm text-gray-600">by {users?.username}</div>
          </Link>
        ))}
      {error && <p className="text-red-500">Error...</p>}
    </div>
  );
}

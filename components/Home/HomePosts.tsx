"use client";

import Link from "next/link";
import { getHomePosts, HomePostType } from "../../utils/supabase/queries";
import { useQuery } from "@tanstack/react-query";

export default function HomePosts({ posts }: { posts: HomePostType }) {
  const { data } = useQuery({
    queryKey: ["home-posts"],
    queryFn: async () => {
      const { data, error } = await getHomePosts();
      if (error) throw error;
      return data;
    },
    initialData: posts,
    refetchOnMount: false,
    staleTime: 10000 /* waiting time to refresh data fetching */
  });

  console.log("Client", data);

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
    </>
  );
}

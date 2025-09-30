"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "../utils/supabase/browser-client";
import Link from "next/link";
import { DeleteButton } from "./DeleteButton";

export default function AccountPosts() {
  const supabase = createClient();

  const { data, isLoading } = useQuery({
    queryKey: ["account-posts"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return [];

      const { data, error } = await supabase
        .from("posts")
        .select("id, title, slug, created_at, users(username)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    refetchOnMount: false,
    refetchInterval: 3000,
  });

  if (isLoading) return <p>Loading...</p>;
  if (!data || data.length === 0) return <p>No posts yet</p>;

  return (
    <div>
      {data &&
        data.map(({ id, title, users, slug }) => (
          <div key={id}>
            <Link
              href={`/${slug}`}
              className="block rounded-md border border-yellow-500 p-3 hover:bg-yellow-100"
            >
              <div className="font-semibold">{title}</div>
              <div className="text-sm text-gray-600">by {users?.username}</div>
            </Link>
            <DeleteButton postId={id} />
          </div>
        ))}
    </div>
  );
}

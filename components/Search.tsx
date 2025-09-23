"use client";
import { SetStateAction, useState } from "react";
import { getHomePosts, getSearchedPosts } from "../utils/supabase/queries";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function Search() {
  const [userInput, setUserInput] = useState<string>("");

  const { data } = useQuery({
    queryKey: ["search-results", userInput],
    queryFn: async () => {
      const { data, error } = await getSearchedPosts(userInput);
      if (error) throw new Error(error.message);
      return data;
    },
    enabled: userInput && userInput.length > 0 ? true : false,
  });

  console.log(data);

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setUserInput(e.target.value);
  };

  return (
    <div>
      <p>SearchInput</p>
      <input
        name="search"
        placeholder="search by post title"
        aria-label="search"
        className="border border-pink-400"
        value={userInput}
        onChange={handleChange}
      />
      {data && (
        <div onClick={() => setUserInput("")}>
          {data.map(({ title, slug, id }) => (
            <Link key={id} href={`/${slug}`}>
              {title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { redirect } from "next/navigation";

const CreatePostButton = () => {
  const handleOnClick = () => {
    redirect("/createpost");
  };
  return (
    <button onClick={handleOnClick}>
      Create Post
    </button>
  );
};

export default CreatePostButton;

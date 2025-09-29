"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "@/components/ErrorMessage";
import { addPostSchema } from "@/actions/schemas";
import AddPost from "@/actions/add-post";

const AddPostForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof addPostSchema>>({
    resolver: zodResolver(addPostSchema),
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: AddPost,
  });

  return (
    <>
      <form
        onSubmit={handleSubmit((values) => mutate(values))}
        className="p-4 flex flex-col w-[700px] mx-auto"
      >
        <fieldset>
          <label htmlFor="title">Post Title</label>
          <input
            id="title"
            placeholder="Enter your title"
            {...register("title")}
          />
          {errors.title?.message && (
            <ErrorMessage message={errors.title.message} />
          )}
        </fieldset>
        <fieldset>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            placeholder="Write your post..."
            {...register("content")}
          />
          {errors.content?.message && (
            <ErrorMessage message={errors.content.message} />
          )}
        </fieldset>
        <button type="submit">{isPending ? "Posting..." : "Add Post"}</button>
      </form>
      {error && error.message !== "NEXT_REDIRECT" && (
        <ErrorMessage message={error.message} />
      )}
    </>
  );
};

export default AddPostForm;

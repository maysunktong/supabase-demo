"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addPostSchema } from "@/actions/schemas";
import AddPost from "@/actions/add-post";
import ErrorMessage from "../../../components/ErrorMessage";

const AddPostForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof addPostSchema>>({
    resolver: zodResolver(addPostSchema),
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: AddPost,
    onSuccess: () => {
      toast.success("Post added successfully!");
      reset();
    },
    onError: (err: any) => {
      if (
        err.message ===
        'duplicate key value violates unique constraint "posts_slug_key"'
      ) {
        return toast.error("Title is duplicated!");
      }
      toast.error(err.message || "Failed to add post");
    },
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
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
};

export default AddPostForm;

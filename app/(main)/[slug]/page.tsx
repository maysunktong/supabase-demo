import {
  getSinglePost,
  SinglePostsType,
} from "../../../utils/supabase/queries";

export default async function SinglePost({
  params,
}: {
  params: SinglePostsType;
}) {
  const { slug } = params;
  const { data, error } = await getSinglePost(slug);

  if (!data) return <p>Post not found</p>;

  return (
    <>
     
      <p>{data?.content}</p>
    </>
  );
}

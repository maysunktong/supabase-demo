import { getSinglePost, SinglePostType } from "../../utils/supabase/queries";

export default async function SinglePost({
  params,
}: {
  params: SinglePostType;
}) {
  const { slug } = params;
  const { data, error } = await getSinglePost(slug);

  return (
    <>
      <p>{data?.content}</p>
    </>
  );
}

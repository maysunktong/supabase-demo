import { getSinglePost, SinglePostType } from "../../utils/supabase/queries";

export default async function SinglePost({
  params,
}: {
  params: SinglePostType;
}) {
  const { slug } = params;
  const { data, error } = await getSinglePost(slug);
  console.log("data", data);

  return (
    <>
      <p>{data?.content}</p>
    </>
  );
}

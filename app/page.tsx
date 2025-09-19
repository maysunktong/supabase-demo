import { createClient } from "../utils/supabase/browser-client";

export default async function Home() {
  const supabase = createClient();
  const { data, error } = await supabase.from("posts").select("*");
  console.log("data", data, error?.message);
  return (
    <>
      {data && data.map(item => (
        <div>{item.title}</div>
      ))}
    </>
  );
}

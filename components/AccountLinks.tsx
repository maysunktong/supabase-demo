import Link from "next/link";
import { createClientServer } from "../utils/supabase/server-client";
import LogOutButton from "./LogOut";
import CreatePostButton from "./CreatePost";

const AccountLinks = async () => {
  const supabase = await createClientServer();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  return (
    <div>
      {user ? (
        <>
          <LogOutButton />
          <CreatePostButton />
        </>
      ) : (
        <Link href="/auth/login">Log in</Link>
      )}
    </div>
  );
};
export default AccountLinks;

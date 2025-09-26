import Link from "next/link";
import LogInForm from "./LogInForm";

const LogInPage = () => {
  return (
    <>
      <p>Log in</p>
      <LogInForm />
      <div>
        Dont have an account? Sign up here
        <Link href="/auth/signup">Sign up</Link>
      </div>
    </>
  );
};

export default LogInPage;

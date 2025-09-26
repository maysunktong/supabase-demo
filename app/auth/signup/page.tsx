import Link from "next/link";
import SignUpForm from "./SignUpForm";

const SignUpPage = () => {
  return (
    <>
      <p>Sign Up</p>
      <SignUpForm />
      <div>
        Already have an account? Log in here.
        <Link href="/auth/login">Log in</Link>
      </div>
    </>
  );
};

export default SignUpPage;

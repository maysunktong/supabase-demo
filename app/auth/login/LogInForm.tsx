import { LogIn } from "../../../actions/log-in";

const LogInForm = () => {
  return (
    <>
      <form action={LogIn} className="flex flex-col">
        <h2>Log in</h2>
        <fieldset>
          {/* Email */}
          <label htmlFor="email">Enter your email</label>
          <input
            id="main"
            name="email"
            placeholder="Enter your email"
          />
          {/* Password */}
          <label htmlFor="password">Enter your password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
          />
        </fieldset>
        <button type="button">Log in</button>
      </form>
    </>
  );
};
export default LogInForm;

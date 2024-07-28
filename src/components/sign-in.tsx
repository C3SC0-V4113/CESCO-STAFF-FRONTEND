import { signIn } from "@/auth";

export const SignIn = () => {
  return (
    <form
      action={async (formData) => {
        "use server";
        await signIn("credentials", formData);
      }}
    >
      <label>
        Email: <input name="email" type="email" />
      </label>
      <br />
      <label>
        Password: <input name="password" type="password" />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  );
};

"use client";

import { signIn } from "next-auth/react";
import { authenticate } from "@/lib/actions";
import { useFormState } from "react-dom";

export const SignIn = () => {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  return (
    <form
      action={dispatch}

      // onSubmit={(event) => {
      //   event.preventDefault();
      //   signIn("credentials", { redirectTo: "/dashboard" });
      // }}
    >
      <label>Email:</label>
      <input name="email" type="email" />
      <br />
      <label>Password:</label>
      <input name="password" type="password" />
      <br />
      <button type="submit">Login</button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

import { NextPage } from "next";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface Props {}

const Page: NextPage<Props> = async ({}) => {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }
  return (
    <div>
      <h1>Login Page</h1>
      <form method="post" action="/api/auth/callback/credentials">
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
    </div>
  );
};

export default Page;

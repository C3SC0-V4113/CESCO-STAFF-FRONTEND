import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = async ({}) => {
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

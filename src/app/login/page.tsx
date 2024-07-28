import { signIn } from "@/auth";
import { SignIn } from "@/components/sign-in";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = async ({}) => {
  return (
    <div>
      <h1>Login Page</h1>
      <SignIn />
    </div>
  );
};

export default Page;

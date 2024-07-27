import { NextPage } from "next";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface Props {}

const Page: NextPage<Props> = async ({}) => {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return <div>Welcome to Dashboard</div>;
};

export default Page;

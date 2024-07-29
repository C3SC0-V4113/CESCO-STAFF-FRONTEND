import { auth } from "@/auth";
import { NextPage } from "next";

interface Props {}

const Page: NextPage<Props> = async ({}) => {
  const session = await auth();

  if (!session) return null;

  return <div>Welcome to Dashboard {session.user.name}</div>;
};

export default Page;

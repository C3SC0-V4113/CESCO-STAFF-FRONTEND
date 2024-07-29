import API from "@/app/api/api.services";
import { auth } from "@/auth";
import { NextPage } from "next";

interface Props {}

const Clients: NextPage<Props> = async ({}) => {
  const session = await auth();

  const clients = await API.client.getClients();

  if (!session) return null;
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl text-center font-bold col-span-full mb-8">
        Client
      </h1>
    </div>
  );
};

export default Clients;

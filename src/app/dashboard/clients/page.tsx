import API from "@/app/api/api.services";
import { auth } from "@/auth";
import { NextPage } from "next";
import { Client, columns } from "./columns";
import { DataTable } from "./data-table";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {}

async function getData(): Promise<Client[]> {
  // Fetch data from your API here.
  const clients = await API.client.getClients();
  return clients!.clients;
}

const Clients: NextPage<Props> = async ({}) => {
  const session = await auth();
  const data = await getData();

  if (!session) return null;
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl text-center font-bold col-span-full mb-8">
        Clientes
      </h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Clients;

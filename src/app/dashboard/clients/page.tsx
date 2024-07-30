import API from "@/app/api/api.services";
import { auth } from "@/auth";
import { NextPage } from "next";
import { Client, columns } from "./columns";
import { DataTable } from "./data-table";
import { Header } from "@/components/ui/header";
import { columnsAdmin } from "./columnsAdmin";

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
    <div className="flex flex-col gap-4 w-full">
      <Header title="Clientes" desc="Manejo de Clientes" />
      <DataTable
        columns={session.user.role === "admin" ? columnsAdmin : columns}
        data={data}
        role={session.user.role}
      />
    </div>
  );
};

export default Clients;

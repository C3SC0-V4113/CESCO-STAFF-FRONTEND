import API from "@/app/api/api.services";
import { auth } from "@/auth";
import { NextPage } from "next";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Header } from "@/components/ui/header";
import { User } from "@/interfaces/users";

interface Props {}

async function getData(): Promise<User[]> {
  // Fetch data from your API here.
  const users = await API.auth.getUsers();
  return users!.users;
}

const Users: NextPage<Props> = async ({}) => {
  const session = await auth();
  const data = await getData();

  if (!session) return null;
  return (
    <div className="flex flex-col gap-4 w-full">
      <Header title="Usuarios" desc="Manejo de Usuarios" />
      <DataTable columns={columns} data={data} role={session.user.role} />
    </div>
  );
};

export default Users;

import API from "@/app/api/api.services";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { DeleteDialogUser } from "@/components/ui/delete-dialog-user";
import { Header } from "@/components/ui/header";
import { NextPage } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {
  params: { id: string };
}
const breadcrumbItems = [{ label: "Usuarios", href: "/dashboard/users" }];

const DetailUser: NextPage<Props> = async ({ params }) => {
  const session = await auth();

  if (!session) return null;

  const id = params.id;

  const user = await API.auth.getUserById(id);

  if (!user) {
    redirect("/dashboard/users");
  }

  const { name, email, role } = user;
  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <Header
          title="Detalle de Usuario"
          breadcrumbs={{
            items: breadcrumbItems,
            page: "Detalle del Usuario",
          }}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 bg-primary text-primary-foreground p-8 border gap-8 rounded-md">
          <div className="flex flex-col gap-2">
            <p>Nombre:</p>
            <p>{name}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p>Correo Electronico:</p>
            <p>{email}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p>Rol de Usuario:</p>
            <p>{role}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-2 md:flex-row md:justify-end">
        <Link className="w-full md:w-auto" href={`${id}/edit`}>
          <Button className="w-full">Editar Cliente</Button>
        </Link>
        <DeleteDialogUser
          cta={"Eliminar Usuario"}
          title={"¿Estás seguro que deseas eliminar al usuario?"}
          desc={"Está acción no se puede reponer"}
          userId={id}
        />
      </div>
    </>
  );
};

export default DetailUser;

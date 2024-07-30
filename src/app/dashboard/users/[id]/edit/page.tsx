import API from "@/app/api/api.services";
import { UpdateUserForm } from "@/app/dashboard/components/users/UpdateUserForm";
import { Header } from "@/components/ui/header";
import { NextPage } from "next";

interface Props {
  params: { id: string };
}

const EditUser: NextPage<Props> = async ({ params }) => {
  const id = params.id;
  const user = await API.auth.getUserById(id);

  const breadcrumbItems = [
    { label: "Usuarios", href: "/dashboard/users" },
    { label: `Detalle de Usuario`, href: `/dashboard/users/${id}` },
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      <Header
        title="Actualizar Usuario"
        desc="Formulario de Actualización de usuario"
        breadcrumbs={{
          items: breadcrumbItems,
          page: "Actualización del Usuario",
        }}
      />
      <UpdateUserForm user={user!} />
    </div>
  );
};

export default EditUser;

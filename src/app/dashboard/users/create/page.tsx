import { Header } from "@/components/ui/header";
import { NextPage } from "next";
import { CreateUserForm } from "../../components/users/CreateUserForm";

interface Props {}

const breadcrumbItems = [{ label: "Usuarios", href: "/dashboard/users" }];

const CreateUser: NextPage<Props> = ({}) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Header
        title="Creación de Usuario"
        desc="En este formulario se realiza la creación de Clientes"
        breadcrumbs={{ items: breadcrumbItems, page: "Creación de Usuario" }}
      />
      <CreateUserForm />
    </div>
  );
};

export default CreateUser;

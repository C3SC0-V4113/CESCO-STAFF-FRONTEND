import { NextPage } from "next";
import { ClientForm } from "../../components/clients/ClientForm";
import { Header } from "@/components/ui/header";

interface Props {}

const breadcrumbItems = [{ label: "Clientes", href: "/dashboard/clients" }];

const CreateClient: NextPage<Props> = ({}) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Header
        title={"Creación de Cliente"}
        desc="En este formulario se realiza la creación de Clientes"
        breadcrumbs={{ items: breadcrumbItems, page: "Creación de Cliente" }}
      />
      <ClientForm />
    </div>
  );
};

export default CreateClient;

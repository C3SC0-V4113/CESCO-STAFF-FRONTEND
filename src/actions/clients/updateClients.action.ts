"use server";

import API from "@/app/api/api.services";
import { redirect } from "next/navigation";

interface Props {
  id: string;
  values: {
    name: string;
    lastname: string;
    address: string;
    phone: string;
  };
}

const updateClientAction = async ({ values, id }: Props) => {
  const { name, lastname, address, phone } = values;
  const response = await API.client.updateClient(
    id,
    name,
    lastname,
    address,
    phone
  );

  if (!response) {
    return {
      error: "Unable to update client",
    };
  }
  redirect(`/dashboard/clients/${id}`);
};

export default updateClientAction;

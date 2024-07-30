"use server";

import API from "@/app/api/api.services";
import { redirect } from "next/navigation";

interface Props {
  values: {
    name: string;
    lastname: string;
    address: string;
    phone: string;
  };
}

const createClientAction = async ({ values }: Props) => {
  const { name, lastname, address, phone } = values;
  const response = await API.client.createClients(
    name,
    lastname,
    address,
    phone
  );

  if (!response) {
    return {
      error: "Unable to create client",
    };
  }
  redirect("/dashboard/clients");
};

export default createClientAction;

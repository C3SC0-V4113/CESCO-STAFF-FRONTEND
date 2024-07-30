"use server";

import API from "@/app/api/api.services";
import { redirect } from "next/navigation";

const deleteUserAction = async (id: string) => {
  const ok = await API.client.deleteClient(id!);

  if (!ok) {
    return {
      error: "Delete not found",
    };
  }
  redirect("/dashboard/clients");
};

export default deleteUserAction;

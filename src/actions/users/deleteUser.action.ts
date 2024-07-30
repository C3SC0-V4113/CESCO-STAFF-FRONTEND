"use server";

import API from "@/app/api/api.services";
import { redirect } from "next/navigation";

const deleteUserAction = async (id: string) => {
  const ok = await API.auth.deleteUser(id!);

  if (!ok) {
    return {
      error: "Delete not found",
    };
  }
  redirect("/dashboard/users");
};

export default deleteUserAction;

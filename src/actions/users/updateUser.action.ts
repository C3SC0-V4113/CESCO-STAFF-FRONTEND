"use server";

import API from "@/app/api/api.services";
import { redirect } from "next/navigation";

interface Props {
  id: string;
  values: {
    name: string;
    email: string;
    role: string;
    password: string;
    confirmPassword: string;
  };
}

const updateUserAction = async ({ values, id }: Props) => {
  const { name, email, role, password } = values;
  const response = await API.auth.updateUser(id, name, email, role, password);

  if (!response) {
    return {
      error: "Unable to update User",
    };
  }
  redirect(`/dashboard/users/${id}`);
};

export default updateUserAction;

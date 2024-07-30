"use server";

import API from "@/app/api/api.services";
import { redirect } from "next/navigation";

interface Props {
  values: {
    name: string;
    email: string;
    role: string;
    password: string;
  };
}

const createUserAction = async ({ values }: Props) => {
  const { name, email, role, password } = values;

  const response = await API.auth.createUser(name, email, role, password);

  if (!response) {
    return {
      error: "Unable to create user",
    };
  }
  redirect("/dashboard/users");
};

export default createUserAction;

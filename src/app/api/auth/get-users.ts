import { auth } from "@/auth";
import { User } from "@/interfaces/users";
import axiosInstance from "../axios.config";

interface ResponseUsers {
  ok: boolean;
  users: User[];
  total: number;
  page: number;
  limit: number;
}

const getUsers = async () => {
  const session = await auth();

  return await axiosInstance
    .get<ResponseUsers>("/auth", {
      headers: {
        "x-token": session?.user.token,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return null;
    });
};

export default getUsers;

import { auth } from "@/auth";
import axiosInstance from "../axios.config";

interface ResponseUsers {
  ok: boolean;
  users: {
    label: string;
    value: string;
  }[];
}

const getListUsers = async () => {
  const session = await auth();
  /** GET to endpoint */
  return await axiosInstance
    .post<ResponseUsers>(
      "/auth/combo-users",
      {},
      {
        headers: {
          "x-token": session?.user.token,
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      return response.data.users;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
};

export default getListUsers;

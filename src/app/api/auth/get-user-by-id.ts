import { auth } from "@/auth";
import axiosInstance from "../axios.config";
import { User } from "@/interfaces/users";

interface ResponseUser {
  ok: boolean;
  user: User;
}

const getUserById = async (userId: string) => {
  const session = await auth();
  /** GET to endpoint */

  return await axiosInstance
    .get<ResponseUser>(`/auth/${userId}`, {
      headers: {
        "x-token": session?.user.token,
      },
    })
    .then((response) => {
      return response.data.user;
    })
    .catch((error) => {
      return null;
    });
};

export default getUserById;

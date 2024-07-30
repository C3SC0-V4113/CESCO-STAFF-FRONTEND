import { auth } from "@/auth";
import axiosInstance from "../axios.config";
import { User } from "@/interfaces/users";

interface ResponseUpdate {
  ok: boolean;
  user: User;
}

const updateUser = async (
  id: string,
  name: string,
  email: string,
  role: string,
  password?: string
) => {
  const session = await auth();
  return await axiosInstance
    .put<ResponseUpdate>(
      `/auth/${id}`,
      password ? { name, email, role, password } : { name, email, role },
      {
        headers: {
          "x-token": session?.user.token,
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
};

export default updateUser;

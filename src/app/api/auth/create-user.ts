import { auth } from "@/auth";
import axiosInstance from "../axios.config";

interface ResponseCreate {
  ok: boolean;
  uid: string;
  name: string;
  token: string;
}

const createUser = async (
  name: string,
  email: string,
  role: string,
  password: string
) => {
  const session = await auth();

  return await axiosInstance
    .post<ResponseCreate>(
      `/auth/new`,
      { name, email, role, password },
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

export default createUser;

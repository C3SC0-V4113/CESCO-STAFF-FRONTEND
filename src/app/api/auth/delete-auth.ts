import { auth } from "@/auth";
import axiosInstance from "../axios.config";

const deleteUser = async (userId: string) => {
  const session = await auth();
  /** GET to endpoint */
  return await axiosInstance
    .delete(`/auth/${userId}`, {
      headers: {
        "x-token": session?.user.token,
      },
    })
    .then((response) => {
      return true;
    })
    .catch((error) => {
      return false;
    });
};

export default deleteUser;

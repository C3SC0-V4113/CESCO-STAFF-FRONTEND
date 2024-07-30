import { auth } from "@/auth";
import axiosInstance from "../axios.config";

const deleteClient = async (clientId: string) => {
  const session = await auth();
  /** GET to endpoint */
  return await axiosInstance
    .delete(`/client/${clientId}`, {
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

export default deleteClient;

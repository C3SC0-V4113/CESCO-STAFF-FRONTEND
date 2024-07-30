import { auth } from "@/auth";
import axiosInstance from "../axios.config";
import { Client } from "@/interfaces/client";

interface ResponseUpdate {
  ok: boolean;
  client: Client;
}

const updateClient = async (
  id: string,
  name: string,
  lastname: string,
  address: string,
  phone: string
) => {
  const session = await auth();
  return await axiosInstance
    .put<ResponseUpdate>(
      `/client/${id}`,
      { name, lastname, address, phone },
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

export default updateClient;

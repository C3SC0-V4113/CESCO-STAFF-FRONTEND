import axiosInstance from "../axios.config";

interface User {
  ok: boolean;
  uid: string;
  name: string;
  token: string;
}

const login = async (email: string, password: string) => {
  const body = {
    email,
    password,
  };

  /** POST to endpoint */
  return await axiosInstance
    .post<User>("/auth", body)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return null;
    });
};

export default login;

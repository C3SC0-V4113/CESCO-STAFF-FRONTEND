import createUser from "./create-user";
import deleteUser from "./delete-auth";
import getUserById from "./get-user-by-id";
import getUsers from "./get-users";
import login from "./login";

export const auth = {
  login,
  getUsers,
  createUser,
  getUserById,
  deleteUser,
};

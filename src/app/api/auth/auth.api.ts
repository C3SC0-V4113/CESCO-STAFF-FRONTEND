import createUser from "./create-user";
import deleteUser from "./delete-auth";
import getListUsers from "./get-list-users";
import getUserById from "./get-user-by-id";
import getUsers from "./get-users";
import login from "./login";
import updateUser from "./update-user";

export const auth = {
  login,
  getUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
  getListUsers,
};

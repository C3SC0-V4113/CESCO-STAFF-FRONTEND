import { auth } from "./auth/auth.api";
import { client } from "./client/client.api";
import { event } from "./event/event.api";

const API = {
  auth,
  event,
  client,
};

export default API;

import countEvents from "./count-events";
import createEvents from "./create-event";
import deleteEvent from "./delete-events";
import getEvents from "./get-events";
import pendingFiveEvents from "./pending-five-events";
import updateEvent from "./update-event";

export const event = {
  countEvents,
  pendingFiveEvents,
  getEvents,
  deleteEvent,
  createEvents,
  updateEvent,
};

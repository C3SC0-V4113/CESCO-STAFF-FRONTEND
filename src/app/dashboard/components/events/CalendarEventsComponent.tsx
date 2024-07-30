"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { CalendarEvents } from "@/interfaces/events";

interface CalendarEventFormatted {
  title: string;
  start: Date;
  end: Date;
  description?: string;
  clients?: any;
  status?: string;
  users?: any;
}

interface Props {
  events: CalendarEvents[];
}

const CalendarEventsComponent = ({ events }: Props) => {
  const formatEvents = (events: CalendarEvents[]): CalendarEventFormatted[] => {
    return events.map((event) => ({
      title: event.title,
      start: event.startDateTime,
      end: event.endDateTime,
      description: event.description,
      clients: event.clients,
      status: event.status,
      users: event.users,
    }));
  };

  const formattedEvents = formatEvents(events);

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={formattedEvents}
      />
    </div>
  );
};

export default CalendarEventsComponent;

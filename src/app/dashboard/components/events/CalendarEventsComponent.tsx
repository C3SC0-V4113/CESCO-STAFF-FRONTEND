"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { CalendarEvents } from "@/interfaces/events";
import { EventClickArg } from "@fullcalendar/core/index.js";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import moment from "moment";
import Link from "next/link";
import { StatusParser } from "@/components/ui/status-parser";
import { DeleteDialogEvent } from "@/components/ui/delete-dialog-event";

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
  const [showModal, setShowModal] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState<CalendarEvents | null>(
    null
  );

  const handleEventClick = (clickInfo: EventClickArg) => {
    const clickedEvent = events.find(
      (event) => event.title === clickInfo.event.title
    );
    setSelectedEvent(clickedEvent || null);
    setShowModal(true);
  };

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
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
            <DialogDescription asChild>
              <div className="grid grid-cols-2 gap-6">
                <p>{selectedEvent?.description}</p>
                <StatusParser status={selectedEvent?.status!} />
                <div className="flex flex-col gap-2">
                  <p>Fecha de Inicio</p>
                  <p>{moment(selectedEvent?.startDateTime).format("ll")}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p>Fecha Final</p>
                  <p>{moment(selectedEvent?.endDateTime).format("ll")}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p>Encargadx(s)</p>
                  <p>
                    {selectedEvent?.users.map((user) => user.name).join(", ")}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p>Cliente(s)</p>
                  <p>
                    {selectedEvent?.clients
                      .map((client) => `${client.name} ${client.lastname}`)
                      .join(", ")}
                  </p>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <div className="flex gap-2">
              <Link href={`events/${selectedEvent?._id}/edit`}>
                <Button>Editar</Button>
              </Link>
              <DeleteDialogEvent
                eventId={selectedEvent?._id!}
                cta={"Eliminar Evento"}
                title={"¿Estás seguro que deseas eliminar el evento?"}
                desc={"Está acción no se puede reponer"}
                setShowModal={setShowModal}
              />
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={formattedEvents}
        eventClick={handleEventClick}
      />
    </div>
  );
};

export default CalendarEventsComponent;

import { auth } from "@/auth";
import { NextPage } from "next";
import API from "../api/api.services";
import { HomeCard } from "./components/HomeCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import moment from "moment";
import { Suspense } from "react";

interface Props {}

const Page: NextPage<Props> = async ({}) => {
  const session = await auth();

  const countEvents = await API.event.countEvents();
  const countClients = await API.client.countClients();
  const pendingFiveEvents = await API.event.pendingFiveEvents();

  if (!session) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <h1 className="text-2xl text-center font-bold col-span-full mb-8">
        Bienvenido al panel {session.user.name}
      </h1>
      <Suspense key={countEvents} fallback={<p>Loading feed...</p>}>
        <HomeCard
          title="Eventos Pendientes"
          content={countEvents! | 0}
          link={{
            label: "Ver Eventos Pendientes",
            href: "/dashboard/events",
          }}
        />
      </Suspense>
      <Suspense key={countClients} fallback={<p>Loading feed...</p>}>
        <HomeCard
          title="Clientes Totales"
          content={countClients! | 0}
          link={
            session.user.role === "admin"
              ? {
                  label: "Ver Clientes",
                  href: "/dashboard/clients",
                }
              : undefined
          }
        />
      </Suspense>
      <h2 className="text-2xl font-semibold leading-none tracking-tight mt-4">
        Proximos Eventos
      </h2>
      <div className="flex flex-col card border col-span-full p-4">
        <ScrollArea className="h-72">
          {pendingFiveEvents ? (
            pendingFiveEvents.map((event, key) => (
              <div
                className="w-full p-4 grid grid-cols-2 gap-2 border rounded-sm my-2"
                key={key}
              >
                <p className="my-auto text-left">{event.title}</p>
                <p className="my-auto text-right">
                  {moment(event.startDateTime).format("ll")} -{" "}
                  {moment(event.endDateTime).format("ll")}
                </p>
              </div>
            ))
          ) : (
            <p>No hay eventos proximos</p>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default Page;

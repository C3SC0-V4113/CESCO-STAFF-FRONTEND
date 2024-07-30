import { CalendarEvents } from "@/interfaces/events";
import { Circle, CircleSlash, CircleX } from "lucide-react";

interface Props {
  status: CalendarEvents["status"];
}

const StatusViews = {
  completed: <Circle className="text-green-500 mr-2" />,
  pending: <CircleSlash className="text-yellow-500 mr-2" />,
  canceled: <CircleX className="text-red-500 mr-2" />,
};

export const StatusParser = ({ status }: Props) => {
  const CurrentStatus = StatusViews[status];

  const translateStatus = () => {
    switch (status) {
      case "completed":
        return "Completado";
      case "canceled":
        return "Cancelado";
      case "pending":
        return "Pendiente";
      default:
        return "Pendiente";
    }
  };

  return (
    <div className="inline-flex items-center">
      {CurrentStatus} {translateStatus()}
    </div>
  );
};

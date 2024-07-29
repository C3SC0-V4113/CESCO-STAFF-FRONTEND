export interface CalendarEvents {
  _id: string;
  title: string;
  description: string;
  users: User[];
  clients: Client[];
  startDateTime: Date;
  endDateTime: Date;
  status: string;
  __v: number;
}

export interface Client {
  _id: string;
  name: string;
  lastname: string;
  address?: string;
  phone?: string;
  __v?: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
}

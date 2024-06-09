import { ILocationData } from ".";

export interface IDevRequestData {
  id?: string;
  name: string;

  title?: string;
  description?: string;
  message?: string;

  requests?: JSON[];

  eventType?: string;

  urlType?: string;
  favoriteDomain?: string;
  eventDate?: Date;
  eventTime?: string;
  eventTimeZone?: string;
  eventLocation?: ILocationData[];

  favoriteColor?: string;
  favoriteFont?: string;

  email?: string;
  phone?: string;
  whatsapp?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;

  createdAt?: Date;
  updatedAt?: Date;

  ips?: string[];
  userAgents?: string[];
  locations?: string[];
  devices?: string[];
}

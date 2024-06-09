import {
  IDataInvite,
  IDevRequestData,
  IEventRoomData,
  ILocationUsedData,
} from ".";

export interface ILocationData {
  handle: string;
  name: string;
  description?: string;

  date?: Date;

  longitude?: number;
  latitude?: number;

  address?: string;
  city?: string;
  region?: string;
  country?: string;
  postalCode?: string;
  phone?: string;
  email?: string;
  website?: string;

  images?: string[];

  isDraft?: boolean;
  isPublic?: boolean;

  createdAt?: Date;
  updatedAt?: Date;

  invites?: IDataInvite[];

  eventRooms?: IEventRoomData[];

  locationsUsed?: ILocationUsedData[];

  inviteRequests?: IDevRequestData[];
}

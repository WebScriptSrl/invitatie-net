import { IDataInvitee, IEventRoomData, ISpecialGuestData } from ".";

export interface ITableData {
  id?: string;
  handle: string;

  number?: number;

  name?: string;
  description?: string;
  images?: string[];

  isDraft?: boolean;
  capacity?: number;
  isPublic?: boolean;

  createdAt?: Date;
  updatedAt?: Date;

  eventRooms?: IEventRoomData;
  eventRoomId?: string;

  guests?: IDataInvitee[];

  specialGuests?: ISpecialGuestData[];
}

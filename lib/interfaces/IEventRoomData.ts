import { IDataUser, ILocationData, ISpecialGuestData, ITableData } from ".";

export interface IEventRoomData {
  id?: string;

  handle: string;

  name?: string;
  description?: string;
  images?: string[];
  isDraft?: boolean;

  tablesNumber?: number;
  chairsNumber?: number;
  capacity?: number;
  isPublic?: boolean;

  menu?: JSON[];

  createdAt?: Date;
  updatedAt?: Date;

  userId?: string;
  user?: IDataUser;

  tables?: ITableData[];

  specialGuests?: ISpecialGuestData[];

  locationId?: string;
  location?: ILocationData;
}

import { IDataUser, IEventRoomData, ITableData } from ".";

export interface ISpecialGuestData {
  id?: string;

  handle: string;

  bandName?: string;
  name?: string;
  nickname?: string;

  description?: string;
  images?: string[];

  email?: string;
  phone?: string;
  website?: string;
  whatsapp?: string;
  facebook?: string;
  instagram?: string;

  createdAt?: Date;
  updatedAt?: Date;

  eventRoomId?: string;
  tableId?: string;
  userId?: string;

  eventRoom?: IEventRoomData;
  table?: ITableData;
  user?: IDataUser;
}

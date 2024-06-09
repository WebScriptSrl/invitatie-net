import {
  IDataInvite,
  IDataUniqueInvite,
  IDataUser,
  IResponseData,
  ITableData,
} from ".";

export interface IDataInvitee {
  firstName: string;
  lastName: string;
  nickname?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;

  createdAt?: Date;
  updatedAt?: Date;

  expectedNumber?: number;
  side?: string;

  uniqueInvites?: IDataUniqueInvite[];

  invites?: IDataInvite[];

  user?: IDataUser;
  userId?: string;

  responses?: IResponseData[];

  table?: ITableData;
  tableId?: string;
}

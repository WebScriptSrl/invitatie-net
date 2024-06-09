import { IDataInvite, IDataInvitee, IDataUser } from ".";

export interface IResponseData {
  id?: string;

  inviteId?: string;
  inviteeId?: string;

  response?: JSON[];

  responseAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;

  userId?: string;
  user?: IDataUser;

  invitee?: IDataInvitee;
  invite?: IDataInvite;
}

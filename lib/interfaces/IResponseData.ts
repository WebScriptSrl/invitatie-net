import { IDataInvite, IDataInvitee, IDataUser } from ".";

interface IResponse {
  id?: string;

  inviteId?: string;
  inviteeId?: string;

  responseAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;

  userId?: string;
  user?: IDataUser;

  invitee?: IDataInvitee;
  invite?: IDataInvite;
}

export interface IResponseData extends IResponse {
  response?: [
    {
      guest: string;
      persons: [
        {
          guest: string;
          menu: string;
          phone?: string;
          message?: string;
        }
      ];
    }
  ];
}

import { IDataInvite, IDataInvitee, IDataUser } from ".";

export interface IDataUniqueInvite {
  id?: string;

  code: string;

  inviteeName?: string;
  favoriteColor?: string;
  favoriteFont?: string;
  favoriteLogo?: string;
  favoriteImage?: string;
  favoriteMessage?: string;

  images?: string[];
  limit?: number;

  sent?: boolean;
  sentAt?: Date;
  used?: boolean;
  usedAt?: Date;

  validityPeriod?: number;
  validUntil?: Date;

  createdAt?: Date;
  updatedAt?: Date;

  inviteId?: string;
  invite?: IDataInvite;

  invitees?: IDataInvitee[];
  domain?: string;
  domainType?: string;

  user?: IDataUser;
  userId?: string;
}

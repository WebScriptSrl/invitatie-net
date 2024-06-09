import {
  IAccountData,
  IComponentData,
  IDataInvite,
  IDataInvitee,
  IDataUniqueInvite,
  IPageData,
  IPostData,
  IResponseData,
  ISessionData,
  ISpecialGuestData,
  IUrl,
} from ".";
import { IEventRoomData } from "./IEventRoomData";

export interface IDataUser {
  id: string;
  firstName?: string;
  lastName?: string;
  username?: string;

  phone?: string;
  whatsapp?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  email?: string;
  emailVerified?: boolean;

  image?: string;

  createdAt?: Date;
  updatedAt?: Date;

  roles?: string[];

  isPartner?: boolean;
  isPremium?: boolean;

  partnerId?: string;

  cookieConsent?: boolean;
  cookieConsentAt?: Date;
  cookiesAccepted?: JSON[];
  cookiesRejected?: JSON[];
  cookiesSettings?: JSON[];
  cookiesPreferences?: JSON[];

  active?: boolean;
  ips?: string[];
  userAgent?: string[];
  lastLogin?: Date;
  lastIp?: string;
  lastUserAgent?: string;
  devices?: string[];
  lastDevice?: string;
  lastActivity?: Date;
  visited?: string[];
  visitedAt?: Date;
  visitedFrom?: string[];
  locations?: string[];
  lastLocation?: string;

  shortUrlsNumber?: number;
  premiumUrlsNumber?: number;
  guestUrlsNumber?: number;
  premiumGuestUrlsNumber?: number;

  accounts?: IAccountData[];
  sessions?: ISessionData[];
  invites?: IDataInvite[];
  posts?: IPostData[];
  invitees?: IDataInvitee[];
  uniqueInvites?: IDataUniqueInvite[];
  responses?: IResponseData[];

  urls?: IUrl[];

  eventRooms?: IEventRoomData[];

  specialGuests?: ISpecialGuestData[];

  pages?: IPageData[];
  components?: IComponentData[];
}

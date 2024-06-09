import {
  IComponentData,
  IDataInvitee,
  IDataUniqueInvite,
  IDataUser,
  ILocationData,
  IResponseData,
  IUrl,
} from ".";
import { UrlType } from "../types";

export interface IDataInvite {
  handle?: string;
  title?: string;
  code: string | null;
  category: string | null;
  name: string | null;
  model: string | null;
  isPublic?: boolean;
  isActive?: boolean;
  description: string | null;
  logo: string | null;
  eventDate?: Date | null;
  eventLocation?: ILocationData[];
  eventTime?: string;
  eventTimeZone?: string;
  font?: string;
  color?: string;
  mainImage?: string;
  images?: string[];
  customDomain?: UrlType;
  primaryDomain?: string;

  clicks?: number;

  message404?: string;
  message401?: string;

  isDraft?: boolean;
  publishedAt?: Date;
  validUntil?: Date;
  validityPeriod?: number;

  createdAt?: Date;
  updatedAt?: Date;

  sent?: boolean;
  sentAt?: Date;
  sentTo?: IDataInvitee[];

  used?: boolean;
  usedAt?: Date;

  locationsUsed?: ILocationData[];

  urls?: IUrl[];

  components?: IComponentData[];

  user?: IDataUser[];
  user_ids?: string[];

  uniqueInvites?: IDataUniqueInvite[];

  responses?: IResponseData[];
}

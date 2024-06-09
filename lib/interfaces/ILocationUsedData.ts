import { IDataInvite, ILocationData } from ".";

export interface ILocationUsedData {
  id?: string;

  locationId: string;
  location?: ILocationData[];

  eventType?: string;

  createdAt?: Date;
  updatedAt?: Date;

  invite?: IDataInvite;
  inviteId?: string;
}

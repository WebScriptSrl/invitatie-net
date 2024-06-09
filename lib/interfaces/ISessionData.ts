import { IDataUser } from ".";

export interface ISessionData {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;

  user?: IDataUser;
}

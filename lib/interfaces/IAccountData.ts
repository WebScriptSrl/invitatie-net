import { IDataUser } from ".";

export interface IAccountData {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  refresh_token_expires?: Date;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
  oauth_token_secret?: string;
  oauth_token?: string;

  premiumAccount?: boolean;

  user?: IDataUser;
}

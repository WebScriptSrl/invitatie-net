export interface IUrl {
  type?: string;
  baseUrl: string;
  alias: string;
  guestAlias?: string;
  premium: boolean;
  premiumDomain?: string;
  expiration?: Date;
  userId?: string;
  shortUrls?: string[];
  premiumGuestUrls?: string[];
  guestUrls?: string[];
}

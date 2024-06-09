import { UrlType } from "../types";

export const checkUrlType = (
  inviteQuery: string | null,
  guestQuery: string | null,
  domain?: string,
  path?: string
): UrlType => {
  if (inviteQuery && guestQuery) {
    return "TITLE_GUEST_QUERY";
  } else if (inviteQuery) {
    return "TITLE_QUERY";
  } else if (guestQuery) {
    return "GUEST_QUERY";
  } else {
    return "PREMIUM";
  }
};

import { IPageData } from ".";

export interface ICookieData {
  id?: string;
  key: string;
  value: string;

  description?: string;

  createdAt?: Date;
  updatedAt?: Date;

  pageId?: string;
  page?: IPageData;
}

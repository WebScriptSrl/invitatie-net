import { IDataInvite, IDataUser, IPageData } from ".";

export interface IComponentData {
  id: string;
  handle: string;
  title: string;
  description?: string;
  content?: JSON[];
  type?: string;
  isDraft?: boolean;
  images?: string[];

  published?: boolean;
  publishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;

  user?: IDataUser;
  userId?: string;

  pages?: IPageData[];
  pagesIds?: string[];

  invites?: IDataInvite[];
  invitesIds?: string[];
}

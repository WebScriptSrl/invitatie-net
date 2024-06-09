import { IDataUser, IMetadata } from ".";

export interface IPostData {
  id?: string;
  handle: string;
  title?: string;
  description?: string;
  content?: JSON[];
  slug?: string;
  mainImage?: string;
  images?: string[];
  isDraft?: boolean;
  published?: boolean;
  publishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;

  userId?: string;
  user?: IDataUser;

  metadata?: IMetadata[];
}

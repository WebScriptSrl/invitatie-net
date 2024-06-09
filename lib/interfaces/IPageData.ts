import { IComponentData, ICookieData, IDataUser, IMetadata } from ".";

export interface IPageData {
  id?: string;
  title: string;
  handle: string;
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

  components?: IComponentData[];
  componentsIds?: string[];

  cookies?: ICookieData[];
}

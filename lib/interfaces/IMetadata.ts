import { IPageData, IPostData } from ".";

export interface IMetadata {
  id?: string;

  key: string;
  value: string;

  createdAt?: Date;
  updatedAt?: Date;

  postId?: string;
  pageId?: string;

  post?: IPostData;
  page?: IPageData;
}

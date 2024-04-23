export type ApiResponse<T> = {
  data: T;
  message: string;
}

export type ApiError = {
  data: null;
  message: string;
}

export interface ISiteMeta {
  title: string;
  url?: string;
  description?: string;
  author?: string;
  keywords?: string;
  type?: string;
  tags?: string;
  section?: string;
  created?: string;
  updated?: string;
  image?: {
    link: string;
    alt: string;
  };
}

export interface IConfigData {
  title: string;
  description: string;
  url: string;
  type: string;
  keywords: string;
  author: {
    name: string;
    url: string;
  };
  image: string;
  version: string;
}

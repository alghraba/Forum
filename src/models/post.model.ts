export interface Post {
  id?: number;
  title: string;
  content: string;
  project: {
    id: number;
  };
  author?: {
    id: number;
    username: string;
  };
  creationDate?: Date;
  lastModifiedDate?: Date;
}

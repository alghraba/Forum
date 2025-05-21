export interface Comment {
  id?: number;
  content: string;
  post: {
    id: number;
  };
  author?: {
    id: number;
    username: string;
  };
  creationDate?: Date;
  lastModifiedDate?: Date;
}
export interface CommentResponse {
  id: number;
  content: string;
  project: {
    id: number;
  };
}
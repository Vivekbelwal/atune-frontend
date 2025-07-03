export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  avatarId?: string;
  avatar?: {
    id: string;
    url: string;
  };
}

export interface GetUserResponse {
  user: User;
}

export interface GetCurrentUserResponse {
  me: User;
}

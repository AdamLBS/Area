export const API_URL = (process.env.NEXT_PUBLIC_API_URL as string) + '/api';
export const API_URL_OAUTH =
  (process.env.NEXT_PUBLIC_API_URL as string) + '/oauth';

export type Token = {
  token: string;
};

export type User = {
  user: UserData;
};

export type UserData = {
  uuid: string;
  email: string;
  username: string;
  remember_me_token: string;
  created_at: string;
  updated_at: string;
};

export const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export type Token = {
  token: string;
};

export type Root = {
  user: User;
};

export type User = {
  uuid: string;
  email: string;
  username: string;
  remember_me_token: string;
  created_at: string;
  updated_at: string;
};

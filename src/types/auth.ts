export type AuthData = {
  email: string;
  password: string;
}

export type UserData = {
  id: number;
  email: string;
  token: string;
  name: string;
  avatarUrl: string;
}

export type CheckUserData = {
  email: string;
  token: string;
  name: string;
  avatarUrl: string;
}

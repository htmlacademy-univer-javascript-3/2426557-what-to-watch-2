const AUTH_TOKEN_NAME = 'what-to-watch';

export type Token = string;

export const getToken = (): Token => localStorage.getItem(AUTH_TOKEN_NAME) || '';

export const setToken = (token: Token): void => {
  localStorage.setItem(AUTH_TOKEN_NAME, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_NAME);
};

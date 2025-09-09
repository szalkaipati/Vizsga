import jwtDecode from "jwt-decode";

export const getUserFromToken = (token: string) => {
  try {
    return jwtDecode<{ userId: number; role: string }>(token);
  } catch {
    return null;
  }
};

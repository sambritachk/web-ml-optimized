import { User } from "@@models";
import axios from "axios";
import { AuthActions, dispatchAsync } from "./auth.state";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
if (localStorage.getItem("accessToken")) {
  instance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("accessToken")}`;
}
export const getUserAsync = async () => {
  const response = await instance
    .get<User>(`/auth/me`)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .catch((_) => ({ data: { authorized: false, userName: "Anonymous" } }));
  if (response.data?.authorized) {
    return response.data as User;
  }
  return { authorized: false, userName: "Anonymous" } as User;
};

export const checkLogin = () => {
  getUserAsync().then((user) => {
    dispatchAsync(AuthActions.SET_USER, {
      loggedIn: user.authorized,
      user: user,
    });
  });
};
checkLogin();

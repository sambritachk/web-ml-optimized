import { useEffect, useState } from "react";
import { AuthState, getState as authState } from "./auth.state";
import { getUserAsync } from "./auth.service";
import { useQuery } from "@tanstack/react-query";
import { User } from "@@models";

export const useUserQuery = (authenticated: boolean) => {
  return useQuery({
    queryKey: [authenticated, "user"],
    queryFn: getUserAsync,
    enabled: authenticated,
    retry: false,
  });
};

export type AuthHookProps = [boolean, User | undefined];
export function useAuth(): AuthHookProps {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!authState().get<AuthState>()?.loggedIn
  );
  const [user, setUser] = useState<User>();
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const unobserve = authState().observe<AuthState>((user: any) => {
      setIsLoggedIn(!!user?.loggedIn);
    });
    return () => unobserve();
  }, []);
  useEffect(() => {
    if (!isLoggedIn) {
      setUser(undefined);
    } else {
      getUserAsync().then(setUser);
    }
  }, [isLoggedIn]);
  return [isLoggedIn, user];
}

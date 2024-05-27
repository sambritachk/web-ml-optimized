import {
  ReactiveState,
  Action,
  Reducer,
  DispatchAsync,
} from "@@libs/state/reactive";
import { User } from "@@models";

export type AuthState = {
  loggedIn?: boolean;
  user?: User | null;
};

export enum AuthActions {
  "SET_USER",
}

const reducer: Reducer<AuthState, Action<AuthActions>> = async (
  state,
  action,
  updates
) => {
  switch (action) {
    case AuthActions.SET_USER:
      return { ...state, ...(updates || {}) };
    default:
      return state;
  }
};
const state = new ReactiveState<AuthState, Action<AuthActions>>(
  "user_profile",
  reducer
);

export const getState = (): ReactiveState<AuthState, Action<AuthActions>> => {
  return state;
};
export const dispatchAsync: DispatchAsync<AuthActions, AuthState> = async (
  action,
  payload
) => {
  await state.updateAsync(action, payload);
};

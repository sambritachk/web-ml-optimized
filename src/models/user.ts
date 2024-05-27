export interface User {
  userName: string;
  email: string;
  authorized: boolean;
  emailVerified: boolean;
  dhbId?: number;
  restrictedAccess?: boolean;
}

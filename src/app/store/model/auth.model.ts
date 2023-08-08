export interface AuthState {
  loggedIn: boolean;
  error: any;
  authToken: string;
  expiredDate: string;
}

export interface AuthPayload {
  authToken: string;
  expiredDate: string;
}
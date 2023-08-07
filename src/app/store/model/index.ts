import { RouterReducerState } from "@ngrx/router-store";
import { AuthState } from "./auth.model";
import { RouterStateUrl } from "./router.model";

export interface AppState {
  router: RouterReducerState<RouterStateUrl>;
  auth: AuthState;
}
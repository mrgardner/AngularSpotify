import { PlaylistsState } from "./playlists.model";
import { UserState } from "./user.model";

export interface DashboardState {
  playlists: PlaylistsState;
  user: UserState;
}
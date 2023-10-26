import { AlbumState } from "@dashboard/store/model/albums.model";
import { ArtistsState } from "@dashboard/store/model/artists.model";
import { PlaylistsState } from "@dashboard/store/model/playlists.model";
import { PodcastsState } from "@dashboard/store/model/podcasts.model";
import { UserState } from "@dashboard/store/model/user.model";
import { RouterReducerState } from "@ngrx/router-store";
import { PlaylistState } from "@playlist/store/model/playlist.model";
import { AuthState } from "./auth.model";
import { RouterStateUrl } from "./router.model";

export interface AppState {
  router: RouterReducerState<RouterStateUrl>;
  auth: AuthState;
  playlists: PlaylistsState,
  user: UserState,
  playlist: PlaylistState,
  albums: AlbumState,
  artists: ArtistsState
  podcasts: PodcastsState
}
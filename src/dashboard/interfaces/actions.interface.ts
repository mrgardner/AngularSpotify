import { Playlist } from "@app/interfaces/playlist/playlist.interface";

export interface PlaylistsPayload {
  entities: { [id: number]: Playlist };
  total: number;
  nextPlaylist: string;
  canLoadMore: boolean;
}
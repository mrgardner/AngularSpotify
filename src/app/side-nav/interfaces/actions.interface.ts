import { Playlist } from "@core/interfaces/playlist/playlist.interface";

export interface PlaylistsPayload {
  data: Playlist[];
  total: number;
  nextPlaylist: string;
}
import { Playlist } from "@app/interfaces/playlist/playlist.interface";

export interface PlaylistsPayload {
  data: Playlist[];
  total: number;
  nextPlaylist: string;
}
import { PlaylistDataSourceService } from "./playlist-data-source/playlist-data-source.service";
import { PlaylistService } from "./playlist/playlist.service";

export const playlistServices: any[] = [
  PlaylistService,
  PlaylistDataSourceService
];

export * from './playlist/playlist.service';
export * from './playlist-data-source/playlist-data-source.service';
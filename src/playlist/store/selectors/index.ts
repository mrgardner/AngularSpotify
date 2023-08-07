import { createFeatureSelector } from "@ngrx/store";
import { PlaylistState } from "../model";

export const getPlaylistState = createFeatureSelector<PlaylistState>(
  'playlist'
);
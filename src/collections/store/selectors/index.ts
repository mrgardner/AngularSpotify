import { createFeatureSelector } from "@ngrx/store";
import { CollectionsState } from "../model";

export const getCollectionsState = createFeatureSelector<CollectionsState>(
  'collections'
);
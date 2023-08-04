import { createFeatureSelector } from "@ngrx/store";
import { DashboardState } from "../model";

export const getDashboardState = createFeatureSelector<DashboardState>(
  'dashboard'
);
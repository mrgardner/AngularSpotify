import { DashboardComponent } from "@dashboard/components/dashboard/dashboard.component";
import { DeviceModalComponent } from "@dashboard/components/device-modal/device-modal.component";
import { DisplayUserComponent } from "@dashboard/components/display-user/display-user.component";
import { HeaderComponent } from "@dashboard/components/header/header.component";
import { SpotifyStatusBarComponent } from "@dashboard/components/spotify-status-bar/spotify-status-bar.component";
import { NewPlaylistDialogComponent } from "./new-playlist-dialog/new-playlist-dialog.component";
import { SpotifyNavigationMenuComponent } from "./spotify-navigation-menu/spotify-navigation-menu.component";

export const dashboardComponents: any[] = [
  DashboardComponent,
  DeviceModalComponent,
  DisplayUserComponent,
  HeaderComponent,
  NewPlaylistDialogComponent,
  SpotifyNavigationMenuComponent,
  SpotifyStatusBarComponent
];
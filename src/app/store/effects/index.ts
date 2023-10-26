import { AlbumsEffects } from "@dashboard/store/effects/albums.effect";
import { ArtistsEffects } from "@dashboard/store/effects/artists.effect";
import { PlaylistsEffects } from "@dashboard/store/effects/playlists.effect";
import { PodcastsEffects } from "@dashboard/store/effects/podcasts.effect";
import { UserEffects } from "@dashboard/store/effects/user.effect";
import { PlaylistEffects } from "@playlist/store/effects/playlist.effect";
import { AuthEffects } from "./auth.effect";

export const effects = [AuthEffects, PlaylistEffects, PlaylistsEffects, UserEffects, AlbumsEffects, ArtistsEffects, PodcastsEffects];
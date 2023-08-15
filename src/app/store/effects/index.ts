import { AlbumEffects } from "@collections/store/effects/album.effect";
import { PlaylistsEffects } from "@dashboard/store/effects/playlists.effect";
import { UserEffects } from "@dashboard/store/effects/user.effect";
import { PlaylistEffects } from "@playlist/store/effects/playlist.effect";
import { AuthEffects } from "./auth.effect";

export const effects = [AuthEffects, PlaylistEffects, PlaylistsEffects, UserEffects, AlbumEffects];
import { Injectable, EventEmitter } from '@angular/core';
import { SpotifyService } from '../spotify/spotify.service';
import { switchMap } from 'rxjs/operators';
import { SpotifyToken } from 'src/app/interfaces/spotify-token/spotify-token.interface';
import { PlaylistData } from 'src/app/interfaces/playlist/spotfiy-playlist-data.interface';
import { of, concat } from 'rxjs';
import { PlaylistService } from '../playlist/playlist.service';
import { Params } from 'src/app/interfaces/params/params.interface';
import { Playlist } from 'src/app/interfaces/playlist/playlist.interface';

@Injectable({
  providedIn: 'root'
})
export class PlaylistTableService {
  public tracks$: EventEmitter<any>;
  public playlistInfo$: EventEmitter<any>;
  public loading$: EventEmitter<any>;
  public tracksLoaded$: EventEmitter<any>;
  public currentTrack$: EventEmitter<any>;

  constructor(private spotifyService: SpotifyService, private playlistService: PlaylistService) {
    this.tracks$ = new EventEmitter();
    this.playlistInfo$ = new EventEmitter();
    this.loading$ = new EventEmitter();
    this.tracksLoaded$ = new EventEmitter();
    this.currentTrack$ = new EventEmitter();
  }

  setCurrentTrack(currentTrack: Object): void {
    return this.currentTrack$.emit(currentTrack);
  }

  setTracks(tracks: Array<Object>): void {
    return this.tracks$.emit(tracks);
  }

  setPlaylistInfo(playlistInfo: Playlist): void {
    return this.playlistInfo$.emit(playlistInfo);
  }

  setLoading(loading: boolean): void {
    return this.loading$.emit(loading);
  }

  setTracksLoaded(tracksLoaded: boolean): void {
    return this.tracksLoaded$.emit(tracksLoaded);
  }

  getPlayListTracks(route) {
    let loggedIn = false;
    let token = '';
    let playlist: PlaylistData = {
      name: '',
      owner: '',
      playlistCoverURL: '',
      playlistID: '',
      playlistLength: 0,
      selected: false
    };

    return this.spotifyService.getAuthToken()
      .pipe(
        switchMap((spotifyToken: SpotifyToken) => {
          token = spotifyToken.token;
          loggedIn = !!token;
          if (loggedIn) {
            return route.params;
          } else {
            this.setLoading(false);
            this.setTracksLoaded(true);
            return of();
          }

        }),
        switchMap((params: Params) => {
          return this.playlistService.getSavedPlaylist(params.playlistID);
        }),
        switchMap((playlistInfo: PlaylistData) => {
          this.setLoading(true);
          this.setTracksLoaded(false);
          this.setTracks([]);
          const tempList = [];
          playlist = playlistInfo;
          if (playlist && loggedIn) {
            const owner = playlist.owner;
            const playlistID = playlist.playlistID;
            const playlistLength = playlist.playlistLength;
            const numberOfTimesToLoop = Math.ceil(playlistLength / 100);
            this.setPlaylistInfo({
              playlistName: playlist.name,
              playlistOwner: playlist.owner,
              playlistCoverUrl: playlist.playlistCoverURL
            });
            this.playlistService.selectPlaylist(playlist.name);
            if (playlist.playlistLength > 0) {
              for (let i = 0; i < numberOfTimesToLoop; i++) {
                const baseURI = `https://api.spotify.com/v1/users/${owner}/playlists/${playlistID}/tracks?offset=${i * 100}&limit=100`;
                tempList.push(this.spotifyService.getAllTracksFromPlaylist(owner, playlistID, token, baseURI));
              }
              return concat(...tempList);
            } else {
              this.setLoading(false);
              this.setTracksLoaded(true);
              return of();
            }
          } else {
            this.setLoading(false);
            this.setTracksLoaded(true);
            return of();
          }
        })
      );
  }
}

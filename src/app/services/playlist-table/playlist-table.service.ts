import { Injectable, EventEmitter } from '@angular/core';
import { SpotifyService } from '../spotify/spotify.service';
import { PlaylistService } from '../playlist/playlist.service';
import { Playlist } from 'src/app/interfaces/playlist/playlist.interface';
import { Track } from 'src/app/interfaces/track/track.interface';

@Injectable({
  providedIn: 'root'
})
export class PlaylistTableService {
  public tracks$: EventEmitter<any>;
  public track$: EventEmitter<any>;
  public playlistInfo$: EventEmitter<any>;
  public loading$: EventEmitter<any>;
  public tracksLoaded$: EventEmitter<any>;
  public currentTrack$: EventEmitter<any>;

  constructor(private spotifyService: SpotifyService, private playlistService: PlaylistService) {
    this.tracks$ = new EventEmitter();
    this.track$ = new EventEmitter();
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

  setTrack(track: Track): void {
    return this.track$.emit(track);
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

  // TODO: FIX Without getAuthToken()
  // getPlayListTracks(route) {
  //   let loggedIn = false;
  //   let token = '';
  //   let playlist: PlaylistData = {
  //     name: '',
  //     owner: '',
  //     playlistCoverURL: '',
  //     playlistID: '',
  //     playlistLength: 0,
  //     selected: false
  //   };

  //   return this.spotifyService.getAuthToken()
  //     .pipe(
  //       switchMap((spotifyToken: SpotifyToken) => {
  //         token = spotifyToken.token;
  //         loggedIn = !!token;
  //         if (loggedIn) {
  //           return route.params;
  //         } else {
  //           this.setLoading(false);
  //           this.setTracksLoaded(true);
  //           return of();
  //         }

  //       }),
  //       switchMap((params: Params) => {
  //         return this.playlistService.getSavedPlaylist(params.playlistID);
  //       }),
  //       switchMap((playlistInfo: PlaylistData) => {
  //         this.setLoading(true);
  //         this.setTracksLoaded(false);
  //         this.setTracks([]);
  //         const tempList = [];
  //         playlist = playlistInfo;
  //         if (playlist && loggedIn) {
  //           const owner = playlist.owner;
  //           const playlistID = playlist.playlistID;
  //           const playlistLength = playlist.playlistLength;
  //           const numberOfTimesToLoop = Math.ceil(playlistLength / 100);
  //           this.setPlaylistInfo({
  //             playlistName: playlist.name,
  //             playlistOwner: playlist.owner,
  //             playlistCoverUrl: playlist.playlistCoverURL
  //           });
  //           this.playlistService.selectPlaylist(playlist.name);
  //           if (playlist.playlistLength > 0) {
  //             for (let i = 0; i < numberOfTimesToLoop; i++) {
  //               const baseURI = `https://api.spotify.com/v1/users/${owner}/playlists/${playlistID}/tracks?offset=${i * 100}&limit=100`;
  //             }
  //             return this.spotifyService.getTracksFromPlaylist(owner, playlistID, token, );
  //           } else {
  //             this.setLoading(false);
  //             this.setTracksLoaded(true);
  //             return of();
  //           }
  //         } else {
  //           this.setLoading(false);
  //           this.setTracksLoaded(true);
  //           return of();
  //         }
  //       })
  //     );
  //   .subscribe((data: any) => {
  //     this.tracks = this.tracks.concat(data.items);
  //     if (!data['next']) {
  //       this.loading = false;
  //       this.tracksLoaded = true;
  //       this.tracks.forEach((track: Track, index: number) => {
  //         track.isPlayButtonShowing = false;
  //         track.isPauseButtonShowing = false;
  //       });
  //        this.source = this.tracks.map((t: Track) => {
  //         return {
  //           title: t['track'].name,
  //           artist: this.displayArtists(t['track'].artists).join(''),
  //           album: t['track'].album.name,
  //           addedAt: t['added_at'].split('T')[0],
  //           time: this.convertMS(t['track'].duration_ms),
  //           isPlayButtonShowing: t.isPlayButtonShowing,
  //           isPauseButtonShowing: t.isPauseButtonShowing,
  //           duration: t['track'].duration_ms,
  //           uri: t['track'].uri,
  //           track: t
  //         };
  //       });
  //       this.dataSource = new MatTableDataSource(this.source);
  //       // const numberOfLoops = Math.ceil(this.tracks.length / 50);
  //       // const trackIDs = this.tracks.map(track => track['track']['id']);
  //       // for (let i = 0; i < numberOfLoops; i++) {
  //       //   this.spotifyService.checkSavedTrack(this.token, trackIDs.slice((i * 50), ((i + 1) * 50)).join(','))
  //       //     .subscribe(trackData =>  {
  //       //       this.tracks.forEach((track, index) => track['isSaved'] = trackData[index]);
  //       //     });
  //       // }
  //     }
  //   });
  // }

  playSpotifyTrack(tracks, track) {
    this.setCurrentTrack(track['track']);
    this.setTrack(track['track']);
    const uris = tracks.map(ff => ff['uri']);
    const offset = uris.indexOf(track['track']['uri']);

    return this.spotifyService.playSpotifyTrack(uris, offset, localStorage.getItem('deviceId'));
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {SpotifyService} from '../../../services/spotify/spotify.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TrackService} from '../../../services/track/track.service';
import PrettyMS from 'pretty-ms';
import {PlaylistService} from '../../../services/playlist/playlist.service';
import {switchMap} from 'rxjs/internal/operators';
import {concat, of} from 'rxjs';
import { CurrentTrack } from 'src/app/interfaces/track/current-track.interface';
import { Header } from 'src/app/interfaces/header/header.interface';
import { SpotifySongResponse } from 'src/app/interfaces/song/spotify-song-response.interface';
import { SpotifyToken } from 'src/app/interfaces/spotify-token/spotify-token.interface';
import { Params } from 'src/app/interfaces/params/params.interface';
import { PlaylistData } from 'src/app/interfaces/playlist/playlist-data.interface';
import { Track } from 'src/app/interfaces/track/track.interface';
import { Artist } from 'src/app/interfaces/artist/artist.interface';
import { Song } from 'src/app/interfaces/song/song.interface';
import { SpotifyPlaybackService } from 'src/app/services/spotify-playback/spotify-playback.service';
import {MatSort, MatTableDataSource} from '@angular/material';
import { PlaylistTableData } from 'src/app/interfaces/table/playlist-table-data.interface';

@Component({
  selector: 'app-playlist-table',
  templateUrl: './playlist-table.component.html',
  styleUrls: ['./playlist-table.component.scss']
})
export class PlaylistTableComponent implements OnInit {
  public tracks: Array<Track> = [];
  public loading: boolean;
  public tracksLoaded: boolean;
  public checkDuplicate: boolean;
  public filterTrackName: string;
  public filterTrackArtist: string;
  public playlistName: string;
  public headers: Array<Header>;
  public playlistCover: string;
  public playlistOwner: string;
  public isPlayButtonShowing: boolean;
  public isPauseButtonShowing: boolean;
  private token: string;
  private deviceID: string;
  private playlistID: string;
  currentTrack: Object;
  track: Object;
  private currentTrackPosition: number;
  public displayedColumns: string[] = ['title', 'artist', 'album', 'time'];
  public dataSource: Object;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute,
    private trackService: TrackService,
    private router: Router,
    private playlistService: PlaylistService,
    private spotifyPlaybackService: SpotifyPlaybackService) {}

  ngOnInit() {
    this.checkDuplicate = false;
    this.filterTrackName = '';
    this.filterTrackArtist = '';
    this.playlistName = '';
    this.playlistCover = '';
    this.playlistOwner = '';
    this.playlistID = '';
    this.deviceID = '';
    this.currentTrack = {track: {name: ''}};
    this.track = {track: {name: ''}};
    this.trackService.checkDuplicate$.subscribe((isDuplicate: boolean) => {
      this.checkDuplicate = isDuplicate;
      this.headers[0].show = isDuplicate;
    });
    this.trackService.filterTrackName$.subscribe((name: string) => this.filterTrackName = name);
    this.trackService.filterTrackArtist$.subscribe((artist: string) => this.filterTrackArtist = artist);
    this.isPlayButtonShowing = false;
    this.isPauseButtonShowing = false;
    this.currentTrackPosition = 0;
    // this.trackService.areTracksLoading$.subscribe(isLoading => this.loading = isLoading);
    // this.trackService.areTracksLoaded$.subscribe(isLoading => this.tracksLoaded = isLoading);
    this.headers = [
      {
        name: 'X',
        show: this.checkDuplicate
      },
      {
        name: '',
        show: true
      },
      // {
      //   name: '',
      //   show: true
      // },
      {
        name: 'TITLE',
        show: true
      },
      {
        name: 'ARTIST',
        show: true
      },
      {
        name: 'ALBUM',
        show: true
      },
      {
        name: 'TIME',
        show: true
      }
    ];
    let loggedIn = false;
    let playlist: PlaylistData = {
      name: '',
      owner: '',
      playlistCoverURL: '',
      playlistID: '',
      playlistLength: 0,
      selected: false
    };
    this.spotifyPlaybackService.currentSongState$.subscribe((track: SpotifySongResponse) => {
      if (track.paused) {
        this.currentTrack = {track: {name: ''}};
      } else {
        this.currentTrack = track.track_window.current_track;
      }
    });
    this.spotifyPlaybackService.currentTrackPosition$.subscribe((position: number) => this.currentTrackPosition = position);
    this.spotifyService.getAuthToken()
      .pipe(
        switchMap((spotifyToken: SpotifyToken) => {
          this.token = spotifyToken.token;
          loggedIn = !!this.token;
          if (loggedIn) {
            return this.route.params;
          } else {
            this.loading = false;
            return of();
          }

        }),
        switchMap((params: Params) => {
          return this.playlistService.getSavedPlaylist(params.playlistID);
        }),
        switchMap((playlistInfo: PlaylistData) => {
          this.loading = true;
          this.tracksLoaded = false;
          this.tracks = [];
          const tempList = [];
          playlist = playlistInfo;
          if (playlist && loggedIn) {
            const owner = playlist.owner;
            const playlistID = playlist.playlistID;
            const playlistLength = playlist.playlistLength;
            const numberOfTimesToLoop = Math.ceil(playlistLength / 100);
            this.playlistName = playlist.name;
            this.playlistCover = playlist.playlistCoverURL;
            this.playlistOwner = playlist.owner;
            this.playlistService.selectPlaylist(this.playlistName);
            if (playlist.playlistLength > 0) {
              for (let i = 0; i < numberOfTimesToLoop; i++) {
                const baseURI = `https://api.spotify.com/v1/users/${owner}/playlists/${playlistID}/tracks?offset=${i * 100}&limit=100`;
                tempList.push(this.spotifyService.getAllTracksFromPlaylist(owner, playlistID, this.token, baseURI));
              }
              return concat(...tempList);
            } else {
              this.loading = false;
              this.tracksLoaded = true;
              return of();
            }
          } else {
            this.loading = false;
            this.tracksLoaded = true;
            return of();
          }
        })
      )
      .subscribe((data: any) => {
        this.tracks = this.tracks.concat(data.items);
        if (!data['next']) {
          this.loading = false;
          this.tracksLoaded = true;
          this.tracks.forEach((track: Track, index: number) => {
            track.isPlayButtonShowing = false;
            track.isPauseButtonShowing = false;
          });
          const source: Array<PlaylistTableData> = this.tracks.map((t: Track) => {
            return {
              title: t['track'].name,
              artist: this.displayArtists(t['track'].artists).join(''),
              album: t['track'].album.name,
              time: this.convertMS(t['track'].duration_ms)
            };
          });
          this.dataSource = new MatTableDataSource(source);

          console.log(this.dataSource);
          if (!this.dataSource['sort']) {
            console.log('dfasdfdsf');
            console.log(this.sort);
            this.dataSource['sort'] = this.sort;
          }
          console.log(this.dataSource);
          // const numberOfLoops = Math.ceil(this.tracks.length / 50);
          // const trackIDs = this.tracks.map(track => track['track']['id']);
          // for (let i = 0; i < numberOfLoops; i++) {
          //   this.spotifyService.checkSavedTrack(this.token, trackIDs.slice((i * 50), ((i + 1) * 50)).join(','))
          //     .subscribe(trackData =>  {
          //       console.log('test')
          //       this.tracks.forEach((track, index) => track['isSaved'] = trackData[index]);
          //     });
          // }
        }
      });

    // this.route.params.pipe(
    //   switchMap(params => {
    //     if (params['playlistID']) {
    //       return this.playlistService.getCurrentPlaylistTracksChange(params['playlistID']);
    //     } else {
    //       return of();
    //     }
    //   })
    // ).subscribe(() => {});
    this.spotifyService.getAuthToken().pipe(
      switchMap((token: SpotifyToken) => {
        this.token = token.token;
        if (this.token) {
          return this.playlistService.getCurrentDevice();
        } else {
          return of();
        }
      }),
      switchMap((deviceID: string) => {
        this.deviceID = deviceID;
        if (this.deviceID) {
          return this.playlistService.test$;
        } else {
          return of();
        }
      }),
      switchMap(track => {
        const trackPosition = this.track['name'] !== track['track']['name'] ? 0 : this.currentTrackPosition;
        this.currentTrack = track['track'];
        this.track = track['track'];
        const tt = this.tracks.map(ff => ff['track']['uri']);
        const offset = tt.indexOf(this.track['uri']);
        return this.spotifyService.playSpotifyTrack(this.token, tt, offset, this.deviceID, trackPosition);
      })
    ).subscribe(() => {});

    this.spotifyService.getAuthToken().pipe(
      switchMap((token: SpotifyToken) => {
        this.token = token.token;
        if (this.token) {
          return this.playlistService.getCurrentDevice();
        } else {
          return of();
        }
      }),
      switchMap((deviceID: string) => {
        this.deviceID = deviceID;
        if (this.deviceID) {
          return this.playlistService.test2$;
        } else {
          return of();
        }
      }),
      switchMap((currentTrack: CurrentTrack) => {
        currentTrack.isPlayButtonShowing = true;
        currentTrack.isPauseButtonShowing = false;
        this.currentTrack = {track: {name: ''}};
        return this.spotifyService.pauseSpotifyTrack(this.token, this.deviceID);
      })
    ).subscribe(() => {});
  }

  testing(track: Song): void {
    this.playlistService.test(track);
  }

  pauseSong(track: Song): void {
    this.spotifyPlaybackService.pauseSong();
  }

  convertMS(ms: number): number {
    return PrettyMS(ms, { secDecimalDigits: 0 });
  }

  shortenString(string: string): string {
    const stringLength = 25;
    if (string.length > stringLength) {
      return string.substr(0, stringLength) + '...';
    } else {
      return string;
    }
  }

  displayArtists(artists: Array<Artist>): Array<string> {
    const numberOfArtists = artists.length;
    return artists.map((artist, i) => {
      let artistString = '';
      if (numberOfArtists > 1) {
        if (numberOfArtists - 1 === i) {
          artistString += artist.name;
        } else {
          artistString += `${artist.name}, `;
        }
      }  else {
        artistString = artist.name;
      }
      return artistString;
    });
  }

  toBeRemoved(track: Track): void {
    track['remove'] = !track['remove'];
  }

  goToTrack(track): void {
    this.router.navigate(['/track', track.track.id]);
  }

  getPlaylistDuration(): (number | string) {
    let totalDuration = 0;
    this.tracks.forEach(track => {
      totalDuration += track['track']['duration_ms'];
    });

    if (totalDuration === 0) {
      return '0 sec';
    } else {
      return this.convertMS(totalDuration);
    }
  }

  showPlayButton(track: Track): void {
    track.isPlayButtonShowing = true;
  }

  hidePlayButton(track: Track): void {
    track.isPlayButtonShowing = false;
  }

  showPauseButton(track: Track): void {
    track.isPauseButtonShowing = true;
  }

  hidePauseButton(track: Track): void {
    track.isPauseButtonShowing = false;
  }
}

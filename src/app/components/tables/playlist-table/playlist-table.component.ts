import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../../services/spotify/spotify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TrackService } from '../../../services/track/track.service';
import PrettyMS from 'pretty-ms';
import { PlaylistService } from '../../../services/playlist/playlist.service';
import { switchMap } from 'rxjs/internal/operators';
import { of } from 'rxjs';
import { CurrentTrack } from 'src/app/interfaces/track/current-track.interface';
import { SpotifySongResponse } from 'src/app/interfaces/song/spotify-song-response.interface';
import { SpotifyToken } from 'src/app/interfaces/spotify-token/spotify-token.interface';
import { Track } from 'src/app/interfaces/track/track.interface';
import { Artist } from 'src/app/interfaces/artist/artist.interface';
import { Song } from 'src/app/interfaces/song/song.interface';
import { SpotifyPlaybackService } from 'src/app/services/spotify-playback/spotify-playback.service';
import { MatTableDataSource, Sort } from '@angular/material';
import { PlaylistTableData } from 'src/app/interfaces/table/playlist-table-data.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { PlaylistTableService } from 'src/app/services/playlist-table/playlist-table.service';
import { Playlist } from 'src/app/interfaces/playlist/playlist.interface';

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
  public playlist: Playlist;
  private token: string;
  private deviceID: string;
  currentTrack: Object;
  track: Object;
  private currentTrackPosition: number;
  displayedColumns: string[] = ['dupTrack', 'trackPlaying', 'title', 'artist', 'album', 'addedAt', 'time'];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<Object>(true, []);
  source: Array<PlaylistTableData>;

  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute,
    private trackService: TrackService,
    private router: Router,
    private playlistService: PlaylistService,
    private spotifyPlaybackService: SpotifyPlaybackService,
    private playlistTableService: PlaylistTableService) {}

  ngOnInit() {
    this.trackService.checkDuplicate$.subscribe((isDuplicate: boolean) => {
      this.checkDuplicate = isDuplicate;
      const tt = this.source;
      const t = this.trackService.filterDuplicateTracks(tt, isDuplicate);
      this.dataSource.data = t;
    });
    this.playlistTableService.tracks$.subscribe(tracks => this.tracks = tracks);
    this.playlistTableService.playlistInfo$.subscribe(playlistInfo => this.playlist = playlistInfo);
    this.playlistTableService.loading$.subscribe(loading => this.loading = loading);
    this.playlistTableService.tracksLoaded$.subscribe(tracksLoaded => this.tracksLoaded = tracksLoaded);
    this.playlistTableService.getPlayListTracks(this.route).subscribe((data: any) => {
      this.tracks = this.tracks.concat(data.items);
      if (!data['next']) {
        this.loading = false;
        this.tracksLoaded = true;
        this.tracks.forEach((track: Track, index: number) => {
          track.isPlayButtonShowing = false;
          track.isPauseButtonShowing = false;
        });
          this.source = this.tracks.map((t: Track) => {
          return {
            title: t['track'].name,
            artist: this.displayArtists(t['track'].artists).join(''),
            album: t['track'].album.name,
            addedAt: t['added_at'].split('T')[0],
            time: this.convertMS(t['track'].duration_ms),
            isPlayButtonShowing: t.isPlayButtonShowing,
            isPauseButtonShowing: t.isPauseButtonShowing,
            duration: t['track'].duration_ms,
            uri: t['track'].uri,
            track: t
          };
        });
        this.dataSource = new MatTableDataSource(this.source);
      }
    });

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
           this.source = this.tracks.map((t: Track) => {
            return {
              title: t['track'].name,
              artist: this.displayArtists(t['track'].artists).join(''),
              album: t['track'].album.name,
              addedAt: t['added_at'].split('T')[0],
              time: this.convertMS(t['track'].duration_ms),
              isPlayButtonShowing: t.isPlayButtonShowing,
              isPauseButtonShowing: t.isPauseButtonShowing,
              duration: t['track'].duration_ms,
              uri: t['track'].uri,
              track: t
            };
          });
          this.dataSource = new MatTableDataSource(this.source);
          // const numberOfLoops = Math.ceil(this.tracks.length / 50);
          // const trackIDs = this.tracks.map(track => track['track']['id']);
          // for (let i = 0; i < numberOfLoops; i++) {
          //   this.spotifyService.checkSavedTrack(this.token, trackIDs.slice((i * 50), ((i + 1) * 50)).join(','))
          //     .subscribe(trackData =>  {
          //       this.tracks.forEach((track, index) => track['isSaved'] = trackData[index]);
          //     });
          // }
        }
      });
    this.checkDuplicate = false;
    this.deviceID = '';
    this.currentTrack = {track: {name: ''}};
    this.track = {track: {name: ''}};
    this.currentTrackPosition = 0;
    this.spotifyPlaybackService.currentSongState$.subscribe((track: SpotifySongResponse) => {
      if (track.paused) {
        this.currentTrack = {track: {name: ''}};
      } else {
        this.currentTrack = track.track_window.current_track;
      }
    });
    this.spotifyPlaybackService.currentTrackPosition$.subscribe((position: number) => this.currentTrackPosition = position);
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

  getDisplayedColumns() {
    let tt = this.displayedColumns;

    if (!this.checkDuplicate) {
      tt = tt.filter(cd => {
        return cd !== 'dupTrack';
      });
    }

    return tt;
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title': return compare(a.title, b.title, isAsc);
        case 'artist': return compare(a.artist, b.artist, isAsc);
        case 'album': return compare(a.album, b.album, isAsc);
        case 'addedAt': return compare(a.addedAt, b.addedAt, isAsc);
        case 'time': return compare(a.duration, b.duration, isAsc);
        default: return 0;
      }
    });
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

  shortenString(string: string, stringLength: number): string {
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
    this.dataSource.data.forEach(t => {
      if (t === track) {
        t.isPlayButtonShowing = true;
      }
    });
  }

  hidePlayButton(track: Track): void {
    this.dataSource.data.forEach(t => {
      if (t === track) {
        t.isPlayButtonShowing = false;
      }
    });
  }

  showPauseButton(track: Track): void {
    track.isPauseButtonShowing = true;
  }

  hidePauseButton(track: Track): void {
    track.isPauseButtonShowing = false;
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

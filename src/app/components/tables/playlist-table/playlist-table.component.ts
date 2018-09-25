import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../../../services/spotify/spotify.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TrackService} from '../../../services/track/track.service';
import PrettyMS from 'pretty-ms';
import {PlaylistService} from '../../../services/playlist/playlist.service';
import {switchMap} from 'rxjs/internal/operators';
import {concat, of} from 'rxjs';
import {StatusBarService} from '../../../services/status-bar/status-bar.service';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-playlist-table',
  templateUrl: './playlist-table.component.html',
  styleUrls: ['./playlist-table.component.scss']
})
export class PlaylistTableComponent implements OnInit {
  public tracks: Array<Object> = [];
  public loading: boolean;
  public tracksLoaded: boolean;
  public checkDuplicate: boolean;
  public filterTrackName: string;
  public filterTrackArtist: string;
  public playlistName: string;
  public headers: Array<Object>;
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

  constructor(private spotifyService: SpotifyService, private route: ActivatedRoute,
      private trackService: TrackService, private router: Router, private playlistService: PlaylistService, private statusBarService: StatusBarService) {
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
    this.trackService.checkDuplicate$
      .subscribe(isDuplicate => {this.checkDuplicate = isDuplicate; this.headers[0]['show'] = isDuplicate; });
    this.trackService.filterTrackName$.subscribe(name => this.filterTrackName = name);
    this.trackService.filterTrackArtist$.subscribe(artist => this.filterTrackArtist = artist);
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
  }

  ngOnInit() {
    let loggedIn = false;
    let playlist = {};
    this.trackService.currentTrack$.subscribe(track => {
      if (track['paused']) {
        this.currentTrack = {track: {name: ''}};
      } else {
        this.currentTrack = track['track_window']['current_track'];
      }
    });
    this.spotifyService.currentTrackPosition$.subscribe(position => this.currentTrackPosition = position);
    this.spotifyService.getAuthToken()
      .pipe(
        switchMap(spotifyToken => {
          this.token = spotifyToken['token'];
          loggedIn = !!this.token;
          if (loggedIn) {
            return this.route.params;
          } else {
            this.loading = false;
            return of();
          }

        }),
        switchMap(params => {
          return this.playlistService.getSavedPlaylist(params['playlistID']);
        }),
        switchMap(playlistInfo => {
          this.loading = true;
          this.tracksLoaded = false;
          this.tracks = [];
          playlist = playlistInfo;
          const tempList = [];
          if (playlist && loggedIn) {
            const owner = playlist['owner'];
            const playlistID = playlist['playlistID'];
            const playlistLength = playlist['playlistLength'];
            const numberOfTimesToLoop = Math.ceil(playlistLength / 100);
            this.playlistName = playlist['name'];
            this.playlistCover = playlist['playlistCoverURL'];
            this.playlistOwner = playlist['owner'];
            this.playlistService.selectPlaylist(this.playlistName);
            if (playlistInfo['playlistLength'] > 0) {
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
      .subscribe(data => {
        this.tracks = this.tracks.concat(data['items']);
        if (!data['next']) {
          this.loading = false;
          this.tracksLoaded = true;
          this.tracks.forEach((track, index) => {
            this.trackService.saveTrack(playlist['playlistID'], track, index);
            track['isPlayButtonShowing'] = false;
            track['isPauseButtonShowing'] = false;
          });
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
      switchMap(token => {
        this.token = token['token'];
        if (this.token) {
          return this.playlistService.getCurrentDevice();
        } else {
          return of();
        }
      }),
      switchMap(deviceID => {
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
        return this.spotifyService.playSpotifyTrack(this.token, track['track']['uri'], this.deviceID, trackPosition);
      })
    ).subscribe(() => {});

    this.spotifyService.getAuthToken().pipe(
      switchMap(token => {
        this.token = token['token'];
        if (this.token) {
          return this.playlistService.getCurrentDevice();
        } else {
          return of();
        }
      }),
      switchMap(deviceID => {
        this.deviceID = deviceID;
        if (this.deviceID) {
          return this.playlistService.test2$;
        } else {
          return of();
        }
      }),
      switchMap(track => {
        track['isPlayButtonShowing'] = true;
        track['isPauseButtonShowing'] = false;
        this.currentTrack = {track: {name: ''}};
        return this.spotifyService.pauseSpotifyTrack(this.token, this.deviceID);
      })
    ).subscribe(() => {});
  }

  testing(track) {
    console.log('play');
    console.log(track)
    // this.spotifyService.getAuthToken().pipe(
    //   switchMap(token => {
    //     this.token = token['token'];
    //     if (this.token) {
    //       return this.spotifyService.getCurrentSong(this.token);
    //     } else {
    //       return of();
    //     }
    //   })
    // ).subscribe(data => {console.log('player', data); this.statusBarService.setCurrentTrack(data); });
    this.playlistService.test(track);
    // this.statusBarService.setCurrentTrack(track);
  }

  pauseSong(track) {
    console.log('pause');
    this.playlistService.test2(track);
    // this.spotifyService.getAuthToken().pipe(
    //   switchMap(token => {
    //     this.token = token['token'];
    //     if (this.token) {
    //       return this.spotifyService.getCurrentSong(this.token);
    //     } else {
    //       return of();
    //     }
    //   })
    // ).subscribe(data => {console.log('player', data); ; });
    // this.statusBarService.setCurrentTrack(track);
  }

  convertMS(ms) {
    return PrettyMS(ms, { secDecimalDigits: 0 });
  }

  shortenString(string) {
    const stringLength = 25;
    if (string.length > stringLength) {
      return string.substr(0, stringLength) + '...';
    } else {
      return string;
    }
  }

  displayArtists(artists) {
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

  toBeRemoved(track) {
    track['remove'] = !track['remove'];
  }

  goToTrack(track) {
    this.router.navigate(['/track', track.track.id]);
  }

  getPlaylistDuration() {
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

  showPlayButton(track) {
    track.isPlayButtonShowing = true;
  }

  hidePlayButton(track) {
    track.isPlayButtonShowing = false;
  }

  showPauseButton(track) {
    track.isPauseButtonShowing = true;
  }

  hidePauseButton(track) {
    track.isPauseButtonShowing = false;
  }
}

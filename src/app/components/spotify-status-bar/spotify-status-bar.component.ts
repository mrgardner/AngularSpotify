import {Component, OnInit} from '@angular/core';
import {StatusBarService} from '../../services/status-bar/status-bar.service';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {TrackService} from '../../services/track/track.service';
import parseMS from 'parse-ms';
import {of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {SpotifyService} from '../../services/spotify/spotify.service';

@Component({
  selector: 'app-spotify-status-bar',
  templateUrl: './spotify-status-bar.component.html',
  styleUrls: ['./spotify-status-bar.component.scss'],
  animations: [
    trigger('trackAlbumImage', [
      state('active', style({
        transform: 'translateX(-100px)'
      })),
      state('inactive', style({
        transform: 'translateX(0)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class SpotifyStatusBarComponent implements OnInit {
  public currentTrack: Object;
  public imageEnlargeState: string;
  public isEnlargeIconShowing: boolean;
  public currentTrackMinutes: number;
  public currentTrackSeconds: number;
  public trackDurationMinutes: number;
  public trackDurationSeconds: number;
  public aString: string;
  public isSongPaused: boolean;
  public volume: number;
  public availableDevices: any;

  constructor(private statusBarService: StatusBarService, private trackService: TrackService, private spotifyService: SpotifyService) {
    this.imageEnlargeState = 'inactive';
    this.volume = 100;
    this.aString = '';
    this.isEnlargeIconShowing = false;
    this.trackService.trackTime$.subscribe(data => {
      if (data) {
        console.log(data);


      }
    });
    this.statusBarService.enlargePicture$.subscribe(value => this.imageEnlargeState = value ? 'active' : 'inactive');

  }
  ngOnInit() {
    // interval(1000).pipe(startWith(this.currentTrackSeconds)).subscribe(data => console.log(data));
    this.trackService.getNowPlaying().subscribe(song => {
      console.log(this.currentTrack)
      if (this.currentTrack !== song['track_window']['current_track']) {
        if (!song['paused']) {
          console.log(song);
          this.currentTrack = song['track_window']['current_track'];
          this.isSongPaused = song['paused'];
          this.currentTrackMinutes = this.getMinutes(song['position']);
          this.currentTrackSeconds = this.getSeconds(song['position']);
          this.trackDurationMinutes = this.getMinutes(song['duration']);
          this.trackDurationSeconds = this.getSeconds(song['duration']);
        }
        // timer(0, 1000).subscribe(data => console.log(data));
      } else {
        console.log('please don not show');
      }
      // setInterval(this.test2, 1000);
      // timer(6, 1000).subscribe(data => console.log(data));

      // if (this.isSongPaused) {
      //   console.log('sfsdf');
      //   window.clearInterval(this.tt);
      // }
    });
    // that.trackService.currentTrack$.subscribe(song => {
    //   // that.currentTrack = null;
    //   if (song['track_window']['current_track']) {
    //     that.currentTrack = song['track_window']['current_track'];
    //     // that.test = Observable.create()
    //   }
    //   // that.currentTrackMinutes = that.getMinutes(song['position']);
    //   // that.currentTrackSeconds = that.getSeconds(song['position']);
    //   // that.trackDurationMinutes = that.getMinutes(song['duration']);
    //   // that.trackDurationSeconds = that.getSeconds(song['duration']);
    // });
  }

  test(event) {
    console.log(event, 'df');
    // if (that.isSongPaused) {
    //   window.clearInterval(that.tt);
    // } else {
    //   console.log(that.currentTrackSeconds);
    //   if (that.currentTrackSeconds > 59) {
    //     that.currentTrackMinutes += 1;
    //     that.currentTrackSeconds = 0;
    //   }
    //   that.currentTrackSeconds += 1;
    // }
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

  enlargePicture() {
    this.statusBarService.enlargePicture$.emit(true);
  }

  showEnlargeIcon() {
    this.isEnlargeIconShowing = true;
  }

  hideEnlargeIcon() {
    this.isEnlargeIconShowing = false;
  }

  getMinutes(ms) {
    const time = parseMS(ms);
    return (time.days * (60 * 24)) + (time.hours * 60) + (time.minutes);
  }

  getSeconds(ms) {
    const time = parseMS(ms);
    return time.seconds;
  }

  onVolumeChange(event) {
    let spotifyToken = '';
    this.spotifyService.getAuthToken().pipe(
      switchMap(token => {
        const authToken = !!token['token'];
        spotifyToken = token['token'];
        if (authToken) {
          return this.spotifyService.getCurrentPlayer(token['token']);
        } else {
          return of();
        }
      }),
      switchMap(deviceID => {
        if (deviceID) {
          return this.spotifyService.changeSpotifyTrackVolume(spotifyToken, deviceID['device']['id'], event.target.value);
        } else {
          return of();
        }
      })
    ).subscribe(() => {});
  }

  checkPlaybackDevices() {
    console.log('test')
    this.spotifyService.getAuthToken().pipe(
      switchMap(token => {
        const authToken = !!token['token'];
        if (authToken) {
          return this.spotifyService.getAvailableDevices(token['token']);
        } else {
          return of();
        }
      }),
    ).subscribe(data => {
      console.log(data);
      this.availableDevices = data;
    });
  }
}

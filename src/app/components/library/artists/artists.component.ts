import { Component, OnInit } from '@angular/core';
import {switchMap} from "rxjs/internal/operators";
import {concat, of} from "rxjs";
import {SpotifyService} from "../../../services/spotify/spotify.service";

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {
  public loading: boolean;
  public artistsLoaded: boolean;
  public songs: Array<Object> = [];
  public artists: Array<Object> = [];
  public name: string;
  public artistSongCounts: any;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    let loggedIn = false;
    let token = '';
    let numberOfSavedTracks = 0;
    let songInfo = {};
    const tempArtistList = [];
    const tempArtistLists = [];
    this.spotifyService.getAuthToken()
      .pipe(
        switchMap(spotifyToken => {
          token = spotifyToken['token'];
          loggedIn = !!token;
          console.log(spotifyToken)
          if (loggedIn) {
            return this.spotifyService.getUsersSavedTracks(token);
          } else {
            this.loading = false;
            return of();
          }
        }),
        switchMap(savedTracks => {
          this.loading = true;
          this.artistsLoaded = false;
          this.songs = [];
          songInfo = savedTracks;
          const tempList = [];
          if (songInfo && loggedIn) {
            numberOfSavedTracks = songInfo['total'];
            const numberOfTimesToLoop = Math.ceil(numberOfSavedTracks / 50);
            if (numberOfSavedTracks > 0) {
              for (let i = 0; i < numberOfTimesToLoop; i++) {
                const baseURI = `https://api.spotify.com/v1/me/tracks?offset=${i * 50}&limit=50`;
                tempList.push(this.spotifyService.getUsersSavedTracks(token, baseURI));
              }
              return concat(...tempList);
            } else {
              this.loading = false;
              this.artistsLoaded = true;
              return of();
            }
          } else {
            this.loading = false;
            this.artistsLoaded = true;
            return of();
          }
        }),
        switchMap(data => {
          this.artistSongCounts = new Map();
          this.songs = this.songs.concat(data['items']);
          if (!data['next']) {
            // this.albums.forEach(album => {
            //   console.log(album);
            //   tempAlbumList.push()
            // });
            this.songs.forEach(album => {
              // map.set(album['album']['name'], (map.get(album['album']['name']) || 0) + 1)
              album['track']['artists'].forEach(artist => {
                this.artistSongCounts.set(artist['name'], (this.artistSongCounts.get(artist['name']) || 0) + 1)
                // tempArtistList.push(this.spotifyService.getArtist(token, artist['id']));
                const artistObject = {name: artist['name'], id: artist['id']};
                tempArtistList.push(artistObject);
                // if (map.get(artist['name']) === 0 || map.get(artist['name'] === 1)) {
                //   tempArtistList.push(this.spotifyService.getArtist(token, artist['id']));
                // }
              });
            });
            console.log(this.artistSongCounts)
            console.log(tempArtistList)
            // const t = tempArtistList.map(item => item.name);
            const t = tempArtistList.map(function (item) {
              return item.id;
            });
            const tt = t.filter(function(item, index){
              return t.indexOf(item) >= index;
            });
            console.log(tt);

            tt.forEach(id => {
              tempArtistLists.push(this.spotifyService.getArtist(token, id));
            });
            return concat(...tempArtistLists);
          }
          return concat(...tempArtistLists);
        })
      ).subscribe(data => {
        this.artists.push(data);

        if (this.artists.length === tempArtistLists.length) {
          console.log(this.artists);
          this.loading = false;
          this.artistsLoaded = true;
        }
      });
  }

}

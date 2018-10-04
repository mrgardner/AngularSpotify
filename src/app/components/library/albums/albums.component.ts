import { Component, OnInit } from '@angular/core';
import {switchMap} from "rxjs/internal/operators";
import {concat, of} from "rxjs";
import {SpotifyService} from "../../../services/spotify/spotify.service";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  public loading: boolean;
  public albumsLoaded: boolean;
  public albums: Array<Object> = [];
  public isSearchBoxShowing: boolean;
  public name: string;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    let loggedIn = false;
    let token = '';
    let numberOfSavedAlbums = 0;
    let albumInfo = {};
    this.spotifyService.getAuthToken()
      .pipe(
        switchMap(spotifyToken => {
          token = spotifyToken['token'];
          loggedIn = !!token;
          if (loggedIn) {
            return this.spotifyService.getUsersSavedAlbums(token);
          } else {
            this.loading = false;
            return of();
          }
        }),
        switchMap(savedAlbums => {
          this.loading = true;
          this.albumsLoaded = false;
          this.albums = [];
          albumInfo = savedAlbums;
          const tempList = [];
          if (albumInfo && loggedIn) {
            numberOfSavedAlbums = albumInfo['total'];
            const numberOfTimesToLoop = Math.ceil(numberOfSavedAlbums / 50);
            if (numberOfSavedAlbums > 0) {
              for (let i = 0; i < numberOfTimesToLoop; i++) {
                const baseURI = `https://api.spotify.com/v1/me/albums?offset=${i * 50}&limit=50`;
                tempList.push(this.spotifyService.getUsersSavedAlbums(token, baseURI));
              }
              return concat(...tempList);
            } else {
              this.loading = false;
              this.albumsLoaded = true;
              return of();
            }
          } else {
            this.loading = false;
            this.albumsLoaded = true;
            return of();
          }
        })
      )
      .subscribe(data => {
        this.albums = this.albums.concat(data['items']);
        if (!data['next']) {
          this.loading = false;
          this.albumsLoaded = true;
        }
      });
  }

  shortenString(string) {
    const stringLength = 27;
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

  showSearchBox() {
    this.isSearchBoxShowing = true;
  }

  hideSearchBox() {
    this.name = '';
    this.name  = '';
    this.isSearchBoxShowing = false;
  }

  onLoseFocus() {
    if (this.name.length === 0){
      this.hideSearchBox();
    }
  }
}

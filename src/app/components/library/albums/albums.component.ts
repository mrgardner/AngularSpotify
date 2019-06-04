import { Component, OnInit } from '@angular/core';
import {switchMap} from 'rxjs/internal/operators';
import {concat, of} from 'rxjs';
import {SpotifyService} from '../../../services/spotify/spotify.service';
import { Album } from 'src/app/interfaces/album/album.interface';
import { SpotifyAlbumsResponse } from 'src/app/interfaces/album/spotify-albums-response.interface';
import { Artist } from 'src/app/interfaces/artist/artist.interface';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  public loading: boolean;
  public albumsLoaded: boolean;
  public albums: Array<Album> = [];
  public isSearchBoxShowing: boolean;
  public name: string;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    let numberOfSavedAlbums = 0;
    this.spotifyService.getUsersSavedAlbums()
      .pipe(
        switchMap((savedAlbums: SpotifyAlbumsResponse) => {
          this.loading = true;
          this.albumsLoaded = false;
          this.albums = [];
          const tempList = [];
          if (savedAlbums) {
            numberOfSavedAlbums = savedAlbums.total;
            const numberOfTimesToLoop = Math.ceil(numberOfSavedAlbums / 50);
            if (numberOfSavedAlbums > 0) {
              for (let i = 0; i < numberOfTimesToLoop; i++) {
                const baseURI = `https://api.spotify.com/v1/me/albums?offset=${i * 50}&limit=50`;
                tempList.push(this.spotifyService.getUsersSavedAlbums(baseURI));
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
      .subscribe((data: SpotifyAlbumsResponse) => {
        this.albums = this.albums.concat(data.items);
        if (!data.next) {
          this.loading = false;
          this.albumsLoaded = true;
        }
      });
  }

  shortenString(string: string): string {
    const stringLength = 27;
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

  showSearchBox(): void {
    this.isSearchBoxShowing = true;
  }

  hideSearchBox(): void {
    this.name = '';
    this.name  = '';
    this.isSearchBoxShowing = false;
  }

  onLoseFocus(): void {
    if (this.name.length === 0) {
      this.hideSearchBox();
    }
  }
}

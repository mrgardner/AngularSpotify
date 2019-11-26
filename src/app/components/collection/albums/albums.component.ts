import { Component, OnInit, OnDestroy } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { concat, of } from 'rxjs';
import { Album } from '../../../interfaces/album/album.interface';
import { SpotifyAlbumsResponse } from '../../../interfaces/album/spotify-albums-response.interface';
import { UtilService } from '../../../services/util/util.service';
import { ApolloService } from '../../../services/apollo/apollo.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit, OnDestroy {
  public loading: boolean;
  public albumsLoaded: boolean;
  public albums: Array<Album> = [];
  public isSearchBoxShowing: boolean;
  public name: string;
  public albumsSubscription: any;

  constructor(private apolloService: ApolloService, public utilService: UtilService) { }

  ngOnInit() {
    let numberOfSavedAlbums = 0;
    this.albumsSubscription = this.apolloService.getAlbums()
      .pipe(
        switchMap((savedAlbums: SpotifyAlbumsResponse) => {
          this.loading = true;
          this.albumsLoaded = false;
          this.albums = [];
          const tempList = [];
          numberOfSavedAlbums = savedAlbums.total;
          const numberOfTimesToLoop = Math.ceil(numberOfSavedAlbums / 50);
          if (numberOfSavedAlbums > 0) {
            for (let i = 0; i < numberOfTimesToLoop; i++) {
              const baseURI = `https://api.spotify.com/v1/me/albums?offset=${i * 50}&limit=50`;
              tempList.push(this.apolloService.getAlbums(baseURI));
            }
            return concat(...tempList);
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

  ngOnDestroy() {
    this.albumsSubscription.unsubscribe();
  }

  showSearchBox(): void {
    this.isSearchBoxShowing = true;
  }

  hideSearchBox(): void {
    this.name = '';
    this.isSearchBoxShowing = false;
  }

  onLoseFocus(): void {
    if (this.name.length === 0) {
      this.hideSearchBox();
    }
  }
}

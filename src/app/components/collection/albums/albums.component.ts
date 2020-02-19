import { Component, OnInit, OnDestroy } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { concat, of, Subscription } from 'rxjs';
import { UtilService } from '../../../services/util/util.service';
import { ApolloService } from '../../../services/apollo/apollo.service';
import { ApolloAlbumResult, AlbumApollo } from 'src/app/interfaces/apollo/apollo.inerface';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit, OnDestroy {
  public loading: boolean;
  public albumsLoaded: boolean;
  public albums: Array<AlbumApollo> = [];
  public isSearchBoxShowing: boolean;
  public name: string;
  public albumsSubscription: Subscription;

  constructor(private apolloService: ApolloService, public utilService: UtilService) {}

  ngOnInit(): void {
    let numberOfSavedAlbums = 0;
    this.albumsSubscription = this.apolloService.getAlbums()
      .pipe(
        switchMap((savedAlbums: ApolloAlbumResult) => {
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
      .subscribe((data: ApolloAlbumResult) => {
        this.albums = this.albums.concat(data.items);
        if (!data.next) {
          this.loading = false;
          this.albumsLoaded = true;
        }
      });
  }

  ngOnDestroy(): void {
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

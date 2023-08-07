import { Component, OnInit } from '@angular/core';
import { AlbumApollo } from '@app/interfaces/apollo/apollo.inerface';
import { UtilService } from '@app/services/util/util.service';
import { AlbumApiActions } from '@collections/store/actions/album.action';
import { selectAlbums, selectCanLoadMore, selectLoaded, selectLoading } from '@collections/store/selectors/album.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  public loading$: Observable<boolean>;
  public canLoadMore$: Observable<boolean>;
  public albumsLoaded$: Observable<boolean>;
  public albums$: Observable<AlbumApollo[]>;
  public isSearchBoxShowing: boolean;
  public name: string;

  constructor(private store: Store, public utilService: UtilService) { }

  ngOnInit(): void {
    this.store.dispatch(AlbumApiActions.album());
    this.albumsLoaded$ = this.store.select(selectLoaded);
    this.loading$ = this.store.select(selectLoading);
    this.albums$ = this.store.select(selectAlbums);
    this.canLoadMore$ = this.store.select(selectCanLoadMore);
  }

  showSearchBox(): void {
    this.isSearchBoxShowing = true;
  }

  hideSearchBox(): void {
    this.name = '';
    this.isSearchBoxShowing = false;
  }

  loadMoreAlbums() {
    this.store.dispatch(AlbumApiActions.album())
  }

  onLoseFocus(): void {
    if (this.name.length === 0) {
      this.hideSearchBox();
    }
  }
}
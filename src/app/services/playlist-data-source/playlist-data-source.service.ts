import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CollectionViewer } from '@angular/cdk/collections';
import { finalize, catchError } from 'rxjs/operators';
import { PlaylistTableService } from '../playlist-table/playlist-table.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistDataSourceService {
  private tableSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  public tableSubject$ = this.tableSubject.asObservable();

  constructor(private playlistTableService: PlaylistTableService) {}

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.tableSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.tableSubject.complete();
    this.loadingSubject.complete();
  }

  loadSearchResults(taxonomyId: string, startsWith = '', sort = '', page = 0, size = 20) {
    this.loadingSubject.next(true);

    this.playlistTableService.getSearchResultsTableData(taxonomyId, startsWith, sort, page, size).pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(true))
      )
      .subscribe((lessons: any) => {
        this.tableSubject.next(lessons.content);
    });
  }
}

// Common
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

// Services
import { SpotifyPlaybackService } from '@app/services/spotify-playback/spotify-playback.service';
// import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
// import * as fromAuthStore from '@app/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  public loggedIn$: Observable<boolean>;
  public loggedInSubscription: Subscription;

  constructor(
    // private store: Store,
    private spotifyPlaybackService: SpotifyPlaybackService) { }

  ngOnInit(): void {
    // TODO: FIX SELECTORS
    // this.loggedIn$ = this.store.select(fromAuthStore.getLoggedIn);

    this.loggedInSubscription = this.loggedIn$.subscribe(loggedIn => {
      if (loggedIn) {
        this.spotifyPlaybackService.setupPlayer();
      }
    })
  }

  ngOnDestroy(): void {
    this.loggedInSubscription.unsubscribe();
  }

  logout(): void {
    // TODO: FIX SELECTORS
    // this.store.dispatch(new fromAuthStore.Logout());
  }
}

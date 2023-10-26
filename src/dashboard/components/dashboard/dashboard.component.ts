import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SpotifyPlaybackService } from '@app/services/spotify-playback/spotify-playback.service';
import { AuthApiActions } from '@app/store/actions/auth.action';
import { selectLoggedIn } from '@app/store/selectors/auth.selectors';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  public loggedIn$: Observable<boolean>;
  public loggedInSubscription: Subscription;

  constructor(
    private store: Store,
    private spotifyPlaybackService: SpotifyPlaybackService) { }

  ngOnInit(): void {
    this.loggedIn$ = this.store.select(selectLoggedIn);

    this.loggedInSubscription = this.loggedIn$.subscribe(loggedIn => {
      if (loggedIn) {
        this.spotifyPlaybackService.setupPlayer();
      }
    })
  }

  logout(): void {
    this.store.dispatch(AuthApiActions.logout());
  }
}
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, decrement, reset } from '../../actions/counter.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public showDeviceModal: boolean;
  public count$: Observable<number>;
  constructor(private authService: AuthService, private store: Store<{ count: number }>) {
    this.showDeviceModal = false;
    this.count$ = store.pipe(select('count'));
  }

  isLoggedIn(): boolean {
    return !!this.authService.getSpotifyToken();
  }

  increment() {
    this.store.dispatch(increment());
  }
 
  decrement() {
    this.store.dispatch(decrement());
  }
 
  reset() {
    this.store.dispatch(reset());
  }
}

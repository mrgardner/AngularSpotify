import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { selectLoggedIn } from '@app/store/selectors/auth.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  public loggedIn$: Observable<boolean>;
  constructor(
    private store: Store) { }

  ngOnInit(): void {
    this.loggedIn$ = this.store.select(selectLoggedIn);
  }
}
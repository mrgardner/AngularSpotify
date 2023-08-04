// Common
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserApiActions } from '@dashboard/store/actions/user.action';
import { DashboardState } from '@dashboard/store/model';
import { getUserDisplayName } from '@dashboard/store/selectors/user.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-display-user',
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayUserComponent implements OnInit {
  public displayName$: Observable<string>;
  constructor(private store: Store<DashboardState>) { }

  ngOnInit(): void {
    this.displayName$ = this.store.select(getUserDisplayName);
    this.store.dispatch(UserApiActions.loadUser());
  }
}

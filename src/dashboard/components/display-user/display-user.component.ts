// Common
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// NgRx
import { Store } from '@ngrx/store';
import * as fromStore from '@dashboard/store';

@Component({
  selector: 'app-display-user',
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayUserComponent implements OnInit {
  public displayName$: Observable<string>;
  constructor(private store: Store<fromStore.DashboardState>) { }

  ngOnInit(): void {
    this.displayName$ = this.store.select(fromStore.getUserDisplayName);
    this.store.dispatch(new fromStore.LoadUser());
  }
}

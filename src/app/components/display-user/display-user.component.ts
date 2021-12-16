// Common
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// Interfaces
import { UserDisplayName } from '@interfaces/user/user.interface';

// Services
import { ApolloService } from '@services/apollo/apollo.service';

@Component({
  selector: 'app-display-user',
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.scss']
})
export class DisplayUserComponent implements OnInit, OnDestroy {
  public displayName: string;
  public displayNameSubscription: Subscription;
  constructor(private apolloService: ApolloService) { }

  ngOnInit(): void {
    this.displayNameSubscription = this.apolloService.getUserDisplayName()
      .subscribe((user: UserDisplayName) => this.displayName = user.display_name);
  }

  ngOnDestroy(): void {
    this.displayNameSubscription.unsubscribe();
  }
}

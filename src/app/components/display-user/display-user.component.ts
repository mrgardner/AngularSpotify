import { Component, OnInit } from '@angular/core';
import { ApolloService } from '../../services/apollo/apollo.service';
import { UserDisplayName } from '../../interfaces/user/user-display-name';

@Component({
  selector: 'app-display-user',
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.scss']
})
export class DisplayUserComponent implements OnInit {
  public displayName: string;
  constructor(private apolloService: ApolloService) { }

  ngOnInit() {
    this.apolloService.getUserDisplayName().subscribe((user: UserDisplayName) => this.displayName = user.display_name);
  }
}

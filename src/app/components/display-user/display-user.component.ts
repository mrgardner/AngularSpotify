import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify/spotify.service';
import { User } from '../../interfaces/user/user.interface';

@Component({
  selector: 'app-display-user',
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.scss']
})
export class DisplayUserComponent implements OnInit {
  public displayName: string;
  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.spotifyService.getUser().subscribe((user: User) => this.displayName = user.display_name);
  }
}

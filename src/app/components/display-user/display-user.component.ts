import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify/spotify.service';

@Component({
  selector: 'app-display-user',
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.scss']
})
export class DisplayUserComponent implements OnInit {
  public displayName: string;
  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.spotifyService.getUser().subscribe(user => this.displayName = user['display_name']);
  }

}

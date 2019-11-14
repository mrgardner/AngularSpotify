import { Component, OnInit } from '@angular/core';
import { ApolloService } from '../../../services/apollo/apollo.service';
import { UtilService } from '../../../services/util/util.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {
  public artists: Array<Object>;

  constructor(private apolloService: ApolloService, public utilService: UtilService) { }

  ngOnInit() {
    this.apolloService.getFollowedArtists().subscribe(data => this.artists = data.artists.items);
  }

}

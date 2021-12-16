// Common
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// Interfaces
import { Artist } from '@interfaces/artist/artist.interface';

// Services
import { ApolloService } from '@services/apollo/apollo.service';
import { UtilService } from '@services/util/util.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit, OnDestroy {
  public artists: Artist[];
  public artistsSubscription: Subscription;

  constructor(private apolloService: ApolloService, public utilService: UtilService) { }

  ngOnInit(): void {
    this.artistsSubscription = this.apolloService.getFollowedArtists().subscribe(data => this.artists = data.artists.items);
  }

  ngOnDestroy(): void {
    this.artistsSubscription.unsubscribe();
  }
}

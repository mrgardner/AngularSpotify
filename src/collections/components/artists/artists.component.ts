import { Component, OnDestroy, OnInit } from '@angular/core';
import { Artist } from '@app/interfaces/artist/artist.interface';
import { ApolloService } from '@app/services/apollo/apollo.service';
import { UtilService } from '@app/services/util/util.service';
import { Subscription } from 'rxjs';

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
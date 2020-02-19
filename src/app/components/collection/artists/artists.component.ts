import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApolloService } from '../../../services/apollo/apollo.service';
import { UtilService } from '../../../services/util/util.service';
import { Artist } from 'src/app/interfaces/artist/artist.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit, OnDestroy {
  public artists: Array<Artist>;
  public artistsSubscription: Subscription;

  constructor(private apolloService: ApolloService, public utilService: UtilService) {}

  ngOnInit(): void {
    this.artistsSubscription = this.apolloService.getFollowedArtists().subscribe(data => this.artists = data.artists.items);
  }

  ngOnDestroy(): void {
    this.artistsSubscription.unsubscribe();
  }
}

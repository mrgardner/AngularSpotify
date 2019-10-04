import { NgModule } from '@angular/core';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { concat, ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { UtilService } from './util/util.service';
import { HttpHeaders } from '@angular/common/http';

@NgModule({
  imports: [
    HttpLinkModule,
    ApolloModule
  ]
})
export class SpotifyApolloModule {
  constructor(private apollo: Apollo, private httpLink: HttpLink, private utilService: UtilService) {
    const uri = 'http://localhost:4000/graphql'; // <-- add the URL of the GraphQL server here
    const http = this.httpLink.create({uri});
    const authMiddleware = new ApolloLink((operation, forward) => {
      // add the authorization to the headers
      operation.setContext({
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.utilService.getCookie('spotifyToken')}` || null)
      });

      return forward(operation);
    });
    this.apollo.create({
      link: concat(authMiddleware, http),
      cache: new InMemoryCache()
    });
  }
}

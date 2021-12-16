// Common
import { NgModule } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

// Apollo
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { concat, ApolloLink } from 'apollo-link';

// Services
import { UtilService } from '@services/util/util.service';


@NgModule({
  imports: [
    ApolloModule,
    HttpLinkModule
  ]
})
export class SpotifyApolloModule {
  constructor(private apollo: Apollo, private httpLink: HttpLink, private utilService: UtilService) {
    const uri = 'http://localhost:4000/graphql'; // <-- add the URL of the GraphQL server here
    const http = this.httpLink.create({ uri });
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

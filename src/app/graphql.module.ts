// Common
import { NgModule } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

// Apollo
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';


export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const uri = 'http://localhost:4000/graphql'; // <-- add the URL of the GraphQL server here
  const http = httpLink.create({ uri });
  const middleware = new ApolloLink((operation, forward) => {
    const authtoken = sessionStorage.getItem('spotifyToken') || null;
    console.info(authtoken);
    operation.setContext({
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${authtoken}`
      )
    });

    return forward(operation);
  });

  const link = middleware.concat(http);
  return {
    link,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {

}

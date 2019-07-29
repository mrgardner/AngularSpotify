import { TestBed } from '@angular/core/testing';
import { ApolloService } from './apollo.service';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';

describe('ApolloService', () => {
  let apolloService: ApolloService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Apollo
      ]
    });

    apolloService = TestBed.get(ApolloService);
  });

  it('should be created', () => {
    expect(apolloService).toBeTruthy();
  });

  it('should check the getUserDisplayName method', () => {
    const expectedResult = {
      result: {
        data: {
          user: {
            display_name: 'test'
          }
        }
      }
    };
    spyOn(apolloService, 'getUserDisplayName').and.returnValue(of(expectedResult));
    const t = apolloService.getUserDisplayName().subscribe(result => {
      console.log(result);
      expect(result).toEqual(expectedResult);
    });

    console.log(t);
  });
});

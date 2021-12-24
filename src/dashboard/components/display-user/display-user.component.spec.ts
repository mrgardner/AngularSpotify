// Apollo
import { Apollo } from 'apollo-angular';

// Common
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

// Components
import { DisplayUserComponent } from '@dashboard/components/display-user/display-user.component';

// Services
import { ApolloService } from '@app/services/apollo/apollo.service';

// Testing
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

describe('DisplayUserComponent', () => {
  let component: DisplayUserComponent;
  let fixture: ComponentFixture<DisplayUserComponent>;
  let apolloService: ApolloService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        DisplayUserComponent
      ],
      imports: [
        HttpClientModule
      ],
      providers: [
        Apollo
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayUserComponent);
    component = fixture.componentInstance;
    apolloService = TestBed.inject(ApolloService);
  });

  afterEach(() => {
    apolloService = null;
  });

  it('should create display user component', () => {
    expect(component).toBeTruthy();
  });

  it('should check ngOnInit getUser method from spotifyService', () => {
    // const user: UserDisplayName = {
    //   display_name: 'string'
    // };
    // spyOn(apolloService, 'getUserDisplayName').and.returnValue(of(user));
    // component.ngOnInit();
    // expect(component.displayName).toEqual(user.display_name);
  });
});

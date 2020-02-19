import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DisplayUserComponent } from './display-user.component';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { ApolloService } from '../../services/apollo/apollo.service';
import { UserDisplayName } from '../../interfaces/user/user.interface';
import { Apollo } from 'apollo-angular';

describe('DisplayUserComponent', () => {
  let component: DisplayUserComponent;
  let fixture: ComponentFixture<DisplayUserComponent>;
  let apolloService: ApolloService;

  beforeEach(async(() => {
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
    const user: UserDisplayName = {
      display_name: 'string'
    };
    spyOn(apolloService, 'getUserDisplayName').and.returnValue(of(user));
    component.ngOnInit();
    expect(component.displayName).toEqual(user.display_name);
  });
});

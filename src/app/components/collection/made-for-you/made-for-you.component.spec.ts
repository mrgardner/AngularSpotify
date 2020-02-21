// Components
import { MadeForYouComponent } from '@components/collection/made-for-you/made-for-you.component';

// Testing
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


describe('MadeForYouComponent', () => {
  let component: MadeForYouComponent;
  let fixture: ComponentFixture<MadeForYouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MadeForYouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MadeForYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

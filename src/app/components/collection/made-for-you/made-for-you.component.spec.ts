// Components
import { MadeForYouComponent } from '@components/collection/made-for-you/made-for-you.component';

// Testing
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';


describe('MadeForYouComponent', () => {
  let component: MadeForYouComponent;
  let fixture: ComponentFixture<MadeForYouComponent>;

  beforeEach(waitForAsync(() => {
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

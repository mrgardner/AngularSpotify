// Components
import { HighlightSearchComponent } from '@components/highlight-search/highlight-search.component';

// Testing
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('HighlightSearchComponent', () => {
  let component: HighlightSearchComponent;
  let fixture: ComponentFixture<HighlightSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlightSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

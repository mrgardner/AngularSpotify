// Components
import { CollectionComponent } from '@components/collection/collection.component';

// Testing
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';


describe('CollectionComponent', () => {
  let component: CollectionComponent;
  let fixture: ComponentFixture<CollectionComponent>;
  const routes: Routes = [
    {path: 'collection', component: CollectionComponent},
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CollectionComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(routes),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

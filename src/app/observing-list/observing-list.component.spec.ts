import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservingListComponent } from './observing-list.component';

describe('ObservingListComponent', () => {
  let component: ObservingListComponent;
  let fixture: ComponentFixture<ObservingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

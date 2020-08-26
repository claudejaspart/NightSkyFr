import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinocularsComponent } from './binoculars.component';

describe('BinocularsComponent', () => {
  let component: BinocularsComponent;
  let fixture: ComponentFixture<BinocularsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinocularsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinocularsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

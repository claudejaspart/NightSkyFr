import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FovIndicatorsComponent } from './fov-indicators.component';

describe('FovIndicatorsComponent', () => {
  let component: FovIndicatorsComponent;
  let fixture: ComponentFixture<FovIndicatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FovIndicatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FovIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelescopeDetailsComponent } from './telescope-details.component';

describe('TelescopeDetailsComponent', () => {
  let component: TelescopeDetailsComponent;
  let fixture: ComponentFixture<TelescopeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelescopeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelescopeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

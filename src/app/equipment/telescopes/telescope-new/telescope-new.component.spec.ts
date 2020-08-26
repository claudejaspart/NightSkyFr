import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelescopeNewComponent } from './telescope-new.component';

describe('TelescopeNewComponent', () => {
  let component: TelescopeNewComponent;
  let fixture: ComponentFixture<TelescopeNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelescopeNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelescopeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

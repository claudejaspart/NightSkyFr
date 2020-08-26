import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarlowComponent } from './barlow.component';

describe('BarlowComponent', () => {
  let component: BarlowComponent;
  let fixture: ComponentFixture<BarlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

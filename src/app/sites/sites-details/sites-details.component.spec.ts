import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitesDetailsComponent } from './sites-details.component';

describe('SitesDetailsComponent', () => {
  let component: SitesDetailsComponent;
  let fixture: ComponentFixture<SitesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

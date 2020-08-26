import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EyepiecesComponent } from './eyepieces.component';

describe('EyepiecesComponent', () => {
  let component: EyepiecesComponent;
  let fixture: ComponentFixture<EyepiecesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EyepiecesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EyepiecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

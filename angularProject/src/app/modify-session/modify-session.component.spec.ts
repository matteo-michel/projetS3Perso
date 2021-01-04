import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifySessionComponent } from './modify-session.component';

describe('ModifySessionComponent', () => {
  let component: ModifySessionComponent;
  let fixture: ComponentFixture<ModifySessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifySessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifySessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

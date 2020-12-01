import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredSessionsComponent } from './registered-sessions.component';

describe('RegisteredSessionsComponent', () => {
  let component: RegisteredSessionsComponent;
  let fixture: ComponentFixture<RegisteredSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredSessionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

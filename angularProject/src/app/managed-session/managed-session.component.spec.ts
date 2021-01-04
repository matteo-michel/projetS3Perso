import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedSessionComponent } from './managed-session.component';

describe('ManagedSessionComponent', () => {
  let component: ManagedSessionComponent;
  let fixture: ComponentFixture<ManagedSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagedSessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagedSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutdatedSessionComponent } from './outdated-session.component';

describe('OutdatedSessionComponent', () => {
  let component: OutdatedSessionComponent;
  let fixture: ComponentFixture<OutdatedSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutdatedSessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutdatedSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

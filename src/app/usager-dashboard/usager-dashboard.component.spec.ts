import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsagerDashboardComponent } from './usager-dashboard.component';

describe('UsagerDashboardComponent', () => {
  let component: UsagerDashboardComponent;
  let fixture: ComponentFixture<UsagerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsagerDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsagerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

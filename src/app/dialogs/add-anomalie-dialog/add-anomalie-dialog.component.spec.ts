import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnomalieDialogComponent } from './add-anomalie-dialog.component';

describe('AddAnomalieDialogComponent', () => {
  let component: AddAnomalieDialogComponent;
  let fixture: ComponentFixture<AddAnomalieDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAnomalieDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAnomalieDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

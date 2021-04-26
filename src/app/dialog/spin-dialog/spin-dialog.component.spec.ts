import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinDialogComponent } from './spin-dialog.component';

describe('SpinDialogComponent', () => {
  let component: SpinDialogComponent;
  let fixture: ComponentFixture<SpinDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

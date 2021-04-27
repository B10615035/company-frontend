import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseStudentComponent } from './choose-student.component';

describe('ChooseStudentComponent', () => {
  let component: ChooseStudentComponent;
  let fixture: ComponentFixture<ChooseStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

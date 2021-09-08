import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalQuestionListComponent } from './global-question-list.component';

describe('GlobalQuestionListComponent', () => {
  let component: GlobalQuestionListComponent;
  let fixture: ComponentFixture<GlobalQuestionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalQuestionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalQuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

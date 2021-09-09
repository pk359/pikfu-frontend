import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnswerPageComponent } from './add-answer-page.component';

describe('AddAnswerPageComponent', () => {
  let component: AddAnswerPageComponent;
  let fixture: ComponentFixture<AddAnswerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAnswerPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAnswerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

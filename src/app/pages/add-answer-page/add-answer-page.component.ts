import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { apiRoutes } from 'src/app/api-routes';
import { RequestService } from 'src/app/services/request.service';


const forbiddenValueValidator = (values: Array<string>): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = values.indexOf(control.value) !== -1
    return forbidden ? { forbiddenValue: { value: control.value } } : null;
  };
}


@Component({
  selector: 'app-add-answer-page',
  templateUrl: './add-answer-page.component.html',
  styleUrls: ['./add-answer-page.component.scss']
})
export class AddAnswerPageComponent implements OnInit {
  questionId = 0;
  question = '';

  form: FormGroup;
  errorMessage = '';
  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private requestService: RequestService) {
    this.form = this.formBuilder.group({
      answer: ['', [Validators.required, forbiddenValueValidator(['yes', 'no', `that's fine`, `I don't know`])]]
    })
  }

  async ngOnInit() {
    this.questionId = this.activatedRoute.snapshot.params.questionId;
    this.question = (await this.requestService.send<{ data: { question: string } }>('GET', `${apiRoutes.getQuestion}?questionId=${this.questionId}`)).data.question

  }

  get answer(): any {
    return this.form.controls.answer;
  }

  async submitAnswer() {
    if (this.form.invalid) {
      return;
    }

    const { data, error } = (await this.requestService.send<{ data: { successful: boolean }, error: { message: string } }>('POST', apiRoutes.submitAnswerApi, {
      body: {...this.form.value, questionId: this.questionId}
    }))

    const successful = data?.successful;

    if (successful) {
      alert('Your answer was posted successfully.')
    }

    if (!successful) {
      this.errorMessage = error.message;
      setTimeout(() => {
        this.errorMessage = '';
      }, 2000)
    }
  }

}

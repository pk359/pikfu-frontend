import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { apiRoutes } from 'src/app/api-routes';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-add-answer-page',
  templateUrl: './add-answer-page.component.html',
  styleUrls: ['./add-answer-page.component.scss']
})
export class AddAnswerPageComponent implements OnInit {
  questionId = 0;
  question = '';

  constructor(private activatedRoute: ActivatedRoute, private requestService: RequestService) { }

  async ngOnInit() {
    this.questionId = this.activatedRoute.snapshot.params.questionId;
    this.question = (await this.requestService.send<{ data: { question: string } }>('GET', `${apiRoutes.getQuestion}?questionId=${this.questionId}`)).data.question

  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { apiRoutes } from 'src/app/api-routes';
import { IAnswer, IAnswers } from 'src/app/models';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-question-detail-page',
  templateUrl: './question-detail-page.component.html',
  styleUrls: ['./question-detail-page.component.scss']
})
export class QuestionDetailPageComponent implements OnInit {

  questionId = 0;
  question = ''
  answers: IAnswers = [];
  constructor(private activatedRoute: ActivatedRoute, private requestService: RequestService) { }

  async ngOnInit() {
    this.questionId = this.activatedRoute.snapshot.params.questionId;
    this.question =  (await this.requestService.send<{data: {question: string}}>('GET', `${apiRoutes.getQuestion}?questionId=${this.questionId}`)).data.question
    this.answers =  (await this.requestService.send<{data: {list: IAnswers}}>('GET', `${apiRoutes.getAnswers}/?questionId=${this.questionId}`)).data.list
    
  }

  trackAnswerByFn(index: number, item: IAnswer) {
    return item.postedBy;
  }

}

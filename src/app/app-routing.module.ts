import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAnswerPageComponent } from './pages/add-answer-page/add-answer-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { QuestionDetailPageComponent } from './pages/question-detail-page/question-detail-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AuthGuardService } from './services/auth-guard.service';

export const routePaths = {
  questionDetailPage: 'question-detail',
  addAnswerPage: 'add-answer',
  loginPage: 'login',
  registerPage: 'register'
}
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: `${routePaths.questionDetailPage}/3`
  },
  {
    path: `${routePaths.questionDetailPage}/:questionId`,
    component: QuestionDetailPageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: `${routePaths.addAnswerPage}/:questionId`,
    component: AddAnswerPageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: routePaths.loginPage,
    component: LoginPageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: routePaths.registerPage,
    component: RegisterPageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: `${routePaths.questionDetailPage}/3`
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

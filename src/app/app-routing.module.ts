import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { QuestionDetailPageComponent } from './pages/question-detail-page/question-detail-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AuthGuardService } from './services/auth-guard.service';

export const routePaths = {
  questionDetailPage: 'question-detail',
  loginPage: 'login', 
  registerPage: 'register'
}
const routes: Routes = [
  {
    path: '', 
    pathMatch: 'full', 
    redirectTo: routePaths.questionDetailPage
  }, 
 {
   path: routePaths.questionDetailPage, 
   component: QuestionDetailPageComponent, 
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
    redirectTo: routePaths.questionDetailPage
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

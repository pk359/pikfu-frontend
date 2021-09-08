import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GlobalQuestionListComponent } from './pages/global-question-list/global-question-list.component';
import { LoginComponent } from './pages/login/login.component';
import { MyQuestionListComponent } from './pages/my-question-list/my-question-list.component';
import { PostQuestionComponent } from './pages/post-question/post-question.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuardService } from './services/auth-guard.service';

export const routePaths = {
  dashboardPage: 'dashboard', 
  postQuestionPage: 'post-question', 
  userQuestionListPage: 'user-question-list', 
  globalQuestionListPage: 'global-question-list', 
  loginPage: 'login', 
  registerPage: 'register'
}
const routes: Routes = [
  {
    path: '', 
    pathMatch: 'full', 
    redirectTo: routePaths.dashboardPage
  }, 
  {
    path: routePaths.dashboardPage, 
    component: DashboardComponent, 
    canActivate: [AuthGuardService]
  }, 
  {
    path: routePaths.loginPage, 
    component: LoginComponent
  }, 
  {
    path: routePaths.registerPage, 
    component: RegisterComponent
  }, 
  {
    path: routePaths.userQuestionListPage, 
    component: MyQuestionListComponent, 
    canActivate: [AuthGuardService]
  }, 
  {
    path: routePaths.postQuestionPage, 
    component: PostQuestionComponent, 
    canActivate: [AuthGuardService]
  }, 
  {
    path: routePaths.globalQuestionListPage, 
    component: GlobalQuestionListComponent, 
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

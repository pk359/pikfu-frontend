import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
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
    path: routePaths.loginPage, 
    component: LoginComponent, 
    canActivate: [AuthGuardService]
  }, 
  {
    path: routePaths.registerPage, 
    component: RegisterComponent, 
    canActivate: [AuthGuardService]
  }, 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

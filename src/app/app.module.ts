import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { GlobalQuestionListComponent } from './pages/global-question-list/global-question-list.component';
import { MyQuestionListComponent } from './pages/my-question-list/my-question-list.component';
import { PostQuestionComponent } from './pages/post-question/post-question.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { httpInterceptors } from './interceptors/http';

@NgModule({
  declarations: [
    AppComponent,
    GlobalQuestionListComponent,
    MyQuestionListComponent,
    PostQuestionComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [httpInterceptors],
  bootstrap: [AppComponent]
})
export class AppModule { }

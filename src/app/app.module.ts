import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptors } from './interceptors/http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GlobalQuestionListComponent } from './pages/global-question-list/global-question-list.component';
import { LoginComponent } from './pages/login/login.component';
import { MyQuestionListComponent } from './pages/my-question-list/my-question-list.component';
import { PostQuestionComponent } from './pages/post-question/post-question.component';
import { RegisterComponent } from './pages/register/register.component';


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
    AppRoutingModule, 
    HttpClientModule, 
    ReactiveFormsModule, 
    FlexLayoutModule
  ],
  providers: [httpInterceptors],
  bootstrap: [AppComponent]
})
export class AppModule { }

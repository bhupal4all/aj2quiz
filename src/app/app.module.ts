import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { HomeComponent } from './home/home.component';
import { QuestionComponent } from './new/question/question.component';
import { QuizComponent } from './quiz/quiz/quiz.component';
import { PracticeComponent } from './quiz/practice/practice.component';
import { ReviewComponent } from './quiz/review/review.component';
import { ErrorComponent } from './error/error.component';
import { CategoryComponent } from './new/category/category.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuestionComponent,
    QuizComponent,
    PracticeComponent,
    ReviewComponent,
    ErrorComponent,
    CategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

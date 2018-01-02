import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuestionComponent } from './new/question/question.component';
import { ReviewComponent } from './quiz/review/review.component';
import { PracticeComponent } from './quiz/practice/practice.component';
import { QuizComponent } from './quiz/quiz/quiz.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'new', component: QuestionComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'practice', component: PracticeComponent },
  { path: 'review', component: ReviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../service/quiz.service';
import { QuizComponent } from '../../quiz/quiz/quiz.component';
import { Quiz } from '../../model/index';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [QuizService]
})
export class CategoryComponent implements OnInit {

  quiz: Quiz;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.quiz = new Quiz({});
  }

  saveQuiz() {
    if (this.quiz.name.length > 0 && this.quiz.description.length > 0) {
      this.quizService.saveQuiz(this.quiz).subscribe(res => {
        console.log('saved' + res);
        this.quiz = new Quiz({});
      });
    }
  }

}

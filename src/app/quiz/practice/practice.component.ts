import { Component, OnInit, HostListener } from '@angular/core';
import { QuizComponent } from '../quiz/quiz.component';
import { QuizService } from '../../service/quiz.service';
import { Question } from '../../model/index';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css'],
  providers: [QuizService]
})
export class PracticeComponent extends QuizComponent {
  isCorrect: boolean = undefined;
  showHint: boolean = undefined;

  goToQuestion(index: number) {
    this.isCorrect = undefined;
    this.showHint = undefined;
    super.goToQuestion(index);    
  }

  checkAnswer(question: Question) {
    this.isCorrect = true;
    question.options.forEach((x) => {
      if (this.isCorrect && x.selected !== x.isAnswer) {
        this.isCorrect = false;
      }
    });
  }

  @HostListener('document:keypress', ['$event', 'index'])
  eventHandler(event: KeyboardEvent, index: number) {
    console.log(event, event.keyCode, index);
 } 
}

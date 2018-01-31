import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable'

import { Option, Question, Quiz, QuizConfig, Pager } from '../../model/index';
import { QuizService } from '../../service/quiz.service';
import { HelperService } from '../../service/helper.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuizService, HelperService]
})
export class QuizComponent implements OnInit {
  Math: any;
  quizes: Quiz[] = [];
  quiz: Quiz = new Quiz({});
  quizName: string;
  config: QuizConfig = new QuizConfig({});
  // quizCount: number = 0;
  // countDown: number;
  timer = 60;
  quizSize = 5;
  isStarted: boolean = false;
  currTab: string = 'settings';
  isSubmitted: boolean = false;

  previous: number = 0;
  next: number = 0;

  pager: Pager = {
    index: 0,
    size: 5,
    count: 1
  };

  questionsAnswered: number = 0;

  constructor(private quizService: QuizService, private helperService: HelperService) {
    this.Math = Math;
  }

  ngOnInit() {
    this.quizService.getQuizs().subscribe(res => {
      res.forEach(element => {
        this.quizes.push(new Quiz(element));
      });
    });
  }

  startQuiz() {
    this.loadQuiz();
    this.isStarted = true;
    this.currTab = 'quiz';
  }

  loadQuiz() {
    this.pager.index = 0;
    this.quiz.questions = [];
 
    this.quizService.getQuizQuestions(this.quiz).subscribe(data => {
      data.forEach(json=>{
        this.quiz.questions.push(new Question(json));  
      });
      
      this.pager.count = this.quiz.questions.length / this.config.pageSize;
      let trueVar: boolean = true;
  
      if (this.config.shuffleQuestions === trueVar) {
        console.log('Questions Shuffled')
        this.quiz.questions = this.helperService.shuffleQuestions(this.quiz);
      }
  
      if (this.config.shuffleOptions === trueVar) {
        console.log('Options Shuffled')
        this.quiz = this.helperService.shuffleOptions(this.quiz);
      }
  
      if (this.quizSize > 0) {
        this.quiz.questions = this.quiz.questions.slice(0, this.quizSize);
        this.pager.count = this.quiz.questions.length;
      }
    });
  }

  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.config.pageSize) : [];
  }

  goToQuestion(index: number) {
    this.pager.index = index >= 0 ? (index <= this.pager.count ? index : this.pager.count) : 0;

    if (this.pager.index == this.pager.count) {
      this.previous = this.pager.index - this.pager.size;
    } else if (this.pager.index == 0) {
      this.previous = 0;
    } else {
      this.previous = this.pager.index - this.pager.index % this.pager.size;
    }
  }

  onSelect(question: Question, option: Option) {
    if (!question.answered) {
      this.questionsAnswered++;
    }

    question.answered = true;
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => {
        if (x.id !== option.id || x.name !== option.name)
          x.selected = false;
        else
          x.selected = true;
      });

      if (this.config.autoMove) {
        if (this.pager.index < this.pager.count - 1) {
          this.pager.index++;
        }
        this.goToQuestion(this.pager.index);

        if (this.pager.index === this.pager.count - 1) {
          this.submitQuiz();
        }
      }
    }
  }

  submitQuiz() {
    this.currTab = 'review';
    this.isSubmitted = true;
    let skipRest = false;
    this.quiz.questions.forEach(question => {
      question.isCorrect = false;
      question.options.forEach(option => {
        if (!skipRest) {
          if (option.selected && option.selected === option.isAnswer) {
            question.isCorrect = true;
          } else if (option.selected && option.selected !== option.isAnswer) {
            question.isCorrect = false;
          } else if (option.isAnswer && !option.selected) {
            question.isCorrect = false;
          }

          if (question.isCorrect == false) {
            skipRest = true;
          }
        }
      });
    });
  }

  changeTab(tabName) {
    this.currTab = tabName;
  }
}

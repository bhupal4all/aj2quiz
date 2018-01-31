import { Component, OnInit } from '@angular/core';
import { Question, Quiz } from '../../model/index';
import { QuizService } from '../../service/quiz.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  providers: [QuizService]
})
export class QuestionComponent implements OnInit {
  quizes: Quiz[] = [];
  question: Question;
  tempString: string = '';
  message: string = '';

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.quizService.getQuizs().subscribe(res => {
      res.forEach(element => {
        this.quizes.push(new Quiz(element));
      });
    });

    this.question = new Question({
      "name": "",
      "options": [
      ],
      "hint": "",
      "explanation": ""
    });
  }

  addOption = function () {
    this.question.options.push({
      name: '',
      isAnswer: false
    });
  }

  resetData = function () {
    this.question = new Question({
      "name": "",
      "options": [
      ],
      "hint": "",
      "explanation": ""
    });
    this.tempString = "";
  }

  saveQuestion = function () {
    this.question.options = this.question.options.filter(function (option, index, array) {
      return option.name !== '';
    });

    let answerCount = 0;
    this.question.options.forEach(element => {
      if (element.isAnswer)
        answerCount++;
    });

    if (answerCount == 1)
      this.question.questionTypeId = 1;
    else if (answerCount > 1)
      this.question.questionTypeId = 2;
    else
      this.message = 'At least one answer must select';

    if (answerCount > 0) {
      this.quizService.save(this.question).then(res => {
        let qId = this.question.quizId || 0;
        let qKey = this.question.quizKey;
        this.question = new Question({
          "name": "",
          "options": [
          ],
          "hint": "",
          "explanation": ""
        });
        this.question.quizId = qId;
        this.question.quizKey = qKey;
        this.tempString = "";
        this.message = '';
      });
    }
  }

  parse = function () {
    let arr = this.tempString.split(/[ABCDEFG]+\.[ ]/);

    this.question.name = arr[0];
    for (let idx = 1; idx < arr.length; idx++) {
      this.question.options.push({
        name: arr[idx],
        isAnswer: false
      });
    }
  }

}

import { Injectable } from '@angular/core';
import { Quiz, Question } from '../model/index';

@Injectable()
export class HelperService {

  constructor() { }

  shuffleQuestions(quiz: Quiz) {
    let rand;
    let tmp;
    let len = quiz.questions.length;
    let ret = quiz.questions.slice();

    while (len) {
      rand = Math.floor(Math.random() * len--);
      tmp = ret[len];
      ret[len] = ret[rand];
      ret[rand] = tmp;
    }

    return ret;
  }

  shuffleOptions(quiz: Quiz) {
    quiz.questions.forEach(question => {
      let rand;
      let tmp;
      let len = question.options.length;
      let ret = question.options.slice();

      while (len) {
        rand = Math.floor(Math.random() * len--);
        tmp = ret[len];
        ret[len] = ret[rand];
        ret[rand] = tmp;
      }

      question.options = ret;
    });

    return quiz;
  }

}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Question } from "../model/question";
import { Quiz } from '../model/index';

@Injectable()
export class QuizService {

  constructor(private http: Http) { }

  getQuizs() {
    return this.http.get("http://localhost:3000/quiz").map(res => res.text().length > 0 ? res.json() : null);
  }

  getQuizQuestions(id: number) {
    return this.http.get("http://localhost:3000/quiz/" + id + "/questions").map(res => res.text().length > 0 ? res.json() : null);
  }

  get(url: string) {
    return this.http.get(url).map(res => res.text().length > 0 ? res.json() : null);
  }

  save(question: Question) {
    return this.http.post('http://localhost:3000/questions', question).map(res => res.text().length > 0 ? res.json() : null);
  }

  saveQuiz(quiz: Quiz) {
    return this.http.post('http://localhost:3000/quiz', quiz).map(res => res.text().length > 0 ? res.json() : null);
  }
}

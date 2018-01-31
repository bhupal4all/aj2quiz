import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Quiz, Question } from '../model/index';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class QuizService {
  user: Observable<firebase.User>;
  questionsRef: any;
  quizRef: any;
  
  constructor(private http: Http, public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    this.quizRef = this.af.database.ref('/quiz');
    this.questionsRef = this.af.database.ref('/questions');
   }

  getQuizs() {
    return this.af.list('/quiz');
    // return this.http.get("http://localhost:3000/quiz").map(res => res.text().length > 0 ? res.json() : null);
  }

  getQuizQuestions(quiz: Quiz) {   
    return this.af.list('/questions', {
      query: {
        orderByChild: 'quizKey',
        equalTo: quiz.key
      }
    });
  }

  get(url: string) {
    return this.http.get(url).map(res => res.text().length > 0 ? res.json() : null);
  }

  save(question: Question) {
    let ref = this.questionsRef.push(question);
    return ref;
    // return this.http.post('http://localhost:3000/questions', question).map(res => res.text().length > 0 ? res.json() : null);
  }

  saveQuiz(quiz: Quiz) {   
    let ref = this.quizRef.push(quiz);
    return ref;
    // return this.http.post('http://localhost:3000/quiz', quiz).map(res => res.text().length > 0 ? res.json() : null);
  }
}

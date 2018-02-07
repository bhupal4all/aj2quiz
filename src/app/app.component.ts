import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AngularFireDatabase]
})
export class AppComponent {
  title = 'Quiz Application';
  timerInSecs = 0;

  counterChanged: Subject<any> = new Subject();

  notifyChildren() {
    this.counterChanged.next(this.timerInSecs);
  }

  timerEnded: Subject<any> = new Subject();

  callTimerEnd(obj:any){
    this.timerEnded.next('');
  }
}

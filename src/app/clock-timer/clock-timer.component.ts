import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { SimpleTimer } from 'ng2-simple-timer';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-clock-timer',
  templateUrl: './clock-timer.component.html',
  styleUrls: ['./clock-timer.component.css']
})
export class ClockTimerComponent implements OnInit {
  timer: SimpleTimer;
  timerId: string;
  timedDisplay: string = '0:0:0';

  @Output('complete')
  complete = new EventEmitter();

  @Input()
  format: string = 'clock';

  @Input()
  completeMessage: string = 'Time Completed';

  @Input()
  warning: number = 60;

  @Input()
  counter: number;

  @Input()
  counterChanged: Subject<any>;

  timerName: string = 'QuizTimer';

  ngOnInit() {
    this.timer = new SimpleTimer();

    this.getFormat();
    this.counterChanged.subscribe(time => {
      this.stopTimer();
      if (time > 0) {
        this.counter = time;
        this.start();
      }
    })
  }

  start = function () {
    console.log('Strating timer for ' + this.counter);
    this.timer.newTimer(this.timerName, 1);

    this.stopTimer();
    this.timerId = this.timer.subscribe(this.timerName, () => this.countdown());
    console.log('Current Timers ' + this.timerId);
  }

  stopTimer() {
    if (this.timerId) {
      console.log(this.timerId + ' timer stopped');
      console.log(this.timer.getTimer());
      this.timer.unsubscribe(this.timerId);
      this.timerId = undefined;
      this.counter = 0;

      if (this.completeMessage !== undefined)
        this.timedDisplay = this.completeMessage;
    }
  }

  getFormat = function () {
    if (this.counter !== undefined) {
      if (this.format !== undefined) {
        let sec = this.counter;
        let mins = Math.floor(sec / 60);
        if (mins > 0) {
          sec = sec - (mins * 60);
        }

        let hours = Math.floor(mins / 60);
        if (hours > 0)
          mins = mins - (hours * 60);

        this.timedDisplay = (hours < 10 ? '0' + hours : hours) + ':' + (mins < 10 ? '0' + mins : mins) + ':' + (sec < 10 ? '0' + sec : sec);
      } else {
        this.timedDisplay = this.counter + 's';
      }
    }
  }

  countdown = function () {
    this.counter--;

    this.getFormat();

    if (this.counter < 0) {
      this.stopTimer();

      console.log('Timer Finsihed');
      this.complete.emit({});
    }
  }


}

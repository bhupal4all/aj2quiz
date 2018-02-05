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
  format: String = 'clock';

  @Input()
  completeMessage: String = 'Time Completed';

  @Input()
  warning: number = 60;

  @Input()
  counter: number;

  @Input()
  counterChanged: Subject<any>;

  ngOnInit() {
    this.timer = new SimpleTimer();

    if (this.counter !== undefined && this.counter > 0)
      this.start();
    else
      this.getFormat();

    this.counterChanged.subscribe(event =>{
      this.start();
    })
  }

  start = function () {
    this.timer.newTimer('1sec', 1);
    this.timerId = this.timer.subscribe('1sec', () => this.countdown());
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

    if (this.counter <= 0) {
      this.timer.unsubscribe(this.timerId);
      this.timerId = undefined;
      this.timer.delTimer('1sec');

      if (this.completeMessage !== undefined)
        this.timedDisplay = this.completeMessage;

      this.complete.emit({});
    }
  }


}

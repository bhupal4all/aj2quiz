import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ AngularFireDatabase]
})
export class AppComponent {
  title = 'Quiz Application';
}

import { Component, Input } from '@angular/core';
import { Feedback } from 'src/app/interfaces/responseType';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {

  @Input() feedback:Feedback;
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from 'src/store';

@Component({
  selector: 'app-schedule-controls',
  templateUrl: './schedule-controls.component.html',
  styleUrls: ['./schedule-controls.component.scss']
})
export class ScheduleControlsComponent {

  offSet = 0;

  @Input()
  selected!: Date;

  @Output()
  move = new EventEmitter<number>();

  moveDate(offSet: number) {
    this.offSet = offSet;
    this.move.emit(offSet);
  }
}

import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { Meal } from 'src/app/health/shared/services/meals/meals.service';
import { Workout } from 'src/app/health/shared/services/workouts/workouts.service';

@Component({
  selector: 'app-schedule-assign',
  templateUrl: './schedule-assign.component.html',
  styleUrls: ['./schedule-assign.component.scss']
})
export class ScheduleAssignComponent implements OnChanges {

  @Input()
  section!: string;

  @Input()
  assigned!: string[];

  @Input()
  type!: string;

  @Input()
  date!: Date | null;

  @Input()
  list!: any;

  @Output()
  update = new EventEmitter<any>;

  @Output()
  cancel = new EventEmitter<any>;

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.section, this.type, this.date, this.list)
  }

  getRoute(type: string) {
    return type === 'meals'? '/meals/add' : '/workouts/add'; 
  }

  updateAssign() {
    this.update.emit({
      section: this.section,
      type: this.type, 
      assigned: this.assigned.sort()
    })
  }

  cancelAssign() {
    this.cancel.emit()
  }

  exists(id: string) {
    return this.assigned.includes(id);
  }

  toggleItem(id: string) {
    if(this.assigned.includes(id))  {
      this.assigned.splice(this.assigned.indexOf(id), 1);
    } else {
      this.assigned.push(id);
    }
  }
}

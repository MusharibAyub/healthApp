import { Component, EventEmitter, Input, Output } from '@angular/core';

import { scheduleDetail } from 'src/app/health/shared/services/schedule/schedule.service';

@Component({
  selector: 'app-schedule-section',
  templateUrl: './schedule-section.component.html',
  styleUrls: ['./schedule-section.component.scss']
})
export class ScheduleSectionComponent {

  @Input()
  name!: string;

  @Input()
  section!: string;

  @Input()
  scheduleDetail!: scheduleDetail | null;

  @Output()
  select = new EventEmitter<any>

  onSelect(type: string, assigned: string[] = []) {
    this.select.emit({type, assigned, section: this.section});
  }
}

import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';

import { scheduleDetail } from 'src/app/health/shared/services/schedule/schedule.service';

import { Store } from 'src/store';

@Component({
  selector: 'app-schedule-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule-section.component.html',
  styleUrls: ['./schedule-section.component.scss']
})
export class ScheduleSectionComponent implements OnChanges{

  mealNames!: string[];
  workoutNames!: string[];

  @Input()
  name!: string;

  @Input()
  section!: string;

  @Input()
  scheduleDetail!: scheduleDetail | null;

  @Output()
  select = new EventEmitter<any>

  constructor(
    private store: Store
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.mealNames = this.store.value.meals.filter((obj: any) => this.scheduleDetail?.meals?.includes(obj.id)).map((obj: any) => obj.name);
    this.workoutNames = this.store.value.workouts.filter((obj: any) => this.scheduleDetail?.workouts?.includes(obj.id)).map((obj: any) => obj.name);
  }

  onSelect(type: string, assigned: string[] = []) {
    this.select.emit({type, assigned, section: this.section});
  }
}

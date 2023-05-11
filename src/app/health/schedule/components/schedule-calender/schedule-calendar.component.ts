import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { Schedule } from 'src/app/health/shared/services/schedule/schedule.service';

@Component({
  selector: 'app-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss']
})
export class ScheduleCalendarComponent implements OnChanges{

  selectedDayIndex!: number;
  selectedDay!: Date;
  selectedWeek!: Date;

  sections = [
    { key: 'morning', name: 'Morning' },
    { key: 'lunch', name: 'Lunch' },
    { key: 'evening', name: 'Evening' },
    { key: 'snacks', name: 'Snacks and Drinks' }
  ]

  @Input()
  set date(date: Date | null) {
    this.selectedDay = date ? new Date(date.getTime()) : new Date();
  }

  @Input()
  schedule!: Schedule | null;

  @Output()
  change = new EventEmitter<Date>;

  @Output()
  select = new EventEmitter<any>

  ngOnChanges(changes: SimpleChanges): void {
    this.selectedDayIndex = this.getToday(this.selectedDay);
    this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));
  }

  onChange(weekOffSet: number) {
    const startOfWeek = this.getStartOfWeek(new Date());
    const startDate = (new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate()));
    startDate.setDate(startDate.getDate() + (weekOffSet * 7));
    this.change.emit(startDate)
  }

  selectDay(index: number) {
    const selectedDay = new Date(this.selectedWeek);
    selectedDay.setDate(selectedDay.getDate() + index);
    this.change.emit(selectedDay)
  }

  private getToday(date: Date) {
    let today = date.getDay() - 1;
    if(today < 0) {
      today = 6;
    }
    return today
  }

  private getStartOfWeek(date: Date) {
    const day = date.getDay();
    const diff = date.getDate() - day + ( day === 0? -6: 1);
    return new Date(date.setDate(diff));
  }

  onSelect(data: any) {
    this.select.emit(data);
  }
}

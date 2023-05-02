import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {

  toggled = false

  @Input()
  item: any;

  @Output()
  remove = new EventEmitter<string>

  removeItem() {
    this.remove.emit(this.item.id);
  }

  toggle() {
    this.toggled = !this.toggled
  }
}

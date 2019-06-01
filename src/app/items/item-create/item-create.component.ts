import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Item } from '../item.model';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent {
  enteredTitle = '';
  enteredContent = '';
  @Output() itemCreated = new EventEmitter<Item>();

  onAddItem(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const item = {
      title: form.value.title,
      content: form.value.content
    };
    this.itemCreated.emit(item);
  }
}

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Item } from '../item.model';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent {
  enteredTitle = '';
  enteredContent = '';

constructor(public itemsService: ItemsService) {}

  onAddItem(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.itemsService.addItems(form.value.title, form.value.content);
  }
}

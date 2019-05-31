import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent {
  enteredTitle = '';
  enteredContent = '';
  @Output() itemCreated = new EventEmitter();

  onAddItem(itemInput: HTMLTextAreaElement){
    const item = {
      title: this.enteredTitle,
      content: this.enteredContent
    };
    this.itemCreated.emit(item);
  }
}

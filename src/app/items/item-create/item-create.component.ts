import { Component } from '@angular/core';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent {
  enteredValue = '';
  newItem = 'NO CONTENT';

  onAddItem(itemInput: HTMLTextAreaElement){
    this.newItem = this.enteredValue;
  }

}

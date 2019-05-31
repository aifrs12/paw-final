import { Component } from '@angular/core';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html'
})
export class ItemCreateComponent {
  newItem = 'NO CONTENT';

  onAddItem(itemInput: HTMLTextAreaElement){
    console.dir(itemInput);
    this.newItem = 'Artigo anunciado.';
  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html'
})
export class ItemCreateComponent {
  onAddItem(){
    alert('Artigo adicionado com sucesso!');
  }

}

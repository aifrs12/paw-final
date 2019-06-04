import { Component, Input } from '@angular/core';

import { Item } from '../item.model';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent {
 /* items = [
    {title: 'Leilão numero 1', content: 'Este é o Leilão numero 1'},
    {title: 'Leilão numero 2', content: 'Este é o Leilão numero 2'},
    {title: 'Leilão numero 3', content: 'Este é o Leilão numero 3'},
  ]
  */

  @Input() items: Item[] = [];

  constructor(public itemsService: ItemsService) {}

}

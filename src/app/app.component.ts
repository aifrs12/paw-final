import { Component } from '@angular/core';

import { Item } from './items/item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storedItems: Item[] = [];

  onItemAdded(item) {
    this.storedItems.push(item);
  }
}

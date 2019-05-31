import { Component } from '@angular/core';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent {
  items = [
    {title: 'Artigo numero 1', content: 'Este é o artigo numero 1'},
    {title: 'Artigo numero 2', content: 'Este é o artigo numero 2'},
    {title: 'Artigo numero 3', content: 'Este é o artigo numero 3'},
  ]

}

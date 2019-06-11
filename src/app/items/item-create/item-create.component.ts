import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Item } from '../item.model';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  item: Item;
  private mode = 'create';
  private itemId: string;

constructor(public itemsService: ItemsService, public route: ActivatedRoute) {}

ngOnInit() {
  this.route.paramMap.subscribe((paramMap: ParamMap) => {
    if (paramMap.has('itemId')) {
        this.mode = 'edit';
        this.itemId = paramMap.get('itemId');
        this.item = this.itemsService.getItem(this.itemId);
    } else {
        this.mode = 'create';
        this.itemId = null;
    }
  });
}
  onAddItem(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.itemsService.addItems(form.value.title, form.value.content);
  }
}

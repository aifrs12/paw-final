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
  private mode = 'create';
  private leilaoId: string;
  private item: Item;

constructor(public itemsService: ItemsService, public route: ActivatedRoute) {}

ngOnInit() {
  this.route.paramMap.subscribe((paramMap: ParamMap) => {
    if (paramMap.has('leilaoId')) {
        this.mode = 'edit';
        this.leilaoId = paramMap.get('leilaoId');
        this.item = this.itemsService.getItem(this.leilaoId);
    } else {
        this.mode = 'create';
        this.leilaoId = null;
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

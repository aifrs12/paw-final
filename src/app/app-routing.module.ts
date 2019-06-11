import { NgModule } from '@angular/core';
import { RouterModule , Routes } from '@angular/router';

import { ItemCreateComponent } from './items/item-create/item-create.component';
import { ItemListComponent } from './items/item-list/item-list.component';

const routes: Routes = [
  { path: '', component: ItemListComponent},
  { path: 'create' , component: ItemCreateComponent},
  { path: 'edit/:leilaoId' , component: ItemCreateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

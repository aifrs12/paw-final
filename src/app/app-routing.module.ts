import { NgModule } from '@angular/core';
import { RouterModule , Routes } from '@angular/router';

import { ItemCreateComponent } from './items/item-create/item-create.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { LancesCreateComponent } from './lances/lances-create.component';
import { UserListComponent } from './users-list/users-list.component';

const routes: Routes = [
  { path: '', component: ItemListComponent},
  { path: 'create' , component: ItemCreateComponent, canActivate: [AuthGuard]},
  { path: 'edit/:itemId' , component: ItemCreateComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'lance', component: LancesCreateComponent },
  {path: 'listar', component: UserListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}

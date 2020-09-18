import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ItemCategoryComponent} from './item-category/item-category.component';
import {MaintenanceComponent} from './maintenance/maintenance.component';

const routes: Routes = [{path: 'menu-setup', component: ItemCategoryComponent},
  {path: 'maintenance', component: MaintenanceComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

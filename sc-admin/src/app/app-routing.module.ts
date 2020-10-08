import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ItemCategoryComponent} from './item-category/item-category.component';
import {MaintenanceComponent} from './maintenance/maintenance.component';
import {TestContainerComponent} from './common-components/test-container/test-container.component';

const routes: Routes = [{path: 'menu-setup', component: ItemCategoryComponent},
  {path: 'maintenance', component: MaintenanceComponent},
  {path: 'common', component: TestContainerComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

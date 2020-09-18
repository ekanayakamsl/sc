import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ImgCardComponent } from './img-card/img-card.component';
import { ItemCategoryComponent } from './item-category/item-category.component';
import {MaterialModule} from './material/material.module';
import { AddNewCardBtnComponent } from './add-new-card-btn/add-new-card-btn.component';
import { DealogAddCatComponent } from './dealog-add-cat/dealog-add-cat.component';
import { DiningTimeSetupComponent } from './setup-cmponents/dining-time-setup/dining-time-setup.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { DiningTimeDialogComponent } from './setup-cmponents/dining-time-dialog/dining-time-dialog.component';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ImgCardComponent,
    ItemCategoryComponent,
    AddNewCardBtnComponent,
    DealogAddCatComponent,
    DiningTimeSetupComponent,
    MaintenanceComponent,
    DiningTimeDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent,
    NavBarComponent]
})
export class AppModule { }

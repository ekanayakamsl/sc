import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {ImgCardComponent} from './img-card/img-card.component';
import {ItemCategoryComponent} from './item-category/item-category.component';
import {MaterialModule} from './material/material.module';
import {AddNewCardBtnComponent} from './add-new-card-btn/add-new-card-btn.component';
import {DealogAddCatComponent} from './dealog-add-cat/dealog-add-cat.component';
import {DiningTimeSetupComponent} from './setup-cmponents/dining-time-setup/dining-time-setup.component';
import {MaintenanceComponent} from './maintenance/maintenance.component';
import {DiningTimeDialogComponent} from './setup-cmponents/dining-time-dialog/dining-time-dialog.component';
import {HttpClientModule} from '@angular/common/http';
import {MessageDialogComponent} from './common-components/message-dialog/message-dialog.component';
import {CustomerTypeSetupComponent} from './setup-cmponents/customer-type-setup/customer-type-setup.component';
import {CustomerTypeDialogComponent} from './setup-cmponents/customer-type-dialog/customer-type-dialog.component';
import {ImageUploderComponent} from './common-components/image-uploder/image-uploder.component';
import {TestContainerComponent} from './common-components/test-container/test-container.component';

import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {
  AngularFireStorageModule,
  AngularFireStorageReference,
  AngularFireUploadTask
} from '@angular/fire/storage';

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
    DiningTimeDialogComponent,
    MessageDialogComponent,
    CustomerTypeSetupComponent,
    CustomerTypeDialogComponent,
    ImageUploderComponent,
    TestContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'cloud')
  ],
  providers: [],
  bootstrap: [AppComponent,
    NavBarComponent]
})
export class AppModule {
}

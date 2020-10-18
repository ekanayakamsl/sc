import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {MenuCategoryService} from '../../service/menu-category.service';
import {MessageDialogButton, MessageDialogComponentData} from '../../common-components/message-dialog/message-dialog.component';
import {MenuCategory} from '../../models/menu-category';

@Component({
  selector: 'app-menu-category-dialog',
  templateUrl: './menu-category-dialog.component.html',
  styleUrls: ['./menu-category-dialog.component.css']
})
export class MenuCategoryDialogComponent implements OnInit {

  formGroup = this.fb.group(
    {
      code: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      imageUrl: [''],
      diningTimes: [''],
      customerTypes: [''],
      active: ['', Validators.required],
    }
  );

  constructor(
    public dialogRef: MatDialogRef<MenuCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MenuCategoryDialogData,
    private fb: FormBuilder,
    private menuItemService: MenuCategoryService) {
  }

  ngOnInit(): void {
    const {isNew, ...formData} = this.data;
    this.formGroup.setValue(formData);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.formGroup.valid) {
      this.data = MenuCategoryDialogData.fromFormGroup(this.formGroup, this.data.isNew);
      if (this.data.isNew) {
        this.save(this.data);
      } else {
        this.update(this.data);
      }
    }
  }

  private save(data: MenuCategoryDialogData): void {
    const customerType = MenuCategoryDialogData.toCategoryType(data);
    this.menuItemService.save(customerType).subscribe(
      response => {
        this.dialogRef.close(customerType);
      });
  }

  private update(data: MenuCategoryDialogData): void {
    const diningTime = MenuCategoryDialogData.toCategoryType(data);
    this.menuItemService.update(diningTime, diningTime.code).subscribe(
      response => {
        if (response.status.code === 'Success') {
          this.dialogRef.close(diningTime);
        } else {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = new MessageDialogComponentData(
            response.message.short, response.message.detail, [MessageDialogButton.OK]);
        }
      });
  }

  onComplete(event: string): void {
    console.log('image url ', event);
    this.formGroup.get('imageUrl').setValue(event);
  }
}

export class MenuCategoryDialogData {

  code: string;
  name: string;
  description: string;
  imageUrl: string;
  diningTimes: [];
  customerTypes: [];
  active: boolean;
  isNew: boolean;

  public static fromCategoryType(menuItem: MenuCategory, isNew: boolean): MenuCategoryDialogData {
    return {
      code: menuItem.code,
      name: menuItem.name,
      description: menuItem.description,
      imageUrl: menuItem.imageUrl,
      diningTimes: menuItem.diningTimes,
      customerTypes: menuItem.customerTypes,
      active: menuItem.isActive,
      isNew
    };
  }

  public static toCategoryType(result: MenuCategoryDialogData): MenuCategory {
    return {
      code: result.code,
      name: result.name,
      description: result.description,
      imageUrl: result.imageUrl,
      isAllDiningTimes: result.diningTimes != null && result.diningTimes.length > 0,
      isAllCustomerTypes: result.customerTypes != null && result.customerTypes.length > 0,
      diningTimes: result.diningTimes,
      customerTypes: result.customerTypes,
      isActive: result.active
    };
  }

  public static fromFormGroup(formGroup: FormGroup, isNew: boolean): MenuCategoryDialogData {
    return {
      code: formGroup.get('code').value,
      name: formGroup.get('name').value,
      description: formGroup.get('description').value,
      imageUrl: formGroup.get('imageUrl').value,
      diningTimes: formGroup.get('diningTimes').value,
      customerTypes: formGroup.get('customerTypes').value,
      active: formGroup.get('active').value,
      isNew
    };
  }
}

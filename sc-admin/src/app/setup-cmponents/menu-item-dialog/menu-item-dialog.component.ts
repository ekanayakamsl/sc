import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {MenuItemService} from '../../service/menu-item.service';
import {MessageDialogButton, MessageDialogComponentData} from '../../common-components/message-dialog/message-dialog.component';
import {MenuItem} from '../../models/menu-item';

@Component({
  selector: 'app-menu-item-dialog',
  templateUrl: './menu-item-dialog.component.html',
  styleUrls: ['./menu-item-dialog.component.css']
})
export class MenuItemDialogComponent implements OnInit {

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
    public dialogRef: MatDialogRef<MenuItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MenuItemDialogData,
    private fb: FormBuilder,
    private menuItemService: MenuItemService) {
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
      this.data = MenuItemDialogData.fromFormGroup(this.formGroup, this.data.isNew);
      if (this.data.isNew) {
        this.save(this.data);
      } else {
        this.update(this.data);
      }
    }
  }

  private save(data: MenuItemDialogData): void {
    const customerType = MenuItemDialogData.toCustomerType(data);
    this.menuItemService.save(customerType).subscribe(
      response => {
        this.dialogRef.close(customerType);
      });
  }

  private update(data: MenuItemDialogData): void {
    const diningTime = MenuItemDialogData.toCustomerType(data);
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
    console.log('image url ', event)
    this.formGroup.get('imageUrl').setValue(event);
  }
}

export class MenuItemDialogData {

  code: string;
  name: string;
  description: string;
  imageUrl: string;
  diningTimes: [];
  customerTypes: [];
  active: boolean;
  isNew: boolean;

  public static fromCustomerType(menuItem: MenuItem, isNew: boolean): MenuItemDialogData {
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

  public static toCustomerType(result: MenuItemDialogData): MenuItem {
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

  public static fromFormGroup(formGroup: FormGroup, isNew: boolean): MenuItemDialogData {
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


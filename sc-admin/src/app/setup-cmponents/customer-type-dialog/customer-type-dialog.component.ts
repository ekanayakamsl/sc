import {Component, Inject, OnInit} from '@angular/core';
import {MessageDialogButton, MessageDialogComponentData} from '../../common-components/message-dialog/message-dialog.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {CustomerTypeService} from '../../service/customer-type.service';
import {CustomerType} from '../../models/customer-type';

@Component({
  selector: 'app-customer-type-dialog',
  templateUrl: './customer-type-dialog.component.html',
  styleUrls: ['./customer-type-dialog.component.css']
})
export class CustomerTypeDialogComponent implements OnInit {

  formGroup = this.fb.group(
    {
      code: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      internal: ['', Validators.required],
      active: ['', Validators.required],
    }
  );

  constructor(
    public dialogRef: MatDialogRef<CustomerTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CustomerTypeDialogData,
    private fb: FormBuilder,
    private customerTypeService: CustomerTypeService) {
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
      this.data = CustomerTypeDialogData.fromFormGroup(this.formGroup, this.data.isNew);
      if (this.data.isNew) {
        this.save(this.data);
      } else {
        this.update(this.data);
      }
    }
  }

  private save(data: CustomerTypeDialogData): void {
    const customerType = CustomerTypeDialogData.toCustomerType(data);
    this.customerTypeService.save(customerType).subscribe(
      response => {
        this.dialogRef.close(customerType);
      });
  }

  private update(data: CustomerTypeDialogData): void {
    const diningTime = CustomerTypeDialogData.toCustomerType(data);
    this.customerTypeService.update(diningTime, diningTime.code).subscribe(
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
}

export class CustomerTypeDialogData {

  code: string;
  name: string;
  description: string;
  internal: boolean;
  active: boolean;
  isNew: boolean;

  public static fromCustomerType(customerType: CustomerType, isNew: boolean): CustomerTypeDialogData {
    return {
      code: customerType.code,
      name: customerType.name,
      description: customerType.description,
      internal: customerType.isInternal,
      active: customerType.isActive,
      isNew
    };
  }

  public static toCustomerType(result: CustomerTypeDialogData): CustomerType {
    return {
      code: result.code,
      name: result.name,
      description: result.description,
      isInternal: result.internal,
      isActive: result.active
    };
  }

  public static fromFormGroup(formGroup: FormGroup, isNew: boolean): CustomerTypeDialogData {
    return {
      code: formGroup.get('code').value,
      name: formGroup.get('name').value,
      description: formGroup.get('description').value,
      internal: formGroup.get('internal').value,
      active: formGroup.get('active').value,
      isNew
    };
  }
}

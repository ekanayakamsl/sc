import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {DiningTime} from '../../models/dining-time';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DiningTimeService} from '../../service/dining-time.service';
import {MessageDialogButton, MessageDialogComponentData} from '../../common-components/message-dialog/message-dialog.component';

@Component({
  selector: 'app-dining-time-dialog',
  templateUrl: './dining-time-dialog.component.html',
  styleUrls: ['./dining-time-dialog.component.css']
})
export class DiningTimeDialogComponent implements OnInit {

  formGroup = this.fb.group(
    {
      code: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      from: ['', Validators.required],
      to: ['', Validators.required],
      active: ['', Validators.required],
    }
  );

  constructor(
    public dialogRef: MatDialogRef<DiningTimeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DiningTimeDialogData,
    private fb: FormBuilder,
    private diningTimeService: DiningTimeService) {
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
      this.data = DiningTimeDialogData.fromFormGroup(this.formGroup, this.data.isNew);
      if (this.data.isNew) {
        this.save(this.data);
      } else {
        this.update(this.data);
      }
    }
  }

  private save(data: DiningTimeDialogData): void {
    const diningTime = DiningTimeDialogData.toDiningTime(data);
    this.diningTimeService.save(diningTime).subscribe(
      response => {
        this.dialogRef.close(diningTime);
      });
  }

  private update(data: DiningTimeDialogData): void {
    const diningTime = DiningTimeDialogData.toDiningTime(data);
    this.diningTimeService.update(diningTime, diningTime.code).subscribe(
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

export class DiningTimeDialogData {

  code: string;
  name: string;
  description: string;
  from: string;
  to: string;
  active: boolean;
  isNew: boolean;

  public static fromDiningTime(diningTime: DiningTime, isNew: boolean): DiningTimeDialogData {
    return {
      code: diningTime.code,
      name: diningTime.name,
      description: diningTime.description,
      from: diningTime.from,
      to: diningTime.to,
      active: diningTime.isActive,
      isNew
    };
  }

  public static toDiningTime(result: DiningTimeDialogData): DiningTime {
    return {
      code: result.code,
      name: result.name,
      description: result.description,
      from: result.from,
      to: result.to,
      isActive: result.active
    };
  }

  public static fromFormGroup(formGroup: FormGroup, isNew: boolean): DiningTimeDialogData {
    return {
      code: formGroup.get('code').value,
      name: formGroup.get('name').value,
      description: formGroup.get('description').value,
      from: formGroup.get('from').value,
      to: formGroup.get('to').value,
      active: formGroup.get('active').value,
      isNew
    };
  }
}

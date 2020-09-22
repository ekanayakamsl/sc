import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DiningTime} from '../../models/dining-time';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DiningTimeService} from '../../service/dining-time.service';

@Component({
  selector: 'app-dining-time-dialog',
  templateUrl: './dining-time-dialog.component.html',
  styleUrls: ['./dining-time-dialog.component.css']
})
export class DiningTimeDialogComponent implements OnInit {

  formGroup = this.fb.group(
    {
      name: ['', Validators.required],
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
    console.log('Form data', formData);
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
    this.diningTimeService.update(diningTime, diningTime.name).subscribe(
      response => {
        this.dialogRef.close(diningTime);
      });
  }
}

export class DiningTimeDialogData {

  name: string;
  from: string;
  to: string;
  active: boolean;
  isNew: boolean;

  public static fromDiningTime(diningTime: DiningTime, isNew: boolean): DiningTimeDialogData {
    return {
      name: diningTime.name,
      from: diningTime.from,
      to: diningTime.to,
      active: diningTime.active,
      isNew
    };
  }

  public static toDiningTime(result: DiningTimeDialogData): DiningTime {
    return {
      id: result.name,
      name: result.name,
      from: result.from,
      to: result.to,
      active: result.active
    };
  }

  public static fromFormGroup(formGroup: FormGroup, isNew: boolean): DiningTimeDialogData {
    return {
      name: formGroup.get('name').value,
      from: formGroup.get('from').value,
      to: formGroup.get('to').value,
      active: formGroup.get('active').value,
      isNew
    };
  }
}

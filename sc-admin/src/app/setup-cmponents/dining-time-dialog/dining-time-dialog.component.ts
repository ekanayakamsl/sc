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
      this.data = new DiningTimeDialogData(this.formGroup);
      if (this.data.isNew) {
        this.save(this.data);
      } else {
        this.update(this.data);
      }
    }
  }

  private save(data: DiningTimeDialogData): void {
    this.diningTimeService.save(DiningTime.toDiningTime(data)).subscribe(
      response => {
      });
  }

  private update(data: DiningTimeDialogData): void {
    console.log('clicked update response');
    const diningTime = DiningTime.toDiningTime(data);
    this.diningTimeService.update(diningTime, diningTime.name).subscribe(
      response => {
        console.log('response', response);
      });
  }
}

export class DiningTimeDialogData {

  name: string;
  from: string;
  to: string;
  active: boolean;
  isNew: boolean;

  constructor(formGroup: FormGroup) {
    this.name = formGroup.get('name').value;
    this.from = formGroup.get('from').value;
    this.to = formGroup.get('to').value;
    this.active = formGroup.get('active').value;
  }
}

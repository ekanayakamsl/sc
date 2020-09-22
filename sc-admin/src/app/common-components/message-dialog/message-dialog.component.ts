import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MessageDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: MessageDialogComponentData) {
  }

  ngOnInit(): void {
  }

  onClick(messageDialogButton: MessageDialogButton): void {
    this.dialogRef.close(messageDialogButton);
  }

}

export class MessageDialogComponentData {
  title: string;
  message: string;
  btnList: MessageDialogButton[];

  constructor(title: string, message: string, btnList: MessageDialogButton[]) {
    this.title = title;
    this.message = message;
    this.btnList = btnList;
  }
}

export enum MessageDialogButton {
  OK,
  CANCEL,
  YES,
  NO
}

import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DiningTimeDialogComponent, DiningTimeDialogData} from '../dining-time-dialog/dining-time-dialog.component';
import {DiningTime} from '../../models/dining-time';
import {DiningTimeService} from '../../service/dining-time.service';
import {
  MessageDialogButton,
  MessageDialogComponent,
  MessageDialogComponentData
} from '../../common-components/message-dialog/message-dialog.component';

@Component({
  selector: 'app-dining-time-setup',
  templateUrl: './dining-time-setup.component.html',
  styleUrls: ['./dining-time-setup.component.css']
})
export class DiningTimeSetupComponent implements AfterViewInit, OnInit {

  @Input() intData: DiningTime[] = [];

  displayedColumns: string[] = ['code', 'name', 'description', 'from', 'to', 'active', 'action'];
  dataSource = new MatTableDataSource<DiningTime>(ELEMENT_DATA);

  constructor(
    public dialog: MatDialog,
    public diningTimeService: DiningTimeService) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    if (this.intData !== undefined || this.intData !== null) {
      this.intData.forEach(diningTime => ELEMENT_DATA.push(diningTime));
      this.dataSource = new MatTableDataSource<DiningTime>(ELEMENT_DATA);
    } else {
      this.diningTimeService.getAll().subscribe((diningTimes) => {
        if (diningTimes !== undefined && diningTimes !== null) {
          if (diningTimes.status.code === 'Success') {
            diningTimes.data.forEach(diningTime => {
                ELEMENT_DATA.push(diningTime);
              }
            );
          } else {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = new MessageDialogComponentData(
              diningTimes.message.short, diningTimes.message.detail, [MessageDialogButton.OK]);
          }
        }
        this.dataSource = new MatTableDataSource<DiningTime>(ELEMENT_DATA);
      });
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getRawData(row): void {
    this.openDialog(row, false);
  }

  onAddClick(): void {
    this.openDialog(new DiningTime(), true);
  }

  onEdit(element): void {
    this.openDialog(element, false);
  }

  onDelete(element): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = false;
    dialogConfig.data = new MessageDialogComponentData(
      'Delete', 'Are you sure to delete dining time ' + element.name + ' ?', [MessageDialogButton.NO, MessageDialogButton.YES]);

    const dialogRef = this.dialog.open(MessageDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (MessageDialogButton.YES === result) {
        console.log('Closed', result);
        this.diningTimeService.delete(element.code);
      }
    });
  }

  openDialog(diningTime: DiningTime, isNew: boolean): void {

    const index = ELEMENT_DATA.indexOf(diningTime);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = false;
    dialogConfig.width = '250px';
    dialogConfig.data = DiningTimeDialogData.fromDiningTime(diningTime, isNew);

    const dialogRef = this.dialog.open(DiningTimeDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result != null) {
        if (!isNew) {
          ELEMENT_DATA[index] = DiningTimeDialogData.toDiningTime(result);
        } else {
          ELEMENT_DATA.push(DiningTimeDialogData.toDiningTime(result));
        }
        this.dataSource.data = ELEMENT_DATA;
        this.paginator._changePageSize(this.paginator.pageSize);
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

const ELEMENT_DATA: DiningTime[] = [];

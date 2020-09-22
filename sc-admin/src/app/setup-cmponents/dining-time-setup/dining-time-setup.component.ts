import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DiningTimeDialogComponent, DiningTimeDialogData} from '../dining-time-dialog/dining-time-dialog.component';
import {DiningTime} from '../../models/dining-time';
import {DiningTimeService} from '../../service/dining-time.service';
import {__await} from 'tslib';

@Component({
  selector: 'app-dining-time-setup',
  templateUrl: './dining-time-setup.component.html',
  styleUrls: ['./dining-time-setup.component.css']
})
export class DiningTimeSetupComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['name', 'from', 'to', 'active', 'action'];
  dataSource = new MatTableDataSource<DiningTime>(ELEMENT_DATA);

  constructor(
    public dialog: MatDialog,
    public diningTimeService: DiningTimeService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.diningTimeService.getAll().subscribe((diningTimes) => {
      if (diningTimes !== undefined && diningTimes !== null) {
        diningTimes.forEach(diningTime => {
            ELEMENT_DATA.push(diningTime);
          }
        );
      }
      this.dataSource = new MatTableDataSource<DiningTime>(ELEMENT_DATA);
    });
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
    console.log(element);
    this.openDialog(element, false);
  }

  onDelete(element): void {
    console.log(element);
  }

  openDialog(diningTime: DiningTime, isNew: boolean): void {

    const index = ELEMENT_DATA.indexOf(diningTime);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = false;
    dialogConfig.width = '250px';
    dialogConfig.data = DiningTimeDialogData.fromDiningTime(diningTime, isNew);

    const dialogRef = this.dialog.open(DiningTimeDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('result', result);
      if (result !== undefined && result != null) {
        if (!isNew) {
          ELEMENT_DATA[index] = DiningTimeDialogData.toDiningTime(result);
        } else {
          ELEMENT_DATA.push(DiningTimeDialogData.toDiningTime(result));
        }
        console.log('ELEMENT_DATA', ELEMENT_DATA);
        this.dataSource = new MatTableDataSource<DiningTime>(ELEMENT_DATA);
      }
    });
  }
}

const ELEMENT_DATA: DiningTime[] = [];

import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {CustomerTypeService} from "../../service/customer-type.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {
  MessageDialogButton, MessageDialogComponent,
  MessageDialogComponentData
} from "../../common-components/message-dialog/message-dialog.component";
import {CustomerType} from "../../models/customer-type";
import {
  CustomerTypeDialogComponent,
  CustomerTypeDialogData
} from "../customer-type-dialog/customer-type-dialog.component";

@Component({
  selector: 'app-customer-type-setup',
  templateUrl: './customer-type-setup.component.html',
  styleUrls: ['./customer-type-setup.component.css']
})
export class CustomerTypeSetupComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['code', 'name', 'description', 'internal', 'active', 'action'];
  dataSource = new MatTableDataSource<CustomerType>(ELEMENT_DATA);

  constructor(
    public dialog: MatDialog,
    private customerTypeService: CustomerTypeService) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.customerTypeService.getAll().subscribe((customerTypes) => {
      if (customerTypes !== undefined && customerTypes !== null) {
        if (customerTypes.status.code === 'Success') {
          customerTypes.data.forEach(customerType => {
              ELEMENT_DATA.push(customerType);
            }
          );
        } else {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = new MessageDialogComponentData(
            customerTypes.message.short, customerTypes.message.detail, [MessageDialogButton.OK]);
        }
      }
      this.dataSource = new MatTableDataSource<CustomerType>(ELEMENT_DATA);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onAddClick(): void {
    this.openDialog(new CustomerType(), true);
  }

  onEdit(element): void {
    this.openDialog(element, false);
  }

  onDelete(element): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = false;
    dialogConfig.data = new MessageDialogComponentData(
      'Delete', 'Are you sure to delete customer type ' + element.name + ' ?', [MessageDialogButton.NO, MessageDialogButton.YES]);

    const dialogRef = this.dialog.open(MessageDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (MessageDialogButton.YES === result) {
        this.customerTypeService.delete(element.code);
      }
    });
  }

  openDialog(customerType: CustomerType, isNew: boolean): void {

    const index = ELEMENT_DATA.indexOf(customerType);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = false;
    dialogConfig.width = '250px';
    dialogConfig.data = CustomerTypeDialogData.fromCustomerType(customerType, isNew);

    const dialogRef = this.dialog.open(CustomerTypeDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('result', result);
      if (result !== undefined && result != null) {
        if (!isNew) {
          ELEMENT_DATA[index] = CustomerTypeDialogData.toCustomerType(result);
        } else {
          ELEMENT_DATA.push(CustomerTypeDialogData.toCustomerType(result));
        }
        console.log('ELEMENT_DATA', ELEMENT_DATA);
        this.dataSource = new MatTableDataSource<CustomerType>(ELEMENT_DATA);
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

const ELEMENT_DATA: CustomerType[] = [];

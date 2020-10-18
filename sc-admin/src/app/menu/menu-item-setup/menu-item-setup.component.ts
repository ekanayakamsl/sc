import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MenuItem} from '../../models/menu-item';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MenuItemService} from '../../service/menu-item.service';
import {MatPaginator} from '@angular/material/paginator';
import {
  MessageDialogButton,
  MessageDialogComponent,
  MessageDialogComponentData
} from '../../common-components/message-dialog/message-dialog.component';
import {MenuItemDialogComponent, MenuItemDialogData} from '../menu-item-dialog/menu-item-dialog.component';

@Component({
  selector: 'app-menu-item-setup',
  templateUrl: './menu-item-setup.component.html',
  styleUrls: ['./menu-item-setup.component.css']
})
export class MenuItemSetupComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['code', 'name', 'description', 'active', 'action'];
  dataSource = new MatTableDataSource<MenuItem>(ELEMENT_DATA);

  constructor(
    public dialog: MatDialog,
    private menuItemService: MenuItemService) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.menuItemService.getAll().subscribe((menuItems) => {
      if (menuItems !== undefined && menuItems !== null) {
        if (menuItems.status.code === 'Success') {
          menuItems.data.forEach(menuItem => {
              ELEMENT_DATA.push(menuItem);
            }
          );
        } else {
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = new MessageDialogComponentData(
            menuItems.message.short, menuItems.message.detail, [MessageDialogButton.OK]);
        }
      }
      this.dataSource = new MatTableDataSource<MenuItem>(ELEMENT_DATA);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onAddClick(): void {
    this.openDialog(new MenuItem(), true);
  }

  onEdit(element): void {
    this.openDialog(element, false);
  }

  onDelete(element): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = false;
    dialogConfig.data = new MessageDialogComponentData(
      'Delete', 'Are you sure to delete menu item ' + element.name + ' ?', [MessageDialogButton.NO, MessageDialogButton.YES]);

    const dialogRef = this.dialog.open(MessageDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (MessageDialogButton.YES === result) {
        this.menuItemService.delete(element.code);
      }
    });
  }

  openDialog(menuItem: MenuItem, isNew: boolean): void {

    const index = ELEMENT_DATA.indexOf(menuItem);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = false;
    dialogConfig.width = '400px';
    dialogConfig.data = MenuItemDialogData.fromCustomerType(menuItem, isNew);

    const dialogRef = this.dialog.open(MenuItemDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result != null) {
        if (!isNew) {
          ELEMENT_DATA[index] = MenuItemDialogData.toCustomerType(result);
        } else {
          ELEMENT_DATA.push(MenuItemDialogData.toCustomerType(result));
        }
        console.log('ELEMENT_DATA', ELEMENT_DATA);
        this.dataSource = new MatTableDataSource<MenuItem>(ELEMENT_DATA);
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

const ELEMENT_DATA: MenuItem[] = [];

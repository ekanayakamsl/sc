import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MenuItem} from '../../models/menu-item';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {
  MessageDialogButton,
  MessageDialogComponent,
  MessageDialogComponentData
} from '../../common-components/message-dialog/message-dialog.component';
import {MenuItemDialogComponent, MenuItemDialogData} from '../../menu/menu-item-dialog/menu-item-dialog.component';
import {MenuCategoryService} from '../../service/menu-category.service';
import {MenuCategory} from '../../models/menu-category';
import {MenuCategoryDialogComponent, MenuCategoryDialogData} from '../menu-category-dialog/menu-category-dialog.component';

@Component({
  selector: 'app-menu-category-setup',
  templateUrl: './menu-category-setup.component.html',
  styleUrls: ['./menu-category-setup.component.css']
})
export class MenuCategorySetupComponent implements OnInit, AfterViewInit {

  @Input() intData: MenuCategory[] = [];

  displayedColumns: string[] = ['code', 'name', 'description', 'active', 'action'];
  dataSource = new MatTableDataSource<MenuItem>(ELEMENT_DATA);

  constructor(
    public dialog: MatDialog,
    private menuCategoryService: MenuCategoryService) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    if (this.intData !== undefined || this.intData !== null) {
      this.intData.forEach(value => ELEMENT_DATA.push(value));
      this.dataSource = new MatTableDataSource<MenuItem>(ELEMENT_DATA);
    }else {
      this.menuCategoryService.getAll().subscribe((categories) => {
        if (categories !== undefined && categories !== null) {
          if (categories.status.code === 'Success') {
            categories.data.forEach(value => {
                ELEMENT_DATA.push(value);
              }
            );
          } else {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.data = new MessageDialogComponentData(
              categories.message.short, categories.message.detail, [MessageDialogButton.OK]);
          }
        }
        this.dataSource = new MatTableDataSource<MenuItem>(ELEMENT_DATA);
      });
    }
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
      'Delete', 'Are you sure to delete menu category ' + element.name + ' ?', [MessageDialogButton.NO, MessageDialogButton.YES]);

    const dialogRef = this.dialog.open(MessageDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (MessageDialogButton.YES === result) {
        this.menuCategoryService.delete(element.code);
      }
    });
  }

  openDialog(menuItem: MenuItem, isNew: boolean): void {

    const index = ELEMENT_DATA.indexOf(menuItem);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = false;
    dialogConfig.width = '400px';
    dialogConfig.data = MenuCategoryDialogData.fromCategoryType(menuItem, isNew);

    const dialogRef = this.dialog.open(MenuCategoryDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result != null) {
        if (!isNew) {
          ELEMENT_DATA[index] = MenuCategoryDialogData.toCategoryType(result);
        } else {
          ELEMENT_DATA.push(MenuCategoryDialogData.toCategoryType(result));
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

const ELEMENT_DATA: MenuCategory[] = [];

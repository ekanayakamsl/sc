import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.component.html',
  styleUrls: ['./item-category.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemCategoryComponent implements OnInit {

  categories = ['Rice', 'Koththu', 'Noodles', 'A', 'B', 'C'];

  constructor() { }

  ngOnInit(): void {
  }

}

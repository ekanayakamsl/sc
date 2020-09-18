import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-img-card',
  templateUrl: './img-card.component.html',
  styleUrls: ['./img-card.component.css']
})
export class ImgCardComponent implements OnInit {

  @Input() tile: string;

  constructor() { }

  ngOnInit(): void {
  }

}

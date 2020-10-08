import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-test-container',
  templateUrl: './test-container.component.html',
  styleUrls: ['./test-container.component.css']
})
export class TestContainerComponent implements OnInit {

  constructor() {
  }

  onFileComplete(data: any): void {
    console.log(data); // We just print out data bubbled up from event emitter.
  }

  ngOnInit(): void {
  }

}

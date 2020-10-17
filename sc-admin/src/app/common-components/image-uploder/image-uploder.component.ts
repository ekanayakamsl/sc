import {Component, Input, OnInit} from '@angular/core';
import {AcceptTypes} from '../filer-uploader/filer-uploader.component';

@Component({
  selector: 'app-image-uploder',
  templateUrl: './image-uploder.component.html',
  styleUrls: ['./image-uploder.component.css']
})
export class ImageUploderComponent implements OnInit {

  accept = AcceptTypes.IMAGE;

  /** Name used in form which will be sent in HTTP request. */
  @Input() mediaFolderPath = 'COMMON_IMAGE';

  constructor() {
  }

  ngOnInit(): void {
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {AcceptTypes, FileUploadModel, UploadState} from '../filer-uploader/filer-uploader.component';

@Component({
  selector: 'app-image-uploder',
  templateUrl: './image-uploder.component.html',
  styleUrls: ['./image-uploder.component.css']
})
export class ImageUploderComponent implements OnInit {

  imgURL = null;
  accept = AcceptTypes.IMAGE;

  @Input() text = 'Open Image';
  @Input() icon = 'folder_open';
  @Input() mediaFolderPath = 'COMMON_IMAGE';
  @Input() maxFileCount: number = Number.MAX_VALUE;
  @Input() withUploadBtn = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  onComplete(event: Array<FileUploadModel>): void {
    if (event.length > 0) {
      if (event[0].uploadState === UploadState.NOT_STARTED) {
        const reader = new FileReader();
        reader.readAsDataURL(event[0].data);
        reader.onload = () => {
          this.imgURL = reader.result.toString();
        };
      } else if (event[0].uploadState === UploadState.SUCCESS) {

      }
    } else {
      this.imgURL = null;
    }
  }
}

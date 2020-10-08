import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {of, Subscription} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpEventType, HttpRequest} from '@angular/common/http';
import {catchError, last, map, tap} from 'rxjs/operators';
import {FilesUploadMetadata, StorageService} from '../../service/storage.service';

@Component({
  selector: 'app-image-uploder',
  templateUrl: './image-uploder.component.html',
  styleUrls: ['./image-uploder.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({opacity: 100})),
      transition('* => void', [
        animate(300, style({opacity: 0}))
      ])
    ])
  ]
})
export class ImageUploderComponent implements OnInit {

  /** Link text */
  @Input() text = 'Upload';
  /** Name used in form which will be sent in HTTP request. */
  @Input() param = 'file';
  /** Target URL for file uploading. */
  @Input() target = 'https://file.io';
  /** File extension that accepted, same as 'accept' of <input type="file" />.
   By the default, it's set to 'image/*'. */
  @Input() accept = 'image/*';
  /** Allow you to add handler after its completion. Bubble up response text from remote. */
  @Output() complete = new EventEmitter<string>();

  files: Array<FileUploadModel> = [];

  constructor(private http: HttpClient, private readonly  storageService: StorageService) {
  }


  ngOnInit(): void {
  }

  onClick(): void {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({
          data: file, state: 'in',
          inProgress: false, progress: 0, canRetry: false, canCancel: true
        });
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }

  cancelFile(file: FileUploadModel): void {
    file.sub.unsubscribe();
    this.removeFileFromArray(file);
  }

  retryFile(file: FileUploadModel): void {
    this.uploadFile(file);
    file.canRetry = false;
  }

  private uploadFile(file: FileUploadModel): void {
    const fd = new FormData();
    fd.append(this.param, file.data);

    const filesUploadMetadata: FilesUploadMetadata = this.storageService.uploadFileAndGetMetadata('Test Path', file.data);
    file.inProgress = true;
    filesUploadMetadata.uploadProgress$.subscribe(value => {
      file.progress = value;
      file.inProgress = value === 100;
    });

    filesUploadMetadata.downloadUrl$.subscribe(value => {
      console.log('Download link:  ', value);
    });

    // const req = new HttpRequest('POST', this.target, fd, {
    //   reportProgress: true
    // });

    // file.inProgress = true;
    // file.sub = this.http.request(req).pipe(
    //   map(event => {
    //     switch (event.type) {
    //       case HttpEventType.UploadProgress:
    //         file.progress = Math.round(event.loaded * 100 / event.total);
    //         break;
    //       case HttpEventType.Response:
    //         return event;
    //     }
    //   }),
    //   tap(message => {
    //   }),
    //   last(),
    //   catchError((error: HttpErrorResponse) => {
    //     file.inProgress = false;
    //     file.canRetry = true;
    //     return of(`${file.data.name} upload failed.`);
    //   })
    // ).subscribe(
    //   (event: any) => {
    //     if (typeof (event) === 'object') {
    //       this.removeFileFromArray(file);
    //       this.complete.emit(event.body);
    //     }
    //   }
    // );
  }

  private uploadFiles(): void {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.value = '';

    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }

  private removeFileFromArray(file: FileUploadModel): void {
    const index = this.files.indexOf(file);
    if (index > -1) {
      this.files.splice(index, 1);
    }
  }

}

export class FileUploadModel {
  data: File;
  state: string;
  inProgress: boolean;
  progress: number;
  canRetry: boolean;
  canCancel: boolean;
  sub?: Subscription;
}

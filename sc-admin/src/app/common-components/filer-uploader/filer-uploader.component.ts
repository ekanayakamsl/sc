import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {HttpClient} from '@angular/common/http';
import {FilesUploadMetadata, StorageService} from '../../service/storage.service';

@Component({
  selector: 'app-filer-uploader',
  templateUrl: './filer-uploader.component.html',
  styleUrls: ['./filer-uploader.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({opacity: 100})),
      transition('* => void', [
        animate(300, style({opacity: 0}))
      ])
    ])
  ]
})

export class FilerUploaderComponent {

  @Input() text = 'Upload';
  @Input() mediaFolderPath = 'COMMON';
  @Input() accept: AcceptTypes = AcceptTypes.ALL;
  @Input() maxFileCount: number = Number.MAX_VALUE;

  @Output() complete = new EventEmitter<string>();

  files: Array<FileUploadModel> = [];

  constructor(private http: HttpClient, private readonly  storageService: StorageService) {
  }

  onClick(): void {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.onchange = () => {
      const selectedCount = this.maxFileCount < fileUpload.files.length ? this.maxFileCount : fileUpload.files.length;
      for (let index = 0; index < selectedCount; index++) {
        const file = fileUpload.files[index];
        this.files.push({
          data: file,
          state: 'in',
          uploadState: UploadState.NOT_STARTED,
          filesUploadMetadata: null
        });
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }

  private uploadFile(file: FileUploadModel): void {
    file.filesUploadMetadata = this.storageService.uploadFileAndGetMetadata(this.mediaFolderPath, file.data);
    file.filesUploadMetadata.uploadTask.then(() => {
      file.uploadState = UploadState.SUCCESS;
    });
    file.filesUploadMetadata.uploadTask.catch(() => {
      file.uploadState = UploadState.ERROR;
    });
    file.uploadState = UploadState.IN_PROGRESS;
  }

  private uploadFiles(): void {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.value = '';

    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }

  cancelFile(file: FileUploadModel): void {
    file.filesUploadMetadata.uploadTask.cancel();
    file.uploadState = UploadState.CANCEL;
    this.removeFileFromArray(file);
  }

  pauseFile(file: FileUploadModel): void {
    if (file.filesUploadMetadata.uploadTask.pause()) {
      file.uploadState = UploadState.PAUSE;
    }
  }

  resumeFile(file: FileUploadModel): void {
    if (file.filesUploadMetadata.uploadTask.resume()) {
      file.uploadState = UploadState.IN_PROGRESS;
    }
  }

  retryFile(file: FileUploadModel): void {
    this.uploadFile(file);
  }

  private removeFileFromArray(file: FileUploadModel): void {
    const index = this.files.indexOf(file);
    if (index > -1) {
      this.files.splice(index, 1);
    }
  }

  getUploadStateColour(uploadState: UploadState): string {
    switch (uploadState) {
      case UploadState.NOT_STARTED:
        return 'black';
      case UploadState.IN_PROGRESS:
        return 'yellow';
      case UploadState.PAUSE:
        return 'orange';
      case UploadState.SUCCESS:
        return 'green';
      case UploadState.ERROR:
        return 'red';
      case UploadState.CANCEL:
        return 'blue';
    }
    return 'black';
  }

  canPause(uploadState: UploadState): boolean {
    return uploadState === UploadState.IN_PROGRESS;
  }

  canResume(uploadState: UploadState): boolean {
    return uploadState === UploadState.PAUSE;
  }

  canCancel(uploadState: UploadState): boolean {
    return uploadState === UploadState.NOT_STARTED || uploadState === UploadState.IN_PROGRESS || uploadState === UploadState.PAUSE ||
      uploadState === UploadState.ERROR;
  }

  canRetry(uploadState: UploadState): boolean {
    return uploadState === UploadState.ERROR;
  }
}

export class FileUploadModel {
  data: File;
  state: string;
  uploadState: UploadState;
  filesUploadMetadata: FilesUploadMetadata;
}

export enum AcceptTypes {
  ALL = '/*',
  IMAGE = 'image/*'
}

export enum UploadState {
  NOT_STARTED,
  IN_PROGRESS,
  PAUSE,
  SUCCESS,
  ERROR,
  CANCEL,
}


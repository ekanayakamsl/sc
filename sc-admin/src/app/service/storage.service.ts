import {Injectable} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {from, Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private readonly storage: AngularFireStorage) {
  }

  uploadFileAndGetMetadata(mediaFolderPath: string, fileToUpload: File): FilesUploadMetadata {
    const {name} = fileToUpload;
    const filePath = `${mediaFolderPath}/${new Date().getTime()}_${name}`;
    const uploadTask: AngularFireUploadTask = this.storage.upload(
      filePath,
      fileToUpload,
    );
    return {
      uploadTask,
      filePath,
      uploadProgress$: uploadTask.percentageChanges(),
      downloadUrl$: this.getDownloadUrl$(uploadTask, filePath)
    };
  }

  private getDownloadUrl$(
    uploadTask: AngularFireUploadTask,
    path: string,
  ): Observable<string> {
    return from(uploadTask).pipe(
      switchMap(() => this.storage.ref(path).getDownloadURL()),
    );
  }

  deleteFile(path: string): Observable<any> {
    const fileRef = this.storage.ref(path);
    return fileRef.delete();
  }

}

export interface FilesUploadMetadata {
  uploadTask: AngularFireUploadTask;
  filePath: string;
  uploadProgress$: Observable<number>;
  downloadUrl$: Observable<string>;
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DiningTime} from '../models/dining-time';
import {ResponseWrapper} from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class DiningTimeService {

  private readonly URL = 'https://us-central1-test-ce3be.cloudfunctions.net/diningtime';

  constructor(
    private http: HttpClient) {
  }

  getAll(): Observable<ResponseWrapper<DiningTime[]>> {
    return this.http.get<ResponseWrapper<DiningTime[]>>(this.URL);
  }

  getByCode(name: string): Observable<ResponseWrapper<DiningTime>> {
    return this.http.get<ResponseWrapper<DiningTime>>(this.URL + '/' + name);
  }

  save(diningTime: DiningTime): Observable<ResponseWrapper<any>> {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(diningTime);
    return this.http.post<ResponseWrapper<any>>(this.URL, body, {headers});
  }

  update(diningTime: DiningTime, name: string): Observable<ResponseWrapper<any>> {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(diningTime);
    return this.http.put<ResponseWrapper<any>>(this.URL + '/' + name, body, {headers});
  }

  delete(name: string): Observable<ResponseWrapper<any>> {
    return this.http.delete<ResponseWrapper<any>>(this.URL + '/' + name);
  }

}

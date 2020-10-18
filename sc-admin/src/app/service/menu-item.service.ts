import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseWrapper} from '../models/response';
import {MenuItem} from '../models/menu-item';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {

  private readonly URL = environment.baseUrl + environment.dash + environment.menuItemEndPoint;

  constructor(
    private http: HttpClient) {
  }

  getAll(): Observable<ResponseWrapper<MenuItem[]>> {
    return this.http.get<ResponseWrapper<MenuItem[]>>(this.URL);
  }

  getByCode(name: string): Observable<ResponseWrapper<MenuItem>> {
    return this.http.get<ResponseWrapper<MenuItem>>(this.URL + '/' + name);
  }

  save(menuItem: MenuItem): Observable<ResponseWrapper<any>> {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(menuItem);
    return this.http.post<ResponseWrapper<any>>(this.URL, body, {headers});
  }

  update(menuItem: MenuItem, name: string): Observable<ResponseWrapper<any>> {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(menuItem);
    return this.http.put<ResponseWrapper<any>>(this.URL + '/' + name, body, {headers});
  }

  delete(code: string): Observable<ResponseWrapper<any>> {
    return this.http.delete<ResponseWrapper<any>>(this.URL + '/' + code);
  }

}
